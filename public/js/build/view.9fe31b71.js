import{i as h,r as c,o as r,a as l}from"./element-sea.7f208f9b.js";import{n as u}from"./app.f0de01ec.js";import"./vue.fd9b772e.js";import"./@babel.f9bcab46.js";import"./deepmerge.cecf392e.js";import"./resize-observer-polyfill.0bdc1850.js";import"./throttle-debounce.7c3948b2.js";import"./babel-helper-vue-jsx-merge-props.5ed215c3.js";import"./normalize-wheel.2a034b9f.js";import"./async-validator.49abba38.js";import"./babel-runtime.4773988a.js";import"./core-js.314b4a1d.js";import"./@micro-zoe.c2e1472d.js";import"./jquery.48d916fb.js";import"./dayjs.1b86c66d.js";import"./localforage.fd59c3e0.js";import"./markdown-it.bda97caf.js";import"./mdurl.ce6c1dd8.js";import"./uc.micro.8d343c98.js";import"./entities.48a44fec.js";import"./linkify-it.c5e8196e.js";import"./punycode.js.4b3f125a.js";import"./highlight.js.ab8aeea4.js";import"./markdown-it-link-attributes.e1d5d151.js";import"./@traptitech.897ae552.js";import"./vuex.cc7cb26e.js";import"./openpgp_hi.15f91b1d.js";import"./axios.6ec123f8.js";import"./mitt.1ea0a2a3.js";import"./vue-router.2d566cd7.js";import"./vue-clipboard2.50be9c5e.js";import"./clipboard.058ef547.js";import"./view-design-hi.92ef2000.js";import"./vuedraggable.9fd6afed.js";import"./sortablejs.d74243d9.js";import"./vue-resize-observer.c3c9ca4e.js";import"./lodash.18c5398d.js";var f=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{ref:"view",staticClass:"common-preview-image"},[e("div",{staticClass:"common-preview-view no-dark-content"},[t.isSingle?t._e():[e("div",{staticClass:"preview-view-prev",class:{"is-disabled":!t.infinite&&t.isFirst},on:{click:t.prev}},[e("i",{staticClass:"taskfont"},[t._v("\uE72D")])]),e("div",{staticClass:"preview-view-next",class:{"is-disabled":!t.infinite&&t.isLast},on:{click:t.next}},[e("i",{staticClass:"taskfont"},[t._v("\uE733")])])],e("div",{staticClass:"preview-view-actions"},[e("div",{staticClass:"actions-inner"},[e("i",{staticClass:"taskfont",on:{click:function(n){return t.handleActions("zoomOut")}}},[t._v("\uE7A2")]),e("i",{staticClass:"taskfont",on:{click:function(n){return t.handleActions("zoomIn")}}},[t._v("\uE79F")]),e("i",{staticClass:"actions-divider"}),e("i",{staticClass:"taskfont",domProps:{innerHTML:t._s(t.mode.icon)},on:{click:t.toggleMode}}),e("i",{staticClass:"actions-divider"}),e("i",{staticClass:"taskfont",on:{click:function(n){return t.handleActions("anticlocelise")}}},[t._v("\uE7A7")]),e("i",{staticClass:"taskfont",on:{click:function(n){return t.handleActions("clocelise")}}},[t._v("\uE7A6")])])]),e("div",{staticClass:"preview-view-canvas"},t._l(t.urlList,function(n,o){return o===t.index?e("img",{key:o,ref:"img",refInFor:!0,staticClass:"preview-view-img",style:t.imgStyle,attrs:{src:t.currentImg},on:{load:t.handleImgLoad,error:t.handleImgError,mousedown:t.handleMouseDown}}):t._e()}),0)],2)])},p=[];const a={CONTAIN:{name:"contain",icon:"&#xe79e;"},ORIGINAL:{name:"original",icon:"&#xe79d;"}},d=h()?"DOMMouseScroll":"mousewheel",v={props:{urlList:{type:Array,default:()=>[]},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!1},onSwitch:{type:Function,default:()=>{}}},data(){return{index:this.initialIndex,loading:!1,mode:a.CONTAIN,transform:{scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}}},mounted(){this.deviceSupportInstall(),this.$refs.view.focus()},beforeDestroy(){this.deviceSupportUninstall()},computed:{isSingle(){return this.urlList.length<=1},isFirst(){return this.index===0},isLast(){return this.index===this.urlList.length-1},currentImg(){let t=this.urlList[this.index];return $A.isJson(t)&&(t=t.src),t},imgStyle(){const{scale:t,deg:s,offsetX:e,offsetY:n,enableTransition:o}=this.transform,i={transform:`scale(${t}) rotate(${s}deg)`,transition:o?"transform .3s":"","margin-left":`${e}px`,"margin-top":`${n}px`};return this.mode===a.CONTAIN&&(i.maxWidth=i.maxHeight="100%"),i}},watch:{index:{handler:function(t){this.reset(),this.onSwitch(t)}},initialIndex(t){this.index=t},currentImg(){this.$nextTick(t=>{this.$refs.img[0].complete||(this.loading=!0)})}},methods:{deviceSupportInstall(){this._keyDownHandler=t=>{switch(t.stopPropagation(),t.keyCode){case 32:this.toggleMode();break;case 37:this.prev();break;case 38:this.handleActions("zoomIn");break;case 39:this.next();break;case 40:this.handleActions("zoomOut");break}},this._mouseWheelHandler=c(t=>{(t.wheelDelta?t.wheelDelta:-t.detail)>0?this.handleActions("zoomIn",{zoomRate:.015,enableTransition:!1}):this.handleActions("zoomOut",{zoomRate:.015,enableTransition:!1})}),r(document,"keydown",this._keyDownHandler),r(document,d,this._mouseWheelHandler)},deviceSupportUninstall(){l(document,"keydown",this._keyDownHandler),l(document,d,this._mouseWheelHandler),this._keyDownHandler=null,this._mouseWheelHandler=null},handleImgLoad(t){this.loading=!1},handleImgError(t){this.loading=!1,t.target.alt="\u52A0\u8F7D\u5931\u8D25"},handleMouseDown(t){if(this.loading||t.button!==0)return;const{offsetX:s,offsetY:e}=this.transform,n=t.pageX,o=t.pageY;this._dragHandler=c(i=>{this.transform.offsetX=s+i.pageX-n,this.transform.offsetY=e+i.pageY-o}),r(document,"mousemove",this._dragHandler),r(document,"mouseup",i=>{l(document,"mousemove",this._dragHandler)}),t.preventDefault()},reset(){this.transform={scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}},toggleMode(){if(this.loading)return;const t=Object.keys(a),n=(Object.values(a).indexOf(this.mode)+1)%t.length;this.mode=a[t[n]],this.reset()},prev(){if(this.isFirst&&!this.infinite)return;const t=this.urlList.length;this.index=(this.index-1+t)%t},next(){if(this.isLast&&!this.infinite)return;const t=this.urlList.length;this.index=(this.index+1)%t},handleActions(t,s={}){if(this.loading)return;const{zoomRate:e,rotateDeg:n,enableTransition:o}={zoomRate:.2,rotateDeg:90,enableTransition:!0,...s},{transform:i}=this;switch(t){case"zoomOut":i.scale>.2&&(i.scale=parseFloat((i.scale-e).toFixed(3)));break;case"zoomIn":i.scale=parseFloat((i.scale+e).toFixed(3));break;case"clocelise":i.deg+=n;break;case"anticlocelise":i.deg-=n;break}i.enableTransition=o}}},m={};var g=u(v,f,p,!1,_,"a643e882",null,null);function _(t){for(let s in m)this[s]=m[s]}var it=function(){return g.exports}();export{it as default};
