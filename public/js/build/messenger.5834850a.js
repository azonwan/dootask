import{m as u,a as p}from"./vuex.cc7cb26e.js";import{D as g}from"./DialogWrapper.e034bbb9.js";import{l as m}from"./index.c6a6f671.js";import{e as d,n as f}from"./app.bc3ad3e2.js";import"./index.61acb57e.js";import"./vue-virtual-scroll-list-hi.fd363a1b.js";import"./@babel.f9bcab46.js";import"./vue.fd9b772e.js";import"./lodash.18c5398d.js";import"./ImgUpload.d1b548e0.js";import"./tip.719f33f0.js";import"./quill-hi.b7430b13.js";import"./parchment.d5c5924e.js";import"./quill-delta.f1b7ce48.js";import"./fast-diff.f17881f3.js";import"./lodash.clonedeep.e8ef3f14.js";import"./lodash.isequal.d6a986d0.js";import"./eventemitter3.78b735ad.js";import"./lodash-es.df04b444.js";import"./quill-mention-hi.0fc702d1.js";import"./view-design-hi.92ef2000.js";import"./@micro-zoe.c2e1472d.js";import"./jquery.e403903e.js";import"./dayjs.b89f6725.js";import"./localforage.71b7b823.js";import"./markdown-it.bda97caf.js";import"./mdurl.ce6c1dd8.js";import"./uc.micro.8d343c98.js";import"./entities.48a44fec.js";import"./linkify-it.c5e8196e.js";import"./punycode.js.4b3f125a.js";import"./highlight.js.cb28ef06.js";import"./markdown-it-link-attributes.e1d5d151.js";import"./@traptitech.79d08561.js";import"./openpgp_hi.15f91b1d.js";import"./axios.6ec123f8.js";import"./mitt.1ea0a2a3.js";import"./vue-router.2d566cd7.js";import"./vue-clipboard2.50be9c5e.js";import"./clipboard.058ef547.js";import"./vuedraggable.9fd6afed.js";import"./sortablejs.d74243d9.js";import"./vue-resize-observer.c3c9ca4e.js";import"./element-sea.7f208f9b.js";import"./deepmerge.cecf392e.js";import"./resize-observer-polyfill.0bdc1850.js";import"./throttle-debounce.7c3948b2.js";import"./babel-helper-vue-jsx-merge-props.5ed215c3.js";import"./normalize-wheel.2a034b9f.js";import"./async-validator.49abba38.js";import"./babel-runtime.4773988a.js";import"./core-js.314b4a1d.js";var _=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"page-messenger"},[e("PageTitle",{attrs:{title:t.$L(t.tabActive==="dialog"?"\u6D88\u606F":"\u901A\u8BAF\u5F55")}}),e("div",{staticClass:"messenger-wrapper"},[e("div",{staticClass:"messenger-select"},[e("div",{staticClass:"messenger-search"},[e("div",{staticClass:"search-wrapper"},[e("div",{staticClass:"search-pre"},[t.searchLoading?e("Loading"):e("Icon",{attrs:{type:"ios-search"}})],1),e("Form",{staticClass:"search-form",attrs:{action:"javascript:void(0)"},nativeOn:{submit:function(s){return s.preventDefault(),t.$A.eeuiAppKeyboardHide.apply(null,arguments)}}},[t.tabActive==="dialog"?e("Input",{ref:"searchInput",attrs:{type:"search",placeholder:t.$L(t.loadDialogs>0?"\u66F4\u65B0\u4E2D...":"\u641C\u7D22"),clearable:""},on:{"on-keydown":t.onKeydown},model:{value:t.dialogSearchKey,callback:function(s){t.dialogSearchKey=s},expression:"dialogSearchKey"}}):e("Input",{ref:"contactInput",attrs:{type:"search",placeholder:t.$L("\u641C\u7D22"),clearable:""},on:{"on-keydown":t.onKeydown},model:{value:t.contactsKey,callback:function(s){t.contactsKey=s},expression:"contactsKey"}})],1)],1)]),t.tabActive==="dialog"&&!t.dialogSearchKey?e("div",{staticClass:"messenger-nav"},[e("EDropdown",{ref:"navMenu",staticClass:"nav-menu",attrs:{trigger:"click",placement:"bottom-start"},on:{command:t.onActive}},[e("div",{staticClass:"nav-icon"},[e("i",{staticClass:"taskfont"},[t._v("\uE634")])]),e("EDropdownMenu",{staticClass:"messenger-nav-menu",attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.dialogMenus,function(s,a){return e("EDropdownItem",{key:a,attrs:{command:s.type}},[e("div",{staticClass:"nav-item",class:{active:t.dialogActive==s.type}},[e("div",{staticClass:"nav-title"},[t._v(t._s(t.$L(s.name)))]),e("Badge",{staticClass:"nav-num",attrs:{"overflow-count":999,count:t.msgUnread(s.type)}})],1)])}),1)],1),e("div",{ref:"navList",staticClass:"nav-list"},t._l(t.dialogHistorys,function(s,a){return e("div",{key:a,staticClass:"nav-item",class:{active:t.dialogActive==s.type},on:{click:function(o){return t.onActive(s.type)}}},[e("div",{staticClass:"nav-title"},[e("em",[t._v(t._s(t.$L(s.name)))]),e("Badge",{staticClass:"nav-num",attrs:{"overflow-count":999,count:t.msgUnread(s.type)}})],1)])}),0)],1):t._e(),t.$isEEUiApp&&!t.appNotificationPermission?e("div",{staticClass:"messenger-notify-permission",on:{click:t.onOpenAppSetting}},[t._v(" "+t._s(t.$L("\u672A\u5F00\u542F\u901A\u77E5\u6743\u9650"))),e("i",{staticClass:"taskfont"},[t._v("\uE733")])]):t._e(),e("Scrollbar",{ref:"list",staticClass:"messenger-list",attrs:{"hide-bar":this.operateVisible},on:{"on-scroll":t.listScroll},nativeOn:{touchstart:function(s){return t.listTouch.apply(null,arguments)}}},[t.tabActive==="dialog"?e("ul",{ref:"ul",staticClass:"dialog"},[t.dialogList.length>0?t._l(t.dialogList,function(s,a){var o;return e("li",{directives:[{name:"longpress",rawName:"v-longpress",value:t.handleDialogLongpress,expression:"handleDialogLongpress"}],key:a,ref:`dialog_${s.id}`,refInFor:!0,class:t.dialogClass(s),style:{"background-color":s.color},attrs:{"data-id":s.id},on:{click:function(r){return t.openDialog({dialog_id:s.id,dialog_msg_id:s.search_msg_id,search_msg_id:s.search_msg_id})}}},[s.type=="group"?[s.avatar?e("EAvatar",{staticClass:"img-avatar",attrs:{src:s.avatar,size:42}}):s.group_type=="department"?e("i",{staticClass:"taskfont icon-avatar department"},[t._v("\uE75C")]):s.group_type=="project"?e("i",{staticClass:"taskfont icon-avatar project"},[t._v("\uE6F9")]):s.group_type=="task"?e("i",{staticClass:"taskfont icon-avatar task"},[t._v("\uE6F4")]):s.group_type=="okr"?e("i",{staticClass:"taskfont icon-avatar task"},[t._v("\uE6F4")]):e("Icon",{staticClass:"icon-avatar",attrs:{type:"ios-people"}})]:s.dialog_user?e("div",{staticClass:"user-avatar"},[e("UserAvatar",{attrs:{userid:s.dialog_user.userid,size:42}})],1):e("Icon",{staticClass:"icon-avatar",attrs:{type:"md-person"}}),e("div",{staticClass:"dialog-box"},[e("div",{staticClass:"dialog-title"},[s.todo_num?e("div",{staticClass:"todo"},[t._v("["+t._s(t.$L("\u5F85\u529E"))+t._s(t.formatTodoNum(s.todo_num))+"]")]):t._e(),t.$A.getDialogMention(s)>0?e("div",{staticClass:"mention"},[t._v("[@"+t._s(t.$A.getDialogMention(s))+"]")]):t._e(),s.bot?e("div",{staticClass:"taskfont bot"},[t._v("\uE68C")]):t._e(),t._l(t.$A.dialogTags(s),function(r){return r.color!="success"?[e("Tag",{attrs:{color:r.color,fade:!1},on:{"on-click":function(n){return t.openDialog(s.id)}}},[t._v(t._s(t.$L(r.text)))])]:t._e()}),e("span",[t._v(t._s(s.name))]),s.type=="user"&&t.lastMsgReadDone(s.last_msg)&&s.dialog_user.userid!=t.userId?e("Icon",{attrs:{type:t.lastMsgReadDone(s.last_msg)}}):t._e(),s.last_at?e("em",[t._v(t._s(t.$A.timeFormat(s.last_at)))]):t._e()],2),e("div",{staticClass:"dialog-text no-dark-content"},[s.id!=t.dialogId&&t.tagDialogDraft(s.id)?[e("div",{staticClass:"last-draft"},[t._v("["+t._s(t.$L("\u8349\u7A3F"))+"]")]),e("div",{staticClass:"last-text"},[e("span",[t._v(t._s(t.formatDraft((o=t.getDialogDraft(s.id))===null||o===void 0?void 0:o.content)))])])]:[s.type=="group"&&s.last_msg&&s.last_msg.userid?[s.last_msg.userid==t.userId?e("div",{staticClass:"last-self"},[t._v(t._s(t.$L("\u4F60")))]):e("UserAvatar",{attrs:{userid:s.last_msg.userid,"show-name":!0,"show-icon":!1}})]:t._e(),e("div",{staticClass:"last-text"},[t.formatMsgEmojiDesc(s.last_msg)?e("em",[t._v(t._s(t.formatMsgEmojiDesc(s.last_msg)))]):t._e(),e("span",[t._v(t._s(t.$A.getMsgSimpleDesc(s.last_msg)||t.showProfessionDesc(s.dialog_user)))])])],s.silence?e("div",{staticClass:"taskfont last-silence"},[t._v("\uE7D7")]):t._e()],2)]),e("Badge",{staticClass:"dialog-num",attrs:{type:s.silence?"normal":"error","overflow-count":999,count:t.$A.getDialogUnread(s,!0)}}),e("div",{staticClass:"dialog-line"})],2)}):t.dialogSearchLoad===0?e("li",{staticClass:"nothing"},[t._v(" "+t._s(t.$L(t.dialogSearchKey?`\u6CA1\u6709\u4EFB\u4F55\u4E0E"${t.dialogSearchKey}"\u76F8\u5173\u7684\u7ED3\u679C`:"\u6CA1\u6709\u4EFB\u4F55\u4F1A\u8BDD"))+" ")]):t._e()],2):e("ul",{staticClass:"contacts"},[t.contactsFilter.length>0?[t._l(t.contactsList,function(s){return e("li",[e("div",{staticClass:"label"},[t._v(t._s(s.az))]),e("ul",t._l(s.list,function(a,o){return e("li",{directives:[{name:"longpress",rawName:"v-longpress",value:t.handleUserLongpress,expression:"handleUserLongpress"}],key:o,class:t.userClass(a),attrs:{"data-id":a.userid},on:{click:function(r){return t.openContacts(a)}}},[e("div",{staticClass:"avatar"},[e("UserAvatar",{attrs:{userid:a.userid,size:t.contactAvatarSize}})],1),e("div",{staticClass:"nickname"},[e("em",[t._v(t._s(a.nickname))]),a.tags?e("div",{staticClass:"tags"},t._l(a.tags,function(r){return e("span",{style:t.tagField(r,"style")},[t._v(t._s(t.tagField(r,"label")))])}),0):t._e()]),a.loading?e("div",{staticClass:"loading"},[e("Loading")],1):t._e()])}),0)])}),e("li",{staticClass:"loaded"},[t.contactsKey?[t._v(t._s(t.$L("\u641C\u7D22\u5230"+t.contactsFilter.length+"\u4F4D\u8054\u7CFB\u4EBA")))]:[t._v(t._s(t.$L("\u5171"+t.contactsTotal+"\u4F4D\u8054\u7CFB\u4EBA")))]],2)]:t.contactsLoad==0?e("li",{staticClass:"nothing"},[t._v(" "+t._s(t.$L(t.contactsKey?`\u6CA1\u6709\u4EFB\u4F55\u4E0E"${t.contactsKey}"\u76F8\u5173\u7684\u7ED3\u679C`:"\u6CA1\u6709\u4EFB\u4F55\u8054\u7CFB\u4EBA"))+" ")]):t._e()],2),e("div",{directives:[{name:"show",rawName:"v-show",value:t.operateVisible,expression:"operateVisible"}],staticClass:"operate-position",style:t.operateStyles},[e("Dropdown",{attrs:{trigger:"custom",transferClassName:"scrollbar-hidden",placement:t.windowLandscape?"bottom":"top",visible:t.operateVisible,transfer:""},on:{"on-clickoutside":function(s){t.operateVisible=!1}}},[e("div",{style:{userSelect:t.operateVisible?"none":"auto",height:t.operateStyles.height}}),e("DropdownMenu",{staticClass:"messenger-dialog-operation",attrs:{slot:"list"},slot:"list"},[t.operateType==="dialog"?[e("DropdownItem",{nativeOn:{click:function(s){return t.handleDialogClick("top")}}},[e("div",{staticClass:"item"},[t._v(" "+t._s(t.$L(t.operateItem.top_at?"\u53D6\u6D88\u7F6E\u9876":"\u7F6E\u9876"))+" "),e("i",{staticClass:"taskfont",domProps:{innerHTML:t._s(t.operateItem.top_at?"&#xe7e3;":"&#xe7e6;")}})])]),e("DropdownItem",{nativeOn:{click:function(s){return t.handleDialogClick("read")}}},[e("div",{staticClass:"item"},[t._v(" "+t._s(t.$L(t.$A.getDialogUnread(t.operateItem,!0)>0?"\u6807\u8BB0\u5DF2\u8BFB":"\u6807\u8BB0\u672A\u8BFB"))+" "),e("i",{staticClass:"taskfont",domProps:{innerHTML:t._s(t.$A.getDialogUnread(t.operateItem,!0)>0?"&#xe7e8;":"&#xe7e9;")}})])]),e("DropdownItem",{attrs:{disabled:t.silenceDisabled(t.operateItem)},nativeOn:{click:function(s){return t.handleDialogClick("silence")}}},[e("div",{staticClass:"item"},[t._v(" "+t._s(t.$L(t.operateItem.silence?"\u5141\u8BB8\u6D88\u606F\u901A\u77E5":"\u6D88\u606F\u514D\u6253\u6270"))+" "),e("i",{staticClass:"taskfont",domProps:{innerHTML:t._s(t.operateItem.silence?"&#xe7eb;":"&#xe7d7;")}})])]),e("DropdownItem",{attrs:{disabled:!!t.operateItem.top_at},nativeOn:{click:function(s){return t.handleDialogClick("hide")}}},[e("div",{staticClass:"item"},[t._v(" "+t._s(t.$L("\u4E0D\u663E\u793A\u8BE5\u4F1A\u8BDD"))+" "),e("i",{staticClass:"taskfont"},[t._v("\uE881")])])]),t._l(t.taskColorList,function(s,a){return a<6?e("DropdownItem",{key:"c_"+a,attrs:{divided:a==0},nativeOn:{click:function(o){return t.handleDialogClick("color",s.color)}}},[e("div",{staticClass:"item"},[t._v(" "+t._s(t.$L(s.name))+" "),e("i",{staticClass:"taskfont color",style:{color:s.primary||"#ddd"},domProps:{innerHTML:t._s(s.color==(t.operateItem.color||"")?"&#xe61d;":"&#xe61c;")}})])]):t._e()})]:[e("DropdownItem",{nativeOn:{click:function(s){return t.handleUserClick("msg")}}},[e("div",{staticClass:"item"},[t._v(" "+t._s(t.$L("\u53D1\u9001\u6D88\u606F"))+" "),e("i",{staticClass:"taskfont"},[t._v("\uE6EB")])])]),e("DropdownItem",{nativeOn:{click:function(s){return t.handleUserClick("meet")}}},[e("div",{staticClass:"item"},[t._v(" "+t._s(t.$L("\u53D1\u8D77\u4F1A\u8BAE"))+" "),e("i",{staticClass:"taskfont"},[t._v("\uE794")])])]),e("DropdownItem",{nativeOn:{click:function(s){return t.handleUserClick("group")}}},[e("div",{staticClass:"item"},[t._v(" "+t._s(t.$L("\u521B\u5EFA\u7FA4\u7EC4"))+" "),e("i",{staticClass:"taskfont"},[t._v("\uE63F")])])]),e("DropdownItem",{nativeOn:{click:function(s){return t.handleUserClick("avatar")}}},[e("div",{staticClass:"item"},[t._v(" "+t._s(t.$L("\u67E5\u770B\u5934\u50CF"))+" "),e("i",{staticClass:"taskfont"},[t._v("\uE7BC")])])])]],2)],1)],1)]),e("div",{staticClass:"messenger-menu"},[e("div",{staticClass:"menu-icon"},[e("Icon",{class:{active:t.tabActive==="dialog"},attrs:{type:"ios-chatbubbles"},on:{click:function(s){return t.onActive(null)}}}),e("Badge",{staticClass:"menu-num",attrs:{"overflow-count":999,count:t.msgUnread("all")}})],1),e("div",{staticClass:"menu-icon"},[e("Icon",{class:{active:t.tabActive==="contacts"},attrs:{type:"md-person"},on:{click:function(s){t.tabActive="contacts"}}})],1)])],1),t.activeNum>0&&t.routeName==="manage-messenger"?e("div",{staticClass:"messenger-msg"},[e("div",{staticClass:"msg-dialog-bg"},[e("div",{staticClass:"msg-dialog-bg-icon"},[e("Icon",{attrs:{type:"ios-chatbubbles"}})],1),e("div",{staticClass:"msg-dialog-bg-text"},[t._v(t._s(t.$L("\u9009\u62E9\u4E00\u4E2A\u4F1A\u8BDD\u5F00\u59CB\u804A\u5929")))])]),t.windowLandscape&&t.dialogId>0?e("DialogWrapper",{attrs:{dialogId:t.dialogId,"auto-focus":t.$A.isDesktop(),location:"messenger"},on:{"on-active":t.scrollIntoActive}}):t._e()],1):t._e()])],1)},v=[];const c={menus:[{type:"",name:"\u5168\u90E8"},{type:"project",name:"\u9879\u76EE"},{type:"task",name:"\u4EFB\u52A1"},{type:"user",name:"\u5355\u804A"},{type:"group",name:"\u7FA4\u804A"},{type:"bot",name:"\u673A\u5668\u4EBA"},{type:"mark",name:"\u6807\u6CE8"},{type:"@",name:"@\u6211"}],historys:[]},$={components:{DialogWrapper:g},directives:{longpress:m},data(){return{firstLoad:!0,activeNum:0,tabActive:"dialog",dialogSearchLoad:0,dialogSearchKey:"",dialogSearchList:[],dialogActive:"",dialogMenus:c.menus,dialogHistorys:c.historys,contactsKey:"",contactsLoad:0,contactsData:null,contactsTotal:0,contactsCurrentPage:1,contactsHasMorePages:!1,contactsLastTime:0,operateItem:{},operateStyles:{},operateVisible:!1,operateType:"dialog"}},async beforeRouteEnter(t,i,e){c.historys=await $A.IDBArray("dialogMenuHistorys"),c.historys.length===0&&(c.historys=c.menus.map(s=>Object.assign(s,{time:0}))),e()},mounted(){const t=$A.runNum(this.$route.query.dialog_id);t>0&&this.openDialog(t),d.on("clickAgainDialog",this.shakeUnread)},beforeDestroy(){d.off("clickAgainDialog",this.shakeUnread),document.removeEventListener("keydown",this.shortcutEvent)},activated(){this.updateDialogs(this.firstLoad?0:1e3),this.scrollToNav(),this.firstLoad=!1,this.$nextTick(t=>this.activeNum++),$A.isEEUiApp&&$A.eeuiAppSendMessage({action:"getNotificationPermission"})},deactivated(){this.updateDialogs(-1),this.$nextTick(t=>this.activeNum--)},computed:{...u(["systemConfig","cacheDialogs","loadDialogs","dialogId","dialogMsgId","dialogMsgs","messengerSearchKey","appNotificationPermission","taskColorList"]),...p(["getDialogDraft","tagDialogDraft"]),routeName(){return this.$route.name},contactAvatarSize(){return this.windowPortrait?36:30},dialogList(){const{dialogActive:t,dialogSearchKey:i,dialogSearchList:e}=this;if(e.length>0)return e.sort((a,o)=>(a.is_search===!0?1:0)-(o.is_search===!0?1:0));if(t==""&&i=="")return this.cacheDialogs.filter(a=>this.filterDialog(a)).sort(this.dialogSort);if(t=="mark"&&!i){const a=[];return this.dialogMsgs.filter(o=>o.tag).forEach(o=>{let r=$A.cloneJSON(this.cacheDialogs).find(n=>n.id==o.dialog_id);r&&(r.last_msg=o,r.search_msg_id=o.id,a.push(r))}),a}return this.cacheDialogs.filter(a=>{if(!this.filterDialog(a))return!1;if(i){const{name:o,pinyin:r,last_msg:n}=a;let l=`${o} ${r}`;if(n)switch(n.type){case"text":l+=` ${n.msg.text.replace(/<[^>]+>/g,"")}`;break;case"meeting":case"file":l+=` ${n.msg.name}`;break;case"preview":l+=` ${n.msg.preview}`;break}if(!$A.strExists(l,i))return!1}else if(t)switch(t){case"project":case"task":if(t!=a.group_type)return!1;break;case"user":if(t!=a.type||a.bot)return!1;break;case"group":if(t!=a.type||["project","task"].includes(a.group_type))return!1;break;case"bot":if(!a.bot)return!1;break;case"@":if(!$A.getDialogMention(a))return!1;break;default:return!1}return!0}).sort(this.dialogSort)},contactsFilter(){const{contactsData:t,contactsKey:i}=this;return t===null?[]:i?t.filter(e=>$A.strExists(`${e.email} ${e.nickname} ${e.profession} ${e.pinyin}`,i)):t},contactsList(){const{contactsKey:t}=this,i=[];return this.contactsFilter.some(e=>{const s=$A.cloneJSON(e);t&&$A.strExists(s.profession,t)&&s.tags.push(s.profession);let a=s.az?s.az.toUpperCase():"#",o=i.find(r=>r.az==a);o?o.list.findIndex(({userid:r})=>r==s.userid)===-1&&o.list.push(s):i.push({az:a,list:[s]})}),i},msgUnread(){return function(t){let i=0;return this.cacheDialogs.some(e=>{switch(t){case"project":case"task":if(t!=e.group_type)return!1;break;case"user":if(t!=e.type||e.bot)return!1;break;case"group":if(t!=e.type||["project","task"].includes(e.group_type))return!1;break;case"bot":if(!e.bot)return!1;break;case"mark":return!1;case"@":return!1}i+=$A.getDialogNum(e)}),i}},searchLoading({tabActive:t,loadDialogs:i,dialogSearchLoad:e,contactsLoad:s}){return t==="dialog"?i>0||e>0:s>0}},watch:{$route:{handler({params:t}){if(["dialog","contacts"].includes(t.dialogAction)&&(this.tabActive=t.dialogAction),t.dialog_id){this.tabActive="dialog";const i=$A.runNum(t.dialog_id);i>0&&this.openDialog(i)}},immediate:!0},messengerSearchKey:{handler(t){this.$nextTick(i=>{this.dialogSearchKey=t.dialog,this.contactsKey=t.contacts})},deep:!0},dialogSearchKey(t){if(this.$store.state.messengerSearchKey.dialog=t,$A.loadVConsole(t)){this.dialogSearchKey="";return}this.dialogSearchList=[],t!=""&&(this.__search_timer&&clearTimeout(this.__search_timer),this.__search_timer=setTimeout(this.searchDialog,600),this.dialogSearchLoad++,setTimeout(i=>this.dialogSearchLoad--,600))},contactsKey(t){this.$store.state.messengerSearchKey.contacts=t,t!=""&&(this.contactsLoad++,setTimeout(()=>{this.contactsKey==t&&this.getContactsList(1),this.contactsLoad--},600))},windowActive(t){this.updateDialogs(t?1e3:-1)},tabActive:{handler(t){t=="contacts"?($A.dayjs().unix()-this.contactsLastTime>24*3600&&(this.contactsData=null),this.contactsData===null?this.getContactsList(1):this.updateContactsList(1e3)):(this.updateDialogs(1e3),this.scrollToNav())},immediate:!0},dialogId:{handler(t){t>0&&this.scrollIntoActive()},immediate:!0},dialogActive(t){this.dialogSearchList=[],t=="mark"&&!this.dialogSearchKey&&this.searchTagDialog(),this.dialogHistorys.forEach(i=>{i.type==""?i.time=$A.dayjs().unix()+1:i.type==t&&(i.time=$A.dayjs().unix())}),$A.IDBSave("dialogMenuHistorys",$A.cloneJSON(this.dialogHistorys).sort((i,e)=>e.time-i.time))}},methods:{listTouch(){var t;(t=this.$refs.navMenu)!=null&&t.visible&&this.$refs.navMenu.hide()},listScroll(){this.scrollE()<10&&this.getContactsNextPage(),this.operateVisible=!1},scrollE(){return this.$refs.list?this.$refs.list.scrollInfo().scrollE:0},onKeydown(t){var i,e;t.key==="Escape"&&((i=this.$refs.searchInput)==null||i.handleClear(),(e=this.$refs.contactInput)==null||e.handleClear())},onActive(t){if(t===null){if(this.tabActive!=="dialog"){this.tabActive="dialog";return}t=this.dialogActive}this.dialogActive==t?this.shakeUnread():this.dialogActive=t,this.scrollToNav()},scrollToNav(){this.tabActive=="dialog"&&this.$nextTick(t=>{var i;$A.scrollToView((i=this.$refs.navList)==null?void 0:i.querySelector(".active"),{behavior:"auto",block:"nearest",inline:"nearest"})})},shakeUnread(){var i;let t=this.dialogList.findIndex(e=>$A.getDialogNum(e)>0);if(t===-1&&(t=this.dialogList.findIndex(e=>e.todo_num>0)),t===-1&&(t=this.dialogList.findIndex(e=>$A.getDialogUnread(e,!0)>0)),t>-1){const e=this.$refs[`dialog_${(i=this.dialogList[t])==null?void 0:i.id}`];if(e&&e[0]){if(e[0].classList.contains("common-shake"))return;$A.scrollIntoAndShake(e[0])}}},dialogClass(t){return this.dialogSearchKey?null:{top:t.top_at,active:t.id==this.dialogId&&(t.search_msg_id==this.dialogMsgId||!this.dialogMsgId),operate:this.operateVisible&&this.operateType==="dialog"&&t.id==this.operateItem.id,completed:$A.dialogCompleted(t)}},dialogSort(t,i){if(t.top_at||i.top_at)return $A.sortDay(i.top_at,t.top_at);if(t.todo_num>0||i.todo_num>0)return $A.sortFloat(i.todo_num,t.todo_num);const e=[this.tagDialogDraft(t.id)?1:0,this.tagDialogDraft(i.id)?1:0];return e[0]||e[1]?$A.sortFloat(e[1],e[0]):$A.sortDay(i.last_at,t.last_at)},userClass(t){return{operate:this.operateVisible&&this.operateType==="contacts"&&t.userid==this.operateItem.userid}},openDialog(t){this.operateVisible||($A.isJson(t)&&$A.leftExists(t.dialog_id,"u:")?this.$store.dispatch("openDialogUserid",$A.leftDelete(t.dialog_id,"u:")).catch(({msg:i})=>{$A.modalError(i)}):this.$store.dispatch("openDialog",t))},openContacts(t){t.loading||(this.$set(t,"loading",!0),this.$store.dispatch("openDialogUserid",t.userid).then(i=>{this.windowLandscape&&(this.tabActive="dialog")}).catch(({msg:i})=>{$A.modalError(i)}).finally(i=>{this.$set(t,"loading",!1)}))},tagField(t,i){switch($A.isJson(t)||(t={label:t}),i){case"style":return t.style||null;case"label":return t.label}return null},filterDialog(t){if(t.id>0&&t.id==this.dialogId||t.top_at||t.todo_num>0||$A.getDialogNum(t)>0)return!0;if(t.name===void 0||t.dialog_delete===1||t.hide||!t.last_at)return!1;if(t.type=="group"){const i=$A.dayjs().unix();if(["project","task"].includes(t.group_type)&&$A.isJson(t.group_info)){if(t.group_type=="task"&&t.group_info.complete_at){let e=Math.max($A.dayjs(t.last_at).unix(),$A.dayjs(t.group_info.complete_at).unix());if(5*86400+e<i)return!1}if(t.group_info.deleted_at){let e=Math.max($A.dayjs(t.last_at).unix(),$A.dayjs(t.group_info.deleted_at).unix());if(2*86400+e<i)return!1}if(t.group_info.archived_at){let e=Math.max($A.dayjs(t.last_at).unix(),$A.dayjs(t.group_info.archived_at).unix());if(3*86400+e<i)return!1}}}else if(t.type=="user"&&this.systemConfig.server_closeai==="close"&&/^ai-(.*?)@bot\.system/.test(t.email))return!1;return!0},searchDialog(){const t=this.dialogSearchKey;t!=""&&(this.dialogSearchLoad++,this.$store.dispatch("call",{url:"dialog/search",data:{key:t}}).then(({data:i})=>{if(t!==this.dialogSearchKey)return;const e=$A.cloneJSON(this.dialogList),s=[],a=[];e.forEach(o=>{o.last_msg&&!s.includes(o.last_msg.id)&&s.push(o.last_msg.id),o.dialog_user&&!a.includes(o.dialog_user.userid)&&a.push(o.dialog_user.userid)}),i.some(o=>{$A.leftExists(o.id,"u:")?a.includes(o.dialog_user.userid)||e.push(Object.assign(o,{is_search:!0})):(!o.last_msg||!s.includes(o.last_msg.id))&&e.push(Object.assign(o,{is_search:!0}))}),this.dialogSearchList=e}).finally(i=>{this.dialogSearchLoad--}))},searchTagDialog(){this.dialogSearchLoad++,this.$store.dispatch("call",{url:"dialog/search/tag"}).then(({data:t})=>{const i=[],e=[];this.dialogList.forEach(s=>{e.push(s),i.push(s.search_msg_id)}),t.some(s=>{(!s.last_msg||!i.includes(s.search_msg_id))&&e.push(Object.assign(s,{is_search:!0}))}),this.dialogSearchList=e}).finally(t=>{this.dialogSearchLoad--})},getContactsList(t){this.contactsLoad++;const i=this.contactsKey;this.$store.dispatch("call",{url:"users/search",data:{keys:{key:i},sorts:{az:"asc"},page:t,pagesize:50}}).then(({data:e})=>{i==""&&(this.contactsTotal=e.total),this.contactsData===null&&(this.contactsData=[]),e.data.some(s=>{this.contactsData.findIndex(a=>a.userid==s.userid)===-1&&this.contactsData.push(s)}),this.contactsCurrentPage=e.current_page,this.contactsHasMorePages=e.current_page<e.last_page,this.$nextTick(this.getContactsNextPage)}).catch(()=>{i==""&&(this.contactsTotal=0),this.contactsHasMorePages=!1}).finally(e=>{this.contactsLoad--,this.contactsLastTime=$A.dayjs().unix()})},getContactsNextPage(){this.scrollE()<10&&this.tabActive==="contacts"&&this.contactsLoad===0&&this.contactsHasMorePages&&this.getContactsList(this.contactsCurrentPage+1)},updateContactsList(t){this.__updateContactsList&&clearTimeout(this.__updateContactsList),t>-1&&(this.__updateContactsList=setTimeout(i=>{this.tabActive==="contacts"&&this.$store.dispatch("call",{url:"users/search",data:{updated_time:this.contactsLastTime,take:100}}).then(({data:e})=>{e.some(s=>{const a=this.contactsData.findIndex(o=>o.userid==s.userid);a>-1?this.contactsData.splice(a,1,s):this.contactsData.push(s)})}).finally(e=>{this.contactsLastTime=$A.dayjs().unix()})},t))},formatDraft(t){return(t==null?void 0:t.replace(/<img[^>]*>/gi,`[${$A.L("\u56FE\u7247")}]`).replace(/<[^>]*>/g,"").replace(/&nbsp;/g," "))||null},formatTodoNum(t){return t>999?"999+":t>1?t:""},formatMsgEmojiDesc(t){return $A.isJson(t)&&$A.arrayLength(t.emoji)>0?t.emoji[0].symbol:null},showProfessionDesc(t){return t&&t.profession?`[${t.profession}]`:""},lastMsgReadDone(t){if($A.isJson(t)){const{userid:i,percentage:e}=t;if(i===this.userId)return e===100?"md-done-all":"md-checkmark"}return null},scrollIntoActive(){this.windowPortrait||this.windowScrollY>0||this.$nextTick(()=>{if(!this.$refs.list)return;const t=this.$refs.list.querySelector(".active");if(t){$A.scrollIntoViewIfNeeded(t);return}this.cacheDialogs.find(({id:e})=>e==this.dialogId)&&this.dialogActive&&(this.dialogActive="",this.$nextTick(()=>{const e=this.$refs.list.querySelector(".active");e&&$A.scrollIntoViewIfNeeded(e)}))})},handleDialogLongpress(t,i){if(this.dialogSearchKey)return;const e=$A.getAttr(i,"data-id"),s=this.dialogList.find(a=>a.id==e);!s||this.handleLongpress(s,i.getBoundingClientRect(),t.clientX)},handleUserLongpress(t,i){if(this.contactsKey)return;const e=$A.getAttr(i,"data-id"),s=this.contactsFilter.find(a=>a.userid==e);!s||this.handleLongpress(s,i.getBoundingClientRect(),t.clientX)},handleLongpress(t,i,e){this.operateType=this.tabActive,this.operateVisible=!1,this.operateItem=$A.isJson(t)?t:{},this.$nextTick(()=>{this.operateStyles={left:`${e}px`,top:`${i.top+this.windowScrollY}px`,height:i.height+"px"},this.operateVisible=!0})},handleDialogClick(t,i=void 0){switch(t){case"top":this.$store.dispatch("call",{url:"dialog/top",data:{dialog_id:this.operateItem.id}}).then(({data:e})=>{this.$store.dispatch("saveDialog",e),this.$nextTick(this.scrollIntoActive)}).catch(({msg:e})=>{$A.modalError(e)});break;case"read":this.$store.dispatch("showSpinner",600),this.$store.dispatch("dialogMsgMark",{type:$A.getDialogUnread(this.operateItem,!0)>0?"read":"unread",dialog_id:this.operateItem.id}).catch(({msg:e})=>{$A.modalError(e)}).finally(e=>{this.$store.dispatch("hiddenSpinner")});break;case"silence":if(this.silenceDisabled(this.operateItem))return;this.$store.dispatch("call",{url:"dialog/msg/silence",data:{dialog_id:this.operateItem.id,type:this.operateItem.silence?"cancel":"set"}}).then(({data:e})=>{this.$store.dispatch("saveDialog",e)}).catch(({msg:e})=>{$A.modalError(e)});break;case"hide":this.$store.dispatch("call",{url:"dialog/hide",data:{dialog_id:this.operateItem.id}}).then(({data:e})=>{this.dialogId==this.operateItem.id&&this.$store.dispatch("openDialog",0),this.$store.dispatch("saveDialog",e)}).catch(({msg:e})=>{$A.modalError(e)});break;case"color":this.$store.dispatch("call",{url:"dialog/msg/color",data:{dialog_id:this.operateItem.id,color:i}}).then(({data:e})=>{this.$store.dispatch("saveDialog",e)}).catch(({msg:e})=>{$A.modalError(e)});break}},handleUserClick(t){switch(t){case"msg":this.openContacts(this.operateItem);break;case"meet":case"group":const i=[this.userId];this.operateItem.userid&&this.userId!=this.operateItem.userid&&i.push(this.operateItem.userid),t==="meet"?d.emit("addMeeting",{type:"create",userids:i}):d.emit("createGroup",i);break;case"avatar":this.$store.dispatch("previewImage",this.operateItem.userimg);break}},updateDialogs(t){this.__updateDialogs&&clearTimeout(this.__updateDialogs),t>-1&&(this.__updateDialogs=setTimeout(i=>{this.tabActive==="dialog"&&this.routeName==="manage-messenger"&&this.$store.dispatch("getDialogAuto").catch(()=>{})},t))},onOpenAppSetting(){$A.eeuiAppSendMessage({action:"gotoSetting"})},silenceDisabled(t){const{type:i,group_type:e}=t;return i==="group"&&e!=="user"}}},h={};var y=f($,_,v,!1,A,null,null,null);function A(t){for(let i in h)this[i]=h[i]}var yt=function(){return y.exports}();export{yt as default};
