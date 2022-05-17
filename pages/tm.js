import react from "react";
import Head from "next/head";

import { observer } from "mobx-react-lite";
import { autorun } from "mobx";
import { AppState, APP_STATES } from "observables/app-state";
import { TmInstance } from "observables/tm-instance";
import { PropertyEditorData } from "observables/property-editor-data";
import { AlertData } from "observables/alert-data";
import { adjustPropertyEditorPosition } from "modules/utilities";
import {
    loadAutomataData,
    generateTmJsonString
} from "modules/automata-json";

import TmPropertyEditor from "components/tm/tm-property-editor";
import AutomataToolbar from "components/automata-toolbar";
import TmRunPanel from "components/tm/tm-run-panel";

import { handleGraphClick, handleGraphDragEnd } from "modules/tm/tm-page-operations";
import { initGraph, updateGraph } from "modules/graph-operations";

import styles from "styles/dfa-tm.module.scss";
import appStyles from "styles/app.module.scss";

export default class TmPage extends react.Component {
    constructor(props) {
        super(props);
    }

    isAutomataEmpty = () => {
        return this.pageTmInstance.isAutomataEmpty;
    };

    loadAutomataJsonString = tmData => {
        loadAutomataData(tmData, this.pageTmInstance);
    };

    exportAutomataJsonString = () => {
        if (this.pageTmInstance.isAutomataEmpty) {
            this.pageAlertData.showAlertAnimated("图灵机为空");
            return null;
        }
        else {
            return generateTmJsonString(this.pageTmInstance);
        }
    };

    clearAll = () => {
        this.pageAppState.changeAppState(APP_STATES.DEFAULT);
        this.pageTmInstance.clearAll();
    }

    componentDidMount = () => {
        initGraph(document.getElementById("div-canvas-wrapper"),
            e => {
                handleGraphClick(
                    e,
                    this.pageAppState,
                    this.pageTmInstance,
                    this.pagePropertyEditorData);
            },
            e => {
                handleGraphDragEnd(
                    e,
                    this.pageAppState,
                    this.pageTmInstance,
                    this.pagePropertyEditorData);
            });

        // auto update graph when tm changes
        autorun(() => {
            updateGraph(
                this.pageTmInstance.graphNodes,
                this.pageTmInstance.graphEdges,
                this.pageTmInstance.reactivityCounter);
        });
    }

    componentDidUpdate = () => {
        // properly adjust property editor position based on its size and screen size.
        // we try to place it center beneath the click point. if this exceeds window boundary,
        // then we make it inside.
        // must be done here instead of when click event happened because propertyEditorWrapper may not
        // be present then.
        adjustPropertyEditorPosition(this.pageAppState, this.pagePropertyEditorData);
    }

    removeSelected = () => {
        switch (this.pageAppState.currentState) {
            case APP_STATES.EDIT_STATE:
                this.pageTmInstance.removeState(
                    this.pagePropertyEditorData.selectedGraphNodeId
                );

                this.pageAppState.changeAppState(APP_STATES.DEFAULT);

                break;

            case APP_STATES.EDIT_TRANSITION:
                this.pageTmInstance.removeTransition(
                    this.pagePropertyEditorData.selectedGraphEdgeId
                );

                this.pageAppState.changeAppState(APP_STATES.DEFAULT);

                break;
        }
    };

    runAutomata = () => {
        if (!this.pageTmInstance.hasStartState) {
            this.pageAlertData.showAlertAnimated("图灵机没有开始状态");

            return;
        }

        this.pageAppState.changeAppState(APP_STATES.RUN_AUTOMATA);
        this.pageTmInstance.initRun();
    };

    pageTmInstance = new TmInstance();
    pageAppState = new AppState();
    pagePropertyEditorData = new PropertyEditorData();
    pageAlertData = new AlertData();

    pageComponent = observer(({ tmInstance, appState, propertyEditorData, alertData }) => (
        <main className={styles.mainContentWrapper}>
            <Head>
                <title>Automata Playground - TM</title>
            </Head>

            <div className={appStyles.divAlert} role="alert" style={{
                display: alertData.isAlertShow ? "block" : "none",
                opacity: alertData.alertOpacity
            }}>
                {alertData.alertMessage}
            </div>

            {
                (appState.currentState === APP_STATES.EDIT_STATE
                    || appState.currentState === APP_STATES.EDIT_TRANSITION)
                &&
                <TmPropertyEditor
                    appState={appState}
                    tmInstance={tmInstance}
                    propertyEditorData={propertyEditorData}
                    className={styles.dfaPropertyEditor}
                    style={{
                        top: propertyEditorData.isPropertyEditorPositionAdjusted
                            ? propertyEditorData.propertyEditorTop
                            : 0,
                        left: propertyEditorData.isPropertyEditorPositionAdjusted
                            ? propertyEditorData.propertyEditorLeft
                            : 0
                    }} />
            }
            {/* on mobile browsers, if we place property editor out of window boundary,
                then the window will be scaled to fit it in. So before we adjust its position,
                we place it on left-top to make proper adjustment.*/}

            <AutomataToolbar
                appState={appState}
                removeSelected={this.removeSelected}
                runAutomata={this.runAutomata}
                className={styles.bottomToolbar}
                style={{
                    display: appState.currentState === APP_STATES.RUN_AUTOMATA ? "none" : "block"
                }} />

            <TmRunPanel
                appState={appState}
                tmInstance={tmInstance}
                alertData={alertData}
                className={styles.bottomToolbar}
                style={{
                    display: appState.currentState === APP_STATES.RUN_AUTOMATA ? "block" : "none"
                }} />

            <div id="div-canvas-wrapper" className={styles.divCanvasWrapper}></div>
        </main>
    ));

    render = () => (
        <this.pageComponent
            tmInstance={this.pageTmInstance}
            appState={this.pageAppState}
            propertyEditorData={this.pagePropertyEditorData}
            alertData={this.pageAlertData} />
    )
}