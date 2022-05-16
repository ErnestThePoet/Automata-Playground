import { observer } from "mobx-react-lite";

import { APP_STATES } from "observables/app-state";
import { AUTOMATA_STATE_TYPES } from "observables/automata-state-types";

import styles from "styles/run-panel.module.scss";
import classnames from "classnames";

// props requires appState, dfaInstance
export default observer(props => {
    const onRunSingleStepClick = e => {
        e.stopPropagation();

        props.dfaInstance.runSingleStep();
    };

    const onRunToEndClick = e => {
        e.stopPropagation();

        props.dfaInstance.runSingleStep();
    };

    const onRunSingleBackClick = e => {
        e.stopPropagation();

        props.dfaInstance.runSingleStep();
    };

    const onRunResetClick = e => {
        e.stopPropagation();

        props.dfaInstance.runSingleStep();
    };
    
    const onCloseClick = e => {
        e.stopPropagation();

        props.appState.changeAppState(APP_STATES.DEFAULT);
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
                        
                    </div>

                    <div className={styles.divStringInputWrapper}>
                        <input className={styles.inString} />
                    </div>
                </span>

                <span className={classnames(
                    styles.spanLowerRightPartWrapper,
                    "d-flex flex-column justify-content-center align-items-center")}>
                    <span className={styles.spanCurrentStateLabel}>当前状态</span>

                    <span className={styles.spanCurrentState}
                        style={{
                            borderStyle: props.dfaInstance.currentRunState.type === AUTOMATA_STATE_TYPES.START
                                ? "dotted"
                                : (props.dfaInstance.currentRunState.type === AUTOMATA_STATE_TYPES.FINAL
                                    ? "double"
                                    : "solid"),
                            borderWidth: props.dfaInstance.currentRunState.type === AUTOMATA_STATE_TYPES.FINAL
                                    ? 5
                                    : 2
                    }}>
                        {props.dfaInstance.currentRunState.name}
                    </span>
                </span>
            </div>

            
        </div>
    )
});