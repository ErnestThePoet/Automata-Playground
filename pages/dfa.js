import react from "react";
import Head from "next/head";

import { observer } from "mobx-react-lite";
import { autorun } from "mobx";
import { AppState,APP_STATES } from "observables/app-state";
import { DfaInstance } from "observables/dfa-instance";
import { PropertyEditorData } from "observables/property-editor-data";
import { AlertData } from "observables/alert-data";
import { adjustPropertyEditorPosition } from "modules/utilities";
import {
    loadAutomataData,
    generateDfaJsonString
} from "modules/automata-json";

import DfaPropertyEditor from "components/dfa/dfa-property-editor";
import AutomataToolbar from "components/automata-toolbar";
import DfaRunPanel from "components/dfa/dfa-run-panel";

import { handleGraphClick,handleGraphDragEnd } from "modules/dfa/dfa-page-operations";
import { initGraph, updateGraph } from "modules/graph-operations";

import { isAppleBrowser } from "modules/utilities";

import styles from "styles/dfa-tm.module.scss";
import appStyles from "styles/app.module.scss";

export default class DfaPage extends react.Component {
    constructor(props) {
        super(props);
    }

    isAutomataEmpty = () => {
        return this.pageDfaInstance.isAutomataEmpty;
    };

    loadAutomataJsonString = dfaData => {
        loadAutomataData(dfaData, this.pageDfaInstance);
    };

    exportAutomataJsonString = () => {
        if (this.pageDfaInstance.isAutomataEmpty) {
            this.pageAlertData.showAlertAnimated("DFA为空");
            return null;
        }
        else {
            // make sure all nodes are not in XXX_CURRENT group
            if (this.pageAppState.currentState === APP_STATES.RUN_AUTOMATA) {
                this.pageDfaInstance.runExit();
                this.pageAppState.changeAppState(APP_STATES.DEFAULT);
            }

            return generateDfaJsonString(this.pageDfaInstance);
        }
    };

    clearAll = () => {
        this.pageAppState.changeAppState(APP_STATES.DEFAULT);
        this.pageDfaInstance.clearAll();
    }

    componentDidMount = () => {
        initGraph(document.getElementById("div-canvas-wrapper"),
            e => {
                handleGraphClick(
                    e,
                    this.pageAppState,
                    this.pageDfaInstance,
                    this.pagePropertyEditorData);
            },
            e => {
                handleGraphDragEnd(
                    e,
                    this.pageAppState,
                    this.pageDfaInstance,
                    this.pagePropertyEditorData);
        });

        // auto update graph when dfa changes
        autorun(() => {
            updateGraph(
                this.pageDfaInstance.graphNodes,
                this.pageDfaInstance.graphEdges,
                this.pageDfaInstance.reactivityCounter);
        });
    }

    componentDidUpdate = () => {
        // properly adjust property editor position based on its size and screen size.
        // we try to place it center beneath the click point. if this exceeds window boundary,
        // then we make it inside.
        // must be done here instead of when click event happened because propertyEditorWrapper may not
        // be present then.
        adjustPropertyEditorPosition(this.pageAppState,this.pagePropertyEditorData);
    }

    removeSelected = () => {
        switch (this.pageAppState.currentState) {
            case APP_STATES.EDIT_STATE:
                this.pageDfaInstance.removeState(
                    this.pagePropertyEditorData.selectedGraphNodeId
                );

                this.pageAppState.changeAppState(APP_STATES.DEFAULT);

                break;
            
            case APP_STATES.EDIT_TRANSITION:
                this.pageDfaInstance.removeTransition(
                    this.pagePropertyEditorData.selectedGraphEdgeId
                );

                this.pageAppState.changeAppState(APP_STATES.DEFAULT);

                break;
        }
    };

    runAutomata = () => {
        if (!this.pageDfaInstance.hasStartState) {
            this.pageAlertData.showAlertAnimated("DFA没有开始状态");
            
            return;
        }

        this.pageAppState.changeAppState(APP_STATES.RUN_AUTOMATA);
        this.pageDfaInstance.initRun();
    };

    pageDfaInstance = new DfaInstance();
    pageAppState = new AppState();
    pagePropertyEditorData = new PropertyEditorData();
    pageAlertData = new AlertData();

    pageComponent = observer(({ dfaInstance,appState,propertyEditorData,alertData }) => (
        <main className={styles.mainContentWrapper}>
            <Head>
                <title>Automata Playground - DFA</title>
            </Head>
            
            <div className={appStyles.divAlert} role="alert" style={{
                display: alertData.isAlertShow ? "block" : "none",
                opacity:alertData.alertOpacity
            }}>
                {alertData.alertMessage}
            </div>

            {
                (appState.currentState === APP_STATES.EDIT_STATE
                    || appState.currentState===APP_STATES.EDIT_TRANSITION)
                &&
            <DfaPropertyEditor
                appState={appState}
                dfaInstance={dfaInstance}
                propertyEditorData={propertyEditorData}
                className={styles.dfaPropertyEditor}
                style={{
                    top: propertyEditorData.isPropertyEditorPositionAdjusted
                        || isAppleBrowser()
                        ? propertyEditorData.propertyEditorTop
                        :0,
                    left: propertyEditorData.isPropertyEditorPositionAdjusted
                        || isAppleBrowser()
                        ? propertyEditorData.propertyEditorLeft
                        :0
                    }} />
            }
            {/* on mobile browsers, if we place property editor out of window boundary,
                then the window will be scaled to fit it in. So before we adjust its position,
                we place it on left-top to make proper adjustment.*/}
            
            {/* on apple browsers, after PropertyEditor is rendered, componentDidUpdate
                won't be triggered, and so PropertyEditor will always stay at left:0, top:0.
                Current solution is to ignore position adjustment and use unadjusted position
                directly on apple browsers.*/}
            
            <AutomataToolbar
                appState={appState}
                removeSelected={this.removeSelected}
                runAutomata={this.runAutomata}
                className={styles.bottomToolbar}
                style={{
                    display: appState.currentState === APP_STATES.RUN_AUTOMATA ? "none" : "block"
                }} />
            
            <DfaRunPanel
                appState={appState}
                dfaInstance={dfaInstance}
                alertData={alertData}
                className={styles.bottomToolbar}
                style={{
                    display: appState.currentState === APP_STATES.RUN_AUTOMATA ? "block" : "none"
                }}/>
            
            <div id="div-canvas-wrapper" className={styles.divCanvasWrapper}></div>
        </main>
    ));

    render = () => (
        <this.pageComponent
            dfaInstance={this.pageDfaInstance}
            appState={this.pageAppState}
            propertyEditorData={this.pagePropertyEditorData}
            alertData={this.pageAlertData} />
    )
}