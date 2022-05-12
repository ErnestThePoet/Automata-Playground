import { ACTION_TYPE_CHANGE_PAGE,PAGE_INDEXES } from "./router-actions.js";

export function routerCurrentPageIndex(state=PAGE_INDEXES.PAGE_DFA, action) {
    switch (action.type) {
        case ACTION_TYPE_CHANGE_PAGE:
            return action.newPageIndex;
        default:
            return state;
    }
}