"use strict";(()=>{var fe=Object.defineProperty;var ye=Object.getOwnPropertyDescriptor;var k=(r,t,e,i)=>{for(var s=i>1?void 0:i?ye(t,e):t,a=r.length-1,o;a>=0;a--)(o=r[a])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&fe(t,e,s),s};var nt=globalThis,lt=nt.ShadowRoot&&(nt.ShadyCSS===void 0||nt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,wt=Symbol(),Tt=new WeakMap,J=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==wt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(lt&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=Tt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Tt.set(e,t))}return t}toString(){return this.cssText}},Dt=r=>new J(typeof r=="string"?r:r+"",void 0,wt),Y=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((i,s,a)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[a+1],r[0]);return new J(e,r,wt)},Ht=(r,t)=>{if(lt)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=nt.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}},$t=lt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Dt(e)})(r):r;var{is:be,defineProperty:ge,getOwnPropertyDescriptor:me,getOwnPropertyNames:ve,getOwnPropertySymbols:we,getPrototypeOf:$e}=Object,ct=globalThis,Ot=ct.trustedTypes,xe=Ot?Ot.emptyScript:"",Se=ct.reactiveElementPolyfillSupport,X=(r,t)=>r,tt={toAttribute(r,t){switch(t){case Boolean:r=r?xe:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},dt=(r,t)=>!be(r,t),It={attribute:!0,type:String,converter:tt,reflect:!1,useDefault:!1,hasChanged:dt};Symbol.metadata??=Symbol("metadata"),ct.litPropertyMetadata??=new WeakMap;var z=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=It){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&ge(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:a}=me(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let u=s?.call(this);a?.call(this,o),this.requestUpdate(t,u,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??It}static _$Ei(){if(this.hasOwnProperty(X("elementProperties")))return;let t=$e(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(X("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(X("properties"))){let e=this.properties,i=[...ve(e),...we(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift($t(s))}else t!==void 0&&e.push($t(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ht(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute!==void 0?i.converter:tt).toAttribute(e,i.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let a=i.getPropertyOptions(s),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:tt;this._$Em=s;let u=o.fromAttribute(e,a.type);this[s]=u??this._$Ej?.get(s)??u,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(t!==void 0){let o=this.constructor;if(s===!1&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??dt)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),a!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,a]of i){let{wrapped:o}=a,u=this[s];o!==!0||this._$AL.has(s)||u===void 0||this.C(s,void 0,a,u)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[X("elementProperties")]=new Map,z[X("finalized")]=new Map,Se?.({ReactiveElement:z}),(ct.reactiveElementVersions??=[]).push("2.1.2");var Bt=globalThis,Ut=r=>r,pt=Bt.trustedTypes,Wt=pt?pt.createPolicy("lit-html",{createHTML:r=>r}):void 0,Gt="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,Kt="?"+T,Ce=`<${Kt}>`,U=document,it=()=>U.createComment(""),rt=r=>r===null||typeof r!="object"&&typeof r!="function",Nt=Array.isArray,Ae=r=>Nt(r)||typeof r?.[Symbol.iterator]=="function",xt=`[ 	
\f\r]`,et=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,jt=/-->/g,qt=/>/g,O=RegExp(`>|${xt}(?:([^\\s"'>=/]+)(${xt}*=${xt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ft=/'/g,Qt=/"/g,Zt=/^(?:script|style|textarea|title)$/i,Rt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),h=Rt(1),Ie=Rt(2),Ue=Rt(3),W=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),Vt=new WeakMap,I=U.createTreeWalker(U,129);function Jt(r,t){if(!Nt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Wt!==void 0?Wt.createHTML(t):t}var ke=(r,t)=>{let e=r.length-1,i=[],s,a=t===2?"<svg>":t===3?"<math>":"",o=et;for(let u=0;u<e;u++){let p=r[u],_,g,l=-1,f=0;for(;f<p.length&&(o.lastIndex=f,g=o.exec(p),g!==null);)f=o.lastIndex,o===et?g[1]==="!--"?o=jt:g[1]!==void 0?o=qt:g[2]!==void 0?(Zt.test(g[2])&&(s=RegExp("</"+g[2],"g")),o=O):g[3]!==void 0&&(o=O):o===O?g[0]===">"?(o=s??et,l=-1):g[1]===void 0?l=-2:(l=o.lastIndex-g[2].length,_=g[1],o=g[3]===void 0?O:g[3]==='"'?Qt:Ft):o===Qt||o===Ft?o=O:o===jt||o===qt?o=et:(o=O,s=void 0);let n=o===O&&r[u+1].startsWith("/>")?" ":"";a+=o===et?p+Ce:l>=0?(i.push(_),p.slice(0,l)+Gt+p.slice(l)+T+n):p+T+(l===-2?u:n)}return[Jt(r,a+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},st=class r{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,o=0,u=t.length-1,p=this.parts,[_,g]=ke(t,e);if(this.el=r.createElement(_,i),I.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=I.nextNode())!==null&&p.length<u;){if(s.nodeType===1){if(s.hasAttributes())for(let l of s.getAttributeNames())if(l.endsWith(Gt)){let f=g[o++],n=s.getAttribute(l).split(T),b=/([.?@])?(.*)/.exec(f);p.push({type:1,index:a,name:b[2],strings:n,ctor:b[1]==="."?Ct:b[1]==="?"?At:b[1]==="@"?kt:Q}),s.removeAttribute(l)}else l.startsWith(T)&&(p.push({type:6,index:a}),s.removeAttribute(l));if(Zt.test(s.tagName)){let l=s.textContent.split(T),f=l.length-1;if(f>0){s.textContent=pt?pt.emptyScript:"";for(let n=0;n<f;n++)s.append(l[n],it()),I.nextNode(),p.push({type:2,index:++a});s.append(l[f],it())}}}else if(s.nodeType===8)if(s.data===Kt)p.push({type:2,index:a});else{let l=-1;for(;(l=s.data.indexOf(T,l+1))!==-1;)p.push({type:7,index:a}),l+=T.length-1}a++}}static createElement(t,e){let i=U.createElement("template");return i.innerHTML=t,i}};function F(r,t,e=r,i){if(t===W)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,a=rt(t)?void 0:t._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),a===void 0?s=void 0:(s=new a(r),s._$AT(r,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=F(r,s._$AS(r,t.values),s,i)),t}var St=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);I.currentNode=s;let a=I.nextNode(),o=0,u=0,p=i[0];for(;p!==void 0;){if(o===p.index){let _;p.type===2?_=new at(a,a.nextSibling,this,t):p.type===1?_=new p.ctor(a,p.name,p.strings,this,t):p.type===6&&(_=new Et(a,this,t)),this._$AV.push(_),p=i[++u]}o!==p?.index&&(a=I.nextNode(),o++)}return I.currentNode=U,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},at=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),rt(t)?t===x||t==null||t===""?(this._$AH!==x&&this._$AR(),this._$AH=x):t!==this._$AH&&t!==W&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ae(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==x&&rt(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=st.createElement(Jt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let a=new St(s,this),o=a.u(this.options);a.p(e),this.T(o),this._$AH=a}}_$AC(t){let e=Vt.get(t.strings);return e===void 0&&Vt.set(t.strings,e=new st(t)),e}k(t){Nt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let a of t)s===e.length?e.push(i=new r(this.O(it()),this.O(it()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Ut(t).nextSibling;Ut(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=x,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=x}_$AI(t,e=this,i,s){let a=this.strings,o=!1;if(a===void 0)t=F(this,t,e,0),o=!rt(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{let u=t,p,_;for(t=a[0],p=0;p<a.length-1;p++)_=F(this,u[i+p],e,p),_===W&&(_=this._$AH[p]),o||=!rt(_)||_!==this._$AH[p],_===x?t=x:t!==x&&(t+=(_??"")+a[p+1]),this._$AH[p]=_}o&&!s&&this.j(t)}j(t){t===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ct=class extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===x?void 0:t}},At=class extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==x)}},kt=class extends Q{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=F(this,t,e,0)??x)===W)return;let i=this._$AH,s=t===x&&i!==x||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==x&&(i===x||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Et=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}};var Ee=Bt.litHtmlPolyfillSupport;Ee?.(st,at),(Bt.litHtmlVersions??=[]).push("3.3.3");var Yt=(r,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let a=e?.renderBefore??null;i._$litPart$=s=new at(t.insertBefore(it(),a),a,void 0,e??{})}return s._$AI(r),s};var Lt=globalThis,N=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Yt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};N._$litElement$=!0,N.finalized=!0,Lt.litElementHydrateSupport?.({LitElement:N});var Be=Lt.litElementPolyfillSupport;Be?.({LitElement:N});(Lt.litElementVersions??=[]).push("4.2.2");var Ne={attribute:!0,type:String,converter:tt,reflect:!1,hasChanged:dt},Re=(r=Ne,t,e)=>{let{kind:i,metadata:s}=e,a=globalThis.litPropertyMetadata.get(s);if(a===void 0&&globalThis.litPropertyMetadata.set(s,a=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),a.set(e.name,r),i==="accessor"){let{name:o}=e;return{set(u){let p=t.get.call(this);t.set.call(this,u),this.requestUpdate(o,p,r,!0,u)},init(u){return u!==void 0&&this.C(o,void 0,r,u),u}}}if(i==="setter"){let{name:o}=e;return function(u){let p=this[o];t.call(this,u),this.requestUpdate(o,p,r,!0,u)}}throw Error("Unsupported decorator location: "+i)};function V(r){return(t,e)=>typeof e=="object"?Re(r,t,e):((i,s,a)=>{let o=s.hasOwnProperty(a);return s.constructor.createProperty(a,i),o?Object.getOwnPropertyDescriptor(s,a):void 0})(r,t,e)}function R(r){return V({...r,state:!0,attribute:!1})}var Xt=Y`
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
`;var te={en:{card_title:"Battery Notes",col_name:"Device",col_battery:"Battery",col_type:"Type",col_last_replaced:"Last Replaced",col_status:"Status",col_note:"Note",col_actions:"Actions",status_low:"Low",status_ok:"OK",status_critical:"Critical",status_unavailable:"Unavailable",action_mark_replaced:"Mark replaced",action_replaced:"Replaced",confirm_replace_title:"Confirm Battery Replacement",confirm_replace_msg:'Mark battery as replaced for "{name}"?',replaced_success:"Battery replacement recorded",search_placeholder:"Search devices, battery type...",filter_all:"All",filter_low:"Low",filter_critical:"Critical",summary_total:"Total",summary_low:"Low",summary_ok:"Good",no_devices:"No Battery Notes devices found.",no_results:"No matching devices found.",time_never:"Never",time_today:"Today",time_yesterday:"Yesterday",time_days_ago:"{n}d ago",time_weeks_ago:"{n}w ago",time_months_ago:"{n}m ago",time_years_ago:"{n}y ago",editor_title:"Title",editor_icon:"Icon",editor_show_header:"Show Header",editor_show_summary:"Show Summary Counters",editor_show_search:"Show Search Bar",editor_show_filters:"Show Quick Filter Pills",editor_compact:"Compact Layout",editor_confirm_replace:"Confirm Before Replacement",editor_sort_by:"Sort By",editor_sort_direction:"Sort Direction",editor_filter_low_only:"Show Low Battery Only",editor_filter_threshold:"Battery Threshold (%)",editor_hide_unavailable:"Hide Unavailable Devices",editor_columns:"Visible Columns",editor_col_name:"Name",editor_col_battery:"Battery Level",editor_col_type:"Battery Type",editor_col_last_replaced:"Last Replaced",editor_col_status:"Status Badge",editor_col_note:"Note",editor_col_actions:"Action Button",show_more:"Show {count} more",show_more_remaining:"Show {count} more ({remaining} remaining)",show_less:"Show less",show_all:"Show all ({count})",editor_initial_rows:"Initial rows to show",editor_step_rows:"Rows to add per click"},de:{card_title:"Batteriest\xE4nde",col_name:"Ger\xE4t",col_battery:"Batterie",col_type:"Typ",col_last_replaced:"Zuletzt gewechselt",col_status:"Status",col_note:"Notiz",col_actions:"Aktionen",status_low:"Niedrig",status_ok:"OK",status_critical:"Kritisch",status_unavailable:"Nicht verf\xFCgbar",action_mark_replaced:"Als gewechselt markieren",action_replaced:"Gewechselt",confirm_replace_title:"Batteriewechsel best\xE4tigen",confirm_replace_msg:'Batterie f\xFCr "{name}" wirklich als gewechselt markieren?',replaced_success:"Batteriewechsel gespeichert",search_placeholder:"Ger\xE4t oder Batterietyp suchen...",filter_all:"Alle",filter_low:"Niedrig",filter_critical:"Kritisch",summary_total:"Gesamt",summary_low:"Niedrig",summary_ok:"In Ordnung",no_devices:"Keine Battery Notes Ger\xE4te gefunden.",no_results:"Keine passenden Ger\xE4te gefunden.",time_never:"Nie",time_today:"Heute",time_yesterday:"Gestern",time_days_ago:"Vor {n} Tagen",time_weeks_ago:"Vor {n} Wochen",time_months_ago:"Vor {n} Monaten",time_years_ago:"Vor {n} Jahren",editor_title:"Titel",editor_icon:"Icon",editor_show_header:"Kopfzeile anzeigen",editor_show_summary:"Zusammenfassung (Z\xE4hler) anzeigen",editor_show_search:"Suchleiste anzeigen",editor_show_filters:"Filter-Buttons anzeigen",editor_compact:"Kompakte Tabelle",editor_confirm_replace:"Best\xE4tigungsdialog vor Wechsel",editor_sort_by:"Sortieren nach",editor_sort_direction:"Sortierrichtung",editor_filter_low_only:"Nur schwache Batterien anzeigen",editor_filter_threshold:"Schwellenwert (%)",editor_hide_unavailable:"Nicht verf\xFCgbare ausblenden",editor_columns:"Sichtbare Spalten",editor_col_name:"Name",editor_col_battery:"Batteriestand",editor_col_type:"Batterietyp",editor_col_last_replaced:"Zuletzt gewechselt",editor_col_status:"Status",editor_col_note:"Notiz",editor_col_actions:"Aktions-Button",show_more:"Weitere {count} anzeigen",show_more_remaining:"Weitere {count} anzeigen (noch {remaining})",show_less:"Weniger anzeigen",show_all:"Alle anzeigen ({count})",editor_initial_rows:"Anzahl Zeilen am Anfang",editor_step_rows:"Weitere Zeilen pro Klick"}};function c(r,t="en",e){let i=t.startsWith("de")?"de":"en",s=te[i]?.[r]||te.en?.[r]||r;if(e)for(let[a,o]of Object.entries(e))s=s.replace(new RegExp(`\\{${a}\\}`,"g"),String(o));return s}var Le=new Set(["batterie fast leer","batterie-typ","batterie - typ","batterietyp","letzter batteriewechsel","batterie zuletzt ersetzt","batterie ersetzt","batterie+","batterie","batterie plus","batterie-plus","battery low","battery type","battery last replaced","battery replaced","battery+","battery","battery plus","battery-plus","battery status","batteriestatus","batterie status"]);function S(r){if(!r)return!0;let t=r.toLowerCase().trim();return!!(Le.has(t)||/^(?:battery|batterie)[_\-\s]*(?:type|typ|low|fast[_\-\s]*leer|replaced|ersetzt|last[_\-\s]*replaced|plus|\+|status)*(?:[_\-\s]*\d+)?$/i.test(t))}function _t(r){return r?r.replace(/\s*(?:[-–—:]|\()\s*(?:Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Batterie Plus|Batterie-Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery Status|Batteriestatus|Batterie Status|Battery|Batterie)\s*\)?$/i,"").replace(/\s+(?:Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Batterie Plus|Batterie-Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery Status|Batteriestatus|Batterie Status|Battery|Batterie)$/i,"").replace(/[\s\-_:–—()]+$/g,"").trim():""}function ze(r){if(!r)return"";let t=_t(r);if(!t)return"";let e=/(?:\s+|-)(?:Rauchalarm|Rauch|Sabotagekontakt|Sabotage|Status|State|Alarm|Detection)$/i;for(;e.test(t);){let i=t.replace(e,"").trim();if(i.length>=3&&!S(i))t=i;else break}return t}function Pe(r){if(!r)return"";let t=r.replace(/([_-])0+([1-9]\d*)\b/g,"$1$2");return t=t.replace(/([_-])(?:sbs\d+[a-f0-9]+|[a-f0-9]*[a-f][a-f0-9]{5,})/gi,""),t=t.replace(/^_+|_+$/g,"").replace(/_+/g," "),t.replace(/\b\w/g,e=>e.toUpperCase()).trim()||r}function ut(r){return(r.includes(".")?r.split(".")[1]:r).replace(/(?:_|-)(?:battery_last_replaced|letzter_batteriewechsel|batterie_zuletzt_ersetzt)$/i,"").replace(/(?:_|-)(?:battery_type|batterie_typ|batterie-typ|batterietyp|batterie_art)$/i,"").replace(/(?:_|-)(?:battery_plus_low|battery_low|batterie_fast_leer|batterie_schwach|niedriger_batteriestand)$/i,"").replace(/(?:_|-)(?:battery_replaced|batterie_ersetzt)$/i,"").replace(/(?:_|-)(?:battery_plus|batterie_plus|battery\+|batterie\+)$/i,"").replace(/(?:_|-)(?:battery_level|batteriestand|batterie_stand|battery|batterie)$/i,"").replace(/_battery$/,"").replace(/_batterie$/,"")}function ee(r,t){if(!r.entity_id.startsWith("sensor."))return!1;if(t?.translation_key==="battery_type")return!0;let e=r.entity_id.toLowerCase();return e.endsWith("_battery_type")||e.endsWith("_batterie_typ")||e.endsWith("_batterie-typ")||e.endsWith("_batterie_art")||e.endsWith("_batterietyp")||e==="sensor.battery_type"||e==="sensor.batterie_typ"||/^sensor\.batterie[_\-]typ(?:_\d+)?$/i.test(e)||/^sensor\.battery[_\-]type(?:_\d+)?$/i.test(e)||r.attributes.battery_type!==void 0&&!r.attributes.device_class}function ie(r,t){if(!r.entity_id.startsWith("sensor."))return!1;if(t?.translation_key==="battery_plus")return!0;let e=r.entity_id.toLowerCase();return e.endsWith("_battery_plus")||e.endsWith("_batterie_plus")||e.endsWith("_battery+")||e.endsWith("_batterie+")||e==="sensor.battery_plus"||e==="sensor.batterie_plus"}function re(r,t){if(!r.entity_id.startsWith("sensor."))return!1;if(t?.translation_key==="battery_last_replaced")return!0;let e=r.entity_id.toLowerCase();return e.endsWith("_battery_last_replaced")||e.endsWith("_letzter_batteriewechsel")||e.endsWith("_batterie_zuletzt_ersetzt")}function se(r,t){if(!r.entity_id.startsWith("binary_sensor."))return!1;if(t?.translation_key==="battery_low"||t?.translation_key==="battery_plus_low"||t?.platform==="battery_notes")return!0;let e=r.entity_id.toLowerCase();return e.endsWith("_battery_low")||e.endsWith("_battery_plus_low")||e.endsWith("_batterie_fast_leer")||e.endsWith("_batterie_schwach")||e.endsWith("_niedriger_batteriestand")}function ae(r,t){if(!r.entity_id.startsWith("button."))return!1;if(t?.translation_key==="battery_replaced")return!0;let e=r.entity_id.toLowerCase();return e.endsWith("_battery_replaced")||e.endsWith("_batterie_ersetzt")}function oe(r,t,e){if(!r||!r.states)return[];let i=r.states,s=[],a=new Map,o=new Map;for(let[g,l]of Object.entries(i)){let f=l.attributes||{},n=e?.entities?.get(g)||r.entities?.[g];if(!(n?.platform==="battery_notes"||ee(l,n)||ie(l,n)||re(l,n)||se(l,n)||ae(l,n)||f.battery_type!==void 0||f.battery_type_and_quantity!==void 0))continue;let y=n?.device_id||f.device_id,w=ut(g);f.source_entity_id&&(S(w)||!w)&&(w=ut(f.source_entity_id)),f.device_name&&(S(w)||!w)&&(w=ut(f.device_name));let C=w,$=null;if(y&&a.has(y)?$=a.get(y):C&&!S(C)&&o.has(C)&&($=o.get(C)),!$)$={id:y?`dev_${y}`:`base_${C}`,deviceId:y,baseName:C,entities:[]},s.push($);else if(y&&!$.deviceId)if(a.has(y)){let D=a.get(y);D!==$&&(D.entities.push(...$.entities),s=s.filter(m=>m!==$),$=D)}else $.deviceId=y;y&&a.set(y,$),C&&!S(C)&&o.set(C,$),$.entities.push(l)}let u=[],p=new Set(t.exclude_entities||[]),_=s;if(t.entities&&t.entities.length>0){let g=new Set(t.entities.map(f=>ut(f))),l=new Set(t.entities);_=_.filter(f=>g.has(f.baseName)||f.deviceId&&l.has(f.deviceId)||f.entities.some(n=>l.has(n.entity_id)))}for(let g of _){let l=g.entities,f=g.deviceId,n=g.baseName,b=n.replace(/([_-])0*[0-9a-f]{6,}\b/i,"");if(p.has(n)||f&&p.has(f)||l.some(d=>p.has(d.entity_id)))continue;let y=l.find(d=>ee(d,e?.entities?.get(d.entity_id)||r.entities?.[d.entity_id])),w=l.find(d=>ie(d,e?.entities?.get(d.entity_id)||r.entities?.[d.entity_id])),C=l.find(d=>re(d,e?.entities?.get(d.entity_id)||r.entities?.[d.entity_id])),$=l.find(d=>se(d,e?.entities?.get(d.entity_id)||r.entities?.[d.entity_id])),D=l.find(d=>ae(d,e?.entities?.get(d.entity_id)||r.entities?.[d.entity_id])),m={};for(let d of l)d.attributes&&Object.assign(m,d.attributes);let ce=!!(t.entities&&t.entities.length>0),de=!!w,pe=!!(y&&(m.battery_type!==void 0||m.battery_type_and_quantity!==void 0||y.state&&y.state!=="unknown"&&y.state!=="unavailable"))||m.battery_type!==void 0||m.battery_type_and_quantity!==void 0||l.some(d=>(e?.entities?.get(d.entity_id)||r.entities?.[d.entity_id])?.platform==="battery_notes");if(!ce&&!de&&!pe)continue;let P=w||y||l[0],j,zt=[`sensor.${n}_battery`,`sensor.${n}_batterie`,`sensor.${n}_battery_level`,`sensor.${n}_batteriestand`,`sensor.${n}_batterie_stand`,`sensor.${n}`];b&&b!==n&&zt.push(`sensor.${b}_battery`,`sensor.${b}_batterie`,`sensor.${b}_battery_level`,`sensor.${b}_batteriestand`,`sensor.${b}`);for(let d of zt)if(i[d]){j=i[d];break}let M=null;if(w&&!isNaN(parseFloat(w.state)))M=parseFloat(w.state);else if(m.source_entity_id&&i[m.source_entity_id]&&!isNaN(parseFloat(i[m.source_entity_id].state)))M=parseFloat(i[m.source_entity_id].state);else if(j&&!isNaN(parseFloat(j.state)))M=parseFloat(j.state);else if(m.battery_last_reported_level!==void 0&&!isNaN(Number(m.battery_last_reported_level)))M=Number(m.battery_last_reported_level);else if(f){let d=e?.entities;for(let[B,A]of Object.entries(i)){if(!B.startsWith("sensor."))continue;if((d?.get(B)||r.entities?.[B])?.device_id===f&&A&&A.attributes?.device_class==="battery"&&!isNaN(parseFloat(A.state))){M=parseFloat(A.state);break}}}let H=f?e?.devices?.get(f)||r.devices?.[f]:void 0,yt=H?.area_id||(P?e?.entities?.get(P.entity_id)?.area_id||r.entities?.[P.entity_id]?.area_id:void 0),K=yt?e?.areas?.get(yt)?.name||r.areas?.[yt]?.name:void 0,v="";if(t.device_names&&(v=t.device_names[n]||(f?t.device_names[f]:"")||""),!v&&H?.name_by_user&&!S(H.name_by_user)&&(v=H.name_by_user),!v&&H?.name&&!S(H.name)&&(v=H.name),!v&&m.device_name&&!S(m.device_name)&&(v=m.device_name),!v&&P){let d=e?.entities?.get(P.entity_id)||r.entities?.[P.entity_id];d?.name&&!S(d.name)&&(v=d.name)}if(!v&&j?.attributes?.friendly_name){let d=_t(j.attributes.friendly_name);d&&!S(d)&&(v=d)}if(!v)for(let d of l){let B=d.attributes?.friendly_name;if(B){let A=_t(B);if(A&&!S(A)){v=A;break}}}if(!v&&m.source_entity_id&&i[m.source_entity_id]?.attributes?.friendly_name){let d=_t(i[m.source_entity_id].attributes.friendly_name);d&&!S(d)&&(v=d)}if(!v&&n&&!S(n)){let d=n.toLowerCase(),B=b.toLowerCase();for(let[A,mt]of Object.entries(i))if(!l.some(ot=>ot.entity_id===A)&&mt.attributes?.friendly_name){let ot=A.includes(".")?A.split(".")[1].toLowerCase():A.toLowerCase();if(ot.startsWith(d)||B.length>=6&&ot.startsWith(B)){let vt=ze(mt.attributes.friendly_name);if(vt&&!S(vt)){v=vt;break}}}}if(K&&(v?v.toLowerCase().includes(K.toLowerCase())||/^(?:smoke[_\-\s]*alarm|rauchmelder|sensor|alarm)$/i.test(v.trim())&&(v=`${K} ${v}`):v=`${K} Rauchmelder`),!v&&!S(n)&&(v=Pe(n)),S(v))continue;let q=m.battery_type||"";!q&&y&&y.state&&y.state!=="unknown"&&y.state!=="unavailable"&&(q=y.state);let bt=Number(m.battery_quantity)||1,gt=m.battery_type_and_quantity||"";!gt&&q&&(gt=bt>1?`${bt}x ${q}`:q);let Pt=null,Mt="",Z=C?.state||m.battery_last_replaced;if(Z&&Z!=="unavailable"&&Z!=="unknown"){Mt=Z;let d=new Date(Z);isNaN(d.getTime())||(Pt=d)}let he=t.filter_threshold??20,ue=$?.state==="on"||m.battery_low===!0||M!==null&&M<=he,L=D?.entity_id;!L&&i[`button.${n}_battery_replaced`]?L=`button.${n}_battery_replaced`:!L&&i[`button.${n}_batterie_ersetzt`]?L=`button.${n}_batterie_ersetzt`:!L&&b&&i[`button.${b}_battery_replaced`]?L=`button.${b}_battery_replaced`:!L&&b&&i[`button.${b}_batterie_ersetzt`]&&(L=`button.${b}_batterie_ersetzt`);let _e=y?.state==="unavailable"||w?.state==="unavailable";u.push({id:g.id,deviceId:f,sourceEntityId:m.source_entity_id,entityId:P.entity_id,name:v,area:K,batteryLevel:M,batteryType:q,batteryQuantity:bt,batteryTypeAndQuantity:gt||"-",lastReplaced:Pt,lastReplacedStr:Mt,lastReported:m.battery_last_reported?new Date(m.battery_last_reported):null,isLow:ue,note:m.note,buttonEntityId:L,isUnavailable:_e,state:P.state})}return u}function ne(r,t,e,i,s){let a=typeof e=="number"?e:Number(e),o=!isNaN(a)&&a>0&&typeof e!="boolean"?Math.floor(a):0,u=typeof i=="number"?i:Number(i),p=!isNaN(u)&&u>0&&typeof i!="boolean"?Math.floor(u):o>0?o:10,_=r;o>0&&(_=t>0?t:o),s&&s>0&&(_=Math.min(_,s)),_=Math.min(r,_);let g=_,l=Math.max(0,r-g),f=Math.min(p,l),n=l>0&&(!s||g<s),b=o>0&&g>o;return{effectiveLimit:_,remainingCount:l,nextStep:f,canShowMore:n,canShowLess:b}}function ft(r){let t={...r};if(t.initial_rows!==void 0){let e=Number(t.initial_rows);typeof t.initial_rows=="boolean"||isNaN(e)||e<=0?delete t.initial_rows:t.initial_rows=Math.floor(e)}if(t.step_rows!==void 0){let e=Number(t.step_rows);typeof t.step_rows=="boolean"||isNaN(e)||e<=0?delete t.step_rows:t.step_rows=Math.floor(e)}return t.title!==void 0&&typeof t.title!="string"&&delete t.title,t.icon!==void 0&&typeof t.icon!="string"&&delete t.icon,t}function le(r){if(r.type==="checkbox"||r.tagName==="HA-SWITCH"||r.tagName==="HA-CHECKBOX")return!!r.checked;if(r.type==="number"){let e=r.value;if(e===""||e===null||e===void 0)return;let i=Number(e);return isNaN(i)||i<=0?void 0:Math.floor(i)}let t=r.value;if(!(typeof t=="string"&&t.trim()===""))return t}var G=class extends N{setConfig(t){this._config=ft(t)}_valueChanged(t,e,i=!1){if(!this._config)return;let s=t.target,a=le(s),o;if(i){let p={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{},[e]:!!a};o={...this._config,columns:p}}else o={...this._config},a===void 0?delete o[e]:o[e]=a;o.type||(o.type="custom:battery-notes-card"),this._config=o;let u=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(u)}render(){if(!this._config)return h``;let t=this.hass?.language||"en",e={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{}};return h`
      <div class="card-config">
        <!-- Basic Settings -->
        <div class="config-row">
          <label class="label">${c("editor_title",t)}</label>
          <input
            type="text"
            class="input-text"
            .value=${typeof this._config.title=="string"?this._config.title:""}
            placeholder=${c("card_title",t)}
            @input=${i=>this._valueChanged(i,"title")}
            @change=${i=>this._valueChanged(i,"title")}
          />
        </div>

        <div class="config-row">
          <label class="label">${c("editor_icon",t)}</label>
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
            <label class="label">${c("editor_sort_by",t)}</label>
            <select
              class="input-select"
              .value=${this._config.sort_by??"battery"}
              @change=${i=>this._valueChanged(i,"sort_by")}
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
            <label class="label">${c("editor_initial_rows",t)}</label>
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
            <label class="label">${c("editor_step_rows",t)}</label>
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
        <div class="section-title">${c("editor_show_filters",t)} & Options</div>

        <div class="toggle-grid">
          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_header??!0}
              @change=${i=>this._valueChanged(i,"show_header")}
            />
            <span>${c("editor_show_header",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_summary??!0}
              @change=${i=>this._valueChanged(i,"show_summary")}
            />
            <span>${c("editor_show_summary",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_search??!0}
              @change=${i=>this._valueChanged(i,"show_search")}
            />
            <span>${c("editor_show_search",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_filters??!0}
              @change=${i=>this._valueChanged(i,"show_filters")}
            />
            <span>${c("editor_show_filters",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.compact??!1}
              @change=${i=>this._valueChanged(i,"compact")}
            />
            <span>${c("editor_compact",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.confirm_replace??!0}
              @change=${i=>this._valueChanged(i,"confirm_replace")}
            />
            <span>${c("editor_confirm_replace",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.filter_low_only??!1}
              @change=${i=>this._valueChanged(i,"filter_low_only")}
            />
            <span>${c("editor_filter_low_only",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.hide_unavailable??!1}
              @change=${i=>this._valueChanged(i,"hide_unavailable")}
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
              @change=${i=>this._valueChanged(i,"name",!0)}
            />
            <span>${c("editor_col_name",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.battery}
              @change=${i=>this._valueChanged(i,"battery",!0)}
            />
            <span>${c("editor_col_battery",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.type}
              @change=${i=>this._valueChanged(i,"type",!0)}
            />
            <span>${c("editor_col_type",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.last_replaced}
              @change=${i=>this._valueChanged(i,"last_replaced",!0)}
            />
            <span>${c("editor_col_last_replaced",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.status}
              @change=${i=>this._valueChanged(i,"status",!0)}
            />
            <span>${c("editor_col_status",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.actions}
              @change=${i=>this._valueChanged(i,"actions",!0)}
            />
            <span>${c("editor_col_actions",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.note}
              @change=${i=>this._valueChanged(i,"note",!0)}
            />
            <span>${c("editor_col_note",t)}</span>
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
  `}};k([V({attribute:!1})],G.prototype,"hass",2),k([R()],G.prototype,"_config",2);customElements.get("battery-notes-card-editor")||customElements.define("battery-notes-card-editor",G);var E=class extends N{constructor(){super(...arguments);this._searchQuery="";this._activeFilter="all";this._sortBy="battery";this._sortDirection="asc";this._recentlyReplaced=new Set;this._displayedRows=0;this._registriesLoaded=!1;this._registries={}}static async getConfigElement(){return document.createElement("battery-notes-card-editor")}static getStubConfig(){return{type:"custom:battery-notes-card",title:"Battery Notes",icon:"mdi:battery-heart-variant",sort_by:"battery",sort_direction:"asc",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,columns:{name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0}}}setConfig(e){if(!e)throw new Error("Invalid configuration");let i=ft(e);this._config={title:"Battery Notes",icon:"mdi:battery-heart-variant",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,sort_by:"battery",sort_direction:"asc",...i,columns:{name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...i.columns||{}}},this._config.sort_by&&(this._sortBy=this._config.sort_by),this._config.sort_direction&&(this._sortDirection=this._config.sort_direction),this._config.filter_low_only&&(this._activeFilter="low"),this._config.initial_rows&&this._config.initial_rows>0?this._displayedRows=this._config.initial_rows:this._displayedRows=0}getCardSize(){return 6}static{this.styles=Xt}connectedCallback(){super.connectedCallback(),this._fetchRegistries()}updated(e){super.updated(e),e.has("hass")&&!this._registriesLoaded&&this._fetchRegistries()}async _fetchRegistries(){if(!(this._registriesLoaded||!this.hass?.connection)){this._registriesLoaded=!0;try{let[e,i,s]=await Promise.all([this.hass.connection.sendMessagePromise({type:"config/entity_registry/list"}).catch(()=>[]),this.hass.connection.sendMessagePromise({type:"config/device_registry/list"}).catch(()=>[]),this.hass.connection.sendMessagePromise({type:"config/area_registry/list"}).catch(()=>[])]);this._registries={entities:e?.length?new Map(e.map(a=>[a.entity_id,a])):void 0,devices:i?.length?new Map(i.map(a=>[a.id,a])):void 0,areas:s?.length?new Map(s.map(a=>[a.area_id,a])):void 0},this.requestUpdate()}catch{}}}_getBatteryDevices(){return oe(this.hass,this._config,this._registries)}_formatRelativeTime(e,i){if(!e)return c("time_never",i);let a=new Date().getTime()-e.getTime();if(a<0)return c("time_today",i);let o=Math.floor(a/(1e3*60*60*24));return o===0?c("time_today",i):o===1?c("time_yesterday",i):o<14?c("time_days_ago",i,{n:o}):o<60?c("time_weeks_ago",i,{n:Math.floor(o/7)}):o<365?c("time_months_ago",i,{n:Math.floor(o/30)}):c("time_years_ago",i,{n:Math.floor(o/365)})}_getBatteryIcon(e){return e===null||isNaN(e)?"mdi:battery-unknown":e<=5?"mdi:battery-alert":e<=15?"mdi:battery-10":e<=25?"mdi:battery-20":e<=35?"mdi:battery-30":e<=45?"mdi:battery-40":e<=55?"mdi:battery-50":e<=65?"mdi:battery-60":e<=75?"mdi:battery-70":e<=85?"mdi:battery-80":e<=95?"mdi:battery-90":"mdi:battery"}_getLevelClass(e){return e===null||isNaN(e)?"unknown":e<=15?"critical":e<=25?"warning":e<=50?"medium":"good"}_handleSort(e){this._sortBy===e?this._sortDirection=this._sortDirection==="asc"?"desc":"asc":(this._sortBy=e,this._sortDirection="asc")}_handleOpenEntity(e){let i=new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0});this.dispatchEvent(i)}async _handleReplaceBattery(e){let i=this.hass?.language||"en";if(this._config.confirm_replace){let s=c("confirm_replace_msg",i,{name:e.name});if(!window.confirm(s))return}try{if(e.buttonEntityId&&this.hass.states[e.buttonEntityId])await this.hass.callService("button","press",{entity_id:e.buttonEntityId});else{let s={};e.deviceId?s.device_id=e.deviceId:e.sourceEntityId?s.source_entity_id=e.sourceEntityId:s.source_entity_id=e.entityId,await this.hass.callService("battery_notes","set_battery_replaced",s)}this._recentlyReplaced=new Set(this._recentlyReplaced).add(e.id),this.requestUpdate(),setTimeout(()=>{this._recentlyReplaced.delete(e.id),this._recentlyReplaced=new Set(this._recentlyReplaced),this.requestUpdate()},3e3)}catch(s){console.error("Failed to mark battery as replaced:",s),alert(`Error replacing battery: ${s instanceof Error?s.message:String(s)}`)}}_handleShowMore(e){let i=this._config.initial_rows&&this._config.initial_rows>0?this._config.initial_rows:10,s=this._displayedRows>0?this._displayedRows:i;this._displayedRows=s+e}_handleShowLess(){this._displayedRows=this._config.initial_rows&&this._config.initial_rows>0?this._config.initial_rows:0}_handleShowAll(e){this._displayedRows=e}render(){if(!this.hass)return h``;let e=this.hass.language||"en",i=this._getBatteryDevices(),s=i.length,a=i.filter(n=>n.isLow).length,o=s-a,u=i.filter(n=>{if(this._config.hide_unavailable&&n.isUnavailable||this._activeFilter==="low"&&!n.isLow||this._activeFilter==="critical"&&(n.batteryLevel===null||n.batteryLevel>10))return!1;if(this._searchQuery.trim()){let b=this._searchQuery.toLowerCase(),y=n.name.toLowerCase().includes(b),w=n.batteryTypeAndQuantity.toLowerCase().includes(b),C=n.note?.toLowerCase().includes(b)||!1;if(!y&&!w&&!C)return!1}return!0});u.sort((n,b)=>{let y=0;switch(this._sortBy){case"battery":let w=n.batteryLevel??(this._sortDirection==="asc"?999:-1),C=b.batteryLevel??(this._sortDirection==="asc"?999:-1);y=w-C;break;case"name":y=n.name.localeCompare(b.name);break;case"type":y=n.batteryTypeAndQuantity.localeCompare(b.batteryTypeAndQuantity);break;case"last_replaced":let $=n.lastReplaced?.getTime()??0,D=b.lastReplaced?.getTime()??0;y=$-D;break;case"status":y=(n.isLow?0:1)-(b.isLow?0:1);break}return this._sortDirection==="asc"?y:-y});let p=u.length,_=ne(p,this._displayedRows,this._config.initial_rows,this._config.step_rows,this._config.max_rows),g=u.slice(0,_.effectiveLimit),l={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{}},f=!!this._config.compact;return h`
      <ha-card class="${f?"compact":""}">
        <div class="card-container">
          <!-- Card Header -->
          ${this._config.show_header!==!1?h`
                <div class="card-header">
                  <div class="header-title-container">
                    <ha-icon
                      class="header-icon"
                      icon="${this._config.icon||"mdi:battery-heart-variant"}"
                    ></ha-icon>
                    <span>${this._config.title||c("card_title",e)}</span>
                  </div>

                  ${this._config.show_summary!==!1?h`
                        <div class="summary-chips">
                          <span class="chip total">
                            ${c("summary_total",e)}: ${s}
                          </span>
                          ${a>0?h`
                                <span class="chip low">
                                  ${c("summary_low",e)}: ${a}
                                </span>
                              `:""}
                          <span class="chip ok">
                            ${c("summary_ok",e)}: ${o}
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
                            placeholder=${c("search_placeholder",e)}
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
                            ${c("filter_all",e)}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter==="low"?"active":""}"
                            @click=${()=>{this._activeFilter="low",this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                          >
                            ${c("filter_low",e)} ${a>0?`(${a})`:""}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter==="critical"?"active":""}"
                            @click=${()=>{this._activeFilter="critical",this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                          >
                            ${c("filter_critical",e)}
                          </button>
                        </div>
                      `:""}
                </div>
              `:""}

          <!-- Table Content -->
          ${g.length>0?h`
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
                                  <span>${c("col_name",e)}</span>
                                  ${this._sortBy==="name"?h`<ha-icon
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
                                  <span>${c("col_battery",e)}</span>
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
                                  <span>${c("col_type",e)}</span>
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
                                  <span>${c("col_last_replaced",e)}</span>
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
                                  <span>${c("col_status",e)}</span>
                                  ${this._sortBy==="status"?h`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${l.note?h`<th class="col-note-th">${c("col_note",e)}</th>`:""}
                        ${l.actions?h`<th class="col-actions-th">${c("col_actions",e)}</th>`:""}
                      </tr>
                    </thead>
                    <tbody>
                      ${g.map(n=>{let b=this._getLevelClass(n.batteryLevel),y=this._recentlyReplaced.has(n.id);return h`
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
                                      ${n.area&&!n.name.toLowerCase().includes(n.area.toLowerCase())?h`<span class="device-subtext"><ha-icon icon="mdi:map-marker-outline" style="--mdc-icon-size: 12px; margin-right: 2px;"></ha-icon>${n.area}</span>`:""}
                                      ${n.note&&!l.note?h`<span class="device-subtext">${n.note}</span>`:""}
                                    </div>
                                  </td>
                                `:""}

                            <!-- Battery Level -->
                            ${l.battery?h`
                                  <td class="col-battery-td">
                                    <div class="battery-level-cell">
                                      <ha-icon
                                        class="battery-icon level-${b}"
                                        icon="${this._getBatteryIcon(n.batteryLevel)}"
                                      ></ha-icon>
                                      <div class="battery-bar-container">
                                        <div
                                          class="battery-bar-fill bar-${b}"
                                          style="width: ${Math.min(Math.max(n.batteryLevel??0,0),100)}%;"
                                        ></div>
                                      </div>
                                      <span class="battery-percent-text level-${b}">
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
                                      <span>${this._formatRelativeTime(n.lastReplaced,e)}</span>
                                    </div>
                                  </td>
                                `:""}

                            <!-- Status -->
                            ${l.status?h`
                                  <td class="col-status-td">
                                    ${n.isUnavailable?h`<span class="status-badge unavailable"
                                          >${c("status_unavailable",e)}</span
                                        >`:n.isLow?h`<span class="status-badge low"
                                          >${c("status_low",e)}</span
                                        >`:h`<span class="status-badge ok"
                                          >${c("status_ok",e)}</span
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
                                      class="action-btn ${y?"success":""}"
                                      @click=${()=>this._handleReplaceBattery(n)}
                                      title="${c("action_mark_replaced",e)}"
                                    >
                                      <ha-icon
                                        icon="${y?"mdi:check-bold":"mdi:battery-sync"}"
                                      ></ha-icon>
                                      <span
                                        >${y?c("action_replaced",e):c("action_mark_replaced",e)}</span
                                      >
                                    </button>
                                  </td>
                                `:""}
                          </tr>
                        `})}
                    </tbody>
                  </table>
                </div>

                ${_.canShowMore||_.canShowLess?h`
                      <div class="pagination-container">
                        ${_.canShowMore?h`
                              <button
                                class="pagination-btn primary"
                                @click=${()=>this._handleShowMore(_.nextStep)}
                              >
                                <ha-icon icon="mdi:chevron-down"></ha-icon>
                                <span>
                                  ${c("show_more_remaining",e,{count:_.nextStep,remaining:_.remainingCount})}
                                </span>
                              </button>
                            `:""}
                        ${_.canShowMore&&_.remainingCount>_.nextStep?h`
                              <button
                                class="pagination-btn secondary"
                                @click=${()=>this._handleShowAll(p)}
                              >
                                <ha-icon icon="mdi:unfold-more-horizontal"></ha-icon>
                                <span>
                                  ${c("show_all",e,{count:p})}
                                </span>
                              </button>
                            `:""}
                        ${_.canShowLess?h`
                              <button
                                class="pagination-btn secondary"
                                @click=${this._handleShowLess}
                              >
                                <ha-icon icon="mdi:chevron-up"></ha-icon>
                                <span>${c("show_less",e)}</span>
                              </button>
                            `:""}
                      </div>
                    `:""}
              `:h`
                <div class="empty-state">
                  <ha-icon icon="mdi:battery-check"></ha-icon>
                  <span>
                    ${i.length===0?c("no_devices",e):c("no_results",e)}
                  </span>
                </div>
              `}
        </div>
      </ha-card>
    `}};k([V({attribute:!1})],E.prototype,"hass",2),k([R()],E.prototype,"_config",2),k([R()],E.prototype,"_searchQuery",2),k([R()],E.prototype,"_activeFilter",2),k([R()],E.prototype,"_sortBy",2),k([R()],E.prototype,"_sortDirection",2),k([R()],E.prototype,"_recentlyReplaced",2),k([R()],E.prototype,"_displayedRows",2);customElements.get("battery-notes-card")||customElements.define("battery-notes-card",E);window.customCards=window.customCards||[];window.customCards.push({type:"battery-notes-card",name:"Battery Notes Card",description:"A customizable Lovelace table card for Home Assistant Battery Notes integration.",preview:!0,documentationURL:"https://github.com/vitals5/battery-notes-card"});})();
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
