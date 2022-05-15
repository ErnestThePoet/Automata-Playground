import { APP_STATES } from "observables/app-state";
import { AUTOMATA_STATE_TYPES } from "observables/automata-state-types";

import { getNodePosition } from "modules/graph-operations";
import { adjustPropertyEditorPosition } from "modules/utilities";

export function handleGraphClick(
    e, pageAppState, pageDfaInstance, pagePropertyEditorData) {
    switch (pageAppState.currentState) {
        case APP_STATES.DEFAULT:
            // if click on node or edge, enter EDIT_STATE or EDIT_TRANSITION state
            if (e.nodes.length > 0) {
                pagePropertyEditorData.setSelectedGraphNodeId(e.nodes[0]);

                pagePropertyEditorData.setEditorInputText(
                    pageDfaInstance.getStateNameById(
                        pagePropertyEditorData.selectedGraphNodeId),
                    0
                );

                pagePropertyEditorData.setSelectedStateType(
                    pageDfaInstance.getStateTypeById(
                        pagePropertyEditorData.selectedGraphNodeId)
                );

                pagePropertyEditorData.setPropertyEditorPosition(
                    e.event.center.y, e.event.center.x, false);
                
                pageAppState.changeAppState(APP_STATES.EDIT_STATE);
            }
            else if (e.edges.length > 0) {
                pagePropertyEditorData.setSelectedGraphEdgeId(e.edges[0]);

                pagePropertyEditorData.setEditorInputText(
                    pageDfaInstance.getTransitionCharSeqById(
                        pagePropertyEditorData.selectedGraphEdgeId),
                    0
                );

                pagePropertyEditorData.setPropertyEditorPosition(
                    e.event.center.y, e.event.center.x, false);
                
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

            pagePropertyEditorData.setEditorInputText(
                pageDfaInstance.getStateNameById(
                    pagePropertyEditorData.selectedGraphNodeId),
                0
            );

            pagePropertyEditorData.setSelectedStateType(
                pageDfaInstance.getStateTypeById(
                    pagePropertyEditorData.selectedGraphNodeId)
            );
            
            pagePropertyEditorData.setPropertyEditorPosition(
                e.event.center.y, e.event.center.x,false);

            pageAppState.changeAppState(APP_STATES.EDIT_STATE);

            break;
        
        case APP_STATES.EDIT_STATE:
        case APP_STATES.EDIT_TRANSITION:
            pagePropertyEditorData.clearPropertyEditor();
            pageAppState.changeAppState(APP_STATES.DEFAULT);
            break;

        case APP_STATES.ADD_TRANSITION_SELECT_ORIG:
            if (e.nodes.length > 0) {
                pagePropertyEditorData.setSelectedGraphNodeId(e.nodes[0]);
                pageAppState.changeAppState(APP_STATES.ADD_TRANSITION_SELECT_DEST);
            }
            break;
            
        case APP_STATES.ADD_TRANSITION_SELECT_DEST:
            if (e.nodes.length > 0) {
                // check validity
                pageDfaInstance.addTransition(
                    pagePropertyEditorData.selectedGraphNodeId, e.nodes[0], "0");
                
                pagePropertyEditorData.setSelectedGraphEdgeId(
                    pageDfaInstance.getEdgeId(pagePropertyEditorData.selectedGraphNodeId, e.nodes[0])
                );

                pagePropertyEditorData.setEditorInputText(
                    pageDfaInstance.getTransitionCharSeqById(
                        pagePropertyEditorData.selectedGraphEdgeId),
                    0
                );

                pagePropertyEditorData.setPropertyEditorPosition(
                    e.event.center.y, e.event.center.x, false);
                
                pageAppState.changeAppState(APP_STATES.EDIT_TRANSITION);
            }
            
        case APP_STATES.RUN_AUTOMATA:
        default:
            break;
    }
}

export function handleGraphDragEnd(
    e, pageAppState, pageDfaInstance, pagePropertyEditorData) {
    // update node position storage
    if (e.nodes.length > 0) {
        const newCanvasPosition = getNodePosition(e.nodes[0]);
        pageDfaInstance.editState(
            e.nodes[0], undefined, undefined, newCanvasPosition.x, newCanvasPosition.y);
    }

    // change node position in pageDfaInstance and change property editor position
    switch (pageAppState.currentState) {
        case APP_STATES.EDIT_STATE:
        case APP_STATES.EDIT_TRANSITION:
            if (e.nodes.length > 0 || e.edges.length > 0) {
                pagePropertyEditorData.setPropertyEditorPosition(e.event.center.y, e.event.center.x, false);
                adjustPropertyEditorPosition(pageAppState, pagePropertyEditorData);
            }
            break;
    }
}