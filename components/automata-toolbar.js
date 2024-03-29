import { observer } from "mobx-react-lite";
import { APP_STATES } from "observables/app-state";

import styles from "styles/automata-toolbar.module.scss";

import classnames from "classnames";

// props requires appState, removeSelected, runAutomata
const DfaToolbar = props => {
    const onAddStateClick = e => {
        e.stopPropagation();

        // when adding a state, press again will exit adding
        if (props.appState.currentState === APP_STATES.ADD_STATE_SELECT_POSITION) {
            props.appState.changeAppState(APP_STATES.DEFAULT);
        }
        // except when running automata, on any other state we enter add state mode
        else if (props.appState.currentState !== APP_STATES.RUN_AUTOMATA) {
            props.appState.changeAppState(APP_STATES.ADD_STATE_SELECT_POSITION);
        }
    };

    const onAddTransitionClick = e => {
        e.stopPropagation();

        if (props.appState.currentState === APP_STATES.ADD_TRANSITION_SELECT_ORIG
            || props.appState.currentState === APP_STATES.ADD_TRANSITION_SELECT_DEST) {
            props.appState.changeAppState(APP_STATES.DEFAULT);
        }
        else if (props.appState.currentState !== APP_STATES.RUN_AUTOMATA) {
            props.appState.changeAppState(APP_STATES.ADD_TRANSITION_SELECT_ORIG);
        }
    };

    const onRemoveSelectedClick = e => {
        e.stopPropagation();

        if (props.appState.currentState === APP_STATES.EDIT_STATE
            || props.appState.currentState === APP_STATES.EDIT_TRANSITION) {
            props.removeSelected();
        }
    };

    const onRunAutomataClick = e => {
        e.stopPropagation();

        if (props.appState.currentState !== APP_STATES.ADD_STATE_SELECT_POSITION
            && props.appState.currentState !== APP_STATES.ADD_TRANSITION_SELECT_ORIG
            && props.appState.currentState !== APP_STATES.ADD_TRANSITION_SELECT_DEST) {
            props.runAutomata();
        }
    }

    return (
        <div className={classnames(props.className, styles.divToolbarWrapper)} style={props.style}>
            <div className="d-flex justify-content-center">
                <span className={classnames(
                    styles.spanButtonWrapper,
                    "d-flex flex-column align-items-center",
                    props.appState.currentState === APP_STATES.ADD_STATE_SELECT_POSITION
                        ? styles.spanButtonWrapperActive : "",
                    props.appState.currentState === APP_STATES.RUN_AUTOMATA
                        ? styles.spanButtonWrapperDisabled : "")}
                    onClick={onAddStateClick}>
                    <i className={classnames(styles.iButtonIcon, "fa-solid fa-circle-plus")}></i>
                    <span className={styles.spanButtonText}>
                        添加状态
                    </span>
                </span>

                <span className={classnames(
                    styles.spanButtonWrapper,
                    "d-flex flex-column align-items-center",
                    props.appState.currentState === APP_STATES.ADD_TRANSITION_SELECT_ORIG
                        ? styles.spanButtonWrapperActive
                        : (props.appState.currentState === APP_STATES.ADD_TRANSITION_SELECT_DEST
                            ? styles.spanButtonWrapperActiveSecond
                            : ""),
                    props.appState.currentState === APP_STATES.RUN_AUTOMATA
                        ? styles.spanButtonWrapperDisabled : "")}
                    onClick={onAddTransitionClick}>
                    <i className={classnames(styles.iButtonIcon, "fa-solid fa-arrow-right-long")}></i>
                    <span className={styles.spanButtonText}>
                        {
                            props.appState.currentState === APP_STATES.ADD_TRANSITION_SELECT_ORIG
                                ? "选择起点"
                                : (props.appState.currentState === APP_STATES.ADD_TRANSITION_SELECT_DEST
                                    ? "选择终点"
                                    : "添加转移")
                        }
                    </span>
                </span>

                <span className={classnames(
                    styles.spanButtonWrapper,
                    "d-flex flex-column align-items-center",
                    props.appState.currentState === APP_STATES.EDIT_STATE
                        || props.appState.currentState === APP_STATES.EDIT_TRANSITION
                        ? "" : styles.spanButtonWrapperDisabled)}
                    onClick={onRemoveSelectedClick}>
                    <i className={classnames(styles.iButtonIcon, "fa-solid fa-trash-can")}></i>
                    <span className={styles.spanButtonText}>删除选中</span>
                </span>

                <span className={classnames(
                    styles.spanButtonWrapper,
                    "d-flex flex-column align-items-center",
                    props.appState.currentState === APP_STATES.ADD_STATE_SELECT_POSITION
                        || props.appState.currentState === APP_STATES.ADD_TRANSITION_SELECT_ORIG
                        || props.appState.currentState === APP_STATES.ADD_TRANSITION_SELECT_DEST
                        ? styles.spanButtonWrapperDisabled : "")}
                    onClick={onRunAutomataClick}>
                    <i className={classnames(styles.iButtonIcon, "fa-solid fa-play")}></i>
                    <span className={styles.spanButtonText}>运行</span>
                </span>
            </div>
        </div>
    )
}

export default observer(DfaToolbar);