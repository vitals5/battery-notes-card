"use strict";(()=>{var ue=Object.defineProperty;var _e=Object.getOwnPropertyDescriptor;var C=(s,t,e,i)=>{for(var r=i>1?void 0:i?_e(t,e):t,a=s.length-1,o;a>=0;a--)(o=s[a])&&(r=(i?o(t,e,r):o(r))||r);return i&&r&&ue(t,e,r),r};var nt=globalThis,lt=nt.ShadowRoot&&(nt.ShadyCSS===void 0||nt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,vt=Symbol(),Tt=new WeakMap,J=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==vt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(lt&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=Tt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Tt.set(e,t))}return t}toString(){return this.cssText}},Mt=s=>new J(typeof s=="string"?s:s+"",void 0,vt),Y=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((i,r,a)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[a+1],s[0]);return new J(e,s,vt)},Dt=(s,t)=>{if(lt)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=nt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},wt=lt?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Mt(e)})(s):s;var{is:ye,defineProperty:be,getOwnPropertyDescriptor:fe,getOwnPropertyNames:me,getOwnPropertySymbols:ge,getPrototypeOf:ve}=Object,ct=globalThis,Ht=ct.trustedTypes,we=Ht?Ht.emptyScript:"",$e=ct.reactiveElementPolyfillSupport,X=(s,t)=>s,tt={toAttribute(s,t){switch(t){case Boolean:s=s?we:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},dt=(s,t)=>!ye(s,t),Ot={attribute:!0,type:String,converter:tt,reflect:!1,useDefault:!1,hasChanged:dt};Symbol.metadata??=Symbol("metadata"),ct.litPropertyMetadata??=new WeakMap;var z=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ot){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&be(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:a}=fe(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){let h=r?.call(this);a?.call(this,o),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ot}static _$Ei(){if(this.hasOwnProperty(X("elementProperties")))return;let t=ve(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(X("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(X("properties"))){let e=this.properties,i=[...me(e),...ge(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(wt(r))}else t!==void 0&&e.push(wt(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Dt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute!==void 0?i.converter:tt).toAttribute(e,i.type);this._$Em=t,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(t,e){let i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let a=i.getPropertyOptions(r),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:tt;this._$Em=r;let h=o.fromAttribute(e,a.type);this[r]=h??this._$Ej?.get(r)??h,this._$Em=null}}requestUpdate(t,e,i,r=!1,a){if(t!==void 0){let o=this.constructor;if(r===!1&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??dt)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),a!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,a]of i){let{wrapped:o}=a,h=this[r];o!==!0||this._$AL.has(r)||h===void 0||this.C(r,void 0,a,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[X("elementProperties")]=new Map,z[X("finalized")]=new Map,$e?.({ReactiveElement:z}),(ct.reactiveElementVersions??=[]).push("2.1.2");var Et=globalThis,Ut=s=>s,pt=Et.trustedTypes,It=pt?pt.createPolicy("lit-html",{createHTML:s=>s}):void 0,Gt="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,Vt="?"+M,xe=`<${Vt}>`,I=document,it=()=>I.createComment(""),rt=s=>s===null||typeof s!="object"&&typeof s!="function",Bt=Array.isArray,Se=s=>Bt(s)||typeof s?.[Symbol.iterator]=="function",$t=`[ 	
\f\r]`,et=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Wt=/-->/g,jt=/>/g,O=RegExp(`>|${$t}(?:([^\\s"'>=/]+)(${$t}*=${$t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qt=/'/g,Ft=/"/g,Kt=/^(?:script|style|textarea|title)$/i,Rt=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),u=Rt(1),He=Rt(2),Oe=Rt(3),W=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),Qt=new WeakMap,U=I.createTreeWalker(I,129);function Zt(s,t){if(!Bt(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return It!==void 0?It.createHTML(t):t}var Ae=(s,t)=>{let e=s.length-1,i=[],r,a=t===2?"<svg>":t===3?"<math>":"",o=et;for(let h=0;h<e;h++){let d=s[h],y,m,c=-1,_=0;for(;_<d.length&&(o.lastIndex=_,m=o.exec(d),m!==null);)_=o.lastIndex,o===et?m[1]==="!--"?o=Wt:m[1]!==void 0?o=jt:m[2]!==void 0?(Kt.test(m[2])&&(r=RegExp("</"+m[2],"g")),o=O):m[3]!==void 0&&(o=O):o===O?m[0]===">"?(o=r??et,c=-1):m[1]===void 0?c=-2:(c=o.lastIndex-m[2].length,y=m[1],o=m[3]===void 0?O:m[3]==='"'?Ft:qt):o===Ft||o===qt?o=O:o===Wt||o===jt?o=et:(o=O,r=void 0);let n=o===O&&s[h+1].startsWith("/>")?" ":"";a+=o===et?d+xe:c>=0?(i.push(y),d.slice(0,c)+Gt+d.slice(c)+M+n):d+M+(c===-2?h:n)}return[Zt(s,a+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},st=class s{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let a=0,o=0,h=t.length-1,d=this.parts,[y,m]=Ae(t,e);if(this.el=s.createElement(y,i),U.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=U.nextNode())!==null&&d.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let c of r.getAttributeNames())if(c.endsWith(Gt)){let _=m[o++],n=r.getAttribute(c).split(M),f=/([.?@])?(.*)/.exec(_);d.push({type:1,index:a,name:f[2],strings:n,ctor:f[1]==="."?St:f[1]==="?"?At:f[1]==="@"?kt:Q}),r.removeAttribute(c)}else c.startsWith(M)&&(d.push({type:6,index:a}),r.removeAttribute(c));if(Kt.test(r.tagName)){let c=r.textContent.split(M),_=c.length-1;if(_>0){r.textContent=pt?pt.emptyScript:"";for(let n=0;n<_;n++)r.append(c[n],it()),U.nextNode(),d.push({type:2,index:++a});r.append(c[_],it())}}}else if(r.nodeType===8)if(r.data===Vt)d.push({type:2,index:a});else{let c=-1;for(;(c=r.data.indexOf(M,c+1))!==-1;)d.push({type:7,index:a}),c+=M.length-1}a++}}static createElement(t,e){let i=I.createElement("template");return i.innerHTML=t,i}};function F(s,t,e=s,i){if(t===W)return t;let r=i!==void 0?e._$Co?.[i]:e._$Cl,a=rt(t)?void 0:t._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),a===void 0?r=void 0:(r=new a(s),r._$AT(s,e,i)),i!==void 0?(e._$Co??=[])[i]=r:e._$Cl=r),r!==void 0&&(t=F(s,r._$AS(s,t.values),r,i)),t}var xt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??I).importNode(e,!0);U.currentNode=r;let a=U.nextNode(),o=0,h=0,d=i[0];for(;d!==void 0;){if(o===d.index){let y;d.type===2?y=new at(a,a.nextSibling,this,t):d.type===1?y=new d.ctor(a,d.name,d.strings,this,t):d.type===6&&(y=new Ct(a,this,t)),this._$AV.push(y),d=i[++h]}o!==d?.index&&(a=U.nextNode(),o++)}return U.currentNode=I,r}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},at=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),rt(t)?t===x||t==null||t===""?(this._$AH!==x&&this._$AR(),this._$AH=x):t!==this._$AH&&t!==W&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Se(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==x&&rt(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=st.createElement(Zt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{let a=new xt(r,this),o=a.u(this.options);a.p(e),this.T(o),this._$AH=a}}_$AC(t){let e=Qt.get(t.strings);return e===void 0&&Qt.set(t.strings,e=new st(t)),e}k(t){Bt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let a of t)r===e.length?e.push(i=new s(this.O(it()),this.O(it()),this,this.options)):i=e[r],i._$AI(a),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Ut(t).nextSibling;Ut(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,a){this.type=1,this._$AH=x,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=x}_$AI(t,e=this,i,r){let a=this.strings,o=!1;if(a===void 0)t=F(this,t,e,0),o=!rt(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{let h=t,d,y;for(t=a[0],d=0;d<a.length-1;d++)y=F(this,h[i+d],e,d),y===W&&(y=this._$AH[d]),o||=!rt(y)||y!==this._$AH[d],y===x?t=x:t!==x&&(t+=(y??"")+a[d+1]),this._$AH[d]=y}o&&!r&&this.j(t)}j(t){t===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},St=class extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===x?void 0:t}},At=class extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==x)}},kt=class extends Q{constructor(t,e,i,r,a){super(t,e,i,r,a),this.type=5}_$AI(t,e=this){if((t=F(this,t,e,0)??x)===W)return;let i=this._$AH,r=t===x&&i!==x||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==x&&(i===x||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ct=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}};var ke=Et.litHtmlPolyfillSupport;ke?.(st,at),(Et.litHtmlVersions??=[]).push("3.3.3");var Jt=(s,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let a=e?.renderBefore??null;i._$litPart$=r=new at(t.insertBefore(it(),a),a,void 0,e??{})}return r._$AI(s),r};var Lt=globalThis,R=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Jt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};R._$litElement$=!0,R.finalized=!0,Lt.litElementHydrateSupport?.({LitElement:R});var Ce=Lt.litElementPolyfillSupport;Ce?.({LitElement:R});(Lt.litElementVersions??=[]).push("4.2.2");var Ee={attribute:!0,type:String,converter:tt,reflect:!1,hasChanged:dt},Be=(s=Ee,t,e)=>{let{kind:i,metadata:r}=e,a=globalThis.litPropertyMetadata.get(r);if(a===void 0&&globalThis.litPropertyMetadata.set(r,a=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),a.set(e.name,s),i==="accessor"){let{name:o}=e;return{set(h){let d=t.get.call(this);t.set.call(this,h),this.requestUpdate(o,d,s,!0,h)},init(h){return h!==void 0&&this.C(o,void 0,s,h),h}}}if(i==="setter"){let{name:o}=e;return function(h){let d=this[o];t.call(this,h),this.requestUpdate(o,d,s,!0,h)}}throw Error("Unsupported decorator location: "+i)};function G(s){return(t,e)=>typeof e=="object"?Be(s,t,e):((i,r,a)=>{let o=r.hasOwnProperty(a);return r.constructor.createProperty(a,i),o?Object.getOwnPropertyDescriptor(r,a):void 0})(s,t,e)}function L(s){return G({...s,state:!0,attribute:!1})}var Yt=Y`
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
`;var Xt={en:{card_title:"Battery Notes",col_name:"Device",col_battery:"Battery",col_type:"Type",col_last_replaced:"Last Replaced",col_status:"Status",col_note:"Note",col_actions:"Actions",status_low:"Low",status_ok:"OK",status_critical:"Critical",status_unavailable:"Unavailable",action_mark_replaced:"Mark replaced",action_replaced:"Replaced",confirm_replace_title:"Confirm Battery Replacement",confirm_replace_msg:'Mark battery as replaced for "{name}"?',replaced_success:"Battery replacement recorded",search_placeholder:"Search devices, battery type...",filter_all:"All",filter_low:"Low",filter_critical:"Critical",summary_total:"Total",summary_low:"Low",summary_ok:"Good",no_devices:"No Battery Notes devices found.",no_results:"No matching devices found.",time_never:"Never",time_today:"Today",time_yesterday:"Yesterday",time_days_ago:"{n}d ago",time_weeks_ago:"{n}w ago",time_months_ago:"{n}m ago",time_years_ago:"{n}y ago",editor_title:"Title",editor_icon:"Icon",editor_show_header:"Show Header",editor_show_summary:"Show Summary Counters",editor_show_search:"Show Search Bar",editor_show_filters:"Show Quick Filter Pills",editor_compact:"Compact Layout",editor_confirm_replace:"Confirm Before Replacement",editor_sort_by:"Sort By",editor_sort_direction:"Sort Direction",editor_filter_low_only:"Show Low Battery Only",editor_filter_threshold:"Battery Threshold (%)",editor_hide_unavailable:"Hide Unavailable Devices",editor_columns:"Visible Columns",editor_col_name:"Name",editor_col_battery:"Battery Level",editor_col_type:"Battery Type",editor_col_last_replaced:"Last Replaced",editor_col_status:"Status Badge",editor_col_note:"Note",editor_col_actions:"Action Button",show_more:"Show {count} more",show_more_remaining:"Show {count} more ({remaining} remaining)",show_less:"Show less",show_all:"Show all ({count})",editor_initial_rows:"Initial rows to show",editor_step_rows:"Rows to add per click"},de:{card_title:"Batteriest\xE4nde",col_name:"Ger\xE4t",col_battery:"Batterie",col_type:"Typ",col_last_replaced:"Zuletzt gewechselt",col_status:"Status",col_note:"Notiz",col_actions:"Aktionen",status_low:"Niedrig",status_ok:"OK",status_critical:"Kritisch",status_unavailable:"Nicht verf\xFCgbar",action_mark_replaced:"Als gewechselt markieren",action_replaced:"Gewechselt",confirm_replace_title:"Batteriewechsel best\xE4tigen",confirm_replace_msg:'Batterie f\xFCr "{name}" wirklich als gewechselt markieren?',replaced_success:"Batteriewechsel gespeichert",search_placeholder:"Ger\xE4t oder Batterietyp suchen...",filter_all:"Alle",filter_low:"Niedrig",filter_critical:"Kritisch",summary_total:"Gesamt",summary_low:"Niedrig",summary_ok:"In Ordnung",no_devices:"Keine Battery Notes Ger\xE4te gefunden.",no_results:"Keine passenden Ger\xE4te gefunden.",time_never:"Nie",time_today:"Heute",time_yesterday:"Gestern",time_days_ago:"Vor {n} Tagen",time_weeks_ago:"Vor {n} Wochen",time_months_ago:"Vor {n} Monaten",time_years_ago:"Vor {n} Jahren",editor_title:"Titel",editor_icon:"Icon",editor_show_header:"Kopfzeile anzeigen",editor_show_summary:"Zusammenfassung (Z\xE4hler) anzeigen",editor_show_search:"Suchleiste anzeigen",editor_show_filters:"Filter-Buttons anzeigen",editor_compact:"Kompakte Tabelle",editor_confirm_replace:"Best\xE4tigungsdialog vor Wechsel",editor_sort_by:"Sortieren nach",editor_sort_direction:"Sortierrichtung",editor_filter_low_only:"Nur schwache Batterien anzeigen",editor_filter_threshold:"Schwellenwert (%)",editor_hide_unavailable:"Nicht verf\xFCgbare ausblenden",editor_columns:"Sichtbare Spalten",editor_col_name:"Name",editor_col_battery:"Batteriestand",editor_col_type:"Batterietyp",editor_col_last_replaced:"Zuletzt gewechselt",editor_col_status:"Status",editor_col_note:"Notiz",editor_col_actions:"Aktions-Button",show_more:"Weitere {count} anzeigen",show_more_remaining:"Weitere {count} anzeigen (noch {remaining})",show_less:"Weniger anzeigen",show_all:"Alle anzeigen ({count})",editor_initial_rows:"Anzahl Zeilen am Anfang",editor_step_rows:"Weitere Zeilen pro Klick"}};function l(s,t="en",e){let i=t.startsWith("de")?"de":"en",r=Xt[i]?.[s]||Xt.en?.[s]||s;if(e)for(let[a,o]of Object.entries(e))r=r.replace(new RegExp(`\\{${a}\\}`,"g"),String(o));return r}var V=class extends R{setConfig(t){this._config={...t}}_valueChanged(t,e,i=!1){if(!this._config)return;let r=t.target,a;r.type==="checkbox"||r.checked!==void 0?a=r.checked:r.type==="number"?a=r.value===""?void 0:Number(r.value):r.value!==void 0&&(a=r.value);let o;if(i){let d={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{},[e]:!!a};o={...this._config,columns:d}}else o={...this._config},a===void 0||a===""?delete o[e]:o[e]=a;this._config=o;let h=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(h)}render(){if(!this._config)return u``;let t=this.hass?.language||"en",e={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{}};return u`
      <div class="card-config">
        <!-- Basic Settings -->
        <div class="config-row">
          <label class="label">${l("editor_title",t)}</label>
          <input
            type="text"
            class="input-text"
            .value=${this._config.title??""}
            placeholder=${l("card_title",t)}
            @input=${i=>this._valueChanged(i,"title")}
          />
        </div>

        <div class="config-row">
          <label class="label">${l("editor_icon",t)}</label>
          <input
            type="text"
            class="input-text"
            .value=${this._config.icon??"mdi:battery-heart-variant"}
            placeholder="mdi:battery-heart-variant"
            @input=${i=>this._valueChanged(i,"icon")}
          />
        </div>

        <!-- Sorting -->
        <div class="config-row two-col">
          <div>
            <label class="label">${l("editor_sort_by",t)}</label>
            <select
              class="input-select"
              .value=${this._config.sort_by??"battery"}
              @change=${i=>this._valueChanged(i,"sort_by")}
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
            <label class="label">${l("editor_initial_rows",t)}</label>
            <input
              type="number"
              min="1"
              class="input-text"
              .value=${this._config.initial_rows??""}
              placeholder="All"
              @input=${i=>this._valueChanged(i,"initial_rows")}
            />
          </div>

          <div>
            <label class="label">${l("editor_step_rows",t)}</label>
            <input
              type="number"
              min="1"
              class="input-text"
              .value=${this._config.step_rows??""}
              placeholder="Same as initial"
              @input=${i=>this._valueChanged(i,"step_rows")}
            />
          </div>
        </div>

        <!-- Filters & Display Options -->
        <div class="section-title">${l("editor_show_filters",t)} & Options</div>

        <div class="toggle-grid">
          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_header??!0}
              @change=${i=>this._valueChanged(i,"show_header")}
            />
            <span>${l("editor_show_header",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_summary??!0}
              @change=${i=>this._valueChanged(i,"show_summary")}
            />
            <span>${l("editor_show_summary",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_search??!0}
              @change=${i=>this._valueChanged(i,"show_search")}
            />
            <span>${l("editor_show_search",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_filters??!0}
              @change=${i=>this._valueChanged(i,"show_filters")}
            />
            <span>${l("editor_show_filters",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.compact??!1}
              @change=${i=>this._valueChanged(i,"compact")}
            />
            <span>${l("editor_compact",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.confirm_replace??!0}
              @change=${i=>this._valueChanged(i,"confirm_replace")}
            />
            <span>${l("editor_confirm_replace",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.filter_low_only??!1}
              @change=${i=>this._valueChanged(i,"filter_low_only")}
            />
            <span>${l("editor_filter_low_only",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.hide_unavailable??!1}
              @change=${i=>this._valueChanged(i,"hide_unavailable")}
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
              @change=${i=>this._valueChanged(i,"name",!0)}
            />
            <span>${l("editor_col_name",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.battery}
              @change=${i=>this._valueChanged(i,"battery",!0)}
            />
            <span>${l("editor_col_battery",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.type}
              @change=${i=>this._valueChanged(i,"type",!0)}
            />
            <span>${l("editor_col_type",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.last_replaced}
              @change=${i=>this._valueChanged(i,"last_replaced",!0)}
            />
            <span>${l("editor_col_last_replaced",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.status}
              @change=${i=>this._valueChanged(i,"status",!0)}
            />
            <span>${l("editor_col_status",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.actions}
              @change=${i=>this._valueChanged(i,"actions",!0)}
            />
            <span>${l("editor_col_actions",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.note}
              @change=${i=>this._valueChanged(i,"note",!0)}
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
  `}};C([G({attribute:!1})],V.prototype,"hass",2),C([L()],V.prototype,"_config",2);var Re=new Set(["batterie fast leer","batterie-typ","batterie - typ","batterietyp","letzter batteriewechsel","batterie zuletzt ersetzt","batterie ersetzt","batterie+","batterie","batterie plus","batterie-plus","battery low","battery type","battery last replaced","battery replaced","battery+","battery","battery plus","battery-plus","battery status","batteriestatus","batterie status"]);function S(s){if(!s)return!0;let t=s.toLowerCase().trim();return!!(Re.has(t)||/^(?:battery|batterie)[_\-\s]*(?:type|typ|low|fast[_\-\s]*leer|replaced|ersetzt|last[_\-\s]*replaced|plus|\+|status)*(?:[_\-\s]*\d+)?$/i.test(t))}function _t(s){return s?s.replace(/\s*(?:[-–—:]|\()\s*(?:Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Batterie Plus|Batterie-Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery Status|Batteriestatus|Batterie Status|Battery|Batterie)\s*\)?$/i,"").replace(/\s+(?:Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Batterie Plus|Batterie-Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery Status|Batteriestatus|Batterie Status|Battery|Batterie)$/i,"").replace(/[\s\-_:–—()]+$/g,"").trim():""}function Le(s){if(!s)return"";let t=_t(s);if(!t)return"";let e=/(?:\s+|-)(?:Rauchalarm|Rauch|Sabotagekontakt|Sabotage|Status|State|Alarm|Detection)$/i;for(;e.test(t);){let i=t.replace(e,"").trim();if(i.length>=3&&!S(i))t=i;else break}return t}function Ne(s){if(!s)return"";let t=s.replace(/([_-])0+([1-9]\d*)\b/g,"$1$2");return t=t.replace(/([_-])(?:sbs\d+[a-f0-9]+|[a-f0-9]*[a-f][a-f0-9]{5,})/gi,""),t=t.replace(/^_+|_+$/g,"").replace(/_+/g," "),t.replace(/\b\w/g,e=>e.toUpperCase()).trim()||s}function ut(s){return(s.includes(".")?s.split(".")[1]:s).replace(/(?:_|-)(?:battery_last_replaced|letzter_batteriewechsel|batterie_zuletzt_ersetzt)$/i,"").replace(/(?:_|-)(?:battery_type|batterie_typ|batterie-typ|batterietyp|batterie_art)$/i,"").replace(/(?:_|-)(?:battery_plus_low|battery_low|batterie_fast_leer|batterie_schwach|niedriger_batteriestand)$/i,"").replace(/(?:_|-)(?:battery_replaced|batterie_ersetzt)$/i,"").replace(/(?:_|-)(?:battery_plus|batterie_plus|battery\+|batterie\+)$/i,"").replace(/(?:_|-)(?:battery_level|batteriestand|batterie_stand|battery|batterie)$/i,"").replace(/_battery$/,"").replace(/_batterie$/,"")}function te(s,t){if(!s.entity_id.startsWith("sensor."))return!1;if(t?.translation_key==="battery_type")return!0;let e=s.entity_id.toLowerCase();return e.endsWith("_battery_type")||e.endsWith("_batterie_typ")||e.endsWith("_batterie-typ")||e.endsWith("_batterie_art")||e.endsWith("_batterietyp")||e==="sensor.battery_type"||e==="sensor.batterie_typ"||/^sensor\.batterie[_\-]typ(?:_\d+)?$/i.test(e)||/^sensor\.battery[_\-]type(?:_\d+)?$/i.test(e)||s.attributes.battery_type!==void 0&&!s.attributes.device_class}function ee(s,t){if(!s.entity_id.startsWith("sensor."))return!1;if(t?.translation_key==="battery_plus")return!0;let e=s.entity_id.toLowerCase();return e.endsWith("_battery_plus")||e.endsWith("_batterie_plus")||e.endsWith("_battery+")||e.endsWith("_batterie+")||e==="sensor.battery_plus"||e==="sensor.batterie_plus"}function ie(s,t){if(!s.entity_id.startsWith("sensor."))return!1;if(t?.translation_key==="battery_last_replaced")return!0;let e=s.entity_id.toLowerCase();return e.endsWith("_battery_last_replaced")||e.endsWith("_letzter_batteriewechsel")||e.endsWith("_batterie_zuletzt_ersetzt")}function re(s,t){if(!s.entity_id.startsWith("binary_sensor."))return!1;if(t?.translation_key==="battery_low"||t?.translation_key==="battery_plus_low"||t?.platform==="battery_notes")return!0;let e=s.entity_id.toLowerCase();return e.endsWith("_battery_low")||e.endsWith("_battery_plus_low")||e.endsWith("_batterie_fast_leer")||e.endsWith("_batterie_schwach")||e.endsWith("_niedriger_batteriestand")}function se(s,t){if(!s.entity_id.startsWith("button."))return!1;if(t?.translation_key==="battery_replaced")return!0;let e=s.entity_id.toLowerCase();return e.endsWith("_battery_replaced")||e.endsWith("_batterie_ersetzt")}function ae(s,t,e){if(!s||!s.states)return[];let i=s.states,r=[],a=new Map,o=new Map;for(let[m,c]of Object.entries(i)){let _=c.attributes||{},n=e?.entities?.get(m)||s.entities?.[m];if(!(n?.platform==="battery_notes"||te(c,n)||ee(c,n)||ie(c,n)||re(c,n)||se(c,n)||_.battery_type!==void 0||_.battery_type_and_quantity!==void 0))continue;let b=n?.device_id||_.device_id,w=ut(m);_.source_entity_id&&(S(w)||!w)&&(w=ut(_.source_entity_id)),_.device_name&&(S(w)||!w)&&(w=ut(_.device_name));let A=w,$=null;if(b&&a.has(b)?$=a.get(b):A&&!S(A)&&o.has(A)&&($=o.get(A)),!$)$={id:b?`dev_${b}`:`base_${A}`,deviceId:b,baseName:A,entities:[]},r.push($);else if(b&&!$.deviceId)if(a.has(b)){let D=a.get(b);D!==$&&(D.entities.push(...$.entities),r=r.filter(g=>g!==$),$=D)}else $.deviceId=b;b&&a.set(b,$),A&&!S(A)&&o.set(A,$),$.entities.push(c)}let h=[],d=new Set(t.exclude_entities||[]),y=r;if(t.entities&&t.entities.length>0){let m=new Set(t.entities.map(_=>ut(_))),c=new Set(t.entities);y=y.filter(_=>m.has(_.baseName)||_.deviceId&&c.has(_.deviceId)||_.entities.some(n=>c.has(n.entity_id)))}for(let m of y){let c=m.entities,_=m.deviceId,n=m.baseName,f=n.replace(/([_-])0*[0-9a-f]{6,}\b/i,"");if(d.has(n)||_&&d.has(_)||c.some(p=>d.has(p.entity_id)))continue;let b=c.find(p=>te(p,e?.entities?.get(p.entity_id)||s.entities?.[p.entity_id])),w=c.find(p=>ee(p,e?.entities?.get(p.entity_id)||s.entities?.[p.entity_id])),A=c.find(p=>ie(p,e?.entities?.get(p.entity_id)||s.entities?.[p.entity_id])),$=c.find(p=>re(p,e?.entities?.get(p.entity_id)||s.entities?.[p.entity_id])),D=c.find(p=>se(p,e?.entities?.get(p.entity_id)||s.entities?.[p.entity_id])),g={};for(let p of c)p.attributes&&Object.assign(g,p.attributes);let ne=!!(t.entities&&t.entities.length>0),le=!!w,ce=!!(b&&(g.battery_type!==void 0||g.battery_type_and_quantity!==void 0||b.state&&b.state!=="unknown"&&b.state!=="unavailable"))||g.battery_type!==void 0||g.battery_type_and_quantity!==void 0||c.some(p=>(e?.entities?.get(p.entity_id)||s.entities?.[p.entity_id])?.platform==="battery_notes");if(!ne&&!le&&!ce)continue;let P=w||b||c[0],j,Nt=[`sensor.${n}_battery`,`sensor.${n}_batterie`,`sensor.${n}_battery_level`,`sensor.${n}_batteriestand`,`sensor.${n}_batterie_stand`,`sensor.${n}`];f&&f!==n&&Nt.push(`sensor.${f}_battery`,`sensor.${f}_batterie`,`sensor.${f}_battery_level`,`sensor.${f}_batteriestand`,`sensor.${f}`);for(let p of Nt)if(i[p]){j=i[p];break}let T=null;if(w&&!isNaN(parseFloat(w.state)))T=parseFloat(w.state);else if(g.source_entity_id&&i[g.source_entity_id]&&!isNaN(parseFloat(i[g.source_entity_id].state)))T=parseFloat(i[g.source_entity_id].state);else if(j&&!isNaN(parseFloat(j.state)))T=parseFloat(j.state);else if(g.battery_last_reported_level!==void 0&&!isNaN(Number(g.battery_last_reported_level)))T=Number(g.battery_last_reported_level);else if(_){let p=e?.entities;for(let[B,k]of Object.entries(i)){if(!B.startsWith("sensor."))continue;if((p?.get(B)||s.entities?.[B])?.device_id===_&&k&&k.attributes?.device_class==="battery"&&!isNaN(parseFloat(k.state))){T=parseFloat(k.state);break}}}let H=_?e?.devices?.get(_)||s.devices?.[_]:void 0,yt=H?.area_id||(P?e?.entities?.get(P.entity_id)?.area_id||s.entities?.[P.entity_id]?.area_id:void 0),K=yt?e?.areas?.get(yt)?.name||s.areas?.[yt]?.name:void 0,v="";if(t.device_names&&(v=t.device_names[n]||(_?t.device_names[_]:"")||""),!v&&H?.name_by_user&&!S(H.name_by_user)&&(v=H.name_by_user),!v&&H?.name&&!S(H.name)&&(v=H.name),!v&&g.device_name&&!S(g.device_name)&&(v=g.device_name),!v&&P){let p=e?.entities?.get(P.entity_id)||s.entities?.[P.entity_id];p?.name&&!S(p.name)&&(v=p.name)}if(!v&&j?.attributes?.friendly_name){let p=_t(j.attributes.friendly_name);p&&!S(p)&&(v=p)}if(!v)for(let p of c){let B=p.attributes?.friendly_name;if(B){let k=_t(B);if(k&&!S(k)){v=k;break}}}if(!v&&g.source_entity_id&&i[g.source_entity_id]?.attributes?.friendly_name){let p=_t(i[g.source_entity_id].attributes.friendly_name);p&&!S(p)&&(v=p)}if(!v&&n&&!S(n)){let p=n.toLowerCase(),B=f.toLowerCase();for(let[k,mt]of Object.entries(i))if(!c.some(ot=>ot.entity_id===k)&&mt.attributes?.friendly_name){let ot=k.includes(".")?k.split(".")[1].toLowerCase():k.toLowerCase();if(ot.startsWith(p)||B.length>=6&&ot.startsWith(B)){let gt=Le(mt.attributes.friendly_name);if(gt&&!S(gt)){v=gt;break}}}}if(K&&(v?v.toLowerCase().includes(K.toLowerCase())||/^(?:smoke[_\-\s]*alarm|rauchmelder|sensor|alarm)$/i.test(v.trim())&&(v=`${K} ${v}`):v=`${K} Rauchmelder`),!v&&!S(n)&&(v=Ne(n)),S(v))continue;let q=g.battery_type||"";!q&&b&&b.state&&b.state!=="unknown"&&b.state!=="unavailable"&&(q=b.state);let bt=Number(g.battery_quantity)||1,ft=g.battery_type_and_quantity||"";!ft&&q&&(ft=bt>1?`${bt}x ${q}`:q);let zt=null,Pt="",Z=A?.state||g.battery_last_replaced;if(Z&&Z!=="unavailable"&&Z!=="unknown"){Pt=Z;let p=new Date(Z);isNaN(p.getTime())||(zt=p)}let de=t.filter_threshold??20,pe=$?.state==="on"||g.battery_low===!0||T!==null&&T<=de,N=D?.entity_id;!N&&i[`button.${n}_battery_replaced`]?N=`button.${n}_battery_replaced`:!N&&i[`button.${n}_batterie_ersetzt`]?N=`button.${n}_batterie_ersetzt`:!N&&f&&i[`button.${f}_battery_replaced`]?N=`button.${f}_battery_replaced`:!N&&f&&i[`button.${f}_batterie_ersetzt`]&&(N=`button.${f}_batterie_ersetzt`);let he=b?.state==="unavailable"||w?.state==="unavailable";h.push({id:m.id,deviceId:_,sourceEntityId:g.source_entity_id,entityId:P.entity_id,name:v,area:K,batteryLevel:T,batteryType:q,batteryQuantity:bt,batteryTypeAndQuantity:ft||"-",lastReplaced:zt,lastReplacedStr:Pt,lastReported:g.battery_last_reported?new Date(g.battery_last_reported):null,isLow:pe,note:g.note,buttonEntityId:N,isUnavailable:he,state:P.state})}return h}function oe(s,t,e,i,r){let a=e&&e>0?e:0,o=i&&i>0?i:a>0?a:10,h=s;a>0&&(h=t>0?t:a),r&&r>0&&(h=Math.min(h,r)),h=Math.min(s,h);let d=h,y=Math.max(0,s-d),m=Math.min(o,y),c=y>0&&(!r||d<r),_=a>0&&d>a;return{effectiveLimit:h,remainingCount:y,nextStep:m,canShowMore:c,canShowLess:_}}customElements.get("battery-notes-card-editor")||customElements.define("battery-notes-card-editor",V);var E=class extends R{constructor(){super(...arguments);this._searchQuery="";this._activeFilter="all";this._sortBy="battery";this._sortDirection="asc";this._recentlyReplaced=new Set;this._displayedRows=0;this._registriesLoaded=!1;this._registries={}}static async getConfigElement(){return document.createElement("battery-notes-card-editor")}static getStubConfig(){return{type:"custom:battery-notes-card",title:"Battery Notes",icon:"mdi:battery-heart-variant",sort_by:"battery",sort_direction:"asc",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,columns:{name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0}}}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={title:"Battery Notes",icon:"mdi:battery-heart-variant",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,sort_by:"battery",sort_direction:"asc",...e,columns:{name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...e.columns||{}}},this._config.sort_by&&(this._sortBy=this._config.sort_by),this._config.sort_direction&&(this._sortDirection=this._config.sort_direction),this._config.filter_low_only&&(this._activeFilter="low"),this._config.initial_rows&&this._config.initial_rows>0?this._displayedRows=this._config.initial_rows:this._displayedRows=0}getCardSize(){return 6}static{this.styles=Yt}connectedCallback(){super.connectedCallback(),this._fetchRegistries()}updated(e){super.updated(e),e.has("hass")&&!this._registriesLoaded&&this._fetchRegistries()}async _fetchRegistries(){if(!(this._registriesLoaded||!this.hass?.connection)){this._registriesLoaded=!0;try{let[e,i,r]=await Promise.all([this.hass.connection.sendMessagePromise({type:"config/entity_registry/list"}).catch(()=>[]),this.hass.connection.sendMessagePromise({type:"config/device_registry/list"}).catch(()=>[]),this.hass.connection.sendMessagePromise({type:"config/area_registry/list"}).catch(()=>[])]);this._registries={entities:e?.length?new Map(e.map(a=>[a.entity_id,a])):void 0,devices:i?.length?new Map(i.map(a=>[a.id,a])):void 0,areas:r?.length?new Map(r.map(a=>[a.area_id,a])):void 0},this.requestUpdate()}catch{}}}_getBatteryDevices(){return ae(this.hass,this._config,this._registries)}_formatRelativeTime(e,i){if(!e)return l("time_never",i);let a=new Date().getTime()-e.getTime();if(a<0)return l("time_today",i);let o=Math.floor(a/(1e3*60*60*24));return o===0?l("time_today",i):o===1?l("time_yesterday",i):o<14?l("time_days_ago",i,{n:o}):o<60?l("time_weeks_ago",i,{n:Math.floor(o/7)}):o<365?l("time_months_ago",i,{n:Math.floor(o/30)}):l("time_years_ago",i,{n:Math.floor(o/365)})}_getBatteryIcon(e){return e===null||isNaN(e)?"mdi:battery-unknown":e<=5?"mdi:battery-alert":e<=15?"mdi:battery-10":e<=25?"mdi:battery-20":e<=35?"mdi:battery-30":e<=45?"mdi:battery-40":e<=55?"mdi:battery-50":e<=65?"mdi:battery-60":e<=75?"mdi:battery-70":e<=85?"mdi:battery-80":e<=95?"mdi:battery-90":"mdi:battery"}_getLevelClass(e){return e===null||isNaN(e)?"unknown":e<=15?"critical":e<=25?"warning":e<=50?"medium":"good"}_handleSort(e){this._sortBy===e?this._sortDirection=this._sortDirection==="asc"?"desc":"asc":(this._sortBy=e,this._sortDirection="asc")}_handleOpenEntity(e){let i=new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0});this.dispatchEvent(i)}async _handleReplaceBattery(e){let i=this.hass?.language||"en";if(this._config.confirm_replace){let r=l("confirm_replace_msg",i,{name:e.name});if(!window.confirm(r))return}try{if(e.buttonEntityId&&this.hass.states[e.buttonEntityId])await this.hass.callService("button","press",{entity_id:e.buttonEntityId});else{let r={};e.deviceId?r.device_id=e.deviceId:e.sourceEntityId?r.source_entity_id=e.sourceEntityId:r.source_entity_id=e.entityId,await this.hass.callService("battery_notes","set_battery_replaced",r)}this._recentlyReplaced=new Set(this._recentlyReplaced).add(e.id),this.requestUpdate(),setTimeout(()=>{this._recentlyReplaced.delete(e.id),this._recentlyReplaced=new Set(this._recentlyReplaced),this.requestUpdate()},3e3)}catch(r){console.error("Failed to mark battery as replaced:",r),alert(`Error replacing battery: ${r instanceof Error?r.message:String(r)}`)}}_handleShowMore(e){let i=this._config.initial_rows&&this._config.initial_rows>0?this._config.initial_rows:10,r=this._displayedRows>0?this._displayedRows:i;this._displayedRows=r+e}_handleShowLess(){this._displayedRows=this._config.initial_rows&&this._config.initial_rows>0?this._config.initial_rows:0}_handleShowAll(e){this._displayedRows=e}render(){if(!this.hass)return u``;let e=this.hass.language||"en",i=this._getBatteryDevices(),r=i.length,a=i.filter(n=>n.isLow).length,o=r-a,h=i.filter(n=>{if(this._config.hide_unavailable&&n.isUnavailable||this._activeFilter==="low"&&!n.isLow||this._activeFilter==="critical"&&(n.batteryLevel===null||n.batteryLevel>10))return!1;if(this._searchQuery.trim()){let f=this._searchQuery.toLowerCase(),b=n.name.toLowerCase().includes(f),w=n.batteryTypeAndQuantity.toLowerCase().includes(f),A=n.note?.toLowerCase().includes(f)||!1;if(!b&&!w&&!A)return!1}return!0});h.sort((n,f)=>{let b=0;switch(this._sortBy){case"battery":let w=n.batteryLevel??(this._sortDirection==="asc"?999:-1),A=f.batteryLevel??(this._sortDirection==="asc"?999:-1);b=w-A;break;case"name":b=n.name.localeCompare(f.name);break;case"type":b=n.batteryTypeAndQuantity.localeCompare(f.batteryTypeAndQuantity);break;case"last_replaced":let $=n.lastReplaced?.getTime()??0,D=f.lastReplaced?.getTime()??0;b=$-D;break;case"status":b=(n.isLow?0:1)-(f.isLow?0:1);break}return this._sortDirection==="asc"?b:-b});let d=h.length,y=oe(d,this._displayedRows,this._config.initial_rows,this._config.step_rows,this._config.max_rows),m=h.slice(0,y.effectiveLimit),c={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{}},_=!!this._config.compact;return u`
      <ha-card class="${_?"compact":""}">
        <div class="card-container">
          <!-- Card Header -->
          ${this._config.show_header!==!1?u`
                <div class="card-header">
                  <div class="header-title-container">
                    <ha-icon
                      class="header-icon"
                      icon="${this._config.icon||"mdi:battery-heart-variant"}"
                    ></ha-icon>
                    <span>${this._config.title||l("card_title",e)}</span>
                  </div>

                  ${this._config.show_summary!==!1?u`
                        <div class="summary-chips">
                          <span class="chip total">
                            ${l("summary_total",e)}: ${r}
                          </span>
                          ${a>0?u`
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
          ${this._config.show_search!==!1||this._config.show_filters!==!1?u`
                <div class="controls-row">
                  ${this._config.show_search!==!1?u`
                        <div class="search-wrapper">
                          <ha-icon class="search-icon-left" icon="mdi:magnify"></ha-icon>
                          <input
                            type="text"
                            class="search-input"
                            .value=${this._searchQuery}
                            placeholder=${l("search_placeholder",e)}
                            @input=${n=>{this._searchQuery=n.target.value,this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
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
                            ${l("filter_all",e)}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter==="low"?"active":""}"
                            @click=${()=>{this._activeFilter="low",this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                          >
                            ${l("filter_low",e)} ${a>0?`(${a})`:""}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter==="critical"?"active":""}"
                            @click=${()=>{this._activeFilter="critical",this._config.initial_rows&&this._config.initial_rows>0&&(this._displayedRows=this._config.initial_rows)}}
                          >
                            ${l("filter_critical",e)}
                          </button>
                        </div>
                      `:""}
                </div>
              `:""}

          <!-- Table Content -->
          ${m.length>0?u`
                <div class="table-wrapper">
                  <table class="battery-table">
                    <thead>
                      <tr>
                        ${c.name?u`
                              <th
                                class="col-name-th sortable"
                                @click=${()=>this._handleSort("name")}
                              >
                                <div class="th-content">
                                  <span>${l("col_name",e)}</span>
                                  ${this._sortBy==="name"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.battery?u`
                              <th
                                class="col-battery-th sortable"
                                @click=${()=>this._handleSort("battery")}>
                                <div class="th-content">
                                  <span>${l("col_battery",e)}</span>
                                  ${this._sortBy==="battery"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.type?u`
                              <th
                                class="col-type-th sortable"
                                @click=${()=>this._handleSort("type")}
                              >
                                <div class="th-content">
                                  <span>${l("col_type",e)}</span>
                                  ${this._sortBy==="type"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.last_replaced?u`
                              <th
                                class="col-last-replaced-th sortable"
                                @click=${()=>this._handleSort("last_replaced")}
                              >
                                <div class="th-content">
                                  <span>${l("col_last_replaced",e)}</span>
                                  ${this._sortBy==="last_replaced"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.status?u`
                              <th
                                class="col-status-th sortable"
                                @click=${()=>this._handleSort("status")}
                              >
                                <div class="th-content">
                                  <span>${l("col_status",e)}</span>
                                  ${this._sortBy==="status"?u`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.note?u`<th class="col-note-th">${l("col_note",e)}</th>`:""}
                        ${c.actions?u`<th class="col-actions-th">${l("col_actions",e)}</th>`:""}
                      </tr>
                    </thead>
                    <tbody>
                      ${m.map(n=>{let f=this._getLevelClass(n.batteryLevel),b=this._recentlyReplaced.has(n.id);return u`
                          <tr class="${n.isLow?"row-low":""}">
                            <!-- Name -->
                            ${c.name?u`
                                  <td class="col-name-td">
                                    <div class="device-cell">
                                      <button
                                        class="device-name-btn"
                                        @click=${()=>this._handleOpenEntity(n.entityId)}
                                        title="${n.name}"
                                      >
                                        ${n.name}
                                      </button>
                                      ${n.area&&!n.name.toLowerCase().includes(n.area.toLowerCase())?u`<span class="device-subtext"><ha-icon icon="mdi:map-marker-outline" style="--mdc-icon-size: 12px; margin-right: 2px;"></ha-icon>${n.area}</span>`:""}
                                      ${n.note&&!c.note?u`<span class="device-subtext">${n.note}</span>`:""}
                                    </div>
                                  </td>
                                `:""}

                            <!-- Battery Level -->
                            ${c.battery?u`
                                  <td class="col-battery-td">
                                    <div class="battery-level-cell">
                                      <ha-icon
                                        class="battery-icon level-${f}"
                                        icon="${this._getBatteryIcon(n.batteryLevel)}"
                                      ></ha-icon>
                                      <div class="battery-bar-container">
                                        <div
                                          class="battery-bar-fill bar-${f}"
                                          style="width: ${Math.min(Math.max(n.batteryLevel??0,0),100)}%;"
                                        ></div>
                                      </div>
                                      <span class="battery-percent-text level-${f}">
                                        ${n.batteryLevel!==null?`${Math.round(n.batteryLevel)}%`:"-"}
                                      </span>
                                    </div>
                                  </td>
                                `:""}

                            <!-- Battery Type -->
                            ${c.type?u`
                                  <td class="col-type-td">
                                    <span class="type-badge">
                                      <ha-icon icon="mdi:battery-charging-outline"></ha-icon>
                                      ${n.batteryTypeAndQuantity}
                                    </span>
                                  </td>
                                `:""}

                            <!-- Last Replaced -->
                            ${c.last_replaced?u`
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
                            ${c.status?u`
                                  <td class="col-status-td">
                                    ${n.isUnavailable?u`<span class="status-badge unavailable"
                                          >${l("status_unavailable",e)}</span
                                        >`:n.isLow?u`<span class="status-badge low"
                                          >${l("status_low",e)}</span
                                        >`:u`<span class="status-badge ok"
                                          >${l("status_ok",e)}</span
                                        >`}
                                  </td>
                                `:""}

                            <!-- Note -->
                            ${c.note?u`
                                  <td class="col-note-td">
                                    <span class="note-text" title="${n.note||""}"
                                      >${n.note||"-"}</span
                                    >
                                  </td>
                                `:""}

                            <!-- Action -->
                            ${c.actions?u`
                                  <td class="col-actions-td">
                                    <button
                                      class="action-btn ${b?"success":""}"
                                      @click=${()=>this._handleReplaceBattery(n)}
                                      title="${l("action_mark_replaced",e)}"
                                    >
                                      <ha-icon
                                        icon="${b?"mdi:check-bold":"mdi:battery-sync"}"
                                      ></ha-icon>
                                      <span
                                        >${b?l("action_replaced",e):l("action_mark_replaced",e)}</span
                                      >
                                    </button>
                                  </td>
                                `:""}
                          </tr>
                        `})}
                    </tbody>
                  </table>
                </div>

                ${y.canShowMore||y.canShowLess?u`
                      <div class="pagination-container">
                        ${y.canShowMore?u`
                              <button
                                class="pagination-btn primary"
                                @click=${()=>this._handleShowMore(y.nextStep)}
                              >
                                <ha-icon icon="mdi:chevron-down"></ha-icon>
                                <span>
                                  ${l("show_more_remaining",e,{count:y.nextStep,remaining:y.remainingCount})}
                                </span>
                              </button>
                            `:""}
                        ${y.canShowMore&&y.remainingCount>y.nextStep?u`
                              <button
                                class="pagination-btn secondary"
                                @click=${()=>this._handleShowAll(d)}
                              >
                                <ha-icon icon="mdi:unfold-more-horizontal"></ha-icon>
                                <span>
                                  ${l("show_all",e,{count:d})}
                                </span>
                              </button>
                            `:""}
                        ${y.canShowLess?u`
                              <button
                                class="pagination-btn secondary"
                                @click=${this._handleShowLess}
                              >
                                <ha-icon icon="mdi:chevron-up"></ha-icon>
                                <span>${l("show_less",e)}</span>
                              </button>
                            `:""}
                      </div>
                    `:""}
              `:u`
                <div class="empty-state">
                  <ha-icon icon="mdi:battery-check"></ha-icon>
                  <span>
                    ${i.length===0?l("no_devices",e):l("no_results",e)}
                  </span>
                </div>
              `}
        </div>
      </ha-card>
    `}};C([G({attribute:!1})],E.prototype,"hass",2),C([L()],E.prototype,"_config",2),C([L()],E.prototype,"_searchQuery",2),C([L()],E.prototype,"_activeFilter",2),C([L()],E.prototype,"_sortBy",2),C([L()],E.prototype,"_sortDirection",2),C([L()],E.prototype,"_recentlyReplaced",2),C([L()],E.prototype,"_displayedRows",2);customElements.get("battery-notes-card")||customElements.define("battery-notes-card",E);window.customCards=window.customCards||[];window.customCards.push({type:"battery-notes-card",name:"Battery Notes Card",description:"A customizable Lovelace table card for Home Assistant Battery Notes integration.",preview:!0,documentationURL:"https://github.com/vitals5/battery-notes-card"});})();
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
