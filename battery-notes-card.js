"use strict";(()=>{var yt=Object.defineProperty;var bt=Object.getOwnPropertyDescriptor;var N=(r,e,t,i)=>{for(var a=i>1?void 0:i?bt(e,t):e,s=r.length-1,o;s>=0;s--)(o=r[s])&&(a=(i?o(e,t,a):o(a))||a);return i&&a&&yt(e,t,a),a};var pe=globalThis,he=pe.ShadowRoot&&(pe.ShadyCSS===void 0||pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Se=Symbol(),Ie=new WeakMap,ee=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(he&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=Ie.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ie.set(t,e))}return e}toString(){return this.cssText}},Oe=r=>new ee(typeof r=="string"?r:r+"",void 0,Se),te=(r,...e)=>{let t=r.length===1?r[0]:e.reduce((i,a,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+r[s+1],r[0]);return new ee(t,r,Se)},Ue=(r,e)=>{if(he)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),a=pe.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=t.cssText,r.appendChild(i)}},Ae=he?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Oe(t)})(r):r;var{is:gt,defineProperty:mt,getOwnPropertyDescriptor:vt,getOwnPropertyNames:wt,getOwnPropertySymbols:$t,getPrototypeOf:xt}=Object,ue=globalThis,We=ue.trustedTypes,St=We?We.emptyScript:"",At=ue.reactiveElementPolyfillSupport,ie=(r,e)=>r,re={toAttribute(r,e){switch(e){case Boolean:r=r?St:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},_e=(r,e)=>!gt(r,e),je={attribute:!0,type:String,converter:re,reflect:!1,useDefault:!1,hasChanged:_e};Symbol.metadata??=Symbol("metadata"),ue.litPropertyMetadata??=new WeakMap;var T=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=je){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),a=this.getPropertyDescriptor(e,i,t);a!==void 0&&mt(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){let{get:a,set:s}=vt(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:a,set(o){let _=a?.call(this);s?.call(this,o),this.requestUpdate(e,_,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??je}static _$Ei(){if(this.hasOwnProperty(ie("elementProperties")))return;let e=xt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ie("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ie("properties"))){let t=this.properties,i=[...wt(t),...$t(t)];for(let a of i)this.createProperty(a,t[a])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,a]of t)this.elementProperties.set(i,a)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let a=this._$Eu(t,i);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let a of i)t.unshift(Ae(a))}else e!==void 0&&t.push(Ae(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ue(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(a!==void 0&&i.reflect===!0){let s=(i.converter?.toAttribute!==void 0?i.converter:re).toAttribute(t,i.type);this._$Em=e,s==null?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,t){let i=this.constructor,a=i._$Eh.get(e);if(a!==void 0&&this._$Em!==a){let s=i.getPropertyOptions(a),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:re;this._$Em=a;let _=o.fromAttribute(t,s.type);this[a]=_??this._$Ej?.get(a)??_,this._$Em=null}}requestUpdate(e,t,i,a=!1,s){if(e!==void 0){let o=this.constructor;if(a===!1&&(s=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??_e)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:s},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),s!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[a,s]of i){let{wrapped:o}=s,_=this[a];o!==!0||this._$AL.has(a)||_===void 0||this.C(a,void 0,s,_)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[ie("elementProperties")]=new Map,T[ie("finalized")]=new Map,At?.({ReactiveElement:T}),(ue.reactiveElementVersions??=[]).push("2.1.2");var ze=globalThis,qe=r=>r,fe=ze.trustedTypes,Fe=fe?fe.createPolicy("lit-html",{createHTML:r=>r}):void 0,Je="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,Ye="?"+I,Ct=`<${Ye}>`,F=document,se=()=>F.createComment(""),oe=r=>r===null||typeof r!="object"&&typeof r!="function",Le=Array.isArray,kt=r=>Le(r)||typeof r?.[Symbol.iterator]=="function",Ce=`[ 	
\f\r]`,ae=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qe=/-->/g,Ve=/>/g,j=RegExp(`>|${Ce}(?:([^\\s"'>=/]+)(${Ce}*=${Ce}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ge=/'/g,Ke=/"/g,Xe=/^(?:script|style|textarea|title)$/i,Pe=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),h=Pe(1),Ut=Pe(2),Wt=Pe(3),Q=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),Ze=new WeakMap,q=F.createTreeWalker(F,129);function et(r,e){if(!Le(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fe!==void 0?Fe.createHTML(e):e}var Et=(r,e)=>{let t=r.length-1,i=[],a,s=e===2?"<svg>":e===3?"<math>":"",o=ae;for(let _=0;_<t;_++){let p=r[_],f,m,l=-1,g=0;for(;g<p.length&&(o.lastIndex=g,m=o.exec(p),m!==null);)g=o.lastIndex,o===ae?m[1]==="!--"?o=Qe:m[1]!==void 0?o=Ve:m[2]!==void 0?(Xe.test(m[2])&&(a=RegExp("</"+m[2],"g")),o=j):m[3]!==void 0&&(o=j):o===j?m[0]===">"?(o=a??ae,l=-1):m[1]===void 0?l=-2:(l=o.lastIndex-m[2].length,f=m[1],o=m[3]===void 0?j:m[3]==='"'?Ke:Ge):o===Ke||o===Ge?o=j:o===Qe||o===Ve?o=ae:(o=j,a=void 0);let n=o===j&&r[_+1].startsWith("/>")?" ":"";s+=o===ae?p+Ct:l>=0?(i.push(f),p.slice(0,l)+Je+p.slice(l)+I+n):p+I+(l===-2?_:n)}return[et(r,s+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},ne=class r{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let s=0,o=0,_=e.length-1,p=this.parts,[f,m]=Et(e,t);if(this.el=r.createElement(f,i),q.currentNode=this.el.content,t===2||t===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(a=q.nextNode())!==null&&p.length<_;){if(a.nodeType===1){if(a.hasAttributes())for(let l of a.getAttributeNames())if(l.endsWith(Je)){let g=m[o++],n=a.getAttribute(l).split(I),y=/([.?@])?(.*)/.exec(g);p.push({type:1,index:s,name:y[2],strings:n,ctor:y[1]==="."?Ee:y[1]==="?"?Be:y[1]==="@"?Ne:K}),a.removeAttribute(l)}else l.startsWith(I)&&(p.push({type:6,index:s}),a.removeAttribute(l));if(Xe.test(a.tagName)){let l=a.textContent.split(I),g=l.length-1;if(g>0){a.textContent=fe?fe.emptyScript:"";for(let n=0;n<g;n++)a.append(l[n],se()),q.nextNode(),p.push({type:2,index:++s});a.append(l[g],se())}}}else if(a.nodeType===8)if(a.data===Ye)p.push({type:2,index:s});else{let l=-1;for(;(l=a.data.indexOf(I,l+1))!==-1;)p.push({type:7,index:s}),l+=I.length-1}s++}}static createElement(e,t){let i=F.createElement("template");return i.innerHTML=e,i}};function G(r,e,t=r,i){if(e===Q)return e;let a=i!==void 0?t._$Co?.[i]:t._$Cl,s=oe(e)?void 0:e._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),s===void 0?a=void 0:(a=new s(r),a._$AT(r,t,i)),i!==void 0?(t._$Co??=[])[i]=a:t._$Cl=a),a!==void 0&&(e=G(r,a._$AS(r,e.values),a,i)),e}var ke=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??F).importNode(t,!0);q.currentNode=a;let s=q.nextNode(),o=0,_=0,p=i[0];for(;p!==void 0;){if(o===p.index){let f;p.type===2?f=new le(s,s.nextSibling,this,e):p.type===1?f=new p.ctor(s,p.name,p.strings,this,e):p.type===6&&(f=new Re(s,this,e)),this._$AV.push(f),p=i[++_]}o!==p?.index&&(s=q.nextNode(),o++)}return q.currentNode=F,a}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},le=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),oe(e)?e===x||e==null||e===""?(this._$AH!==x&&this._$AR(),this._$AH=x):e!==this._$AH&&e!==Q&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):kt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==x&&oe(this._$AH)?this._$AA.nextSibling.data=e:this.T(F.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,a=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ne.createElement(et(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{let s=new ke(a,this),o=s.u(this.options);s.p(t),this.T(o),this._$AH=s}}_$AC(e){let t=Ze.get(e.strings);return t===void 0&&Ze.set(e.strings,t=new ne(e)),t}k(e){Le(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,a=0;for(let s of e)a===t.length?t.push(i=new r(this.O(se()),this.O(se()),this,this.options)):i=t[a],i._$AI(s),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=qe(e).nextSibling;qe(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},K=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,s){this.type=1,this._$AH=x,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=x}_$AI(e,t=this,i,a){let s=this.strings,o=!1;if(s===void 0)e=G(this,e,t,0),o=!oe(e)||e!==this._$AH&&e!==Q,o&&(this._$AH=e);else{let _=e,p,f;for(e=s[0],p=0;p<s.length-1;p++)f=G(this,_[i+p],t,p),f===Q&&(f=this._$AH[p]),o||=!oe(f)||f!==this._$AH[p],f===x?e=x:e!==x&&(e+=(f??"")+s[p+1]),this._$AH[p]=f}o&&!a&&this.j(e)}j(e){e===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ee=class extends K{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===x?void 0:e}},Be=class extends K{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==x)}},Ne=class extends K{constructor(e,t,i,a,s){super(e,t,i,a,s),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??x)===Q)return;let i=this._$AH,a=e===x&&i!==x||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==x&&(i===x||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Re=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}};var Bt=ze.litHtmlPolyfillSupport;Bt?.(ne,le),(ze.litHtmlVersions??=[]).push("3.3.3");var tt=(r,e,t)=>{let i=t?.renderBefore??e,a=i._$litPart$;if(a===void 0){let s=t?.renderBefore??null;i._$litPart$=a=new le(e.insertBefore(se(),s),s,void 0,t??{})}return a._$AI(r),a};var Me=globalThis,L=class extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=tt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Q}};L._$litElement$=!0,L.finalized=!0,Me.litElementHydrateSupport?.({LitElement:L});var Nt=Me.litElementPolyfillSupport;Nt?.({LitElement:L});(Me.litElementVersions??=[]).push("4.2.2");var Rt={attribute:!0,type:String,converter:re,reflect:!1,hasChanged:_e},zt=(r=Rt,e,t)=>{let{kind:i,metadata:a}=t,s=globalThis.litPropertyMetadata.get(a);if(s===void 0&&globalThis.litPropertyMetadata.set(a,s=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),s.set(t.name,r),i==="accessor"){let{name:o}=t;return{set(_){let p=e.get.call(this);e.set.call(this,_),this.requestUpdate(o,p,r,!0,_)},init(_){return _!==void 0&&this.C(o,void 0,r,_),_}}}if(i==="setter"){let{name:o}=t;return function(_){let p=this[o];e.call(this,_),this.requestUpdate(o,p,r,!0,_)}}throw Error("Unsupported decorator location: "+i)};function Z(r){return(e,t)=>typeof t=="object"?zt(r,e,t):((i,a,s)=>{let o=a.hasOwnProperty(s);return a.constructor.createProperty(s,i),o?Object.getOwnPropertyDescriptor(a,s):void 0})(r,e,t)}function P(r){return Z({...r,state:!0,attribute:!1})}var it=te`
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
`;var rt={en:{card_title:"Battery Notes",col_name:"Device",col_area:"Area",col_battery:"Battery",col_type:"Type",col_last_replaced:"Last Replaced",col_status:"Status",col_note:"Note",col_actions:"Actions",status_low:"Low",status_ok:"OK",status_critical:"Critical",status_unavailable:"Unavailable",action_mark_replaced:"Mark replaced",action_replaced:"Replaced",confirm_replace_title:"Confirm Battery Replacement",confirm_replace_msg:'Mark battery as replaced for "{name}"?',replaced_success:"Battery replacement recorded",search_placeholder:"Search devices, battery type...",filter_all:"All",filter_low:"Low",filter_critical:"Critical",summary_total:"Total",summary_low:"Low",summary_ok:"Good",no_devices:"No Battery Notes devices found.",no_results:"No matching devices found.",time_never:"Never",time_today:"Today",time_yesterday:"Yesterday",time_days_ago:"{n}d ago",time_weeks_ago:"{n}w ago",time_months_ago:"{n}m ago",time_years_ago:"{n}y ago",editor_title:"Title",editor_icon:"Icon",editor_show_header:"Show Header",editor_show_summary:"Show Summary Counters",editor_show_search:"Show Search Bar",editor_show_filters:"Show Quick Filter Pills",editor_compact:"Compact Layout",editor_confirm_replace:"Confirm Before Replacement",editor_sort_by:"Sort By",editor_sort_direction:"Sort Direction",editor_filter_low_only:"Show Low Battery Only",editor_filter_threshold:"Battery Threshold (%)",editor_hide_unavailable:"Hide Unavailable Devices",editor_columns:"Visible Columns",editor_col_name:"Name",editor_col_area:"Area",editor_col_battery:"Battery Level",editor_col_type:"Battery Type",editor_col_last_replaced:"Last Replaced",editor_col_status:"Status Badge",editor_col_note:"Note",editor_col_actions:"Action Button",editor_show_area:"Show Area Subtitle",editor_always_show_area:"Always Show Area (even if in name)",show_more:"Show {count} more",show_more_remaining:"Show {count} more ({remaining} remaining)",show_less:"Show less",show_all:"Show all ({count})",editor_initial_rows:"Initial rows to show",editor_step_rows:"Rows to add per click"},de:{card_title:"Batteriest\xE4nde",col_name:"Ger\xE4t",col_area:"Bereich",col_battery:"Batterie",col_type:"Typ",col_last_replaced:"Zuletzt gewechselt",col_status:"Status",col_note:"Notiz",col_actions:"Aktionen",status_low:"Niedrig",status_ok:"OK",status_critical:"Kritisch",status_unavailable:"Nicht verf\xFCgbar",action_mark_replaced:"Als gewechselt markieren",action_replaced:"Gewechselt",confirm_replace_title:"Batteriewechsel best\xE4tigen",confirm_replace_msg:'Batterie f\xFCr "{name}" wirklich als gewechselt markieren?',replaced_success:"Batteriewechsel gespeichert",search_placeholder:"Ger\xE4t oder Batterietyp suchen...",filter_all:"Alle",filter_low:"Niedrig",filter_critical:"Kritisch",summary_total:"Gesamt",summary_low:"Niedrig",summary_ok:"In Ordnung",no_devices:"Keine Battery Notes Ger\xE4te gefunden.",no_results:"Keine passenden Ger\xE4te gefunden.",time_never:"Nie",time_today:"Heute",time_yesterday:"Gestern",time_days_ago:"Vor {n} Tagen",time_weeks_ago:"Vor {n} Wochen",time_months_ago:"Vor {n} Monaten",time_years_ago:"Vor {n} Jahren",editor_title:"Titel",editor_icon:"Icon",editor_show_header:"Kopfzeile anzeigen",editor_show_summary:"Zusammenfassung (Z\xE4hler) anzeigen",editor_show_search:"Suchleiste anzeigen",editor_show_filters:"Filter-Buttons anzeigen",editor_compact:"Kompakte Tabelle",editor_confirm_replace:"Best\xE4tigungsdialog vor Wechsel",editor_sort_by:"Sortieren nach",editor_sort_direction:"Sortierrichtung",editor_filter_low_only:"Nur schwache Batterien anzeigen",editor_filter_threshold:"Schwellenwert (%)",editor_hide_unavailable:"Nicht verf\xFCgbare ausblenden",editor_columns:"Sichtbare Spalten",editor_col_name:"Name",editor_col_area:"Bereich",editor_col_battery:"Batteriestand",editor_col_type:"Batterietyp",editor_col_last_replaced:"Zuletzt gewechselt",editor_col_status:"Status",editor_col_note:"Notiz",editor_col_actions:"Aktions-Button",editor_show_area:"Bereichs-Untertitel anzeigen",editor_always_show_area:"Bereich immer anzeigen (auch wenn im Namen)",show_more:"Weitere {count} anzeigen",show_more_remaining:"Weitere {count} anzeigen (noch {remaining})",show_less:"Weniger anzeigen",show_all:"Alle anzeigen ({count})",editor_initial_rows:"Anzahl Zeilen am Anfang",editor_step_rows:"Weitere Zeilen pro Klick"}};function d(r,e="en",t){let i=e.startsWith("de")?"de":"en",a=rt[i]?.[r]||rt.en?.[r]||r;if(t)for(let[s,o]of Object.entries(t))a=a.replace(new RegExp(`\\{${s}\\}`,"g"),String(o));return a}var Lt=new Set(["batterie fast leer","batterie-typ","batterie - typ","batterietyp","letzter batteriewechsel","batterie zuletzt ersetzt","batterie ersetzt","batterie+","batterie","batterie plus","batterie-plus","battery low","battery type","battery last replaced","battery replaced","battery+","battery","battery plus","battery-plus","battery status","batteriestatus","batterie status"]);function A(r){if(!r)return!0;let e=r.toLowerCase().trim();return!!(Lt.has(e)||/^(?:battery|batterie)[_\-\s]*(?:type|typ|low|fast[_\-\s]*leer|replaced|ersetzt|last[_\-\s]*replaced|plus|\+|status)*(?:[_\-\s]*\d+)?$/i.test(e))}function ge(r){return r?r.replace(/\s*(?:[-–—:]|\()\s*(?:Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Batterie Plus|Batterie-Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery Status|Batteriestatus|Batterie Status|Battery|Batterie)\s*\)?$/i,"").replace(/\s+(?:Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Batterie Plus|Batterie-Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery Status|Batteriestatus|Batterie Status|Battery|Batterie)$/i,"").replace(/[\s\-_:–—()]+$/g,"").trim():""}function Pt(r){if(!r)return"";let e=ge(r);if(!e)return"";let t=/(?:\s+|-)(?:Rauchalarm|Rauch|Sabotagekontakt|Sabotage|Status|State|Alarm|Detection)$/i;for(;t.test(e);){let i=e.replace(t,"").trim();if(i.length>=3&&!A(i))e=i;else break}return e}function Mt(r){if(!r)return"";let e=r.replace(/([_-])0+([1-9]\d*)\b/g,"$1$2");return e=e.replace(/([_-])(?:sbs\d+[a-f0-9]+|[a-f0-9]*[a-f][a-f0-9]{5,})/gi,""),e=e.replace(/^_+|_+$/g,"").replace(/_+/g," "),e.replace(/\b\w/g,t=>t.toUpperCase()).trim()||r}function be(r){return(r.includes(".")?r.split(".")[1]:r).replace(/(?:_|-)(?:battery_last_replaced|letzter_batteriewechsel|batterie_zuletzt_ersetzt)$/i,"").replace(/(?:_|-)(?:battery_type|batterie_typ|batterie-typ|batterietyp|batterie_art)$/i,"").replace(/(?:_|-)(?:battery_plus_low|battery_low|batterie_fast_leer|batterie_schwach|niedriger_batteriestand)$/i,"").replace(/(?:_|-)(?:battery_replaced|batterie_ersetzt)$/i,"").replace(/(?:_|-)(?:battery_plus|batterie_plus|battery\+|batterie\+)$/i,"").replace(/(?:_|-)(?:battery_level|batteriestand|batterie_stand|battery|batterie)$/i,"").replace(/_battery$/,"").replace(/_batterie$/,"")}function at(r,e){if(!r.entity_id.startsWith("sensor."))return!1;if(e?.translation_key==="battery_type")return!0;let t=r.entity_id.toLowerCase();return t.endsWith("_battery_type")||t.endsWith("_batterie_typ")||t.endsWith("_batterie-typ")||t.endsWith("_batterie_art")||t.endsWith("_batterietyp")||t==="sensor.battery_type"||t==="sensor.batterie_typ"||/^sensor\.batterie[_\-]typ(?:_\d+)?$/i.test(t)||/^sensor\.battery[_\-]type(?:_\d+)?$/i.test(t)||r.attributes.battery_type!==void 0&&!r.attributes.device_class}function st(r,e){if(!r.entity_id.startsWith("sensor."))return!1;if(e?.translation_key==="battery_plus")return!0;let t=r.entity_id.toLowerCase();return t.endsWith("_battery_plus")||t.endsWith("_batterie_plus")||t.endsWith("_battery+")||t.endsWith("_batterie+")||t==="sensor.battery_plus"||t==="sensor.batterie_plus"}function ot(r,e){if(!r.entity_id.startsWith("sensor."))return!1;if(e?.translation_key==="battery_last_replaced")return!0;let t=r.entity_id.toLowerCase();return t.endsWith("_battery_last_replaced")||t.endsWith("_letzter_batteriewechsel")||t.endsWith("_batterie_zuletzt_ersetzt")}function nt(r,e){if(!r.entity_id.startsWith("binary_sensor."))return!1;if(e?.translation_key==="battery_low"||e?.translation_key==="battery_plus_low"||e?.platform==="battery_notes")return!0;let t=r.entity_id.toLowerCase();return t.endsWith("_battery_low")||t.endsWith("_battery_plus_low")||t.endsWith("_batterie_fast_leer")||t.endsWith("_batterie_schwach")||t.endsWith("_niedriger_batteriestand")}function lt(r,e){if(!r.entity_id.startsWith("button."))return!1;if(e?.translation_key==="battery_replaced")return!0;let t=r.entity_id.toLowerCase();return t.endsWith("_battery_replaced")||t.endsWith("_batterie_ersetzt")}function ct(r,e,t){if(!r||!r.states)return[];let i=r.states,a=[],s=new Map,o=new Map;for(let[m,l]of Object.entries(i)){let g=l.attributes||{},n=t?.entities?.get(m)||r.entities?.[m];if(!(n?.platform==="battery_notes"||at(l,n)||st(l,n)||ot(l,n)||nt(l,n)||lt(l,n)||g.battery_type!==void 0||g.battery_type_and_quantity!==void 0))continue;let b=n?.device_id||g.device_id,$=be(m);g.source_entity_id&&(A($)||!$)&&($=be(g.source_entity_id)),g.device_name&&(A($)||!$)&&($=be(g.device_name));let C=$,w=null;if(b&&s.has(b)?w=s.get(b):C&&!A(C)&&o.has(C)&&(w=o.get(C)),!w)w={id:b?`dev_${b}`:`base_${C}`,deviceId:b,baseName:C,entities:[]},a.push(w);else if(b&&!w.deviceId)if(s.has(b)){let O=s.get(b);O!==w&&(O.entities.push(...w.entities),a=a.filter(u=>u!==w),w=O)}else w.deviceId=b;b&&s.set(b,w),C&&!A(C)&&o.set(C,w),w.entities.push(l)}let _=[],p=new Set(e.exclude_entities||[]),f=a;if(e.entities&&e.entities.length>0){let m=new Set(e.entities.map(g=>be(g))),l=new Set(e.entities);f=f.filter(g=>m.has(g.baseName)||g.deviceId&&l.has(g.deviceId)||g.entities.some(n=>l.has(n.entity_id)))}for(let m of f){let l=m.entities,g=m.deviceId,n=m.baseName,y=n.replace(/([_-])0*[0-9a-f]{6,}\b/i,"");if(p.has(n)||g&&p.has(g)||l.some(c=>p.has(c.entity_id)))continue;let b=l.find(c=>at(c,t?.entities?.get(c.entity_id)||r.entities?.[c.entity_id])),$=l.find(c=>st(c,t?.entities?.get(c.entity_id)||r.entities?.[c.entity_id])),C=l.find(c=>ot(c,t?.entities?.get(c.entity_id)||r.entities?.[c.entity_id])),w=l.find(c=>nt(c,t?.entities?.get(c.entity_id)||r.entities?.[c.entity_id])),O=l.find(c=>lt(c,t?.entities?.get(c.entity_id)||r.entities?.[c.entity_id])),u={};for(let c of l)c.attributes&&Object.assign(u,c.attributes);let Y=!!(e.entities&&e.entities.length>0),ce=!!$,ht=!!(b&&(u.battery_type!==void 0||u.battery_type_and_quantity!==void 0||b.state&&b.state!=="unknown"&&b.state!=="unavailable"))||u.battery_type!==void 0||u.battery_type_and_quantity!==void 0||l.some(c=>(t?.entities?.get(c.entity_id)||r.entities?.[c.entity_id])?.platform==="battery_notes");if(!Y&&!ce&&!ht)continue;let D=$||b||l[0],E,Te=[`sensor.${n}_battery`,`sensor.${n}_batterie`,`sensor.${n}_battery_level`,`sensor.${n}_batteriestand`,`sensor.${n}_batterie_stand`,`sensor.${n}`];y&&y!==n&&Te.push(`sensor.${y}_battery`,`sensor.${y}_batterie`,`sensor.${y}_battery_level`,`sensor.${y}_batteriestand`,`sensor.${y}`);for(let c of Te)if(i[c]){E=i[c];break}let H=null;if($&&!isNaN(parseFloat($.state)))H=parseFloat($.state);else if(u.source_entity_id&&i[u.source_entity_id]&&!isNaN(parseFloat(i[u.source_entity_id].state)))H=parseFloat(i[u.source_entity_id].state);else if(E&&!isNaN(parseFloat(E.state)))H=parseFloat(E.state);else if(u.battery_last_reported_level!==void 0&&!isNaN(Number(u.battery_last_reported_level)))H=Number(u.battery_last_reported_level);else if(g){let c=t?.entities;for(let[S,k]of Object.entries(i)){if(!S.startsWith("sensor."))continue;if((c?.get(S)||r.entities?.[S])?.device_id===g&&k&&k.attributes?.device_class==="battery"&&!isNaN(parseFloat(k.state))){H=parseFloat(k.state);break}}}let z=g;if(!z)for(let c of l){let S=t?.entities?.get(c.entity_id)||r.entities?.[c.entity_id];if(S?.device_id){z=S.device_id;break}}if(!z&&u.source_entity_id){let c=t?.entities?.get(u.source_entity_id)||r.entities?.[u.source_entity_id];c?.device_id&&(z=c.device_id)}if(!z&&E){let c=t?.entities?.get(E.entity_id)||r.entities?.[E.entity_id];c?.device_id&&(z=c.device_id)}let U=z?t?.devices?.get(z)||r.devices?.[z]:void 0,B;if(D){let c=t?.entities?.get(D.entity_id)||r.entities?.[D.entity_id];c?.area_id&&(B=c.area_id)}if(!B)for(let c of l){let S=t?.entities?.get(c.entity_id)||r.entities?.[c.entity_id];if(S?.area_id){B=S.area_id;break}}if(B||(B=U?.area_id||void 0),!B&&u.source_entity_id){let c=t?.entities?.get(u.source_entity_id)||r.entities?.[u.source_entity_id];c?.area_id&&(B=c.area_id)}if(!B&&E){let c=t?.entities?.get(E.entity_id)||r.entities?.[E.entity_id];c?.area_id&&(B=c.area_id)}let W=B?t?.areas?.get(B)?.name||r.areas?.[B]?.name:void 0;!W&&(u.area||u.area_name)&&(W=u.area_name||u.area);let v="";if(e.device_names&&(v=e.device_names[n]||(g?e.device_names[g]:"")||""),!v&&U?.name_by_user&&!A(U.name_by_user)&&(v=U.name_by_user),!v&&U?.name&&!A(U.name)&&(v=U.name),!v&&u.device_name&&!A(u.device_name)&&(v=u.device_name),!v&&D){let c=t?.entities?.get(D.entity_id)||r.entities?.[D.entity_id];c?.name&&!A(c.name)&&(v=c.name)}if(!v&&E?.attributes?.friendly_name){let c=ge(E.attributes.friendly_name);c&&!A(c)&&(v=c)}if(!v)for(let c of l){let S=c.attributes?.friendly_name;if(S){let k=ge(S);if(k&&!A(k)){v=k;break}}}if(!v&&u.source_entity_id&&i[u.source_entity_id]?.attributes?.friendly_name){let c=ge(i[u.source_entity_id].attributes.friendly_name);c&&!A(c)&&(v=c)}if(!v&&n&&!A(n)){let c=n.toLowerCase(),S=y.toLowerCase();for(let[k,$e]of Object.entries(i))if(!l.some(de=>de.entity_id===k)&&$e.attributes?.friendly_name){let de=k.includes(".")?k.split(".")[1].toLowerCase():k.toLowerCase();if(de.startsWith(c)||S.length>=6&&de.startsWith(S)){let xe=Pt($e.attributes.friendly_name);if(xe&&!A(xe)){v=xe;break}}}}if(W&&(v?v.toLowerCase().includes(W.toLowerCase())||/^(?:smoke[_\-\s]*alarm|rauchmelder|sensor|alarm)$/i.test(v.trim())&&(v=`${W} ${v}`):v=`${W} Rauchmelder`),!v&&!A(n)&&(v=Mt(n)),A(v))continue;let V=u.battery_type||"";!V&&b&&b.state&&b.state!=="unknown"&&b.state!=="unavailable"&&(V=b.state);let ve=Number(u.battery_quantity)||1,we=u.battery_type_and_quantity||"";!we&&V&&(we=ve>1?`${ve}x ${V}`:V);let De=null,He="",X=C?.state||u.battery_last_replaced;if(X&&X!=="unavailable"&&X!=="unknown"){He=X;let c=new Date(X);isNaN(c.getTime())||(De=c)}let ut=e.filter_threshold??20,_t=w?.state==="on"||u.battery_low===!0||H!==null&&H<=ut,M=O?.entity_id;!M&&i[`button.${n}_battery_replaced`]?M=`button.${n}_battery_replaced`:!M&&i[`button.${n}_batterie_ersetzt`]?M=`button.${n}_batterie_ersetzt`:!M&&y&&i[`button.${y}_battery_replaced`]?M=`button.${y}_battery_replaced`:!M&&y&&i[`button.${y}_batterie_ersetzt`]&&(M=`button.${y}_batterie_ersetzt`);let ft=b?.state==="unavailable"||$?.state==="unavailable";_.push({id:m.id,deviceId:z||g,sourceEntityId:u.source_entity_id,entityId:D.entity_id,name:v,area:W,batteryLevel:H,batteryType:V,batteryQuantity:ve,batteryTypeAndQuantity:we||"-",lastReplaced:De,lastReplacedStr:He,lastReported:u.battery_last_reported?new Date(u.battery_last_reported):null,isLow:_t,note:u.note,buttonEntityId:M,isUnavailable:ft,state:D.state})}return _}function dt(r,e,t,i,a){let s=typeof t=="number"?t:Number(t),o=!isNaN(s)&&s>0&&typeof t!="boolean"?Math.floor(s):0,_=typeof i=="number"?i:Number(i),p=!isNaN(_)&&_>0&&typeof i!="boolean"?Math.floor(_):o>0?o:10,f=r;o>0&&(f=e>0?e:o),a&&a>0&&(f=Math.min(f,a)),f=Math.min(r,f);let m=f,l=Math.max(0,r-m),g=Math.min(p,l),n=l>0&&(!a||m<a),y=o>0&&m>o;return{effectiveLimit:f,remainingCount:l,nextStep:g,canShowMore:n,canShowLess:y}}function me(r){let e={...r};if(e.initial_rows!==void 0){let t=Number(e.initial_rows);typeof e.initial_rows=="boolean"||isNaN(t)||t<=0?delete e.initial_rows:e.initial_rows=Math.floor(t)}if(e.step_rows!==void 0){let t=Number(e.step_rows);typeof e.step_rows=="boolean"||isNaN(t)||t<=0?delete e.step_rows:e.step_rows=Math.floor(t)}return e.title!==void 0&&typeof e.title!="string"&&delete e.title,e.icon!==void 0&&typeof e.icon!="string"&&delete e.icon,e.sort_by!==void 0&&(["battery","name","type","last_replaced","status","area"].includes(e.sort_by)||(e.sort_by="battery")),e.show_area!==void 0&&typeof e.show_area!="boolean"&&(e.show_area=!!e.show_area),e.always_show_area!==void 0&&typeof e.always_show_area!="boolean"&&(e.always_show_area=!!e.always_show_area),e}function pt(r){if(r.type==="checkbox"||r.tagName==="HA-SWITCH"||r.tagName==="HA-CHECKBOX")return!!r.checked;if(r.type==="number"){let t=r.value;if(t===""||t===null||t===void 0)return;let i=Number(t);return isNaN(i)||i<=0?void 0:Math.floor(i)}let e=r.value;if(!(typeof e=="string"&&e.trim()===""))return e}var J=class extends L{setConfig(e){this._config=me(e)}_valueChanged(e,t,i=!1){if(!this._config)return;let a=e.target,s=pt(a),o;if(i){let p={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{},[t]:!!s};o={...this._config,columns:p}}else o={...this._config},s===void 0?delete o[t]:o[t]=s;o.type||(o.type="custom:battery-notes-card"),this._config=o;let _=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(_)}render(){if(!this._config)return h``;let e=this.hass?.language||"en",t={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,area:!1,note:!1,actions:!0,...this._config.columns||{}};return h`
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
    `}static{this.styles=te`
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
  `}};N([Z({attribute:!1})],J.prototype,"hass",2),N([P()],J.prototype,"_config",2);customElements.get("battery-notes-card-editor")||customElements.define("battery-notes-card-editor",J);var R=class extends L{constructor(){super(...arguments);this._searchQuery="";this._activeFilter="all";this._sortBy="battery";this._sortDirection="asc";this._recentlyReplaced=new Set;this._displayedRows=0;this._registriesLoaded=!1;this._registries={}}static async getConfigElement(){return document.createElement("battery-notes-card-editor")}static getStubConfig(){return{type:"custom:battery-notes-card",title:"Battery Notes",icon:"mdi:battery-heart-variant",sort_by:"battery",sort_direction:"asc",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,columns:{name:!0,area:!1,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0}}}setConfig(t){if(!t)throw new Error("Invalid configuration");let i=me(t);this._config={title:"Battery Notes",icon:"mdi:battery-heart-variant",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,sort_by:"battery",sort_direction:"asc",...i,columns:{name:!0,area:!1,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...i.columns||{}}},this._config.sort_by&&(this._sortBy=this._config.sort_by),this._config.sort_direction&&(this._sortDirection=this._config.sort_direction),this._config.filter_low_only&&(this._activeFilter="low"),this._config.initial_rows&&this._config.initial_rows>0?this._displayedRows=this._config.initial_rows:this._displayedRows=0}getCardSize(){return 6}static{this.styles=it}connectedCallback(){super.connectedCallback(),this._fetchRegistries()}updated(t){super.updated(t),t.has("hass")&&!this._registriesLoaded&&this._fetchRegistries()}async _fetchRegistries(){if(!(this._registriesLoaded||!this.hass?.connection)){this._registriesLoaded=!0;try{let[t,i,a]=await Promise.all([this.hass.connection.sendMessagePromise({type:"config/entity_registry/list"}).catch(()=>[]),this.hass.connection.sendMessagePromise({type:"config/device_registry/list"}).catch(()=>[]),this.hass.connection.sendMessagePromise({type:"config/area_registry/list"}).catch(()=>[])]);this._registries={entities:t?.length?new Map(t.map(s=>[s.entity_id,s])):void 0,devices:i?.length?new Map(i.map(s=>[s.id,s])):void 0,areas:a?.length?new Map(a.map(s=>[s.area_id,s])):void 0},this.requestUpdate()}catch{}}}_getBatteryDevices(){return ct(this.hass,this._config,this._registries)}_formatRelativeTime(t,i){if(!t)return d("time_never",i);let s=new Date().getTime()-t.getTime();if(s<0)return d("time_today",i);let o=Math.floor(s/(1e3*60*60*24));return o===0?d("time_today",i):o===1?d("time_yesterday",i):o<14?d("time_days_ago",i,{n:o}):o<60?d("time_weeks_ago",i,{n:Math.floor(o/7)}):o<365?d("time_months_ago",i,{n:Math.floor(o/30)}):d("time_years_ago",i,{n:Math.floor(o/365)})}_getBatteryIcon(t){return t===null||isNaN(t)?"mdi:battery-unknown":t<=5?"mdi:battery-alert":t<=15?"mdi:battery-10":t<=25?"mdi:battery-20":t<=35?"mdi:battery-30":t<=45?"mdi:battery-40":t<=55?"mdi:battery-50":t<=65?"mdi:battery-60":t<=75?"mdi:battery-70":t<=85?"mdi:battery-80":t<=95?"mdi:battery-90":"mdi:battery"}_getLevelClass(t){return t===null||isNaN(t)?"unknown":t<=15?"critical":t<=25?"warning":t<=50?"medium":"good"}_handleSort(t){this._sortBy===t?this._sortDirection=this._sortDirection==="asc"?"desc":"asc":(this._sortBy=t,this._sortDirection="asc")}_handleOpenEntity(t){let i=new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0});this.dispatchEvent(i)}async _handleReplaceBattery(t){let i=this.hass?.language||"en";if(this._config.confirm_replace){let a=d("confirm_replace_msg",i,{name:t.name});if(!window.confirm(a))return}try{if(t.buttonEntityId&&this.hass.states[t.buttonEntityId])await this.hass.callService("button","press",{entity_id:t.buttonEntityId});else{let a={};t.deviceId?a.device_id=t.deviceId:t.sourceEntityId?a.source_entity_id=t.sourceEntityId:a.source_entity_id=t.entityId,await this.hass.callService("battery_notes","set_battery_replaced",a)}this._recentlyReplaced=new Set(this._recentlyReplaced).add(t.id),this.requestUpdate(),setTimeout(()=>{this._recentlyReplaced.delete(t.id),this._recentlyReplaced=new Set(this._recentlyReplaced),this.requestUpdate()},3e3)}catch(a){console.error("Failed to mark battery as replaced:",a),alert(`Error replacing battery: ${a instanceof Error?a.message:String(a)}`)}}_handleShowMore(t){let i=this._config.initial_rows&&this._config.initial_rows>0?this._config.initial_rows:10,a=this._displayedRows>0?this._displayedRows:i;this._displayedRows=a+t}_handleShowLess(){this._displayedRows=this._config.initial_rows&&this._config.initial_rows>0?this._config.initial_rows:0}_handleShowAll(t){this._displayedRows=t}render(){if(!this.hass)return h``;let t=this.hass.language||"en",i=this._getBatteryDevices(),a=i.length,s=i.filter(n=>n.isLow).length,o=a-s,_=i.filter(n=>{if(this._config.hide_unavailable&&n.isUnavailable||this._activeFilter==="low"&&!n.isLow||this._activeFilter==="critical"&&(n.batteryLevel===null||n.batteryLevel>10))return!1;if(this._searchQuery.trim()){let y=this._searchQuery.toLowerCase(),b=n.name.toLowerCase().includes(y),$=n.batteryTypeAndQuantity.toLowerCase().includes(y),C=n.note?.toLowerCase().includes(y)||!1,w=n.area?.toLowerCase().includes(y)||!1;if(!b&&!$&&!C&&!w)return!1}return!0});_.sort((n,y)=>{let b=0;switch(this._sortBy){case"battery":let $=n.batteryLevel??(this._sortDirection==="asc"?999:-1),C=y.batteryLevel??(this._sortDirection==="asc"?999:-1);b=$-C;break;case"name":b=n.name.localeCompare(y.name);break;case"area":{let u=n.area||"",Y=y.area||"";if(!u&&Y)return 1;if(u&&!Y)return-1;let ce=u.localeCompare(Y)||n.name.localeCompare(y.name);return this._sortDirection==="asc"?ce:-ce}case"type":b=n.batteryTypeAndQuantity.localeCompare(y.batteryTypeAndQuantity);break;case"last_replaced":let w=n.lastReplaced?.getTime()??0,O=y.lastReplaced?.getTime()??0;b=w-O;break;case"status":b=(n.isLow?0:1)-(y.isLow?0:1);break}return this._sortDirection==="asc"?b:-b});let p=_.length,f=dt(p,this._displayedRows,this._config.initial_rows,this._config.step_rows,this._config.max_rows),m=_.slice(0,f.effectiveLimit),l={name:!0,area:!1,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{}},g=!!this._config.compact;return h`
      <ha-card class="${g?"compact":""}">
        <div class="card-container">
          <!-- Card Header -->
          ${this._config.show_header!==!1?h`
                <div class="card-header">
                  <div class="header-title-container">
                    <ha-icon
                      class="header-icon"
                      icon="${this._config.icon||"mdi:battery-heart-variant"}"
                    ></ha-icon>
                    <span>${this._config.title||d("card_title",t)}</span>
                  </div>

                  ${this._config.show_summary!==!1?h`
                        <div class="summary-chips">
                          <span class="chip total">
                            ${d("summary_total",t)}: ${a}
                          </span>
                          ${s>0?h`
                                <span class="chip low">
                                  ${d("summary_low",t)}: ${s}
                                </span>
                              `:""}
                          <span class="chip ok">
                            ${d("summary_ok",t)}: ${o}
                          </span>
                        </div>
                      `:""}
                </div>
              `:""}

          <!-- Controls: Search bar & Quick Filters -->
          ${this._config.show_search!==!1||this._config.show_filters!==!1?h`
                <div class="controls-row">
                  ${this._config.show_search!==!1?h`
                        <div class="search-wrapper">
                          <ha-icon class="search-icon-left" icon="mdi:magnify"></ha-icon>
                          <input
                            type="text"
                            class="search-input"
                            .value=${this._searchQuery}
                            placeholder=${d("search_placeholder",t)}
                            @input=${n=>{this._searchQuery=n.target.value,this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                          />
                          ${this._searchQuery?h`
                                <button
                                  class="search-clear-btn"
                                  @click=${()=>{this._searchQuery="",this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                                >
                                  <ha-icon icon="mdi:close-circle"></ha-icon>
                                </button>
                              `:""}
                        </div>
                      `:""}
                  ${this._config.show_filters!==!1?h`
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
                            ${d("filter_low",t)} ${s>0?`(${s})`:""}
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
          ${m.length>0?h`
                <div class="table-wrapper">
                  <table class="battery-table">
                    <thead>
                      <tr>
                        ${l.name?h`
                              <th
                                class="col-name-th sortable"
                                @click=${()=>this._handleSort("name")}
                              >
                                <div class="th-content">
                                  <span>${d("col_name",t)}</span>
                                  ${this._sortBy==="name"?h`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${l.area?h`
                              <th
                                class="col-area-th sortable"
                                @click=${()=>this._handleSort("area")}
                              >
                                <div class="th-content">
                                  <span>${d("col_area",t)}</span>
                                  ${this._sortBy==="area"?h`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${l.battery?h`
                              <th
                                class="col-battery-th sortable"
                                @click=${()=>this._handleSort("battery")}>
                                <div class="th-content">
                                  <span>${d("col_battery",t)}</span>
                                  ${this._sortBy==="battery"?h`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${l.type?h`
                              <th
                                class="col-type-th sortable"
                                @click=${()=>this._handleSort("type")}
                              >
                                <div class="th-content">
                                  <span>${d("col_type",t)}</span>
                                  ${this._sortBy==="type"?h`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${l.last_replaced?h`
                              <th
                                class="col-last-replaced-th sortable"
                                @click=${()=>this._handleSort("last_replaced")}
                              >
                                <div class="th-content">
                                  <span>${d("col_last_replaced",t)}</span>
                                  ${this._sortBy==="last_replaced"?h`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${l.status?h`
                              <th
                                class="col-status-th sortable"
                                @click=${()=>this._handleSort("status")}
                              >
                                <div class="th-content">
                                  <span>${d("col_status",t)}</span>
                                  ${this._sortBy==="status"?h`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${l.note?h`<th class="col-note-th">${d("col_note",t)}</th>`:""}
                        ${l.actions?h`<th class="col-actions-th">${d("col_actions",t)}</th>`:""}
                      </tr>
                    </thead>
                    <tbody>
                      ${m.map(n=>{let y=this._getLevelClass(n.batteryLevel),b=this._recentlyReplaced.has(n.id);return h`
                          <tr class="${n.isLow?"row-low":""}">
                            <!-- Name -->
                            ${l.name?h`
                                  <td class="col-name-td">
                                    <div class="device-cell">
                                      <button
                                        class="device-name-btn"
                                        @click=${()=>this._handleOpenEntity(n.entityId)}
                                        title="${n.name}"
                                      >
                                        ${n.name}
                                      </button>
                                      ${!l.area&&this._config.show_area!==!1&&n.area&&(this._config.always_show_area||!n.name.toLowerCase().includes(n.area.toLowerCase()))?h`<span class="device-subtext"><ha-icon icon="mdi:map-marker-outline" style="--mdc-icon-size: 12px; margin-right: 2px;"></ha-icon>${n.area}</span>`:""}
                                      ${n.note&&!l.note?h`<span class="device-subtext">${n.note}</span>`:""}
                                    </div>
                                  </td>
                                `:""}

                            <!-- Area -->
                            ${l.area?h`
                                  <td class="col-area-td">
                                    ${n.area?h`
                                          <span class="area-badge">
                                            <ha-icon icon="mdi:map-marker-outline"></ha-icon>
                                            ${n.area}
                                          </span>
                                        `:h`<span class="text-muted">-</span>`}
                                  </td>
                                `:""}

                            <!-- Battery Level -->
                            ${l.battery?h`
                                  <td class="col-battery-td">
                                    <div class="battery-level-cell">
                                      <ha-icon
                                        class="battery-icon level-${y}"
                                        icon="${this._getBatteryIcon(n.batteryLevel)}"
                                      ></ha-icon>
                                      <div class="battery-bar-container">
                                        <div
                                          class="battery-bar-fill bar-${y}"
                                          style="width: ${Math.min(Math.max(n.batteryLevel??0,0),100)}%;"
                                        ></div>
                                      </div>
                                      <span class="battery-percent-text level-${y}">
                                        ${n.batteryLevel!==null?`${Math.round(n.batteryLevel)}%`:"-"}
                                      </span>
                                    </div>
                                  </td>
                                `:""}

                            <!-- Battery Type -->
                            ${l.type?h`
                                  <td class="col-type-td">
                                    <span class="type-badge">
                                      <ha-icon icon="mdi:battery-charging-outline"></ha-icon>
                                      ${n.batteryTypeAndQuantity}
                                    </span>
                                  </td>
                                `:""}

                            <!-- Last Replaced -->
                            ${l.last_replaced?h`
                                  <td class="col-last-replaced-td">
                                    <div
                                      class="last-replaced-cell"
                                      title="${n.lastReplaced?.toLocaleString()||n.lastReplacedStr||""}"
                                    >
                                      <ha-icon icon="mdi:calendar-clock"></ha-icon>
                                      <span>${this._formatRelativeTime(n.lastReplaced,t)}</span>
                                    </div>
                                  </td>
                                `:""}

                            <!-- Status -->
                            ${l.status?h`
                                  <td class="col-status-td">
                                    ${n.isUnavailable?h`<span class="status-badge unavailable"
                                          >${d("status_unavailable",t)}</span
                                        >`:n.isLow?h`<span class="status-badge low"
                                          >${d("status_low",t)}</span
                                        >`:h`<span class="status-badge ok"
                                          >${d("status_ok",t)}</span
                                        >`}
                                  </td>
                                `:""}

                            <!-- Note -->
                            ${l.note?h`
                                  <td class="col-note-td">
                                    <span class="note-text" title="${n.note||""}"
                                      >${n.note||"-"}</span
                                    >
                                  </td>
                                `:""}

                            <!-- Action -->
                            ${l.actions?h`
                                  <td class="col-actions-td">
                                    <button
                                      class="action-btn ${b?"success":""}"
                                      @click=${()=>this._handleReplaceBattery(n)}
                                      title="${d("action_mark_replaced",t)}"
                                    >
                                      <ha-icon
                                        icon="${b?"mdi:check-bold":"mdi:battery-sync"}"
                                      ></ha-icon>
                                      <span
                                        >${b?d("action_replaced",t):d("action_mark_replaced",t)}</span
                                      >
                                    </button>
                                  </td>
                                `:""}
                          </tr>
                        `})}
                    </tbody>
                  </table>
                </div>

                ${f.canShowMore||f.canShowLess?h`
                      <div class="pagination-container">
                        ${f.canShowMore?h`
                              <button
                                class="pagination-btn primary"
                                @click=${()=>this._handleShowMore(f.nextStep)}
                              >
                                <ha-icon icon="mdi:chevron-down"></ha-icon>
                                <span>
                                  ${d("show_more_remaining",t,{count:f.nextStep,remaining:f.remainingCount})}
                                </span>
                              </button>
                            `:""}
                        ${f.canShowMore&&f.remainingCount>f.nextStep?h`
                              <button
                                class="pagination-btn secondary"
                                @click=${()=>this._handleShowAll(p)}
                              >
                                <ha-icon icon="mdi:unfold-more-horizontal"></ha-icon>
                                <span>
                                  ${d("show_all",t,{count:p})}
                                </span>
                              </button>
                            `:""}
                        ${f.canShowLess?h`
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
              `:h`
                <div class="empty-state">
                  <ha-icon icon="mdi:battery-check"></ha-icon>
                  <span>
                    ${i.length===0?d("no_devices",t):d("no_results",t)}
                  </span>
                </div>
              `}
        </div>
      </ha-card>
    `}};N([Z({attribute:!1})],R.prototype,"hass",2),N([P()],R.prototype,"_config",2),N([P()],R.prototype,"_searchQuery",2),N([P()],R.prototype,"_activeFilter",2),N([P()],R.prototype,"_sortBy",2),N([P()],R.prototype,"_sortDirection",2),N([P()],R.prototype,"_recentlyReplaced",2),N([P()],R.prototype,"_displayedRows",2);customElements.get("battery-notes-card")||customElements.define("battery-notes-card",R);window.customCards=window.customCards||[];window.customCards.push({type:"battery-notes-card",name:"Battery Notes Card",description:"A customizable Lovelace table card for Home Assistant Battery Notes integration.",preview:!0,documentationURL:"https://github.com/vitals5/battery-notes-card"});})();
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
