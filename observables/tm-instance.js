import { makeAutoObservable } from "mobx";
import {
    AUTOMATA_STATE_TYPES,
    toGraphNodeGroup
} from "observables/automata-state-types";

export const TM_MAX_RUN_STEP_COUNT = 3000;

function getLabelFromTransitionMoves(moves) {
    return moves.map(x=>`${x.char}/${x.replace}${x.move==='L'?'←':'→'}`).join(",");
}

export class TmInstance{
    constructor() {
        makeAutoObservable(this, {
            getStateNameById: false,
            getStateTypeById: false,
            getEdgeId: false,
            getTransitionCharSeqById:false,
            isStateNameUnique: false,
            isTransitionCharSeqUnique: false,
            isTransitionMoveSeqValid:false
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
                moves:Array<{
                    char:String,
                    replace:String,
                    move:String,"L"|"R"
                }>
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
    // original run string not modified by the TM
    runString = "010";
    modifiedRunString = "010";
    nextRunStringCharIndex = 0;
    runStateSequence = []; // Array<State>
    // added to help runSingleBack
    runCharMoveSequence = []; // Array<{char:String, move:String, "L"|"R"}>
    isRunningStuck = false;
    currentRunStepCount = 0;
    ///////////////////////////////// ComputedFn /////////////////////////////////
    // requirements: name(String)
    isStateNameUnique(name) {
        return this.states.find(x => x.name === name) === undefined;
    }

    isTransitionMoveSeqValid(moveSeq) {
        return moveSeq.toUpperCase().split("").find(x => x !== "L" && x !== "R") === undefined;
    }

    // requirements: id(String) must be valid; charSeq(String) length>0
    // return [isUnique, firstDuplicatedChar]
    isTransitionCharSeqUnique(id, charSeq) {
        const chars = charSeq.split("");
        // search for duplications inside
        for (const i of charSeq) {
            if (chars.reduce((p, x) => p + (x === i ? 1 : 0), 0) != 1) {
                return [false, i];
            }
        }

        // search for duplications from all transitions from the from state
        const targetEdge = this.graphEdges.find(x => x.id === id);
        const fromState = this.states.find(x => x.id === targetEdge.from);

        for (const i of fromState.transitions) {
            // do not compare to self
            if (i.toId === targetEdge.to) {
                continue;
            }

            for (const j of charSeq) {
                if (i.moves.find(x=>x.char===j)) {
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
    // returns [charSeq, replaceSeq, moveSeq]
    getTransitionCharSeqById(id) {
        const targetGraphEdge = this.graphEdges.find(x => x.id === id);
        if (!targetGraphEdge) {
            return ["","",""];
        }
        const targetTransition =
            this.states.find(x => x.id === targetGraphEdge.from)
                .transitions.find(x => x.toId === targetGraphEdge.to);
        return targetTransition
            ? [targetTransition.moves.map(x => x.char).join(""),
                targetTransition.moves.map(x => x.replace).join(""),
                targetTransition.moves.map(x => x.move).join("")]
            : ["", "", ""];
    }

    ///////////////////////////////// Computed /////////////////////////////////
    get minimumUnoccupiedStateId() {
        // nextStateId must be unoccupied
        for (let i = 0; i <= this.nextStateId; i++) {
            if (this.states.find(x => x.id === i) === undefined) {
                return i;
            }
        }
    }
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

    get isStepLimitExceeded() {
        return this.currentRunStepCount > TM_MAX_RUN_STEP_COUNT;
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
        this.modifiedRunString = runString;
    }
    
    // should be called when entering RUN_AUTOMATA state
    // must be called before runSingleStep or runToEnd
    initRun() {
        // it keeps runString unchanged
        // set state sequence to include only start state
        this.nextRunStringCharIndex = 0;
        this.runStateSequence = [this.states.find(x => x.type === AUTOMATA_STATE_TYPES.START)];
        this.runCharMoveSequence = [];
        this.setGraphNodeGroup(this.currentRunState, true);
        this.isRunningStuck = false;
        this.currentRunStepCount = 0;
    }

    runExit() {
        this.setGraphNodeGroup(this.currentRunState, false);
    }

    runSingleStep() {
        if (this.currentRunState.type === AUTOMATA_STATE_TYPES.FINAL
            || this.isRunningStuck
            || this.isStepLimitExceeded) {
            return;
        }

        this.currentRunStepCount++;

        let isRunningStuck = true;

        for (const i of this.currentRunState.transitions) {
            let shouldBreak = false;
            for (const j of i.moves) {
                if (j.char===this.modifiedRunString[this.nextRunStringCharIndex]) {
                    this.setGraphNodeGroup(this.currentRunState, false);
                    this.runStateSequence.push(this.states.find(x => x.id === i.toId));
                    this.runCharMoveSequence.push({ char: j.char, move: j.move });
                    this.setGraphNodeGroup(this.currentRunState, true);

                    const runStringChars = this.modifiedRunString.split("");
                    runStringChars[this.nextRunStringCharIndex] = j.replace;
                    this.modifiedRunString = runStringChars.join("");

                    if (j.move === "L") {
                        this.nextRunStringCharIndex--;
                    }
                    else {
                        this.nextRunStringCharIndex++;
                    }

                    isRunningStuck = false;

                    const runStringOrigLength = this.modifiedRunString.length;

                    // pad Bs
                    if (this.nextRunStringCharIndex > runStringOrigLength - 1) {
                        this.modifiedRunString +=
                            "B".repeat(this.nextRunStringCharIndex - runStringOrigLength + 1);
                    }
                    else if (this.nextRunStringCharIndex < 0) {
                        this.modifiedRunString = "B".repeat(-this.nextRunStringCharIndex) + this.modifiedRunString;
                        this.nextRunStringCharIndex = 0;
                    }

                    shouldBreak = true;
                    break;
                }
            }

            if (shouldBreak) {
                break;
            }
        }

        this.isRunningStuck = isRunningStuck;
    }

    // returns whether exceeded step limit
    runToEnd() {
        while (this.currentRunState.type !== AUTOMATA_STATE_TYPES.FINAL) {
            if (this.isRunningStuck) {
                break;
            }
            if (this.isStepLimitExceeded) {
                // clean up UI
                this.runReset();
                return true;
            }
            this.runSingleStep();
        }

        return false;
    }

    runSingleBack() {
        if (this.runCharMoveSequence.length === 0) {
            return;
        }

        this.setGraphNodeGroup(this.currentRunState, false);
        this.runStateSequence.pop();
        this.setGraphNodeGroup(this.currentRunState, true);
        this.isRunningStuck = false;

        if (this.runCharMoveSequence[this.runCharMoveSequence.length-1].move === "L") {
            this.nextRunStringCharIndex++;
        }
        else {
            this.nextRunStringCharIndex--;
        }

        // here we do not undo runString padding modification.
        const runStringChars = this.modifiedRunString.split("");
        runStringChars[this.nextRunStringCharIndex] =
            this.runCharMoveSequence[this.runCharMoveSequence.length - 1].char;
        this.modifiedRunString = runStringChars.join("");

        this.runCharMoveSequence.pop();
        this.currentRunStepCount--;
    }

    runReset() {
        this.setGraphNodeGroup(this.currentRunState, false);
        this.nextRunStringCharIndex = 0;
        this.runStateSequence = [this.states.find(x => x.type === AUTOMATA_STATE_TYPES.START)];
        this.runCharMoveSequence = [];
        this.setGraphNodeGroup(this.currentRunState, true);
        this.modifiedRunString = this.runString;
        this.isRunningStuck = false;
        this.currentRunStepCount = 0;
    }

    ///// Load TM from file read
    loadData(nextStateId, nextEdgeId, states, graphNodes, graphEdges) {
        this.nextStateId = nextStateId;
        this.nextEdgeId = nextEdgeId;
        this.states = states;
        this.graphNodes = graphNodes;
        this.graphEdges = graphEdges;

        this.reactivityCounter = 0;
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
    // charSeq, replaceSeq, moveSeq(All String) length>0 and all equal;
    // each char in charSeq must be unique in all transitions starting from fromId and inside charSeq;
    // if a transition from From to To already exists, this will be merged;
    // each char in moveSeq can only be "L" or "R".
    addTransition(fromId, toId, charSeq,replaceSeq, moveSeq) {
        const fromTransitions = this.states.find(x => x.id === fromId).transitions;
        const fromTransition = fromTransitions.find(x => x.toId === toId);
        // if a transition to To state already exists, then simply merge the moves
        if (fromTransition) {
            for (let i = 0; i < charSeq.length; i++){
                fromTransition.moves.push({
                    char: charSeq[i],
                    replace: replaceSeq[i],
                    move:moveSeq[i]
                });
            }

            this.graphEdges.find(x => x.from === fromId && x.to === toId).label =
                getLabelFromTransitionMoves(fromTransition.moves);
        }
        // otherwise add a new transition
        else {
            const newMoves = [];

            for (let i = 0; i < charSeq.length; i++) {
                newMoves.push({
                    char: charSeq[i],
                    replace: replaceSeq[i],
                    move: moveSeq[i]
                });
            }

            fromTransitions.push({ toId, moves: newMoves });

            const newEdge = {
                id: this.nextEdgeId.toString(),
                from: fromId,
                to: toId,
                label: getLabelFromTransitionMoves(newMoves)
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
    // newCharSeq, newReplaceSeq, newMoveSeq(All String) length>0; length all equal;
    // each char in newCharSeq must be unique in all transitions starting from the start state and inside.
    // each char in newMoveSeq can only be "L" or "R".
    editTransition(id, newCharSeq, newReplaceSeq, newMoveSeq) {
        const selectedGraphEdge = this.graphEdges.find(x => x.id === id);

        const newMoves = [];

        for (let i = 0; i < newCharSeq.length; i++) {
            newMoves.push({
                char: newCharSeq[i],
                replace: newReplaceSeq[i],
                move: newMoveSeq[i]
            });
        }

        selectedGraphEdge.label = getLabelFromTransitionMoves(newMoves);

        this.states.find(x => x.id === selectedGraphEdge.from)
            .transitions.find(x => x.toId === selectedGraphEdge.to)
            .moves = newMoves;
        
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