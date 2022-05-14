import { observer } from "mobx-react-lite";

import classnames from "classnames";

import styles from "styles/dfa/dfa-property-editor.module.scss";
import { AUTOMATA_STATE_TYPES } from "observables/automata-state-types";

// props requires pageAppState, pageDfaInstance
export default observer(props => {
    const onPropertyInput = e => {
        console.log(e);
    };

    const onStateTypeChange = type => {
        
    }

    const onConfirmClick = () => {
        console.log("cfm")
    };

    const onCancelClick = () => {
        console.log("canc")
    };

    return (
        <div className={classnames(props.className, styles.propertyEditorWrapper,"d-flex align-items-center")}>
            <input
                className={styles.inPropertyInput}
                type="text"
                value={props.dfaInstance.getSelectedStateName}
                onInput={onPropertyInput} />
            
            <span className={styles.spanStateTypeGroup}>
                <div onClick={onStateTypeChange(AUTOMATA_STATE_TYPES.START)}>
                    <input className={styles.inStateType} type="radio" name="inStateType" />
                    <label className={styles.lblStateType}>开始状态</label>
                </div>
                
                <div onClick={onStateTypeChange(AUTOMATA_STATE_TYPES.NORMAL)}>
                    <input className={styles.inStateType} type="radio" name="inStateType" />
                    <label className={styles.lblStateType}>普通状态</label>
                </div>

                <div onClick={onStateTypeChange(AUTOMATA_STATE_TYPES.FINAL)}>
                    <input className={styles.inStateType} type="radio" name="inStateType" />
                    <label className={styles.lblStateType}>接收状态</label>
                </div>
            </span>

            <i className={classnames(styles.iConfirm, "fa-solid fa-check")} onClick={onConfirmClick}></i>
            <i className={classnames(styles.iCancel, "fa-solid fa-xmark")} onClick={onCancelClick}></i>
        </div>
    )
})