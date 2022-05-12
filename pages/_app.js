import react from "react";

import { Provider } from "react-redux";
import { store } from "store/store";
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

    render = () => {
        const { Component, pageProps } = this.props;

        return (
            <Provider store={store}>
                <div className={styles.divMainWrapper} onClick={()=>{this.setState({isAsideShow:false})}}>
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
                            <li className={styles.liFunctionNavItem}>
                                <i className="fa-solid fa-plus"></i>
                                新建DFA
                            </li>
                            <li className={styles.liFunctionNavItem}>
                                <i className="fa-solid fa-plus"></i>
                                新建PDA
                            </li>
                            <li className={styles.liFunctionNavItem}>
                                <i className="fa-solid fa-plus"></i>
                                新建TM
                            </li>
                            <li className={styles.liFunctionNavItem}>
                                <i className="fa-solid fa-file-import"></i>
                                导入
                            </li>
                            <li className={styles.liFunctionNavItem}>
                                <i className="fa-solid fa-file-arrow-down"></i>
                                保存
                            </li>
                            <li className={styles.liFunctionNavItem}>
                                <i className="fa-solid fa-xmark"></i>
                                清空
                            </li>
                        </ul>
                    </aside>
                    <Component {...pageProps} />
                </div>
            </Provider>
        )
    }
}

export default MyApp