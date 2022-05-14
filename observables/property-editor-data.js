import { makeAutoObservable } from "mobx";
import { AUTOMATA_STATE_TYPES } from "./automata-state-types";

export class PropertyEditorData{
    constructor() {
        makeAutoObservable(this);
    }

    // property editor position
    propertyEditorTop = 0;
    propertyEditorLeft = 0;

    // updated on click or when adding states or transitions
    selectedGraphNodeId = 0;
    selectedGraphEdgeUuid = "";
    // user modifiable
    editorInputTexts = [""];
    selectedStateType = AUTOMATA_STATE_TYPES.NORMAL;

    isInvalidInputWarningShow = false;
    invalidInputWarningText = "";

    setPropertyEditorPosition(top, left) {
        this.propertyEditorTop = top;
        this.propertyEditorLeft = left;
    }

    setSelectedGraphNodeId(id) {
        this.selectedGraphNodeId = id;
    }

    setSelectedGraphEdgeUuid(uuid) {
        this.selectedGraphEdgeUuid = uuid;
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
        this.editorInputTexts = "";
        this.hideInvalidInputWarning();
    }
}