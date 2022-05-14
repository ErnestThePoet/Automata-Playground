import { makeAutoObservable } from "mobx";
import { AUTOMATA_STATE_TYPES } from "./automata-state-types";

export class DfaInstance{
    constructor() {
        makeAutoObservable(this, {
            getStateNameById: false,
            getTransitionCharByUuid:false,
            isStateNameUnique: false
        });
    }

    ///////////////////////////////// Observable /////////////////////////////////
    // UI data
    selectedGraphNodeId = 0;
    selectedGraphEdgeUuid = "";
    selectedStateName = "";
    selectedStateType = AUTOMATA_STATE_TYPES.NORMAL;
    // used to help subscribe array changes. it should always be changed after all others.
    // in this app, the practice is to use it as an extra parameter in autorun.
    reactivityCounter = 0;
    // one state in states and graphNodes share the same id
    nextStateId = 0;
    // used for automata running
    // element structure:
    /*
        State:{
            id:Number, 
            name:String, 
            type:Number, 
            transitions:Array<{
                to:State, 
                toId:Number, 
                char:String
            }>
        }
    */
    states = [];

    // used for vis.js graph
    // element structure:
    /*
        GraphNode:{
            id:Number (guaranteed equal to State.id for same state),
            label:String (guaranteed equal to State.name for same state), 
            group:Number,
            x:Number,
            y:Number
        }
    */
    graphNodes = [];

    // element structure:
    /*
        GraphEdge:{
            from:Number (from Id), 
            to:Number (to Id),
            label:String (guaranteed equal to State.Transition.char for same transition)
        }
    */
    graphEdges = [];

    ///////////////////////////////// ComputedFn /////////////////////////////////
    // requirements: name(String)
    isStateNameUnique(name) {
        return this.states.find(x => x.name === name) === undefined;
    }

    ///////////////////////////////// Computed /////////////////////////////////
    get selectedStateName() {
        return this.states.find(x => x.id === this.selectedGraphNodeId).name;
    }

    get selectedStateType() {
        return this.states.find(x => x.id === this.selectedGraphNodeId).type;
    }

    ///////////////////////////////// Action /////////////////////////////////
    // requirements: name(String) cannot be empty and must be unique; 
    // stateType(Number) has to be one of STATE_TYPES in automata-state-types.js;
    // x(Number); y(Number)
    addState(name,stateType,x,y) {
        this.states.push({
            id: this.nextStateId,
            name,
            type: stateType,
            transitions:[]
        });

        this.graphNodes.push({
            id: this.nextStateId,
            label: name,
            group: stateType,
            x,
            y
        });

        this.nextStateId++;

        this.reactivityCounter++;
    }

    // requirements:
    // fromId(Number) and toId(Number) have to be valid;
    // char(String) must contain only one character; 
    // this transition has to be unique
    addTransition(fromId, toId, char) {
        const toState = this.states.find(x => x.id === toId);
        this.states.find(x => x.id === fromId).transitions.push({ to: toState,toId, char });
        
        this.graphEdges.push({
            from: fromId,
            to: toId,
            label: char
        });

        this.reactivityCounter++;
    }

    // requirements: id(Number) has to be valid; 
    // newName(String) cannot be empty; newX(Number); newY(Number)
    editState(id, newName, newType, newX, newY) {
        const targetState = this.states.find(x => x.id === id);
        targetState.name = newName;
        targetState.type = newType;

        const targetGraphNode = this.graphNodes.find(x => x.id === id);
        targetGraphNode.name = newName;
        targetGraphNode.x = newX;
        targetGraphNode.y = newY;

        this.reactivityCounter++;
    }

    // we did not supply an id when adding edges,
    // so we will get the uuid that vis.js internally provided in click event.
    // requirements: uuid(String) has to be valid; newChar(String) must contain only one character
    editTransition(uuid, newChar) {
        const selectedGraphEdge = this.graphEdges.find(x => x.id === uuid);
        selectedGraphEdge.label = newChar;

        this.states.find(x => x.id === selectedGraphEdge.from)
            .transitions.find(x => x.toId === selectedGraphEdge.to)
            .char = newChar;
        
        this.reactivityCounter++;
    }

    // requirements: id(Number) has to be valid
    removeState(id) {
        for (let i = this.states.length - 1; i >= 0; i--){
            // remove the state in states
            if (this.states[i].id === id) {
                this.states.splice(i, 1);
            }
            // remove related transitions from other states
            else {
                for (let j = this.states[i].transitions.length - 1; j >= 0; j--){
                    if (this.states[i].transitions[j].toId === id) {
                        this.states[i].transitions.splice(j, 1);
                    }
                }
            }
        }

        // remove the state in graphNodes
        this.graphNodes.splice(this.graphNodes.findIndex(x => x.id === id), 1);

        // remove all edges from or to the state to be removed in graphEdges
        for (let i = this.graphEdges.length - 1; i >= 0; i--){
            if (this.graphEdges[i].from === id || this.graphEdges[i].to === id) {
                this.graphEdges.splice(i, 1);
            }
        }

        this.reactivityCounter++;
    }

    // requirements: uuid(String) has to be valid
    removeTransition(uuid) {
        const edgeToBeRemoved =
            this.graphEdges.splice(this.graphEdges.findIndex(x => x.id === uuid), 1)[0];
        
        const transitionFromState = this.states.find(x => x.id === edgeToBeRemoved.from);

        transitionFromState.transitions.splice(
            transitionFromState.transitions.findIndex(
                x => x.toId === edgeToBeRemoved.to), 1);
        
        this.reactivityCounter++;
    }
}