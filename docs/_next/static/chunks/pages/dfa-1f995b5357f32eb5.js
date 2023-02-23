(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[570],{592:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dfa",function(){return n(7909)}])},7909:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return F}});var a=n(5893),r=n(7294),i=n(9008),o=n.n(i),s=n(1217),d=n(8949),p=n(9059),c=n(8908);function u(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(t){return t.join(",")}var h=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),l(this,"reactivityCounter",0),l(this,"nextStateId",0),l(this,"nextEdgeId",0),l(this,"states",[]),l(this,"graphNodes",[]),l(this,"graphEdges",[]),l(this,"runString","010"),l(this,"nextRunStringCharIndex",0),l(this,"runStateSequence",[]),l(this,"isRunningStuck",!1),(0,d.ky)(this,{getStateNameById:!1,getStateTypeById:!1,getEdgeId:!1,getTransitionCharSeqById:!1,isStateNameUnique:!1,isTransitionCharSeqUnique:!1})}var e,n,a;return e=t,n=[{key:"isStateNameUnique",value:function(t){return void 0===this.states.find((function(e){return e.name===t}))}},{key:"isTransitionCharSeqUnique",value:function(t,e){var n=this.graphEdges.find((function(e){return e.id===t})),a=this.states.find((function(t){return t.id===n.from})),r=!0,i=!1,o=void 0;try{for(var s,d=a.transitions[Symbol.iterator]();!(r=(s=d.next()).done);r=!0){var p=s.value;if(p.toId!==n.to){var c=!0,u=!1,l=void 0;try{for(var f,h=e[Symbol.iterator]();!(c=(f=h.next()).done);c=!0){var y=f.value;if(p.chars.includes(y))return[!1,y]}}catch(g){u=!0,l=g}finally{try{c||null==h.return||h.return()}finally{if(u)throw l}}}}}catch(g){i=!0,o=g}finally{try{r||null==d.return||d.return()}finally{if(i)throw o}}return[!0,""]}},{key:"getStateNameById",value:function(t){var e=this.states.find((function(e){return e.id===t}));return e?e.name:""}},{key:"getStateTypeById",value:function(t){var e=this.states.find((function(e){return e.id===t}));return e?e.type:c.OC.NORMAL}},{key:"getEdgeId",value:function(t,e){var n=this.graphEdges.find((function(n){return n.from===t&&n.to===e}));return n?n.id:""}},{key:"getTransitionCharSeqById",value:function(t){var e=this.graphEdges.find((function(e){return e.id===t}));if(!e)return"";var n=this.states.find((function(t){return t.id===e.from})).transitions.find((function(t){return t.toId===e.to}));return n?n.chars.join(""):""}},{key:"minimumUnoccupiedStateId",get:function(){for(var t,e=this,n=function(t){if(void 0===e.states.find((function(e){return e.id===t})))return{v:t}},a=0;a<=this.nextStateId;a++){var r=n(a);if("object"===((t=r)&&"undefined"!==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t))return r.v}}},{key:"hasStartState",get:function(){return void 0!==this.states.find((function(t){return t.type===c.OC.START}))}},{key:"currentRunState",get:function(){var t;return null!==(t=this.runStateSequence[this.runStateSequence.length-1])&&void 0!==t?t:{name:""}}},{key:"isAutomataEmpty",get:function(){return 0===this.states.length}},{key:"setGraphNodeGroup",value:function(t,e){this.graphNodes.find((function(e){return e.id===t.id})).group=(0,c.Nz)(t.type,e)}},{key:"setRunString",value:function(t){this.runString=t}},{key:"initRun",value:function(){this.nextRunStringCharIndex=0,this.runStateSequence=[this.states.find((function(t){return t.type===c.OC.START}))],this.setGraphNodeGroup(this.currentRunState,!0),this.isRunningStuck=!1}},{key:"runExit",value:function(){this.setGraphNodeGroup(this.currentRunState,!1)}},{key:"runSingleStep",value:function(){if(!(this.nextRunStringCharIndex>this.runString.length-1)&&!this.isRunningStuck){var t=!0,e=!0,n=!1,a=void 0;try{for(var r,i=this,o=function(e,n){var a=n.value;if(a.chars.includes(i.runString[i.nextRunStringCharIndex]))return i.setGraphNodeGroup(i.currentRunState,!1),i.runStateSequence.push(i.states.find((function(t){return t.id===a.toId}))),i.setGraphNodeGroup(i.currentRunState,!0),i.nextRunStringCharIndex++,t=!1,"break"},s=this.currentRunState.transitions[Symbol.iterator]();!(e=(r=s.next()).done)&&"break"!==o(0,r);e=!0);}catch(d){n=!0,a=d}finally{try{e||null==s.return||s.return()}finally{if(n)throw a}}this.isRunningStuck=t}}},{key:"runToEnd",value:function(){for(var t=this.nextRunStringCharIndex;t<this.runString.length&&!this.isRunningStuck;t++)this.runSingleStep()}},{key:"runSingleBack",value:function(){0!==this.nextRunStringCharIndex&&(this.setGraphNodeGroup(this.currentRunState,!1),this.runStateSequence.pop(),this.setGraphNodeGroup(this.currentRunState,!0),this.isRunningStuck=!1,this.nextRunStringCharIndex--)}},{key:"runReset",value:function(){this.setGraphNodeGroup(this.currentRunState,!1),this.nextRunStringCharIndex=0,this.runStateSequence=[this.states.find((function(t){return t.type===c.OC.START}))],this.setGraphNodeGroup(this.currentRunState,!0),this.isRunningStuck=!1}},{key:"loadData",value:function(t,e,n,a,r){this.nextStateId=t,this.nextEdgeId=e,this.states=n,this.graphNodes=a,this.graphEdges=r,this.reactivityCounter=0}},{key:"clearAll",value:function(){this.nextStateId=0,this.nextEdgeId=0,this.states=[],this.graphNodes=[],this.graphEdges=[],this.reactivityCounter=0}},{key:"addState",value:function(t,e,n,a){this.states.push({id:this.nextStateId,name:t,type:e,transitions:[]}),this.graphNodes.push({id:this.nextStateId,label:t,group:(0,c.Nz)(e),x:n,y:a}),this.nextStateId++,this.reactivityCounter++}},{key:"addTransition",value:function(t,e,n){var a=n.split(""),r=[],i=!0,o=!1,s=void 0;try{for(var d,p=a[Symbol.iterator]();!(i=(d=p.next()).done);i=!0){var c=d.value;r.includes(c)||r.push(c)}}catch(T){o=!0,s=T}finally{try{i||null==p.return||p.return()}finally{if(o)throw s}}var u=this.states.find((function(e){return e.id===t})).transitions,l=u.find((function(t){return t.toId===e}));if(l){var h=!0,y=!1,g=void 0;try{for(var S,I=r[Symbol.iterator]();!(h=(S=I.next()).done);h=!0){var v=S.value;l.chars.includes(v)||l.chars.push(v)}}catch(T){y=!0,g=T}finally{try{h||null==I.return||I.return()}finally{if(y)throw g}}this.graphEdges.find((function(n){return n.from===t&&n.to===e})).label=f(l.chars)}else{u.push({toId:e,chars:r});var E={id:this.nextEdgeId.toString(),from:t,to:e,label:f(r)};this.graphEdges.find((function(n){return n.from===e&&n.to===t}))&&(E.smooth={type:"curvedCW"}),this.graphEdges.push(E),this.nextEdgeId++}this.reactivityCounter++}},{key:"editState",value:function(t,e,n,a,r){var i=this.states.find((function(e){return e.id===t})),o=this.graphNodes.find((function(e){return e.id===t}));null!=e&&(i.name=e,o.label=e),null!=n&&(i.type=n,o.group=(0,c.Nz)(n)),null!=a&&(o.x=a),null!=r&&(o.y=r),this.reactivityCounter++}},{key:"editTransition",value:function(t,e){var n=e.split(""),a=[],r=!0,i=!1,o=void 0;try{for(var s,d=n[Symbol.iterator]();!(r=(s=d.next()).done);r=!0){var p=s.value;a.includes(p)||a.push(p)}}catch(u){i=!0,o=u}finally{try{r||null==d.return||d.return()}finally{if(i)throw o}}var c=this.graphEdges.find((function(e){return e.id===t}));c.label=f(a),this.states.find((function(t){return t.id===c.from})).transitions.find((function(t){return t.toId===c.to})).chars=a,this.reactivityCounter++}},{key:"removeState",value:function(t){for(var e=this.states.length-1;e>=0;e--)if(this.states[e].id===t)this.states.splice(e,1);else for(var n=this.states[e].transitions.length-1;n>=0;n--)this.states[e].transitions[n].toId===t&&this.states[e].transitions.splice(n,1);this.graphNodes.splice(this.graphNodes.findIndex((function(e){return e.id===t})),1);for(var a=this.graphEdges.length-1;a>=0;a--)this.graphEdges[a].from!==t&&this.graphEdges[a].to!==t||this.graphEdges.splice(a,1);this.reactivityCounter++}},{key:"removeTransition",value:function(t){var e=this.graphEdges.splice(this.graphEdges.findIndex((function(e){return e.id===t})),1)[0],n=this.graphEdges.find((function(t){return t.from===e.to&&t.to===e.from}));n&&delete n.smooth;var a=this.states.find((function(t){return t.id===e.from}));a.transitions.splice(a.transitions.findIndex((function(t){return t.toId===e.to})),1),this.reactivityCounter++}}],n&&u(e.prototype,n),a&&u(e,a),t}(),y=n(276),g=n(2662),S=n(6173),I=n(8145),v=n(4184),E=n.n(v),T=n(66),m=n.n(T),A=void 0,x=(0,s.Pi)((function(t){(0,r.useEffect)((function(){(0,S.K1)()||document.getElementById("in-property-editor-first-input").select()}),[]);var e=function(e){t.propertyEditorData.setSelectedStateType(e)};return(0,a.jsxs)("div",{id:"property-editor-wrapper",className:E()(t.className,m().propertyEditorWrapper,"d-flex align-items-center"),style:t.style,children:[!(0,S.K1)()&&(0,a.jsx)("i",{className:E()(m().iDragArea,"fa-solid fa-ellipsis-vertical"),draggable:!0,onDragStart:function(e){e.stopPropagation(),t.propertyEditorData.propertyEditorOrigTop=t.propertyEditorData.propertyEditorTop,t.propertyEditorData.propertyEditorOrigLeft=t.propertyEditorData.propertyEditorLeft,t.propertyEditorData.dragStartX=e.clientX,t.propertyEditorData.dragStartY=e.clientY},onDrag:function(e){e.stopPropagation();var n=t.propertyEditorData.propertyEditorOrigTop+e.clientY-t.propertyEditorData.dragStartY,a=t.propertyEditorData.propertyEditorOrigLeft+e.clientX-t.propertyEditorData.dragStartX;t.propertyEditorData.propertyEditorTop!==n&&t.propertyEditorData.propertyEditorLeft!==a&&0!==e.clientX&&0!==e.clientY&&(t.propertyEditorData.setPropertyEditorPosition(n,a,!1),(0,S.tI)(t.appState,t.propertyEditorData,!1))}}),(0,a.jsx)("label",{className:m().lblTransitionCharsTip,style:{display:t.appState.currentState===p.y.EDIT_TRANSITION?"block":"none"},children:"\u591a\u4e2a\u6d88\u8017\u5b57\u7b26\u8bf7\u8fde\u7eed\u8f93\u5165, \u598201"}),(0,a.jsx)("input",{id:"in-property-editor-first-input",className:m().inPropertyInput,style:t.propertyEditorData.isInvalidInputWarningShow?{borderColor:"red",color:"red"}:{},type:"text",value:t.propertyEditorData.editorInputTexts[0],onInput:function(e){switch(t.propertyEditorData.setEditorInputText(e.target.value,0),t.appState.currentState){case p.y.EDIT_STATE:if(0===e.target.value.length)return void t.propertyEditorData.showInvalidInputWarning("\u72b6\u6001\u540d\u4e0d\u80fd\u4e3a\u7a7a");if(!t.dfaInstance.isStateNameUnique(e.target.value))return void t.propertyEditorData.showInvalidInputWarning("\u72b6\u6001\u540d\u5df2\u7ecf\u5b58\u5728");t.propertyEditorData.hideInvalidInputWarning();break;case p.y.EDIT_TRANSITION:if(0===e.target.value.length)return void t.propertyEditorData.showInvalidInputWarning("\u6d88\u8017\u7684\u5b57\u7b26\u5217\u8868\u4e0d\u80fd\u4e3a\u7a7a");var n=t.dfaInstance.isTransitionCharSeqUnique(t.propertyEditorData.selectedGraphEdgeId,e.target.value);if(!n[0])return void t.propertyEditorData.showInvalidInputWarning("\u5df2\u7ecf\u6709\u5b57\u7b26".concat(n[1],"\u7684\u8f6c\u79fb"));t.propertyEditorData.hideInvalidInputWarning()}}}),(0,a.jsx)("label",{className:m().lblInvalidInputInfo,style:{display:t.propertyEditorData.isInvalidInputWarningShow?"block":"none"},children:t.propertyEditorData.invalidInputWarningText}),(0,a.jsxs)("span",{className:m().spanStateTypeGroup,style:{display:t.appState.currentState===p.y.EDIT_STATE?"inline":"none"},children:[(0,a.jsxs)("div",{className:"d-flex align-items-center",onClick:e.bind(A,c.OC.START),children:[(0,a.jsx)("input",{className:m().inStateType,type:"radio",name:"inStateType",readOnly:!0,checked:t.propertyEditorData.selectedStateType===c.OC.START}),(0,a.jsx)("label",{className:m().lblStateType,children:"\u5f00\u59cb"})]}),(0,a.jsxs)("div",{className:"d-flex align-items-center",onClick:e.bind(A,c.OC.NORMAL),children:[(0,a.jsx)("input",{className:m().inStateType,type:"radio",name:"inStateType",readOnly:!0,checked:t.propertyEditorData.selectedStateType===c.OC.NORMAL}),(0,a.jsx)("label",{className:m().lblStateType,children:"\u666e\u901a"})]}),(0,a.jsxs)("div",{className:"d-flex align-items-center",onClick:e.bind(A,c.OC.FINAL),children:[(0,a.jsx)("input",{className:m().inStateType,type:"radio",name:"inStateType",readOnly:!0,checked:t.propertyEditorData.selectedStateType===c.OC.FINAL}),(0,a.jsx)("label",{className:m().lblStateType,children:"\u63a5\u6536"})]})]}),(0,a.jsx)("span",{className:E()(m().spanConfirmWrapper,"d-flex justify-content-center align-items-center"),onClick:function(){if(!t.propertyEditorData.isInvalidInputWarningShow){switch(t.appState.currentState){case p.y.EDIT_STATE:t.dfaInstance.editState(t.propertyEditorData.selectedGraphNodeId,t.propertyEditorData.editorInputTexts[0],t.propertyEditorData.selectedStateType,void 0,void 0);break;case p.y.EDIT_TRANSITION:t.dfaInstance.editTransition(t.propertyEditorData.selectedGraphEdgeId,t.propertyEditorData.editorInputTexts[0])}t.appState.changeAppState(p.y.DEFAULT)}},children:(0,a.jsx)("i",{className:"fa-solid fa-check"})}),(0,a.jsx)("span",{className:E()(m().spanCancelWrapper,"d-flex justify-content-center align-items-center"),onClick:function(){t.propertyEditorData.hideInvalidInputWarning(),t.appState.changeAppState(p.y.DEFAULT)},children:(0,a.jsx)("i",{className:"fa-solid fa-xmark"})})]})})),N=n(9298),D=n(3884),C=n(7860),R=n.n(C),b=(0,s.Pi)((function(t){return(0,a.jsxs)("div",{className:E()(t.className,R().divRunPanelWrapper),style:t.style,children:[(0,a.jsxs)("div",{className:E()(R().divRunControlsWrapper,"d-flex justify-content-evenly"),children:[(0,a.jsx)("i",{className:E()(R().iRunControl,"fa-solid fa-arrow-rotate-right"),onClick:function(e){e.stopPropagation(),t.dfaInstance.runReset()}}),(0,a.jsx)("i",{className:E()(R().iRunControl,"fa-solid fa-backward-step"),onClick:function(e){e.stopPropagation(),t.dfaInstance.runSingleBack()}}),(0,a.jsx)("i",{className:E()(R().iRunControl,"fa-solid fa-forward-step"),onClick:function(e){e.stopPropagation(),t.dfaInstance.runSingleStep(),t.dfaInstance.isRunningStuck&&(t.alertData.isAlertShow||t.alertData.showAlertAnimated("DFA\u5904\u4e8e\u5361\u6b7b\u72b6\u6001"))}}),(0,a.jsx)("i",{className:E()(R().iRunControl,"fa-solid fa-forward-fast"),onClick:function(e){e.stopPropagation(),t.dfaInstance.runToEnd(),t.dfaInstance.isRunningStuck&&(t.alertData.isAlertShow||t.alertData.showAlertAnimated("DFA\u5904\u4e8e\u5361\u6b7b\u72b6\u6001"))}}),(0,a.jsx)("i",{className:E()(R().iRunControlClose,"fa-solid fa-xmark"),onClick:function(e){e.stopPropagation(),t.dfaInstance.runExit(),t.appState.changeAppState(p.y.DEFAULT)}})]}),(0,a.jsxs)("div",{className:E()(R().divLowerPartWrapper,"d-flex"),children:[(0,a.jsxs)("span",{className:E()(R().spanLowerLeftPartWrapper,"d-flex flex-column justify-content-center"),children:[(0,a.jsx)("div",{className:E()(R().divStringWrapper,"d-flex flex-wrap"),children:t.dfaInstance.runString.split("").map((function(e,n){return(0,a.jsx)("span",{className:n<t.dfaInstance.nextRunStringCharIndex?R().spanStringCharConsumed:R().spanStringChar,children:e},n)}))}),(0,a.jsx)("div",{className:R().divStringInputWrapper,children:(0,a.jsx)("input",{className:R().inString,value:t.dfaInstance.runString,onInput:function(e){t.dfaInstance.runExit(),t.dfaInstance.setRunString(e.target.value),t.dfaInstance.initRun()}})})]}),(0,a.jsxs)("span",{className:E()(R().spanLowerRightPartWrapper,"d-flex flex-column justify-content-center align-items-center"),children:[(0,a.jsxs)("span",{className:R().spanCurrentStateLabel,children:[t.dfaInstance.runStateSequence.length-1,"\u6b65"]}),(0,a.jsx)("span",{className:R().spanCurrentStateLabel,children:"\u5f53\u524d\u72b6\u6001"}),(0,a.jsx)("span",{className:E()(R().spanCurrentStateWrapper,"d-flex justify-content-center align-items-center"),children:(0,a.jsx)("span",{className:R().spanCurrentState,style:{borderStyle:t.dfaInstance.currentRunState.type===c.OC.START?"dotted":t.dfaInstance.currentRunState.type===c.OC.FINAL?"double":"solid",borderWidth:t.dfaInstance.currentRunState.type===c.OC.FINAL?5:2,backgroundColor:t.dfaInstance.currentRunState.type===c.OC.START?D.bg:t.dfaInstance.currentRunState.type===c.OC.FINAL?D.aG:D.Az},children:t.dfaInstance.currentRunState.name})})]})]})]})})),k=n(6627);var j=n(4403),O=n.n(j),w=n(4105),_=n.n(w);function P(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function G(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function L(t){return(L=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function U(t,e){return!e||"object"!==q(e)&&"function"!==typeof e?P(t):e}function W(t,e){return(W=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var q=function(t){return t&&"undefined"!==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};function B(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,a=L(t);if(e){var r=L(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return U(this,n)}}var F=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&W(t,e)}(n,t);var e=B(n);function n(t){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),G(P(r=e.call(this,t)),"isAutomataEmpty",(function(){return r.pageDfaInstance.isAutomataEmpty})),G(P(r),"loadAutomataJsonString",(function(t){(0,I.gy)(t,r.pageDfaInstance)})),G(P(r),"exportAutomataJsonString",(function(){return r.pageDfaInstance.isAutomataEmpty?(r.pageAlertData.showAlertAnimated("DFA\u4e3a\u7a7a"),null):(r.pageAppState.currentState===p.y.RUN_AUTOMATA&&(r.pageDfaInstance.runExit(),r.pageAppState.changeAppState(p.y.DEFAULT)),(0,I.vV)(r.pageDfaInstance))})),G(P(r),"clearAll",(function(){r.pageAppState.changeAppState(p.y.DEFAULT),r.pageDfaInstance.clearAll()})),G(P(r),"componentDidMount",(function(){(0,k.BX)(document.getElementById("div-canvas-wrapper"),(function(t){!function(t,e,n,a){switch(e.currentState){case p.y.DEFAULT:if(t.nodes.length>0)a.setSelectedGraphNodeId(t.nodes[0]),a.setEditorInputText(n.getStateNameById(a.selectedGraphNodeId),0),a.setSelectedStateType(n.getStateTypeById(a.selectedGraphNodeId)),a.setPropertyEditorPosition(t.event.center.y,t.event.center.x,!1),e.changeAppState(p.y.EDIT_STATE);else if(t.edges.length>0){a.setSelectedGraphEdgeId(t.edges[0]);var r=n.getTransitionCharSeqById(a.selectedGraphEdgeId);a.setEditorInputText(r,0);var i=n.isTransitionCharSeqUnique(a.selectedGraphEdgeId,r);i[0]||a.showInvalidInputWarning("\u5df2\u7ecf\u6709\u5b57\u7b26".concat(i[1],"\u7684\u8f6c\u79fb")),a.setPropertyEditorPosition(t.event.center.y,t.event.center.x,!1),e.changeAppState(p.y.EDIT_TRANSITION)}break;case p.y.ADD_STATE_SELECT_POSITION:var o="q".concat(n.minimumUnoccupiedStateId),s=0==n.states.length?c.OC.START:c.OC.NORMAL;n.addState(o,s,t.pointer.canvas.x,t.pointer.canvas.y),a.setSelectedGraphNodeId(n.nextStateId-1),a.setEditorInputText(n.getStateNameById(a.selectedGraphNodeId),0),a.setSelectedStateType(n.getStateTypeById(a.selectedGraphNodeId)),a.setPropertyEditorPosition(t.event.center.y,t.event.center.x,!1),e.changeAppState(p.y.EDIT_STATE);break;case p.y.EDIT_STATE:case p.y.EDIT_TRANSITION:a.clearPropertyEditor(),e.changeAppState(p.y.DEFAULT);break;case p.y.ADD_TRANSITION_SELECT_ORIG:t.nodes.length>0&&(a.setSelectedGraphNodeId(t.nodes[0]),e.changeAppState(p.y.ADD_TRANSITION_SELECT_DEST));break;case p.y.ADD_TRANSITION_SELECT_DEST:if(t.nodes.length>0){n.addTransition(a.selectedGraphNodeId,t.nodes[0],"0"),a.setSelectedGraphEdgeId(n.getEdgeId(a.selectedGraphNodeId,t.nodes[0]));var d=n.getTransitionCharSeqById(a.selectedGraphEdgeId);a.setEditorInputText(d,0);var u=n.isTransitionCharSeqUnique(a.selectedGraphEdgeId,d);u[0]||a.showInvalidInputWarning("\u5df2\u7ecf\u6709\u5b57\u7b26".concat(u[1],"\u7684\u8f6c\u79fb")),a.setPropertyEditorPosition(t.event.center.y,t.event.center.x,!1),e.changeAppState(p.y.EDIT_TRANSITION)}case p.y.RUN_AUTOMATA:}}(t,r.pageAppState,r.pageDfaInstance,r.pagePropertyEditorData)}),(function(t){!function(t,e,n,a){if(t.nodes.length>0){var r=(0,k.H0)(t.nodes[0]);n.editState(t.nodes[0],void 0,void 0,r.x,r.y)}switch(e.currentState){case p.y.EDIT_STATE:case p.y.EDIT_TRANSITION:(t.nodes.length>0||t.edges.length>0)&&(a.setPropertyEditorPosition(t.event.center.y,t.event.center.x,!1),(0,S.tI)(e,a))}}(t,r.pageAppState,r.pageDfaInstance,r.pagePropertyEditorData)})),(0,d.EH)((function(){(0,k.A9)(r.pageDfaInstance.graphNodes,r.pageDfaInstance.graphEdges,r.pageDfaInstance.reactivityCounter)}))})),G(P(r),"componentDidUpdate",(function(){(0,S.tI)(r.pageAppState,r.pagePropertyEditorData)})),G(P(r),"removeSelected",(function(){switch(r.pageAppState.currentState){case p.y.EDIT_STATE:r.pageDfaInstance.removeState(r.pagePropertyEditorData.selectedGraphNodeId),r.pageAppState.changeAppState(p.y.DEFAULT);break;case p.y.EDIT_TRANSITION:r.pageDfaInstance.removeTransition(r.pagePropertyEditorData.selectedGraphEdgeId),r.pageAppState.changeAppState(p.y.DEFAULT)}})),G(P(r),"runAutomata",(function(){r.pageDfaInstance.hasStartState?(r.pageAppState.changeAppState(p.y.RUN_AUTOMATA),r.pageDfaInstance.initRun()):r.pageAlertData.showAlertAnimated("DFA\u6ca1\u6709\u5f00\u59cb\u72b6\u6001")})),G(P(r),"pageDfaInstance",new h),G(P(r),"pageAppState",new p.a),G(P(r),"pagePropertyEditorData",new y.y),G(P(r),"pageAlertData",new g.k),G(P(r),"pageComponent",(0,s.Pi)((function(t){var e=t.dfaInstance,n=t.appState,i=t.propertyEditorData,s=t.alertData;return(0,a.jsxs)("main",{className:O().mainContentWrapper,children:[(0,a.jsx)(o(),{children:(0,a.jsx)("title",{children:"Automata Playground - DFA"})}),(0,a.jsx)("div",{className:_().divAlert,role:"alert",style:{display:s.isAlertShow?"block":"none",opacity:s.alertOpacity},children:s.alertMessage}),(n.currentState===p.y.EDIT_STATE||n.currentState===p.y.EDIT_TRANSITION)&&(0,a.jsx)(x,{appState:n,dfaInstance:e,propertyEditorData:i,className:O().dfaPropertyEditor,style:{top:i.isPropertyEditorPositionAdjusted||(0,S.f7)()?i.propertyEditorTop:0,left:i.isPropertyEditorPositionAdjusted||(0,S.f7)()?i.propertyEditorLeft:0}}),(0,a.jsx)(N.Z,{appState:n,removeSelected:r.removeSelected,runAutomata:r.runAutomata,className:O().bottomToolbar,style:{display:n.currentState===p.y.RUN_AUTOMATA?"none":"block"}}),(0,a.jsx)(b,{appState:n,dfaInstance:e,alertData:s,className:O().bottomToolbar,style:{display:n.currentState===p.y.RUN_AUTOMATA?"block":"none"}}),(0,a.jsx)("div",{id:"div-canvas-wrapper",className:O().divCanvasWrapper})]})}))),G(P(r),"render",(function(){return(0,a.jsx)(r.pageComponent,{dfaInstance:r.pageDfaInstance,appState:r.pageAppState,propertyEditorData:r.pagePropertyEditorData,alertData:r.pageAlertData})})),r}return n}(r.Component)}},function(t){t.O(0,[814,959,461,556,681,774,888,179],(function(){return e=592,t(t.s=e);var e}));var e=t.O();_N_E=e}]);