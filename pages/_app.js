import { Provider } from "react-redux";
import { store } from "store/store";

import { PAGE_INDEXES } from "store/router-actions";

import LinkContainer from "components/link-container";

import styles from "styles/app.module.scss";

// global css must be added in _app.js
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

import classnames from "classnames";



function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <div className={styles.divMainWrapper}>
                <nav className={classnames(styles.navNav, "d-flex justify-content-center align-items-center")}>
                    <LinkContainer href="/dfa" text="DFA" index={PAGE_INDEXES.PAGE_DFA} />
                    <span className={styles.spanDotSplitter}>·</span>
                    <LinkContainer href="/pda" text="PDA" index={PAGE_INDEXES.PAGE_PDA} />
                    <span className={styles.spanDotSplitter}>·</span>
                    <LinkContainer href="/tm" text="TM" index={PAGE_INDEXES.PAGE_TM}/>
                </nav>
                <Component {...pageProps} />
            </div>
        </Provider>
    )
}

export default MyApp