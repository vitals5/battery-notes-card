"use strict";(()=>{var Rt=Object.defineProperty;var Tt=Object.getOwnPropertyDescriptor;var g=(i,t,e,r)=>{for(var s=r>1?void 0:r?Tt(t,e):t,o=i.length-1,n;o>=0;o--)(n=i[o])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Rt(t,e,s),s};var W=globalThis,V=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),ht=new WeakMap,O=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(V&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=ht.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&ht.set(e,t))}return t}toString(){return this.cssText}},pt=i=>new O(typeof i=="string"?i:i+"",void 0,Y),U=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((r,s,o)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[o+1],i[0]);return new O(e,i,Y)},ut=(i,t)=>{if(V)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),s=W.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,i.appendChild(r)}},X=V?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return pt(e)})(i):i;var{is:Nt,defineProperty:Lt,getOwnPropertyDescriptor:Pt,getOwnPropertyNames:It,getOwnPropertySymbols:zt,getPrototypeOf:Ot}=Object,K=globalThis,_t=K.trustedTypes,Ut=_t?_t.emptyScript:"",Dt=K.reactiveElementPolyfillSupport,D=(i,t)=>i,M={toAttribute(i,t){switch(t){case Boolean:i=i?Ut:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},G=(i,t)=>!Nt(i,t),yt={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:G};Symbol.metadata??=Symbol("metadata"),K.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=yt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&Lt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){let{get:s,set:o}=Pt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let h=s?.call(this);o?.call(this,n),this.requestUpdate(t,h,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??yt}static _$Ei(){if(this.hasOwnProperty(D("elementProperties")))return;let t=Ot(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(D("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(D("properties"))){let e=this.properties,r=[...It(e),...zt(e)];for(let s of r)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)e.unshift(X(s))}else t!==void 0&&e.push(X(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ut(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:M).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let o=r.getPropertyOptions(s),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:M;this._$Em=s;let h=n.fromAttribute(e,o.type);this[s]=h??this._$Ej?.get(s)??h,this._$Em=null}}requestUpdate(t,e,r,s=!1,o){if(t!==void 0){let n=this.constructor;if(s===!1&&(o=this[t]),r??=n.getPropertyOptions(t),!((r.hasChanged??G)(o,e)||r.useDefault&&r.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:o},n){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,o]of r){let{wrapped:n}=o,h=this[s];n!==!0||this._$AL.has(s)||h===void 0||this.C(s,void 0,o,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[D("elementProperties")]=new Map,x[D("finalized")]=new Map,Dt?.({ReactiveElement:x}),(K.reactiveElementVersions??=[]).push("2.1.2");var ot=globalThis,mt=i=>i,Z=ot.trustedTypes,ft=Z?Z.createPolicy("lit-html",{createHTML:i=>i}):void 0,xt="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,At="?"+E,Mt=`<${At}>`,T=document,q=()=>T.createComment(""),j=i=>i===null||typeof i!="object"&&typeof i!="function",nt=Array.isArray,Ht=i=>nt(i)||typeof i?.[Symbol.iterator]=="function",tt=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,gt=/>/g,B=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vt=/'/g,$t=/"/g,Et=/^(?:script|style|textarea|title)$/i,lt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),u=lt(1),Yt=lt(2),Xt=lt(3),N=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),wt=new WeakMap,R=T.createTreeWalker(T,129);function St(i,t){if(!nt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ft!==void 0?ft.createHTML(t):t}var qt=(i,t)=>{let e=i.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",n=H;for(let h=0;h<e;h++){let a=i[h],d,l,p=-1,_=0;for(;_<a.length&&(n.lastIndex=_,l=n.exec(a),l!==null);)_=n.lastIndex,n===H?l[1]==="!--"?n=bt:l[1]!==void 0?n=gt:l[2]!==void 0?(Et.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=B):l[3]!==void 0&&(n=B):n===B?l[0]===">"?(n=s??H,p=-1):l[1]===void 0?p=-2:(p=n.lastIndex-l[2].length,d=l[1],n=l[3]===void 0?B:l[3]==='"'?$t:vt):n===$t||n===vt?n=B:n===bt||n===gt?n=H:(n=B,s=void 0);let m=n===B&&i[h+1].startsWith("/>")?" ":"";o+=n===H?a+Mt:p>=0?(r.push(d),a.slice(0,p)+xt+a.slice(p)+E+m):a+E+(p===-2?h:m)}return[St(i,o+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Q=class i{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let o=0,n=0,h=t.length-1,a=this.parts,[d,l]=qt(t,e);if(this.el=i.createElement(d,r),R.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=R.nextNode())!==null&&a.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(xt)){let _=l[n++],m=s.getAttribute(p).split(E),b=/([.?@])?(.*)/.exec(_);a.push({type:1,index:o,name:b[2],strings:m,ctor:b[1]==="."?rt:b[1]==="?"?st:b[1]==="@"?it:P}),s.removeAttribute(p)}else p.startsWith(E)&&(a.push({type:6,index:o}),s.removeAttribute(p));if(Et.test(s.tagName)){let p=s.textContent.split(E),_=p.length-1;if(_>0){s.textContent=Z?Z.emptyScript:"";for(let m=0;m<_;m++)s.append(p[m],q()),R.nextNode(),a.push({type:2,index:++o});s.append(p[_],q())}}}else if(s.nodeType===8)if(s.data===At)a.push({type:2,index:o});else{let p=-1;for(;(p=s.data.indexOf(E,p+1))!==-1;)a.push({type:7,index:o}),p+=E.length-1}o++}}static createElement(t,e){let r=T.createElement("template");return r.innerHTML=t,r}};function L(i,t,e=i,r){if(t===N)return t;let s=r!==void 0?e._$Co?.[r]:e._$Cl,o=j(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(i),s._$AT(i,e,r)),r!==void 0?(e._$Co??=[])[r]=s:e._$Cl=s),s!==void 0&&(t=L(i,s._$AS(i,t.values),s,r)),t}var et=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);R.currentNode=s;let o=R.nextNode(),n=0,h=0,a=r[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new F(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new at(o,this,t)),this._$AV.push(d),a=r[++h]}n!==a?.index&&(o=R.nextNode(),n++)}return R.currentNode=T,s}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},F=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=L(this,t,e),j(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==N&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ht(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Q.createElement(St(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{let o=new et(s,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=wt.get(t.strings);return e===void 0&&wt.set(t.strings,e=new Q(t)),e}k(t){nt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,s=0;for(let o of t)s===e.length?e.push(r=new i(this.O(q()),this.O(q()),this,this.options)):r=e[s],r._$AI(o),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=mt(t).nextSibling;mt(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,o){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=f}_$AI(t,e=this,r,s){let o=this.strings,n=!1;if(o===void 0)t=L(this,t,e,0),n=!j(t)||t!==this._$AH&&t!==N,n&&(this._$AH=t);else{let h=t,a,d;for(t=o[0],a=0;a<o.length-1;a++)d=L(this,h[r+a],e,a),d===N&&(d=this._$AH[a]),n||=!j(d)||d!==this._$AH[a],d===f?t=f:t!==f&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!s&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},rt=class extends P{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}},st=class extends P{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}},it=class extends P{constructor(t,e,r,s,o){super(t,e,r,s,o),this.type=5}_$AI(t,e=this){if((t=L(this,t,e,0)??f)===N)return;let r=this._$AH,s=t===f&&r!==f||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==f&&(r===f||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},at=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){L(this,t)}};var jt=ot.litHtmlPolyfillSupport;jt?.(Q,F),(ot.litHtmlVersions??=[]).push("3.3.3");var Ct=(i,t,e)=>{let r=e?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=e?.renderBefore??null;r._$litPart$=s=new F(t.insertBefore(q(),o),o,void 0,e??{})}return s._$AI(i),s};var ct=globalThis,v=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ct(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return N}};v._$litElement$=!0,v.finalized=!0,ct.litElementHydrateSupport?.({LitElement:v});var Qt=ct.litElementPolyfillSupport;Qt?.({LitElement:v});(ct.litElementVersions??=[]).push("4.2.2");var Ft={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:G},Wt=(i=Ft,t,e)=>{let{kind:r,metadata:s}=e,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),r==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),r==="accessor"){let{name:n}=e;return{set(h){let a=t.get.call(this);t.set.call(this,h),this.requestUpdate(n,a,i,!0,h)},init(h){return h!==void 0&&this.C(n,void 0,i,h),h}}}if(r==="setter"){let{name:n}=e;return function(h){let a=this[n];t.call(this,h),this.requestUpdate(n,a,i,!0,h)}}throw Error("Unsupported decorator location: "+r)};function I(i){return(t,e)=>typeof e=="object"?Wt(i,t,e):((r,s,o)=>{let n=s.hasOwnProperty(o);return s.constructor.createProperty(o,r),n?Object.getOwnPropertyDescriptor(s,o):void 0})(i,t,e)}function A(i){return I({...i,state:!0,attribute:!1})}var kt=U`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
  }

  .card-container {
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Header */
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 4px;
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
    padding: 9px 12px;
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

  /* Cell elements */
  .device-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
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
  }

  .device-name-btn:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }

  .device-subtext {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }

  /* Battery level bar and percent */
  .battery-level-cell {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 120px;
  }

  .battery-icon {
    --mdc-icon-size: 20px;
  }

  .battery-bar-container {
    flex: 1;
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
    min-width: 38px;
    text-align: right;
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

  /* Last Replaced cell */
  .last-replaced-cell {
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    color: var(--secondary-text-color);
    font-size: 0.825rem;
  }

  .last-replaced-cell ha-icon {
    --mdc-icon-size: 16px;
  }

  /* Status badge */
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 7px;
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
    gap: 4px;
    background: var(--primary-color);
    color: var(--text-primary-color, #ffffff);
    border: none;
    border-radius: 6px;
    padding: 4px 10px;
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

  /* Responsive styling via Container Queries */
  @container (max-width: 650px) {
    .hide-on-medium {
      display: none !important;
    }
  }

  @container (max-width: 480px) {
    .hide-on-small {
      display: none !important;
    }

    .card-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .controls-row {
      flex-direction: column;
      align-items: stretch;
    }

    .battery-level-cell {
      min-width: 90px;
    }

    .battery-bar-container {
      display: none;
    }
  }
`;var Bt={en:{card_title:"Battery Notes",col_name:"Device",col_battery:"Battery",col_type:"Type",col_last_replaced:"Last Replaced",col_status:"Status",col_note:"Note",col_actions:"Actions",status_low:"Low",status_ok:"OK",status_critical:"Critical",status_unavailable:"Unavailable",action_mark_replaced:"Mark replaced",action_replaced:"Replaced",confirm_replace_title:"Confirm Battery Replacement",confirm_replace_msg:'Mark battery as replaced for "{name}"?',replaced_success:"Battery replacement recorded",search_placeholder:"Search devices, battery type...",filter_all:"All",filter_low:"Low",filter_critical:"Critical",summary_total:"Total",summary_low:"Low",summary_ok:"Good",no_devices:"No Battery Notes devices found.",no_results:"No matching devices found.",time_never:"Never",time_today:"Today",time_yesterday:"Yesterday",time_days_ago:"{n}d ago",time_weeks_ago:"{n}w ago",time_months_ago:"{n}m ago",time_years_ago:"{n}y ago",editor_title:"Title",editor_icon:"Icon",editor_show_header:"Show Header",editor_show_summary:"Show Summary Counters",editor_show_search:"Show Search Bar",editor_show_filters:"Show Quick Filter Pills",editor_compact:"Compact Layout",editor_confirm_replace:"Confirm Before Replacement",editor_sort_by:"Sort By",editor_sort_direction:"Sort Direction",editor_filter_low_only:"Show Low Battery Only",editor_filter_threshold:"Battery Threshold (%)",editor_hide_unavailable:"Hide Unavailable Devices",editor_columns:"Visible Columns",editor_col_name:"Name",editor_col_battery:"Battery Level",editor_col_type:"Battery Type",editor_col_last_replaced:"Last Replaced",editor_col_status:"Status Badge",editor_col_note:"Note",editor_col_actions:"Action Button"},de:{card_title:"Batteriest\xE4nde",col_name:"Ger\xE4t",col_battery:"Batterie",col_type:"Typ",col_last_replaced:"Zuletzt gewechselt",col_status:"Status",col_note:"Notiz",col_actions:"Aktionen",status_low:"Niedrig",status_ok:"OK",status_critical:"Kritisch",status_unavailable:"Nicht verf\xFCgbar",action_mark_replaced:"Als gewechselt markieren",action_replaced:"Gewechselt",confirm_replace_title:"Batteriewechsel best\xE4tigen",confirm_replace_msg:'Batterie f\xFCr "{name}" wirklich als gewechselt markieren?',replaced_success:"Batteriewechsel gespeichert",search_placeholder:"Ger\xE4t oder Batterietyp suchen...",filter_all:"Alle",filter_low:"Niedrig",filter_critical:"Kritisch",summary_total:"Gesamt",summary_low:"Niedrig",summary_ok:"In Ordnung",no_devices:"Keine Battery Notes Ger\xE4te gefunden.",no_results:"Keine passenden Ger\xE4te gefunden.",time_never:"Nie",time_today:"Heute",time_yesterday:"Gestern",time_days_ago:"Vor {n} Tagen",time_weeks_ago:"Vor {n} Wochen",time_months_ago:"Vor {n} Monaten",time_years_ago:"Vor {n} Jahren",editor_title:"Titel",editor_icon:"Icon",editor_show_header:"Kopfzeile anzeigen",editor_show_summary:"Zusammenfassung (Z\xE4hler) anzeigen",editor_show_search:"Suchleiste anzeigen",editor_show_filters:"Filter-Buttons anzeigen",editor_compact:"Kompakte Tabelle",editor_confirm_replace:"Best\xE4tigungsdialog vor Wechsel",editor_sort_by:"Sortieren nach",editor_sort_direction:"Sortierrichtung",editor_filter_low_only:"Nur schwache Batterien anzeigen",editor_filter_threshold:"Schwellenwert (%)",editor_hide_unavailable:"Nicht verf\xFCgbare ausblenden",editor_columns:"Sichtbare Spalten",editor_col_name:"Name",editor_col_battery:"Batteriestand",editor_col_type:"Batterietyp",editor_col_last_replaced:"Zuletzt gewechselt",editor_col_status:"Status",editor_col_note:"Notiz",editor_col_actions:"Aktions-Button"}};function c(i,t="en",e){let r=t.startsWith("de")?"de":"en",s=Bt[r]?.[i]||Bt.en?.[i]||i;if(e)for(let[o,n]of Object.entries(e))s=s.replace(new RegExp(`\\{${o}\\}`,"g"),String(n));return s}var z=class extends v{setConfig(t){this._config={...t}}_valueChanged(t,e,r=!1){if(!this._config)return;let s=t.target,o;s.type==="checkbox"||s.checked!==void 0?o=s.checked:s.value!==void 0&&(o=s.value);let n;if(r){let a={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{},[e]:!!o};n={...this._config,columns:a}}else n={...this._config,[e]:o};this._config=n;let h=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(h)}render(){if(!this._config)return u``;let t=this.hass?.language||"en",e={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{}};return u`
      <div class="card-config">
        <!-- Basic Settings -->
        <div class="config-row">
          <label class="label">${c("editor_title",t)}</label>
          <input
            type="text"
            class="input-text"
            .value=${this._config.title??""}
            placeholder=${c("card_title",t)}
            @input=${r=>this._valueChanged(r,"title")}
          />
        </div>

        <div class="config-row">
          <label class="label">${c("editor_icon",t)}</label>
          <input
            type="text"
            class="input-text"
            .value=${this._config.icon??"mdi:battery-heart-variant"}
            placeholder="mdi:battery-heart-variant"
            @input=${r=>this._valueChanged(r,"icon")}
          />
        </div>

        <!-- Sorting -->
        <div class="config-row two-col">
          <div>
            <label class="label">${c("editor_sort_by",t)}</label>
            <select
              class="input-select"
              .value=${this._config.sort_by??"battery"}
              @change=${r=>this._valueChanged(r,"sort_by")}
            >
              <option value="battery">${c("editor_col_battery",t)}</option>
              <option value="name">${c("editor_col_name",t)}</option>
              <option value="type">${c("editor_col_type",t)}</option>
              <option value="last_replaced">${c("editor_col_last_replaced",t)}</option>
              <option value="status">${c("editor_col_status",t)}</option>
            </select>
          </div>

          <div>
            <label class="label">${c("editor_sort_direction",t)}</label>
            <select
              class="input-select"
              .value=${this._config.sort_direction??"asc"}
              @change=${r=>this._valueChanged(r,"sort_direction")}
            >
              <option value="asc">Ascending (0% -> 100% / A -> Z)</option>
              <option value="desc">Descending (100% -> 0% / Z -> A)</option>
            </select>
          </div>
        </div>

        <!-- Filters & Display Options -->
        <div class="section-title">${c("editor_show_filters",t)} & Options</div>

        <div class="toggle-grid">
          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_header??!0}
              @change=${r=>this._valueChanged(r,"show_header")}
            />
            <span>${c("editor_show_header",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_summary??!0}
              @change=${r=>this._valueChanged(r,"show_summary")}
            />
            <span>${c("editor_show_summary",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_search??!0}
              @change=${r=>this._valueChanged(r,"show_search")}
            />
            <span>${c("editor_show_search",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_filters??!0}
              @change=${r=>this._valueChanged(r,"show_filters")}
            />
            <span>${c("editor_show_filters",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.compact??!1}
              @change=${r=>this._valueChanged(r,"compact")}
            />
            <span>${c("editor_compact",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.confirm_replace??!0}
              @change=${r=>this._valueChanged(r,"confirm_replace")}
            />
            <span>${c("editor_confirm_replace",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.filter_low_only??!1}
              @change=${r=>this._valueChanged(r,"filter_low_only")}
            />
            <span>${c("editor_filter_low_only",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.hide_unavailable??!1}
              @change=${r=>this._valueChanged(r,"hide_unavailable")}
            />
            <span>${c("editor_hide_unavailable",t)}</span>
          </label>
        </div>

        <!-- Visible Columns -->
        <div class="section-title">${c("editor_columns",t)}</div>

        <div class="toggle-grid">
          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.name}
              @change=${r=>this._valueChanged(r,"name",!0)}
            />
            <span>${c("editor_col_name",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.battery}
              @change=${r=>this._valueChanged(r,"battery",!0)}
            />
            <span>${c("editor_col_battery",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.type}
              @change=${r=>this._valueChanged(r,"type",!0)}
            />
            <span>${c("editor_col_type",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.last_replaced}
              @change=${r=>this._valueChanged(r,"last_replaced",!0)}
            />
            <span>${c("editor_col_last_replaced",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.status}
              @change=${r=>this._valueChanged(r,"status",!0)}
            />
            <span>${c("editor_col_status",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.actions}
              @change=${r=>this._valueChanged(r,"actions",!0)}
            />
            <span>${c("editor_col_actions",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.note}
              @change=${r=>this._valueChanged(r,"note",!0)}
            />
            <span>${c("editor_col_note",t)}</span>
          </label>
        </div>
      </div>
    `}static{this.styles=U`
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
  `}};g([I({attribute:!1})],z.prototype,"hass",2),g([A()],z.prototype,"_config",2);customElements.get("battery-notes-card-editor")||customElements.define("battery-notes-card-editor",z);var $=class extends v{constructor(){super(...arguments);this._searchQuery="";this._activeFilter="all";this._sortBy="battery";this._sortDirection="asc";this._recentlyReplaced=new Set}static async getConfigElement(){return document.createElement("battery-notes-card-editor")}static getStubConfig(){return{type:"custom:battery-notes-card",title:"Battery Notes",icon:"mdi:battery-heart-variant",sort_by:"battery",sort_direction:"asc",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,columns:{name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0}}}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={title:"Battery Notes",icon:"mdi:battery-heart-variant",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,sort_by:"battery",sort_direction:"asc",...e,columns:{name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...e.columns||{}}},this._config.sort_by&&(this._sortBy=this._config.sort_by),this._config.sort_direction&&(this._sortDirection=this._config.sort_direction),this._config.filter_low_only&&(this._activeFilter="low")}getCardSize(){return 6}static{this.styles=kt}_getBatteryDevices(){if(!this.hass||!this.hass.states)return[];let e=this.hass.states,r=new Map,s=h=>(r.has(h)||r.set(h,{relatedEntities:[]}),r.get(h));for(let[h,a]of Object.entries(e)){let d=a.attributes||{},l=h.endsWith("_battery_type"),p=h.endsWith("_battery_plus"),_=h.endsWith("_battery_last_replaced"),m=h.endsWith("_battery_low"),b=h.endsWith("_battery_replaced")&&h.startsWith("button."),S=d.battery_type!==void 0||d.battery_type_and_quantity!==void 0;if(!l&&!p&&!_&&!m&&!b&&!S)continue;let C=d.device_id||d.source_entity_id;C||(C=h.replace(/_(battery_type|battery_plus|battery_last_replaced|battery_low|battery_replaced)$/,""));let y=s(C);if(y.relatedEntities.push(a),d.device_id&&(y.deviceId=d.device_id),d.source_entity_id&&(y.sourceEntityId=d.source_entity_id),b&&(y.buttonEntityId=h),d.battery_type&&(y.batteryType=d.battery_type),d.battery_quantity&&(y.batteryQuantity=Number(d.battery_quantity)),d.battery_type_and_quantity&&(y.batteryTypeAndQuantity=d.battery_type_and_quantity),d.device_name&&(y.name=d.device_name),d.note&&(y.note=d.note),d.battery_last_replaced){y.lastReplacedStr=d.battery_last_replaced;let k=new Date(d.battery_last_replaced);isNaN(k.getTime())||(y.lastReplaced=k)}if(_&&a.state&&a.state!=="unavailable"&&a.state!=="unknown"){y.lastReplacedStr=a.state;let k=new Date(a.state);isNaN(k.getTime())||(y.lastReplaced=k)}m&&a.state==="on"&&(y.isLow=!0),d.battery_low===!0&&(y.isLow=!0),p&&!isNaN(parseFloat(a.state))&&(y.batteryLevel=parseFloat(a.state),y.entityId=h),l&&(!y.batteryType&&a.state&&a.state!=="unknown"&&a.state!=="unavailable"&&(y.batteryType=a.state),y.entityId||(y.entityId=h))}let o=[],n=new Set(this._config.exclude_entities||[]);for(let[h,a]of r.entries()){if(n.has(h))continue;let d=a.relatedEntities.find(w=>w.entity_id.endsWith("_battery_plus"))||a.relatedEntities.find(w=>w.entity_id.endsWith("_battery_type"))||a.relatedEntities[0];if(!d||n.has(d.entity_id))continue;let l=a.batteryLevel??null,p=d.state==="unavailable";if(l===null&&a.sourceEntityId&&e[a.sourceEntityId]){let w=e[a.sourceEntityId],dt=parseFloat(w.state);isNaN(dt)||(l=dt),w.state==="unavailable"&&(p=!0)}if(l===null&&d.attributes.battery_last_reported_level!==void 0){let w=Number(d.attributes.battery_last_reported_level);isNaN(w)||(l=w)}let _=a.name||d.attributes.device_name;_||(a.deviceId&&this.hass.devices&&this.hass.devices[a.deviceId]?.name?_=this.hass.devices[a.deviceId].name:a.sourceEntityId&&e[a.sourceEntityId]?.attributes.friendly_name?_=e[a.sourceEntityId].attributes.friendly_name:d.attributes.friendly_name?_=d.attributes.friendly_name.replace(/\s+(Battery Plus|Battery Type|Battery Level|Battery)$/i,"").trim():_=d.entity_id);let m=a.batteryType||d.attributes.battery_type||"",b=a.batteryQuantity||d.attributes.battery_quantity||1,S=a.batteryTypeAndQuantity||d.attributes.battery_type_and_quantity||"";!S&&m&&(S=b>1?`${b}x ${m}`:m);let C=this._config.filter_threshold??20,y=a.isLow||l!==null&&l<=C,k={id:h,deviceId:a.deviceId,sourceEntityId:a.sourceEntityId,entityId:d.entity_id,name:_||h,batteryLevel:l,batteryType:m,batteryQuantity:b,batteryTypeAndQuantity:S||"-",lastReplaced:a.lastReplaced||null,lastReplacedStr:a.lastReplacedStr||"",lastReported:a.lastReported||null,isLow:!!y,note:a.note||d.attributes.note,buttonEntityId:a.buttonEntityId,isUnavailable:p,state:d.state};o.push(k)}return o}_formatRelativeTime(e,r){if(!e)return c("time_never",r);let o=new Date().getTime()-e.getTime();if(o<0)return c("time_today",r);let n=Math.floor(o/(1e3*60*60*24));return n===0?c("time_today",r):n===1?c("time_yesterday",r):n<14?c("time_days_ago",r,{n}):n<60?c("time_weeks_ago",r,{n:Math.floor(n/7)}):n<365?c("time_months_ago",r,{n:Math.floor(n/30)}):c("time_years_ago",r,{n:Math.floor(n/365)})}_getBatteryIcon(e){return e===null||isNaN(e)?"mdi:battery-unknown":e<=5?"mdi:battery-alert":e<=15?"mdi:battery-10":e<=25?"mdi:battery-20":e<=35?"mdi:battery-30":e<=45?"mdi:battery-40":e<=55?"mdi:battery-50":e<=65?"mdi:battery-60":e<=75?"mdi:battery-70":e<=85?"mdi:battery-80":e<=95?"mdi:battery-90":"mdi:battery"}_getLevelClass(e){return e===null||isNaN(e)?"unknown":e<=15?"critical":e<=25?"warning":e<=50?"medium":"good"}_handleSort(e){this._sortBy===e?this._sortDirection=this._sortDirection==="asc"?"desc":"asc":(this._sortBy=e,this._sortDirection="asc")}_handleOpenEntity(e){let r=new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0});this.dispatchEvent(r)}async _handleReplaceBattery(e){let r=this.hass?.language||"en";if(this._config.confirm_replace){let s=c("confirm_replace_msg",r,{name:e.name});if(!window.confirm(s))return}try{if(e.buttonEntityId)await this.hass.callService("button","press",{entity_id:e.buttonEntityId});else{let s={};e.deviceId?s.device_id=e.deviceId:e.sourceEntityId?s.source_entity_id=e.sourceEntityId:s.source_entity_id=e.entityId,await this.hass.callService("battery_notes","set_battery_replaced",s)}this._recentlyReplaced=new Set(this._recentlyReplaced).add(e.id),this.requestUpdate(),setTimeout(()=>{this._recentlyReplaced.delete(e.id),this._recentlyReplaced=new Set(this._recentlyReplaced),this.requestUpdate()},3e3)}catch(s){console.error("Failed to mark battery as replaced:",s),alert(`Error replacing battery: ${s instanceof Error?s.message:String(s)}`)}}render(){if(!this.hass)return u``;let e=this.hass.language||"en",r=this._getBatteryDevices(),s=r.length,o=r.filter(l=>l.isLow).length,n=s-o,h=r.filter(l=>{if(this._config.hide_unavailable&&l.isUnavailable||this._activeFilter==="low"&&!l.isLow||this._activeFilter==="critical"&&(l.batteryLevel===null||l.batteryLevel>10))return!1;if(this._searchQuery.trim()){let p=this._searchQuery.toLowerCase(),_=l.name.toLowerCase().includes(p),m=l.batteryTypeAndQuantity.toLowerCase().includes(p),b=l.note?.toLowerCase().includes(p)||!1;if(!_&&!m&&!b)return!1}return!0});h.sort((l,p)=>{let _=0;switch(this._sortBy){case"battery":let m=l.batteryLevel??(this._sortDirection==="asc"?999:-1),b=p.batteryLevel??(this._sortDirection==="asc"?999:-1);_=m-b;break;case"name":_=l.name.localeCompare(p.name);break;case"type":_=l.batteryTypeAndQuantity.localeCompare(p.batteryTypeAndQuantity);break;case"last_replaced":let S=l.lastReplaced?.getTime()??0,C=p.lastReplaced?.getTime()??0;_=S-C;break;case"status":_=(l.isLow?0:1)-(p.isLow?0:1);break}return this._sortDirection==="asc"?_:-_}),this._config.max_rows&&this._config.max_rows>0&&(h=h.slice(0,this._config.max_rows));let a={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{}},d=!!this._config.compact;return u`
      <ha-card class="${d?"compact":""}">
        <div class="card-container">
          <!-- Card Header -->
          ${this._config.show_header!==!1?u`
                <div class="card-header">
                  <div class="header-title-container">
                    <ha-icon
                      class="header-icon"
                      icon="${this._config.icon||"mdi:battery-heart-variant"}"
                    ></ha-icon>
                    <span>${this._config.title||c("card_title",e)}</span>
                  </div>

                  ${this._config.show_summary!==!1?u`
                        <div class="summary-chips">
                          <span class="chip total">
                            ${c("summary_total",e)}: ${s}
                          </span>
                          ${o>0?u`
                                <span class="chip low">
                                  ${c("summary_low",e)}: ${o}
                                </span>
                              `:""}
                          <span class="chip ok">
                            ${c("summary_ok",e)}: ${n}
                          </span>
                        </div>
                      `:""}
                </div>
              `:""}

          <!-- Controls: Search bar & Quick Filters -->
          ${this._config.show_search!==!1||this._config.show_filters!==!1?u`
                <div class="controls-row">
                  ${this._config.show_search!==!1?u`
                        <div class="search-wrapper">
                          <ha-icon class="search-icon-left" icon="mdi:magnify"></ha-icon>
                          <input
                            type="text"
                            class="search-input"
                            .value=${this._searchQuery}
                            placeholder=${c("search_placeholder",e)}
                            @input=${l=>this._searchQuery=l.target.value}
                          />
                          ${this._searchQuery?u`
                                <button
                                  class="search-clear-btn"
                                  @click=${()=>this._searchQuery=""}
                                >
                                  <ha-icon icon="mdi:close-circle"></ha-icon>
                                </button>
                              `:""}
                        </div>
                      `:""}
                  ${this._config.show_filters!==!1?u`
                        <div class="filter-pills">
                          <button
                            class="filter-btn ${this._activeFilter==="all"?"active":""}"
                            @click=${()=>this._activeFilter="all"}
                          >
                            ${c("filter_all",e)}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter==="low"?"active":""}"
                            @click=${()=>this._activeFilter="low"}
                          >
                            ${c("filter_low",e)} ${o>0?`(${o})`:""}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter==="critical"?"active":""}"
                            @click=${()=>this._activeFilter="critical"}
                          >
                            ${c("filter_critical",e)}
                          </button>
                        </div>
                      `:""}
                </div>
              `:""}

          <!-- Table Content -->
          ${h.length>0?u`
                <div class="table-wrapper">
                  <table class="battery-table">
                    <thead>
                      <tr>
                        ${a.name?u`
                              <th class="sortable" @click=${()=>this._handleSort("name")}>
                                <div class="th-content">
                                  <span>${c("col_name",e)}</span>
                                  ${this._sortBy==="name"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${a.battery?u`
                              <th class="sortable" @click=${()=>this._handleSort("battery")}>
                                <div class="th-content">
                                  <span>${c("col_battery",e)}</span>
                                  ${this._sortBy==="battery"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${a.type?u`
                              <th class="sortable hide-on-small" @click=${()=>this._handleSort("type")}>
                                <div class="th-content">
                                  <span>${c("col_type",e)}</span>
                                  ${this._sortBy==="type"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${a.last_replaced?u`
                              <th class="sortable hide-on-medium" @click=${()=>this._handleSort("last_replaced")}>
                                <div class="th-content">
                                  <span>${c("col_last_replaced",e)}</span>
                                  ${this._sortBy==="last_replaced"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${a.status?u`
                              <th class="sortable hide-on-medium" @click=${()=>this._handleSort("status")}>
                                <div class="th-content">
                                  <span>${c("col_status",e)}</span>
                                  ${this._sortBy==="status"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${a.note?u`<th class="hide-on-medium">${c("col_note",e)}</th>`:""}
                        ${a.actions?u`<th>${c("col_actions",e)}</th>`:""}
                      </tr>
                    </thead>
                    <tbody>
                      ${h.map(l=>{let p=this._getLevelClass(l.batteryLevel),_=this._recentlyReplaced.has(l.id);return u`
                          <tr class="${l.isLow?"row-low":""}">
                            <!-- Name -->
                            ${a.name?u`
                                  <td>
                                    <div class="device-cell">
                                      <button
                                        class="device-name-btn"
                                        @click=${()=>this._handleOpenEntity(l.entityId)}
                                        title="${l.name}"
                                      >
                                        ${l.name}
                                      </button>
                                      ${l.note&&!a.note?u`<span class="device-subtext">${l.note}</span>`:""}
                                    </div>
                                  </td>
                                `:""}

                            <!-- Battery Level -->
                            ${a.battery?u`
                                  <td>
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
                            ${a.type?u`
                                  <td class="hide-on-small">
                                    <span class="type-badge">
                                      <ha-icon icon="mdi:battery-charging-outline"></ha-icon>
                                      ${l.batteryTypeAndQuantity}
                                    </span>
                                  </td>
                                `:""}

                            <!-- Last Replaced -->
                            ${a.last_replaced?u`
                                  <td class="hide-on-medium">
                                    <div
                                      class="last-replaced-cell"
                                      title="${l.lastReplaced?.toLocaleString()||l.lastReplacedStr||""}"
                                    >
                                      <ha-icon icon="mdi:calendar-clock"></ha-icon>
                                      <span>${this._formatRelativeTime(l.lastReplaced,e)}</span>
                                    </div>
                                  </td>
                                `:""}

                            <!-- Status -->
                            ${a.status?u`
                                  <td class="hide-on-medium">
                                    ${l.isUnavailable?u`<span class="status-badge unavailable">${c("status_unavailable",e)}</span>`:l.isLow?u`<span class="status-badge low">${c("status_low",e)}</span>`:u`<span class="status-badge ok">${c("status_ok",e)}</span>`}
                                  </td>
                                `:""}

                            <!-- Note -->
                            ${a.note?u`
                                  <td class="hide-on-medium">
                                    <span class="note-text" title="${l.note||""}">${l.note||"-"}</span>
                                  </td>
                                `:""}

                            <!-- Action -->
                            ${a.actions?u`
                                  <td>
                                    <button
                                      class="action-btn ${_?"success":""}"
                                      @click=${()=>this._handleReplaceBattery(l)}
                                      title="${c("action_mark_replaced",e)}"
                                    >
                                      <ha-icon
                                        icon="${_?"mdi:check-bold":"mdi:battery-sync"}"
                                      ></ha-icon>
                                      <span>${_?c("action_replaced",e):c("action_mark_replaced",e)}</span>
                                    </button>
                                  </td>
                                `:""}
                          </tr>
                        `})}
                    </tbody>
                  </table>
                </div>
              `:u`
                <div class="empty-state">
                  <ha-icon icon="mdi:battery-check"></ha-icon>
                  <span>
                    ${r.length===0?c("no_devices",e):c("no_results",e)}
                  </span>
                </div>
              `}
        </div>
      </ha-card>
    `}};g([I({attribute:!1})],$.prototype,"hass",2),g([A()],$.prototype,"_config",2),g([A()],$.prototype,"_searchQuery",2),g([A()],$.prototype,"_activeFilter",2),g([A()],$.prototype,"_sortBy",2),g([A()],$.prototype,"_sortDirection",2),g([A()],$.prototype,"_recentlyReplaced",2);customElements.get("battery-notes-card")||customElements.define("battery-notes-card",$);window.customCards=window.customCards||[];window.customCards.push({type:"battery-notes-card",name:"Battery Notes Card",description:"A customizable Lovelace table card for Home Assistant Battery Notes integration.",preview:!0,documentationURL:"https://github.com/vitals5/battery-notes-card"});})();
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
