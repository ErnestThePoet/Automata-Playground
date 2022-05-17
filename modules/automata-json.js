
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

export function loadDfaJsonString(dfaJsonString, dfaInstance, alertData) {
    let dfaData;
    try {
        dfaData = JSON.parse(dfaJsonString);
    } catch (error) {
        alertData.showAlertAnimated("文件格式非法");
        return;
    }

    if (!dfaData.automataType
        || !dfaData.version
        || !dfaData.nextStateId
        || !dfaData.nextEdgeId
        || !dfaData.states
        || !dfaData.graphNodes
        || !dfaData.graphEdges) {
        alertData.showAlertAnimated("文件格式非法");
        return;
    }

    if (dfaData.automataType !== AUTOMATA_TYPE_TOKENS.DFA) {
        alertData.showAlertAnimated("自动机类型不是DFA");
        return;
    }

    if (dfaData.version < minDfaAcceptableVersion
        || dfaData.version > maxDfaAcceptableVersion) {
        alertData.showAlertAnimated("文件版本不兼容");
        return;
    }

    dfaInstance.loadDfaData(
        dfaData.nextStateId,
        dfaData.nextEdgeId,
        dfaData.states,
        dfaData.graphNodes,
        dfaData.graphEdges
    );
}