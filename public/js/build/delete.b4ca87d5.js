import{m as s}from"./vuex.cc7cb26e.js";import{n as a}from"./app.1bbf9eba.js";import"./@micro-zoe.c2e1472d.js";import"./jquery.30af18c5.js";import"./@babel.49d8906a.js";import"./localforage.06920f07.js";import"./markdown-it.f48c10fc.js";import"./entities.797c3e49.js";import"./uc.micro.39573202.js";import"./mdurl.2f66c031.js";import"./linkify-it.3ecfda1e.js";import"./punycode.c1b51344.js";import"./highlight.js.24fdca15.js";import"./markdown-it-link-attributes.e1d5d151.js";import"./@traptitech.b5c819e2.js";import"./vue.c448ed56.js";import"./openpgp_hi.15f91b1d.js";import"./axios.6ec123f8.js";import"./le5le-store.b40f9152.js";import"./vue-router.2d566cd7.js";import"./vue-clipboard2.6e355525.js";import"./clipboard.7eddb2ef.js";import"./view-design-hi.1da2501e.js";import"./vuedraggable.dbf1607a.js";import"./sortablejs.20b8ddfe.js";import"./vue-resize-observer.452c7636.js";import"./element-sea.e89b014c.js";import"./deepmerge.cecf392e.js";import"./resize-observer-polyfill.9f685ce8.js";import"./throttle-debounce.7c3948b2.js";import"./babel-helper-vue-jsx-merge-props.5ed215c3.js";import"./normalize-wheel.2a034b9f.js";import"./async-validator.5f40db32.js";import"./babel-runtime.4773988a.js";import"./core-js.314b4a1d.js";var n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"setting-item submit"},[t.configLoad>0?e("Loading"):e("Form",{ref:"formDatum",attrs:{model:t.formDatum,rules:t.ruleDatum,labelPosition:t.formLabelPosition,labelWidth:t.formLabelWidth},nativeOn:{submit:function(i){i.preventDefault()}}},[e("FormItem",{attrs:{label:t.$L("\u5E10\u53F7"),prop:"email"}},[t.isRegVerify==1?e("Input",{class:t.count>0?"setting-send-input":"setting-input",attrs:{search:"","enter-button":t.$L(t.sendBtnText),placeholder:t.$L("\u8BF7\u8F93\u5165\u90AE\u7BB1")},on:{"on-search":t.sendEmailCode},model:{value:t.formDatum.email,callback:function(i){t.$set(t.formDatum,"email",i)},expression:"formDatum.email"}}):e("Input",{staticClass:"setting-input",attrs:{placeholder:t.$L("\u8BF7\u8F93\u5165\u90AE\u7BB1\u5E10\u53F7")},model:{value:t.formDatum.email,callback:function(i){t.$set(t.formDatum,"email",i)},expression:"formDatum.email"}})],1),t.isRegVerify==1?e("FormItem",{attrs:{label:t.$L("\u90AE\u7BB1\u9A8C\u8BC1\u7801"),prop:"code"}},[e("Input",{attrs:{placeholder:t.$L("\u8BF7\u8F93\u5165\u90AE\u7BB1\u9A8C\u8BC1\u7801")},model:{value:t.formDatum.code,callback:function(i){t.$set(t.formDatum,"code",i)},expression:"formDatum.code"}})],1):e("FormItem",{attrs:{label:t.$L("\u767B\u5F55\u5BC6\u7801"),prop:"code"}},[e("Input",{attrs:{type:"password",placeholder:t.$L("\u8BF7\u8F93\u5165\u767B\u5F55\u5BC6\u7801")},model:{value:t.formDatum.password,callback:function(i){t.$set(t.formDatum,"password",i)},expression:"formDatum.password"}})],1),e("FormItem",{attrs:{label:t.$L("\u5220\u9664\u539F\u56E0")}},[e("Input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:8},placeholder:t.$L("\u8BF7\u8F93\u5165\u5220\u9664\u539F\u56E0")},model:{value:t.formDatum.reason,callback:function(i){t.$set(t.formDatum,"reason",i)},expression:"formDatum.reason"}})],1)],1),e("div",{staticClass:"setting-footer"},[e("Button",{attrs:{loading:t.loadIng>0,type:"primary"},on:{click:function(i){return t.submitForm("warning")}}},[t._v(t._s(t.$L("\u63D0\u4EA4")))]),e("Button",{staticStyle:{"margin-left":"8px"},attrs:{loading:t.loadIng>0},on:{click:t.resetForm}},[t._v(t._s(t.$L("\u91CD\u7F6E")))])],1),e("Modal",{staticClass:"page-setting-delete-box",attrs:{title:t.$L(`\u5220\u9664${t.appTitle}\u5E10\u53F7`)},model:{value:t.warningShow,callback:function(i){t.warningShow=i},expression:"warningShow"}},[e("div",{staticClass:"big-text"},[t._v(t._s(t.$L("\u5E10\u53F7\u5220\u9664\u540E\uFF0C\u8BE5\u5E10\u53F7\u5C06\u65E0\u6CD5\u6B63\u5E38\u767B\u5F55\u4E14\u65E0\u6CD5\u6062\u590D\uFF0C\u5E10\u53F7\u4E0B\u7684\u6240\u6709\u6570\u636E\u4E5F\u5C06\u88AB\u5220\u9664\u3002")))]),e("div",{staticClass:"small-text"},[e("div",[t._v(t._s(t.$L("\u5220\u9664\u524D\uFF0C\u8BF7\u786E\u8BA4\u4EE5\u4E0B\u4E8B\u9879\uFF1A")))]),e("div",[t._v(t._s(t.$L("1\u3001\u60A8\u5C06\u65E0\u6CD5\u67E5\u770B\u8BE5\u5E10\u53F7\u5185\u7684\u4EFB\u4F55\u4FE1\u606F\uFF0C\u5305\u62EC\u5E10\u53F7\u4FE1\u606F\u3001\u6587\u4EF6\u8BB0\u5F55\u3001\u804A\u5929\u8BB0\u5F55\u3001\u9879\u76EE\u4FE1\u606F\u3001\u56E2\u961F\u6210\u5458\u4FE1\u606F\u7B49\u3002")))]),e("div",[t._v(t._s(t.$L("2\u3001\u82E5\u4F60\u662F\u56E2\u961F\u7684\u6240\u6709\u8005\uFF0C\u8BF7\u5728\u5220\u9664\u60A8\u7684\u5E10\u53F7\u524D\u8F6C\u79FB\u6240\u6709\u6743\u3002\u4F8B\u5982\u8BE5\u5E10\u53F7\u6240\u521B\u5EFA\u7684\u9879\u76EE\uFF08\u53EF\u5C06\u9879\u76EE\u79FB\u4EA4\u4ED6\u4EBA\u6216\u5220\u9664\u9879\u76EE\uFF09\u4EE5\u53CA\u6587\u4EF6\u5939\u3002")))]),e("div",[t._v(t._s(t.$L("3\u3001\u60A8\u5C06\u9000\u51FA\u6240\u6709\u7FA4\u804A\uFF0C\u65E0\u6CD5\u67E5\u5230\u8FC7\u5F80\u6D88\u606F\u548C\u4EBA\u5458\u3002")))]),e("div",[t._v(t._s(t.$L("4\u3001\u8BF7\u4FDD\u8BC1\u5E10\u53F7\u672A\u88AB\u6682\u505C\u4F7F\u7528\u3002")))])]),e("div",{staticClass:"button-box",attrs:{slot:"footer"},slot:"footer"},[e("Button",{attrs:{type:"primary",loading:t.loadIng>0},on:{click:function(i){return t.submitForm("confirm")}}},[t._v(t._s(t.$L("\u5DF2\u6E05\u695A\u98CE\u9669\uFF0C\u786E\u5B9A\u5220\u9664"))+" ")])],1)])],1)},m=[];const l={data(){return{loadIng:0,configLoad:0,formDatum:{email:"",code:"",reason:"",password:""},ruleDatum:{email:[{validator:(t,r,e)=>{r.trim()===""?e(new Error(this.$L("\u8BF7\u8F93\u5165\u90AE\u7BB1\u5E10\u53F7\uFF01"))):$A.isEmail(r.trim())?e():e(new Error(this.$L("\u8BF7\u8F93\u5165\u6B63\u786E\u90AE\u7BB1\u5E10\u53F7\uFF01")))},required:!0,trigger:"change"}],code:[{validator:(t,r,e)=>{r.trim()===""&&this.isRegVerify==1?e(new Error(this.$L("\u8BF7\u8F93\u5165\u90AE\u7BB1\u9A8C\u8BC1\u7801"))):e()},required:!0,trigger:"change"}],password:[{validator:(t,r,e)=>{r.trim()===""&&this.isRegVerify!=1?e(new Error(this.$L("\u8BF7\u8F93\u5165\u767B\u5F55\u5BC6\u7801"))):e()},required:!0,trigger:"change"}]},count:0,isSendButtonShow:!0,codeShow:!1,isRegVerify:0,warningShow:!1,sendBtnText:this.$L("\u53D1\u9001\u9A8C\u8BC1\u7801")}},mounted(){this.formDatum.email=this.userInfo.email,this.getRegVerify()},computed:{...s(["userInfo","formLabelPosition","formLabelWidth"]),appTitle(){return window.systemInfo.title||"DooTask"}},methods:{sendEmailCode(){this.count>0||this.$store.dispatch("call",{url:"users/email/send",data:{type:3,email:this.formDatum.email},spinner:!0}).then(t=>{this.isSendButtonShow=!1,this.count=120,this.sendBtnText=this.count+" \u79D2";let r=setInterval(()=>{this.count--,this.sendBtnText=this.count+" \u79D2",this.count<=0&&(this.sendBtnText=this.$L("\u53D1\u9001\u9A8C\u8BC1\u7801"),clearInterval(r))},1e3)}).catch(({msg:t})=>{$A.messageError(t)})},submitForm(t){this.$refs.formDatum.validate(r=>{r&&(this.loadIng++,this.formDatum.type=t,this.$store.dispatch("call",{url:"users/delete/account",data:this.formDatum}).then(({data:e})=>{t==="warning"?this.warningShow=!0:($A.messageSuccess("\u5220\u9664\u6210\u529F"),this.warningShow=!1,this.$store.dispatch("saveUserInfo",e),this.isSendButtonShow=!0,this.$refs.formDatum.resetFields())}).catch(({msg:e})=>{$A.modalError(e)}).finally(e=>{this.loadIng--}))})},resetForm(){this.$refs.formDatum.resetFields()},getRegVerify(){this.configLoad++,this.$store.dispatch("call",{url:"system/setting/email"}).then(({data:t})=>{this.isRegVerify=t.reg_verify==="open"}).finally(t=>{this.configLoad--})}}},o={};var u=a(l,n,m,!1,d,null,null,null);function d(t){for(let r in o)this[r]=o[r]}var J=function(){return u.exports}();export{J as default};
