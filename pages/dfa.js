import react from "react";
import Head from "next/head";

import { observer } from "mobx-react-lite";
import { AppState } from "observables/app-state";
import { DfaInstance } from "observables/dfa-instance";

import AutomataToolbar from "components/automata-toolbar";

import { initGraph, updateGraph } from "modules/graph-operations";

import styles from "styles/dfa.module.scss";

export default class DfaPage extends react.Component {
    constructor(props) {
        super(props);

        this.state = {
            popUpText: ""
        };

        // UI-irrelevant data here
        this.data = {
            selectedGraphNodeId: 0,
            selectedGraphEdgeUuid: "",
        }
    }

    componentDidMount = () => {
        initGraph(document.getElementById("div-canvas-wrapper"), e => {
            
        });
    }

    pageDfaInstance = new DfaInstance();
    pageAppState = new AppState();

    pageComponent = observer(({ dfaInstance,appState }) => (
        <div className={styles.divContentWrapper}>
            <Head>
                <title>Automata Playground - DFA</title>
            </Head>

            <AutomataToolbar appState={appState} className={styles.dfaToolbar} />
            
            <div id="div-canvas-wrapper" className={styles.divCanvasWrapper}>
                
            </div>
        </div>
    ));

    render = () => (
        <this.pageComponent dfaInstance={this.pageDfaInstance} appState={this.pageAppState}/>
    )
}