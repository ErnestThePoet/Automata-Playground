(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{4184:function(e,t){var a;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var i=typeof a;if("string"===i||"number"===i)e.push(a);else if(Array.isArray(a)){if(a.length){var r=o.apply(null,a);r&&e.push(r)}}else if("object"===i)if(a.toString===Object.prototype.toString)for(var s in a)n.call(a,s)&&a[s]&&e.push(s);else e.push(a.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(a=function(){return o}.apply(t,[]))||(e.exports=a)}()},1118:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return a(9847)}])},8145:function(e,t,a){"use strict";a.d(t,{AR:function(){return c},M0:function(){return s},gy:function(){return p},vV:function(){return r},wG:function(){return l}});var n=a(9489),o="AP_DFA",i="AP_TM";function r(e){return JSON.stringify({automataType:o,version:1,nextStateId:e.nextStateId,nextEdgeId:e.nextEdgeId,states:e.states,graphNodes:e.graphNodes,graphEdges:e.graphEdges})}function s(e){return JSON.stringify({automataType:i,version:1,nextStateId:e.nextStateId,nextEdgeId:e.nextEdgeId,states:e.states,graphNodes:e.graphNodes,graphEdges:e.graphEdges})}function l(e,t){var a;try{a=JSON.parse(e)}catch(n){return t.showAlertAnimated("\u6587\u4ef6\u683c\u5f0f\u975e\u6cd5"),null}return a.automataType&&a.version&&a.nextStateId&&a.nextEdgeId&&a.states&&a.graphNodes&&a.graphEdges?a.version>1?(t.showAlertAnimated("\u6587\u4ef6\u7248\u672c\u4e0d\u517c\u5bb9"),null):a:(t.showAlertAnimated("\u6587\u4ef6\u683c\u5f0f\u975e\u6cd5"),null)}function c(e){switch(e.automataType){case o:return n.M.DFA;case i:return n.M.TM;default:return""}}function p(e,t){t.loadData(e.nextStateId,e.nextEdgeId,e.states,e.graphNodes,e.graphEdges)}},9489:function(e,t,a){"use strict";a.d(t,{M:function(){return n}});var n={DFA:"DFA",TM:"TM"}},9847:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return O}});var n=a(5893),o=a(7294),i=a(1163),r=a.n(i),s=a(8145),l=a(9489),c=a(474),p=a.n(c),u=a(4184),d=a.n(u),f=function(e){return(0,n.jsx)("div",{className:p().divDialogWall,onClick:function(e){e.stopPropagation()},children:(0,n.jsxs)("div",{className:d()(e.className,p().divDialogWrapper),style:e.style,children:[(0,n.jsxs)("div",{className:d()(p().divDialogTitleBar,"d-flex justify-content-between align-items-center"),children:[(0,n.jsx)("label",{className:p().lblDialogTitle,children:e.title}),(0,n.jsx)("i",{className:"fa-solid fa-xmark",style:{cursor:"pointer"},onClick:function(){e.closeDialog(!1)}})]}),(0,n.jsxs)("div",{className:p().divDialogBodyWrapper,children:[(0,n.jsx)("div",{className:p().divDialogContentWrapper,children:e.children}),!e.noButton&&(0,n.jsxs)("div",{className:d()(p().divYesNoWrapper,"d-flex justify-content-end"),children:[(0,n.jsx)("button",{type:"button",className:d()(p().btnYesNo,"btn btn-light"),onClick:function(){e.closeDialog(!1)},children:"\u53d6\u6d88"}),(0,n.jsx)("button",{type:"button",className:d()(p().btnYesNo,"btn btn-warning"),onClick:function(){e.closeDialog(!0)},children:"\u786e\u5b9a"})]})]})]})})},g=a(4105),m=a.n(g),h=a(3054),x=a.n(h);a(1535),a(8075),a(882);function _(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function N(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},n=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})))),n.forEach((function(t){v(e,t,a[t])}))}return e}function A(e,t){return!t||"object"!==j(t)&&"function"!==typeof t?_(e):t}function D(e,t){return(D=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var j=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function w(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=y(e);if(t){var o=y(this).constructor;a=Reflect.construct(n,arguments,o)}else a=n.apply(this,arguments);return A(this,a)}}var S=-1,b=0,T=1,E=2,k=3,C=4,P="/dfa",M="/tm",W="/Automata-Playground",I=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&D(e,t)}(a,e);var t=w(a);function a(e){var i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),v(_(i=t.call(this,e)),"automataPageRef",o.createRef()),v(_(i),"hideAside",(function(){i.setState({isAsideShow:!1})})),v(_(i),"closeDialog",(function(e){if(e){switch(i.data.dialogAffair){case b:i.goToNewAutomataPage(P);break;case T:i.goToNewAutomataPage(M);break;case k:document.getElementById("in-import-automata").click();break;case C:i.automataPageRef.current.clearAll();break;case E:i.loadExample()}i.setState({isYesNoDialogShow:!1})}else if(i.setState({isYesNoDialogShow:!1}),i.data.dialogAffair===E)i.setState({isExampleDialogShow:!0})})),v(_(i),"goToNewAutomataPage",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};r().pathname===e?(i.automataPageRef.current.clearAll(),t()):r().push(e).then((function(){t()})),i.hideAside()})),v(_(i),"importAutomataJsonString",(function(e){var t=(0,s.wG)(e,i.automataPageRef.current.pageAlertData);if(t)switch((0,s.AR)(t)){case l.M.DFA:i.goToNewAutomataPage(P,(function(){i.automataPageRef.current.loadAutomataJsonString(t)}));break;case l.M.TM:i.goToNewAutomataPage(M,(function(){i.automataPageRef.current.loadAutomataJsonString(t)}));break;default:i.automataPageRef.current.pageAlertData.showAlertAnimated("\u81ea\u52a8\u673a\u7c7b\u578b\u4e0d\u53d7\u652f\u6301")}})),v(_(i),"loadExample",(function(){i.setState({isExampleDialogShow:!1}),fetch(W+i.data.exampleJsonUrl).then((function(e){return e.text()})).then((function(e){i.importAutomataJsonString(e)}))})),v(_(i),"onNewDfaClick",(function(){i.automataPageRef.current.isAutomataEmpty()?i.goToNewAutomataPage(P):(i.data.dialogAffair=b,i.setState({yesNoDialogTitle:"\u65b0\u5efaDFA",yesNoDialogMessage:"\u5f53\u524d\u81ea\u52a8\u673a\u5c06\u88ab\u6e05\u7a7a\u3002\u7ee7\u7eed\u5417\uff1f",isYesNoDialogShow:!0}))})),v(_(i),"onNewTmClick",(function(){i.automataPageRef.current.isAutomataEmpty()?i.goToNewAutomataPage(M):(i.data.dialogAffair=T,i.setState({yesNoDialogTitle:"\u65b0\u5efaTM",yesNoDialogMessage:"\u5f53\u524d\u81ea\u52a8\u673a\u5c06\u88ab\u6e05\u7a7a\u3002\u7ee7\u7eed\u5417\uff1f",isYesNoDialogShow:!0}))})),v(_(i),"onOnlineExamplesClick",(function(){fetch(W+"/example-list.json").then((function(e){return e.text()})).then((function(e){i.setState({isExampleDialogShow:!0,exampleList:JSON.parse(e)})}))})),v(_(i),"onImportAutomataClick",(function(){i.automataPageRef.current.isAutomataEmpty()?document.getElementById("in-import-automata").click():(i.data.dialogAffair=k,i.setState({yesNoDialogTitle:"\u5bfc\u5165",yesNoDialogMessage:"\u5f53\u524d\u81ea\u52a8\u673a\u5c06\u88ab\u6e05\u7a7a\u3002\u7ee7\u7eed\u5bfc\u5165\u5417\uff1f",isYesNoDialogShow:!0}))})),v(_(i),"onExportAutomataClick",(function(){var e=i.automataPageRef.current.exportAutomataJsonString();if(e){var t=URL.createObjectURL(new Blob([e],{type:"application/json"})),a=document.createElement("a");a.href=t,a.download="".concat("/dfa"===r().pathname?"dfa":"tm",".json"),a.click(),URL.revokeObjectURL(t)}})),v(_(i),"onClearAllClick",(function(){i.data.dialogAffair=C,i.setState({yesNoDialogTitle:"\u6e05\u7a7a",yesNoDialogMessage:"\u786e\u5b9a\u6e05\u7a7a\u5f53\u524d\u81ea\u52a8\u673a\u5417\uff1f",isYesNoDialogShow:!0})})),v(_(i),"onAboutClick",(function(){i.hideAside(),i.data.dialogAffair=S,i.setState({yesNoDialogTitle:"\u5173\u4e8e",yesNoDialogMessage:(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{style:{textAlign:"center",marginBottom:7},children:"HIT Automata Playground"}),"Author:",(0,n.jsx)("br",{}),"\u54c8\u5c14\u6ee8\u5de5\u4e1a\u5927\u5b66 120L021615 \u5d14\u5b50\u5065",(0,n.jsx)("br",{}),(0,n.jsxs)("div",{style:{marginTop:7},children:["\u9879\u76ee\u5730\u5740\uff1a",(0,n.jsx)("a",{href:"https://github.com/ErnestThePoet/Automata-Playground",children:"Github"}),(0,n.jsx)("a",{style:{marginLeft:7},href:"https://gitee.com/ecui/automata-playground",children:"Gitee"})]}),(0,n.jsx)("div",{style:{textAlign:"center",marginTop:7},children:"May 2022, Ernest Cui"})]}),isYesNoDialogShow:!0})})),v(_(i),"onExampleItemClick",(function(e){i.data.exampleJsonUrl=e,i.automataPageRef.current.isAutomataEmpty()?i.loadExample():(i.data.dialogAffair=E,i.setState({isExampleDialogShow:!1,yesNoDialogTitle:"\u52a0\u8f7d\u793a\u4f8b",yesNoDialogMessage:"\u5f53\u524d\u81ea\u52a8\u673a\u5c06\u88ab\u6e05\u7a7a\u3002\u7ee7\u7eed\u52a0\u8f7d\u5417\uff1f",isYesNoDialogShow:!0}))})),v(_(i),"onFileInputChange",(function(e){if(0!==e.target.files.length){var t=new FileReader;t.readAsText(e.target.files[0]),t.onload=function(e){i.importAutomataJsonString(e.target.result),document.getElementById("in-import-automata").value=""}}})),v(_(i),"render",(function(){var e=i.props,t=e.Component,a=e.pageProps;return(0,n.jsxs)("div",{className:m().divMainWrapper,onClick:function(){i.setState({isAsideShow:!1})},children:[(0,n.jsxs)("nav",{className:d()(m().navNav,"d-flex justify-content-center align-items-center"),children:[(0,n.jsx)("span",{className:d()(m().spanMenuIconWrapper,"d-flex justify-content-center align-items-center",i.state.isAsideShow?m().spanMenuIconWrapperActive:""),onClick:function(e){e.stopPropagation(),i.setState((function(e){return{isAsideShow:!e.isAsideShow}}))},children:(0,n.jsx)("i",{className:d()(m().iMenuIcon,"fa-solid fa-bars")})}),(0,n.jsx)("span",{className:m().spanTitle,children:"HIT Automata Playground"})]}),(0,n.jsx)("aside",{className:d()(m().asideFunctionNav,i.state.isAsideShow?m().asideFunctionNavShow:""),onClick:function(e){e.stopPropagation()},children:(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{onClick:i.onNewDfaClick,children:[(0,n.jsx)("i",{className:"fa-solid fa-plus"}),"\u65b0\u5efaDFA"]}),(0,n.jsxs)("li",{onClick:i.onNewTmClick,children:[(0,n.jsx)("i",{className:"fa-solid fa-plus"}),"\u65b0\u5efaTM"]}),(0,n.jsxs)("li",{onClick:i.onOnlineExamplesClick,children:[(0,n.jsx)("i",{className:"fa-solid fa-book"}),"\u5728\u7ebf\u793a\u4f8b"]}),(0,n.jsxs)("li",{onClick:i.onImportAutomataClick,children:[(0,n.jsx)("i",{className:"fa-solid fa-file-import"}),(0,n.jsx)("input",{id:"in-import-automata",className:m().inImportAutomata,type:"file",accept:".json,application/json",onChange:i.onFileInputChange}),"\u5bfc\u5165"]}),(0,n.jsxs)("li",{onClick:i.onExportAutomataClick,children:[(0,n.jsx)("i",{className:"fa-solid fa-file-arrow-down"}),"\u4fdd\u5b58"]}),(0,n.jsxs)("li",{onClick:i.onClearAllClick,children:[(0,n.jsx)("i",{className:"fa-solid fa-xmark"}),"\u6e05\u7a7a"]}),(0,n.jsxs)("li",{onClick:i.onAboutClick,children:[(0,n.jsx)("i",{className:"fa-solid fa-circle-info"}),"\u5173\u4e8e"]})]})}),i.state.isYesNoDialogShow&&(0,n.jsx)(f,{title:i.state.yesNoDialogTitle,closeDialog:i.closeDialog,children:i.state.yesNoDialogMessage}),i.state.isExampleDialogShow&&(0,n.jsx)(f,{className:x().divDialogContentWrapper,title:"\u5728\u7ebf\u793a\u4f8b",noButton:!0,closeDialog:function(){return i.setState({isExampleDialogShow:!1})},children:(0,n.jsx)("div",{className:d()(x().divExampleListWrapper,"d-flex flex-column"),children:i.state.exampleList.map((function(e,t){return(0,n.jsxs)("div",{className:x().divSingleExampleWrapper,onClick:function(){return i.onExampleItemClick(e.url)},children:[(0,n.jsx)("i",{className:"fa-solid fa-tag"}),(0,n.jsx)("span",{className:x().spanExampleTitle,children:e.title}),(0,n.jsx)("span",{className:x()["spanTypeTag".concat(e.type)],children:e.type})]},t)}))})}),(0,n.jsx)(t,N({},a,{ref:i.automataPageRef}))]})})),i.state={isAsideShow:!1,isExampleDialogShow:!1,exampleList:[],isYesNoDialogShow:!1,yesNoDialogTitle:"",yesNoDialogMessage:""},i.data={dialogAffair:C,exampleJsonUrl:""},i}return a}(o.Component),O=I},3054:function(e){e.exports={divDialogContentWrapper:"app-example-dialog_divDialogContentWrapper__ZPdxU",divExampleListWrapper:"app-example-dialog_divExampleListWrapper__bHExd",divSingleExampleWrapper:"app-example-dialog_divSingleExampleWrapper__OtFio",spanExampleTitle:"app-example-dialog_spanExampleTitle__8VMW3",spanTypeTag:"app-example-dialog_spanTypeTag__8RjiY",spanTypeTagTM:"app-example-dialog_spanTypeTagTM__excL7",spanTypeTagDFA:"app-example-dialog_spanTypeTagDFA__XmmYg"}},4105:function(e){e.exports={divMainWrapper:"app_divMainWrapper__fSbkV",navNav:"app_navNav__9PJBc",spanMenuIconWrapper:"app_spanMenuIconWrapper___oB10",spanMenuIconWrapperActive:"app_spanMenuIconWrapperActive__ixraZ",iMenuIcon:"app_iMenuIcon__xrb__",spanTitle:"app_spanTitle__noSwJ",asideFunctionNav:"app_asideFunctionNav__KZdd9",asideFunctionNavShow:"app_asideFunctionNavShow__0EUsX",inImportAutomata:"app_inImportAutomata__jo0It",divAlert:"app_divAlert__fR3bA"}},474:function(e){e.exports={divDialogWall:"dialog_divDialogWall__EPD3Y",divDialogWrapper:"dialog_divDialogWrapper__BcgF8",divDialogTitleBar:"dialog_divDialogTitleBar__qo_SU",lblDialogTitle:"dialog_lblDialogTitle__WlRWF",divDialogBodyWrapper:"dialog_divDialogBodyWrapper__M_PH4",divDialogContentWrapper:"dialog_divDialogContentWrapper__WlReK",divYesNoWrapper:"dialog_divYesNoWrapper__aj31x",btnYesNo:"dialog_btnYesNo__CZJq_"}},8075:function(){},882:function(){},1535:function(){},1163:function(e,t,a){e.exports=a(880)}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(1118),t(880)}));var a=e.O();_N_E=a}]);