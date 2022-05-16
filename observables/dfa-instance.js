import { makeAutoObservable } from "mobx";
import {
    AUTOMATA_STATE_TYPES,
    toGraphNodeGroup
} from "observables/automata-state-types";

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
            isStateNameUnique: false,
            isTransitionCharSeqUnique:false
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
            group:String,
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
    nextRunStringCharIndex = 0;
    runStateSequence = []; // Array<State>
    isRunningStuck = false;
    ///////////////////////////////// ComputedFn /////////////////////////////////
    // requirements: name(String)
    isStateNameUnique(name) {
        return this.states.find(x => x.name === name) === undefined;
    }

    // requirements: id(String) must be valid; charSeq(String) length>0
    // return [isUnique, firstDuplicatedChar]
    isTransitionCharSeqUnique(id, charSeq) {
        const targetEdge = this.graphEdges.find(x => x.id === id);
        const fromState = this.states.find(x => x.id === targetEdge.from);

        for (const i of fromState.transitions) {
            // do not compare to self
            if (i.toId === targetEdge.to) {
                continue;
            }

            for (const j of charSeq) {
                if (i.chars.includes(j)) {
                    return [false, j];
                }
            }
        }

        return [true, ""];
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
    
    get isAutomataEmpty() {
        return this.states.length === 0;
    }

    ///////////////////////////////// Action /////////////////////////////////
    ///// Run automata functions
    setGraphNodeGroup(state,isCurrent) {
        const targetGraphNode = this.graphNodes.find(x => x.id === state.id);
        targetGraphNode.group = toGraphNodeGroup(state.type, isCurrent);
    }
    // requirements: runString(String) cannot be empty
    setRunString(runString) {
        this.runString = runString;
    }
    
    // should be called when entering RUN_AUTOMATA state
    // must be called before runSingleStep or runToEnd
    initRun() {
        this.setRunString("001");
        // set state sequence to include only start state
        this.nextRunStringCharIndex = 0;
        this.runStateSequence = [this.states.find(x => x.type === AUTOMATA_STATE_TYPES.START)];
        this.setGraphNodeGroup(this.currentRunState, true);
        this.isRunningStuck = false;
    }

    runExit() {
        this.setGraphNodeGroup(this.currentRunState, false);
    }

    runSingleStep() {
        if (this.nextRunStringCharIndex > this.runString.length - 1) {
            return;
        }

        if (this.isRunningStuck) {
            return;
        }

        let isRunningStuck = true;

        for (const i of this.currentRunState.transitions) {
            if (i.chars.includes(this.runString[this.nextRunStringCharIndex])) {
                this.setGraphNodeGroup(this.currentRunState, false);
                this.runStateSequence.push(this.states.find(x => x.id === i.toId));
                this.setGraphNodeGroup(this.currentRunState, true);
                this.nextRunStringCharIndex++;

                isRunningStuck = false;
                break;
            }
        }

        this.isRunningStuck = isRunningStuck;
    }

    runToEnd() {
        for (let i = this.nextRunStringCharIndex; i < this.runString.length; i++){
            this.runSingleStep();
        }
    }

    runSingleBack() {
        if (this.nextRunStringCharIndex === 0) {
            return;
        }

        this.setGraphNodeGroup(this.currentRunState, false);
        this.runStateSequence.pop();
        this.setGraphNodeGroup(this.currentRunState, true);
        this.isRunningStuck = false;
        this.nextRunStringCharIndex--;
    }

    runReset() {
        this.setGraphNodeGroup(this.currentRunState, false);
        this.nextRunStringCharIndex = 0;
        this.runStateSequence = [this.states.find(x => x.type === AUTOMATA_STATE_TYPES.START)];
        this.setGraphNodeGroup(this.currentRunState, true);
        this.isRunningStuck = false;
    }

    ///// Load DFA from file read
    loadDfaData(nextStateId, nextEdgeId, states, graphNodes, graphEdges) {
        this.nextStateId = nextStateId;
        this.nextEdgeId = nextEdgeId;
        this.states = states;
        this.graphNodes = graphNodes;
        this.graphEdges = graphEdges;
    }

    ///// State&transition management functions
    clearAll() {
        this.nextStateId = 0;
        this.nextEdgeId = 0;
        this.states = [];
        this.graphNodes = [];
        this.graphEdges = [];
        this.reactivityCounter = 0;
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
    // each char in charSeq must be unique in all transitions starting from fromId.
    // inside charSeq, chars does not need to be unique; 
    // only new transitions will be added.
    // if a transition from From to To already exists, charSeq can also contain duplications.
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
            fromTransitions.push({ toId, chars });

            const newEdge = {
                id: this.nextEdgeId.toString(),
                from: fromId,
                to: toId,
                label: getLabelFromTransitionChars(chars)
            };

            // if there is a reverse transition, then add a curve to this edge
            // to avoid draw conflict
            if (this.graphEdges.find(x => x.from === toId && x.to === fromId)) {
                newEdge.smooth = {
                    type: "curvedCW"
                };
            }

            this.graphEdges.push(newEdge);

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
    // newCharSeq(String) length>0;
    // each char in charSeq must be unique in all transitions starting from the start state.
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
        // remove the edge in graphEdges
        const edgeToBeRemoved =
            this.graphEdges.splice(this.graphEdges.findIndex(x => x.id === id), 1)[0];
            
        // remove reverse edge smooth curve if any
        const reverseEdge = this.graphEdges.find(
            x => x.from === edgeToBeRemoved.to && x.to === edgeToBeRemoved.from);
        
        if (reverseEdge) {
            delete reverseEdge.smooth;
        }
        
        // remove the transition in State.transitions
        const transitionFromState = this.states.find(x => x.id === edgeToBeRemoved.from);

        transitionFromState.transitions.splice(
            transitionFromState.transitions.findIndex(
                x => x.toId === edgeToBeRemoved.to), 1);
        
        this.reactivityCounter++;
    }
}