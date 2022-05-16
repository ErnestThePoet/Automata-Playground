import { observer } from "mobx-react-lite";

import styles from "styles/run-panel.module.scss";
import classnames from "classnames";

// props requires appState, automataInstance, hasIterationLimit
export default observer(props => {
    

    return (
        <div className={classnames(props.className, styles.divRunPanelWrapper)}>
            <div className={classnames(styles.divRunControlsWrapper,"d-flex justify-content-evenly")}>
                <i className={classnames(styles.iRunControl, "fa-solid fa-forward-fast")}></i>
                <i className={classnames(styles.iRunControl,"fa-solid fa-forward-step")}></i>
                <i className={classnames(styles.iRunControl, "fa-solid fa-backward-step")}></i>
                <i className={classnames(styles.iRunControl, "fa-solid fa-arrow-rotate-right")}></i>
                <i className={classnames(styles.iRunControlClose, "fa-solid fa-xmark")}></i>
            </div>
            
            <div className={styles.divLowerPartWrapper}>
                <span className={styles.spanLowerLeftPartWrapper}>
                    <div className={classnames(styles.divStringWrapper, "d-flex flex-wrap")}>
                        
                    </div>

                    <div className={styles.divStringInputWrapper}>
                        <input className={styles.inString} />
                    </div>
                </span>

                <span className={classnames(
                    styles.spanLowerRightPartWrapper,
                    "d-flex justify-content-center align-items-center")}>
                    <span className={styles.spanCurrentStateLabel}>当前状态：</span>

                    <span className={styles.spanCurrentState}>q0</span>
                </span>
            </div>

            
        </div>
    )
});