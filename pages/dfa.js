import react from "react";
import Head from "next/head";

import { observer } from "mobx-react-lite";
import { autorun } from "mobx";
import { AppState,APP_STATES } from "observables/app-state";
import { DfaInstance } from "observables/dfa-instance";
import { PropertyEditorData } from "observables/property-editor-data";

import DfaPropertyEditor from "components/dfa/dfa-property-editor";
import AutomataToolbar from "components/automata-toolbar";

import { handleGraphClick,handleGraphDragEnd } from "modules/dfa/dfa-page-operations";
import { initGraph, updateGraph } from "modules/graph-operations";

import styles from "styles/dfa.module.scss";

export default class DfaPage extends react.Component {
    constructor(props) {
        super(props);

        // UI-irrelevant data here
        this.data = {
            selectedGraphNodeId: 0,
            selectedGraphEdgeUuid: ""
        }
    }

    loadAutomataAtfString(dfaAtfString) {
        console.log("DFA IMPORT")
    }

    exportAutomataAtfString() {
        console.log("DFA EXPORT")
    }

    componentDidMount = () => {
        initGraph(document.getElementById("div-canvas-wrapper"),
            e => {
                handleGraphClick(
                    e, this.pageAppState, this.pageDfaInstance, this.pagePropertyEditorData);
            },
            e => {
                handleGraphDragEnd(
                    e,
                    this.pageAppState,
                    this.pageDfaInstance,
                    this.pagePropertyEditorData,
                    this.adjustPropertyEditorPosition);
        });

        // auto update graph when dfa changes
        autorun(() => {
            updateGraph(
                this.pageDfaInstance.graphNodes,
                this.pageDfaInstance.graphEdges,
                this.pageDfaInstance.reactivityCounter);
        });

        // auto update property editor data when a state was selected
        autorun(() => {
            this.pagePropertyEditorData.setEditorInputText(
                this.pageDfaInstance.getStateNameById(
                    this.pagePropertyEditorData.selectedGraphNodeId),
                0
            );

            this.pagePropertyEditorData.setSelectedStateType(
                this.pageDfaInstance.getStateTypeById(
                    this.pagePropertyEditorData.selectedGraphNodeId)
            );
        });

        // auto update property editor data when a transition was selected
        autorun(() => {
            this.pagePropertyEditorData.setEditorInputText(
                this.pageDfaInstance.getTransitionCharByUuid(
                    this.pagePropertyEditorData.selectedGraphEdgeUuid),
                0
            );
        });
    }

    adjustPropertyEditorPosition=()=> {
        if ((this.pageAppState.currentState === APP_STATES.EDIT_STATE
            || this.pageAppState.currentState === APP_STATES.EDIT_TRANSITION)
            && !this.pagePropertyEditorData.isPropertyEditorPositionAdjusted) {
            const canvasWrapper = document.getElementById("div-canvas-wrapper");
            const propertyEditorWrapper = document.getElementById("property-editor-wrapper");

            if (canvasWrapper && propertyEditorWrapper) {
                // top and left to make property editor center beneath click point.
                // top and left stored in pagePropertyEditorData is click point.
                const verticalAdjustmentPx = 30;

                const boundaryLeft = canvasWrapper.clientLeft;
                const boundaryTop = canvasWrapper.clientTop;
                const boundaryRight = canvasWrapper.clientLeft + canvasWrapper.clientWidth;
                const boundaryBottom = canvasWrapper.clientTop + canvasWrapper.clientHeight;

                let targetTop = this.pagePropertyEditorData.propertyEditorTop + verticalAdjustmentPx;
                let targetLeft =
                    this.pagePropertyEditorData.propertyEditorLeft - propertyEditorWrapper.clientWidth / 2;
                // calculate right side position
                const propertyEditorRight = targetLeft + propertyEditorWrapper.clientWidth;

                // if right side exceeds screen boundary, then align right screen boundary
                if (propertyEditorRight > boundaryRight) {
                    targetLeft -= propertyEditorRight - boundaryRight;
                }

                // if left side exceeds screen boundary, then align left screen boundary
                if (targetLeft < boundaryLeft) {
                    targetLeft = boundaryLeft;
                }

                // if bottom exceeds screen bottom, then make property editor above click point
                if (targetTop + propertyEditorWrapper.clientHeight > boundaryBottom) {
                    targetTop =
                        this.pagePropertyEditorData.propertyEditorTop
                        - verticalAdjustmentPx
                        - propertyEditorWrapper.clientHeight;
                }

                // if the adjustment made it exceed screen top, then simply align screen top
                if (targetTop < boundaryTop) {
                    targetTop = boundaryTop;
                }

                this.pagePropertyEditorData.setPropertyEditorPosition(targetTop, targetLeft, true);
            }
        }
    }

    componentDidUpdate = () => {
        // properly adjust property editor position based on its size and screen size.
        // we try to place it center beneath the click point. if this exceeds window boundary,
        // then we make it inside.
        // must be done here instead of when click event happened because propertyEditorWrapper may not
        // be present then.
        this.adjustPropertyEditorPosition();
    }

    pageDfaInstance = new DfaInstance();
    pageAppState = new AppState();
    pagePropertyEditorData = new PropertyEditorData();

    pageComponent = observer(({ dfaInstance,appState,propertyEditorData }) => (
        <div className={styles.divContentWrapper}>
            <Head>
                <title>Automata Playground - DFA</title>
            </Head>

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
                        ? propertyEditorData.propertyEditorTop
                        :0,
                    left: propertyEditorData.isPropertyEditorPositionAdjusted
                        ? propertyEditorData.propertyEditorLeft
                        :0
                    }} />
            }
            
            <AutomataToolbar
                appState={appState}
                className={styles.dfaToolbar} />
            
            <div id="div-canvas-wrapper" className={styles.divCanvasWrapper}></div>
        </div>
    ));

    render = () => (
        <this.pageComponent
            dfaInstance={this.pageDfaInstance}
            appState={this.pageAppState}
            propertyEditorData={this.pagePropertyEditorData} />
    )
}