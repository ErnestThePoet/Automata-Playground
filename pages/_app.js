import react from "react";

// in class component, we cannot use useRouter()
import Router from "next/router";

import { parseAutomataJson, getAutomataType } from "modules/automata-json";

import {
    AUTOMATA_TYPES,
    AUTOMATA_TYPE_NAMES,
    getAutomataTypeNameByPathname
} from "modules/automata-types";
import { PAGE_PATHS, BASE_PATH } from "modules/router-paths";

import Dialog from "components/dialog";

import classnames from "classnames";

import styles from "styles/app.module.scss";
import exampleDialogStyles from "styles/app-example-dialog.module.scss";

// global css must be added in _app.js
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

const DIALOG_AFFAIRS = {
    NOTHING:-1,
    CONFIRM_NEW_DFA: 0,
    CONFIRM_NEW_TM: 1,
    CONFIRM_LOAD_EXAMPLE: 2,
    CONFIRM_LOAD_FILE: 3,
    CONFIRM_CLEAR_ALL: 4
};

class MyApp extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            // this is the source for automata type display on navbar.
            // set to UNKNOWN to show nothing when page is loading.
            currentAutomataTypeName: AUTOMATA_TYPE_NAMES.UNKNOWN,
            
            isAsideShow: false,

            isExampleDialogShow: false,
            // each element is {title:String, url:String, type:String, one of AUTOMATA_TYPES}
            exampleList: [],

            isYesNoDialogShow: false,
            yesNoDialogTitle: "",
            yesNoDialogMessage: ""
        };

        // UI-irrelavant data
        this.data = {
            dialogAffair: DIALOG_AFFAIRS.CONFIRM_CLEAR_ALL,

            exampleJsonUrl: ""
        };
        
        // auto update automata type name when router change completes
        Router.events.on("routeChangeComplete", this.setAutomataTypeName);
    }
    
    componentDidMount = () => {
        // set automata type name on first render
        this.setAutomataTypeName();
    };

    automataPageRef = react.createRef();

    ///////////////////////////////// Helper functions /////////////////////////////////
    setAutomataTypeName = () => {
        this.setState({
            currentAutomataTypeName:getAutomataTypeNameByPathname(Router.pathname)
        });
    };

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

            switch (this.data.dialogAffair) {
                case DIALOG_AFFAIRS.CONFIRM_LOAD_EXAMPLE:
                    // re-display example dialog if user didn't confirm
                    this.setState({
                        isExampleDialogShow:true
                    });
                    break;
            }

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
                break;

            case DIALOG_AFFAIRS.CONFIRM_LOAD_EXAMPLE:
                this.loadExample();
                break;
        }

        // this can't be placed on function entry. After file dialog opens the dialog will
        // never disappear.
        this.setState({
            isYesNoDialogShow: false
        });
    };

    goToNewAutomataPage = (path, callback = () => { }) => {
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

    importAutomataJsonString = jsonString => {
        const automataData =
            parseAutomataJson(jsonString,
                this.automataPageRef.current.pageAlertData);

        if (automataData) {
            const automataType = getAutomataType(automataData);

            switch (automataType) {
                case AUTOMATA_TYPES.DFA:
                    this.goToNewAutomataPage(PAGE_PATHS.DFA_PAGE, () => {
                        this.automataPageRef.current.loadAutomataJsonString(automataData);
                    });
                    break;

                case AUTOMATA_TYPES.TM:
                    this.goToNewAutomataPage(PAGE_PATHS.TM_PAGE, () => {
                        this.automataPageRef.current.loadAutomataJsonString(automataData);
                    });
                    break;

                default:
                    this.automataPageRef.current.pageAlertData
                        .showAlertAnimated("???????????????????????????");
                    break;
            }
        }
    };

    loadExample = () => {
        this.setState({
            isExampleDialogShow: false
        });

        fetch(BASE_PATH+this.data.exampleJsonUrl)
            .then(res => {
                return res.text();
            })
            .then(res => {
                this.importAutomataJsonString(res);
            });
    };

    ///////////////////////////////// Aside onclick handlers /////////////////////////////////
    onNewDfaClick = () => {
        if (this.automataPageRef.current.isAutomataEmpty()) {
            this.goToNewAutomataPage(PAGE_PATHS.DFA_PAGE);
            return;
        }

        this.data.dialogAffair = DIALOG_AFFAIRS.CONFIRM_NEW_DFA;
        this.setState({
            yesNoDialogTitle: "??????DFA",
            yesNoDialogMessage: "??????????????????????????????????????????",
            isYesNoDialogShow: true
        });
    };

    onNewTmClick = () => {
        if (this.automataPageRef.current.isAutomataEmpty()) {
            this.goToNewAutomataPage(PAGE_PATHS.TM_PAGE);
            return;
        }

        this.data.dialogAffair = DIALOG_AFFAIRS.CONFIRM_NEW_TM;
        this.setState({
            yesNoDialogTitle: "??????TM",
            yesNoDialogMessage: "??????????????????????????????????????????",
            isYesNoDialogShow: true
        });
    };

    onOnlineExamplesClick = () => {
        fetch(BASE_PATH+"/example-list.json")
            .then(res => {
                return res.text();
            })
            .then(res => {
                this.setState({
                    isExampleDialogShow: true,
                    exampleList: JSON.parse(res)
                });
            });
    };

    onImportAutomataClick = () => {
        if (this.automataPageRef.current.isAutomataEmpty()) {
            document.getElementById("in-import-automata").click();
            return;
        }

        this.data.dialogAffair = DIALOG_AFFAIRS.CONFIRM_LOAD_FILE;
        this.setState({
            yesNoDialogTitle: "??????",
            yesNoDialogMessage: "????????????????????????????????????????????????",
            isYesNoDialogShow: true
        });
    };
    
    onExportAutomataClick = () => {
        const automataJsonString = this.automataPageRef.current.exportAutomataJsonString();

        if (!automataJsonString) {
            return;
        }

        const stringUrl = URL.createObjectURL(
            new Blob([automataJsonString], { type: "application/json" })
        );

        const anchor = document.createElement('a');
        anchor.href = stringUrl;
        anchor.download = `${Router.pathname === "/dfa" ? "dfa" : "tm"}.json`;

        anchor.click();

        URL.revokeObjectURL(stringUrl);
    };

    onClearAllClick = () => {
        this.data.dialogAffair = DIALOG_AFFAIRS.CONFIRM_CLEAR_ALL;
        this.setState({
            yesNoDialogTitle: "??????",
            yesNoDialogMessage: "?????????????????????????????????",
            isYesNoDialogShow: true
        });
    };

    onAboutClick = () => {
        this.hideAside();
        this.data.dialogAffair = DIALOG_AFFAIRS.NOTHING;
        this.setState({
            yesNoDialogTitle: "??????",
            yesNoDialogMessage: (
                <div>
                    <div style={{ textAlign: "center", marginBottom: 7 }}>
                        HIT Automata Playground
                    </div>
                    Author:
                    <br />
                    ????????????????????? 120L021615 ?????????
                    <br />

                    <div style={{ marginTop: 7 }}>
                        ???????????????
                        <a href="https://github.com/ErnestThePoet/Automata-Playground">Github</a>
                        <a style={{marginLeft:7}} href="https://gitee.com/ecui/automata-playground">Gitee</a>
                    </div>

                    <div style={{ textAlign: "center", marginTop: 7 }}>
                        May 2022, Ernest Cui
                    </div>
                </div>),
            isYesNoDialogShow: true
        });
    };

    ///////////////////////////////// Sub-handlers /////////////////////////////////
    onExampleItemClick = url => {
        this.data.exampleJsonUrl = url;

        if (this.automataPageRef.current.isAutomataEmpty()) {
            this.loadExample();
            return;
        }

        this.data.dialogAffair = DIALOG_AFFAIRS.CONFIRM_LOAD_EXAMPLE;
        this.setState({
            isExampleDialogShow:false,
            yesNoDialogTitle: "????????????",
            yesNoDialogMessage: "????????????????????????????????????????????????",
            isYesNoDialogShow: true
        });
    };

    // must not use func(){} syntax or this will not point to this component.
    onFileInputChange = e => {
        if (e.target.files.length === 0) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0]);
        fileReader.onload = res => {
            this.importAutomataJsonString(res.target.result);

            // clear file value to ensure onchange will be triggered again
            // if we load the same file next time.
            document.getElementById("in-import-automata").value = "";
        }
    };

    render = () => {
        const { Component, pageProps } = this.props;

        return (
            <div className={styles.divMainWrapper}
                onClick={() => { this.setState({ isAsideShow: false }) }}>
                <nav className={classnames(
                    styles.navNav,
                    "d-flex justify-content-center align-items-center")}>
                    <span className={classnames(
                        styles.spanMenuIconWrapper,
                        "d-flex justify-content-center align-items-center",
                        this.state.isAsideShow ? styles.spanMenuIconWrapperActive : "")}
                        onClick={e => {
                            e.stopPropagation();
                            this.setState(state => ({ isAsideShow: !state.isAsideShow }));
                        }}>
                        <i className={classnames(styles.iMenuIcon, "fa-solid fa-bars")}></i>
                    </span>

                    {/* prefix is included because we don't want users to see 
                    "HIT Automata Playground - " when loading.*/}
                    <span className={styles.spanTitle}>
                        HIT Automata Playground
                        {this.state.currentAutomataTypeName === AUTOMATA_TYPE_NAMES.UNKNOWN
                            ? ""
                            : ` - ${this.state.currentAutomataTypeName}`}
                    </span>
                </nav>

                <aside className={classnames(
                    styles.asideFunctionNav,
                    this.state.isAsideShow ? styles.asideFunctionNavShow : "")}
                    onClick={e => { e.stopPropagation() }}>
                    <ul>
                        <li onClick={this.onNewDfaClick}>
                            <i className="fa-solid fa-plus"></i>
                            ??????DFA
                        </li>

                        <li onClick={this.onNewTmClick}>
                            <i className="fa-solid fa-plus"></i>
                            ??????TM
                        </li>

                        <li
                            onClick={this.onOnlineExamplesClick}
                        >
                            <i className="fa-solid fa-book"></i>
                            ????????????
                        </li>

                        <li onClick={this.onImportAutomataClick}>
                            <i className="fa-solid fa-file-import"></i>
                            <input id="in-import-automata"
                                className={styles.inImportAutomata}
                                type="file"
                                accept=".json,application/json"
                                onChange={this.onFileInputChange} />
                            ??????
                        </li>
                        <li
                            onClick={this.onExportAutomataClick}
                        >
                            <i className="fa-solid fa-file-arrow-down"></i>
                            ??????
                        </li>
                        <li
                            onClick={this.onClearAllClick}>
                            <i className="fa-solid fa-xmark"></i>
                            ??????
                        </li>
                        <li
                            onClick={this.onAboutClick}>
                            <i className="fa-solid fa-circle-info"></i>
                            ??????
                        </li>
                    </ul>
                </aside>

                {
                    this.state.isYesNoDialogShow &&
                    <Dialog
                        title={this.state.yesNoDialogTitle}
                        closeDialog={this.closeDialog} >
                        {this.state.yesNoDialogMessage}
                    </Dialog>
                }

                {
                    this.state.isExampleDialogShow &&
                    <Dialog
                        className={exampleDialogStyles.divDialogContentWrapper}
                            title={`???????????? (${this.state.exampleList.length})`}
                        noButton
                            closeDialog={()=>this.setState({isExampleDialogShow:false})} >
                        <div className={classnames(
                            exampleDialogStyles.divExampleListWrapper,
                            "d-flex flex-column")}>
                            {
                                this.state.exampleList.map((x, i) => (
                                    <div key={i}
                                        className={exampleDialogStyles.divSingleExampleWrapper}
                                        onClick={() => this.onExampleItemClick(x.url)}>
                                        <i className="fa-solid fa-tag"></i>
                                        <span className={exampleDialogStyles.spanExampleTitle}>
                                            {x.title}
                                        </span>
                                        <span className={
                                            exampleDialogStyles[`spanTypeTag${x.type}`]
                                        }>
                                            {x.type}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </Dialog>
                }

                <Component {...pageProps} ref={this.automataPageRef} />
            </div>
        )
    }
}

export default MyApp;