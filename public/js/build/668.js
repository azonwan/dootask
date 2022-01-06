"use strict";(self.webpackChunkDooTask=self.webpackChunkDooTask||[]).push([[668],{61381:(e,t,i)=>{i.d(t,{Z:()=>r});var n=i(1519),o=i.n(n)()((function(e){return e[1]}));o.push([e.id,".component-only-office[data-v-0136b8ca]{align-items:center;bottom:0;display:flex;justify-content:center;left:0;position:absolute;right:0;top:0}.component-only-office .placeholder[data-v-0136b8ca]{flex:1;height:100%;width:100%}.component-only-office .office-loading[data-v-0136b8ca]{align-items:center;bottom:0;display:flex;justify-content:center;left:0;position:absolute;right:0;top:0;z-index:2}",""]);const r=o},55668:(e,t,i)=>{i.r(t),i.d(t,{default:()=>f});var n=i(20629);function o(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function r(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?o(Object(i),!0).forEach((function(t){a(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function a(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}const c={name:"OnlyOffice",props:{id:{type:String,default:function(){return"office_"+Math.round(1e4*Math.random())}},code:{type:String,default:""},value:{type:[Object,Array],default:function(){return{}}},readOnly:{type:Boolean,default:!1}},data:function(){return{loadIng:0,docEditor:null}},mounted:function(){},beforeDestroy:function(){null!==this.docEditor&&(this.docEditor.destroyEditor(),this.docEditor=null)},computed:r(r({},(0,n.rn)(["userToken","userInfo"])),{},{fileType:function(){return this.getType(this.value.type)},fileName:function(){return this.value.name}}),watch:{"value.id":{handler:function(e){var t=this;e&&(this.loadIng++,$A.loadScript($A.apiUrl("../office/web-apps/apps/api/documents/api.js"),(function(e){t.loadIng--,null!==e?$A.modalAlert("组件加载失败！"):t.loadFile()})))},immediate:!0}},methods:{getType:function(e){switch(e){case"word":return"docx";case"excel":return"xlsx";case"ppt":return"pptx"}return""},loadFile:function(){var e=this;null!==this.docEditor&&(this.docEditor.destroyEditor(),this.docEditor=null);var t="zh";switch(this.getLanguage()){case"CN":case"TC":t="zh";break;default:t="en"}var i=this.code||this.value.id,n={document:{fileType:this.fileType,key:this.fileType+"-"+i,title:this.fileName+"."+this.fileType,url:"http://nginx/api/file/content/?id="+i+"&token="+this.userToken},editorConfig:{mode:"edit",lang:t,user:{id:this.userInfo.userid,name:this.userInfo.nickname},customization:{uiTheme:"theme-classic-light"},callbackUrl:"http://nginx/api/file/content/office?id="+i+"&token="+this.userToken}};if(this.readOnly&&(n.editorConfig.mode="view",n.editorConfig.callbackUrl=null,!n.editorConfig.user.id)){var o=$A.getStorageInt("viewer");o||(o=$A.randNum(1e3,99999),$A.setStorage("viewer",o)),n.editorConfig.user.id="viewer_"+o,n.editorConfig.user.name="Viewer_"+o}this.$nextTick((function(){e.docEditor=new DocsAPI.DocEditor(e.id,n)}))}}};var l=i(93379),s=i.n(l),d=i(61381),u={insert:"head",singleton:!1};s()(d.Z,u);d.Z.locals;const f=(0,i(51900).Z)(c,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"component-only-office"},[i("div",{staticClass:"placeholder",attrs:{id:this.id}}),e._v(" "),e.loadIng>0?i("div",{staticClass:"office-loading"},[i("Loading")],1):e._e()])}),[],!1,null,"0136b8ca",null).exports}}]);