export const ACTION_TYPE_CHANGE_PAGE = "CHANGE_PAGE";

export const PAGE_INDEXES = {
    PAGE_DFA: 0,
    PAGE_PDA: 1,
    PAGE_TM: 2
};

export function changeCurrentPage(newPageIndex) {
    return {
        type:ACTION_TYPE_CHANGE_PAGE,
        newPageIndex
    }
};