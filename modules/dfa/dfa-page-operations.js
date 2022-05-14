import { APP_STATES } from "observables/app-state";
import { AUTOMATA_STATE_TYPES } from "observables/automata-state-types";

export function handleGraphClick(e, pageAppState, pageDfaInstance, pagePropertyEditorData) {
    console.log(e)
    switch (pageAppState.currentState) {
        case APP_STATES.DEFAULT:
            // if click on node or edge, enter EDIT_STATE or EDIT_TRANSITION state
            if (e.nodes.length > 0) {
                pagePropertyEditorData.setSelectedGraphNodeId(e.nodes[0]);
                pagePropertyEditorData.setPropertyEditorPosition(e.event.center.y, e.event.center.x);
                pageAppState.changeAppState(APP_STATES.EDIT_STATE);
            }
            else if (e.edges.length > 0) {
                pagePropertyEditorData.setSelectedGraphEdgeUuid(e.edges[0]);
                pagePropertyEditorData.setPropertyEditorPosition(e.event.center.y, e.event.center.x);
                pageAppState.changeAppState(APP_STATES.EDIT_TRANSITION);
            }
            break;

        case APP_STATES.ADD_STATE_SELECT_POSITION:
            // get click point coordination, get a state name and go to EDIT_STATE
            const newStateName = `q${pageDfaInstance.nextStateId}`;
            const newStateType = pageDfaInstance.states.length == 0 ?
                AUTOMATA_STATE_TYPES.START :
                AUTOMATA_STATE_TYPES.NORMAL;

            pageDfaInstance.addState(
                newStateName,
                newStateType,
                e.pointer.canvas.x,
                e.pointer.canvas.y);
            
            pagePropertyEditorData.setSelectedGraphNodeId(pageDfaInstance.nextStateId - 1);
            
            pagePropertyEditorData.setPropertyEditorPosition(e.event.center.y, e.event.center.x);

            pageAppState.changeAppState(APP_STATES.EDIT_STATE);

            break;
        
        case APP_STATES.EDIT_STATE:
            pagePropertyEditorData.clearPropertyEditor();
            pageAppState.changeAppState(APP_STATES.DEFAULT);
            break;

        case APP_STATES.ADD_TRANSITION_SELECT_ORIG:
            
        case APP_STATES.ADD_TRANSITION_SELECT_DEST:
            
        case APP_STATES.EDIT_TRANSITION:
            pagePropertyEditorData.clearPropertyEditor();
            pageAppState.changeAppState(APP_STATES.DEFAULT);
            break;
            
        case APP_STATES.RUN_AUTOMATA:
        default:
            break;
    }
}