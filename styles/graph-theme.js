import { GRAPH_NODE_GROUPS } from "observables/automata-state-types";

const NODE_BORDER_COLOR = "#3D3D3D"

const CURRENT_NODE_COLOR = {
    color: {
        background: "#FEB46A",
        border: NODE_BORDER_COLOR,
        highlight: {
            background: "#FEB46A",
            border: NODE_BORDER_COLOR
        },
        hover: {
            background: "#FE9832",
            border: NODE_BORDER_COLOR
        }
    }
}

export const START_NODE_BKG_COLOR = "#83E083";
export const NORMAL_NODE_BKG_COLOR = "#FFFFFF";
export const FINAL_NODE_BKG_COLOR = "#FF8E8E";

export const GROUP_COLOR_OPTIONS = {
    [GRAPH_NODE_GROUPS.START]: {
        color: {
            background: START_NODE_BKG_COLOR,
            border: NODE_BORDER_COLOR,
            highlight: {
                background: START_NODE_BKG_COLOR,
                border: NODE_BORDER_COLOR
            },
            hover: {
                background: "#5DDA5D",
                border: NODE_BORDER_COLOR
            }
        }
    },
    [GRAPH_NODE_GROUPS.NORMAL]: {
        color: {
            background: NORMAL_NODE_BKG_COLOR,
            border: NODE_BORDER_COLOR,
            highlight: {
                background: NORMAL_NODE_BKG_COLOR,
                border: NODE_BORDER_COLOR
            },
            hover: {
                background: "#DFDFDF",
                border: NODE_BORDER_COLOR
            }
        }
    },
    [GRAPH_NODE_GROUPS.FINAL]: {
        // too ugly
        // borderWidth: 2.5,
        // borderWidthSelected:2.5,
        color: {
            background: FINAL_NODE_BKG_COLOR,
            border: NODE_BORDER_COLOR,
            highlight: {
                background: FINAL_NODE_BKG_COLOR,
                border: NODE_BORDER_COLOR
            },
            hover: {
                background: "#FF7676",
                border: NODE_BORDER_COLOR
            }
        }
    },
    [GRAPH_NODE_GROUPS.START_CURRENT]: CURRENT_NODE_COLOR,
    [GRAPH_NODE_GROUPS.NORMAL_CURRENT]: CURRENT_NODE_COLOR,
    [GRAPH_NODE_GROUPS.FINAL_CURRENT]: CURRENT_NODE_COLOR
};