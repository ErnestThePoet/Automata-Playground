import react from "react";
import Head from "next/head";

export default class TmPage extends react.Component{
    constructor(props) {
        super(props);

    }

    render = () => (
        <div>
            <Head>
                <title>Automata Playground - TM</title>
            </Head>
        </div>
    )
}