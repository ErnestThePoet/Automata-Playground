import react from "react";
import Head from "next/head";

import DfaToolbar from "components/dfa/dfa-toolbar";

import styles from "styles/dfa.module.scss";

export default class DfaPage extends react.Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <div className={styles.divContentWrapper}>
            <Head>
                <title>Automata Playground - DFA</title>
            </Head>

            <DfaToolbar className={styles.dfaToolbar}/>
        </div>
    )
}