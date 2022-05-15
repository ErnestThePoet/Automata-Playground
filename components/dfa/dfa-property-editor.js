import { observer } from "mobx-react-lite";

import classnames from "classnames";

import styles from "styles/dfa/dfa-property-editor.module.scss";
import { AUTOMATA_STATE_TYPES } from "observables/automata-state-types";
import { APP_STATES } from "observables/app-state";

// props requires appState, dfaInstance, propertyEditorData
export default observer(props => {
    const onPropertyInput = e => {
        props.propertyEditorData.setEditorInputText(e.target.value, 0);
        switch (props.appState.currentState) {
            case APP_STATES.EDIT_STATE:
                if (e.target.value.length === 0) {
                    props.propertyEditorData.showInvalidInputWarning("状态名不能为空");
                    return;
                }

                if (!props.dfaInstance.isStateNameUnique(e.target.value)) {
                    props.propertyEditorData.showInvalidInputWarning("状态名已经存在");
                    return;
                }

                props.propertyEditorData.hideInvalidInputWarning();

                break;
            
            case APP_STATES.EDIT_TRANSITION:
                if (e.target.value.length !== 1) {
                    props.propertyEditorData.showInvalidInputWarning("转移只能消耗一个字符");
                    return;
                }

                props.propertyEditorData.hideInvalidInputWarning();

                break;
        }
    };

    const onStateTypeChange = type => {
        props.propertyEditorData.setSelectedStateType(type);
    }

    const onConfirmClick = () => {
        if (props.propertyEditorData.isInvalidInputWarningShow) {
            return;
        }

        switch (props.appState.currentState) {
            case APP_STATES.EDIT_STATE:
                props.dfaInstance.editState(
                    props.propertyEditorData.selectedGraphNodeId,
                    props.propertyEditorData.editorInputTexts[0],
                    props.propertyEditorData.selectedStateType,
                    undefined,
                    undefined
                );

                break;

            case APP_STATES.EDIT_TRANSITION:
                props.dfaInstance.editTransition(
                    props.propertyEditorData.selectedGraphEdgeUuid,
                    props.propertyEditorData.editorInputTexts[0]
                );

                break;
        }

        props.appState.changeAppState(APP_STATES.DEFAULT);
    };

    const onCancelClick = () => {
        props.propertyEditorData.hideInvalidInputWarning();
        props.appState.changeAppState(APP_STATES.DEFAULT);
    };

    return (
        <div id="property-editor-wrapper"
            className={classnames(
            props.className, styles.propertyEditorWrapper, "d-flex align-items-center")}
            style={props.style}>
            
            <input
                className={styles.inPropertyInput}
                style={props.propertyEditorData.isInvalidInputWarningShow?{borderColor:"red",color:"red"}:{}}
                type="text"
                value={props.propertyEditorData.editorInputTexts[0]}
                onInput={onPropertyInput} />
            
            <label className={styles.lblInvalidInputInfo}
                style={{ display: props.propertyEditorData.isInvalidInputWarningShow?"block":"none"}}>
                {props.propertyEditorData.invalidInputWarningText}
            </label>
            
            <span className={styles.spanStateTypeGroup}>
                {/* the bind is a must or there will be a 'too maly renders' error.*/}
                <div className="d-flex align-items-center"
                    onClick={onStateTypeChange.bind(this,AUTOMATA_STATE_TYPES.START)}>
                    <input className={styles.inStateType} type="radio" name="inStateType" readOnly
                        checked={props.propertyEditorData.selectedStateType===AUTOMATA_STATE_TYPES.START }/>
                    <label className={styles.lblStateType}>开始</label>
                </div>
                
                <div className="d-flex align-items-center"
                    onClick={onStateTypeChange.bind(this, AUTOMATA_STATE_TYPES.NORMAL)}>
                    <input className={styles.inStateType} type="radio" name="inStateType" readOnly
                        checked={props.propertyEditorData.selectedStateType === AUTOMATA_STATE_TYPES.NORMAL}/>
                    <label className={styles.lblStateType}>普通</label>
                </div>

                <div className="d-flex align-items-center"
                    onClick={onStateTypeChange.bind(this, AUTOMATA_STATE_TYPES.FINAL)}>
                    <input className={styles.inStateType} type="radio" name="inStateType" readOnly
                        checked={props.propertyEditorData.selectedStateType === AUTOMATA_STATE_TYPES.FINAL}/>
                    <label className={styles.lblStateType}>接收</label>
                </div>
            </span>

            <span className={classnames(
                styles.spanConfirmWrapper,
                "d-flex justify-content-center align-items-center")}
                onClick={onConfirmClick}>
                <i className="fa-solid fa-check"></i>
            </span>
            
            <span className={classnames(
                styles.spanCancelWrapper,
                "d-flex justify-content-center align-items-center")}
                onClick={onCancelClick}>
                <i className="fa-solid fa-xmark"></i>
            </span>
            
        </div>
    )
})