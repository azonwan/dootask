import{n as e}from"./app.f0de01ec.js";import"./@micro-zoe.c2e1472d.js";import"./jquery.48d916fb.js";import"./@babel.f9bcab46.js";import"./dayjs.1b86c66d.js";import"./localforage.fd59c3e0.js";import"./markdown-it.bda97caf.js";import"./mdurl.ce6c1dd8.js";import"./uc.micro.8d343c98.js";import"./entities.48a44fec.js";import"./linkify-it.c5e8196e.js";import"./punycode.js.4b3f125a.js";import"./highlight.js.ab8aeea4.js";import"./markdown-it-link-attributes.e1d5d151.js";import"./@traptitech.897ae552.js";import"./vue.fd9b772e.js";import"./vuex.cc7cb26e.js";import"./openpgp_hi.15f91b1d.js";import"./axios.6ec123f8.js";import"./mitt.1ea0a2a3.js";import"./vue-router.2d566cd7.js";import"./vue-clipboard2.50be9c5e.js";import"./clipboard.058ef547.js";import"./view-design-hi.92ef2000.js";import"./vuedraggable.9fd6afed.js";import"./sortablejs.d74243d9.js";import"./vue-resize-observer.c3c9ca4e.js";import"./element-sea.7f208f9b.js";import"./deepmerge.cecf392e.js";import"./resize-observer-polyfill.0bdc1850.js";import"./throttle-debounce.7c3948b2.js";import"./babel-helper-vue-jsx-merge-props.5ed215c3.js";import"./normalize-wheel.2a034b9f.js";import"./async-validator.49abba38.js";import"./babel-runtime.4773988a.js";import"./core-js.314b4a1d.js";import"./lodash.18c5398d.js";var s=function(){var t=this,i=t.$createElement,r=t._self._c||i;return r("div",{staticClass:"valid-wrap"},[r("div",{staticClass:"valid-box"},[r("div",{staticClass:"valid-title"},[t._v(t._s(t.$L("\u9A8C\u8BC1\u90AE\u7BB1")))]),!t.success&&!t.error?r("Spin",{attrs:{size:"large"}}):t._e(),t.success?r("div",{staticClass:"validation-text"},[r("p",[t._v(t._s(t.$L("\u60A8\u7684\u90AE\u7BB1\u5DF2\u901A\u8FC7\u9A8C\u8BC1")))]),r("p",[t._v(t._s(t.$L("\u4ECA\u540E\u60A8\u53EF\u4EE5\u901A\u8FC7\u6B64\u90AE\u7BB1\u91CD\u7F6E\u60A8\u7684\u5E10\u53F7\u5BC6\u7801")))])]):t._e(),t.error?r("div",{staticClass:"validation-text"},[r("div",[t._v(t._s(t.errorText))])]):t._e(),t.success?r("div",{attrs:{slot:"footer"},slot:"footer"},[r("Button",{attrs:{type:"primary",long:""},on:{click:t.userLogout}},[t._v(t._s(t.$L("\u8FD4\u56DE\u9996\u9875")))])],1):t._e()],1)])},a=[];const m={data(){return{success:!1,error:!1,errorText:this.$L("\u94FE\u63A5\u5DF2\u8FC7\u671F\uFF0C\u5DF2\u91CD\u65B0\u53D1\u9001")}},mounted(){this.verificationEmail()},methods:{verificationEmail(){this.$store.dispatch("call",{url:"users/email/verification",data:{code:this.$route.query.code}}).then(()=>{this.success=!0,this.error=!1}).catch(({data:t,msg:i})=>{t.code===2?this.goForward({name:"index",query:{action:"index"}},!0):(this.success=!1,this.error=!0,this.errorText=this.$L(i))})},userLogout(){this.$store.dispatch("logout",!1)}}},o={};var p=e(m,s,a,!1,c,"763444c4",null,null);function c(t){for(let i in o)this[i]=o[i]}var Q=function(){return p.exports}();export{Q as default};
