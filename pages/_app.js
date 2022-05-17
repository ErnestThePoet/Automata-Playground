import react from "react";

// in class component, we cannot use useRouter()
import Router from "next/router";

import { parseAutomataJson, getAutomataType } from "modules/automata-json";

import YesNoDialog from "components/yes-no-dialog";

import classnames from "classnames";

import styles from "styles/app.module.scss";

// global css must be added in _app.js
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

const DIALOG_AFFAIRS = {
    CONFIRM_NEW_DFA:0,
    CONFIRM_NEW_TM:1,
    CONFIRM_LOAD_FILE: 2,
    CONFIRM_CLEAR_ALL: 3
};

const PAGE_PATHS = {
    DFA_PAGE: "/dfa",
    TM_PAGE: "/tm"
};

class MyApp extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAsideShow: false,

            isYesNoDialogShow: false,
            yesNoDialogTitle:"",
            yesNoDialogMessage:""
        };

        // UI-irrelavant data
        this.data = {
            dialogAffair: DIALOG_AFFAIRS.CONFIRM_CLEAR_ALL
        }
    }

    automataPageRef = react.createRef();

    hideAside = () => {
        this.setState({
            isAsideShow: false
        });
    };

    closeDialog = yes => {
        if (!yes) {
            this.setState({
                isYesNoDialogShow: false
            });
            
            return;
        }

        switch (this.data.dialogAffair) {
            case DIALOG_AFFAIRS.CONFIRM_NEW_DFA:
                this.goToNewAutomataPage(PAGE_PATHS.DFA_PAGE);
                break;
            
            case DIALOG_AFFAIRS.CONFIRM_NEW_TM:
                this.goToNewAutomataPage(PAGE_PATHS.TM_PAGE);
                break;
            
            case DIALOG_AFFAIRS.CONFIRM_LOAD_FILE:
                document.getElementById("in-import-automata").click();
                break;
            
            case DIALOG_AFFAIRS.CONFIRM_CLEAR_ALL:
                this.automataPageRef.current.clearAll();
                this.hideAside();
                break;
        }

        // this can't be placed on function entry. After file dialog opens the dialog will
        // never disappear.
        this.setState({
            isYesNoDialogShow: false
        });
    };

    goToNewAutomataPage = (path, callback=()=>{}) => {
        if (Router.pathname === path) {
            this.automataPageRef.current.clearAll();
            callback();
        }
        else {
            Router.push(path).then(() => {
                callback();
            });
        }

        this.hideAside();
    };

    newDfa = () => {
        if (this.automataPageRef.current.isAutomataEmpty()) {
            this.goToNewAutomataPage(PAGE_PATHS.DFA_PAGE);
            return;
        }

        this.data.dialogAffair = DIALOG_AFFAIRS.CONFIRM_NEW_DFA;
        this.setState({
            yesNoDialogTitle: "新建DFA",
            yesNoDialogMessage: "当前自动机将被清空。继续吗？",
            isYesNoDialogShow: true
        });
    };

    newTm = () => {
        if (this.automataPageRef.current.isAutomataEmpty()) {
            this.goToNewAutomataPage(PAGE_PATHS.TM_PAGE);
            return;
        }

        this.data.dialogAffair = DIALOG_AFFAIRS.CONFIRM_NEW_TM;
        this.setState({
            yesNoDialogTitle: "新建TM",
            yesNoDialogMessage: "当前自动机将被清空。继续吗？",
            isYesNoDialogShow: true
        });
    };

    onOnlineExamplesClick = () => {
        
    };

    onImportAutomataClick = () => {
        if (this.automataPageRef.current.isAutomataEmpty()) {
            document.getElementById("in-import-automata").click();
            return;
        }

        this.data.dialogAffair = DIALOG_AFFAIRS.CONFIRM_LOAD_FILE;
        this.setState({
            yesNoDialogTitle: "导入",
            yesNoDialogMessage: "当前自动机将被清空。继续导入吗？",
            isYesNoDialogShow: true
        });
    }

    // must not use func(){} syntax or this will not point to this component.
    importAutomataJsonString = e => {
        if (e.target.files.length === 0) {
            return;
        }
        
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0]);
        fileReader.onload = res => {
            const automataData =
                parseAutomataJson(res.target.result,
                    this.automataPageRef.current.pageAlertData);
            
            if (automataData) {
                const automataType = getAutomataType(automataData);

                switch (automataType) {
                    case "DFA":
                        this.goToNewAutomataPage(PAGE_PATHS.DFA_PAGE, () => {
                            this.automataPageRef.current.loadAutomataJsonString(automataData);
                        });
                        break;
                    
                    case "TM":
                        this.goToNewAutomataPage(PAGE_PATHS.TM_PAGE, () => {
                            this.automataPageRef.current.loadAutomataJsonString(automataData);
                        });
                        break;
                    
                    default:
                        this.automataPageRef.current.pageAlertData
                            .showAlertAnimated("自动机类型不受支持");
                        break;
                }
            }

            // clear file value to ensure onchange will be triggered again
            // if we load the same file next time.
            document.getElementById("in-import-automata").value = "";
        }
    };

    exportAutomataJsonString = () => {
        const automataJsonString = this.automataPageRef.current.exportAutomataJsonString();

        if (!automataJsonString) {
            return;
        }

        const stringUrl = URL.createObjectURL(
            new Blob([automataJsonString], { type: "application/json" })
        );

        const anchor = document.createElement('a');
        anchor.href = stringUrl;
        anchor.download = `${Router.pathname==="/dfa"?"dfa":"tm"}.json`;

        anchor.click();

        URL.revokeObjectURL(stringUrl);
    };

    clearAll = () => {
        this.data.dialogAffair = DIALOG_AFFAIRS.CONFIRM_CLEAR_ALL;
        this.setState({
            yesNoDialogTitle: "清空",
            yesNoDialogMessage: "确定清空当前自动机吗？",
            isYesNoDialogShow:true
        });
    };

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
                        <li onClick={this.newDfa}>
                            <i className="fa-solid fa-plus"></i>
                            新建DFA
                        </li>

                        <li onClick={this.newTm}>
                            <i className="fa-solid fa-plus"></i>
                            新建TM
                        </li>

                        <li
                            onClick={this.onOnlineExamplesClick}
                        >
                            <i className="fa-solid fa-book"></i>
                            在线示例
                        </li>

                        <li onClick={this.onImportAutomataClick}>
                            <i className="fa-solid fa-file-import"></i>
                            <input id="in-import-automata"
                                className={styles.inImportAutomata}
                                type="file"
                                accept=".json,application/json"
                                onChange={this.importAutomataJsonString}/>
                            导入
                        </li>
                        <li
                            onClick={this.exportAutomataJsonString}
                            >
                            <i className="fa-solid fa-file-arrow-down"></i>
                            保存
                        </li>
                        <li
                            onClick={this.clearAll}>
                            <i className="fa-solid fa-xmark"></i>
                            清空
                        </li>
                    </ul>
                </aside>

                {
                    this.state.isYesNoDialogShow &&
                    <YesNoDialog
                        title={this.state.yesNoDialogTitle}
                        message={this.state.yesNoDialogMessage}
                        closeDialog={this.closeDialog} />
                }

                <Component {...pageProps} ref={this.automataPageRef} />
            </div>
        )
    }
}

export default MyApp