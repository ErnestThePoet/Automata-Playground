import { APP_STATES } from "observables/app-state";

export function handleGraphClick(e, component, pageAppState, pageDfaInstance) {
    switch (pageAppState.currentState) {
        case APP_STATES.DEFAULT:
            // if click on node or edge, enter EDIT_STATE or EDIT_TRANSITION state
            if (e.nodes.length > 0) {
                component.setState({
                    selectedGraphNodeId:e.nodes[0],
                    popUpText: pageDfaInstance.getStateNameById(e.nodes[0])
                });
                pageAppState.changeAppState(APP_STATES.EDIT_STATE);
            }
            else if (e.edges.length > 0) {
                component.setState({
                    selectedGraphEdgeUuid:e.edges[0],
                    popUpText: pageDfaInstance.getTransitionCharByUuid(e.edges[0])
                });
                pageAppState.changeAppState(APP_STATES.EDIT_TRANSITION);
            }
            break;

        case APP_STATES.ADD_STATE_SELECT_POSITION:
            // get click point coordination, get a state name and go to EDIT_STATE
            

        default:
            console.log("default");
    }
}