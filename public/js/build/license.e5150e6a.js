import{m as e}from"./vuex.cc7cb26e.js";import{n}from"./app.30a8687c.js";import"./@micro-zoe.c2e1472d.js";import"./jquery.5fefb7d5.js";import"./@babel.f9bcab46.js";import"./dayjs.dd4b2d82.js";import"./localforage.4b3d3970.js";import"./markdown-it.bda97caf.js";import"./mdurl.ce6c1dd8.js";import"./uc.micro.8d343c98.js";import"./entities.48a44fec.js";import"./linkify-it.c5e8196e.js";import"./punycode.js.4b3f125a.js";import"./highlight.js.ab8aeea4.js";import"./markdown-it-link-attributes.e1d5d151.js";import"./@traptitech.897ae552.js";import"./vue.fd9b772e.js";import"./openpgp_hi.15f91b1d.js";import"./axios.6ec123f8.js";import"./mitt.1ea0a2a3.js";import"./vue-router.2d566cd7.js";import"./vue-clipboard2.50be9c5e.js";import"./clipboard.058ef547.js";import"./view-design-hi.5e48072b.js";import"./vuedraggable.9fd6afed.js";import"./sortablejs.d74243d9.js";import"./vue-resize-observer.c3c9ca4e.js";import"./element-sea.7f208f9b.js";import"./deepmerge.cecf392e.js";import"./resize-observer-polyfill.0bdc1850.js";import"./throttle-debounce.7c3948b2.js";import"./babel-helper-vue-jsx-merge-props.5ed215c3.js";import"./normalize-wheel.2a034b9f.js";import"./async-validator.49abba38.js";import"./babel-runtime.4773988a.js";import"./core-js.314b4a1d.js";import"./lodash.18c5398d.js";var m=function(){var i,t=this,s=t.$createElement,o=t._self._c||s;return o("div",{staticClass:"setting-item submit"},[o("Form",t._b({ref:"formData",attrs:{model:t.formData},nativeOn:{submit:function(r){r.preventDefault()}}},"Form",t.formOptions,!1),[o("FormItem",{attrs:{label:"License",prop:"license"}},[o("Input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:t.$L("\u8BF7\u8F93\u5165License...")},model:{value:t.formData.license,callback:function(r){t.$set(t.formData,"license",r)},expression:"formData.license"}})],1),o("FormItem",[o("div",{staticClass:"license-box"},[t.formData.info.sn?o("ul",[o("li",[o("em",[t._v("SN:")]),o("span",[t._v(t._s(t.formData.info.sn))]),o("ETooltip",{attrs:{"max-width":"auto",placement:"right"}},[o("div",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.$L("\u5F53\u524D\u73AF\u5883"))+": "+t._s(t.formData.doo_sn))]),o("Icon",{staticClass:"information",class:{error:!t.existIntersection(t.formData.doo_sn,t.formData.info.sn)},attrs:{type:"ios-information-circle-outline"}})],1)],1),o("li",[o("em",[t._v("IP:")]),o("span",[t._v(t._s(t.infoJoin(t.formData.info.ip)))])]),o("li",[o("em",[t._v(t._s(t.$L("\u57DF\u540D"))+":")]),o("span",[t._v(t._s(t.infoJoin(t.formData.info.domain)))])]),o("li",[o("em",[t._v("MAC:")]),o("span",[t._v(t._s(t.infoJoin(t.formData.info.mac)))]),o("ETooltip",{attrs:{"max-width":"auto",placement:"right"}},[o("div",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.$L("\u5F53\u524D\u73AF\u5883"))+": "+t._s(t.infoJoin(t.formData.macs,"-")))]),o("Icon",{staticClass:"information",class:{error:!t.existIntersection(t.formData.macs,t.formData.info.mac)},attrs:{type:"ios-information-circle-outline"}})],1)],1),o("li",[o("em",[t._v(t._s(t.$L("\u4F7F\u7528\u4EBA\u6570"))+":")]),o("span",[t._v(t._s(t.formData.info.people||t.$L("\u65E0\u9650\u5236"))+" ("+t._s(t.$L("\u5DF2\u4F7F\u7528"))+": "+t._s(t.formData.user_count)+")")]),o("ETooltip",{attrs:{"max-width":"auto",placement:"right"}},[o("div",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.$L("\u9650\u5236\u6CE8\u518C\u4EBA\u6570")))]),o("Icon",{staticClass:"information",attrs:{type:"ios-information-circle-outline"}})],1)],1),o("li",[o("em",[t._v(t._s(t.$L("\u521B\u5EFA\u65F6\u95F4"))+":")]),o("span",[t._v(t._s(t.formData.info.created_at))])]),o("li",[o("em",[t._v(t._s(t.$L("\u5230\u671F\u65F6\u95F4"))+":")]),o("span",[t._v(t._s(t.formData.info.expired_at||t.$L("\u6C38\u4E45")))]),t.formData.info.expired_at?o("ETooltip",{attrs:{"max-width":"auto",placement:"right"}},[o("div",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.$L("\u5230\u671F\u540E\u9650\u5236\u6CE8\u518C\u5E10\u53F7")))]),o("Icon",{staticClass:"information",attrs:{type:"ios-information-circle-outline"}})],1):t._e()],1)]):o("ul",[o("li",[t._v(" "+t._s(t.$L("\u52A0\u8F7D\u4E2D..."))+" ")])])])]),((i=t.formData.error)===null||i===void 0?void 0:i.length)>0?o("FormItem",{attrs:{label:t.$L("\u5F53\u524D\u73AF\u5883")}},[o("div",{staticClass:"license-box"},[o("ul",[o("li",[o("em",[t._v("SN:")]),o("span",[t._v(t._s(t.formData.doo_sn))])]),o("li",[o("em",[t._v("MAC:")]),o("span",[t._v(t._s(t.infoJoin(t.formData.macs)))])]),t._l(t.formData.error,function(r){return o("li",{staticClass:"warning"},[t._v(t._s(r))])})],2)])]):t._e()],1),o("div",{staticClass:"setting-footer"},[o("Button",{attrs:{loading:t.loadIng>0,type:"primary"},on:{click:t.submitForm}},[t._v(t._s(t.$L("\u63D0\u4EA4")))]),o("Button",{staticStyle:{"margin-left":"8px"},attrs:{loading:t.loadIng>0},on:{click:t.resetForm}},[t._v(t._s(t.$L("\u91CD\u7F6E")))])],1)],1)},l=[];const c={data(){return{loadIng:0,formData:{license:"",info:{},macs:[],doo_sn:"",user_count:0,error:[]}}},mounted(){this.systemSetting()},computed:{...e(["userInfo","formOptions"])},methods:{submitForm(){this.$refs.formData.validate(i=>{i&&this.systemSetting(!0)})},resetForm(){this.formData=$A.cloneJSON(this.formData_bak)},systemSetting(i){this.loadIng++,this.$store.dispatch("call",{url:"system/license",data:Object.assign(this.formData,{type:i?"save":"get"}),method:"post"}).then(({data:t})=>{i&&$A.messageSuccess("\u4FEE\u6539\u6210\u529F"),this.formData=t,this.formData_bak=$A.cloneJSON(this.formData)}).catch(({msg:t})=>{i&&$A.modalError(t)}).finally(t=>{this.loadIng--})},infoJoin(i,t=null){return $A.isArray(i)&&(i=i.join(",")),i||(t===null?this.$L("\u65E0\u9650\u5236"):t)},existIntersection(i,t){return $A.isArray(i)||(i=[i]),$A.isArray(t)||(t=[t]),i.some(s=>t.includes(s))}}},a={};var _=n(c,m,l,!1,f,"0707cd3b",null,null);function f(i){for(let t in a)this[t]=a[t]}var W=function(){return _.exports}();export{W as default};
