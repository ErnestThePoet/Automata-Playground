import react from "react";
import Head from "next/head";

export default class DfaPage extends react.Component {
    constructor(props) {
        super(props);

    }

    render = () => (
        <div>
            <Head>
                <title>Automata Playground - DFA</title>
            </Head>
        </div>
    )
}