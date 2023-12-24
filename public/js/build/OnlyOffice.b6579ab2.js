import{m as c,n as f,l as a}from"./app.dda3649d.js";import{I as h}from"./IFrame.cd4ccd2e.js";var u=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"component-only-office"},[e.$A.isDesktop()?[e.loadError?i("Alert",{staticClass:"load-error",attrs:{type:"error","show-icon":""}},[e._v(e._s(e.$L("\u7EC4\u4EF6\u52A0\u8F7D\u5931\u8D25\uFF01")))]):e._e(),i("div",{staticClass:"placeholder",attrs:{id:e.id}})]:i("IFrame",{staticClass:"preview-iframe",attrs:{src:e.previewUrl},on:{"on-load":e.onFrameLoad}}),e.loading?i("div",{staticClass:"office-loading"},[i("Loading")],1):e._e()],2)},m=[];const p={name:"OnlyOffice",components:{IFrame:h},props:{id:{type:String,default:()=>"office_"+Math.round(Math.random()*1e4)},code:{type:String,default:""},historyId:{type:Number,default:0},value:{type:[Object,Array],default:function(){return{}}},readOnly:{type:Boolean,default:!1},documentKey:Function},data(){return{loading:!1,loadError:!1,docEditor:null}},beforeDestroy(){this.docEditor!==null&&(this.docEditor.destroyEditor(),this.docEditor=null)},computed:{...c(["userInfo","themeIsDark"]),fileType(){return this.getType(this.value.type)},fileName(){return this.value.name},fileUrl(){let e=this.code||this.value.id,t;return $A.leftExists(e,"msgFile_")?t=`dialog/msg/download/?msg_id=${$A.leftDelete(e,"msgFile_")}&token=${this.userToken}`:$A.leftExists(e,"taskFile_")?t=`project/task/filedown/?file_id=${$A.leftDelete(e,"taskFile_")}&token=${this.userToken}`:(t=`file/content/?id=${e}&token=${this.userToken}`,this.historyId>0&&(t+=`&history_id=${this.historyId}`)),t},previewUrl(){return $A.apiUrl(this.fileUrl)+"&down=preview"}},watch:{"value.id":{handler(e){!e||!$A.isDesktop()||(this.loading=!0,this.loadError=!1,$A.loadScript($A.apiUrl("../office/web-apps/apps/api/documents/api.js")).then(t=>{if(!this.documentKey){this.handleClose();return}const i=this.documentKey();i&&i.then?i.then(this.loadFile).catch(({msg:n})=>{$A.modalError({content:n})}):this.loadFile()}).catch(t=>{this.loadError=!0}).finally(t=>{this.loading=!1}))},immediate:!0},previewUrl:{handler(){$A.isDesktop()||(this.loading=!0)},immediate:!0}},methods:{onFrameLoad(){this.loading=!1},getType(e){switch(e){case"word":return"docx";case"excel":return"xlsx";case"ppt":return"pptx"}return e},loadFile(e=""){this.docEditor!==null&&(this.docEditor.destroyEditor(),this.docEditor=null);let t=a;switch(a){case"zh-CHT":t="zh-TW";break}let i=this.code||this.value.id,n=$A.strExists(this.fileName,".")?this.fileName:this.fileName+"."+this.fileType,l=`${this.fileType}-${e||i}`;this.historyId>0&&(l+=`-${this.historyId}`);const r={document:{fileType:this.fileType,title:n,key:l,url:`http://nginx/api/${this.fileUrl}`},editorConfig:{mode:"edit",lang:t,user:{id:String(this.userInfo.userid),name:this.userInfo.nickname},customization:{uiTheme:this.themeIsDark?"theme-dark":"theme-classic-light",forcesave:!0,help:!1},callbackUrl:`http://nginx/api/file/content/office?id=${i}&dootask-token=${this.userToken}`},events:{onDocumentReady:this.onDocumentReady}};/\/hideenOfficeTitle\//.test(window.navigator.userAgent)&&(r.document.title=" "),(async g=>{if((this.readOnly||this.historyId>0)&&(r.editorConfig.mode="view",r.editorConfig.callbackUrl=null,!r.editorConfig.user.id)){let o=await $A.IDBInt("officeViewer");o||(o=$A.randNum(1e3,99999),await $A.IDBSet("officeViewer",o)),r.editorConfig.user.id="viewer_"+o,r.editorConfig.user.name="Viewer_"+o}this.$nextTick(()=>{this.$store.dispatch("call",{url:"file/office/token",data:{config:r}}).then(({data:o})=>{if(r.token=o.token,this.docEditor=new DocsAPI.DocEditor(this.id,r),this.readOnly){var s=$("iframe[name='frameEditor']")[0];s==null||s.addEventListener("load",function(){s.contentWindow.postMessage("disableDownload","*")})}}).catch(({msg:o})=>{if(o.indexOf("404 not found")!==-1){$A.modalInfo({language:!1,title:"\u7248\u672C\u8FC7\u4F4E",content:"\u670D\u52A1\u5668\u7248\u672C\u8FC7\u4F4E\uFF0C\u8BF7\u5347\u7EA7\u670D\u52A1\u5668\u3002"});return}$A.modalError({content:o})})})})()},onDocumentReady(){this.$emit("on-document-ready",this.docEditor)}}},d={};var _=f(p,u,m,!1,y,"dcc24366",null,null);function y(e){for(let t in d)this[t]=d[t]}var w=function(){return _.exports}();export{w as default};