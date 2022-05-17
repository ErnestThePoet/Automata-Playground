import { AUTOMATA_TYPES } from "modules/automata-types";

const AUTOMATA_TYPE_TOKENS = {
    DFA: "AP_DFA",
    TM: "AP_TM"
};

const currentVersion = 1;
const minDfaAcceptableVersion = 1;
const maxDfaAcceptableVersion = 1;

export function generateDfaJsonString(dfaInstance) {
    return JSON.stringify({
        automataType: AUTOMATA_TYPE_TOKENS.DFA,
        version: currentVersion,
        nextStateId: dfaInstance.nextStateId,
        nextEdgeId: dfaInstance.nextEdgeId,
        states: dfaInstance.states,
        graphNodes: dfaInstance.graphNodes,
        graphEdges: dfaInstance.graphEdges
    });
}

export function generateTmJsonString(tmInstance) {
    return JSON.stringify({
        automataType: AUTOMATA_TYPE_TOKENS.TM,
        version: currentVersion,
        nextStateId: tmInstance.nextStateId,
        nextEdgeId: tmInstance.nextEdgeId,
        states: tmInstance.states,
        graphNodes: tmInstance.graphNodes,
        graphEdges: tmInstance.graphEdges
    });
}

export function parseAutomataJson(jsonString, alertData){
    let automataData;
    try {
        automataData = JSON.parse(jsonString);
    } catch (error) {
        alertData.showAlertAnimated("文件格式非法");
        return null;
    }

    if (!automataData.automataType
        || !automataData.version
        || !automataData.nextStateId
        || !automataData.nextEdgeId
        || !automataData.states
        || !automataData.graphNodes
        || !automataData.graphEdges) {
        alertData.showAlertAnimated("文件格式非法");
        return null;
    }

    if (automataData.version < minDfaAcceptableVersion
        || automataData.version > maxDfaAcceptableVersion) {
        alertData.showAlertAnimated("文件版本不兼容");
        return null;
    }

    return automataData;
}

export function getAutomataType(automataData) {
    switch (automataData.automataType) {
        case AUTOMATA_TYPE_TOKENS.DFA:
            return AUTOMATA_TYPES.DFA;
        case AUTOMATA_TYPE_TOKENS.TM:
            return AUTOMATA_TYPES.TM;
        default:
            return "";
    }
}

export function loadAutomataData(automataData, automataInstance) {
    automataInstance.loadData(
        automataData.nextStateId,
        automataData.nextEdgeId,
        automataData.states,
        automataData.graphNodes,
        automataData.graphEdges
    );
}