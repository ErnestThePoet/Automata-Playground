import { makeAutoObservable } from "mobx";
import { AUTOMATA_STATE_TYPES } from "./automata-state-types";

export class PropertyEditorData{
    constructor() {
        makeAutoObservable(this, {
            propertyEditorOrigTop: false,
            propertyEditorOrigLeft: false,
            dragStartX: false,
            dragStartY:false
        });
    }

    isPropertyEditorPositionAdjusted = false;
    // property editor position
    propertyEditorTop = 0;
    propertyEditorLeft = 0;

    // used for drag move control
    propertyEditorOrigTop = 0;
    propertyEditorOrigLeft = 0;
    dragStartX = 0;
    dragStartY = 0;

    // updated on click or when adding states or transitions
    selectedGraphNodeId = 0;
    selectedGraphEdgeId = "";
    // user modifiable
    editorInputTexts = ["","",""];
    selectedStateType = AUTOMATA_STATE_TYPES.NORMAL;

    isInvalidInputWarningShow = false;
    invalidInputWarningText = "";

    setPropertyEditorPosition(top, left, isAdjusted) {
        this.propertyEditorTop = top;
        this.propertyEditorLeft = left;
        this.isPropertyEditorPositionAdjusted = isAdjusted;
    }

    setSelectedGraphNodeId(id) {
        this.selectedGraphNodeId = id;
    }

    setSelectedGraphEdgeId(id) {
        this.selectedGraphEdgeId = id;
    }

    setEditorInputText(text,index) {
        this.editorInputTexts[index] = text;
    }

    setSelectedStateType(type) {
        this.selectedStateType = type;
    }

    showInvalidInputWarning(text) {
        this.invalidInputWarningText = text;
        this.isInvalidInputWarningShow = true;
    }

    hideInvalidInputWarning() {
        this.isInvalidInputWarningShow = false;
        this.invalidInputWarningText = "";
    }

    clearPropertyEditor() {
        for (let i = 0; i < this.editorInputTexts.length; i++){
            this.editorInputTexts[i] = "";
        }
        this.isPropertyEditorPositionAdjusted = false;
        this.hideInvalidInputWarning();
    }
}