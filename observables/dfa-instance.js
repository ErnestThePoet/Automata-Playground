import { makeAutoObservable } from "mobx";
import { AUTOMATA_STATE_TYPES,toGraphNodeGroup } from "observables/automata-state-types";

function getLabelFromTransitionChars(chars) {
    return chars.join(",");
}

export class DfaInstance{
    constructor() {
        makeAutoObservable(this, {
            getStateNameById: false,
            getStateTypeById: false,
            getEdgeId: false,
            getTransitionCharSeqById:false,
            isStateNameUnique: false
        });
    }

    ///////////////////////////////// Observable /////////////////////////////////
    // used to help subscribe array changes. it should always be changed after all others.
    // in this app, the practice is to use it as an extra parameter in autorun.
    reactivityCounter = 0;
    // one state in states and graphNodes share the same id
    nextStateId = 0;
    // for adding in graphEdges. It will be converted to String when adding edge.
    nextEdgeId = 0;
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
                chars:Array<String>
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
            id:String
            from:Number (from Id), 
            to:Number (to Id),
            label:String (UI-friendly form)
        }
    */
    graphEdges = [];

    ///// Run automata data
    runString = "";
    nextRunStringIndex = 0;
    runStateSequence = []; // Array<State>
    isRunningStuck = false;
    ///////////////////////////////// ComputedFn /////////////////////////////////
    // requirements: name(String)
    isStateNameUnique(name) {
        return this.states.find(x => x.name === name) === undefined;
    }

    // requirements: id(Number) must be valid
    getStateNameById(id) {
        const targetState = this.states.find(x => x.id === id);
        return targetState?targetState.name:"";
    }

    // requirements: id(Number) must be valid
    getStateTypeById(id) {
        const targetState = this.states.find(x => x.id === id);
        return targetState ? targetState.type : AUTOMATA_STATE_TYPES.NORMAL;
    }

    // requirements: fromId(Number), toId(Number) must be valid
    getEdgeId(fromId, toId) {
        const targetEdge = this.graphEdges.find(x => x.from === fromId && x.to === toId);
        return targetEdge ? targetEdge.id : "";
    }

    // requirements: id(String) must be valid
    getTransitionCharSeqById(id) {
        const targetGraphEdge = this.graphEdges.find(x => x.id === id);
        if (!targetGraphEdge) {
            return [];
        }
        const targetTransition =
            this.states.find(x => x.id === targetGraphEdge.from)
                .transitions.find(x => x.toId === targetGraphEdge.to);
        return targetTransition ? targetTransition.chars.join("") : "";
    }

    ///////////////////////////////// Computed /////////////////////////////////
    // check if there is a start state
    get hasStartState() {
        return this.states.find(x => x.type === AUTOMATA_STATE_TYPES.START) !== undefined;
    }

    get currentRunState() {
        return this.runStateSequence[this.runStateSequence.length - 1]??{name:""};
    }

    ///////////////////////////////// Action /////////////////////////////////
    ///// Run automata functions
    // requirements: runString(String) cannot be empty
    setRunString(runString) {
        this.runString = runString;
    }
    
    // should be called when entering RUN_AUTOMATA state
    // must be called before runSingleStep or runToEnd
    initRun() {
        this.setRunString("001");
        // set state sequence to include only start state
        this.nextRunStringIndex = 0;
        this.runStateSequence = [this.states.find(x => x.type === AUTOMATA_STATE_TYPES.START)];
        this.isRunningStuck = false;
    }

    runSingleStep() {
        if (this.nextRunStringIndex > this.runString.length - 1) {
            return;
        }

        if (this.isRunningStuck) {
            return;
        }

        for (const i of this.currentRunState.transitions) {
            if (i.chars.includes(this.runString[this.nextRunStringIndex])) {
                this.runStateSequence.push(i.to);
                this.nextRunStringIndex++;
            }
            else {
                this.isRunningStuck = true;
            }
        }
    }

    runToEnd() {
        for (let i = this.nextRunStringIndex; i < this.runString.length; i++){
            this.runSingleStep();
        }
    }

    // requirements: name(String) cannot be empty and must be unique; 
    // stateType(Number) has to be one of STATE_TYPES in automata-state-types.js;
    // x(Number); y(Number) are canvas coords
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
            group: toGraphNodeGroup(stateType),
            x,
            y
        });

        this.nextStateId++;

        this.reactivityCounter++;
    }

    // requirements:
    // fromId(Number) and toId(Number) have to be valid;
    // charSeq(String) length>0;
    // this transition does not need to be unique; only new transitions will be added
    addTransition(fromId, toId, charSeq) {
        const charsOrig = charSeq.split("");
        const chars = [];

        // remove duplications in charOrig
        for (const i of charsOrig) {
            if (!chars.includes(i)) {
                chars.push(i);
            }
        }

        const fromTransitions = this.states.find(x => x.id === fromId).transitions;
        const fromTransition = fromTransitions.find(x => x.toId === toId);
        // if a transition to To state already exists, then simply merge the chars
        if (fromTransition) {
            for (const i of chars) {
                if (!fromTransition.chars.includes(i)) {
                    fromTransition.chars.push(i);
                }
            }

            this.graphEdges.find(x => x.from === fromId && x.to === toId).label =
                getLabelFromTransitionChars(fromTransition.chars);
        }
        // otherwise add a new transition
        else {
            const toState = this.states.find(x => x.id === toId);
            fromTransitions.push({ to: toState, toId, chars });

            this.graphEdges.push({
                id: this.nextEdgeId.toString(),
                from: fromId,
                to: toId,
                label: getLabelFromTransitionChars(chars)
            });

            this.nextEdgeId++;
        }

        this.reactivityCounter++;
    }

    // requirements: id(Number) has to be valid;
    // newName(String) cannot be empty; newX(Number); newY(Number)
    // if either of the new properties above is null or undefined, it will not be updated.
    editState(id, newName, newType, newX, newY) {
        const targetState = this.states.find(x => x.id === id);
        const targetGraphNode = this.graphNodes.find(x => x.id === id);
        
        if (newName!=null) {
            targetState.name = newName;
            targetGraphNode.label = newName;
        }
        
        if (newType != null) {
            targetState.type = newType;
            targetGraphNode.group = toGraphNodeGroup(newType);
        }
        
        if (newX != null) {
            targetGraphNode.x = newX;
        }

        if (newY != null) {
            targetGraphNode.y = newY;
        }

        this.reactivityCounter++;
    }

    // we did not supply an id when adding edges,
    // so we will get the id that vis.js internally provided in click event.
    // requirements: id(String) has to be valid; 
    // newCharSeq(String) length>0
    editTransition(id, newCharSeq) {
        const newCharsOrig = newCharSeq.split("");
        const newChars = [];

        // remove duplications
        for (const i of newCharsOrig) {
            if (!newChars.includes(i)) {
                newChars.push(i);
            }
        }

        const selectedGraphEdge = this.graphEdges.find(x => x.id === id);

        selectedGraphEdge.label = getLabelFromTransitionChars(newChars);

        this.states.find(x => x.id === selectedGraphEdge.from)
            .transitions.find(x => x.toId === selectedGraphEdge.to)
            .chars = newChars;
        
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

    // requirements: id(String) has to be valid
    removeTransition(id) {
        const edgeToBeRemoved =
            this.graphEdges.splice(this.graphEdges.findIndex(x => x.id === id), 1)[0];
        
        const transitionFromState = this.states.find(x => x.id === edgeToBeRemoved.from);

        transitionFromState.transitions.splice(
            transitionFromState.transitions.findIndex(
                x => x.toId === edgeToBeRemoved.to), 1);
        
        this.reactivityCounter++;
    }
}