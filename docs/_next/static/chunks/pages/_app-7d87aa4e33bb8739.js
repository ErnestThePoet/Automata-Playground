(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{4184:function(e,t){var a;!function(){"use strict";var o={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var i=typeof a;if("string"===i||"number"===i)e.push(a);else if(Array.isArray(a)){if(a.length){var r=n.apply(null,a);r&&e.push(r)}}else if("object"===i)if(a.toString===Object.prototype.toString)for(var s in a)o.call(a,s)&&a[s]&&e.push(s);else e.push(a.toString())}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):void 0===(a=function(){return n}.apply(t,[]))||(e.exports=a)}()},1118:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return a(9847)}])},8145:function(e,t,a){"use strict";a.d(t,{AR:function(){return c},M0:function(){return s},gy:function(){return u},vV:function(){return r},wG:function(){return l}});var o=a(9489),n="AP_DFA",i="AP_TM";function r(e){return JSON.stringify({automataType:n,version:1,nextStateId:e.nextStateId,nextEdgeId:e.nextEdgeId,states:e.states,graphNodes:e.graphNodes,graphEdges:e.graphEdges})}function s(e){return JSON.stringify({automataType:i,version:1,nextStateId:e.nextStateId,nextEdgeId:e.nextEdgeId,states:e.states,graphNodes:e.graphNodes,graphEdges:e.graphEdges})}function l(e,t){var a;try{a=JSON.parse(e)}catch(o){return t.showAlertAnimated("\u6587\u4ef6\u683c\u5f0f\u975e\u6cd5"),null}return void 0===a.automataType||void 0===a.version||void 0===a.nextStateId||void 0===a.nextEdgeId||void 0===a.states||void 0===a.graphNodes||void 0===a.graphEdges?(t.showAlertAnimated("\u6587\u4ef6\u683c\u5f0f\u975e\u6cd5"),null):a.version>1?(t.showAlertAnimated("\u6587\u4ef6\u7248\u672c\u4e0d\u517c\u5bb9"),null):a}function c(e){switch(e.automataType){case n:return o.Mu.DFA;case i:return o.Mu.TM;default:return""}}function u(e,t){t.loadData(e.nextStateId,e.nextEdgeId,e.states,e.graphNodes,e.graphEdges)}},9489:function(e,t,a){"use strict";a.d(t,{Ix:function(){return i},Mu:function(){return n},s_:function(){return r}});var o=a(8265),n={DFA:"DFA",TM:"TM"},i={DFA:"DFA",TM:"TM",UNKNOWN:""};function r(e){switch(e){case o.S.DFA_PAGE:return i.DFA;case o.S.TM_PAGE:return i.TM;default:return""}}},8265:function(e,t,a){"use strict";a.d(t,{G:function(){return n},S:function(){return o}});var o={DFA_PAGE:"/dfa",TM_PAGE:"/tm"},n="/Automata-Playground"},9847:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return O}});var o=a(5893),n=a(7294),i=a(1163),r=a.n(i),s=a(8145),l=a(9489),c=a(8265),u=a(474),p=a.n(u),d=a(4184),f=a.n(d),g=function(e){return(0,o.jsx)("div",{className:p().divDialogWall,onClick:function(e){e.stopPropagation()},children:(0,o.jsxs)("div",{className:f()(e.className,p().divDialogWrapper),style:e.style,children:[(0,o.jsxs)("div",{className:f()(p().divDialogTitleBar,"d-flex justify-content-between align-items-center"),children:[(0,o.jsx)("label",{className:p().lblDialogTitle,children:e.title}),(0,o.jsx)("i",{className:"fa-solid fa-xmark",style:{cursor:"pointer"},onClick:function(){e.closeDialog(!1)}})]}),(0,o.jsxs)("div",{className:p().divDialogBodyWrapper,children:[(0,o.jsx)("div",{className:p().divDialogContentWrapper,children:e.children}),!e.noButton&&(0,o.jsxs)("div",{className:f()(p().divYesNoWrapper,"d-flex justify-content-end"),children:[(0,o.jsx)("button",{type:"button",className:f()(p().btnYesNo,"btn btn-light"),onClick:function(){e.closeDialog(!1)},children:"\u53d6\u6d88"}),(0,o.jsx)("button",{type:"button",className:f()(p().btnYesNo,"btn btn-warning"),onClick:function(){e.closeDialog(!0)},children:"\u786e\u5b9a"})]})]})]})})},m=a(4105),h=a.n(m),x=a(3054),N=a.n(x);a(1535),a(8075),a(882);function _(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function A(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},o=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(a).filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})))),o.forEach((function(t){A(e,t,a[t])}))}return e}function D(e,t){return!t||"object"!==T(t)&&"function"!==typeof t?_(e):t}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var T=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function w(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,o=v(e);if(t){var n=v(this).constructor;a=Reflect.construct(o,arguments,n)}else a=o.apply(this,arguments);return D(this,a)}}var j=-1,b=0,E=1,P=2,k=3,C=4,M=5,I="https://ecui.gitee.io/automata-playground",W=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(a,e);var t=w(a);function a(e){var i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),A(_(i=t.call(this,e)),"componentDidMount",(function(){i.setAutomataTypeName(),null===localStorage.getItem("visited")&&(i.setState({isMirrorDialogShow:!0}),localStorage.setItem("visited","true"))})),A(_(i),"automataPageRef",n.createRef()),A(_(i),"setAutomataTypeName",(function(){i.setState({currentAutomataTypeName:(0,l.s_)(r().pathname)})})),A(_(i),"hideAside",(function(){i.setState({isAsideShow:!1})})),A(_(i),"closeDialog",(function(e){if(e){switch(i.data.dialogAffair){case b:i.goToNewAutomataPage(c.S.DFA_PAGE);break;case E:i.goToNewAutomataPage(c.S.TM_PAGE);break;case k:document.getElementById("in-import-automata").click();break;case C:i.automataPageRef.current.clearAll();break;case P:i.loadExample();break;case M:window.location.assign(I)}i.setState({isYesNoDialogShow:!1})}else if(i.setState({isYesNoDialogShow:!1}),i.data.dialogAffair===P)i.setState({isExampleDialogShow:!0})})),A(_(i),"goToNewAutomataPage",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};r().pathname===e?(i.automataPageRef.current.clearAll(),t()):r().push(e).then((function(){t()})),i.hideAside()})),A(_(i),"importAutomataJsonString",(function(e){var t=(0,s.wG)(e,i.automataPageRef.current.pageAlertData);if(t)switch((0,s.AR)(t)){case l.Mu.DFA:i.goToNewAutomataPage(c.S.DFA_PAGE,(function(){i.automataPageRef.current.loadAutomataJsonString(t)}));break;case l.Mu.TM:i.goToNewAutomataPage(c.S.TM_PAGE,(function(){i.automataPageRef.current.loadAutomataJsonString(t)}));break;default:i.automataPageRef.current.pageAlertData.showAlertAnimated("\u81ea\u52a8\u673a\u7c7b\u578b\u4e0d\u53d7\u652f\u6301")}})),A(_(i),"loadExample",(function(){i.setState({isExampleDialogShow:!1}),fetch(c.G+i.data.exampleJsonUrl).then((function(e){return e.text()})).then((function(e){i.importAutomataJsonString(e)}))})),A(_(i),"onNewDfaClick",(function(){i.automataPageRef.current.isAutomataEmpty()?i.goToNewAutomataPage(c.S.DFA_PAGE):(i.data.dialogAffair=b,i.setState({yesNoDialogTitle:"\u65b0\u5efaDFA",yesNoDialogMessage:"\u5f53\u524d\u81ea\u52a8\u673a\u5c06\u88ab\u6e05\u7a7a\u3002\u7ee7\u7eed\u5417\uff1f",isYesNoDialogShow:!0}))})),A(_(i),"onNewTmClick",(function(){i.automataPageRef.current.isAutomataEmpty()?i.goToNewAutomataPage(c.S.TM_PAGE):(i.data.dialogAffair=E,i.setState({yesNoDialogTitle:"\u65b0\u5efaTM",yesNoDialogMessage:"\u5f53\u524d\u81ea\u52a8\u673a\u5c06\u88ab\u6e05\u7a7a\u3002\u7ee7\u7eed\u5417\uff1f",isYesNoDialogShow:!0}))})),A(_(i),"onOnlineExamplesClick",(function(){fetch(c.G+"/example-list.json").then((function(e){return e.text()})).then((function(e){i.setState({isExampleDialogShow:!0,exampleList:JSON.parse(e)})}))})),A(_(i),"onImportAutomataClick",(function(){i.automataPageRef.current.isAutomataEmpty()?document.getElementById("in-import-automata").click():(i.data.dialogAffair=k,i.setState({yesNoDialogTitle:"\u5bfc\u5165",yesNoDialogMessage:"\u5f53\u524d\u81ea\u52a8\u673a\u5c06\u88ab\u6e05\u7a7a\u3002\u7ee7\u7eed\u5bfc\u5165\u5417\uff1f",isYesNoDialogShow:!0}))})),A(_(i),"onExportAutomataClick",(function(){var e=i.automataPageRef.current.exportAutomataJsonString();if(e){var t=URL.createObjectURL(new Blob([e],{type:"application/json"})),a=document.createElement("a");a.href=t,a.download="".concat("/dfa"===r().pathname?"dfa":"tm",".json"),a.click(),URL.revokeObjectURL(t)}})),A(_(i),"onClearAllClick",(function(){i.data.dialogAffair=C,i.setState({yesNoDialogTitle:"\u6e05\u7a7a",yesNoDialogMessage:"\u786e\u5b9a\u6e05\u7a7a\u5f53\u524d\u81ea\u52a8\u673a\u5417\uff1f",isYesNoDialogShow:!0})})),A(_(i),"onGoToMirrorClick",(function(){i.automataPageRef.current.isAutomataEmpty()?window.location.assign(I):(i.data.dialogAffair=M,i.setState({yesNoDialogTitle:"\u56fd\u5185\u955c\u50cf",yesNoDialogMessage:"\u5f53\u524d\u81ea\u52a8\u673a\u5c06\u4f1a\u4e22\u5931\u3002\u7ee7\u7eed\u8df3\u8f6c\u5417\uff1f",isYesNoDialogShow:!0}))})),A(_(i),"onAboutClick",(function(){i.hideAside(),i.data.dialogAffair=j,i.setState({yesNoDialogTitle:"\u5173\u4e8e",yesNoDialogMessage:(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{style:{textAlign:"center",marginBottom:7},children:"HIT Automata Playground"}),"Author:",(0,o.jsx)("br",{}),"\u54c8\u5c14\u6ee8\u5de5\u4e1a\u5927\u5b66 120L021615 \u5d14\u5b50\u5065",(0,o.jsx)("br",{}),"QQ: 1326899636",(0,o.jsx)("br",{}),(0,o.jsxs)("div",{style:{marginTop:7},children:["\u9879\u76ee\u5730\u5740\uff1a",(0,o.jsx)("a",{href:"https://github.com/ErnestThePoet/Automata-Playground",children:"Github"}),(0,o.jsx)("a",{style:{marginLeft:7},href:"https://gitee.com/ecui/automata-playground",children:"Gitee"})]}),(0,o.jsx)("div",{style:{textAlign:"center",marginTop:7},children:"May 2022, Ernest Cui"})]}),isYesNoDialogShow:!0})})),A(_(i),"onExampleItemClick",(function(e){i.data.exampleJsonUrl=e,i.automataPageRef.current.isAutomataEmpty()?i.loadExample():(i.data.dialogAffair=P,i.setState({isExampleDialogShow:!1,yesNoDialogTitle:"\u52a0\u8f7d\u793a\u4f8b",yesNoDialogMessage:"\u5f53\u524d\u81ea\u52a8\u673a\u5c06\u88ab\u6e05\u7a7a\u3002\u7ee7\u7eed\u52a0\u8f7d\u5417\uff1f",isYesNoDialogShow:!0}))})),A(_(i),"onFileInputChange",(function(e){if(0!==e.target.files.length){var t=new FileReader;t.readAsText(e.target.files[0]),t.onload=function(e){i.importAutomataJsonString(e.target.result),document.getElementById("in-import-automata").value=""}}})),A(_(i),"render",(function(){var e=i.props,t=e.Component,a=e.pageProps;return(0,o.jsxs)("div",{className:h().divMainWrapper,onClick:function(){i.setState({isAsideShow:!1})},children:[(0,o.jsxs)("nav",{className:f()(h().navNav,"d-flex justify-content-center align-items-center"),children:[(0,o.jsx)("span",{className:f()(h().spanMenuIconWrapper,"d-flex justify-content-center align-items-center",i.state.isAsideShow?h().spanMenuIconWrapperActive:""),onClick:function(e){e.stopPropagation(),i.setState((function(e){return{isAsideShow:!e.isAsideShow}}))},children:(0,o.jsx)("i",{className:f()(h().iMenuIcon,"fa-solid fa-bars")})}),(0,o.jsxs)("span",{className:h().spanTitle,children:["HIT Automata Playground",i.state.currentAutomataTypeName===l.Ix.UNKNOWN?"":" - ".concat(i.state.currentAutomataTypeName)]})]}),(0,o.jsx)("aside",{className:f()(h().asideFunctionNav,i.state.isAsideShow?h().asideFunctionNavShow:""),onClick:function(e){e.stopPropagation()},children:(0,o.jsxs)("ul",{children:[(0,o.jsxs)("li",{onClick:i.onNewDfaClick,children:[(0,o.jsx)("i",{className:"fa-solid fa-plus"}),"\u65b0\u5efaDFA"]}),(0,o.jsxs)("li",{onClick:i.onNewTmClick,children:[(0,o.jsx)("i",{className:"fa-solid fa-plus"}),"\u65b0\u5efaTM"]}),(0,o.jsxs)("li",{onClick:i.onOnlineExamplesClick,children:[(0,o.jsx)("i",{className:"fa-solid fa-book"}),"\u5728\u7ebf\u793a\u4f8b"]}),(0,o.jsxs)("li",{onClick:i.onImportAutomataClick,children:[(0,o.jsx)("i",{className:"fa-solid fa-file-import"}),(0,o.jsx)("input",{id:"in-import-automata",className:h().inImportAutomata,type:"file",accept:".json,application/json",onChange:i.onFileInputChange}),"\u5bfc\u5165"]}),(0,o.jsxs)("li",{onClick:i.onExportAutomataClick,children:[(0,o.jsx)("i",{className:"fa-solid fa-file-arrow-down"}),"\u4fdd\u5b58"]}),(0,o.jsxs)("li",{onClick:i.onClearAllClick,children:[(0,o.jsx)("i",{className:"fa-solid fa-xmark"}),"\u6e05\u7a7a"]}),(0,o.jsxs)("li",{onClick:i.onGoToMirrorClick,children:[(0,o.jsx)("i",{className:"fa-solid fa-bolt"}),"\u56fd\u5185\u955c\u50cf"]}),(0,o.jsxs)("li",{onClick:i.onAboutClick,children:[(0,o.jsx)("i",{className:"fa-solid fa-circle-info"}),"\u5173\u4e8e"]})]})}),i.state.isYesNoDialogShow&&(0,o.jsx)(g,{title:i.state.yesNoDialogTitle,closeDialog:i.closeDialog,children:i.state.yesNoDialogMessage}),i.state.isExampleDialogShow&&(0,o.jsx)(g,{className:N().divDialogContentWrapper,title:"\u5728\u7ebf\u793a\u4f8b (".concat(i.state.exampleList.length,")"),noButton:!0,closeDialog:function(){return i.setState({isExampleDialogShow:!1})},children:(0,o.jsx)("div",{className:f()(N().divExampleListWrapper,"d-flex flex-column"),children:i.state.exampleList.map((function(e,t){return(0,o.jsxs)("div",{className:N().divSingleExampleWrapper,onClick:function(){return i.onExampleItemClick(e.url)},children:[(0,o.jsx)("i",{className:"fa-solid fa-tag"}),(0,o.jsx)("span",{className:N().spanExampleTitle,children:e.title}),(0,o.jsx)("span",{className:N()["spanTypeTag".concat(e.type)],children:e.type})]},t)}))})}),i.state.isMirrorDialogShow&&(0,o.jsxs)(g,{title:"\u56fd\u5185\u955c\u50cf\u53ef\u7528",closeDialog:function(){return i.setState({isMirrorDialogShow:!1})},children:["\u5982\u679c\u6b64\u7ad9\u70b9\u8bbf\u95ee\u8f83\u6162\uff0c\u53ef\u4ee5\u6539\u7528\u56fd\u5185\u7684",(0,o.jsx)("br",{}),(0,o.jsx)("a",{href:I,children:"Gitee Pages\u955c\u50cf"})]}),(0,o.jsx)(t,y({},a,{ref:i.automataPageRef}))]})})),i.state={currentAutomataTypeName:l.Ix.UNKNOWN,isAsideShow:!1,isExampleDialogShow:!1,exampleList:[],isYesNoDialogShow:!1,yesNoDialogTitle:"",yesNoDialogMessage:"",isMirrorDialogShow:!1},i.data={dialogAffair:C,exampleJsonUrl:""},r().events.on("routeChangeComplete",i.setAutomataTypeName),i}return a}(n.Component),O=W},3054:function(e){e.exports={divDialogContentWrapper:"app-example-dialog_divDialogContentWrapper__ZPdxU",divExampleListWrapper:"app-example-dialog_divExampleListWrapper__bHExd",divSingleExampleWrapper:"app-example-dialog_divSingleExampleWrapper__OtFio",spanExampleTitle:"app-example-dialog_spanExampleTitle__8VMW3",spanTypeTag:"app-example-dialog_spanTypeTag__8RjiY",spanTypeTagTM:"app-example-dialog_spanTypeTagTM__excL7",spanTypeTagDFA:"app-example-dialog_spanTypeTagDFA__XmmYg"}},4105:function(e){e.exports={divMainWrapper:"app_divMainWrapper__fSbkV",navNav:"app_navNav__9PJBc",spanMenuIconWrapper:"app_spanMenuIconWrapper___oB10",spanMenuIconWrapperActive:"app_spanMenuIconWrapperActive__ixraZ",iMenuIcon:"app_iMenuIcon__xrb__",spanTitle:"app_spanTitle__noSwJ",asideFunctionNav:"app_asideFunctionNav__KZdd9",asideFunctionNavShow:"app_asideFunctionNavShow__0EUsX",inImportAutomata:"app_inImportAutomata__jo0It",divAlert:"app_divAlert__fR3bA"}},474:function(e){e.exports={divDialogWall:"dialog_divDialogWall__EPD3Y",divDialogWrapper:"dialog_divDialogWrapper__BcgF8",divDialogTitleBar:"dialog_divDialogTitleBar__qo_SU",lblDialogTitle:"dialog_lblDialogTitle__WlRWF",divDialogBodyWrapper:"dialog_divDialogBodyWrapper__M_PH4",divDialogContentWrapper:"dialog_divDialogContentWrapper__WlReK",divYesNoWrapper:"dialog_divYesNoWrapper__aj31x",btnYesNo:"dialog_btnYesNo__CZJq_"}},8075:function(){},882:function(){},1535:function(){},1163:function(e,t,a){e.exports=a(880)}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(1118),t(880)}));var a=e.O();_N_E=a}]);