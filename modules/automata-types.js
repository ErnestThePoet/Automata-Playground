import { PAGE_PATHS } from "modules/router-paths";

// used for internal type identification
export const AUTOMATA_TYPES = {
    DFA: "DFA",
    TM: "TM"
};

// used for UI display
export const AUTOMATA_TYPE_NAMES = {
    DFA: "DFA",
    TM: "TM"
};

export function getAutomataTypeNameByPathname(pathname) {
    switch (pathname) {
        case PAGE_PATHS.DFA_PAGE:
            return AUTOMATA_TYPE_NAMES.DFA;
        case PAGE_PATHS.TM_PAGE:
            return AUTOMATA_TYPE_NAMES.TM;
        default:
            return "";
    }
};