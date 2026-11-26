"use strict";(()=>{var vt=Object.defineProperty;var wt=Object.getOwnPropertyDescriptor;var M=(a,e,t,i)=>{for(var r=i>1?void 0:i?wt(e,t):e,s=a.length-1,n;s>=0;s--)(n=a[s])&&(r=(i?n(e,t,r):n(r))||r);return i&&r&&vt(e,t,r),r};var ye=globalThis,be=ye.ShadowRoot&&(ye.ShadyCSS===void 0||ye.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ee=Symbol(),Ge=new WeakMap,ne=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(be&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=Ge.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ge.set(t,e))}return e}toString(){return this.cssText}},Qe=a=>new ne(typeof a=="string"?a:a+"",void 0,Ee),oe=(a,...e)=>{let t=a.length===1?a[0]:e.reduce((i,r,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+a[s+1],a[0]);return new ne(t,a,Ee)},Ve=(a,e)=>{if(be)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),r=ye.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,a.appendChild(i)}},Be=be?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Qe(t)})(a):a;var{is:$t,defineProperty:xt,getOwnPropertyDescriptor:St,getOwnPropertyNames:Ct,getOwnPropertySymbols:At,getPrototypeOf:kt}=Object,me=globalThis,Ke=me.trustedTypes,Et=Ke?Ke.emptyScript:"",Bt=me.reactiveElementPolyfillSupport,le=(a,e)=>a,ce={toAttribute(a,e){switch(e){case Boolean:a=a?Et:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},ge=(a,e)=>!$t(a,e),Ze={attribute:!0,type:String,converter:ce,reflect:!1,useDefault:!1,hasChanged:ge};Symbol.metadata??=Symbol("metadata"),me.litPropertyMetadata??=new WeakMap;var j=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ze){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&xt(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){let{get:r,set:s}=St(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){let h=r?.call(this);s?.call(this,n),this.requestUpdate(e,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ze}static _$Ei(){if(this.hasOwnProperty(le("elementProperties")))return;let e=kt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(le("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(le("properties"))){let t=this.properties,i=[...Ct(t),...At(t)];for(let r of i)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let r of i)t.unshift(Be(r))}else e!==void 0&&t.push(Be(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ve(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){let s=(i.converter?.toAttribute!==void 0?i.converter:ce).toAttribute(t,i.type);this._$Em=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){let i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let s=i.getPropertyOptions(r),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ce;this._$Em=r;let h=n.fromAttribute(t,s.type);this[r]=h??this._$Ej?.get(r)??h,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(e!==void 0){let n=this.constructor;if(r===!1&&(s=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??ge)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),s!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,s]of i){let{wrapped:n}=s,h=this[r];n!==!0||this._$AL.has(r)||h===void 0||this.C(r,void 0,s,h)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[le("elementProperties")]=new Map,j[le("finalized")]=new Map,Bt?.({ReactiveElement:j}),(me.reactiveElementVersions??=[]).push("2.1.2");var Te=globalThis,Je=a=>a,ve=Te.trustedTypes,Ye=ve?ve.createPolicy("lit-html",{createHTML:a=>a}):void 0,rt="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,st="?"+q,Nt=`<${st}>`,Z=document,pe=()=>Z.createComment(""),he=a=>a===null||typeof a!="object"&&typeof a!="function",De=Array.isArray,Rt=a=>De(a)||typeof a?.[Symbol.iterator]=="function",Ne=`[ 	
\f\r]`,de=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Xe=/-->/g,et=/>/g,V=RegExp(`>|${Ne}(?:([^\\s"'>=/]+)(${Ne}*=${Ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),tt=/'/g,it=/"/g,nt=/^(?:script|style|textarea|title)$/i,Ue=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),u=Ue(1),qt=Ue(2),Gt=Ue(3),J=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),at=new WeakMap,K=Z.createTreeWalker(Z,129);function ot(a,e){if(!De(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ye!==void 0?Ye.createHTML(e):e}var zt=(a,e)=>{let t=a.length-1,i=[],r,s=e===2?"<svg>":e===3?"<math>":"",n=de;for(let h=0;h<t;h++){let _=a[h],w,v,b=-1,d=0;for(;d<_.length&&(n.lastIndex=d,v=n.exec(_),v!==null);)d=n.lastIndex,n===de?v[1]==="!--"?n=Xe:v[1]!==void 0?n=et:v[2]!==void 0?(nt.test(v[2])&&(r=RegExp("</"+v[2],"g")),n=V):v[3]!==void 0&&(n=V):n===V?v[0]===">"?(n=r??de,b=-1):v[1]===void 0?b=-2:(b=n.lastIndex-v[2].length,w=v[1],n=v[3]===void 0?V:v[3]==='"'?it:tt):n===it||n===tt?n=V:n===Xe||n===et?n=de:(n=V,r=void 0);let m=n===V&&a[h+1].startsWith("/>")?" ":"";s+=n===de?_+Nt:b>=0?(i.push(w),_.slice(0,b)+rt+_.slice(b)+q+m):_+q+(b===-2?h:m)}return[ot(a,s+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},_e=class a{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,n=0,h=e.length-1,_=this.parts,[w,v]=zt(e,t);if(this.el=a.createElement(w,i),K.currentNode=this.el.content,t===2||t===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(r=K.nextNode())!==null&&_.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let b of r.getAttributeNames())if(b.endsWith(rt)){let d=v[n++],m=r.getAttribute(b).split(q),o=/([.?@])?(.*)/.exec(d);_.push({type:1,index:s,name:o[2],strings:m,ctor:o[1]==="."?ze:o[1]==="?"?Le:o[1]==="@"?Pe:ee}),r.removeAttribute(b)}else b.startsWith(q)&&(_.push({type:6,index:s}),r.removeAttribute(b));if(nt.test(r.tagName)){let b=r.textContent.split(q),d=b.length-1;if(d>0){r.textContent=ve?ve.emptyScript:"";for(let m=0;m<d;m++)r.append(b[m],pe()),K.nextNode(),_.push({type:2,index:++s});r.append(b[d],pe())}}}else if(r.nodeType===8)if(r.data===st)_.push({type:2,index:s});else{let b=-1;for(;(b=r.data.indexOf(q,b+1))!==-1;)_.push({type:7,index:s}),b+=q.length-1}s++}}static createElement(e,t){let i=Z.createElement("template");return i.innerHTML=e,i}};function X(a,e,t=a,i){if(e===J)return e;let r=i!==void 0?t._$Co?.[i]:t._$Cl,s=he(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(a),r._$AT(a,t,i)),i!==void 0?(t._$Co??=[])[i]=r:t._$Cl=r),r!==void 0&&(e=X(a,r._$AS(a,e.values),r,i)),e}var Re=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??Z).importNode(t,!0);K.currentNode=r;let s=K.nextNode(),n=0,h=0,_=i[0];for(;_!==void 0;){if(n===_.index){let w;_.type===2?w=new ue(s,s.nextSibling,this,e):_.type===1?w=new _.ctor(s,_.name,_.strings,this,e):_.type===6&&(w=new Me(s,this,e)),this._$AV.push(w),_=i[++h]}n!==_?.index&&(s=K.nextNode(),n++)}return K.currentNode=Z,r}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},ue=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),he(e)?e===E||e==null||e===""?(this._$AH!==E&&this._$AR(),this._$AH=E):e!==this._$AH&&e!==J&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Rt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==E&&he(this._$AH)?this._$AA.nextSibling.data=e:this.T(Z.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=_e.createElement(ot(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{let s=new Re(r,this),n=s.u(this.options);s.p(t),this.T(n),this._$AH=s}}_$AC(e){let t=at.get(e.strings);return t===void 0&&at.set(e.strings,t=new _e(e)),t}k(e){De(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,r=0;for(let s of e)r===t.length?t.push(i=new a(this.O(pe()),this.O(pe()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=Je(e).nextSibling;Je(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ee=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=E,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=E}_$AI(e,t=this,i,r){let s=this.strings,n=!1;if(s===void 0)e=X(this,e,t,0),n=!he(e)||e!==this._$AH&&e!==J,n&&(this._$AH=e);else{let h=e,_,w;for(e=s[0],_=0;_<s.length-1;_++)w=X(this,h[i+_],t,_),w===J&&(w=this._$AH[_]),n||=!he(w)||w!==this._$AH[_],w===E?e=E:e!==E&&(e+=(w??"")+s[_+1]),this._$AH[_]=w}n&&!r&&this.j(e)}j(e){e===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ze=class extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===E?void 0:e}},Le=class extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==E)}},Pe=class extends ee{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??E)===J)return;let i=this._$AH,r=e===E&&i!==E||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==E&&(i===E||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Me=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}};var Lt=Te.litHtmlPolyfillSupport;Lt?.(_e,ue),(Te.litHtmlVersions??=[]).push("3.3.3");var lt=(a,e,t)=>{let i=t?.renderBefore??e,r=i._$litPart$;if(r===void 0){let s=t?.renderBefore??null;i._$litPart$=r=new ue(e.insertBefore(pe(),s),s,void 0,t??{})}return r._$AI(a),r};var He=globalThis,H=class extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=lt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}};H._$litElement$=!0,H.finalized=!0,He.litElementHydrateSupport?.({LitElement:H});var Pt=He.litElementPolyfillSupport;Pt?.({LitElement:H});(He.litElementVersions??=[]).push("4.2.2");var Mt={attribute:!0,type:String,converter:ce,reflect:!1,hasChanged:ge},Tt=(a=Mt,e,t)=>{let{kind:i,metadata:r}=t,s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),i==="setter"&&((a=Object.create(a)).wrapped=!0),s.set(t.name,a),i==="accessor"){let{name:n}=t;return{set(h){let _=e.get.call(this);e.set.call(this,h),this.requestUpdate(n,_,a,!0,h)},init(h){return h!==void 0&&this.C(n,void 0,a,h),h}}}if(i==="setter"){let{name:n}=t;return function(h){let _=this[n];e.call(this,h),this.requestUpdate(n,_,a,!0,h)}}throw Error("Unsupported decorator location: "+i)};function te(a){return(e,t)=>typeof t=="object"?Tt(a,e,t):((i,r,s)=>{let n=r.hasOwnProperty(s);return r.constructor.createProperty(s,i),n?Object.getOwnPropertyDescriptor(r,s):void 0})(a,e,t)}function I(a){return te({...a,state:!0,attribute:!1})}var ct=oe`
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
`;var dt={en:{card_title:"Battery Notes",col_name:"Device",col_area:"Area",col_battery:"Battery",col_type:"Type",col_last_replaced:"Last Replaced",col_status:"Status",col_note:"Note",col_actions:"Actions",status_low:"Low",status_ok:"OK",status_critical:"Critical",status_unavailable:"Unavailable",action_mark_replaced:"Mark replaced",action_replaced:"Replaced",confirm_replace_title:"Confirm Battery Replacement",confirm_replace_msg:'Mark battery as replaced for "{name}"?',replaced_success:"Battery replacement recorded",search_placeholder:"Search devices, battery type...",filter_all:"All",filter_low:"Low",filter_critical:"Critical",summary_total:"Total",summary_low:"Low",summary_ok:"Good",no_devices:"No Battery Notes devices found.",no_results:"No matching devices found.",time_never:"Never",time_today:"Today",time_yesterday:"Yesterday",time_days_ago:"{n}d ago",time_weeks_ago:"{n}w ago",time_months_ago:"{n}m ago",time_years_ago:"{n}y ago",editor_title:"Title",editor_icon:"Icon",editor_show_header:"Show Header",editor_show_summary:"Show Summary Counters",editor_show_search:"Show Search Bar",editor_show_filters:"Show Quick Filter Pills",editor_compact:"Compact Layout",editor_confirm_replace:"Confirm Before Replacement",editor_sort_by:"Sort By",editor_sort_direction:"Sort Direction",editor_filter_low_only:"Show Low Battery Only",editor_filter_threshold:"Battery Threshold (%)",editor_hide_unavailable:"Hide Unavailable Devices",editor_unavailable_first:"Show unavailable devices at top",editor_battery_plus_only:"Only show devices with Battery+ sensor",editor_columns:"Visible Columns",editor_col_name:"Name",editor_col_area:"Area",editor_col_battery:"Battery Level",editor_col_type:"Battery Type",editor_col_last_replaced:"Last Replaced",editor_col_status:"Status Badge",editor_col_note:"Note",editor_col_actions:"Action Button",editor_show_area:"Show Area Subtitle",editor_always_show_area:"Always Show Area (even if in name)",show_more:"Show {count} more",show_more_remaining:"Show {count} more ({remaining} remaining)",show_less:"Show less",show_all:"Show all ({count})",editor_initial_rows:"Initial rows to show",editor_step_rows:"Rows to add per click"},de:{card_title:"Batteriest\xE4nde",col_name:"Ger\xE4t",col_area:"Bereich",col_battery:"Batterie",col_type:"Typ",col_last_replaced:"Zuletzt gewechselt",col_status:"Status",col_note:"Notiz",col_actions:"Aktionen",status_low:"Niedrig",status_ok:"OK",status_critical:"Kritisch",status_unavailable:"Nicht verf\xFCgbar",action_mark_replaced:"Als gewechselt markieren",action_replaced:"Gewechselt",confirm_replace_title:"Batteriewechsel best\xE4tigen",confirm_replace_msg:'Batterie f\xFCr "{name}" wirklich als gewechselt markieren?',replaced_success:"Batteriewechsel gespeichert",search_placeholder:"Ger\xE4t oder Batterietyp suchen...",filter_all:"Alle",filter_low:"Niedrig",filter_critical:"Kritisch",summary_total:"Gesamt",summary_low:"Niedrig",summary_ok:"In Ordnung",no_devices:"Keine Battery Notes Ger\xE4te gefunden.",no_results:"Keine passenden Ger\xE4te gefunden.",time_never:"Nie",time_today:"Heute",time_yesterday:"Gestern",time_days_ago:"Vor {n} Tagen",time_weeks_ago:"Vor {n} Wochen",time_months_ago:"Vor {n} Monaten",time_years_ago:"Vor {n} Jahren",editor_title:"Titel",editor_icon:"Icon",editor_show_header:"Kopfzeile anzeigen",editor_show_summary:"Zusammenfassung (Z\xE4hler) anzeigen",editor_show_search:"Suchleiste anzeigen",editor_show_filters:"Filter-Buttons anzeigen",editor_compact:"Kompakte Tabelle",editor_confirm_replace:"Best\xE4tigungsdialog vor Wechsel",editor_sort_by:"Sortieren nach",editor_sort_direction:"Sortierrichtung",editor_filter_low_only:"Nur schwache Batterien anzeigen",editor_filter_threshold:"Schwellenwert (%)",editor_hide_unavailable:"Nicht verf\xFCgbare ausblenden",editor_unavailable_first:"Nicht verf\xFCgbare Ger\xE4te ganz oben anzeigen",editor_battery_plus_only:"Nur Ger\xE4te mit Batterie+ Sensor anzeigen",editor_columns:"Sichtbare Spalten",editor_col_name:"Name",editor_col_area:"Bereich",editor_col_battery:"Batteriestand",editor_col_type:"Batterietyp",editor_col_last_replaced:"Zuletzt gewechselt",editor_col_status:"Status",editor_col_note:"Notiz",editor_col_actions:"Aktions-Button",editor_show_area:"Bereichs-Untertitel anzeigen",editor_always_show_area:"Bereich immer anzeigen (auch wenn im Namen)",show_more:"Weitere {count} anzeigen",show_more_remaining:"Weitere {count} anzeigen (noch {remaining})",show_less:"Weniger anzeigen",show_all:"Alle anzeigen ({count})",editor_initial_rows:"Anzahl Zeilen am Anfang",editor_step_rows:"Weitere Zeilen pro Klick"}};function c(a,e="en",t){let i=e.startsWith("de")?"de":"en",r=dt[i]?.[a]||dt.en?.[a]||a;if(t)for(let[s,n]of Object.entries(t))r=r.replace(new RegExp(`\\{${s}\\}`,"g"),String(n));return r}var Dt=new Set(["batterie fast leer","batterie-typ","batterie - typ","batterietyp","letzter batteriewechsel","batterie zuletzt ersetzt","batterie ersetzt","batterie+","batterie","batterie plus","batterie-plus","battery low","battery type","battery last replaced","battery replaced","battery+","battery","battery plus","battery-plus","battery status","batteriestatus","batterie status"]);function S(a){if(!a)return!0;let e=a.toLowerCase().trim();return!!(Dt.has(e)||/^(?:battery|batterie)[_\-\s]*(?:type|typ|low|fast[_\-\s]*leer|replaced|ersetzt|last[_\-\s]*replaced|plus|\+|status)*(?:[_\-\s]*\d+)?$/i.test(e))}function G(a){return a?a.replace(/\s*(?:[-–—:]|\()\s*(?:Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Batterie Plus|Batterie-Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery Status|Batteriestatus|Batterie Status|Batteriniveau|Batteristand|Batteri|Battery|Batterie)\s*\)?$/i,"").replace(/\s+(?:Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Batterie Plus|Batterie-Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery Status|Batteriestatus|Batterie Status|Batteriniveau|Batteristand|Batteri|Battery|Batterie)$/i,"").replace(/[\s\-_:–—()]+$/g,"").trim():""}function Ut(a){if(!a)return"";let e=G(a);if(!e)return"";let t=/(?:\s+|-)(?:Rauchalarm|Rauch|Sabotagekontakt|Sabotage|Status|State|Alarm|Detection)$/i;for(;t.test(e);){let i=e.replace(t,"").trim();if(i.length>=3&&!S(i))e=i;else break}return e}function Ht(a){if(!a)return"";let e=a.replace(/([_-])0+([1-9]\d*)\b/g,"$1$2");return e=e.replace(/([_-])(?:sbs\d+[a-f0-9]+|[a-f0-9]*[a-f][a-f0-9]{5,})/gi,""),e=e.replace(/^_+|_+$/g,"").replace(/_+/g," "),e.replace(/\b\w/g,t=>t.toUpperCase()).trim()||a}function $e(a){return(a.includes(".")?a.split(".")[1]:a).replace(/(?:_|-)(?:battery_last_replaced|letzter_batteriewechsel|batterie_zuletzt_ersetzt)$/i,"").replace(/(?:_|-)(?:battery_type|batterie_typ|batterie-typ|batterietyp|batterie_art)$/i,"").replace(/(?:_|-)(?:battery_plus_low|battery_low|batterie_fast_leer|batterie_schwach|niedriger_batteriestand)$/i,"").replace(/(?:_|-)(?:battery_replaced|batterie_ersetzt|batterie_ersetzen)$/i,"").replace(/(?:_|-)(?:battery_plus|batterie_plus|battery\+|batterie\+)$/i,"").replace(/(?:_|-)(?:battery_level|batteriestand|batterie_stand|battery|batterie)$/i,"").replace(/_battery$/,"").replace(/_batterie$/,"")}function pt(a,e){if(!a.entity_id.startsWith("sensor.")||e?.platform&&e.platform!=="battery_notes")return!1;if(e?.translation_key==="battery_type")return!0;let t=a.entity_id.toLowerCase();return t.endsWith("_battery_type")||t.endsWith("_batterie_typ")||t.endsWith("_batterie-typ")||t.endsWith("_batterie_art")||t.endsWith("_batterietyp")||t==="sensor.battery_type"||t==="sensor.batterie_typ"||/^sensor\.batterie[_\-]typ(?:_\d+)?$/i.test(t)||/^sensor\.battery[_\-]type(?:_\d+)?$/i.test(t)||a.attributes.battery_type!==void 0&&!a.attributes.device_class}function ht(a,e){if(!a.entity_id.startsWith("sensor.")||e?.platform&&e.platform!=="battery_notes")return!1;if(e?.translation_key==="battery_plus")return!0;let t=a.entity_id.toLowerCase();return t.endsWith("_battery_plus")||t.endsWith("_batterie_plus")||t.endsWith("_battery+")||t.endsWith("_batterie+")||t==="sensor.battery_plus"||t==="sensor.batterie_plus"}function Ie(a,e){if(!a.entity_id.startsWith("sensor.")||e?.platform&&e.platform!=="battery_notes")return!1;if(e?.translation_key==="battery_last_replaced")return!0;let t=a.entity_id.toLowerCase();return t.endsWith("_battery_last_replaced")||t.endsWith("_letzter_batteriewechsel")||t.endsWith("_batterie_zuletzt_ersetzt")}function Oe(a,e){if(!a.entity_id.startsWith("binary_sensor.")||e?.platform&&e.platform!=="battery_notes")return!1;if(e?.translation_key==="battery_low"||e?.translation_key==="battery_plus_low"||e?.platform==="battery_notes")return!0;let t=a.entity_id.toLowerCase();return t.endsWith("_battery_low")||t.endsWith("_battery_plus_low")||t.endsWith("_batterie_fast_leer")||t.endsWith("_batterie_schwach")||t.endsWith("_niedriger_batteriestand")}function We(a,e){if(!a.entity_id.startsWith("button.")||e?.platform&&e.platform!=="battery_notes")return!1;if(e?.translation_key==="battery_replaced")return!0;let t=a.entity_id.toLowerCase();return t.endsWith("_battery_replaced")||t.endsWith("_batterie_ersetzt")||t.endsWith("_batterie_ersetzen")}function _t(a,e,t){if(!a||!a.states)return[];let i=a.states,r=[],s=new Map,n=new Map,h=new Map;for(let[b,d]of Object.entries(i)){let m=d.attributes||{},o=t?.entities?.get(b)||a.entities?.[b];if(!(o?.platform==="battery_notes"||pt(d,o)||ht(d,o)||Ie(d,o)||Oe(d,o)||We(d,o)||m.battery_type!==void 0||m.battery_type_and_quantity!==void 0))continue;let f=o?.device_id||m.device_id,A=m.source_entity_id,z=$e(b);A&&(S(z)||!z)&&(z=$e(A)),m.device_name&&(S(z)||!z)&&(z=$e(m.device_name));let $=z,C=null,p=We(d,o)||Oe(d,o)||Ie(d,o);if(A&&n.has(A))C=n.get(A);else if($&&!S($)&&s.has($))C=s.get($);else if(f&&h.has(f)){let B=h.get(f),D=B.find(k=>S(k.baseName));D?(C=D,$&&!S($)&&(D.baseName=$,s.set($,D))):p?B.length===1?C=B[0]:C=B.find(ae=>$&&($.startsWith(ae.baseName)||ae.baseName.startsWith($)))||B[0]:S($)&&B.length===1&&(C=B[0])}C?f&&!C.deviceId&&(C.deviceId=f,h.has(f)||h.set(f,[]),h.get(f).includes(C)||h.get(f).push(C)):(C={id:f&&$&&!S($)?`dev_${f}_${$}`:f?`dev_${f}`:`base_${$}`,deviceId:f,baseName:$,entities:[]},r.push(C),f&&(h.has(f)||h.set(f,[]),h.get(f).push(C))),$&&!S($)&&!s.has($)&&s.set($,C),A&&!n.has(A)&&n.set(A,C),C.entities.push(d)}let _=[],w=new Set(e.exclude_entities||[]),v=r;if(e.entities&&e.entities.length>0){let b=new Set(e.entities.map(m=>$e(m))),d=new Set(e.entities);v=v.filter(m=>b.has(m.baseName)||m.deviceId&&d.has(m.deviceId)||m.entities.some(o=>d.has(o.entity_id)))}for(let b of v){let d=b.entities,m=b.deviceId,o=b.baseName,g=o.replace(/([_-])0*[0-9a-f]{6,}\b/i,"");if(w.has(o)||m&&w.has(m)||d.some(l=>w.has(l.entity_id)))continue;let f=d.find(l=>pt(l,t?.entities?.get(l.entity_id)||a.entities?.[l.entity_id])),A=d.find(l=>ht(l,t?.entities?.get(l.entity_id)||a.entities?.[l.entity_id])),z=d.find(l=>Ie(l,t?.entities?.get(l.entity_id)||a.entities?.[l.entity_id])),$=d.find(l=>Oe(l,t?.entities?.get(l.entity_id)||a.entities?.[l.entity_id])),C=d.find(l=>We(l,t?.entities?.get(l.entity_id)||a.entities?.[l.entity_id])),p={};for(let l of d)l.attributes&&Object.assign(p,l.attributes);let B=!!(e.entities&&e.entities.length>0),D=!!A,k=A||f||d[0];if(!A&&!f&&!B)continue;let ae=t?.entities?.get((k||d[0]).entity_id)||a.entities?.[(k||d[0]).entity_id],yt=D||!!(f&&(p.battery_type!==void 0||p.battery_type_and_quantity!==void 0||f.attributes?.battery_type!==void 0||ae?.platform==="battery_notes"))||p.battery_type!==void 0||p.battery_type_and_quantity!==void 0||ae?.platform==="battery_notes";if(!B&&!yt)continue;let N,je=[`sensor.${o}_battery`,`sensor.${o}_batterie`,`sensor.${o}_battery_level`,`sensor.${o}_batteriestand`,`sensor.${o}_batterie_stand`,`sensor.${o}`];g&&g!==o&&je.push(`sensor.${g}_battery`,`sensor.${g}_batterie`,`sensor.${g}_battery_level`,`sensor.${g}_batteriestand`,`sensor.${g}`);for(let l of je)if(i[l]){N=i[l];break}let L=m;if(!L)for(let l of d){let x=t?.entities?.get(l.entity_id)||a.entities?.[l.entity_id];if(x?.device_id){L=x.device_id;break}}if(!L&&p.source_entity_id){let l=t?.entities?.get(p.source_entity_id)||a.entities?.[p.source_entity_id];l?.device_id&&(L=l.device_id)}if(!L&&N){let l=t?.entities?.get(N.entity_id)||a.entities?.[N.entity_id];l?.device_id&&(L=l.device_id)}let O=L?t?.devices?.get(L)||a.devices?.[L]:void 0,Se=!!(m&&(h.get(m)?.length??0)>1||L&&(h.get(L)?.length??0)>1),F=null,re;if(m&&!Se){let l=t?.entities;for(let[x,R]of Object.entries(i)){if(!x.startsWith("sensor."))continue;if((l?.get(x)||a.entities?.[x])?.device_id===m&&R&&R.attributes?.device_class==="battery"){re=R;break}}}A&&!isNaN(parseFloat(A.state))?F=parseFloat(A.state):p.source_entity_id&&i[p.source_entity_id]&&!isNaN(parseFloat(i[p.source_entity_id].state))?F=parseFloat(i[p.source_entity_id].state):N&&!isNaN(parseFloat(N.state))?F=parseFloat(N.state):p.battery_last_reported_level!==void 0&&!isNaN(Number(p.battery_last_reported_level))?F=Number(p.battery_last_reported_level):re&&!isNaN(parseFloat(re.state))&&(F=parseFloat(re.state));let P;if(k){let l=t?.entities?.get(k.entity_id)||a.entities?.[k.entity_id];l?.area_id&&(P=l.area_id)}if(!P)for(let l of d){let x=t?.entities?.get(l.entity_id)||a.entities?.[l.entity_id];if(x?.area_id){P=x.area_id;break}}if(!P&&p.source_entity_id){let l=t?.entities?.get(p.source_entity_id)||a.entities?.[p.source_entity_id];l?.area_id&&(P=l.area_id)}if(!P&&N){let l=t?.entities?.get(N.entity_id)||a.entities?.[N.entity_id];l?.area_id&&(P=l.area_id)}P||(P=O?.area_id||void 0);let U=P?t?.areas?.get(P)?.name||a.areas?.[P]?.name:void 0;!U&&(p.area||p.area_name)&&(U=p.area_name||p.area);let y="";if(e.device_names&&(y=e.device_names[o]||(p.source_entity_id?e.device_names[p.source_entity_id]:"")||(!Se&&m?e.device_names[m]:"")||""),!y&&p.source_entity_id&&i[p.source_entity_id]?.attributes?.friendly_name){let l=G(i[p.source_entity_id].attributes.friendly_name);l&&!S(l)&&(y=l)}if(!y&&p.source_entity_id){let l=t?.entities?.get(p.source_entity_id)||a.entities?.[p.source_entity_id];l?.name&&!S(l.name)&&(y=l.name)}if(Se){if(!y&&k){let x=t?.entities?.get(k.entity_id)||a.entities?.[k.entity_id];x?.name&&!S(x.name)&&(y=x.name)}if(!y&&k?.attributes?.friendly_name){let x=G(k.attributes.friendly_name);x&&!S(x)&&(y=x)}if(!y&&N?.attributes?.friendly_name){let x=G(N.attributes.friendly_name);x&&!S(x)&&(y=x)}if(!y)for(let x of d){let R=x.attributes?.friendly_name;if(R){let Q=G(R);if(Q&&!S(Q)){y=Q;break}}}!y&&p.device_name&&!S(p.device_name)&&(y=p.device_name);let l=O?.name_by_user||O?.name;!y&&l&&!S(l)&&(U&&!l.toLowerCase().includes(U.toLowerCase())?y=`${l} ${U}`:o&&!S(o)?y=`${l} ${o.replace(/_/g," ").replace(/\b\w/g,x=>x.toUpperCase())}`:y=l)}else{if(!y&&O?.name_by_user&&!S(O.name_by_user)&&(y=O.name_by_user),!y&&O?.name&&!S(O.name)&&(y=O.name),!y&&p.device_name&&!S(p.device_name)&&(y=p.device_name),!y&&k){let l=t?.entities?.get(k.entity_id)||a.entities?.[k.entity_id];l?.name&&!S(l.name)&&(y=l.name)}if(!y&&N?.attributes?.friendly_name){let l=G(N.attributes.friendly_name);l&&!S(l)&&(y=l)}if(!y)for(let l of d){let x=l.attributes?.friendly_name;if(x){let R=G(x);if(R&&!S(R)){y=R;break}}}if(!y&&p.source_entity_id&&i[p.source_entity_id]?.attributes?.friendly_name){let l=G(i[p.source_entity_id].attributes.friendly_name);l&&!S(l)&&(y=l)}}if(!y&&o&&!S(o)){let l=o.toLowerCase(),x=g.toLowerCase();for(let[R,Q]of Object.entries(i))if(!d.some(fe=>fe.entity_id===R)&&Q.attributes?.friendly_name){let fe=R.includes(".")?R.split(".")[1].toLowerCase():R.toLowerCase();if(fe.startsWith(l)||x.length>=6&&fe.startsWith(x)){let ke=Ut(Q.attributes.friendly_name);if(ke&&!S(ke)){y=ke;break}}}}if(U&&(y?y.toLowerCase().includes(U.toLowerCase())||/^(?:smoke[_\-\s]*alarm|rauchmelder|sensor|alarm)$/i.test(y.trim())&&(y=`${U} ${y}`):y=`${U} Rauchmelder`),!y&&!S(o)&&(y=Ht(o)),S(y))continue;let Y=p.battery_type||"";!Y&&f&&f.state&&f.state!=="unknown"&&f.state!=="unavailable"&&(Y=f.state);let Ce=Number(p.battery_quantity)||1,Ae=p.battery_type_and_quantity||"";!Ae&&Y&&(Ae=Ce>1?`${Ce}x ${Y}`:Y);let Fe=null,qe="",se=z?.state||p.battery_last_replaced;if(se&&se!=="unavailable"&&se!=="unknown"){qe=se;let l=new Date(se);isNaN(l.getTime())||(Fe=l)}let bt=e.filter_threshold??20,mt=$?.state==="on"||p.battery_low===!0||F!==null&&F<=bt,W=C?.entity_id;!W&&i[`button.${o}_battery_replaced`]?W=`button.${o}_battery_replaced`:!W&&i[`button.${o}_batterie_ersetzt`]?W=`button.${o}_batterie_ersetzt`:!W&&g&&i[`button.${g}_battery_replaced`]?W=`button.${g}_battery_replaced`:!W&&g&&i[`button.${g}_batterie_ersetzt`]&&(W=`button.${g}_batterie_ersetzt`);let gt=A?.state==="unavailable"||k?.state==="unavailable"||f?.state==="unavailable"||!!(p.source_entity_id&&i[p.source_entity_id]?.state==="unavailable")||N?.state==="unavailable"||re?.state==="unavailable";_.push({id:b.id,deviceId:L||m,sourceEntityId:p.source_entity_id,entityId:k.entity_id,name:y,area:U,batteryLevel:F,batteryType:Y,batteryQuantity:Ce,batteryTypeAndQuantity:Ae||"-",lastReplaced:Fe,lastReplacedStr:qe,lastReported:p.battery_last_reported?new Date(p.battery_last_reported):null,isLow:mt,note:p.note,buttonEntityId:W,isUnavailable:gt,hasPlusSensor:D,state:k.state})}return _}function ut(a,e,t,i,r){let s=typeof t=="number"?t:Number(t),n=!isNaN(s)&&s>0&&typeof t!="boolean"?Math.floor(s):0,h=typeof i=="number"?i:Number(i),_=!isNaN(h)&&h>0&&typeof i!="boolean"?Math.floor(h):n>0?n:10,w=a;n>0&&(w=e>0?e:n),r&&r>0&&(w=Math.min(w,r)),w=Math.min(a,w);let v=w,b=Math.max(0,a-v),d=Math.min(_,b),m=b>0&&(!r||v<r),o=n>0&&v>n;return{effectiveLimit:w,remainingCount:b,nextStep:d,canShowMore:m,canShowLess:o}}function xe(a){let e={...a};if(e.initial_rows!==void 0){let t=Number(e.initial_rows);typeof e.initial_rows=="boolean"||isNaN(t)||t<=0?delete e.initial_rows:e.initial_rows=Math.floor(t)}if(e.step_rows!==void 0){let t=Number(e.step_rows);typeof e.step_rows=="boolean"||isNaN(t)||t<=0?delete e.step_rows:e.step_rows=Math.floor(t)}return e.title!==void 0&&typeof e.title!="string"&&delete e.title,e.icon!==void 0&&typeof e.icon!="string"&&delete e.icon,e.sort_by!==void 0&&(["battery","name","type","last_replaced","status","area"].includes(e.sort_by)||(e.sort_by="battery")),e.show_area!==void 0&&typeof e.show_area!="boolean"&&(e.show_area=!!e.show_area),e.always_show_area!==void 0&&typeof e.always_show_area!="boolean"&&(e.always_show_area=!!e.always_show_area),e.unavailable_first!==void 0&&typeof e.unavailable_first!="boolean"&&(e.unavailable_first=!!e.unavailable_first),e.battery_plus_only!==void 0&&typeof e.battery_plus_only!="boolean"&&(e.battery_plus_only=!!e.battery_plus_only),e}function ft(a){if(a.type==="checkbox"||a.tagName==="HA-SWITCH"||a.tagName==="HA-CHECKBOX")return!!a.checked;if(a.type==="number"){let t=a.value;if(t===""||t===null||t===void 0)return;let i=Number(t);return isNaN(i)||i<=0?void 0:Math.floor(i)}let e=a.value;if(!(typeof e=="string"&&e.trim()===""))return e}var ie=class extends H{setConfig(e){this._config=xe(e)}_valueChanged(e,t,i=!1){if(!this._config)return;let r=e.target,s=ft(r),n;if(i){let _={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{},[t]:!!s};n={...this._config,columns:_}}else n={...this._config},s===void 0?delete n[t]:n[t]=s;n.type||(n.type="custom:battery-notes-card"),this._config=n;let h=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(h)}render(){if(!this._config)return u``;let e=this.hass?.language||"en",t={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,area:!1,note:!1,actions:!0,...this._config.columns||{}};return u`
      <div class="card-config">
        <!-- Basic Settings -->
        <div class="config-row">
          <label class="label">${c("editor_title",e)}</label>
          <input
            type="text"
            class="input-text"
            .value=${typeof this._config.title=="string"?this._config.title:""}
            placeholder=${c("card_title",e)}
            @input=${i=>this._valueChanged(i,"title")}
            @change=${i=>this._valueChanged(i,"title")}
          />
        </div>

        <div class="config-row">
          <label class="label">${c("editor_icon",e)}</label>
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
            <label class="label">${c("editor_sort_by",e)}</label>
            <select
              class="input-select"
              .value=${this._config.sort_by??"battery"}
              @change=${i=>this._valueChanged(i,"sort_by")}
            >
              <option value="battery">${c("editor_col_battery",e)}</option>
              <option value="name">${c("editor_col_name",e)}</option>
              <option value="area">${c("editor_col_area",e)}</option>
              <option value="type">${c("editor_col_type",e)}</option>
              <option value="last_replaced">${c("editor_col_last_replaced",e)}</option>
              <option value="status">${c("editor_col_status",e)}</option>
            </select>
          </div>

          <div>
            <label class="label">${c("editor_sort_direction",e)}</label>
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
            <label class="label">${c("editor_initial_rows",e)}</label>
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
            <label class="label">${c("editor_step_rows",e)}</label>
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
        <div class="section-title">${c("editor_show_filters",e)} & Options</div>

        <div class="toggle-grid">
          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_header??!0}
              @change=${i=>this._valueChanged(i,"show_header")}
            />
            <span>${c("editor_show_header",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_summary??!0}
              @change=${i=>this._valueChanged(i,"show_summary")}
            />
            <span>${c("editor_show_summary",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_search??!0}
              @change=${i=>this._valueChanged(i,"show_search")}
            />
            <span>${c("editor_show_search",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_filters??!0}
              @change=${i=>this._valueChanged(i,"show_filters")}
            />
            <span>${c("editor_show_filters",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.compact??!1}
              @change=${i=>this._valueChanged(i,"compact")}
            />
            <span>${c("editor_compact",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.confirm_replace??!0}
              @change=${i=>this._valueChanged(i,"confirm_replace")}
            />
            <span>${c("editor_confirm_replace",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.filter_low_only??!1}
              @change=${i=>this._valueChanged(i,"filter_low_only")}
            />
            <span>${c("editor_filter_low_only",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.hide_unavailable??!1}
              @change=${i=>this._valueChanged(i,"hide_unavailable")}
            />
            <span>${c("editor_hide_unavailable",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.unavailable_first??!1}
              @change=${i=>this._valueChanged(i,"unavailable_first")}
            />
            <span>${c("editor_unavailable_first",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.battery_plus_only??!1}
              @change=${i=>this._valueChanged(i,"battery_plus_only")}
            />
            <span>${c("editor_battery_plus_only",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_area??!0}
              @change=${i=>this._valueChanged(i,"show_area")}
            />
            <span>${c("editor_show_area",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.always_show_area??!1}
              @change=${i=>this._valueChanged(i,"always_show_area")}
            />
            <span>${c("editor_always_show_area",e)}</span>
          </label>
        </div>

        <!-- Visible Columns -->
        <div class="section-title">${c("editor_columns",e)}</div>

        <div class="toggle-grid">
          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.name}
              @change=${i=>this._valueChanged(i,"name",!0)}
            />
            <span>${c("editor_col_name",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.battery}
              @change=${i=>this._valueChanged(i,"battery",!0)}
            />
            <span>${c("editor_col_battery",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.type}
              @change=${i=>this._valueChanged(i,"type",!0)}
            />
            <span>${c("editor_col_type",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.last_replaced}
              @change=${i=>this._valueChanged(i,"last_replaced",!0)}
            />
            <span>${c("editor_col_last_replaced",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.status}
              @change=${i=>this._valueChanged(i,"status",!0)}
            />
            <span>${c("editor_col_status",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.area}
              @change=${i=>this._valueChanged(i,"area",!0)}
            />
            <span>${c("editor_col_area",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.actions}
              @change=${i=>this._valueChanged(i,"actions",!0)}
            />
            <span>${c("editor_col_actions",e)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${t.note}
              @change=${i=>this._valueChanged(i,"note",!0)}
            />
            <span>${c("editor_col_note",e)}</span>
          </label>
        </div>
      </div>
    `}static{this.styles=oe`
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
  `}};M([te({attribute:!1})],ie.prototype,"hass",2),M([I()],ie.prototype,"_config",2);customElements.get("battery-notes-card-editor")||customElements.define("battery-notes-card-editor",ie);var T=class extends H{constructor(){super(...arguments);this._searchQuery="";this._activeFilter="all";this._sortBy="battery";this._sortDirection="asc";this._recentlyReplaced=new Set;this._displayedRows=0;this._registriesLoaded=!1;this._registries={}}static async getConfigElement(){return document.createElement("battery-notes-card-editor")}static getStubConfig(){return{type:"custom:battery-notes-card",title:"Battery Notes",icon:"mdi:battery-heart-variant",sort_by:"battery",sort_direction:"asc",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,columns:{name:!0,area:!1,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0}}}setConfig(t){if(!t)throw new Error("Invalid configuration");let i=xe(t);this._config={title:"Battery Notes",icon:"mdi:battery-heart-variant",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,sort_by:"battery",sort_direction:"asc",...i,columns:{name:!0,area:!1,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...i.columns||{}}},this._config.sort_by&&(this._sortBy=this._config.sort_by),this._config.sort_direction&&(this._sortDirection=this._config.sort_direction),this._config.filter_low_only&&(this._activeFilter="low"),this._config.initial_rows&&this._config.initial_rows>0?this._displayedRows=this._config.initial_rows:this._displayedRows=0}getCardSize(){return 6}static{this.styles=ct}connectedCallback(){super.connectedCallback(),this._fetchRegistries()}updated(t){super.updated(t),t.has("hass")&&!this._registriesLoaded&&this._fetchRegistries()}async _fetchRegistries(){if(!(this._registriesLoaded||!this.hass?.connection)){this._registriesLoaded=!0;try{let[t,i,r]=await Promise.all([this.hass.connection.sendMessagePromise({type:"config/entity_registry/list"}).catch(()=>[]),this.hass.connection.sendMessagePromise({type:"config/device_registry/list"}).catch(()=>[]),this.hass.connection.sendMessagePromise({type:"config/area_registry/list"}).catch(()=>[])]);this._registries={entities:t?.length?new Map(t.map(s=>[s.entity_id,s])):void 0,devices:i?.length?new Map(i.map(s=>[s.id,s])):void 0,areas:r?.length?new Map(r.map(s=>[s.area_id,s])):void 0},this.requestUpdate()}catch{}}}_getBatteryDevices(){return _t(this.hass,this._config,this._registries)}_formatRelativeTime(t,i){if(!t)return c("time_never",i);let s=new Date().getTime()-t.getTime();if(s<0)return c("time_today",i);let n=Math.floor(s/(1e3*60*60*24));return n===0?c("time_today",i):n===1?c("time_yesterday",i):n<14?c("time_days_ago",i,{n}):n<60?c("time_weeks_ago",i,{n:Math.floor(n/7)}):n<365?c("time_months_ago",i,{n:Math.floor(n/30)}):c("time_years_ago",i,{n:Math.floor(n/365)})}_getBatteryIcon(t){return t===null||isNaN(t)?"mdi:battery-unknown":t<=5?"mdi:battery-alert":t<=15?"mdi:battery-10":t<=25?"mdi:battery-20":t<=35?"mdi:battery-30":t<=45?"mdi:battery-40":t<=55?"mdi:battery-50":t<=65?"mdi:battery-60":t<=75?"mdi:battery-70":t<=85?"mdi:battery-80":t<=95?"mdi:battery-90":"mdi:battery"}_getLevelClass(t){return t===null||isNaN(t)?"unknown":t<=15?"critical":t<=25?"warning":t<=50?"medium":"good"}_handleSort(t){this._sortBy===t?this._sortDirection=this._sortDirection==="asc"?"desc":"asc":(this._sortBy=t,this._sortDirection="asc")}_handleOpenEntity(t){let i=new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0});this.dispatchEvent(i)}async _handleReplaceBattery(t){let i=this.hass?.language||"en";if(this._config.confirm_replace){let r=c("confirm_replace_msg",i,{name:t.name});if(!window.confirm(r))return}try{if(t.buttonEntityId&&this.hass.states[t.buttonEntityId])await this.hass.callService("button","press",{entity_id:t.buttonEntityId});else{let r={};t.sourceEntityId?r.source_entity_id=t.sourceEntityId:t.deviceId?r.device_id=t.deviceId:r.source_entity_id=t.entityId,await this.hass.callService("battery_notes","set_battery_replaced",r)}this._recentlyReplaced=new Set(this._recentlyReplaced).add(t.id),this.requestUpdate(),setTimeout(()=>{this._recentlyReplaced.delete(t.id),this._recentlyReplaced=new Set(this._recentlyReplaced),this.requestUpdate()},3e3)}catch(r){console.error("Failed to mark battery as replaced:",r),alert(`Error replacing battery: ${r instanceof Error?r.message:String(r)}`)}}_handleShowMore(t){let i=this._config.initial_rows&&this._config.initial_rows>0?this._config.initial_rows:10,r=this._displayedRows>0?this._displayedRows:i;this._displayedRows=r+t}_handleShowLess(){this._displayedRows=this._config.initial_rows&&this._config.initial_rows>0?this._config.initial_rows:0}_handleShowAll(t){this._displayedRows=t}render(){if(!this.hass)return u``;let t=this.hass.language||"en",i=this._getBatteryDevices(),r=i;this._config.battery_plus_only&&(r=r.filter(o=>o.hasPlusSensor));let s=r.length,n=r.filter(o=>o.isLow||o.isUnavailable).length,h=s-n,_=i.filter(o=>{if(this._config.hide_unavailable&&o.isUnavailable||this._config.battery_plus_only&&!o.hasPlusSensor||this._activeFilter==="low"&&!o.isLow&&!o.isUnavailable||this._activeFilter==="critical"&&!o.isUnavailable&&(o.batteryLevel===null||o.batteryLevel>10))return!1;if(this._searchQuery.trim()){let g=this._searchQuery.toLowerCase(),f=o.name.toLowerCase().includes(g),A=o.batteryTypeAndQuantity.toLowerCase().includes(g),z=o.note?.toLowerCase().includes(g)||!1,$=o.area?.toLowerCase().includes(g)||!1;if(!f&&!A&&!z&&!$)return!1}return!0});_.sort((o,g)=>{if(this._config.unavailable_first){if(o.isUnavailable&&!g.isUnavailable)return-1;if(!o.isUnavailable&&g.isUnavailable)return 1}let f=0;switch(this._sortBy){case"battery":{let $=o.batteryLevel??-1,C=g.batteryLevel??-1;f=$-C,f===0&&(f=o.name.localeCompare(g.name));break}case"name":f=o.name.localeCompare(g.name);break;case"area":{let $=o.area||"",C=g.area||"";if(!$&&C)return 1;if($&&!C)return-1;let p=$.localeCompare(C)||o.name.localeCompare(g.name);return this._sortDirection==="asc"?p:-p}case"type":f=o.batteryTypeAndQuantity.localeCompare(g.batteryTypeAndQuantity);break;case"last_replaced":let A=o.lastReplaced?.getTime()??0,z=g.lastReplaced?.getTime()??0;f=A-z;break;case"status":{let $=B=>B.isUnavailable?0:B.isLow?1:2,C=$(o),p=$(g);if(C!==p)f=C-p;else{let B=o.batteryLevel??-1,D=g.batteryLevel??-1;f=B!==D?B-D:o.name.localeCompare(g.name)}break}}return this._sortDirection==="asc"?f:-f});let w=_.length,v=ut(w,this._displayedRows,this._config.initial_rows,this._config.step_rows,this._config.max_rows),b=_.slice(0,v.effectiveLimit),d={name:!0,area:!1,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{}},m=!!this._config.compact;return u`
      <ha-card class="${m?"compact":""}">
        <div class="card-container">
          <!-- Card Header -->
          ${this._config.show_header!==!1?u`
                <div class="card-header">
                  <div class="header-title-container">
                    <ha-icon
                      class="header-icon"
                      icon="${this._config.icon||"mdi:battery-heart-variant"}"
                    ></ha-icon>
                    <span>${this._config.title||c("card_title",t)}</span>
                  </div>

                  ${this._config.show_summary!==!1?u`
                        <div class="summary-chips">
                          <span class="chip total">
                            ${c("summary_total",t)}: ${s}
                          </span>
                          ${n>0?u`
                                <span class="chip low">
                                  ${c("summary_low",t)}: ${n}
                                </span>
                              `:""}
                          <span class="chip ok">
                            ${c("summary_ok",t)}: ${h}
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
                            placeholder=${c("search_placeholder",t)}
                            @input=${o=>{this._searchQuery=o.target.value,this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                          />
                          ${this._searchQuery?u`
                                <button
                                  class="search-clear-btn"
                                  @click=${()=>{this._searchQuery="",this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
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
                            @click=${()=>{this._activeFilter="all",this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                          >
                            ${c("filter_all",t)}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter==="low"?"active":""}"
                            @click=${()=>{this._activeFilter="low",this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                          >
                            ${c("filter_low",t)} ${n>0?`(${n})`:""}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter==="critical"?"active":""}"
                            @click=${()=>{this._activeFilter="critical",this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                          >
                            ${c("filter_critical",t)}
                          </button>
                        </div>
                      `:""}
                </div>
              `:""}

          <!-- Table Content -->
          ${b.length>0?u`
                <div class="table-wrapper">
                  <table class="battery-table">
                    <thead>
                      <tr>
                        ${d.name?u`
                              <th
                                class="col-name-th sortable"
                                @click=${()=>this._handleSort("name")}
                              >
                                <div class="th-content">
                                  <span>${c("col_name",t)}</span>
                                  ${this._sortBy==="name"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${d.area?u`
                              <th
                                class="col-area-th sortable"
                                @click=${()=>this._handleSort("area")}
                              >
                                <div class="th-content">
                                  <span>${c("col_area",t)}</span>
                                  ${this._sortBy==="area"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${d.battery?u`
                              <th
                                class="col-battery-th sortable"
                                @click=${()=>this._handleSort("battery")}>
                                <div class="th-content">
                                  <span>${c("col_battery",t)}</span>
                                  ${this._sortBy==="battery"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${d.type?u`
                              <th
                                class="col-type-th sortable"
                                @click=${()=>this._handleSort("type")}
                              >
                                <div class="th-content">
                                  <span>${c("col_type",t)}</span>
                                  ${this._sortBy==="type"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${d.last_replaced?u`
                              <th
                                class="col-last-replaced-th sortable"
                                @click=${()=>this._handleSort("last_replaced")}
                              >
                                <div class="th-content">
                                  <span>${c("col_last_replaced",t)}</span>
                                  ${this._sortBy==="last_replaced"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${d.status?u`
                              <th
                                class="col-status-th sortable"
                                @click=${()=>this._handleSort("status")}
                              >
                                <div class="th-content">
                                  <span>${c("col_status",t)}</span>
                                  ${this._sortBy==="status"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${d.note?u`<th class="col-note-th">${c("col_note",t)}</th>`:""}
                        ${d.actions?u`<th class="col-actions-th">${c("col_actions",t)}</th>`:""}
                      </tr>
                    </thead>
                    <tbody>
                      ${b.map(o=>{let g=this._getLevelClass(o.batteryLevel),f=this._recentlyReplaced.has(o.id);return u`
                          <tr class="${o.isLow?"row-low":""}">
                            <!-- Name -->
                            ${d.name?u`
                                  <td class="col-name-td">
                                    <div class="device-cell">
                                      <button
                                        class="device-name-btn"
                                        @click=${()=>this._handleOpenEntity(o.entityId)}
                                        title="${o.name}"
                                      >
                                        ${o.name}
                                      </button>
                                      ${!d.area&&this._config.show_area!==!1&&o.area&&(this._config.always_show_area||!o.name.toLowerCase().includes(o.area.toLowerCase()))?u`<span class="device-subtext"><ha-icon icon="mdi:map-marker-outline" style="--mdc-icon-size: 12px; margin-right: 2px;"></ha-icon>${o.area}</span>`:""}
                                      ${o.note&&!d.note?u`<span class="device-subtext">${o.note}</span>`:""}
                                    </div>
                                  </td>
                                `:""}

                            <!-- Area -->
                            ${d.area?u`
                                  <td class="col-area-td">
                                    ${o.area?u`
                                          <span class="area-badge">
                                            <ha-icon icon="mdi:map-marker-outline"></ha-icon>
                                            ${o.area}
                                          </span>
                                        `:u`<span class="text-muted">-</span>`}
                                  </td>
                                `:""}

                            <!-- Battery Level -->
                            ${d.battery?u`
                                  <td class="col-battery-td">
                                    <div class="battery-level-cell">
                                      <ha-icon
                                        class="battery-icon level-${g}"
                                        icon="${this._getBatteryIcon(o.batteryLevel)}"
                                      ></ha-icon>
                                      <div class="battery-bar-container">
                                        <div
                                          class="battery-bar-fill bar-${g}"
                                          style="width: ${Math.min(Math.max(o.batteryLevel??0,0),100)}%;"
                                        ></div>
                                      </div>
                                      <span class="battery-percent-text level-${g}">
                                        ${o.batteryLevel!==null?`${Math.round(o.batteryLevel)}%`:"-"}
                                      </span>
                                    </div>
                                  </td>
                                `:""}

                            <!-- Battery Type -->
                            ${d.type?u`
                                  <td class="col-type-td">
                                    <span class="type-badge">
                                      <ha-icon icon="mdi:battery-charging-outline"></ha-icon>
                                      ${o.batteryTypeAndQuantity}
                                    </span>
                                  </td>
                                `:""}

                            <!-- Last Replaced -->
                            ${d.last_replaced?u`
                                  <td class="col-last-replaced-td">
                                    <div
                                      class="last-replaced-cell"
                                      title="${o.lastReplaced?.toLocaleString()||o.lastReplacedStr||""}"
                                    >
                                      <ha-icon icon="mdi:calendar-clock"></ha-icon>
                                      <span>${this._formatRelativeTime(o.lastReplaced,t)}</span>
                                    </div>
                                  </td>
                                `:""}

                            <!-- Status -->
                            ${d.status?u`
                                  <td class="col-status-td">
                                    ${o.isUnavailable?u`<span class="status-badge unavailable"
                                          >${c("status_unavailable",t)}</span
                                        >`:o.isLow?u`<span class="status-badge low"
                                          >${c("status_low",t)}</span
                                        >`:u`<span class="status-badge ok"
                                          >${c("status_ok",t)}</span
                                        >`}
                                  </td>
                                `:""}

                            <!-- Note -->
                            ${d.note?u`
                                  <td class="col-note-td">
                                    <span class="note-text" title="${o.note||""}"
                                      >${o.note||"-"}</span
                                    >
                                  </td>
                                `:""}

                            <!-- Action -->
                            ${d.actions?u`
                                  <td class="col-actions-td">
                                    <button
                                      class="action-btn ${f?"success":""}"
                                      @click=${()=>this._handleReplaceBattery(o)}
                                      title="${c("action_mark_replaced",t)}"
                                    >
                                      <ha-icon
                                        icon="${f?"mdi:check-bold":"mdi:battery-sync"}"
                                      ></ha-icon>
                                      <span
                                        >${f?c("action_replaced",t):c("action_mark_replaced",t)}</span
                                      >
                                    </button>
                                  </td>
                                `:""}
                          </tr>
                        `})}
                    </tbody>
                  </table>
                </div>

                ${v.canShowMore||v.canShowLess?u`
                      <div class="pagination-container">
                        ${v.canShowMore?u`
                              <button
                                class="pagination-btn primary"
                                @click=${()=>this._handleShowMore(v.nextStep)}
                              >
                                <ha-icon icon="mdi:chevron-down"></ha-icon>
                                <span>
                                  ${c("show_more_remaining",t,{count:v.nextStep,remaining:v.remainingCount})}
                                </span>
                              </button>
                            `:""}
                        ${v.canShowMore&&v.remainingCount>v.nextStep?u`
                              <button
                                class="pagination-btn secondary"
                                @click=${()=>this._handleShowAll(w)}
                              >
                                <ha-icon icon="mdi:unfold-more-horizontal"></ha-icon>
                                <span>
                                  ${c("show_all",t,{count:w})}
                                </span>
                              </button>
                            `:""}
                        ${v.canShowLess?u`
                              <button
                                class="pagination-btn secondary"
                                @click=${this._handleShowLess}
                              >
                                <ha-icon icon="mdi:chevron-up"></ha-icon>
                                <span>${c("show_less",t)}</span>
                              </button>
                            `:""}
                      </div>
                    `:""}
              `:u`
                <div class="empty-state">
                  <ha-icon icon="mdi:battery-check"></ha-icon>
                  <span>
                    ${i.length===0?c("no_devices",t):c("no_results",t)}
                  </span>
                </div>
              `}
        </div>
      </ha-card>
    `}};M([te({attribute:!1})],T.prototype,"hass",2),M([I()],T.prototype,"_config",2),M([I()],T.prototype,"_searchQuery",2),M([I()],T.prototype,"_activeFilter",2),M([I()],T.prototype,"_sortBy",2),M([I()],T.prototype,"_sortDirection",2),M([I()],T.prototype,"_recentlyReplaced",2),M([I()],T.prototype,"_displayedRows",2);customElements.get("battery-notes-card")||customElements.define("battery-notes-card",T);window.customCards=window.customCards||[];window.customCards.push({type:"battery-notes-card",name:"Battery Notes Card",description:"A customizable Lovelace table card for Home Assistant Battery Notes integration.",preview:!0,documentationURL:"https://github.com/vitals5/battery-notes-card"});})();
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
