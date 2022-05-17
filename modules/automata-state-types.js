export const AUTOMATA_STATE_TYPES = {
    START: 0,
    NORMAL: 1,
    FINAL: 2
};

// used to color graph nodes differently
export const GRAPH_NODE_GROUPS = {
    START: "0",
    NORMAL: "1",
    FINAL: "2",
    START_CURRENT: "3",
    NORMAL_CURRENT: "4",
    FINAL_CURRENT:"5"
};

export function toGraphNodeGroup(stateType, isCurrent=false) {
    switch (stateType) {
        case AUTOMATA_STATE_TYPES.START:
            return isCurrent ? GRAPH_NODE_GROUPS.START_CURRENT : GRAPH_NODE_GROUPS.START;
        case AUTOMATA_STATE_TYPES.NORMAL:
            return isCurrent ? GRAPH_NODE_GROUPS.NORMAL_CURRENT : GRAPH_NODE_GROUPS.NORMAL;
        case AUTOMATA_STATE_TYPES.FINAL:
            return isCurrent ? GRAPH_NODE_GROUPS.FINAL_CURRENT : GRAPH_NODE_GROUPS.FINAL;
        default:
            return GRAPH_NODE_GROUPS.NORMAL;
    }
}
