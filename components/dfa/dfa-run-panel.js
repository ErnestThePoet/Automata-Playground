import { observer } from "mobx-react-lite";

import { APP_STATES } from "observables/app-state";
import { AUTOMATA_STATE_TYPES } from "modules/automata-state-types";

import { START_NODE_BKG_COLOR,NORMAL_NODE_BKG_COLOR,FINAL_NODE_BKG_COLOR } from "styles/graph-theme";

import styles from "styles/dfa-tm/dfa-tm-run-panel.module.scss";
import classnames from "classnames";

// props requires appState, dfaInstance, alertData
export default observer(props => {
    const onRunSingleStepClick = e => {
        e.stopPropagation();

        props.dfaInstance.runSingleStep();

        if (props.dfaInstance.isRunningStuck) {
            if (!props.alertData.isAlertShow) {
                props.alertData.showAlertAnimated("DFA处于卡死状态");
            }
        }
    };

    const onRunToEndClick = e => {
        e.stopPropagation();

        props.dfaInstance.runToEnd();

        if (props.dfaInstance.isRunningStuck) {
            if (!props.alertData.isAlertShow) {
                props.alertData.showAlertAnimated("DFA处于卡死状态");
            }
        }
    };

    const onRunSingleBackClick = e => {
        e.stopPropagation();

        props.dfaInstance.runSingleBack();
    };

    const onRunResetClick = e => {
        e.stopPropagation();

        props.dfaInstance.runReset();
    };
    
    const onCloseClick = e => {
        e.stopPropagation();

        props.dfaInstance.runExit();

        props.appState.changeAppState(APP_STATES.DEFAULT);
    };

    const onRunStringInput = e => {
        props.dfaInstance.setRunString(e.target.value);
        props.dfaInstance.initRun();
    };

    return (
        <div className={classnames(props.className, styles.divRunPanelWrapper)} style={props.style}>
            <div className={classnames(styles.divRunControlsWrapper, "d-flex justify-content-evenly")}>
                <i className={classnames(styles.iRunControl, "fa-solid fa-forward-step")}
                onClick={onRunSingleStepClick}></i>
                <i className={classnames(styles.iRunControl, "fa-solid fa-forward-fast")}
                onClick={onRunToEndClick}></i>
                <i className={classnames(styles.iRunControl, "fa-solid fa-backward-step")}
                onClick={onRunSingleBackClick}></i>
                <i className={classnames(styles.iRunControl, "fa-solid fa-arrow-rotate-right")}
                onClick={onRunResetClick}></i>
                <i className={classnames(styles.iRunControlClose, "fa-solid fa-xmark")}
                onClick={onCloseClick}></i>
            </div>
            
            <div className={classnames(styles.divLowerPartWrapper,"d-flex")}>
                <span className={styles.spanLowerLeftPartWrapper}>
                    <div className={classnames(styles.divStringWrapper, "d-flex flex-wrap")}>
                        {props.dfaInstance.runString.split("").map((x,i) => (
                            <span key={i} className={i < props.dfaInstance.nextRunStringCharIndex
                                ? styles.spanStringCharConsumed : styles.spanStringChar}>{x}</span>
                        ))}
                    </div>

                    <div className={styles.divStringInputWrapper}>
                        <input className={styles.inString}
                            value={props.dfaInstance.runString}
                            onInput={onRunStringInput}/>
                    </div>
                </span>

                <span className={classnames(
                    styles.spanLowerRightPartWrapper,
                    "d-flex flex-column justify-content-center align-items-center")}>
                    <span className={styles.spanCurrentStateLabel}>当前状态</span>

                    {/* occupies a fixed size and eliminishes size vibration caused by border size change
                    of spanCurrentState */}
                    <span className={classnames(styles.spanCurrentStateWrapper,
                        "d-flex justify-content-center align-items-center")}>
                        <span className={styles.spanCurrentState}
                            style={{
                                borderStyle: props.dfaInstance.currentRunState.type === AUTOMATA_STATE_TYPES.START
                                    ? "dotted"
                                    : (props.dfaInstance.currentRunState.type === AUTOMATA_STATE_TYPES.FINAL
                                        ? "double"
                                        : "solid"),
                                borderWidth: props.dfaInstance.currentRunState.type === AUTOMATA_STATE_TYPES.FINAL
                                    ? 5
                                    : 2,
                                backgroundColor: props.dfaInstance.currentRunState.type === AUTOMATA_STATE_TYPES.START
                                    ? START_NODE_BKG_COLOR
                                    : (props.dfaInstance.currentRunState.type === AUTOMATA_STATE_TYPES.FINAL
                                        ? FINAL_NODE_BKG_COLOR
                                        : NORMAL_NODE_BKG_COLOR)
                            }}>
                            {props.dfaInstance.currentRunState.name}
                        </span>
                    </span>
                </span>
            </div>

            
        </div>
    )
});