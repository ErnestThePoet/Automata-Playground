import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import classnames from "classnames";

import styles from "styles/dfa-tm/dfa-tm-property-editor.module.scss";
import tmStyles from "styles/tm/tm-property-editor.module.scss";
import { AUTOMATA_STATE_TYPES } from "modules/automata-state-types";
import { APP_STATES } from "observables/app-state";

import { adjustPropertyEditorPosition, isMobileBrowser } from "modules/utilities";

export const checkInputValidity = (appState,propertyEditorData,tmInstance) => {
    switch (appState.currentState) {
        case APP_STATES.EDIT_STATE:
            if (propertyEditorData.editorInputTexts[0].length === 0) {
                propertyEditorData.showInvalidInputWarning("状态名不能为空");
                return;
            }

            if (!tmInstance.isStateNameUnique(
                propertyEditorData.editorInputTexts[0])) {
                propertyEditorData.showInvalidInputWarning("状态名已经存在");
                return;
            }

            propertyEditorData.hideInvalidInputWarning();

            break;

        case APP_STATES.EDIT_TRANSITION:
            if (propertyEditorData.editorInputTexts[0].length === 0) {
                propertyEditorData.showInvalidInputWarning("输入字符列表不能为空");
                return;
            }

            const isCharSeqUnique = tmInstance.isTransitionCharSeqUnique(
                propertyEditorData.selectedGraphEdgeId,
                propertyEditorData.editorInputTexts[0]
            );

            if (!isCharSeqUnique[0]) {
                propertyEditorData.showInvalidInputWarning(
                    `已经有字符${isCharSeqUnique[1]}的转移`);
                return;
            }

            if (!propertyEditorData.isEditorInputTextsLengthEqual) {
                propertyEditorData.showInvalidInputWarning(
                    `输入数据长度不相等`);
                return;
            }

            if (!tmInstance.isTransitionMoveSeqValid(
                propertyEditorData.editorInputTexts[2])) {
                propertyEditorData.showInvalidInputWarning(
                    `移动序列只能包含字符"LRlr"`);
                return;
            }

            propertyEditorData.hideInvalidInputWarning();

            break;
    }
};

// props requires appState, tmInstance, propertyEditorData
export default observer(props => {
    // select first input text on first render
    useEffect(() => {
        document.getElementById("in-property-editor-first-input").select();
    }, []);

    const onPropertyInput = e => {
        props.propertyEditorData.setEditorInputText(e.target.value, 0);
        checkInputValidity(props.appState,props.propertyEditorData,props.tmInstance);
    };

    const onReplaceSeqInput = e => {
        props.propertyEditorData.setEditorInputText(e.target.value, 1);
        checkInputValidity(props.appState, props.propertyEditorData, props.tmInstance);
    };

    const onMoveSeqInput = e => {
        props.propertyEditorData.setEditorInputText(e.target.value, 2);
        checkInputValidity(props.appState, props.propertyEditorData, props.tmInstance);
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
                props.tmInstance.editState(
                    props.propertyEditorData.selectedGraphNodeId,
                    props.propertyEditorData.editorInputTexts[0],
                    props.propertyEditorData.selectedStateType,
                    undefined,
                    undefined
                );

                break;

            case APP_STATES.EDIT_TRANSITION:
                props.tmInstance.editTransition(
                    props.propertyEditorData.selectedGraphEdgeId,
                    props.propertyEditorData.editorInputTexts[0],
                    props.propertyEditorData.editorInputTexts[1],
                    props.propertyEditorData.editorInputTexts[2].toUpperCase(),
                );

                break;
        }

        props.appState.changeAppState(APP_STATES.DEFAULT);
    };

    const onCancelClick = () => {
        props.propertyEditorData.hideInvalidInputWarning();
        props.appState.changeAppState(APP_STATES.DEFAULT);
    };

    const onPropertyEditorDragStart = e => {
        e.stopPropagation();

        props.propertyEditorData.propertyEditorOrigTop =
            props.propertyEditorData.propertyEditorTop;
        props.propertyEditorData.propertyEditorOrigLeft =
            props.propertyEditorData.propertyEditorLeft;
        
        props.propertyEditorData.dragStartX = e.clientX;
        props.propertyEditorData.dragStartY = e.clientY;
    }

    const onPropertyEditorDrag = e => {
        e.stopPropagation();

        const newTop =
            props.propertyEditorData.propertyEditorOrigTop
            + e.clientY
            - props.propertyEditorData.dragStartY;
        const newLeft =
            props.propertyEditorData.propertyEditorOrigLeft
            + e.clientX
            - props.propertyEditorData.dragStartX;

        // if drag is moving and not drag end
        if (props.propertyEditorData.propertyEditorTop !== newTop
            && props.propertyEditorData.propertyEditorLeft !== newLeft
            && e.clientX !== 0 && e.clientY !== 0) {
            props.propertyEditorData.setPropertyEditorPosition(newTop, newLeft, false);
            adjustPropertyEditorPosition(props.appState, props.propertyEditorData, false);
        }
    };

    return (
        <div id="property-editor-wrapper"
            className={classnames(
            props.className, styles.propertyEditorWrapper, "d-flex align-items-center")}
            style={props.style}>
            
            {
                !isMobileBrowser() &&
                <i className={classnames(styles.iDragArea, "fa-solid fa-ellipsis-vertical")}
                    draggable
                    onDragStart={onPropertyEditorDragStart}
                    onDrag={onPropertyEditorDrag}></i>
            }
            
            <label className={styles.lblTransitionCharsTip}
                style={{
                    display: props.appState.currentState === APP_STATES.EDIT_TRANSITION
                        ? "block"
                        : "none"
                }}>
                多个输入字符请连续输入, 如01
            </label>
            
            <input
                id="in-property-editor-first-input"
                className={props.appState.currentState === APP_STATES.EDIT_STATE
                    ? styles.inPropertyInput
                    : tmStyles.inPropertyInput}
                style={props.propertyEditorData.isInvalidInputWarningShow ? { borderColor: "red", color: "red" } : {}}
                type="text"
                value={props.propertyEditorData.editorInputTexts[0]}
                onInput={onPropertyInput} />
            
            {/* replaceSeq input*/}
            {
                props.appState.currentState === APP_STATES.EDIT_TRANSITION &&
                <input
                    className={tmStyles.inPropertyInput}
                style={props.propertyEditorData.isInvalidInputWarningShow ? { borderColor: "red", color: "red" } : {}}
                type="text"
                value={props.propertyEditorData.editorInputTexts[1]}
                onInput={onReplaceSeqInput} />
            }

            {/* moveSeq input*/}
            {
                props.appState.currentState === APP_STATES.EDIT_TRANSITION &&
                <input
                    className={tmStyles.inMoveSeqInput}
                    style={props.propertyEditorData.isInvalidInputWarningShow ? { borderColor: "red", color: "red" } : {}}
                    type="text"
                    value={props.propertyEditorData.editorInputTexts[2]}
                    onInput={onMoveSeqInput} />
            }
            
            <label className={styles.lblInvalidInputInfo}
                style={{ display: props.propertyEditorData.isInvalidInputWarningShow?"block":"none"}}>
                {props.propertyEditorData.invalidInputWarningText}
            </label>
            
            <span className={styles.spanStateTypeGroup}
                style={{
                display:props.appState.currentState===APP_STATES.EDIT_STATE?"inline":"none"
                }}>
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