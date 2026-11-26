"use strict";(()=>{var St=Object.defineProperty;var kt=Object.getOwnPropertyDescriptor;var D=(a,e,t,i)=>{for(var r=i>1?void 0:i?kt(e,t):e,n=a.length-1,o;n>=0;n--)(o=a[n])&&(r=(i?o(e,t,r):o(r))||r);return i&&r&&St(e,t,r),r};var xe=globalThis,Se=xe.ShadowRoot&&(xe.ShadyCSS===void 0||xe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Te=Symbol(),Ye=new WeakMap,ue=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Te)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Se&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=Ye.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ye.set(t,e))}return e}toString(){return this.cssText}},Xe=a=>new ue(typeof a=="string"?a:a+"",void 0,Te),_e=(a,...e)=>{let t=a.length===1?a[0]:e.reduce((i,r,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+a[n+1],a[0]);return new ue(t,a,Te)},et=(a,e)=>{if(Se)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),r=xe.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,a.appendChild(i)}},Me=Se?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Xe(t)})(a):a;var{is:Ct,defineProperty:At,getOwnPropertyDescriptor:Bt,getOwnPropertyNames:Et,getOwnPropertySymbols:Nt,getPrototypeOf:Rt}=Object,ke=globalThis,tt=ke.trustedTypes,Lt=tt?tt.emptyScript:"",zt=ke.reactiveElementPolyfillSupport,fe=(a,e)=>a,be={toAttribute(a,e){switch(e){case Boolean:a=a?Lt:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},Ce=(a,e)=>!Ct(a,e),it={attribute:!0,type:String,converter:be,reflect:!1,useDefault:!1,hasChanged:Ce};Symbol.metadata??=Symbol("metadata"),ke.litPropertyMetadata??=new WeakMap;var V=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=it){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&At(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){let{get:r,set:n}=Bt(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){let m=r?.call(this);n?.call(this,o),this.requestUpdate(e,m,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??it}static _$Ei(){if(this.hasOwnProperty(fe("elementProperties")))return;let e=Rt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(fe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(fe("properties"))){let t=this.properties,i=[...Et(t),...Nt(t)];for(let r of i)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let r of i)t.unshift(Me(r))}else e!==void 0&&t.push(Me(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return et(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:be).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){let i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let n=i.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:be;this._$Em=r;let m=o.fromAttribute(t,n.type);this[r]=m??this._$Ej?.get(r)??m,this._$Em=null}}requestUpdate(e,t,i,r=!1,n){if(e!==void 0){let o=this.constructor;if(r===!1&&(n=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??Ce)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:n},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,n]of i){let{wrapped:o}=n,m=this[r];o!==!0||this._$AL.has(r)||m===void 0||this.C(r,void 0,n,m)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[fe("elementProperties")]=new Map,V[fe("finalized")]=new Map,zt?.({ReactiveElement:V}),(ke.reactiveElementVersions??=[]).push("2.1.2");var We=globalThis,at=a=>a,Ae=We.trustedTypes,rt=Ae?Ae.createPolicy("lit-html",{createHTML:a=>a}):void 0,dt="$lit$",K=`lit$${Math.random().toFixed(9).slice(2)}$`,pt="?"+K,Pt=`<${pt}>`,te=document,me=()=>te.createComment(""),ge=a=>a===null||typeof a!="object"&&typeof a!="function",Fe=Array.isArray,Tt=a=>Fe(a)||typeof a?.[Symbol.iterator]=="function",je=`[ 	
\f\r]`,ye=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,st=/-->/g,nt=/>/g,X=RegExp(`>|${je}(?:([^\\s"'>=/]+)(${je}*=${je}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ot=/'/g,lt=/"/g,ht=/^(?:script|style|textarea|title)$/i,qe=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),y=qe(1),Kt=qe(2),Zt=qe(3),ie=Symbol.for("lit-noChange"),P=Symbol.for("lit-nothing"),ct=new WeakMap,ee=te.createTreeWalker(te,129);function ut(a,e){if(!Fe(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return rt!==void 0?rt.createHTML(e):e}var Mt=(a,e)=>{let t=a.length-1,i=[],r,n=e===2?"<svg>":e===3?"<math>":"",o=ye;for(let m=0;m<t;m++){let b=a[m],A,S,k=-1,C=0;for(;C<b.length&&(o.lastIndex=C,S=o.exec(b),S!==null);)C=o.lastIndex,o===ye?S[1]==="!--"?o=st:S[1]!==void 0?o=nt:S[2]!==void 0?(ht.test(S[2])&&(r=RegExp("</"+S[2],"g")),o=X):S[3]!==void 0&&(o=X):o===X?S[0]===">"?(o=r??ye,k=-1):S[1]===void 0?k=-2:(k=o.lastIndex-S[2].length,A=S[1],o=S[3]===void 0?X:S[3]==='"'?lt:ot):o===lt||o===ot?o=X:o===st||o===nt?o=ye:(o=X,r=void 0);let T=o===X&&a[m+1].startsWith("/>")?" ":"";n+=o===ye?b+Pt:k>=0?(i.push(A),b.slice(0,k)+dt+b.slice(k)+K+T):b+K+(k===-2?m:T)}return[ut(a,n+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},ve=class a{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let n=0,o=0,m=e.length-1,b=this.parts,[A,S]=Mt(e,t);if(this.el=a.createElement(A,i),ee.currentNode=this.el.content,t===2||t===3){let k=this.el.content.firstChild;k.replaceWith(...k.childNodes)}for(;(r=ee.nextNode())!==null&&b.length<m;){if(r.nodeType===1){if(r.hasAttributes())for(let k of r.getAttributeNames())if(k.endsWith(dt)){let C=S[o++],T=r.getAttribute(k).split(K),l=/([.?@])?(.*)/.exec(C);b.push({type:1,index:n,name:l[2],strings:T,ctor:l[1]==="."?De:l[1]==="?"?He:l[1]==="@"?Ue:se}),r.removeAttribute(k)}else k.startsWith(K)&&(b.push({type:6,index:n}),r.removeAttribute(k));if(ht.test(r.tagName)){let k=r.textContent.split(K),C=k.length-1;if(C>0){r.textContent=Ae?Ae.emptyScript:"";for(let T=0;T<C;T++)r.append(k[T],me()),ee.nextNode(),b.push({type:2,index:++n});r.append(k[C],me())}}}else if(r.nodeType===8)if(r.data===pt)b.push({type:2,index:n});else{let k=-1;for(;(k=r.data.indexOf(K,k+1))!==-1;)b.push({type:7,index:n}),k+=K.length-1}n++}}static createElement(e,t){let i=te.createElement("template");return i.innerHTML=e,i}};function re(a,e,t=a,i){if(e===ie)return e;let r=i!==void 0?t._$Co?.[i]:t._$Cl,n=ge(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(a),r._$AT(a,t,i)),i!==void 0?(t._$Co??=[])[i]=r:t._$Cl=r),r!==void 0&&(e=re(a,r._$AS(a,e.values),r,i)),e}var Ie=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??te).importNode(t,!0);ee.currentNode=r;let n=ee.nextNode(),o=0,m=0,b=i[0];for(;b!==void 0;){if(o===b.index){let A;b.type===2?A=new we(n,n.nextSibling,this,e):b.type===1?A=new b.ctor(n,b.name,b.strings,this,e):b.type===6&&(A=new Oe(n,this,e)),this._$AV.push(A),b=i[++m]}o!==b?.index&&(n=ee.nextNode(),o++)}return ee.currentNode=te,r}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},we=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=re(this,e,t),ge(e)?e===P||e==null||e===""?(this._$AH!==P&&this._$AR(),this._$AH=P):e!==this._$AH&&e!==ie&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Tt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==P&&ge(this._$AH)?this._$AA.nextSibling.data=e:this.T(te.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ve.createElement(ut(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{let n=new Ie(r,this),o=n.u(this.options);n.p(t),this.T(o),this._$AH=n}}_$AC(e){let t=ct.get(e.strings);return t===void 0&&ct.set(e.strings,t=new ve(e)),t}k(e){Fe(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,r=0;for(let n of e)r===t.length?t.push(i=new a(this.O(me()),this.O(me()),this,this.options)):i=t[r],i._$AI(n),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=at(e).nextSibling;at(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},se=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,n){this.type=1,this._$AH=P,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=P}_$AI(e,t=this,i,r){let n=this.strings,o=!1;if(n===void 0)e=re(this,e,t,0),o=!ge(e)||e!==this._$AH&&e!==ie,o&&(this._$AH=e);else{let m=e,b,A;for(e=n[0],b=0;b<n.length-1;b++)A=re(this,m[i+b],t,b),A===ie&&(A=this._$AH[b]),o||=!ge(A)||A!==this._$AH[b],A===P?e=P:e!==P&&(e+=(A??"")+n[b+1]),this._$AH[b]=A}o&&!r&&this.j(e)}j(e){e===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},De=class extends se{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===P?void 0:e}},He=class extends se{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==P)}},Ue=class extends se{constructor(e,t,i,r,n){super(e,t,i,r,n),this.type=5}_$AI(e,t=this){if((e=re(this,e,t,0)??P)===ie)return;let i=this._$AH,r=e===P&&i!==P||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==P&&(i===P||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Oe=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){re(this,e)}};var jt=We.litHtmlPolyfillSupport;jt?.(ve,we),(We.litHtmlVersions??=[]).push("3.3.3");var _t=(a,e,t)=>{let i=t?.renderBefore??e,r=i._$litPart$;if(r===void 0){let n=t?.renderBefore??null;i._$litPart$=r=new we(e.insertBefore(me(),n),n,void 0,t??{})}return r._$AI(a),r};var Ge=globalThis,F=class extends V{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=_t(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ie}};F._$litElement$=!0,F.finalized=!0,Ge.litElementHydrateSupport?.({LitElement:F});var It=Ge.litElementPolyfillSupport;It?.({LitElement:F});(Ge.litElementVersions??=[]).push("4.2.2");var Dt={attribute:!0,type:String,converter:be,reflect:!1,hasChanged:Ce},Ht=(a=Dt,e,t)=>{let{kind:i,metadata:r}=t,n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),i==="setter"&&((a=Object.create(a)).wrapped=!0),n.set(t.name,a),i==="accessor"){let{name:o}=t;return{set(m){let b=e.get.call(this);e.set.call(this,m),this.requestUpdate(o,b,a,!0,m)},init(m){return m!==void 0&&this.C(o,void 0,a,m),m}}}if(i==="setter"){let{name:o}=t;return function(m){let b=this[o];e.call(this,m),this.requestUpdate(o,b,a,!0,m)}}throw Error("Unsupported decorator location: "+i)};function ne(a){return(e,t)=>typeof t=="object"?Ht(a,e,t):((i,r,n)=>{let o=r.hasOwnProperty(n);return r.constructor.createProperty(n,i),o?Object.getOwnPropertyDescriptor(r,n):void 0})(a,e,t)}function q(a){return ne({...a,state:!0,attribute:!1})}var ft=_e`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  /* Header */
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 2px;
  }

  .header-title-container {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .header-icon {
    --mdc-icon-size: 26px;
    color: var(--primary-color);
  }

  .summary-chips {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 12px;
    font-weight: 500;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    color: var(--secondary-text-color);
  }

  .chip.total {
    background: var(--divider-color, rgba(127, 127, 127, 0.15));
  }

  .chip.low {
    background: rgba(var(--rgb-error-color, 244, 67, 54), 0.15);
    color: var(--error-color, #f44336);
  }

  .chip.ok {
    background: rgba(var(--rgb-success-color, 76, 175, 80), 0.15);
    color: var(--success-color, #4caf50);
  }

  /* Controls (Search & Quick Filters) */
  .controls-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  .search-wrapper {
    position: relative;
    flex: 1 1 200px;
    min-width: 160px;
  }

  .search-input {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 32px 8px 32px;
    border-radius: 8px;
    border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
    background: var(--card-background-color, transparent);
    color: var(--primary-text-color);
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .search-input:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 1px var(--primary-color);
  }

  .search-icon-left {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    pointer-events: none;
  }

  .search-clear-btn {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color);
  }

  .search-clear-btn:hover {
    color: var(--primary-text-color);
  }

  .filter-pills {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .filter-btn {
    border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
    background: var(--card-background-color, transparent);
    color: var(--secondary-text-color);
    border-radius: 16px;
    padding: 4px 10px;
    font-size: 0.775rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .filter-btn:hover {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
    color: var(--primary-text-color);
  }

  .filter-btn.active {
    background: var(--primary-color);
    color: var(--text-primary-color, #ffffff);
    border-color: var(--primary-color);
  }

  /* Table styling */
  .table-wrapper {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 8px;
    border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.15));
  }

  .battery-table {
    width: 100%;
    min-width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.875rem;
    color: var(--primary-text-color);
  }

  .battery-table th {
    background: var(--table-header-background-color, var(--secondary-background-color, rgba(127, 127, 127, 0.08)));
    color: var(--secondary-text-color);
    font-weight: 600;
    padding: 10px 12px;
    white-space: nowrap;
    border-bottom: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
    user-select: none;
  }

  .battery-table th.sortable {
    cursor: pointer;
  }

  .battery-table th.sortable:hover {
    color: var(--primary-text-color);
  }

  .th-content {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .sort-icon {
    --mdc-icon-size: 16px;
    color: var(--primary-color);
  }

  .battery-table td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--divider-color, rgba(127, 127, 127, 0.1));
    vertical-align: middle;
  }

  .battery-table tr:last-child td {
    border-bottom: none;
  }

  .battery-table tbody tr:hover {
    background: var(--table-row-hover-color, rgba(127, 127, 127, 0.06));
  }

  .battery-table tbody tr.row-low {
    background: rgba(var(--rgb-error-color, 244, 67, 54), 0.04);
  }

  /* Specific column styling */
  .col-name-th,
  .col-name-td {
    min-width: 140px;
    text-align: left;
  }

  .col-battery-th,
  .col-battery-td {
    min-width: 130px;
    text-align: left;
  }

  .col-type-th,
  .col-type-td {
    min-width: 90px;
    text-align: left;
  }

  .col-last-replaced-th,
  .col-last-replaced-td {
    min-width: 120px;
    text-align: left;
  }

  .col-status-th,
  .col-status-td {
    min-width: 75px;
    text-align: center;
  }

  .col-area-th,
  .col-area-td {
    min-width: 100px;
    text-align: left;
  }

  .col-note-th,
  .col-note-td {
    min-width: 100px;
    text-align: left;
  }

  .col-actions-th,
  .col-actions-td {
    min-width: 95px;
    text-align: center;
  }

  /* Cell elements */
  .device-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-width: 260px;
  }

  .device-name-btn {
    background: none;
    border: none;
    padding: 0;
    text-align: left;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--primary-text-color);
    cursor: pointer;
    text-decoration: none;
    line-height: 1.3;
    word-break: break-word;
  }

  .device-name-btn:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }

  .device-subtext {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .device-area {
    display: inline-flex;
    align-items: center;
    gap: 3px;
  }

  .area-icon {
    --mdc-icon-size: 13px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }

  /* Battery level bar and percent */
  .battery-level-cell {
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }

  .battery-icon {
    --mdc-icon-size: 20px;
    flex-shrink: 0;
  }

  .battery-bar-container {
    flex: 1;
    min-width: 45px;
    max-width: 80px;
    height: 6px;
    background: var(--divider-color, rgba(127, 127, 127, 0.2));
    border-radius: 3px;
    overflow: hidden;
  }

  .battery-bar-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.3s ease-in-out;
  }

  .battery-percent-text {
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    min-width: 36px;
    text-align: right;
    font-size: 0.85rem;
  }

  /* Dynamic battery colors */
  .level-critical {
    color: var(--error-color, #f44336);
  }
  .bar-critical {
    background-color: var(--error-color, #f44336);
  }

  .level-warning {
    color: var(--warning-color, #ff9800);
  }
  .bar-warning {
    background-color: var(--warning-color, #ff9800);
  }

  .level-medium {
    color: #e6b800;
  }
  .bar-medium {
    background-color: #e6b800;
  }

  .level-good {
    color: var(--success-color, #4caf50);
  }
  .bar-good {
    background-color: var(--success-color, #4caf50);
  }

  .level-unknown {
    color: var(--disabled-text-color, #9e9e9e);
  }
  .bar-unknown {
    background-color: var(--disabled-text-color, #9e9e9e);
  }

  /* Battery Type Badge */
  .type-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--primary-text-color);
    white-space: nowrap;
  }

  .type-badge ha-icon {
    --mdc-icon-size: 14px;
    color: var(--secondary-text-color);
  }

  /* Area Badge */
  .area-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--primary-text-color);
    white-space: nowrap;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .area-badge-icon {
    --mdc-icon-size: 14px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }

  .area-empty {
    color: var(--disabled-text-color, #9e9e9e);
  }

  /* Last Replaced cell */
  .last-replaced-cell {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    color: var(--secondary-text-color);
    font-size: 0.825rem;
  }

  .last-replaced-cell ha-icon {
    --mdc-icon-size: 16px;
    flex-shrink: 0;
  }

  /* Status badge */
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .status-badge.low {
    background: rgba(var(--rgb-error-color, 244, 67, 54), 0.15);
    color: var(--error-color, #f44336);
  }

  .status-badge.ok {
    background: rgba(var(--rgb-success-color, 76, 175, 80), 0.15);
    color: var(--success-color, #4caf50);
  }

  .status-badge.unavailable {
    background: rgba(127, 127, 127, 0.15);
    color: var(--disabled-text-color, #9e9e9e);
  }

  /* Action button */
  .action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background: var(--primary-color);
    color: var(--text-primary-color, #ffffff);
    border: none;
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 0.775rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity 0.2s, transform 0.1s;
  }

  .action-btn:hover {
    opacity: 0.9;
  }

  .action-btn:active {
    transform: scale(0.97);
  }

  .action-btn ha-icon {
    --mdc-icon-size: 15px;
    flex-shrink: 0;
  }

  .action-btn.success {
    background: var(--success-color, #4caf50);
  }

  /* Note tooltip / text */
  .note-text {
    font-size: 0.8rem;
    color: var(--secondary-text-color);
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }

  /* Empty state */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
    text-align: center;
    color: var(--secondary-text-color);
    gap: 8px;
  }

  .empty-state ha-icon {
    --mdc-icon-size: 40px;
    color: var(--disabled-text-color, #9e9e9e);
  }

  /* Compact Mode */
  .compact .battery-table td,
  .compact .battery-table th {
    padding: 6px 8px;
    font-size: 0.8rem;
  }

  .compact .battery-bar-container {
    height: 4px;
  }

  /* Pagination / Show more */
  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px 0 2px 0;
  }

  .pagination-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 8px;
    border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
    color: var(--primary-text-color);
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .pagination-btn ha-icon {
    --mdc-icon-size: 18px;
  }

  .pagination-btn:hover {
    background: var(--primary-color);
    color: var(--text-primary-color, #ffffff);
    border-color: var(--primary-color);
  }

  .pagination-btn.secondary {
    background: transparent;
    border-color: transparent;
    color: var(--secondary-text-color);
  }

  .pagination-btn.secondary:hover {
    background: rgba(127, 127, 127, 0.15);
    color: var(--primary-text-color);
    border-color: transparent;
  }

  .compact .pagination-btn {
    padding: 4px 10px;
    font-size: 0.75rem;
  }
`;var bt={en:{card_title:"Battery Notes",col_name:"Device",col_area:"Area",col_battery:"Battery",col_type:"Type",col_last_replaced:"Last Replaced",col_status:"Status",col_note:"Note",col_actions:"Actions",status_low:"Low",status_ok:"OK",status_critical:"Critical",status_unavailable:"Unavailable",action_mark_replaced:"Mark replaced",action_replaced:"Replaced",confirm_replace_title:"Confirm Battery Replacement",confirm_replace_msg:'Mark battery as replaced for "{name}"?',replaced_success:"Battery replacement recorded",search_placeholder:"Search devices, battery type...",filter_all:"All",filter_low:"Low",filter_critical:"Critical",summary_total:"Total",summary_low:"Low",summary_ok:"Good",no_devices:"No Battery Notes devices found.",no_results:"No matching devices found.",time_never:"Never",time_today:"Today",time_yesterday:"Yesterday",time_days_ago:"{n}d ago",time_weeks_ago:"{n}w ago",time_months_ago:"{n}m ago",time_years_ago:"{n}y ago",editor_title:"Title",editor_icon:"Icon",editor_show_header:"Show Header",editor_show_summary:"Show Summary Counters",editor_show_search:"Show Search Bar",editor_show_filters:"Show Quick Filter Pills",editor_compact:"Compact Layout",editor_confirm_replace:"Confirm Before Replacement",editor_sort_by:"Sort By",editor_sort_direction:"Sort Direction",editor_filter_low_only:"Show Low Battery Only",editor_filter_threshold:"Battery Threshold (%)",editor_hide_unavailable:"Hide Unavailable Devices",editor_unavailable_first:"Show unavailable devices at top",editor_battery_plus_only:"Only show devices with Battery+ sensor",editor_columns:"Visible Columns",editor_col_name:"Name",editor_col_area:"Area",editor_col_battery:"Battery Level",editor_col_type:"Battery Type",editor_col_last_replaced:"Last Replaced",editor_col_status:"Status Badge",editor_col_note:"Note",editor_col_actions:"Action Button",editor_show_area:"Show Area Subtitle",editor_always_show_area:"Always Show Area (even if in name)",show_more:"Show {count} more",show_more_remaining:"Show {count} more ({remaining} remaining)",show_less:"Show less",show_all:"Show all ({count})",editor_initial_rows:"Initial rows to show",editor_step_rows:"Rows to add per click"},de:{card_title:"Batteriest\xE4nde",col_name:"Ger\xE4t",col_area:"Bereich",col_battery:"Batterie",col_type:"Typ",col_last_replaced:"Zuletzt gewechselt",col_status:"Status",col_note:"Notiz",col_actions:"Aktionen",status_low:"Niedrig",status_ok:"OK",status_critical:"Kritisch",status_unavailable:"Nicht verf\xFCgbar",action_mark_replaced:"Als gewechselt markieren",action_replaced:"Gewechselt",confirm_replace_title:"Batteriewechsel best\xE4tigen",confirm_replace_msg:'Batterie f\xFCr "{name}" wirklich als gewechselt markieren?',replaced_success:"Batteriewechsel gespeichert",search_placeholder:"Ger\xE4t oder Batterietyp suchen...",filter_all:"Alle",filter_low:"Niedrig",filter_critical:"Kritisch",summary_total:"Gesamt",summary_low:"Niedrig",summary_ok:"In Ordnung",no_devices:"Keine Battery Notes Ger\xE4te gefunden.",no_results:"Keine passenden Ger\xE4te gefunden.",time_never:"Nie",time_today:"Heute",time_yesterday:"Gestern",time_days_ago:"Vor {n} Tagen",time_weeks_ago:"Vor {n} Wochen",time_months_ago:"Vor {n} Monaten",time_years_ago:"Vor {n} Jahren",editor_title:"Titel",editor_icon:"Icon",editor_show_header:"Kopfzeile anzeigen",editor_show_summary:"Zusammenfassung (Z\xE4hler) anzeigen",editor_show_search:"Suchleiste anzeigen",editor_show_filters:"Filter-Buttons anzeigen",editor_compact:"Kompakte Tabelle",editor_confirm_replace:"Best\xE4tigungsdialog vor Wechsel",editor_sort_by:"Sortieren nach",editor_sort_direction:"Sortierrichtung",editor_filter_low_only:"Nur schwache Batterien anzeigen",editor_filter_threshold:"Schwellenwert (%)",editor_hide_unavailable:"Nicht verf\xFCgbare ausblenden",editor_unavailable_first:"Nicht verf\xFCgbare Ger\xE4te ganz oben anzeigen",editor_battery_plus_only:"Nur Ger\xE4te mit Batterie+ Sensor anzeigen",editor_columns:"Sichtbare Spalten",editor_col_name:"Name",editor_col_area:"Bereich",editor_col_battery:"Batteriestand",editor_col_type:"Batterietyp",editor_col_last_replaced:"Zuletzt gewechselt",editor_col_status:"Status",editor_col_note:"Notiz",editor_col_actions:"Aktions-Button",editor_show_area:"Bereichs-Untertitel anzeigen",editor_always_show_area:"Bereich immer anzeigen (auch wenn im Namen)",show_more:"Weitere {count} anzeigen",show_more_remaining:"Weitere {count} anzeigen (noch {remaining})",show_less:"Weniger anzeigen",show_all:"Alle anzeigen ({count})",editor_initial_rows:"Anzahl Zeilen am Anfang",editor_step_rows:"Weitere Zeilen pro Klick"}};function d(a,e="en",t){let i=e.startsWith("de")?"de":"en",r=bt[i]?.[a]||bt.en?.[a]||a;if(t)for(let[n,o]of Object.entries(t))r=r.replace(new RegExp(`\\{${n}\\}`,"g"),String(o));return r}var Ut=new Set(["batterie fast leer","batterie-typ","batterie - typ","batterietyp","letzter batteriewechsel","batterie zuletzt ersetzt","batterie ersetzt","batterie+","batterie","batterie plus","batterie-plus","battery low","battery type","battery last replaced","battery replaced","battery+","battery","battery plus","battery-plus","battery status","batteriestatus","batterie status","batteri lav","batteri-type","batteri type","batteritype","batteri","batteriniveau","batteristand","batteri udskiftet","sidst udskiftet","batterij bijna leeg","batterij-type","batterij type","batterijtype","batterij","batterijniveau","batterijstand","batterij vervangen","laatst vervangen"]);function $(a){if(!a)return!0;let e=a.toLowerCase().trim();return!!(Ut.has(e)||/^(?:battery|batterie|batteri|batterij)[_\-\s]*(?:type|typ|low|lav|bijna[_\-\s]*leeg|fast[_\-\s]*leer|replaced|ersetzt|udskiftet|vervangen|last[_\-\s]*replaced|plus|\+|status)*(?:[_\-\s]*\d+)?$/i.test(e))}function J(a){return a?a.replace(/\s*(?:[-–—:]|\()\s*(?:Battery Type|Batterietyp|Batterie-Typ|Batteritype|Batteri Type|Batterijtype|Batterij Type|Battery Plus|Batterie Plus|Batterie-Plus|Battery\+|Batterie\+|Batteri\+|Batterij\+|Batteriestand|Battery Level|Batteriniveau|Batterijniveau|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Sidst udskiftet|Laatst vervangen|Battery Replaced|Batterie ersetzt|Batteri udskiftet|Batterij vervangen|Battery Low|Batterie fast leer|Batteri lav|Batterij bijna leeg|Batterie schwach|Battery Status|Batteriestatus|Batterie Status|Batteri|Battery|Batterie|Batterij)\s*\)?$/i,"").replace(/\s+(?:Battery Type|Batterietyp|Batterie-Typ|Batteritype|Batteri Type|Batterijtype|Batterij Type|Battery Plus|Batterie Plus|Batterie-Plus|Battery\+|Batterie\+|Batteri\+|Batterij\+|Batteriestand|Battery Level|Batteriniveau|Batterijniveau|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Sidst udskiftet|Laatst vervangen|Battery Replaced|Batterie ersetzt|Batteri udskiftet|Batterij vervangen|Battery Low|Batterie fast leer|Batteri lav|Batterij bijna leeg|Batterie schwach|Battery Status|Batteriestatus|Batterie Status|Batteri|Battery|Batterie|Batterij)$/i,"").replace(/[\s\-_:–—()]+$/g,"").trim():""}function Ot(a){if(!a)return"";let e=J(a);if(!e)return"";let t=/(?:\s+|-)(?:Rauchalarm|Rauch|Sabotagekontakt|Sabotage|Status|State|Alarm|Detection)$/i;for(;t.test(e);){let i=e.replace(t,"").trim();if(i.length>=3&&!$(i))e=i;else break}return e}function Wt(a){if(!a)return"";let e=a.replace(/([_-])0+([1-9]\d*)\b/g,"$1$2");return e=e.replace(/([_-])(?:sbs\d+[a-f0-9]+|[a-f0-9]*[a-f][a-f0-9]{5,})/gi,""),e=e.replace(/^_+|_+$/g,"").replace(/_+/g," "),e.replace(/\b\w/g,t=>t.toUpperCase()).trim()||a}function Z(a){return(a.includes(".")?a.split(".")[1]:a).replace(/(?:_|-)(?:battery_last_replaced|letzter_batteriewechsel|batterie_zuletzt_ersetzt|sidst_udskiftet|laatst_vervangen)$/i,"").replace(/(?:_|-)(?:battery_type|batterie_typ|batterie-typ|batterietyp|batterie_art|batteritype|batterijtype)$/i,"").replace(/(?:_|-)(?:battery_plus_low|battery_low|batterie_fast_leer|batterie_schwach|niedriger_batteriestand|batteri_lav|batterij_bijna_leeg)$/i,"").replace(/(?:_|-)(?:battery_replaced|batterie_ersetzt|batterie_ersetzen|batteri_udskiftet|batterij_vervangen)$/i,"").replace(/(?:_|-)(?:battery_plus|batterie_plus|battery\+|batterie\+|batteri_plus|batterij_plus)$/i,"").replace(/(?:_|-)(?:battery_level|batteriestand|batterie_stand|batteriniveau|batterijniveau|battery|batterie|batteri|batterij)$/i,"").replace(/_battery$/,"").replace(/_batterie$/,"").replace(/_batteri$/,"").replace(/_batterij$/,"")}function oe(a,e){if(!a.entity_id.startsWith("sensor.")||e?.platform&&e.platform!=="battery_notes")return!1;if(e?.translation_key==="battery_type")return!0;let t=a.entity_id.toLowerCase();return t.endsWith("_battery_type")||t.endsWith("_batterie_typ")||t.endsWith("_batterie-typ")||t.endsWith("_batterie_art")||t.endsWith("_batterietyp")||t.endsWith("_batteritype")||t.endsWith("_batterijtype")||t==="sensor.battery_type"||t==="sensor.batterie_typ"||t==="sensor.batteritype"||t==="sensor.batterijtype"||/^sensor\.(?:battery|batterie|batteri|batterij)[_\-]typ(?:e)?(?:_\d+)?$/i.test(t)||a.attributes.battery_type!==void 0&&!a.attributes.device_class&&(!e?.platform||e.platform==="battery_notes")}function le(a,e){if(!a.entity_id.startsWith("sensor.")||e?.platform&&e.platform!=="battery_notes")return!1;if(e?.translation_key==="battery_plus")return!0;let t=a.entity_id.toLowerCase();return t.endsWith("_battery_plus")||t.endsWith("_batterie_plus")||t.endsWith("_battery+")||t.endsWith("_batterie+")||t==="sensor.battery_plus"||t==="sensor.batterie_plus"}function Qe(a,e){if(!a.entity_id.startsWith("sensor.")||e?.platform&&e.platform!=="battery_notes")return!1;if(e?.translation_key==="battery_last_replaced")return!0;let t=a.entity_id.toLowerCase();return t.endsWith("_battery_last_replaced")||t.endsWith("_letzter_batteriewechsel")||t.endsWith("_batterie_zuletzt_ersetzt")}function Ve(a,e){if(!a.entity_id.startsWith("binary_sensor.")||e?.platform&&e.platform!=="battery_notes")return!1;if(e?.translation_key==="battery_low"||e?.translation_key==="battery_plus_low"||e?.platform==="battery_notes")return!0;let t=a.entity_id.toLowerCase();return t.endsWith("_battery_low")||t.endsWith("_battery_plus_low")||t.endsWith("_batterie_fast_leer")||t.endsWith("_batterie_schwach")||t.endsWith("_niedriger_batteriestand")}function Ke(a,e){if(!a.entity_id.startsWith("button.")||e?.platform&&e.platform!=="battery_notes")return!1;if(e?.translation_key==="battery_replaced")return!0;let t=a.entity_id.toLowerCase();return t.endsWith("_battery_replaced")||t.endsWith("_batterie_ersetzt")||t.endsWith("_batterie_ersetzen")}function yt(a,e,t){if(!a||!a.states)return[];let i=a.states,r=[],n=new Map,o=new Map,m=new Map,b=l=>{if(l.deviceId){m.has(l.deviceId)||m.set(l.deviceId,[]);let p=m.get(l.deviceId);p.includes(l)||p.push(l)}l.baseName&&!$(l.baseName)&&!n.has(l.baseName)&&n.set(l.baseName,l);for(let p of l.entities){let h=p.attributes?.source_entity_id;h&&!o.has(h)&&o.set(h,l)}},A=[],S=[];for(let[l,p]of Object.entries(i)){let h=p.attributes||{},u=t?.entities?.get(l)||a.entities?.[l];if(!(u?.platform==="battery_notes"||oe(p,u)||le(p,u)||Qe(p,u)||Ve(p,u)||Ke(p,u)||h.battery_type!==void 0||h.battery_type_and_quantity!==void 0))continue;Ke(p,u)||Ve(p,u)||Qe(p,u)?S.push({entityId:l,entity:p,reg:u}):A.push({entityId:l,entity:p,reg:u})}for(let{entityId:l,entity:p,reg:h}of A){let u=p.attributes||{},w=h?.device_id||u.device_id,_=u.source_entity_id,g=Z(l);_&&($(g)||!g)&&(g=Z(_)),u.device_name&&($(g)||!g)&&(g=Z(u.device_name));let f=g,x=null;if(_&&o.has(_))x=o.get(_);else if(f&&!$(f)&&n.has(f))x=n.get(f);else if(w&&m.has(w)){let L=m.get(w),c=L.find(N=>$(N.baseName));if(c)x=c,f&&!$(f)&&(c.baseName=f,n.set(f,c));else if(L.length===1){let N=L[0],U=N.entities.some(E=>le(E,t?.entities?.get(E.entity_id)||a.entities?.[E.entity_id])),R=N.entities.some(E=>oe(E,t?.entities?.get(E.entity_id)||a.entities?.[E.entity_id])),O=le(p,h),Ne=oe(p,h);if(U&&Ne&&!R||R&&O&&!U){let E=N.entities.find(de=>de.attributes?.source_entity_id)?.attributes?.source_entity_id;(!E||!_||E===_)&&(x=N)}else($(f)||$(N.baseName)||f.startsWith(N.baseName)||N.baseName.startsWith(f))&&(x=N)}else{let N=L.find(U=>f&&(f.startsWith(U.baseName)||U.baseName.startsWith(f)));N&&(x=N)}}x?w&&!x.deviceId&&(x.deviceId=w,b(x)):(x={id:w&&f&&!$(f)?`dev_${w}_${f}`:w?`dev_${w}`:`base_${f}`,deviceId:w,baseName:f,entities:[]},r.push(x),b(x)),_&&!o.has(_)&&o.set(_,x),f&&!$(f)&&!n.has(f)&&n.set(f,x),x.entities.push(p)}for(let{entityId:l,entity:p,reg:h}of S){let u=p.attributes||{},w=h?.device_id||u.device_id,_=u.source_entity_id,g=Z(l);_&&($(g)||!g)&&(g=Z(_)),u.device_name&&($(g)||!g)&&(g=Z(u.device_name));let f=g,x=null;if(_&&o.has(_))x=o.get(_);else if(f&&!$(f)&&n.has(f))x=n.get(f);else if(w&&m.has(w)){let L=m.get(w);L.length===1?x=L[0]:x=L.find(N=>f&&(f.startsWith(N.baseName)||N.baseName.startsWith(f)))||L[0]}else if(f&&!$(f)){let L=r.find(c=>c.baseName&&(f.startsWith(c.baseName)||c.baseName.startsWith(f)));L&&(x=L)}x||(x={id:w&&f&&!$(f)?`dev_${w}_${f}`:w?`dev_${w}`:`base_${f}`,deviceId:w,baseName:f,entities:[]},r.push(x),b(x)),x.entities.push(p)}for(let[,l]of m.entries())if(!(l.length<=1))for(let p=0;p<l.length;p++){let h=l[p];if(!r.includes(h))continue;let u=h.entities.find(_=>le(_,t?.entities?.get(_.entity_id)||a.entities?.[_.entity_id])),w=h.entities.find(_=>oe(_,t?.entities?.get(_.entity_id)||a.entities?.[_.entity_id]));for(let _=p+1;_<l.length;_++){let g=l[_];if(!r.includes(g))continue;let f=g.entities.find(c=>le(c,t?.entities?.get(c.entity_id)||a.entities?.[c.entity_id])),x=g.entities.find(c=>oe(c,t?.entities?.get(c.entity_id)||a.entities?.[c.entity_id]));if(u&&!w&&x&&!f||w&&!u&&f&&!x){let c=h.entities.find(O=>O.attributes?.source_entity_id)?.attributes?.source_entity_id,N=g.entities.find(O=>O.attributes?.source_entity_id)?.attributes?.source_entity_id,U=!c||!N||c===N,R=$(h.baseName)||$(g.baseName)||h.baseName===g.baseName||h.baseName.startsWith(g.baseName)||g.baseName.startsWith(h.baseName);U&&(R||l.length===2)&&(h.entities.push(...g.entities),$(h.baseName)&&!$(g.baseName)&&(h.baseName=g.baseName),r=r.filter(O=>O!==g),l.splice(_,1),_--)}}}let k=[],C=new Set(e.exclude_entities||[]),T=r;if(e.entities&&e.entities.length>0){let l=new Set(e.entities.map(h=>Z(h))),p=new Set(e.entities);T=T.filter(h=>l.has(h.baseName)||h.deviceId&&p.has(h.deviceId)||h.entities.some(u=>p.has(u.entity_id)))}for(let l of T){let p=l.entities,h=l.deviceId,u=l.baseName,w=u.replace(/([_-])0*[0-9a-f]{6,}\b/i,"");if(C.has(u)||h&&C.has(h)||p.some(s=>C.has(s.entity_id)))continue;let _=p.find(s=>oe(s,t?.entities?.get(s.entity_id)||a.entities?.[s.entity_id])),g=p.find(s=>le(s,t?.entities?.get(s.entity_id)||a.entities?.[s.entity_id])),f=p.find(s=>Qe(s,t?.entities?.get(s.entity_id)||a.entities?.[s.entity_id])),x=p.find(s=>Ve(s,t?.entities?.get(s.entity_id)||a.entities?.[s.entity_id])),L=p.find(s=>Ke(s,t?.entities?.get(s.entity_id)||a.entities?.[s.entity_id])),c={};for(let s of p)s.attributes&&Object.assign(c,s.attributes);let N=!!(e.entities&&e.entities.length>0),U=!!g,R=g||_||p[0];if(!g&&!_&&!N)continue;let O=t?.entities?.get((R||p[0]).entity_id)||a.entities?.[(R||p[0]).entity_id],Ne=U||!!(_&&(c.battery_type!==void 0||c.battery_type_and_quantity!==void 0||_.attributes?.battery_type!==void 0||O?.platform==="battery_notes"))||c.battery_type!==void 0||c.battery_type_and_quantity!==void 0||O?.platform==="battery_notes";if(!N&&!Ne)continue;let E,de=[`sensor.${u}_battery`,`sensor.${u}_batterie`,`sensor.${u}_batteri`,`sensor.${u}_batterij`,`sensor.${u}_battery_level`,`sensor.${u}_batteriestand`,`sensor.${u}_batterie_stand`,`sensor.${u}_batteriniveau`,`sensor.${u}_batterijniveau`,`sensor.${u}`];if(w&&w!==u&&de.push(`sensor.${w}_battery`,`sensor.${w}_batterie`,`sensor.${w}_batteri`,`sensor.${w}_batterij`,`sensor.${w}_battery_level`,`sensor.${w}_batteriestand`,`sensor.${w}`),c.source_entity_id){let s=Z(c.source_entity_id);s&&s!==u&&de.push(`sensor.${s}_battery`,`sensor.${s}_batterie`,`sensor.${s}_batteri`,`sensor.${s}_battery_level`,`sensor.${s}_batteriestand`,`sensor.${s}_batteriniveau`,`sensor.${s}`)}for(let s of de)if(i[s]){E=i[s];break}let j=h;if(!j)for(let s of p){let B=t?.entities?.get(s.entity_id)||a.entities?.[s.entity_id];if(B?.device_id){j=B.device_id;break}}if(!j&&c.source_entity_id){let s=t?.entities?.get(c.source_entity_id)||a.entities?.[c.source_entity_id];s?.device_id&&(j=s.device_id)}if(!j&&E){let s=t?.entities?.get(E.entity_id)||a.entities?.[E.entity_id];s?.device_id&&(j=s.device_id)}let G=j?t?.devices?.get(j)||a.devices?.[j]:void 0,Re=!!(h&&(m.get(h)?.length??0)>1||j&&(m.get(j)?.length??0)>1),z=null,pe;if(h&&!Re){let s=t?.entities;for(let[B,M]of Object.entries(i)){if(!B.startsWith("sensor."))continue;if((s?.get(B)||a.entities?.[B])?.device_id===h&&M&&M.attributes?.device_class==="battery"){pe=M;break}}}if(g&&!isNaN(parseFloat(g.state)))z=parseFloat(g.state);else if(c.source_entity_id&&i[c.source_entity_id]){let s=i[c.source_entity_id];s.attributes?.battery_level!==void 0&&!isNaN(Number(s.attributes.battery_level))?z=Number(s.attributes.battery_level):s.attributes?.battery!==void 0&&!isNaN(Number(s.attributes.battery))?z=Number(s.attributes.battery):s.attributes?.battery_percentage!==void 0&&!isNaN(Number(s.attributes.battery_percentage))?z=Number(s.attributes.battery_percentage):isNaN(parseFloat(s.state))||(z=parseFloat(s.state))}if(z===null)for(let s of p){if(s.attributes?.battery_level!==void 0&&!isNaN(Number(s.attributes.battery_level))){z=Number(s.attributes.battery_level);break}if(s.attributes?.battery!==void 0&&!isNaN(Number(s.attributes.battery))){z=Number(s.attributes.battery);break}if(s.attributes?.battery_percentage!==void 0&&!isNaN(Number(s.attributes.battery_percentage))){z=Number(s.attributes.battery_percentage);break}}z===null&&E&&(E.attributes?.battery_level!==void 0&&!isNaN(Number(E.attributes.battery_level))?z=Number(E.attributes.battery_level):isNaN(parseFloat(E.state))||(z=parseFloat(E.state))),z===null&&c.battery_last_reported_level!==void 0&&!isNaN(Number(c.battery_last_reported_level))?z=Number(c.battery_last_reported_level):z===null&&pe&&!isNaN(parseFloat(pe.state))&&(z=parseFloat(pe.state));let I;if(R){let s=t?.entities?.get(R.entity_id)||a.entities?.[R.entity_id];s?.area_id&&(I=s.area_id)}if(!I)for(let s of p){let B=t?.entities?.get(s.entity_id)||a.entities?.[s.entity_id];if(B?.area_id){I=B.area_id;break}}if(!I&&c.source_entity_id){let s=t?.entities?.get(c.source_entity_id)||a.entities?.[c.source_entity_id];s?.area_id&&(I=s.area_id)}if(!I&&E){let s=t?.entities?.get(E.entity_id)||a.entities?.[E.entity_id];s?.area_id&&(I=s.area_id)}I||(I=G?.area_id||void 0);let W=I?t?.areas?.get(I)?.name||a.areas?.[I]?.name:void 0;!W&&(c.area||c.area_name)&&(W=c.area_name||c.area);let v="";if(e.device_names&&(v=e.device_names[u]||(c.source_entity_id?e.device_names[c.source_entity_id]:"")||(!Re&&h?e.device_names[h]:"")||""),!v&&c.source_entity_id&&i[c.source_entity_id]?.attributes?.friendly_name){let s=J(i[c.source_entity_id].attributes.friendly_name);s&&!$(s)&&(v=s)}if(!v&&c.source_entity_id){let s=t?.entities?.get(c.source_entity_id)||a.entities?.[c.source_entity_id];s?.name&&!$(s.name)&&(v=s.name)}if(Re){if(!v&&R){let B=t?.entities?.get(R.entity_id)||a.entities?.[R.entity_id];B?.name&&!$(B.name)&&(v=B.name)}if(!v&&R?.attributes?.friendly_name){let B=J(R.attributes.friendly_name);B&&!$(B)&&(v=B)}if(!v&&E?.attributes?.friendly_name){let B=J(E.attributes.friendly_name);B&&!$(B)&&(v=B)}if(!v)for(let B of p){let M=B.attributes?.friendly_name;if(M){let Y=J(M);if(Y&&!$(Y)){v=Y;break}}}!v&&c.device_name&&!$(c.device_name)&&(v=c.device_name);let s=G?.name_by_user||G?.name;!v&&s&&!$(s)&&(W&&!s.toLowerCase().includes(W.toLowerCase())?v=`${s} ${W}`:u&&!$(u)?v=`${s} ${u.replace(/_/g," ").replace(/\b\w/g,B=>B.toUpperCase())}`:v=s)}else{if(!v&&G?.name_by_user&&!$(G.name_by_user)&&(v=G.name_by_user),!v&&G?.name&&!$(G.name)&&(v=G.name),!v&&c.device_name&&!$(c.device_name)&&(v=c.device_name),!v&&R){let s=t?.entities?.get(R.entity_id)||a.entities?.[R.entity_id];s?.name&&!$(s.name)&&(v=s.name)}if(!v&&E?.attributes?.friendly_name){let s=J(E.attributes.friendly_name);s&&!$(s)&&(v=s)}if(!v)for(let s of p){let B=s.attributes?.friendly_name;if(B){let M=J(B);if(M&&!$(M)){v=M;break}}}if(!v&&c.source_entity_id&&i[c.source_entity_id]?.attributes?.friendly_name){let s=J(i[c.source_entity_id].attributes.friendly_name);s&&!$(s)&&(v=s)}}if(!v&&u&&!$(u)){let s=u.toLowerCase(),B=w.toLowerCase();for(let[M,Y]of Object.entries(i))if(!p.some($e=>$e.entity_id===M)&&Y.attributes?.friendly_name){let $e=M.includes(".")?M.split(".")[1].toLowerCase():M.toLowerCase();if($e.startsWith(s)||B.length>=6&&$e.startsWith(B)){let Pe=Ot(Y.attributes.friendly_name);if(Pe&&!$(Pe)){v=Pe;break}}}}if(W&&(v?v.toLowerCase().includes(W.toLowerCase())||/^(?:smoke[_\-\s]*alarm|rauchmelder|sensor|alarm)$/i.test(v.trim())&&(v=`${W} ${v}`):v=`${W} Rauchmelder`),!v&&!$(u)&&(v=Wt(u)),$(v))continue;let ae=c.battery_type||"";!ae&&_&&_.state&&_.state!=="unknown"&&_.state!=="unavailable"&&(ae=_.state);let Le=Number(c.battery_quantity)||1,ze=c.battery_type_and_quantity||"";!ze&&ae&&(ze=Le>1?`${Le}x ${ae}`:ae);let Ze=null,Je="",he=f?.state||c.battery_last_replaced;if(he&&he!=="unavailable"&&he!=="unknown"){Je=he;let s=new Date(he);isNaN(s.getTime())||(Ze=s)}let vt=e.filter_threshold??20,wt=x?.state==="on"||c.battery_low===!0||z!==null&&z<=vt,Q=L?.entity_id;!Q&&i[`button.${u}_battery_replaced`]?Q=`button.${u}_battery_replaced`:!Q&&i[`button.${u}_batterie_ersetzt`]?Q=`button.${u}_batterie_ersetzt`:!Q&&w&&i[`button.${w}_battery_replaced`]?Q=`button.${w}_battery_replaced`:!Q&&w&&i[`button.${w}_batterie_ersetzt`]&&(Q=`button.${w}_batterie_ersetzt`);let $t=g?.state==="unavailable"||R?.state==="unavailable"||_?.state==="unavailable"||!!(c.source_entity_id&&i[c.source_entity_id]?.state==="unavailable")||E?.state==="unavailable"||pe?.state==="unavailable",xt=g?.entity_id||(c.source_entity_id&&i[c.source_entity_id]?c.source_entity_id:void 0)||E?.entity_id||R.entity_id;k.push({id:l.id,deviceId:j||h,sourceEntityId:c.source_entity_id,entityId:xt,name:v,area:W,batteryLevel:z,batteryType:ae,batteryQuantity:Le,batteryTypeAndQuantity:ze||"-",lastReplaced:Ze,lastReplacedStr:Je,lastReported:c.battery_last_reported?new Date(c.battery_last_reported):null,isLow:wt,note:c.note,buttonEntityId:Q,isUnavailable:$t,hasPlusSensor:U,state:R.state})}return k}function mt(a,e,t,i,r){let n=typeof t=="number"?t:Number(t),o=!isNaN(n)&&n>0&&typeof t!="boolean"?Math.floor(n):0,m=typeof i=="number"?i:Number(i),b=!isNaN(m)&&m>0&&typeof i!="boolean"?Math.floor(m):o>0?o:10,A=a;o>0&&(A=e>0?e:o),r&&r>0&&(A=Math.min(A,r)),A=Math.min(a,A);let S=A,k=Math.max(0,a-S),C=Math.min(b,k),T=k>0&&(!r||S<r),l=o>0&&S>o;return{effectiveLimit:A,remainingCount:k,nextStep:C,canShowMore:T,canShowLess:l}}function Ee(a){let e={...a};if(e.initial_rows!==void 0){let t=Number(e.initial_rows);typeof e.initial_rows=="boolean"||isNaN(t)||t<=0?delete e.initial_rows:e.initial_rows=Math.floor(t)}if(e.step_rows!==void 0){let t=Number(e.step_rows);typeof e.step_rows=="boolean"||isNaN(t)||t<=0?delete e.step_rows:e.step_rows=Math.floor(t)}return e.title!==void 0&&typeof e.title!="string"&&delete e.title,e.icon!==void 0&&typeof e.icon!="string"&&delete e.icon,e.sort_by!==void 0&&(["battery","name","type","last_replaced","status","area"].includes(e.sort_by)||(e.sort_by="battery")),e.show_area!==void 0&&typeof e.show_area!="boolean"&&(e.show_area=!!e.show_area),e.always_show_area!==void 0&&typeof e.always_show_area!="boolean"&&(e.always_show_area=!!e.always_show_area),e.unavailable_first!==void 0&&typeof e.unavailable_first!="boolean"&&(e.unavailable_first=!!e.unavailable_first),e.battery_plus_only!==void 0&&typeof e.battery_plus_only!="boolean"&&(e.battery_plus_only=!!e.battery_plus_only),e}function gt(a){if(a.type==="checkbox"||a.tagName==="HA-SWITCH"||a.tagName==="HA-CHECKBOX")return!!a.checked;if(a.type==="number"){let t=a.value;if(t===""||t===null||t===void 0)return;let i=Number(t);return isNaN(i)||i<=0?void 0:Math.floor(i)}let e=a.value;if(!(typeof e=="string"&&e.trim()===""))return e}var ce=class extends F{setConfig(e){this._config=Ee(e)}_valueChanged(e,t,i=!1){if(!this._config)return;let r=e.target,n=gt(r),o;if(i){let b={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{},[t]:!!n};o={...this._config,columns:b}}else o={...this._config},n===void 0?delete o[t]:o[t]=n;o.type||(o.type="custom:battery-notes-card"),this._config=o;let m=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(m)}render(){if(!this._config)return y``;let e=this.hass?.language||"en",t={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,area:!1,note:!1,actions:!0,...this._config.columns||{}};return y`
      <div class="card-config">
        <!-- Basic Settings -->
        <div class="config-row">
          <label class="label">${d("editor_title",e)}</label>
          <input
            type="text"
            class="input-text"
            .value=${typeof this._config.title=="string"?this._config.title:""}
            placeholder=${d("card_title",e)}
            @input=${i=>this._valueChanged(i,"title")}
            @change=${i=>this._valueChanged(i,"title")}
          />
        </div>

        <div class="config-row">
          <label class="label">${d("editor_icon",e)}</label>
          <input
            type="text"
            class="input-text"
            .value=${typeof this._config.icon=="string"?this._config.icon:"mdi:battery-heart-variant"}
            placeholder="mdi:battery-heart-variant"
            @input=${i=>this._valueChanged(i,"icon")}
            @change=${i=>this._valueChanged(i,"icon")}
          />
        </div>

        <!-- Sorting -->
        <div class="config-row two-col">
          <div>
            <label class="label">${d("editor_sort_by",e)}</label>
            <select
              class="input-select"
              .value=${this._config.sort_by??"battery"}
              @change=${i=>this._valueChanged(i,"sort_by")}
            >
              <option value="battery">${d("editor_col_battery",e)}</option>
              <option value="name">${d("editor_col_name",e)}</option>
              <option value="area">${d("editor_col_area",e)}</option>
              <option value="type">${d("editor_col_type",e)}</option>
              <option value="last_replaced">${d("editor_col_last_replaced",e)}</option>
              <option value="status">${d("editor_col_status",e)}</option>
            </select>
          </div>

          <div>
            <label class="label">${d("editor_sort_direction",e)}</label>
            <select
              class="input-select"
              .value=${this._config.sort_direction??"asc"}
              @change=${i=>this._valueChanged(i,"sort_direction")}
            >
              <option value="asc">Ascending (0% -> 100% / A -> Z)</option>
              <option value="desc">Descending (100% -> 0% / Z -> A)</option>
            </select>
          </div>
        </div>

        <!-- Row Limits & Pagination -->
        <div class="config-row two-col">
          <div>
            <label class="label">${d("editor_initial_rows",e)}</label>
            <input
              type="number"
              min="1"
              class="input-text"
              .value=${typeof this._config.initial_rows=="number"?String(this._config.initial_rows):""}
              placeholder="All"
              @input=${i=>this._valueChanged(i,"initial_rows")}
              @change=${i=>this._valueChanged(i,"initial_rows")}
            />
          </div>

          <div>
            <label class="label">${d("editor_step_rows",e)}</label>
            <input
              type="number"
              min="1"
              class="input-text"
              .value=${typeof this._config.step_rows=="number"?String(this._config.step_rows):""}
              placeholder="Same as initial"
              @input=${i=>this._valueChanged(i,"step_rows")}
              @change=${i=>this._valueChanged(i,"step_rows")}
            />
          </div>
        </div>

        <!-- Filters & Display Options -->
        <div class="section-title">${d("editor_show_filters",e)} & Options</div>

        <div class="toggle-grid">
          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_header??!0}
              @change=${i=>this._valueChanged(i,"show_header")}
            />
            <span>${d("editor_show_header",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_summary??!0}
              @change=${i=>this._valueChanged(i,"show_summary")}
            />
            <span>${d("editor_show_summary",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_search??!0}
              @change=${i=>this._valueChanged(i,"show_search")}
            />
            <span>${d("editor_show_search",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_filters??!0}
              @change=${i=>this._valueChanged(i,"show_filters")}
            />
            <span>${d("editor_show_filters",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.compact??!1}
              @change=${i=>this._valueChanged(i,"compact")}
            />
            <span>${d("editor_compact",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.confirm_replace??!0}
              @change=${i=>this._valueChanged(i,"confirm_replace")}
            />
            <span>${d("editor_confirm_replace",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.filter_low_only??!1}
              @change=${i=>this._valueChanged(i,"filter_low_only")}
            />
            <span>${d("editor_filter_low_only",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.hide_unavailable??!1}
              @change=${i=>this._valueChanged(i,"hide_unavailable")}
            />
            <span>${d("editor_hide_unavailable",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.unavailable_first??!1}
              @change=${i=>this._valueChanged(i,"unavailable_first")}
            />
            <span>${d("editor_unavailable_first",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.battery_plus_only??!1}
              @change=${i=>this._valueChanged(i,"battery_plus_only")}
            />
            <span>${d("editor_battery_plus_only",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_area??!0}
              @change=${i=>this._valueChanged(i,"show_area")}
            />
            <span>${d("editor_show_area",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.always_show_area??!1}
              @change=${i=>this._valueChanged(i,"always_show_area")}
            />
            <span>${d("editor_always_show_area",e)}</span>
          </label>
        </div>

        <!-- Visible Columns -->
        <div class="section-title">${d("editor_columns",e)}</div>

        <div class="toggle-grid">
          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.name}
              @change=${i=>this._valueChanged(i,"name",!0)}
            />
            <span>${d("editor_col_name",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.battery}
              @change=${i=>this._valueChanged(i,"battery",!0)}
            />
            <span>${d("editor_col_battery",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.type}
              @change=${i=>this._valueChanged(i,"type",!0)}
            />
            <span>${d("editor_col_type",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.last_replaced}
              @change=${i=>this._valueChanged(i,"last_replaced",!0)}
            />
            <span>${d("editor_col_last_replaced",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.status}
              @change=${i=>this._valueChanged(i,"status",!0)}
            />
            <span>${d("editor_col_status",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.area}
              @change=${i=>this._valueChanged(i,"area",!0)}
            />
            <span>${d("editor_col_area",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.actions}
              @change=${i=>this._valueChanged(i,"actions",!0)}
            />
            <span>${d("editor_col_actions",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.note}
              @change=${i=>this._valueChanged(i,"note",!0)}
            />
            <span>${d("editor_col_note",e)}</span>
          </label>
        </div>
      </div>
    `}static{this.styles=_e`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 8px 0;
      color: var(--primary-text-color);
    }

    .config-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .config-row.two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .section-title {
      font-weight: 600;
      font-size: 0.95rem;
      margin-top: 8px;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      color: var(--primary-text-color);
    }

    .label {
      font-size: 0.825rem;
      font-weight: 500;
      color: var(--secondary-text-color);
    }

    .input-text,
    .input-select {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 0.875rem;
      outline: none;
    }

    .input-text:focus,
    .input-select:focus {
      border-color: var(--primary-color);
    }

    .toggle-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 10px;
    }

    .toggle-label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      cursor: pointer;
      user-select: none;
    }

    .toggle-label input[type='checkbox'] {
      cursor: pointer;
      accent-color: var(--primary-color);
      width: 16px;
      height: 16px;
    }
  `}};D([ne({attribute:!1})],ce.prototype,"hass",2),D([q()],ce.prototype,"_config",2);customElements.get("battery-notes-card-editor")||customElements.define("battery-notes-card-editor",ce);var H=class extends F{constructor(){super(...arguments);this._searchQuery="";this._activeFilter="all";this._sortBy="battery";this._sortDirection="asc";this._recentlyReplaced=new Set;this._displayedRows=0;this._registriesLoaded=!1;this._registries={}}static async getConfigElement(){return document.createElement("battery-notes-card-editor")}static getStubConfig(){return{type:"custom:battery-notes-card",title:"Battery Notes",icon:"mdi:battery-heart-variant",sort_by:"battery",sort_direction:"asc",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,columns:{name:!0,area:!1,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0}}}setConfig(t){if(!t)throw new Error("Invalid configuration");let i=Ee(t);this._config={title:"Battery Notes",icon:"mdi:battery-heart-variant",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,sort_by:"battery",sort_direction:"asc",...i,columns:{name:!0,area:!1,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...i.columns||{}}},this._config.sort_by&&(this._sortBy=this._config.sort_by),this._config.sort_direction&&(this._sortDirection=this._config.sort_direction),this._config.filter_low_only&&(this._activeFilter="low"),this._config.initial_rows&&this._config.initial_rows>0?this._displayedRows=this._config.initial_rows:this._displayedRows=0}getCardSize(){return 6}static{this.styles=ft}connectedCallback(){super.connectedCallback(),this._fetchRegistries()}updated(t){super.updated(t),t.has("hass")&&!this._registriesLoaded&&this._fetchRegistries()}async _fetchRegistries(){if(!(this._registriesLoaded||!this.hass?.connection)){this._registriesLoaded=!0;try{let[t,i,r]=await Promise.all([this.hass.connection.sendMessagePromise({type:"config/entity_registry/list"}).catch(()=>[]),this.hass.connection.sendMessagePromise({type:"config/device_registry/list"}).catch(()=>[]),this.hass.connection.sendMessagePromise({type:"config/area_registry/list"}).catch(()=>[])]);this._registries={entities:t?.length?new Map(t.map(n=>[n.entity_id,n])):void 0,devices:i?.length?new Map(i.map(n=>[n.id,n])):void 0,areas:r?.length?new Map(r.map(n=>[n.area_id,n])):void 0},this.requestUpdate()}catch{}}}_getBatteryDevices(){return yt(this.hass,this._config,this._registries)}_formatRelativeTime(t,i){if(!t)return d("time_never",i);let n=new Date().getTime()-t.getTime();if(n<0)return d("time_today",i);let o=Math.floor(n/(1e3*60*60*24));return o===0?d("time_today",i):o===1?d("time_yesterday",i):o<14?d("time_days_ago",i,{n:o}):o<60?d("time_weeks_ago",i,{n:Math.floor(o/7)}):o<365?d("time_months_ago",i,{n:Math.floor(o/30)}):d("time_years_ago",i,{n:Math.floor(o/365)})}_getBatteryIcon(t){return t===null||isNaN(t)?"mdi:battery-unknown":t<=5?"mdi:battery-alert":t<=15?"mdi:battery-10":t<=25?"mdi:battery-20":t<=35?"mdi:battery-30":t<=45?"mdi:battery-40":t<=55?"mdi:battery-50":t<=65?"mdi:battery-60":t<=75?"mdi:battery-70":t<=85?"mdi:battery-80":t<=95?"mdi:battery-90":"mdi:battery"}_getLevelClass(t){return t===null||isNaN(t)?"unknown":t<=15?"critical":t<=25?"warning":t<=50?"medium":"good"}_handleSort(t){this._sortBy===t?this._sortDirection=this._sortDirection==="asc"?"desc":"asc":(this._sortBy=t,this._sortDirection="asc")}_handleOpenEntity(t){let i=new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0});this.dispatchEvent(i)}async _handleReplaceBattery(t){let i=this.hass?.language||"en";if(this._config.confirm_replace){let r=d("confirm_replace_msg",i,{name:t.name});if(!window.confirm(r))return}try{if(t.buttonEntityId&&this.hass.states[t.buttonEntityId])await this.hass.callService("button","press",{entity_id:t.buttonEntityId});else{let r={};t.sourceEntityId?r.source_entity_id=t.sourceEntityId:t.deviceId?r.device_id=t.deviceId:r.source_entity_id=t.entityId,await this.hass.callService("battery_notes","set_battery_replaced",r)}this._recentlyReplaced=new Set(this._recentlyReplaced).add(t.id),this.requestUpdate(),setTimeout(()=>{this._recentlyReplaced.delete(t.id),this._recentlyReplaced=new Set(this._recentlyReplaced),this.requestUpdate()},3e3)}catch(r){console.error("Failed to mark battery as replaced:",r),alert(`Error replacing battery: ${r instanceof Error?r.message:String(r)}`)}}_handleShowMore(t){let i=this._config.initial_rows&&this._config.initial_rows>0?this._config.initial_rows:10,r=this._displayedRows>0?this._displayedRows:i;this._displayedRows=r+t}_handleShowLess(){this._displayedRows=this._config.initial_rows&&this._config.initial_rows>0?this._config.initial_rows:0}_handleShowAll(t){this._displayedRows=t}render(){if(!this.hass)return y``;let t=this.hass.language||"en",i=this._getBatteryDevices(),r=i;this._config.battery_plus_only&&(r=r.filter(l=>l.hasPlusSensor));let n=r.length,o=r.filter(l=>l.isLow||l.isUnavailable).length,m=n-o,b=i.filter(l=>{if(this._config.hide_unavailable&&l.isUnavailable||this._config.battery_plus_only&&!l.hasPlusSensor||this._activeFilter==="low"&&!l.isLow&&!l.isUnavailable||this._activeFilter==="critical"&&!l.isUnavailable&&(l.batteryLevel===null||l.batteryLevel>10))return!1;if(this._searchQuery.trim()){let p=this._searchQuery.toLowerCase(),h=l.name.toLowerCase().includes(p),u=l.batteryTypeAndQuantity.toLowerCase().includes(p),w=l.note?.toLowerCase().includes(p)||!1,_=l.area?.toLowerCase().includes(p)||!1;if(!h&&!u&&!w&&!_)return!1}return!0});b.sort((l,p)=>{if(this._config.unavailable_first){if(l.isUnavailable&&!p.isUnavailable)return-1;if(!l.isUnavailable&&p.isUnavailable)return 1}let h=0;switch(this._sortBy){case"battery":{let _=l.batteryLevel??-1,g=p.batteryLevel??-1;h=_-g,h===0&&(h=l.name.localeCompare(p.name));break}case"name":h=l.name.localeCompare(p.name);break;case"area":{let _=l.area||"",g=p.area||"";if(!_&&g)return 1;if(_&&!g)return-1;let f=_.localeCompare(g)||l.name.localeCompare(p.name);return this._sortDirection==="asc"?f:-f}case"type":h=l.batteryTypeAndQuantity.localeCompare(p.batteryTypeAndQuantity);break;case"last_replaced":let u=l.lastReplaced?.getTime()??0,w=p.lastReplaced?.getTime()??0;h=u-w;break;case"status":{let _=x=>x.isUnavailable?0:x.isLow?1:2,g=_(l),f=_(p);if(g!==f)h=g-f;else{let x=l.batteryLevel??-1,L=p.batteryLevel??-1;h=x!==L?x-L:l.name.localeCompare(p.name)}break}}return this._sortDirection==="asc"?h:-h});let A=b.length,S=mt(A,this._displayedRows,this._config.initial_rows,this._config.step_rows,this._config.max_rows),k=b.slice(0,S.effectiveLimit),C={name:!0,area:!1,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{}},T=!!this._config.compact;return y`
      <ha-card class="${T?"compact":""}">
        <div class="card-container">
          <!-- Card Header -->
          ${this._config.show_header!==!1?y`
                <div class="card-header">
                  <div class="header-title-container">
                    <ha-icon
                      class="header-icon"
                      icon="${this._config.icon||"mdi:battery-heart-variant"}"
                    ></ha-icon>
                    <span>${this._config.title||d("card_title",t)}</span>
                  </div>

                  ${this._config.show_summary!==!1?y`
                        <div class="summary-chips">
                          <span class="chip total">
                            ${d("summary_total",t)}: ${n}
                          </span>
                          ${o>0?y`
                                <span class="chip low">
                                  ${d("summary_low",t)}: ${o}
                                </span>
                              `:""}
                          <span class="chip ok">
                            ${d("summary_ok",t)}: ${m}
                          </span>
                        </div>
                      `:""}
                </div>
              `:""}

          <!-- Controls: Search bar & Quick Filters -->
          ${this._config.show_search!==!1||this._config.show_filters!==!1?y`
                <div class="controls-row">
                  ${this._config.show_search!==!1?y`
                        <div class="search-wrapper">
                          <ha-icon class="search-icon-left" icon="mdi:magnify"></ha-icon>
                          <input
                            type="text"
                            class="search-input"
                            .value=${this._searchQuery}
                            placeholder=${d("search_placeholder",t)}
                            @input=${l=>{this._searchQuery=l.target.value,this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                          />
                          ${this._searchQuery?y`
                                <button
                                  class="search-clear-btn"
                                  @click=${()=>{this._searchQuery="",this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                                >
                                  <ha-icon icon="mdi:close-circle"></ha-icon>
                                </button>
                              `:""}
                        </div>
                      `:""}
                  ${this._config.show_filters!==!1?y`
                        <div class="filter-pills">
                          <button
                            class="filter-btn ${this._activeFilter==="all"?"active":""}"
                            @click=${()=>{this._activeFilter="all",this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                          >
                            ${d("filter_all",t)}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter==="low"?"active":""}"
                            @click=${()=>{this._activeFilter="low",this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                          >
                            ${d("filter_low",t)} ${o>0?`(${o})`:""}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter==="critical"?"active":""}"
                            @click=${()=>{this._activeFilter="critical",this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                          >
                            ${d("filter_critical",t)}
                          </button>
                        </div>
                      `:""}
                </div>
              `:""}

          <!-- Table Content -->
          ${k.length>0?y`
                <div class="table-wrapper">
                  <table class="battery-table">
                    <thead>
                      <tr>
                        ${C.name?y`
                              <th
                                class="col-name-th sortable"
                                @click=${()=>this._handleSort("name")}
                              >
                                <div class="th-content">
                                  <span>${d("col_name",t)}</span>
                                  ${this._sortBy==="name"?y`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${C.area?y`
                              <th
                                class="col-area-th sortable"
                                @click=${()=>this._handleSort("area")}
                              >
                                <div class="th-content">
                                  <span>${d("col_area",t)}</span>
                                  ${this._sortBy==="area"?y`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${C.battery?y`
                              <th
                                class="col-battery-th sortable"
                                @click=${()=>this._handleSort("battery")}>
                                <div class="th-content">
                                  <span>${d("col_battery",t)}</span>
                                  ${this._sortBy==="battery"?y`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${C.type?y`
                              <th
                                class="col-type-th sortable"
                                @click=${()=>this._handleSort("type")}
                              >
                                <div class="th-content">
                                  <span>${d("col_type",t)}</span>
                                  ${this._sortBy==="type"?y`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${C.last_replaced?y`
                              <th
                                class="col-last-replaced-th sortable"
                                @click=${()=>this._handleSort("last_replaced")}
                              >
                                <div class="th-content">
                                  <span>${d("col_last_replaced",t)}</span>
                                  ${this._sortBy==="last_replaced"?y`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${C.status?y`
                              <th
                                class="col-status-th sortable"
                                @click=${()=>this._handleSort("status")}
                              >
                                <div class="th-content">
                                  <span>${d("col_status",t)}</span>
                                  ${this._sortBy==="status"?y`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${C.note?y`<th class="col-note-th">${d("col_note",t)}</th>`:""}
                        ${C.actions?y`<th class="col-actions-th">${d("col_actions",t)}</th>`:""}
                      </tr>
                    </thead>
                    <tbody>
                      ${k.map(l=>{let p=this._getLevelClass(l.batteryLevel),h=this._recentlyReplaced.has(l.id);return y`
                          <tr class="${l.isLow?"row-low":""}">
                            <!-- Name -->
                            ${C.name?y`
                                  <td class="col-name-td">
                                    <div class="device-cell">
                                      <button
                                        class="device-name-btn"
                                        @click=${()=>this._handleOpenEntity(l.entityId)}
                                        title="${l.name}"
                                      >
                                        ${l.name}
                                      </button>
                                      ${!C.area&&this._config.show_area!==!1&&l.area&&(this._config.always_show_area||!l.name.toLowerCase().includes(l.area.toLowerCase()))?y`<span class="device-subtext"><ha-icon icon="mdi:map-marker-outline" style="--mdc-icon-size: 12px; margin-right: 2px;"></ha-icon>${l.area}</span>`:""}
                                      ${l.note&&!C.note?y`<span class="device-subtext">${l.note}</span>`:""}
                                    </div>
                                  </td>
                                `:""}

                            <!-- Area -->
                            ${C.area?y`
                                  <td class="col-area-td">
                                    ${l.area?y`
                                          <span class="area-badge">
                                            <ha-icon icon="mdi:map-marker-outline"></ha-icon>
                                            ${l.area}
                                          </span>
                                        `:y`<span class="text-muted">-</span>`}
                                  </td>
                                `:""}

                            <!-- Battery Level -->
                            ${C.battery?y`
                                  <td class="col-battery-td">
                                    <div class="battery-level-cell">
                                      <ha-icon
                                        class="battery-icon level-${p}"
                                        icon="${this._getBatteryIcon(l.batteryLevel)}"
                                      ></ha-icon>
                                      <div class="battery-bar-container">
                                        <div
                                          class="battery-bar-fill bar-${p}"
                                          style="width: ${Math.min(Math.max(l.batteryLevel??0,0),100)}%;"
                                        ></div>
                                      </div>
                                      <span class="battery-percent-text level-${p}">
                                        ${l.batteryLevel!==null?`${Math.round(l.batteryLevel)}%`:"-"}
                                      </span>
                                    </div>
                                  </td>
                                `:""}

                            <!-- Battery Type -->
                            ${C.type?y`
                                  <td class="col-type-td">
                                    <span class="type-badge">
                                      <ha-icon icon="mdi:battery-charging-outline"></ha-icon>
                                      ${l.batteryTypeAndQuantity}
                                    </span>
                                  </td>
                                `:""}

                            <!-- Last Replaced -->
                            ${C.last_replaced?y`
                                  <td class="col-last-replaced-td">
                                    <div
                                      class="last-replaced-cell"
                                      title="${l.lastReplaced?.toLocaleString()||l.lastReplacedStr||""}"
                                    >
                                      <ha-icon icon="mdi:calendar-clock"></ha-icon>
                                      <span>${this._formatRelativeTime(l.lastReplaced,t)}</span>
                                    </div>
                                  </td>
                                `:""}

                            <!-- Status -->
                            ${C.status?y`
                                  <td class="col-status-td">
                                    ${l.isUnavailable?y`<span class="status-badge unavailable"
                                          >${d("status_unavailable",t)}</span
                                        >`:l.isLow?y`<span class="status-badge low"
                                          >${d("status_low",t)}</span
                                        >`:y`<span class="status-badge ok"
                                          >${d("status_ok",t)}</span
                                        >`}
                                  </td>
                                `:""}

                            <!-- Note -->
                            ${C.note?y`
                                  <td class="col-note-td">
                                    <span class="note-text" title="${l.note||""}"
                                      >${l.note||"-"}</span
                                    >
                                  </td>
                                `:""}

                            <!-- Action -->
                            ${C.actions?y`
                                  <td class="col-actions-td">
                                    <button
                                      class="action-btn ${h?"success":""}"
                                      @click=${()=>this._handleReplaceBattery(l)}
                                      title="${d("action_mark_replaced",t)}"
                                    >
                                      <ha-icon
                                        icon="${h?"mdi:check-bold":"mdi:battery-sync"}"
                                      ></ha-icon>
                                      <span
                                        >${h?d("action_replaced",t):d("action_mark_replaced",t)}</span
                                      >
                                    </button>
                                  </td>
                                `:""}
                          </tr>
                        `})}
                    </tbody>
                  </table>
                </div>

                ${S.canShowMore||S.canShowLess?y`
                      <div class="pagination-container">
                        ${S.canShowMore?y`
                              <button
                                class="pagination-btn primary"
                                @click=${()=>this._handleShowMore(S.nextStep)}
                              >
                                <ha-icon icon="mdi:chevron-down"></ha-icon>
                                <span>
                                  ${d("show_more_remaining",t,{count:S.nextStep,remaining:S.remainingCount})}
                                </span>
                              </button>
                            `:""}
                        ${S.canShowMore&&S.remainingCount>S.nextStep?y`
                              <button
                                class="pagination-btn secondary"
                                @click=${()=>this._handleShowAll(A)}
                              >
                                <ha-icon icon="mdi:unfold-more-horizontal"></ha-icon>
                                <span>
                                  ${d("show_all",t,{count:A})}
                                </span>
                              </button>
                            `:""}
                        ${S.canShowLess?y`
                              <button
                                class="pagination-btn secondary"
                                @click=${this._handleShowLess}
                              >
                                <ha-icon icon="mdi:chevron-up"></ha-icon>
                                <span>${d("show_less",t)}</span>
                              </button>
                            `:""}
                      </div>
                    `:""}
              `:y`
                <div class="empty-state">
                  <ha-icon icon="mdi:battery-check"></ha-icon>
                  <span>
                    ${i.length===0?d("no_devices",t):d("no_results",t)}
                  </span>
                </div>
              `}
        </div>
      </ha-card>
    `}};D([ne({attribute:!1})],H.prototype,"hass",2),D([q()],H.prototype,"_config",2),D([q()],H.prototype,"_searchQuery",2),D([q()],H.prototype,"_activeFilter",2),D([q()],H.prototype,"_sortBy",2),D([q()],H.prototype,"_sortDirection",2),D([q()],H.prototype,"_recentlyReplaced",2),D([q()],H.prototype,"_displayedRows",2);customElements.get("battery-notes-card")||customElements.define("battery-notes-card",H);window.customCards=window.customCards||[];window.customCards.push({type:"battery-notes-card",name:"Battery Notes Card",description:"A customizable Lovelace table card for Home Assistant Battery Notes integration.",preview:!0,documentationURL:"https://github.com/vitals5/battery-notes-card"});})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=battery-notes-card.js.map
