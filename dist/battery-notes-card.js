"use strict";(()=>{var ce=Object.defineProperty;var de=Object.getOwnPropertyDescriptor;var C=(i,t,e,r)=>{for(var s=r>1?void 0:r?de(t,e):t,a=i.length-1,o;a>=0;a--)(o=i[a])&&(s=(r?o(t,e,s):o(s))||s);return r&&s&&ce(t,e,s),s};var nt=globalThis,lt=nt.ShadowRoot&&(nt.ShadyCSS===void 0||nt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,vt=Symbol(),Pt=new WeakMap,J=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==vt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(lt&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=Pt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Pt.set(e,t))}return t}toString(){return this.cssText}},Dt=i=>new J(typeof i=="string"?i:i+"",void 0,vt),Y=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((r,s,a)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[a+1],i[0]);return new J(e,i,vt)},Mt=(i,t)=>{if(lt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),s=nt.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,i.appendChild(r)}},$t=lt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return Dt(e)})(i):i;var{is:pe,defineProperty:he,getOwnPropertyDescriptor:ue,getOwnPropertyNames:_e,getOwnPropertySymbols:ye,getPrototypeOf:be}=Object,ct=globalThis,Ht=ct.trustedTypes,fe=Ht?Ht.emptyScript:"",me=ct.reactiveElementPolyfillSupport,X=(i,t)=>i,tt={toAttribute(i,t){switch(t){case Boolean:i=i?fe:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},dt=(i,t)=>!pe(i,t),Ot={attribute:!0,type:String,converter:tt,reflect:!1,useDefault:!1,hasChanged:dt};Symbol.metadata??=Symbol("metadata"),ct.litPropertyMetadata??=new WeakMap;var L=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ot){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&he(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){let{get:s,set:a}=ue(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let _=s?.call(this);a?.call(this,o),this.requestUpdate(t,_,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ot}static _$Ei(){if(this.hasOwnProperty(X("elementProperties")))return;let t=be(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(X("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(X("properties"))){let e=this.properties,r=[..._e(e),...ye(e)];for(let s of r)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)e.unshift($t(s))}else t!==void 0&&e.push($t(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Mt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let a=(r.converter?.toAttribute!==void 0?r.converter:tt).toAttribute(e,r.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let a=r.getPropertyOptions(s),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:tt;this._$Em=s;let _=o.fromAttribute(e,a.type);this[s]=_??this._$Ej?.get(s)??_,this._$Em=null}}requestUpdate(t,e,r,s=!1,a){if(t!==void 0){let o=this.constructor;if(s===!1&&(a=this[t]),r??=o.getPropertyOptions(t),!((r.hasChanged??dt)(a,e)||r.useDefault&&r.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:a},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),a!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,a]of r){let{wrapped:o}=a,_=this[s];o!==!0||this._$AL.has(s)||_===void 0||this.C(s,void 0,a,_)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};L.elementStyles=[],L.shadowRootOptions={mode:"open"},L[X("elementProperties")]=new Map,L[X("finalized")]=new Map,me?.({ReactiveElement:L}),(ct.reactiveElementVersions??=[]).push("2.1.2");var Et=globalThis,Ut=i=>i,pt=Et.trustedTypes,It=pt?pt.createPolicy("lit-html",{createHTML:i=>i}):void 0,Gt="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,Vt="?"+D,ge=`<${Vt}>`,U=document,rt=()=>U.createComment(""),st=i=>i===null||typeof i!="object"&&typeof i!="function",Bt=Array.isArray,ve=i=>Bt(i)||typeof i?.[Symbol.iterator]=="function",wt=`[ 	
\f\r]`,et=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Wt=/-->/g,jt=/>/g,H=RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ft=/'/g,qt=/"/g,Kt=/^(?:script|style|textarea|title)$/i,Rt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),y=Rt(1),Te=Rt(2),Pe=Rt(3),I=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Qt=new WeakMap,O=U.createTreeWalker(U,129);function Zt(i,t){if(!Bt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return It!==void 0?It.createHTML(t):t}var $e=(i,t)=>{let e=i.length-1,r=[],s,a=t===2?"<svg>":t===3?"<math>":"",o=et;for(let _=0;_<e;_++){let c=i[_],m,n,d=-1,p=0;for(;p<c.length&&(o.lastIndex=p,n=o.exec(c),n!==null);)p=o.lastIndex,o===et?n[1]==="!--"?o=Wt:n[1]!==void 0?o=jt:n[2]!==void 0?(Kt.test(n[2])&&(s=RegExp("</"+n[2],"g")),o=H):n[3]!==void 0&&(o=H):o===H?n[0]===">"?(o=s??et,d=-1):n[1]===void 0?d=-2:(d=o.lastIndex-n[2].length,m=n[1],o=n[3]===void 0?H:n[3]==='"'?qt:Ft):o===qt||o===Ft?o=H:o===Wt||o===jt?o=et:(o=H,s=void 0);let u=o===H&&i[_+1].startsWith("/>")?" ":"";a+=o===et?c+ge:d>=0?(r.push(m),c.slice(0,d)+Gt+c.slice(d)+D+u):c+D+(d===-2?_:u)}return[Zt(i,a+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},it=class i{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let a=0,o=0,_=t.length-1,c=this.parts,[m,n]=$e(t,e);if(this.el=i.createElement(m,r),O.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=O.nextNode())!==null&&c.length<_;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(Gt)){let p=n[o++],u=s.getAttribute(d).split(D),g=/([.?@])?(.*)/.exec(p);c.push({type:1,index:a,name:g[2],strings:u,ctor:g[1]==="."?At:g[1]==="?"?St:g[1]==="@"?kt:q}),s.removeAttribute(d)}else d.startsWith(D)&&(c.push({type:6,index:a}),s.removeAttribute(d));if(Kt.test(s.tagName)){let d=s.textContent.split(D),p=d.length-1;if(p>0){s.textContent=pt?pt.emptyScript:"";for(let u=0;u<p;u++)s.append(d[u],rt()),O.nextNode(),c.push({type:2,index:++a});s.append(d[p],rt())}}}else if(s.nodeType===8)if(s.data===Vt)c.push({type:2,index:a});else{let d=-1;for(;(d=s.data.indexOf(D,d+1))!==-1;)c.push({type:7,index:a}),d+=D.length-1}a++}}static createElement(t,e){let r=U.createElement("template");return r.innerHTML=t,r}};function F(i,t,e=i,r){if(t===I)return t;let s=r!==void 0?e._$Co?.[r]:e._$Cl,a=st(t)?void 0:t._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),a===void 0?s=void 0:(s=new a(i),s._$AT(i,e,r)),r!==void 0?(e._$Co??=[])[r]=s:e._$Cl=s),s!==void 0&&(t=F(i,s._$AS(i,t.values),s,r)),t}var xt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);O.currentNode=s;let a=O.nextNode(),o=0,_=0,c=r[0];for(;c!==void 0;){if(o===c.index){let m;c.type===2?m=new at(a,a.nextSibling,this,t):c.type===1?m=new c.ctor(a,c.name,c.strings,this,t):c.type===6&&(m=new Ct(a,this,t)),this._$AV.push(m),c=r[++_]}o!==c?.index&&(a=O.nextNode(),o++)}return O.currentNode=U,s}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},at=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),st(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==I&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ve(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&st(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=it.createElement(Zt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{let a=new xt(s,this),o=a.u(this.options);a.p(e),this.T(o),this._$AH=a}}_$AC(t){let e=Qt.get(t.strings);return e===void 0&&Qt.set(t.strings,e=new it(t)),e}k(t){Bt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,s=0;for(let a of t)s===e.length?e.push(r=new i(this.O(rt()),this.O(rt()),this,this.options)):r=e[s],r._$AI(a),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=Ut(t).nextSibling;Ut(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,a){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=$}_$AI(t,e=this,r,s){let a=this.strings,o=!1;if(a===void 0)t=F(this,t,e,0),o=!st(t)||t!==this._$AH&&t!==I,o&&(this._$AH=t);else{let _=t,c,m;for(t=a[0],c=0;c<a.length-1;c++)m=F(this,_[r+c],e,c),m===I&&(m=this._$AH[c]),o||=!st(m)||m!==this._$AH[c],m===$?t=$:t!==$&&(t+=(m??"")+a[c+1]),this._$AH[c]=m}o&&!s&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},At=class extends q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}},St=class extends q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},kt=class extends q{constructor(t,e,r,s,a){super(t,e,r,s,a),this.type=5}_$AI(t,e=this){if((t=F(this,t,e,0)??$)===I)return;let r=this._$AH,s=t===$&&r!==$||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,a=t!==$&&(r===$||s);s&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ct=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}};var we=Et.litHtmlPolyfillSupport;we?.(it,at),(Et.litHtmlVersions??=[]).push("3.3.3");var Jt=(i,t,e)=>{let r=e?.renderBefore??t,s=r._$litPart$;if(s===void 0){let a=e?.renderBefore??null;r._$litPart$=s=new at(t.insertBefore(rt(),a),a,void 0,e??{})}return s._$AI(i),s};var Nt=globalThis,E=class extends L{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Jt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}};E._$litElement$=!0,E.finalized=!0,Nt.litElementHydrateSupport?.({LitElement:E});var xe=Nt.litElementPolyfillSupport;xe?.({LitElement:E});(Nt.litElementVersions??=[]).push("4.2.2");var Ae={attribute:!0,type:String,converter:tt,reflect:!1,hasChanged:dt},Se=(i=Ae,t,e)=>{let{kind:r,metadata:s}=e,a=globalThis.litPropertyMetadata.get(s);if(a===void 0&&globalThis.litPropertyMetadata.set(s,a=new Map),r==="setter"&&((i=Object.create(i)).wrapped=!0),a.set(e.name,i),r==="accessor"){let{name:o}=e;return{set(_){let c=t.get.call(this);t.set.call(this,_),this.requestUpdate(o,c,i,!0,_)},init(_){return _!==void 0&&this.C(o,void 0,i,_),_}}}if(r==="setter"){let{name:o}=e;return function(_){let c=this[o];t.call(this,_),this.requestUpdate(o,c,i,!0,_)}}throw Error("Unsupported decorator location: "+r)};function Q(i){return(t,e)=>typeof e=="object"?Se(i,t,e):((r,s,a)=>{let o=s.hasOwnProperty(a);return s.constructor.createProperty(a,r),o?Object.getOwnPropertyDescriptor(s,a):void 0})(i,t,e)}function z(i){return Q({...i,state:!0,attribute:!1})}var Yt=Y`
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
`;var Xt={en:{card_title:"Battery Notes",col_name:"Device",col_battery:"Battery",col_type:"Type",col_last_replaced:"Last Replaced",col_status:"Status",col_note:"Note",col_actions:"Actions",status_low:"Low",status_ok:"OK",status_critical:"Critical",status_unavailable:"Unavailable",action_mark_replaced:"Mark replaced",action_replaced:"Replaced",confirm_replace_title:"Confirm Battery Replacement",confirm_replace_msg:'Mark battery as replaced for "{name}"?',replaced_success:"Battery replacement recorded",search_placeholder:"Search devices, battery type...",filter_all:"All",filter_low:"Low",filter_critical:"Critical",summary_total:"Total",summary_low:"Low",summary_ok:"Good",no_devices:"No Battery Notes devices found.",no_results:"No matching devices found.",time_never:"Never",time_today:"Today",time_yesterday:"Yesterday",time_days_ago:"{n}d ago",time_weeks_ago:"{n}w ago",time_months_ago:"{n}m ago",time_years_ago:"{n}y ago",editor_title:"Title",editor_icon:"Icon",editor_show_header:"Show Header",editor_show_summary:"Show Summary Counters",editor_show_search:"Show Search Bar",editor_show_filters:"Show Quick Filter Pills",editor_compact:"Compact Layout",editor_confirm_replace:"Confirm Before Replacement",editor_sort_by:"Sort By",editor_sort_direction:"Sort Direction",editor_filter_low_only:"Show Low Battery Only",editor_filter_threshold:"Battery Threshold (%)",editor_hide_unavailable:"Hide Unavailable Devices",editor_columns:"Visible Columns",editor_col_name:"Name",editor_col_battery:"Battery Level",editor_col_type:"Battery Type",editor_col_last_replaced:"Last Replaced",editor_col_status:"Status Badge",editor_col_note:"Note",editor_col_actions:"Action Button"},de:{card_title:"Batteriest\xE4nde",col_name:"Ger\xE4t",col_battery:"Batterie",col_type:"Typ",col_last_replaced:"Zuletzt gewechselt",col_status:"Status",col_note:"Notiz",col_actions:"Aktionen",status_low:"Niedrig",status_ok:"OK",status_critical:"Kritisch",status_unavailable:"Nicht verf\xFCgbar",action_mark_replaced:"Als gewechselt markieren",action_replaced:"Gewechselt",confirm_replace_title:"Batteriewechsel best\xE4tigen",confirm_replace_msg:'Batterie f\xFCr "{name}" wirklich als gewechselt markieren?',replaced_success:"Batteriewechsel gespeichert",search_placeholder:"Ger\xE4t oder Batterietyp suchen...",filter_all:"Alle",filter_low:"Niedrig",filter_critical:"Kritisch",summary_total:"Gesamt",summary_low:"Niedrig",summary_ok:"In Ordnung",no_devices:"Keine Battery Notes Ger\xE4te gefunden.",no_results:"Keine passenden Ger\xE4te gefunden.",time_never:"Nie",time_today:"Heute",time_yesterday:"Gestern",time_days_ago:"Vor {n} Tagen",time_weeks_ago:"Vor {n} Wochen",time_months_ago:"Vor {n} Monaten",time_years_ago:"Vor {n} Jahren",editor_title:"Titel",editor_icon:"Icon",editor_show_header:"Kopfzeile anzeigen",editor_show_summary:"Zusammenfassung (Z\xE4hler) anzeigen",editor_show_search:"Suchleiste anzeigen",editor_show_filters:"Filter-Buttons anzeigen",editor_compact:"Kompakte Tabelle",editor_confirm_replace:"Best\xE4tigungsdialog vor Wechsel",editor_sort_by:"Sortieren nach",editor_sort_direction:"Sortierrichtung",editor_filter_low_only:"Nur schwache Batterien anzeigen",editor_filter_threshold:"Schwellenwert (%)",editor_hide_unavailable:"Nicht verf\xFCgbare ausblenden",editor_columns:"Sichtbare Spalten",editor_col_name:"Name",editor_col_battery:"Batteriestand",editor_col_type:"Batterietyp",editor_col_last_replaced:"Zuletzt gewechselt",editor_col_status:"Status",editor_col_note:"Notiz",editor_col_actions:"Aktions-Button"}};function l(i,t="en",e){let r=t.startsWith("de")?"de":"en",s=Xt[r]?.[i]||Xt.en?.[i]||i;if(e)for(let[a,o]of Object.entries(e))s=s.replace(new RegExp(`\\{${a}\\}`,"g"),String(o));return s}var G=class extends E{setConfig(t){this._config={...t}}_valueChanged(t,e,r=!1){if(!this._config)return;let s=t.target,a;s.type==="checkbox"||s.checked!==void 0?a=s.checked:s.value!==void 0&&(a=s.value);let o;if(r){let c={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{},[e]:!!a};o={...this._config,columns:c}}else o={...this._config,[e]:a};this._config=o;let _=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(_)}render(){if(!this._config)return y``;let t=this.hass?.language||"en",e={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{}};return y`
      <div class="card-config">
        <!-- Basic Settings -->
        <div class="config-row">
          <label class="label">${l("editor_title",t)}</label>
          <input
            type="text"
            class="input-text"
            .value=${this._config.title??""}
            placeholder=${l("card_title",t)}
            @input=${r=>this._valueChanged(r,"title")}
          />
        </div>

        <div class="config-row">
          <label class="label">${l("editor_icon",t)}</label>
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
            <label class="label">${l("editor_sort_by",t)}</label>
            <select
              class="input-select"
              .value=${this._config.sort_by??"battery"}
              @change=${r=>this._valueChanged(r,"sort_by")}
            >
              <option value="battery">${l("editor_col_battery",t)}</option>
              <option value="name">${l("editor_col_name",t)}</option>
              <option value="type">${l("editor_col_type",t)}</option>
              <option value="last_replaced">${l("editor_col_last_replaced",t)}</option>
              <option value="status">${l("editor_col_status",t)}</option>
            </select>
          </div>

          <div>
            <label class="label">${l("editor_sort_direction",t)}</label>
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
        <div class="section-title">${l("editor_show_filters",t)} & Options</div>

        <div class="toggle-grid">
          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_header??!0}
              @change=${r=>this._valueChanged(r,"show_header")}
            />
            <span>${l("editor_show_header",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_summary??!0}
              @change=${r=>this._valueChanged(r,"show_summary")}
            />
            <span>${l("editor_show_summary",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_search??!0}
              @change=${r=>this._valueChanged(r,"show_search")}
            />
            <span>${l("editor_show_search",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_filters??!0}
              @change=${r=>this._valueChanged(r,"show_filters")}
            />
            <span>${l("editor_show_filters",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.compact??!1}
              @change=${r=>this._valueChanged(r,"compact")}
            />
            <span>${l("editor_compact",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.confirm_replace??!0}
              @change=${r=>this._valueChanged(r,"confirm_replace")}
            />
            <span>${l("editor_confirm_replace",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.filter_low_only??!1}
              @change=${r=>this._valueChanged(r,"filter_low_only")}
            />
            <span>${l("editor_filter_low_only",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.hide_unavailable??!1}
              @change=${r=>this._valueChanged(r,"hide_unavailable")}
            />
            <span>${l("editor_hide_unavailable",t)}</span>
          </label>
        </div>

        <!-- Visible Columns -->
        <div class="section-title">${l("editor_columns",t)}</div>

        <div class="toggle-grid">
          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.name}
              @change=${r=>this._valueChanged(r,"name",!0)}
            />
            <span>${l("editor_col_name",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.battery}
              @change=${r=>this._valueChanged(r,"battery",!0)}
            />
            <span>${l("editor_col_battery",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.type}
              @change=${r=>this._valueChanged(r,"type",!0)}
            />
            <span>${l("editor_col_type",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.last_replaced}
              @change=${r=>this._valueChanged(r,"last_replaced",!0)}
            />
            <span>${l("editor_col_last_replaced",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.status}
              @change=${r=>this._valueChanged(r,"status",!0)}
            />
            <span>${l("editor_col_status",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.actions}
              @change=${r=>this._valueChanged(r,"actions",!0)}
            />
            <span>${l("editor_col_actions",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.note}
              @change=${r=>this._valueChanged(r,"note",!0)}
            />
            <span>${l("editor_col_note",t)}</span>
          </label>
        </div>
      </div>
    `}static{this.styles=Y`
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
  `}};C([Q({attribute:!1})],G.prototype,"hass",2),C([z()],G.prototype,"_config",2);var ke=new Set(["batterie fast leer","batterie-typ","batterie - typ","batterietyp","letzter batteriewechsel","batterie zuletzt ersetzt","batterie ersetzt","batterie+","batterie","battery low","battery type","battery last replaced","battery replaced","battery+","battery"]);function x(i){if(!i)return!0;let t=i.toLowerCase().trim();return!!(ke.has(t)||/^(?:battery|batterie)[_\-\s]*(?:type|typ|low|fast[_\-\s]*leer|replaced|ersetzt|last[_\-\s]*replaced|plus|\+)*(?:[_\-\s]*\d+)?$/i.test(t))}function _t(i){return i?i.replace(/\s*(?:[-–—:]|\()\s*(?:Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery|Batterie)\s*\)?$/i,"").replace(/\s+(?:Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery|Batterie)$/i,"").replace(/[\s\-_:–—()]+$/g,"").trim():""}function Ce(i){if(!i)return"";let t=_t(i);if(!t)return"";let e=/(?:\s+|-)(?:Rauchalarm|Rauch|Sabotagekontakt|Sabotage|Status|State|Alarm|Detection)$/i;for(;e.test(t);){let r=t.replace(e,"").trim();if(r.length>=3&&!x(r))t=r;else break}return t}function Ee(i){if(!i)return"";let t=i.replace(/([_-])0+([1-9]\d*)\b/g,"$1$2");return t=t.replace(/([_-])(?:sbs\d+[a-f0-9]+|[a-f0-9]*[a-f][a-f0-9]{5,})/gi,""),t=t.replace(/^_+|_+$/g,"").replace(/_+/g," "),t.replace(/\b\w/g,e=>e.toUpperCase()).trim()||i}function ut(i){return(i.includes(".")?i.split(".")[1]:i).replace(/(?:_|-)(?:battery_last_replaced|letzter_batteriewechsel|batterie_zuletzt_ersetzt)$/i,"").replace(/(?:_|-)(?:battery_type|batterie_typ|batterie-typ|batterietyp|batterie_art)$/i,"").replace(/(?:_|-)(?:battery_plus_low|battery_low|batterie_fast_leer|batterie_schwach|niedriger_batteriestand)$/i,"").replace(/(?:_|-)(?:battery_replaced|batterie_ersetzt)$/i,"").replace(/(?:_|-)(?:battery_plus|batterie_plus|battery\+|batterie\+)$/i,"").replace(/(?:_|-)(?:battery_level|batteriestand|batterie_stand|battery|batterie)$/i,"").replace(/_battery$/,"").replace(/_batterie$/,"")}function te(i,t){if(!i.entity_id.startsWith("sensor."))return!1;if(t?.translation_key==="battery_type")return!0;let e=i.entity_id.toLowerCase();return e.endsWith("_battery_type")||e.endsWith("_batterie_typ")||e.endsWith("_batterie-typ")||e.endsWith("_batterie_art")||e.endsWith("_batterietyp")||e==="sensor.battery_type"||e==="sensor.batterie_typ"||/^sensor\.batterie[_\-]typ(?:_\d+)?$/i.test(e)||/^sensor\.battery[_\-]type(?:_\d+)?$/i.test(e)||i.attributes.battery_type!==void 0&&!i.attributes.device_class}function ee(i,t){if(!i.entity_id.startsWith("sensor."))return!1;if(t?.translation_key==="battery_plus")return!0;let e=i.entity_id.toLowerCase();return e.endsWith("_battery_plus")||e.endsWith("_batterie_plus")||e.endsWith("_battery+")||e.endsWith("_batterie+")}function re(i,t){if(!i.entity_id.startsWith("sensor."))return!1;if(t?.translation_key==="battery_last_replaced")return!0;let e=i.entity_id.toLowerCase();return e.endsWith("_battery_last_replaced")||e.endsWith("_letzter_batteriewechsel")||e.endsWith("_batterie_zuletzt_ersetzt")}function se(i,t){if(!i.entity_id.startsWith("binary_sensor."))return!1;if(t?.translation_key==="battery_low")return!0;let e=i.entity_id.toLowerCase();return e.endsWith("_battery_low")||e.endsWith("_battery_plus_low")||e.endsWith("_batterie_fast_leer")||e.endsWith("_batterie_schwach")||e.endsWith("_niedriger_batteriestand")||i.attributes.device_class==="battery"}function ie(i,t){if(!i.entity_id.startsWith("button."))return!1;if(t?.translation_key==="battery_replaced")return!0;let e=i.entity_id.toLowerCase();return e.endsWith("_battery_replaced")||e.endsWith("_batterie_ersetzt")}function ae(i,t,e){if(!i||!i.states)return[];let r=i.states,s=[],a=new Map,o=new Map;for(let[n,d]of Object.entries(r)){let p=d.attributes||{},u=e?.entities?.get(n)||i.entities?.[n];if(!(u?.platform==="battery_notes"||te(d,u)||ee(d,u)||re(d,u)||se(d,u)||ie(d,u)||p.battery_type!==void 0||p.battery_type_and_quantity!==void 0))continue;let v=u?.device_id||p.device_id,A=ut(n);p.source_entity_id&&(x(A)||!A)&&(A=ut(p.source_entity_id)),p.device_name&&(x(A)||!A)&&(A=ut(p.device_name));let k=A,w=null;if(v&&a.has(v)?w=a.get(v):k&&!x(k)&&o.has(k)&&(w=o.get(k)),!w)w={id:v?`dev_${v}`:`base_${k}`,deviceId:v,baseName:k,entities:[]},s.push(w);else if(v&&!w.deviceId)if(a.has(v)){let V=a.get(v);V!==w&&(V.entities.push(...w.entities),s=s.filter(f=>f!==w),w=V)}else w.deviceId=v;v&&a.set(v,w),k&&!x(k)&&o.set(k,w),w.entities.push(d)}let _=[],c=new Set(t.exclude_entities||[]),m=s;if(t.entities&&t.entities.length>0){let n=new Set(t.entities.map(p=>ut(p))),d=new Set(t.entities);m=m.filter(p=>n.has(p.baseName)||p.deviceId&&d.has(p.deviceId)||p.entities.some(u=>d.has(u.entity_id)))}for(let n of m){let d=n.entities,p=n.deviceId,u=n.baseName,g=u.replace(/([_-])0*[0-9a-f]{6,}\b/i,"");if(c.has(u)||p&&c.has(p)||d.some(h=>c.has(h.entity_id)))continue;let v=d.find(h=>te(h,e?.entities?.get(h.entity_id)||i.entities?.[h.entity_id])),A=d.find(h=>ee(h,e?.entities?.get(h.entity_id)||i.entities?.[h.entity_id])),k=d.find(h=>re(h,e?.entities?.get(h.entity_id)||i.entities?.[h.entity_id])),w=d.find(h=>se(h,e?.entities?.get(h.entity_id)||i.entities?.[h.entity_id])),V=d.find(h=>ie(h,e?.entities?.get(h.entity_id)||i.entities?.[h.entity_id])),f={};for(let h of d)h.attributes&&Object.assign(f,h.attributes);let T=A||v||d[0],W,Lt=[`sensor.${u}_battery`,`sensor.${u}_batterie`,`sensor.${u}_battery_level`,`sensor.${u}_batteriestand`,`sensor.${u}_batterie_stand`,`sensor.${u}`];g&&g!==u&&Lt.push(`sensor.${g}_battery`,`sensor.${g}_batterie`,`sensor.${g}_battery_level`,`sensor.${g}_batteriestand`,`sensor.${g}`);for(let h of Lt)if(r[h]){W=r[h];break}let P=null;if(A&&!isNaN(parseFloat(A.state)))P=parseFloat(A.state);else if(f.source_entity_id&&r[f.source_entity_id]&&!isNaN(parseFloat(r[f.source_entity_id].state)))P=parseFloat(r[f.source_entity_id].state);else if(W&&!isNaN(parseFloat(W.state)))P=parseFloat(W.state);else if(f.battery_last_reported_level!==void 0&&!isNaN(Number(f.battery_last_reported_level)))P=Number(f.battery_last_reported_level);else if(p){let h=e?.entities;for(let[N,S]of Object.entries(r)){if(!N.startsWith("sensor."))continue;if((h?.get(N)||i.entities?.[N])?.device_id===p&&S&&S.attributes?.device_class==="battery"&&!isNaN(parseFloat(S.state))){P=parseFloat(S.state);break}}}let M=p?e?.devices?.get(p)||i.devices?.[p]:void 0,yt=M?.area_id||(T?e?.entities?.get(T.entity_id)?.area_id||i.entities?.[T.entity_id]?.area_id:void 0),K=yt?e?.areas?.get(yt)?.name||i.areas?.[yt]?.name:void 0,b="";if(t.device_names&&(b=t.device_names[u]||(p?t.device_names[p]:"")||""),!b&&M?.name_by_user&&!x(M.name_by_user)&&(b=M.name_by_user),!b&&M?.name&&!x(M.name)&&(b=M.name),!b&&f.device_name&&!x(f.device_name)&&(b=f.device_name),!b&&T){let h=e?.entities?.get(T.entity_id)||i.entities?.[T.entity_id];h?.name&&!x(h.name)&&(b=h.name)}if(!b&&W?.attributes?.friendly_name){let h=_t(W.attributes.friendly_name);h&&!x(h)&&(b=h)}if(!b)for(let h of d){let N=h.attributes?.friendly_name;if(N){let S=_t(N);if(S&&!x(S)){b=S;break}}}if(!b&&f.source_entity_id&&r[f.source_entity_id]?.attributes?.friendly_name){let h=_t(r[f.source_entity_id].attributes.friendly_name);h&&!x(h)&&(b=h)}if(!b&&u&&!x(u)){let h=u.toLowerCase(),N=g.toLowerCase();for(let[S,mt]of Object.entries(r))if(!d.some(ot=>ot.entity_id===S)&&mt.attributes?.friendly_name){let ot=S.includes(".")?S.split(".")[1].toLowerCase():S.toLowerCase();if(ot.startsWith(h)||N.length>=6&&ot.startsWith(N)){let gt=Ce(mt.attributes.friendly_name);if(gt&&!x(gt)){b=gt;break}}}}if(K&&(b?b.toLowerCase().includes(K.toLowerCase())||/^(?:smoke[_\-\s]*alarm|rauchmelder|sensor|alarm)$/i.test(b.trim())&&(b=`${K} ${b}`):b=`${K} Rauchmelder`),!b&&!x(u)&&(b=Ee(u)),x(b))continue;let j=f.battery_type||"";!j&&v&&v.state&&v.state!=="unknown"&&v.state!=="unavailable"&&(j=v.state);let bt=Number(f.battery_quantity)||1,ft=f.battery_type_and_quantity||"";!ft&&j&&(ft=bt>1?`${bt}x ${j}`:j);let zt=null,Tt="",Z=k?.state||f.battery_last_replaced;if(Z&&Z!=="unavailable"&&Z!=="unknown"){Tt=Z;let h=new Date(Z);isNaN(h.getTime())||(zt=h)}let oe=t.filter_threshold??20,ne=w?.state==="on"||f.battery_low===!0||P!==null&&P<=oe,R=V?.entity_id;!R&&r[`button.${u}_battery_replaced`]?R=`button.${u}_battery_replaced`:!R&&r[`button.${u}_batterie_ersetzt`]?R=`button.${u}_batterie_ersetzt`:!R&&g&&r[`button.${g}_battery_replaced`]?R=`button.${g}_battery_replaced`:!R&&g&&r[`button.${g}_batterie_ersetzt`]&&(R=`button.${g}_batterie_ersetzt`);let le=v?.state==="unavailable"||A?.state==="unavailable";_.push({id:n.id,deviceId:p,sourceEntityId:f.source_entity_id,entityId:T.entity_id,name:b,area:K,batteryLevel:P,batteryType:j,batteryQuantity:bt,batteryTypeAndQuantity:ft||"-",lastReplaced:zt,lastReplacedStr:Tt,lastReported:f.battery_last_reported?new Date(f.battery_last_reported):null,isLow:ne,note:f.note,buttonEntityId:R,isUnavailable:le,state:T.state})}return _}customElements.get("battery-notes-card-editor")||customElements.define("battery-notes-card-editor",G);var B=class extends E{constructor(){super(...arguments);this._searchQuery="";this._activeFilter="all";this._sortBy="battery";this._sortDirection="asc";this._recentlyReplaced=new Set;this._registriesLoaded=!1;this._registries={}}static async getConfigElement(){return document.createElement("battery-notes-card-editor")}static getStubConfig(){return{type:"custom:battery-notes-card",title:"Battery Notes",icon:"mdi:battery-heart-variant",sort_by:"battery",sort_direction:"asc",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,columns:{name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0}}}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={title:"Battery Notes",icon:"mdi:battery-heart-variant",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,sort_by:"battery",sort_direction:"asc",...e,columns:{name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...e.columns||{}}},this._config.sort_by&&(this._sortBy=this._config.sort_by),this._config.sort_direction&&(this._sortDirection=this._config.sort_direction),this._config.filter_low_only&&(this._activeFilter="low")}getCardSize(){return 6}static{this.styles=Yt}connectedCallback(){super.connectedCallback(),this._fetchRegistries()}updated(e){super.updated(e),e.has("hass")&&!this._registriesLoaded&&this._fetchRegistries()}async _fetchRegistries(){if(!(this._registriesLoaded||!this.hass?.connection)){this._registriesLoaded=!0;try{let[e,r,s]=await Promise.all([this.hass.connection.sendMessagePromise({type:"config/entity_registry/list"}).catch(()=>[]),this.hass.connection.sendMessagePromise({type:"config/device_registry/list"}).catch(()=>[]),this.hass.connection.sendMessagePromise({type:"config/area_registry/list"}).catch(()=>[])]);this._registries={entities:e?.length?new Map(e.map(a=>[a.entity_id,a])):void 0,devices:r?.length?new Map(r.map(a=>[a.id,a])):void 0,areas:s?.length?new Map(s.map(a=>[a.area_id,a])):void 0},this.requestUpdate()}catch{}}}_getBatteryDevices(){return ae(this.hass,this._config,this._registries)}_formatRelativeTime(e,r){if(!e)return l("time_never",r);let a=new Date().getTime()-e.getTime();if(a<0)return l("time_today",r);let o=Math.floor(a/(1e3*60*60*24));return o===0?l("time_today",r):o===1?l("time_yesterday",r):o<14?l("time_days_ago",r,{n:o}):o<60?l("time_weeks_ago",r,{n:Math.floor(o/7)}):o<365?l("time_months_ago",r,{n:Math.floor(o/30)}):l("time_years_ago",r,{n:Math.floor(o/365)})}_getBatteryIcon(e){return e===null||isNaN(e)?"mdi:battery-unknown":e<=5?"mdi:battery-alert":e<=15?"mdi:battery-10":e<=25?"mdi:battery-20":e<=35?"mdi:battery-30":e<=45?"mdi:battery-40":e<=55?"mdi:battery-50":e<=65?"mdi:battery-60":e<=75?"mdi:battery-70":e<=85?"mdi:battery-80":e<=95?"mdi:battery-90":"mdi:battery"}_getLevelClass(e){return e===null||isNaN(e)?"unknown":e<=15?"critical":e<=25?"warning":e<=50?"medium":"good"}_handleSort(e){this._sortBy===e?this._sortDirection=this._sortDirection==="asc"?"desc":"asc":(this._sortBy=e,this._sortDirection="asc")}_handleOpenEntity(e){let r=new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0});this.dispatchEvent(r)}async _handleReplaceBattery(e){let r=this.hass?.language||"en";if(this._config.confirm_replace){let s=l("confirm_replace_msg",r,{name:e.name});if(!window.confirm(s))return}try{if(e.buttonEntityId&&this.hass.states[e.buttonEntityId])await this.hass.callService("button","press",{entity_id:e.buttonEntityId});else{let s={};e.deviceId?s.device_id=e.deviceId:e.sourceEntityId?s.source_entity_id=e.sourceEntityId:s.source_entity_id=e.entityId,await this.hass.callService("battery_notes","set_battery_replaced",s)}this._recentlyReplaced=new Set(this._recentlyReplaced).add(e.id),this.requestUpdate(),setTimeout(()=>{this._recentlyReplaced.delete(e.id),this._recentlyReplaced=new Set(this._recentlyReplaced),this.requestUpdate()},3e3)}catch(s){console.error("Failed to mark battery as replaced:",s),alert(`Error replacing battery: ${s instanceof Error?s.message:String(s)}`)}}render(){if(!this.hass)return y``;let e=this.hass.language||"en",r=this._getBatteryDevices(),s=r.length,a=r.filter(n=>n.isLow).length,o=s-a,_=r.filter(n=>{if(this._config.hide_unavailable&&n.isUnavailable||this._activeFilter==="low"&&!n.isLow||this._activeFilter==="critical"&&(n.batteryLevel===null||n.batteryLevel>10))return!1;if(this._searchQuery.trim()){let d=this._searchQuery.toLowerCase(),p=n.name.toLowerCase().includes(d),u=n.batteryTypeAndQuantity.toLowerCase().includes(d),g=n.note?.toLowerCase().includes(d)||!1;if(!p&&!u&&!g)return!1}return!0});_.sort((n,d)=>{let p=0;switch(this._sortBy){case"battery":let u=n.batteryLevel??(this._sortDirection==="asc"?999:-1),g=d.batteryLevel??(this._sortDirection==="asc"?999:-1);p=u-g;break;case"name":p=n.name.localeCompare(d.name);break;case"type":p=n.batteryTypeAndQuantity.localeCompare(d.batteryTypeAndQuantity);break;case"last_replaced":let v=n.lastReplaced?.getTime()??0,A=d.lastReplaced?.getTime()??0;p=v-A;break;case"status":p=(n.isLow?0:1)-(d.isLow?0:1);break}return this._sortDirection==="asc"?p:-p}),this._config.max_rows&&this._config.max_rows>0&&(_=_.slice(0,this._config.max_rows));let c={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{}},m=!!this._config.compact;return y`
      <ha-card class="${m?"compact":""}">
        <div class="card-container">
          <!-- Card Header -->
          ${this._config.show_header!==!1?y`
                <div class="card-header">
                  <div class="header-title-container">
                    <ha-icon
                      class="header-icon"
                      icon="${this._config.icon||"mdi:battery-heart-variant"}"
                    ></ha-icon>
                    <span>${this._config.title||l("card_title",e)}</span>
                  </div>

                  ${this._config.show_summary!==!1?y`
                        <div class="summary-chips">
                          <span class="chip total">
                            ${l("summary_total",e)}: ${s}
                          </span>
                          ${a>0?y`
                                <span class="chip low">
                                  ${l("summary_low",e)}: ${a}
                                </span>
                              `:""}
                          <span class="chip ok">
                            ${l("summary_ok",e)}: ${o}
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
                            placeholder=${l("search_placeholder",e)}
                            @input=${n=>this._searchQuery=n.target.value}
                          />
                          ${this._searchQuery?y`
                                <button
                                  class="search-clear-btn"
                                  @click=${()=>this._searchQuery=""}
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
                            @click=${()=>this._activeFilter="all"}
                          >
                            ${l("filter_all",e)}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter==="low"?"active":""}"
                            @click=${()=>this._activeFilter="low"}
                          >
                            ${l("filter_low",e)} ${a>0?`(${a})`:""}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter==="critical"?"active":""}"
                            @click=${()=>this._activeFilter="critical"}
                          >
                            ${l("filter_critical",e)}
                          </button>
                        </div>
                      `:""}
                </div>
              `:""}

          <!-- Table Content -->
          ${_.length>0?y`
                <div class="table-wrapper">
                  <table class="battery-table">
                    <thead>
                      <tr>
                        ${c.name?y`
                              <th
                                class="col-name-th sortable"
                                @click=${()=>this._handleSort("name")}
                              >
                                <div class="th-content">
                                  <span>${l("col_name",e)}</span>
                                  ${this._sortBy==="name"?y`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.battery?y`
                              <th
                                class="col-battery-th sortable"
                                @click=${()=>this._handleSort("battery")}>
                                <div class="th-content">
                                  <span>${l("col_battery",e)}</span>
                                  ${this._sortBy==="battery"?y`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.type?y`
                              <th
                                class="col-type-th sortable"
                                @click=${()=>this._handleSort("type")}
                              >
                                <div class="th-content">
                                  <span>${l("col_type",e)}</span>
                                  ${this._sortBy==="type"?y`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.last_replaced?y`
                              <th
                                class="col-last-replaced-th sortable"
                                @click=${()=>this._handleSort("last_replaced")}
                              >
                                <div class="th-content">
                                  <span>${l("col_last_replaced",e)}</span>
                                  ${this._sortBy==="last_replaced"?y`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.status?y`
                              <th
                                class="col-status-th sortable"
                                @click=${()=>this._handleSort("status")}
                              >
                                <div class="th-content">
                                  <span>${l("col_status",e)}</span>
                                  ${this._sortBy==="status"?y`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.note?y`<th class="col-note-th">${l("col_note",e)}</th>`:""}
                        ${c.actions?y`<th class="col-actions-th">${l("col_actions",e)}</th>`:""}
                      </tr>
                    </thead>
                    <tbody>
                      ${_.map(n=>{let d=this._getLevelClass(n.batteryLevel),p=this._recentlyReplaced.has(n.id);return y`
                          <tr class="${n.isLow?"row-low":""}">
                            <!-- Name -->
                            ${c.name?y`
                                  <td class="col-name-td">
                                    <div class="device-cell">
                                      <button
                                        class="device-name-btn"
                                        @click=${()=>this._handleOpenEntity(n.entityId)}
                                        title="${n.name}"
                                      >
                                        ${n.name}
                                      </button>
                                      ${n.area&&!n.name.toLowerCase().includes(n.area.toLowerCase())?y`<span class="device-subtext"><ha-icon icon="mdi:map-marker-outline" style="--mdc-icon-size: 12px; margin-right: 2px;"></ha-icon>${n.area}</span>`:""}
                                      ${n.note&&!c.note?y`<span class="device-subtext">${n.note}</span>`:""}
                                    </div>
                                  </td>
                                `:""}

                            <!-- Battery Level -->
                            ${c.battery?y`
                                  <td class="col-battery-td">
                                    <div class="battery-level-cell">
                                      <ha-icon
                                        class="battery-icon level-${d}"
                                        icon="${this._getBatteryIcon(n.batteryLevel)}"
                                      ></ha-icon>
                                      <div class="battery-bar-container">
                                        <div
                                          class="battery-bar-fill bar-${d}"
                                          style="width: ${Math.min(Math.max(n.batteryLevel??0,0),100)}%;"
                                        ></div>
                                      </div>
                                      <span class="battery-percent-text level-${d}">
                                        ${n.batteryLevel!==null?`${Math.round(n.batteryLevel)}%`:"-"}
                                      </span>
                                    </div>
                                  </td>
                                `:""}

                            <!-- Battery Type -->
                            ${c.type?y`
                                  <td class="col-type-td">
                                    <span class="type-badge">
                                      <ha-icon icon="mdi:battery-charging-outline"></ha-icon>
                                      ${n.batteryTypeAndQuantity}
                                    </span>
                                  </td>
                                `:""}

                            <!-- Last Replaced -->
                            ${c.last_replaced?y`
                                  <td class="col-last-replaced-td">
                                    <div
                                      class="last-replaced-cell"
                                      title="${n.lastReplaced?.toLocaleString()||n.lastReplacedStr||""}"
                                    >
                                      <ha-icon icon="mdi:calendar-clock"></ha-icon>
                                      <span>${this._formatRelativeTime(n.lastReplaced,e)}</span>
                                    </div>
                                  </td>
                                `:""}

                            <!-- Status -->
                            ${c.status?y`
                                  <td class="col-status-td">
                                    ${n.isUnavailable?y`<span class="status-badge unavailable"
                                          >${l("status_unavailable",e)}</span
                                        >`:n.isLow?y`<span class="status-badge low"
                                          >${l("status_low",e)}</span
                                        >`:y`<span class="status-badge ok"
                                          >${l("status_ok",e)}</span
                                        >`}
                                  </td>
                                `:""}

                            <!-- Note -->
                            ${c.note?y`
                                  <td class="col-note-td">
                                    <span class="note-text" title="${n.note||""}"
                                      >${n.note||"-"}</span
                                    >
                                  </td>
                                `:""}

                            <!-- Action -->
                            ${c.actions?y`
                                  <td class="col-actions-td">
                                    <button
                                      class="action-btn ${p?"success":""}"
                                      @click=${()=>this._handleReplaceBattery(n)}
                                      title="${l("action_mark_replaced",e)}"
                                    >
                                      <ha-icon
                                        icon="${p?"mdi:check-bold":"mdi:battery-sync"}"
                                      ></ha-icon>
                                      <span
                                        >${p?l("action_replaced",e):l("action_mark_replaced",e)}</span
                                      >
                                    </button>
                                  </td>
                                `:""}
                          </tr>
                        `})}
                    </tbody>
                  </table>
                </div>
              `:y`
                <div class="empty-state">
                  <ha-icon icon="mdi:battery-check"></ha-icon>
                  <span>
                    ${r.length===0?l("no_devices",e):l("no_results",e)}
                  </span>
                </div>
              `}
        </div>
      </ha-card>
    `}};C([Q({attribute:!1})],B.prototype,"hass",2),C([z()],B.prototype,"_config",2),C([z()],B.prototype,"_searchQuery",2),C([z()],B.prototype,"_activeFilter",2),C([z()],B.prototype,"_sortBy",2),C([z()],B.prototype,"_sortDirection",2),C([z()],B.prototype,"_recentlyReplaced",2);customElements.get("battery-notes-card")||customElements.define("battery-notes-card",B);window.customCards=window.customCards||[];window.customCards.push({type:"battery-notes-card",name:"Battery Notes Card",description:"A customizable Lovelace table card for Home Assistant Battery Notes integration.",preview:!0,documentationURL:"https://github.com/vitals5/battery-notes-card"});})();
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
