import react from "react";
import Head from "next/head";

import { observer } from "mobx-react-lite";
import { autorun } from "mobx";
import { AppState } from "observables/app-state";
import { DfaInstance } from "observables/dfa-instance";

import DfaPropertyEditor from "components/dfa/dfa-property-editor";
import AutomataToolbar from "components/automata-toolbar";

import { handleGraphClick } from "modules/dfa/dfa-page-operations";
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
        initGraph(document.getElementById("div-canvas-wrapper"), e => {
            handleGraphClick(e, this.pageAppState, this.pageDfaInstance);
        });

        // auto update graph when dfa changes
        autorun(() => {
            updateGraph(
                this.pageDfaInstance.graphNodes,
                this.pageDfaInstance.graphEdges,
                this.pageDfaInstance.reactivityCounter);
        });
    }

    pageDfaInstance = new DfaInstance();
    pageAppState = new AppState();

    pageComponent = observer(({ dfaInstance,appState }) => (
        <div className={styles.divContentWrapper}>
            <Head>
                <title>Automata Playground - DFA</title>
            </Head>

            <DfaPropertyEditor
                appState={appState}
                dfaInstance={dfaInstance}
                className={styles.dfaPropertyEditor} />
            
            <AutomataToolbar
                appState={appState}
                className={styles.dfaToolbar} />
            
            <div id="div-canvas-wrapper" className={styles.divCanvasWrapper}></div>
        </div>
    ));

    render = () => (
        <this.pageComponent dfaInstance={this.pageDfaInstance} appState={this.pageAppState}/>
    )
}