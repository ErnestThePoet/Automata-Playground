import react from "react";
import Link from "next/link";

import classnames from "classnames";

import styles from "styles/app.module.scss";

// global css must be added in _app.js
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

class MyApp extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAsideShow: false
        };
    }

    automataPageRef = react.createRef();

    // must not use func(){} syntax or this will not point to this component.
    importAutomataAtfString=()=> {
        this.automataPageRef.current.loadAutomataAtfString();
    }

    exportAutomataAtfString = () => {
        this.automataPageRef.current.exportAutomataAtfString();
    }

    render = () => {
        const { Component, pageProps } = this.props;

        return (
            <div className={styles.divMainWrapper} onClick={() => { this.setState({ isAsideShow: false }) }}>
                <nav className={classnames(styles.navNav, "d-flex justify-content-center align-items-center")}>
                    <span className={classnames(
                        styles.spanMenuIconWrapper,
                        "d-flex justify-content-center align-items-center",
                        this.state.isAsideShow ? styles.spanMenuIconWrapperActive : "")}
                        onClick={e => { e.stopPropagation(); this.setState(state => ({ isAsideShow: !state.isAsideShow })); }}>
                        <i className={classnames(styles.iMenuIcon, "fa-solid fa-bars")}></i>
                    </span>

                    <span className={styles.spanTitle}>HIT Automata Playground</span>
                </nav>

                <aside className={classnames(
                    styles.asideFunctionNav,
                    this.state.isAsideShow ? styles.asideFunctionNavShow : "")}
                    onClick={e => { e.stopPropagation() }}>
                    <ul>
                        <Link href="/dfa">
                            <li className={styles.liFunctionNavItem}>
                                <i className="fa-solid fa-plus"></i>
                                新建DFA
                            </li>
                        </Link>
                        
                        <Link href="/pda">
                            <li className={styles.liFunctionNavItem}>
                                <i className="fa-solid fa-plus"></i>
                                新建PDA
                            </li>
                        </Link>

                        <Link href="/tm">
                            <li className={styles.liFunctionNavItem}>
                                <i className="fa-solid fa-plus"></i>
                                新建TM
                            </li>
                        </Link>

                        <li className={styles.liFunctionNavItem}
                            onClick={this.importAutomataAtfString}>
                            <i className="fa-solid fa-file-import"></i>
                            导入
                        </li>
                        <li className={styles.liFunctionNavItem}
                            onClick={this.exportAutomataAtfString}
                            >
                            <i className="fa-solid fa-file-arrow-down"></i>
                            保存
                        </li>
                        <li className={styles.liFunctionNavItem}>
                            <i className="fa-solid fa-xmark"></i>
                            清空
                        </li>
                    </ul>
                </aside>
                <Component {...pageProps} ref={this.automataPageRef} />
            </div>
        )
    }
}

export default MyApp