import{t as h}from"./tinymce.24840f82.js";import{I as m}from"./ImgUpload.b24e2398.js";import{m as g}from"./vuex.cc7cb26e.js";import{l as u,n as f}from"./app.8392181e.js";import"./@babel.f9bcab46.js";import"./@micro-zoe.c2e1472d.js";import"./jquery.1ef9638d.js";import"./dayjs.95204bfa.js";import"./localforage.d8c69ca4.js";import"./markdown-it.bda97caf.js";import"./mdurl.ce6c1dd8.js";import"./uc.micro.8d343c98.js";import"./entities.48a44fec.js";import"./linkify-it.c5e8196e.js";import"./punycode.js.4b3f125a.js";import"./highlight.js.ab8aeea4.js";import"./markdown-it-link-attributes.e1d5d151.js";import"./@traptitech.897ae552.js";import"./vue.fd9b772e.js";import"./openpgp_hi.15f91b1d.js";import"./axios.6ec123f8.js";import"./mitt.1ea0a2a3.js";import"./vue-router.2d566cd7.js";import"./vue-clipboard2.50be9c5e.js";import"./clipboard.058ef547.js";import"./view-design-hi.66685278.js";import"./vuedraggable.9fd6afed.js";import"./sortablejs.d74243d9.js";import"./vue-resize-observer.c3c9ca4e.js";import"./element-sea.7f208f9b.js";import"./deepmerge.cecf392e.js";import"./resize-observer-polyfill.0bdc1850.js";import"./throttle-debounce.7c3948b2.js";import"./babel-helper-vue-jsx-merge-props.5ed215c3.js";import"./normalize-wheel.2a034b9f.js";import"./async-validator.49abba38.js";import"./babel-runtime.4773988a.js";import"./core-js.314b4a1d.js";import"./lodash.18c5398d.js";var y=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"teditor-wrapper"},[e("div",{staticClass:"teditor-box",class:[!t.inline&&t.spinShow?"teditor-loadstyle":"teditor-loadedstyle"]},[t.inline?[e("div",{ref:"myTextarea",staticClass:"user-select-auto",attrs:{id:t.id},domProps:{innerHTML:t._s(t.spinShow?"":t.content)}}),t.spinShow?e("Icon",{staticClass:"icon-loading icon-inline",attrs:{type:"ios-loading",size:18}}):t._e()]:[e("textarea",{ref:"myTextarea",attrs:{id:t.id}},[t._v(t._s(t.content))]),t.spinShow?e("Spin",{attrs:{fix:""}},[e("Icon",{staticClass:"icon-loading",attrs:{type:"ios-loading",size:18}}),e("div",[t._v(t._s(t.$L("\u52A0\u8F7D\u7EC4\u4EF6\u4E2D...")))])],1):t._e()],e("ImgUpload",{ref:"myUpload",staticClass:"upload-control",attrs:{type:"callback",uploadIng:t.uploadIng,num:50,width:2048,height:2048,whcut:"percentage"},on:{"update:uploadIng":function(i){t.uploadIng=i},"update:upload-ing":function(i){t.uploadIng=i},"on-callback":t.editorImage}}),e("Upload",{ref:"fileUpload",staticClass:"upload-control",attrs:{name:"files",action:t.actionUrl,headers:t.headers,multiple:"",format:t.uploadFormat,"show-upload-list":!1,"max-size":t.maxSize,"on-progress":t.handleProgress,"on-success":t.handleSuccess,"on-error":t.handleError,"on-format-error":t.handleFormatError,"on-exceeded-size":t.handleMaxSize,"before-upload":t.handleBeforeUpload}})],2),t.uploadIng>0?e("Spin",{attrs:{fix:""}},[e("Icon",{staticClass:"icon-loading",attrs:{type:"ios-loading"}}),e("div",[t._v(t._s(t.$L("\u6B63\u5728\u4E0A\u4F20\u6587\u4EF6...")))])],1):t._e(),e("Modal",{staticClass:"teditor-transfer",attrs:{"footer-hide":"",fullscreen:"",transfer:""},on:{"on-visible-change":t.transferChange},model:{value:t.transfer,callback:function(i){t.transfer=i},expression:"transfer"}},[e("div",{attrs:{slot:"close"},slot:"close"},[e("Button",{attrs:{type:"primary",size:"small"}},[t._v(t._s(t.$L("\u5B8C\u6210")))])],1),e("div",{staticClass:"teditor-transfer-body"},[e("textarea",{attrs:{id:"T_"+t.id}},[t._v(t._s(t.content))])]),t.uploadIng>0?e("Spin",{attrs:{fix:""}},[e("Icon",{staticClass:"icon-loading",attrs:{type:"ios-loading"}}),e("div",[t._v(t._s(t.$L("\u6B63\u5728\u4E0A\u4F20\u6587\u4EF6...")))])],1):t._e()],1)],1)},v=[];const c="ontouchend"in document,$={name:"TEditor",components:{ImgUpload:m},props:{id:{type:String,default:()=>"tinymce_"+Math.round(Math.random()*1e4)},value:{default:""},height:{default:360},minHeight:{type:Number,default:0},htmlClass:{default:"",type:String},plugins:{type:Array,default:()=>["advlist autolink lists link image charmap print preview hr anchor pagebreak","searchreplace visualblocks visualchars code","insertdatetime media nonbreaking save table directionality","emoticons paste codesample"]},menubar:{type:String,default:()=>c?"edit insert format tools":"file edit view insert format tools table"},toolbar:{type:String,default:()=>c?"uploadImages | bold italic underline | forecolor backcolor | screenload":"undo redo | styleselect | uploadImages | uploadFiles | bold italic underline forecolor backcolor | alignleft aligncenter alignright | bullist numlist outdent indent | link image emoticons media codesample | preview screenload"},options:{type:Object,default:()=>({})},optionFull:{type:Object,default:()=>({})},inline:{type:Boolean,default:!1},readOnly:{type:Boolean,default:!1},readOnlyFull:{default:null},readOnlyImagePreview:{type:Boolean,default:!0},autoSize:{type:Boolean,default:!1},placeholder:{type:String,default:""},placeholderFull:{type:String,default:""}},data(){return{content:"",editor:null,editorT:null,cTinyMce:null,checkerTimeout:null,isTyping:!1,spinShow:!0,transfer:!1,uploadIng:0,uploadFormat:["jpg","jpeg","webp","png","gif","doc","docx","xls","xlsx","ppt","pptx","txt","esp","pdf","rar","zip","gz","ai","avi","bmp","cdr","eps","mov","mp3","mp4","pr","psd","svg","tif"],actionUrl:$A.apiUrl("system/fileupload"),maxSize:10240,operateImg:null,timer:null}},mounted(){this.content=this.value,this.init()},activated(){this.content=this.value,this.init()},deactivated(){this.destroy()},destroyed(){this.destroy()},computed:{...g(["themeName"]),headers(){return{fd:$A.getSessionStorageString("userWsFd"),token:this.userToken}}},watch:{value(t){t==null&&(t=""),this.isTyping||this.setContent(t)},readOnly(t){this.editor!==null&&(t?this.editor.setMode("readonly"):this.editor.setMode("design"))}},methods:{init(){this.timer&&clearTimeout(this.timer),this.$nextTick(()=>{h.init(this.concatAssciativeArrays(this.option(!1),this.options))})},initTransfer(){this.$nextTick(()=>{h.init(this.concatAssciativeArrays(this.option(!0),this.optionFull))})},destroy(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(t=>{this.editor!==null&&(this.editor.destroy(),this.editor=null),this.editorT!==null&&(this.editorT.destroy(),this.editorT=null),this.spinShow=!0,$A(this.$refs.myTextarea).show()},500)},plugin(t){return t?this.plugins.filter(s=>s!="autoresize"):this.plugins},option(t){let s=u;switch(u){case"zh":s="zh_CN";break;case"zh-CHT":s="zh-TW";break;case"fr":s="fr_FR";break;case"ko":s="ko_KR";break}const e={inline:t?!1:this.inline,selector:(t?"#T_":"#")+this.id,base_url:$A.originUrl("js/tinymce"),language:s,plugins:this.plugin(t),menubar:this.menubar,toolbar:this.toolbar,placeholder:t&&this.placeholderFull?this.placeholderFull:this.placeholder,save_onsavecallback:i=>{this.$emit("editorSave",i)},paste_data_images:!0,menu:{view:{title:"View",items:"code | visualaid visualchars visualblocks | spellchecker | preview fullscreen screenload | showcomments"},insert:{title:"Insert",items:"image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime | uploadImages | uploadFiles"}},codesample_languages:[{text:"HTML/VUE/XML",value:"markup"},{text:"JavaScript",value:"javascript"},{text:"CSS",value:"css"},{text:"PHP",value:"php"},{text:"Ruby",value:"ruby"},{text:"Python",value:"python"},{text:"Java",value:"java"},{text:"C",value:"c"},{text:"C#",value:"csharp"},{text:"C++",value:"cpp"}],height:t?"100%":$A.rightExists(this.height,"%")?this.height:$A.runNum(this.height)||360,resize:!t,convert_urls:!1,toolbar_mode:"sliding",setup:i=>{i.ui.registry.addMenuButton("uploadImages",{text:this.$L("\u56FE\u7247"),tooltip:this.$L("\u4E0A\u4F20/\u6D4F\u89C8 \u56FE\u7247"),fetch:n=>{let o=[{type:"menuitem",text:this.$L("\u4E0A\u4F20\u672C\u5730\u56FE\u7247"),onAction:()=>{this.$refs.myUpload.handleClick()}},{type:"menuitem",text:this.$L("\u6D4F\u89C8\u56FE\u7247\u7A7A\u95F4"),onAction:()=>{this.$refs.myUpload.browsePicture()}}];n(o)}}),i.ui.registry.addNestedMenuItem("uploadImages",{icon:"image",text:this.$L("\u4E0A\u4F20\u56FE\u7247"),getSubmenuItems:()=>[{type:"menuitem",text:this.$L("\u4E0A\u4F20\u672C\u5730\u56FE\u7247"),onAction:()=>{this.$refs.myUpload.handleClick()}},{type:"menuitem",text:this.$L("\u6D4F\u89C8\u56FE\u7247\u7A7A\u95F4"),onAction:()=>{this.$refs.myUpload.browsePicture()}}]}),i.ui.registry.addMenuItem("imagePreview",{icon:"preview",text:this.$L("\u9884\u89C8\u56FE\u7247"),onAction:()=>{this.operateImg=null;const n=i.selection.getNode();n&&n.nodeName==="IMG"&&(this.operateImg=n.getAttribute("src")),this.onImagePreview()},onSetup:n=>{const o=i.selection.getNode();n.setDisabled(!(o&&o.nodeName==="IMG"))}}),i.ui.registry.addButton("uploadFiles",{text:this.$L("\u6587\u4EF6"),tooltip:this.$L("\u4E0A\u4F20\u6587\u4EF6"),onAction:()=>{this.handleBeforeUpload()&&this.$refs.fileUpload.handleClick()}}),i.ui.registry.addMenuItem("uploadFiles",{text:this.$L("\u4E0A\u4F20\u6587\u4EF6"),onAction:()=>{this.handleBeforeUpload()&&this.$refs.fileUpload.handleClick()}}),t?(i.ui.registry.addButton("screenload",{icon:"fullscreen",tooltip:this.$L("\u9000\u51FA\u5168\u5C4F"),onAction:()=>{this.closeFull()}}),i.ui.registry.addMenuItem("screenload",{icon:"fullscreen",text:this.$L("\u9000\u51FA\u5168\u5C4F"),onAction:()=>{this.closeFull()}}),i.on("Init",n=>{this.editorT=i,this.editorT.setContent(this.content),(this.readOnlyFull===null?this.readOnly:this.readOnlyFull)?(this.editorT.setMode("readonly"),this.addClickEvent(n,!0)):this.editorT.setMode("design")})):(i.ui.registry.addButton("screenload",{icon:"fullscreen",tooltip:this.$L("\u5168\u5C4F"),onAction:()=>{this.onFull()}}),i.ui.registry.addMenuItem("screenload",{icon:"fullscreen",text:this.$L("\u5168\u5C4F"),onAction:()=>{this.onFull()}}),i.on("Init",n=>{this.spinShow=!1,this.editor=i,this.editor.setContent(this.content),this.readOnly?(this.editor.setMode("readonly"),this.addClickEvent(n,!1)):this.editor.setMode("design"),this.$emit("on-editor-init",this.editor)}),i.on("KeyUp",n=>{this.editor!==null&&this.submitNewContent()}),i.on("KeyDown",n=>{(n.metaKey||n.ctrlKey)&&n.keyCode===83&&(n.preventDefault(),this.$emit("editorSave",n))}),i.on("Change",n=>{this.editor!==null&&(this.getContent()!==this.value&&this.submitNewContent(),this.$emit("editorChange",n))}),i.on("focus",()=>{this.$emit("on-focus")}),i.on("blur",()=>{this.$emit("on-blur")}))}};return e.inline||(e.content_css=this.themeName==="dark"?"dark":"default"),this.autoSize&&e.plugins.push("autoresize"),this.minHeight>0&&(e.min_height=this.minHeight),e},onFull(){this.content=this.getContent(),this.transfer=!0,this.initTransfer()},closeFull(){this.content=this.getContent(),this.$emit("input",this.content),this.$emit("on-blur"),this.transfer=!1,this.editorT!=null&&(this.editorT.destroy(),this.editorT=null)},transferChange(t){!t&&this.editorT!=null&&(this.content=this.editorT.getContent(),this.$emit("input",this.content),this.editorT.destroy(),this.editorT=null),this.$emit("on-transfer-change",t)},getEditor(){return this.transfer?this.editorT:this.editor},concatAssciativeArrays(t,s){if(s.length===0)return t;if(t.length===0)return s;let e=[];for(let i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);for(let i in s)s.hasOwnProperty(i)&&(e[i]=s[i]);return e},submitNewContent(){this.isTyping=!0,this.checkerTimeout!==null&&clearTimeout(this.checkerTimeout),this.checkerTimeout=setTimeout(()=>{this.isTyping=!1},300),this.$emit("input",this.getContent())},insertContent(t){this.getEditor()!==null?this.getEditor().insertContent(t):this.content+=t},getContent(){return this.getEditor()===null?"":this.getEditor().getContent()},setContent(t){this.getEditor()===null?this.content=t:t!=this.getEditor().getContent()&&this.getEditor().setContent(t)},focus(){return this.getEditor()===null?"":this.getEditor().focus()},insertImage(t){this.insertContent('<img src="'+t+'">')},editorImage(t){for(let s=0;s<t.length;s++){let e=t[s];typeof e=="object"&&typeof e.url=="string"&&this.insertImage(e.url)}},getValueImages(){const t=[],s=/<img.*?(?:>|\/>)/gi,e=new RegExp(`src=(["'])([^'"]*)\\1`),i=new RegExp('original-width="(\\d+)"'),n=new RegExp('original-height="(\\d+)"'),o=(this.getContent()+"").match(s);if(o)for(let r=0;r<o.length;r++){const a=o[r].match(e),l=o[r].match(i),d=o[r].match(n);a&&t.push({src:a[2],width:l?l[1]:-1,height:d?d[1]:-1})}return t},onImagePreview(){const t=this.getValueImages();if(t.length===0){$A.messageWarning("\u6CA1\u6709\u53EF\u9884\u89C8\u7684\u56FE\u7247");return}this.$store.dispatch("previewImage",{index:this.operateImg,list:t})},addClickEvent({target:t},s){!this.readOnlyImagePreview||t.getBody().addEventListener("click",e=>{if(s){if(!(this.readOnlyFull===null?this.readOnly:this.readOnlyFull))return}else if(!this.readOnly)return;e.target.nodeName==="IMG"&&(this.operateImg=e.target.src,this.onImagePreview())})},handleProgress(t,s){s._uploadIng===void 0&&(s._uploadIng=!0,this.uploadIng++)},handleSuccess(t,s){this.uploadIng--,t.ret===1?this.insertContent(`<a href="${t.data.url}" target="_blank">${t.data.name} (${$A.bytesToSize(t.data.size*1024)})</a>`):$A.noticeWarning({title:this.$L("\u4E0A\u4F20\u5931\u8D25"),desc:this.$L("\u6587\u4EF6 "+s.name+" \u4E0A\u4F20\u5931\u8D25\uFF0C"+t.msg)})},handleError(){this.uploadIng--},handleFormatError(t){$A.noticeWarning({title:this.$L("\u6587\u4EF6\u683C\u5F0F\u4E0D\u6B63\u786E"),desc:this.$L("\u6587\u4EF6 "+t.name+" \u683C\u5F0F\u4E0D\u6B63\u786E\uFF0C\u4EC5\u652F\u6301\u4E0A\u4F20\uFF1A"+this.uploadFormat.join(","))})},handleMaxSize(t){$A.noticeWarning({title:this.$L("\u8D85\u51FA\u6587\u4EF6\u5927\u5C0F\u9650\u5236"),desc:this.$L("\u6587\u4EF6 "+t.name+" \u592A\u5927\uFF0C\u4E0D\u80FD\u8D85\u8FC7\uFF1A"+$A.bytesToSize(this.maxSize*1024))})},handleBeforeUpload(){return!0}}},p={};var b=f($,y,v,!1,I,null,null,null);function I(t){for(let s in p)this[s]=p[s]}var at=function(){return b.exports}();export{at as default};
