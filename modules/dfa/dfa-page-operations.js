import { APP_STATES } from "observables/app-state";
import { AUTOMATA_STATE_TYPES } from "observables/automata-state-types";

export function handleGraphClick(e, pageAppState, pageDfaInstance) {
    switch (pageAppState.currentState) {
        case APP_STATES.DEFAULT:
            // if click on node or edge, enter EDIT_STATE or EDIT_TRANSITION state
            if (e.nodes.length > 0) {
                pageAppState.selectedGraphNodeId = e.nodes[0];
                pageAppState.changeAppState(APP_STATES.EDIT_STATE);
            }
            else if (e.edges.length > 0) {
                pageAppState.selectedGraphEdgeUuid = e.edges[0];
                pageAppState.changeAppState(APP_STATES.EDIT_TRANSITION);
            }
            break;

        case APP_STATES.ADD_STATE_SELECT_POSITION:
            // get click point coordination, get a state name and go to EDIT_STATE
            const newStateName = `q${pageDfaInstance.nextStateId}`;
            const newStateType = pageDfaInstance.states.length == 0 ?
                AUTOMATA_STATE_TYPES.START :
                AUTOMATA_STATE_TYPES.NORMAL;

            pageDfaInstance.selectedGraphNodeId = pageDfaInstance.nextStateId;

            pageDfaInstance.addState(
                newStateName,
                newStateType,
                e.pointer.canvas.x,
                e.pointer.canvas.y);
            
            pageAppState.changeAppState(APP_STATES.EDIT_STATE);

            break;

        default:
            console.log("default");
    }
}