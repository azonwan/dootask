import{m as c,a as h}from"./vuex.cc7cb26e.js";import{T as u,e as _,n as m}from"./app.f0de01ec.js";import"./@micro-zoe.c2e1472d.js";import"./jquery.48d916fb.js";import"./@babel.f9bcab46.js";import"./dayjs.1b86c66d.js";import"./localforage.fd59c3e0.js";import"./markdown-it.bda97caf.js";import"./mdurl.ce6c1dd8.js";import"./uc.micro.8d343c98.js";import"./entities.48a44fec.js";import"./linkify-it.c5e8196e.js";import"./punycode.js.4b3f125a.js";import"./highlight.js.ab8aeea4.js";import"./markdown-it-link-attributes.e1d5d151.js";import"./@traptitech.897ae552.js";import"./vue.fd9b772e.js";import"./openpgp_hi.15f91b1d.js";import"./axios.6ec123f8.js";import"./mitt.1ea0a2a3.js";import"./vue-router.2d566cd7.js";import"./vue-clipboard2.50be9c5e.js";import"./clipboard.058ef547.js";import"./view-design-hi.92ef2000.js";import"./vuedraggable.9fd6afed.js";import"./sortablejs.d74243d9.js";import"./vue-resize-observer.c3c9ca4e.js";import"./element-sea.7f208f9b.js";import"./deepmerge.cecf392e.js";import"./resize-observer-polyfill.0bdc1850.js";import"./throttle-debounce.7c3948b2.js";import"./babel-helper-vue-jsx-merge-props.5ed215c3.js";import"./normalize-wheel.2a034b9f.js";import"./async-validator.49abba38.js";import"./babel-runtime.4773988a.js";import"./core-js.314b4a1d.js";import"./lodash.18c5398d.js";var p=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"page-dashboard"},[s("PageTitle",{attrs:{title:t.$L("\u4EEA\u8868\u76D8")}}),t.warningMsg?s("Alert",{staticClass:"dashboard-warning",attrs:{type:"warning","show-icon":""}},[s("span",{on:{click:function(o){return t.goForward({name:"manage-setting-license"})}}},[t._v(t._s(t.warningMsg))])]):t._e(),s("div",{staticClass:"dashboard-wrapper",style:t.wrapperStyle},[s("div",{staticClass:"dashboard-hello"},[s("h2",[t._v(t._s(t.dashboardHello))]),s("div",{staticClass:"dashboard-search",class:{"min-search":t.windowPortrait},on:{click:t.openSearch}},[s("Icon",{attrs:{type:"ios-search"}}),s("span",[t._v(t._s(t.$L("\u641C\u7D22"))+" ("+t._s(t.mateName)+"+F)")])],1)]),t.systemConfig.timezoneDifference?s("div",{staticClass:"dashboard-time"},[s("span",[t._v(t._s(t.$L("\u670D\u52A1\u5668\u65F6\u95F4"))+":")]),s("span",[t._v(t._s(t.$A.daytz().format("YYYY-MM-DD HH:mm:ss")))])]):t._e(),s("div",{staticClass:"dashboard-desc"},[s("span",[t._v(t._s(t.$L("\u4EE5\u4E0B\u662F\u4F60\u5F53\u524D\u7684\u4EFB\u52A1\u7EDF\u8BA1\u6570\u636E")))]),s("transition",{attrs:{name:"dashboard-load"}},[t.loadDashboardTasks?s("div",{staticClass:"dashboard-load"},[s("Loading")],1):t._e()])],1),s("ul",{staticClass:"dashboard-block"},[s("li",{on:{click:function(o){return t.scrollTo("today")}}},[s("div",{staticClass:"block-title"},[t._v(t._s(t.getTitle("today")))]),s("div",{staticClass:"block-data"},[s("div",{staticClass:"block-num"},[t._v(t._s(t.dashboardTask.today_count))]),s("i",{staticClass:"taskfont"},[t._v("\uE6F4")])])]),s("li",{on:{click:function(o){return t.scrollTo("overdue")}}},[s("div",{staticClass:"block-title"},[t._v(t._s(t.getTitle("overdue")))]),s("div",{staticClass:"block-data"},[s("div",{staticClass:"block-num"},[t._v(t._s(t.dashboardTask.overdue_count))]),s("i",{staticClass:"taskfont"},[t._v("\uE603")])])]),s("li",{on:{click:function(o){return t.scrollTo("todo")}}},[s("div",{staticClass:"block-title"},[t._v(t._s(t.getTitle("todo")))]),s("div",{staticClass:"block-data"},[s("div",{staticClass:"block-num"},[t._v(t._s(t.dashboardTask.todo_count))]),s("i",{staticClass:"taskfont"},[t._v("\uE6F9")])])])]),s("Scrollbar",{staticClass:"dashboard-list"},[t._l(t.columns,function(o){return o.list.length>0?[s("div",{ref:`type_${o.type}`,refInFor:!0,staticClass:"dashboard-ref"}),s("div",{staticClass:"dashboard-title",class:{"title-close":o.hidden},on:{click:function(e){return t.onDashboardHidden(o.type)}}},[s("span",[t._v(" "+t._s(o.title)+" "),o.hidden?[t._v(" ("+t._s(o.count)+") ")]:t._e()],2),s("i",{staticClass:"taskfont"},[t._v("\uE702")])]),s("ul",{staticClass:"dashboard-ul",class:{"ul-hidden":o.hidden}},t._l(o.list,function(e,n){return s("li",{key:n,class:{complete:e.complete_at},style:e.color?{backgroundColor:e.color}:{},on:{click:function(i){return t.openTask(e)}}},[e.p_name?s("em",{staticClass:"priority-color",style:{backgroundColor:e.p_color}}):t._e(),s("div",{staticClass:"item-select",on:{click:function(i){return i.stopPropagation(),t.openMenu(i,e)}}},[s("i",{staticClass:"taskfont",domProps:{innerHTML:t._s(e.complete_at?"&#xe627;":"&#xe625;")}})]),s("div",{staticClass:"item-title"},[e.flow_item_name?s("span",{class:e.flow_item_status,on:{click:function(i){return i.stopPropagation(),t.openMenu(i,e)}}},[t._v(t._s(e.flow_item_name))]):t._e(),e.sub_top===!0?s("span",[t._v(t._s(t.$L("\u5B50\u4EFB\u52A1")))]):t._e(),e.sub_my&&e.sub_my.length>0?s("span",[t._v("+"+t._s(e.sub_my.length))]):t._e(),t._v(" "+t._s(e.name)+" ")]),e.desc?s("div",{staticClass:"item-icon"},[s("i",{staticClass:"taskfont"},[t._v("\uE71A")])]):t._e(),e.sub_num>0?s("div",{staticClass:"item-icon"},[s("i",{staticClass:"taskfont"},[t._v("\uE71F")]),s("em",[t._v(t._s(e.sub_complete)+"/"+t._s(e.sub_num))])]):t._e(),e.end_at?s("ETooltip",{attrs:{disabled:t.$isEEUiApp||t.windowTouch,content:e.end_at,placement:"right"}},[s("div",{class:["item-icon",e.today?"today":"",e.overdue?"overdue":""]},[s("i",{staticClass:"taskfont"},[t._v("\uE71D")]),s("em",[t._v(t._s(t.expiresFormat(e.end_at)))])])]):t._e()],1)}),0)]:t._e()})],2)],1)],1)},v=[];const r=[],f={components:{TaskMenu:u},data(){return{nowTime:$A.dayjs().unix(),nowInter:null,licenseTimer:null,loadIng:0,dashboard:"today",mateName:/macintosh|mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl",warningMsg:"",hiddenColumns:r}},async beforeRouteEnter(t,a,s){r.push(...await $A.IDBArray("dashboardHiddenColumns")),s()},activated(){this.$store.dispatch("getTaskForDashboard",600),this.loadInterval(!0),this.loadLicense(!0)},deactivated(){this.$store.dispatch("forgetTaskCompleteTemp",!0),this.loadInterval(!1),this.loadLicense(!1)},computed:{...c(["systemConfig","userInfo","userIsAdmin","cacheTasks","taskCompleteTemps","loadDashboardTasks"]),...h(["dashboardTask","assistTask","transforTasks"]),routeName(){return this.$route.name},columns({hiddenColumns:t,dashboardTask:a,assistTask:s}){const o=[];return["today","overdue","todo"].some(e=>{let n=this.transforTasks(a[e]);o.push({type:e,title:this.getTitle(e),hidden:t.includes(e),count:a[`${e}_count`],list:n.sort((i,d)=>$A.sortDay(i.end_at||"2099-12-31 23:59:59",d.end_at||"2099-12-31 23:59:59"))})}),o.push({type:"assist",title:this.getTitle("assist"),hidden:t.includes("assist"),count:s.length,list:s.sort((e,n)=>$A.sortDay(e.end_at||"2099-12-31 23:59:59",n.end_at||"2099-12-31 23:59:59"))}),o},total(){const{dashboardTask:t}=this;return t.today_count+t.overdue_count+t.todo_count},wrapperStyle({warningMsg:t}){return t?{"max-height":"calc(100% - 50px)"}:null},dashboardHello({systemConfig:t,userInfo:a}){let s="\u6B22\u8FCE\u60A8\uFF0C{username}";return t.system_welcome&&(s=t.system_welcome),this.$L(s.replace(/\{username}/g,a.nickname))}},watch:{windowActive(t){this.routeName==="manage-dashboard"&&(this.loadInterval(t),this.loadLicense(t),t&&this.$store.dispatch("getTaskForDashboard",600))}},methods:{getTitle(t){switch(t){case"today":return this.$L("\u4ECA\u65E5\u5230\u671F");case"overdue":return this.$L("\u8D85\u671F\u4EFB\u52A1");case"todo":return this.$L("\u5F85\u5B8C\u6210\u4EFB\u52A1");case"assist":return this.$L("\u534F\u52A9\u7684\u4EFB\u52A1");default:return""}},scrollTo(t){const a=this.$refs[`type_${t}`];if(a){const s=this.hiddenColumns.indexOf(t);s!==-1&&this.hiddenColumns.splice(s,1),this.$nextTick(o=>{$A.scrollToView(a[0],{behavior:"smooth",inline:"end"})})}},onDashboardHidden(t){this.hiddenColumns.indexOf(t)===-1?this.hiddenColumns.push(t):this.hiddenColumns=this.hiddenColumns.filter(s=>s!==t),$A.IDBSave("dashboardHiddenColumns",this.hiddenColumns)},openSearch(){_.emit("openSearch",null)},openTask(t){this.$store.dispatch("openTask",t)},openMenu(t,a){this.$store.state.taskOperation={event:t,task:a}},expiresFormat(t){return $A.countDownFormat(this.nowTime,t)},loadInterval(t){this.nowInter&&(clearInterval(this.nowInter),this.nowInter=null),t!==!1&&(this.nowInter=setInterval(a=>{this.nowTime=$A.dayjs().unix()},1e3))},loadLicense(t){this.licenseTimer&&(clearTimeout(this.licenseTimer),this.licenseTimer=null),!(t===!1||!this.userIsAdmin)&&(this.licenseTimer=setTimeout(a=>{this.$store.dispatch("call",{url:"system/license",data:{type:"error"}}).then(({data:s})=>{this.warningMsg=s.error.length>0?s.error[0]:""}).catch(s=>{this.warningMsg=""})},1500))}}},l={};var b=m(f,p,v,!1,C,null,null,null);function C(t){for(let a in l)this[a]=l[a]}var at=function(){return b.exports}();export{at as default};
