import{M as p}from"./MicroApps.f45165b8.js";import{n as m}from"./app.891b94e4.js";import"./vue.fd9b772e.js";import"./@babel.f9bcab46.js";import"./vuex.cc7cb26e.js";import"./@micro-zoe.c2e1472d.js";import"./DialogWrapper.36942b8f.js";import"./longpress.6c9d7403.js";import"./index.bda5a574.js";import"./quill-hi.b7430b13.js";import"./parchment.d5c5924e.js";import"./quill-delta.f1b7ce48.js";import"./fast-diff.f17881f3.js";import"./lodash.clonedeep.e8ef3f14.js";import"./lodash.isequal.d6a986d0.js";import"./eventemitter3.78b735ad.js";import"./lodash-es.df04b444.js";import"./quill-mention-hi.0fc702d1.js";import"./view-design-hi.92ef2000.js";import"./vue-virtual-scroll-list-hi.fd363a1b.js";import"./lodash.18c5398d.js";import"./ImgUpload.4e827527.js";import"./tip.5b94f105.js";import"./jquery.395124b3.js";import"./dayjs.c075d3c8.js";import"./localforage.94e33599.js";import"./markdown-it.bda97caf.js";import"./mdurl.ce6c1dd8.js";import"./uc.micro.8d343c98.js";import"./entities.48a44fec.js";import"./linkify-it.c5e8196e.js";import"./punycode.js.4b3f125a.js";import"./highlight.js.ab8aeea4.js";import"./markdown-it-link-attributes.e1d5d151.js";import"./@traptitech.897ae552.js";import"./openpgp_hi.15f91b1d.js";import"./axios.6ec123f8.js";import"./mitt.1ea0a2a3.js";import"./vue-router.2d566cd7.js";import"./vue-clipboard2.50be9c5e.js";import"./clipboard.058ef547.js";import"./vuedraggable.9fd6afed.js";import"./sortablejs.d74243d9.js";import"./vue-resize-observer.c3c9ca4e.js";import"./element-sea.7f208f9b.js";import"./deepmerge.cecf392e.js";import"./resize-observer-polyfill.0bdc1850.js";import"./throttle-debounce.7c3948b2.js";import"./babel-helper-vue-jsx-merge-props.5ed215c3.js";import"./normalize-wheel.2a034b9f.js";import"./async-validator.49abba38.js";import"./babel-runtime.4773988a.js";import"./core-js.314b4a1d.js";var e=function(){var t=this,r=t.$createElement,i=t._self._c||r;return i("div",{staticClass:"electron-single-micro-apps"},[!t.loading&&t.$route.name=="single-apps"?i("MicroApps",{attrs:{url:t.appUrl,path:t.path}}):t._e()],1)},a=[];const n={components:{MicroApps:p},data(){return{loading:!1,appUrl:"",path:""}},deactivated(){this.loading=!0},watch:{$route:{handler(t){this.loading=!0,t.name=="single-apps"?this.$nextTick(()=>{this.loading=!1,this.appUrl={}.VITE_OKR_WEB_URL||$A.mainUrl("apps/okr"),this.path=this.$route.query.path||""}):this.appUrl=""},immediate:!0}}},o={};var s=m(n,e,a,!1,l,null,null,null);function l(t){for(let r in o)this[r]=o[r]}var lt=function(){return s.exports}();export{lt as default};
