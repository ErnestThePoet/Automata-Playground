import { makeAutoObservable } from "mobx";

export const APP_STATES = {
    DEFAULT: 0,

    ADD_STATE_SELECT_POSITION: 1,
    EDIT_STATE: 2,

    ADD_TRANSITION_SELECT_ORIG: 3,
    ADD_TRANSITION_SELECT_DEST: 4,
    EDIT_TRANSITION: 5,

    RUN_AUTOMATA: 6
};

export class AppState{
    constructor() {
        makeAutoObservable(this);
    }

    currentState = APP_STATES.DEFAULT;

    changeAppState(newState) {
        this.currentState = newState;
    }
}