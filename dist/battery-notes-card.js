"use strict";(()=>{var Wt=Object.defineProperty;var jt=Object.getOwnPropertyDescriptor;var $=(i,t,e,s)=>{for(var r=s>1?void 0:s?jt(t,e):t,a=i.length-1,o;a>=0;a--)(o=i[a])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&Wt(t,e,r),r};var Z=globalThis,J=Z.ShadowRoot&&(Z.ShadyCSS===void 0||Z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,at=Symbol(),vt=new WeakMap,M=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==at)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(J&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=vt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&vt.set(e,t))}return t}toString(){return this.cssText}},$t=i=>new M(typeof i=="string"?i:i+"",void 0,at),H=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,r,a)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[a+1],i[0]);return new M(e,i,at)},wt=(i,t)=>{if(J)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=Z.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},ot=J?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return $t(e)})(i):i;var{is:Ft,defineProperty:qt,getOwnPropertyDescriptor:Qt,getOwnPropertyNames:Vt,getOwnPropertySymbols:Kt,getPrototypeOf:Gt}=Object,Y=globalThis,xt=Y.trustedTypes,Zt=xt?xt.emptyScript:"",Jt=Y.reactiveElementPolyfillSupport,I=(i,t)=>i,W={toAttribute(i,t){switch(t){case Boolean:i=i?Zt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},X=(i,t)=>!Ft(i,t),At={attribute:!0,type:String,converter:W,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;var S=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=At){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&qt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:a}=Qt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){let l=r?.call(this);a?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??At}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;let t=Gt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){let e=this.properties,s=[...Vt(e),...Kt(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(ot(r))}else t!==void 0&&e.push(ot(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return wt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){let a=(s.converter?.toAttribute!==void 0?s.converter:W).toAttribute(e,s.type);this._$Em=t,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(t,e){let s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let a=s.getPropertyOptions(r),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:W;this._$Em=r;let l=o.fromAttribute(e,a.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,e,s,r=!1,a){if(t!==void 0){let o=this.constructor;if(r===!1&&(a=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??X)(a,e)||s.useDefault&&s.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:a},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),a!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,a]of s){let{wrapped:o}=a,l=this[r];o!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,a,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[I("elementProperties")]=new Map,S[I("finalized")]=new Map,Jt?.({ReactiveElement:S}),(Y.reactiveElementVersions??=[]).push("2.1.2");var ut=globalThis,St=i=>i,tt=ut.trustedTypes,kt=tt?tt.createPolicy("lit-html",{createHTML:i=>i}):void 0,Tt="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Lt="?"+C,Yt=`<${Lt}>`,R=document,F=()=>R.createComment(""),q=i=>i===null||typeof i!="object"&&typeof i!="function",_t=Array.isArray,Xt=i=>_t(i)||typeof i?.[Symbol.iterator]=="function",nt=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Et=/-->/g,Ct=/>/g,B=RegExp(`>|${nt}(?:([^\\s"'>=/]+)(${nt}*=${nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bt=/'/g,Nt=/"/g,Pt=/^(?:script|style|textarea|title)$/i,yt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),p=yt(1),de=yt(2),he=yt(3),T=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Rt=new WeakMap,N=R.createTreeWalker(R,129);function zt(i,t){if(!_t(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return kt!==void 0?kt.createHTML(t):t}var te=(i,t)=>{let e=i.length-1,s=[],r,a=t===2?"<svg>":t===3?"<math>":"",o=j;for(let l=0;l<e;l++){let c=i[l],u,n,h=-1,y=0;for(;y<c.length&&(o.lastIndex=y,n=o.exec(c),n!==null);)y=o.lastIndex,o===j?n[1]==="!--"?o=Et:n[1]!==void 0?o=Ct:n[2]!==void 0?(Pt.test(n[2])&&(r=RegExp("</"+n[2],"g")),o=B):n[3]!==void 0&&(o=B):o===B?n[0]===">"?(o=r??j,h=-1):n[1]===void 0?h=-2:(h=o.lastIndex-n[2].length,u=n[1],o=n[3]===void 0?B:n[3]==='"'?Nt:Bt):o===Nt||o===Bt?o=B:o===Et||o===Ct?o=j:(o=B,r=void 0);let g=o===B&&i[l+1].startsWith("/>")?" ":"";a+=o===j?c+Yt:h>=0?(s.push(u),c.slice(0,h)+Tt+c.slice(h)+C+g):c+C+(h===-2?l:g)}return[zt(i,a+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},Q=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let a=0,o=0,l=t.length-1,c=this.parts,[u,n]=te(t,e);if(this.el=i.createElement(u,s),N.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=N.nextNode())!==null&&c.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith(Tt)){let y=n[o++],g=r.getAttribute(h).split(C),v=/([.?@])?(.*)/.exec(y);c.push({type:1,index:a,name:v[2],strings:g,ctor:v[1]==="."?ct:v[1]==="?"?dt:v[1]==="@"?ht:z}),r.removeAttribute(h)}else h.startsWith(C)&&(c.push({type:6,index:a}),r.removeAttribute(h));if(Pt.test(r.tagName)){let h=r.textContent.split(C),y=h.length-1;if(y>0){r.textContent=tt?tt.emptyScript:"";for(let g=0;g<y;g++)r.append(h[g],F()),N.nextNode(),c.push({type:2,index:++a});r.append(h[y],F())}}}else if(r.nodeType===8)if(r.data===Lt)c.push({type:2,index:a});else{let h=-1;for(;(h=r.data.indexOf(C,h+1))!==-1;)c.push({type:7,index:a}),h+=C.length-1}a++}}static createElement(t,e){let s=R.createElement("template");return s.innerHTML=t,s}};function P(i,t,e=i,s){if(t===T)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl,a=q(t)?void 0:t._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),a===void 0?r=void 0:(r=new a(i),r._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=P(i,r._$AS(i,t.values),r,s)),t}var lt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??R).importNode(e,!0);N.currentNode=r;let a=N.nextNode(),o=0,l=0,c=s[0];for(;c!==void 0;){if(o===c.index){let u;c.type===2?u=new V(a,a.nextSibling,this,t):c.type===1?u=new c.ctor(a,c.name,c.strings,this,t):c.type===6&&(u=new pt(a,this,t)),this._$AV.push(u),c=s[++l]}o!==c?.index&&(a=N.nextNode(),o++)}return N.currentNode=R,r}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},V=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),q(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==T&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Xt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&q(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Q.createElement(zt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{let a=new lt(r,this),o=a.u(this.options);a.p(e),this.T(o),this._$AH=a}}_$AC(t){let e=Rt.get(t.strings);return e===void 0&&Rt.set(t.strings,e=new Q(t)),e}k(t){_t(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let a of t)r===e.length?e.push(s=new i(this.O(F()),this.O(F()),this,this.options)):s=e[r],s._$AI(a),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=St(t).nextSibling;St(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,a){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(t,e=this,s,r){let a=this.strings,o=!1;if(a===void 0)t=P(this,t,e,0),o=!q(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else{let l=t,c,u;for(t=a[0],c=0;c<a.length-1;c++)u=P(this,l[s+c],e,c),u===T&&(u=this._$AH[c]),o||=!q(u)||u!==this._$AH[c],u===m?t=m:t!==m&&(t+=(u??"")+a[c+1]),this._$AH[c]=u}o&&!r&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ct=class extends z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},dt=class extends z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},ht=class extends z{constructor(t,e,s,r,a){super(t,e,s,r,a),this.type=5}_$AI(t,e=this){if((t=P(this,t,e,0)??m)===T)return;let s=this._$AH,r=t===m&&s!==m||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,a=t!==m&&(s===m||r);r&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},pt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}};var ee=ut.litHtmlPolyfillSupport;ee?.(Q,V),(ut.litHtmlVersions??=[]).push("3.3.3");var Dt=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let a=e?.renderBefore??null;s._$litPart$=r=new V(t.insertBefore(F(),a),a,void 0,e??{})}return r._$AI(i),r};var bt=globalThis,w=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Dt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}};w._$litElement$=!0,w.finalized=!0,bt.litElementHydrateSupport?.({LitElement:w});var se=bt.litElementPolyfillSupport;se?.({LitElement:w});(bt.litElementVersions??=[]).push("4.2.2");var re={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:X},ie=(i=re,t,e)=>{let{kind:s,metadata:r}=e,a=globalThis.litPropertyMetadata.get(r);if(a===void 0&&globalThis.litPropertyMetadata.set(r,a=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),a.set(e.name,i),s==="accessor"){let{name:o}=e;return{set(l){let c=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,c,i,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,i,l),l}}}if(s==="setter"){let{name:o}=e;return function(l){let c=this[o];t.call(this,l),this.requestUpdate(o,c,i,!0,l)}}throw Error("Unsupported decorator location: "+s)};function D(i){return(t,e)=>typeof e=="object"?ie(i,t,e):((s,r,a)=>{let o=r.hasOwnProperty(a);return r.constructor.createProperty(a,s),o?Object.getOwnPropertyDescriptor(r,a):void 0})(i,t,e)}function k(i){return D({...i,state:!0,attribute:!1})}var Ot=H`
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
`;var Ut={en:{card_title:"Battery Notes",col_name:"Device",col_battery:"Battery",col_type:"Type",col_last_replaced:"Last Replaced",col_status:"Status",col_note:"Note",col_actions:"Actions",status_low:"Low",status_ok:"OK",status_critical:"Critical",status_unavailable:"Unavailable",action_mark_replaced:"Mark replaced",action_replaced:"Replaced",confirm_replace_title:"Confirm Battery Replacement",confirm_replace_msg:'Mark battery as replaced for "{name}"?',replaced_success:"Battery replacement recorded",search_placeholder:"Search devices, battery type...",filter_all:"All",filter_low:"Low",filter_critical:"Critical",summary_total:"Total",summary_low:"Low",summary_ok:"Good",no_devices:"No Battery Notes devices found.",no_results:"No matching devices found.",time_never:"Never",time_today:"Today",time_yesterday:"Yesterday",time_days_ago:"{n}d ago",time_weeks_ago:"{n}w ago",time_months_ago:"{n}m ago",time_years_ago:"{n}y ago",editor_title:"Title",editor_icon:"Icon",editor_show_header:"Show Header",editor_show_summary:"Show Summary Counters",editor_show_search:"Show Search Bar",editor_show_filters:"Show Quick Filter Pills",editor_compact:"Compact Layout",editor_confirm_replace:"Confirm Before Replacement",editor_sort_by:"Sort By",editor_sort_direction:"Sort Direction",editor_filter_low_only:"Show Low Battery Only",editor_filter_threshold:"Battery Threshold (%)",editor_hide_unavailable:"Hide Unavailable Devices",editor_columns:"Visible Columns",editor_col_name:"Name",editor_col_battery:"Battery Level",editor_col_type:"Battery Type",editor_col_last_replaced:"Last Replaced",editor_col_status:"Status Badge",editor_col_note:"Note",editor_col_actions:"Action Button"},de:{card_title:"Batteriest\xE4nde",col_name:"Ger\xE4t",col_battery:"Batterie",col_type:"Typ",col_last_replaced:"Zuletzt gewechselt",col_status:"Status",col_note:"Notiz",col_actions:"Aktionen",status_low:"Niedrig",status_ok:"OK",status_critical:"Kritisch",status_unavailable:"Nicht verf\xFCgbar",action_mark_replaced:"Als gewechselt markieren",action_replaced:"Gewechselt",confirm_replace_title:"Batteriewechsel best\xE4tigen",confirm_replace_msg:'Batterie f\xFCr "{name}" wirklich als gewechselt markieren?',replaced_success:"Batteriewechsel gespeichert",search_placeholder:"Ger\xE4t oder Batterietyp suchen...",filter_all:"Alle",filter_low:"Niedrig",filter_critical:"Kritisch",summary_total:"Gesamt",summary_low:"Niedrig",summary_ok:"In Ordnung",no_devices:"Keine Battery Notes Ger\xE4te gefunden.",no_results:"Keine passenden Ger\xE4te gefunden.",time_never:"Nie",time_today:"Heute",time_yesterday:"Gestern",time_days_ago:"Vor {n} Tagen",time_weeks_ago:"Vor {n} Wochen",time_months_ago:"Vor {n} Monaten",time_years_ago:"Vor {n} Jahren",editor_title:"Titel",editor_icon:"Icon",editor_show_header:"Kopfzeile anzeigen",editor_show_summary:"Zusammenfassung (Z\xE4hler) anzeigen",editor_show_search:"Suchleiste anzeigen",editor_show_filters:"Filter-Buttons anzeigen",editor_compact:"Kompakte Tabelle",editor_confirm_replace:"Best\xE4tigungsdialog vor Wechsel",editor_sort_by:"Sortieren nach",editor_sort_direction:"Sortierrichtung",editor_filter_low_only:"Nur schwache Batterien anzeigen",editor_filter_threshold:"Schwellenwert (%)",editor_hide_unavailable:"Nicht verf\xFCgbare ausblenden",editor_columns:"Sichtbare Spalten",editor_col_name:"Name",editor_col_battery:"Batteriestand",editor_col_type:"Batterietyp",editor_col_last_replaced:"Zuletzt gewechselt",editor_col_status:"Status",editor_col_note:"Notiz",editor_col_actions:"Aktions-Button"}};function d(i,t="en",e){let s=t.startsWith("de")?"de":"en",r=Ut[s]?.[i]||Ut.en?.[i]||i;if(e)for(let[a,o]of Object.entries(e))r=r.replace(new RegExp(`\\{${a}\\}`,"g"),String(o));return r}var O=class extends w{setConfig(t){this._config={...t}}_valueChanged(t,e,s=!1){if(!this._config)return;let r=t.target,a;r.type==="checkbox"||r.checked!==void 0?a=r.checked:r.value!==void 0&&(a=r.value);let o;if(s){let c={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{},[e]:!!a};o={...this._config,columns:c}}else o={...this._config,[e]:a};this._config=o;let l=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(l)}render(){if(!this._config)return p``;let t=this.hass?.language||"en",e={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{}};return p`
      <div class="card-config">
        <!-- Basic Settings -->
        <div class="config-row">
          <label class="label">${d("editor_title",t)}</label>
          <input
            type="text"
            class="input-text"
            .value=${this._config.title??""}
            placeholder=${d("card_title",t)}
            @input=${s=>this._valueChanged(s,"title")}
          />
        </div>

        <div class="config-row">
          <label class="label">${d("editor_icon",t)}</label>
          <input
            type="text"
            class="input-text"
            .value=${this._config.icon??"mdi:battery-heart-variant"}
            placeholder="mdi:battery-heart-variant"
            @input=${s=>this._valueChanged(s,"icon")}
          />
        </div>

        <!-- Sorting -->
        <div class="config-row two-col">
          <div>
            <label class="label">${d("editor_sort_by",t)}</label>
            <select
              class="input-select"
              .value=${this._config.sort_by??"battery"}
              @change=${s=>this._valueChanged(s,"sort_by")}
            >
              <option value="battery">${d("editor_col_battery",t)}</option>
              <option value="name">${d("editor_col_name",t)}</option>
              <option value="type">${d("editor_col_type",t)}</option>
              <option value="last_replaced">${d("editor_col_last_replaced",t)}</option>
              <option value="status">${d("editor_col_status",t)}</option>
            </select>
          </div>

          <div>
            <label class="label">${d("editor_sort_direction",t)}</label>
            <select
              class="input-select"
              .value=${this._config.sort_direction??"asc"}
              @change=${s=>this._valueChanged(s,"sort_direction")}
            >
              <option value="asc">Ascending (0% -> 100% / A -> Z)</option>
              <option value="desc">Descending (100% -> 0% / Z -> A)</option>
            </select>
          </div>
        </div>

        <!-- Filters & Display Options -->
        <div class="section-title">${d("editor_show_filters",t)} & Options</div>

        <div class="toggle-grid">
          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_header??!0}
              @change=${s=>this._valueChanged(s,"show_header")}
            />
            <span>${d("editor_show_header",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_summary??!0}
              @change=${s=>this._valueChanged(s,"show_summary")}
            />
            <span>${d("editor_show_summary",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_search??!0}
              @change=${s=>this._valueChanged(s,"show_search")}
            />
            <span>${d("editor_show_search",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.show_filters??!0}
              @change=${s=>this._valueChanged(s,"show_filters")}
            />
            <span>${d("editor_show_filters",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.compact??!1}
              @change=${s=>this._valueChanged(s,"compact")}
            />
            <span>${d("editor_compact",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.confirm_replace??!0}
              @change=${s=>this._valueChanged(s,"confirm_replace")}
            />
            <span>${d("editor_confirm_replace",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.filter_low_only??!1}
              @change=${s=>this._valueChanged(s,"filter_low_only")}
            />
            <span>${d("editor_filter_low_only",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${this._config.hide_unavailable??!1}
              @change=${s=>this._valueChanged(s,"hide_unavailable")}
            />
            <span>${d("editor_hide_unavailable",t)}</span>
          </label>
        </div>

        <!-- Visible Columns -->
        <div class="section-title">${d("editor_columns",t)}</div>

        <div class="toggle-grid">
          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.name}
              @change=${s=>this._valueChanged(s,"name",!0)}
            />
            <span>${d("editor_col_name",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.battery}
              @change=${s=>this._valueChanged(s,"battery",!0)}
            />
            <span>${d("editor_col_battery",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.type}
              @change=${s=>this._valueChanged(s,"type",!0)}
            />
            <span>${d("editor_col_type",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.last_replaced}
              @change=${s=>this._valueChanged(s,"last_replaced",!0)}
            />
            <span>${d("editor_col_last_replaced",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.status}
              @change=${s=>this._valueChanged(s,"status",!0)}
            />
            <span>${d("editor_col_status",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.actions}
              @change=${s=>this._valueChanged(s,"actions",!0)}
            />
            <span>${d("editor_col_actions",t)}</span>
          </label>

          <label class="toggle-label">
            <input
              type="checkbox"
              .checked=${e.note}
              @change=${s=>this._valueChanged(s,"note",!0)}
            />
            <span>${d("editor_col_note",t)}</span>
          </label>
        </div>
      </div>
    `}static{this.styles=H`
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
  `}};$([D({attribute:!1})],O.prototype,"hass",2),$([k()],O.prototype,"_config",2);customElements.get("battery-notes-card-editor")||customElements.define("battery-notes-card-editor",O);var x=class extends w{constructor(){super(...arguments);this._searchQuery="";this._activeFilter="all";this._sortBy="battery";this._sortDirection="asc";this._recentlyReplaced=new Set}static async getConfigElement(){return document.createElement("battery-notes-card-editor")}static getStubConfig(){return{type:"custom:battery-notes-card",title:"Battery Notes",icon:"mdi:battery-heart-variant",sort_by:"battery",sort_direction:"asc",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,columns:{name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0}}}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={title:"Battery Notes",icon:"mdi:battery-heart-variant",show_header:!0,show_summary:!0,show_search:!0,show_filters:!0,compact:!1,confirm_replace:!0,sort_by:"battery",sort_direction:"asc",...e,columns:{name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...e.columns||{}}},this._config.sort_by&&(this._sortBy=this._config.sort_by),this._config.sort_direction&&(this._sortDirection=this._config.sort_direction),this._config.filter_low_only&&(this._activeFilter="low")}getCardSize(){return 6}static{this.styles=Ot}_getBaseName(e){return(e.includes(".")?e.split(".")[1]:e).replace(/_battery_last_replaced$/,"").replace(/_battery_type$/,"").replace(/_battery_plus_low$/,"").replace(/_battery_low$/,"").replace(/_battery_replaced$/,"").replace(/_battery_plus$/,"")}_cleanDeviceName(e){return e.replace(/\s+(Battery Type|Batterietyp|Battery Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Zuletzt gewechselt|Battery Replaced|Battery Low|Batterie schwach|Battery|Batterie)$/i,"").trim()}_getBatteryDevices(){if(!this.hass||!this.hass.states)return[];let e=this.hass.states,s=new Map;for(let[l,c]of Object.entries(e)){let u=c.attributes||{},n=l.startsWith("sensor.")&&l.endsWith("_battery_type"),h=l.startsWith("sensor.")&&l.endsWith("_battery_plus"),y=l.startsWith("sensor.")&&l.endsWith("_battery_last_replaced"),g=l.startsWith("binary_sensor.")&&(l.endsWith("_battery_low")||l.endsWith("_battery_plus_low")),v=l.startsWith("button.")&&l.endsWith("_battery_replaced"),b=u.battery_type!==void 0||u.battery_type_and_quantity!==void 0;if(!n&&!h&&!y&&!g&&!v&&!b)continue;let f=this._getBaseName(l);s.has(f)||s.set(f,{baseName:f,entities:[]}),s.get(f).entities.push(c)}let r=[],a=new Set(this._config.exclude_entities||[]),o=Array.from(s.keys());if(this._config.entities&&this._config.entities.length>0){let l=new Set(this._config.entities.map(c=>this._getBaseName(c)));o=o.filter(c=>l.has(c))}for(let l of o){let u=s.get(l).entities,n=u.find(_=>_.entity_id.startsWith("sensor.")&&_.entity_id.endsWith("_battery_type")),h=u.find(_=>_.entity_id.startsWith("sensor.")&&_.entity_id.endsWith("_battery_plus")),y=u.find(_=>_.entity_id.startsWith("sensor.")&&_.entity_id.endsWith("_battery_last_replaced")),g=u.find(_=>_.entity_id.startsWith("binary_sensor.")&&(_.entity_id.endsWith("_battery_low")||_.entity_id.endsWith("_battery_plus_low"))),v=u.find(_=>_.entity_id.startsWith("button.")&&_.entity_id.endsWith("_battery_replaced")),b={};for(let _ of u)_.attributes&&Object.assign(b,_.attributes);let f=b.device_id;if(!f&&this.hass.entities)for(let _ of u){let K=this.hass.entities[_.entity_id];if(K?.device_id){f=K.device_id;break}}if(a.has(l)||f&&a.has(f)||u.some(_=>a.has(_.entity_id)))continue;let ft=h||n||u[0],A=null;if(h&&!isNaN(parseFloat(h.state)))A=parseFloat(h.state);else if(b.source_entity_id&&e[b.source_entity_id]&&!isNaN(parseFloat(e[b.source_entity_id].state)))A=parseFloat(e[b.source_entity_id].state);else if(e[`sensor.${l}_battery`]&&!isNaN(parseFloat(e[`sensor.${l}_battery`].state)))A=parseFloat(e[`sensor.${l}_battery`].state);else if(e[`sensor.${l}`]&&e[`sensor.${l}`].attributes?.device_class==="battery"&&!isNaN(parseFloat(e[`sensor.${l}`].state)))A=parseFloat(e[`sensor.${l}`].state);else if(b.battery_last_reported_level!==void 0&&!isNaN(Number(b.battery_last_reported_level)))A=Number(b.battery_last_reported_level);else if(f&&this.hass.entities){for(let[_,K]of Object.entries(this.hass.entities))if(K.device_id===f&&_.startsWith("sensor.")&&!_.endsWith("_battery_type")&&!_.endsWith("_battery_last_replaced")){let G=e[_];if(G&&G.attributes?.device_class==="battery"&&!isNaN(parseFloat(G.state))){A=parseFloat(G.state);break}}}let E="";f&&this.hass.devices?.[f]?.name_by_user?E=this.hass.devices[f].name_by_user:b.device_name?E=b.device_name:f&&this.hass.devices?.[f]?.name?E=this.hass.devices[f].name:n?.attributes?.friendly_name?E=this._cleanDeviceName(n.attributes.friendly_name):h?.attributes?.friendly_name?E=this._cleanDeviceName(h.attributes.friendly_name):b.source_entity_id&&e[b.source_entity_id]?.attributes?.friendly_name?E=this._cleanDeviceName(e[b.source_entity_id].attributes.friendly_name):E=l.replace(/_/g," ").replace(/\b\w/g,_=>_.toUpperCase());let L=b.battery_type||"";!L&&n&&n.state&&n.state!=="unknown"&&n.state!=="unavailable"&&(L=n.state);let st=Number(b.battery_quantity)||1,rt=b.battery_type_and_quantity||"";!rt&&L&&(rt=st>1?`${st}x ${L}`:L);let mt=null,gt="",U=y?.state||b.battery_last_replaced;if(U&&U!=="unavailable"&&U!=="unknown"){gt=U;let _=new Date(U);isNaN(_.getTime())||(mt=_)}let Mt=this._config.filter_threshold??20,Ht=g?.state==="on"||b.battery_low===!0||A!==null&&A<=Mt,it=v?.entity_id;!it&&e[`button.${l}_battery_replaced`]&&(it=`button.${l}_battery_replaced`);let It=n?.state==="unavailable"||h?.state==="unavailable";r.push({id:l,deviceId:f,sourceEntityId:b.source_entity_id,entityId:ft.entity_id,name:E||l,batteryLevel:A,batteryType:L,batteryQuantity:st,batteryTypeAndQuantity:rt||"-",lastReplaced:mt,lastReplacedStr:gt,lastReported:b.battery_last_reported?new Date(b.battery_last_reported):null,isLow:Ht,note:b.note,buttonEntityId:it,isUnavailable:It,state:ft.state})}return r}_formatRelativeTime(e,s){if(!e)return d("time_never",s);let a=new Date().getTime()-e.getTime();if(a<0)return d("time_today",s);let o=Math.floor(a/(1e3*60*60*24));return o===0?d("time_today",s):o===1?d("time_yesterday",s):o<14?d("time_days_ago",s,{n:o}):o<60?d("time_weeks_ago",s,{n:Math.floor(o/7)}):o<365?d("time_months_ago",s,{n:Math.floor(o/30)}):d("time_years_ago",s,{n:Math.floor(o/365)})}_getBatteryIcon(e){return e===null||isNaN(e)?"mdi:battery-unknown":e<=5?"mdi:battery-alert":e<=15?"mdi:battery-10":e<=25?"mdi:battery-20":e<=35?"mdi:battery-30":e<=45?"mdi:battery-40":e<=55?"mdi:battery-50":e<=65?"mdi:battery-60":e<=75?"mdi:battery-70":e<=85?"mdi:battery-80":e<=95?"mdi:battery-90":"mdi:battery"}_getLevelClass(e){return e===null||isNaN(e)?"unknown":e<=15?"critical":e<=25?"warning":e<=50?"medium":"good"}_handleSort(e){this._sortBy===e?this._sortDirection=this._sortDirection==="asc"?"desc":"asc":(this._sortBy=e,this._sortDirection="asc")}_handleOpenEntity(e){let s=new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0});this.dispatchEvent(s)}async _handleReplaceBattery(e){let s=this.hass?.language||"en";if(this._config.confirm_replace){let r=d("confirm_replace_msg",s,{name:e.name});if(!window.confirm(r))return}try{if(e.buttonEntityId&&this.hass.states[e.buttonEntityId])await this.hass.callService("button","press",{entity_id:e.buttonEntityId});else{let r={};e.deviceId?r.device_id=e.deviceId:e.sourceEntityId?r.source_entity_id=e.sourceEntityId:r.source_entity_id=e.entityId,await this.hass.callService("battery_notes","set_battery_replaced",r)}this._recentlyReplaced=new Set(this._recentlyReplaced).add(e.id),this.requestUpdate(),setTimeout(()=>{this._recentlyReplaced.delete(e.id),this._recentlyReplaced=new Set(this._recentlyReplaced),this.requestUpdate()},3e3)}catch(r){console.error("Failed to mark battery as replaced:",r),alert(`Error replacing battery: ${r instanceof Error?r.message:String(r)}`)}}render(){if(!this.hass)return p``;let e=this.hass.language||"en",s=this._getBatteryDevices(),r=s.length,a=s.filter(n=>n.isLow).length,o=r-a,l=s.filter(n=>{if(this._config.hide_unavailable&&n.isUnavailable||this._activeFilter==="low"&&!n.isLow||this._activeFilter==="critical"&&(n.batteryLevel===null||n.batteryLevel>10))return!1;if(this._searchQuery.trim()){let h=this._searchQuery.toLowerCase(),y=n.name.toLowerCase().includes(h),g=n.batteryTypeAndQuantity.toLowerCase().includes(h),v=n.note?.toLowerCase().includes(h)||!1;if(!y&&!g&&!v)return!1}return!0});l.sort((n,h)=>{let y=0;switch(this._sortBy){case"battery":let g=n.batteryLevel??(this._sortDirection==="asc"?999:-1),v=h.batteryLevel??(this._sortDirection==="asc"?999:-1);y=g-v;break;case"name":y=n.name.localeCompare(h.name);break;case"type":y=n.batteryTypeAndQuantity.localeCompare(h.batteryTypeAndQuantity);break;case"last_replaced":let b=n.lastReplaced?.getTime()??0,f=h.lastReplaced?.getTime()??0;y=b-f;break;case"status":y=(n.isLow?0:1)-(h.isLow?0:1);break}return this._sortDirection==="asc"?y:-y}),this._config.max_rows&&this._config.max_rows>0&&(l=l.slice(0,this._config.max_rows));let c={name:!0,battery:!0,type:!0,last_replaced:!0,status:!0,note:!1,actions:!0,...this._config.columns||{}},u=!!this._config.compact;return p`
      <ha-card class="${u?"compact":""}">
        <div class="card-container">
          <!-- Card Header -->
          ${this._config.show_header!==!1?p`
                <div class="card-header">
                  <div class="header-title-container">
                    <ha-icon
                      class="header-icon"
                      icon="${this._config.icon||"mdi:battery-heart-variant"}"
                    ></ha-icon>
                    <span>${this._config.title||d("card_title",e)}</span>
                  </div>

                  ${this._config.show_summary!==!1?p`
                        <div class="summary-chips">
                          <span class="chip total">
                            ${d("summary_total",e)}: ${r}
                          </span>
                          ${a>0?p`
                                <span class="chip low">
                                  ${d("summary_low",e)}: ${a}
                                </span>
                              `:""}
                          <span class="chip ok">
                            ${d("summary_ok",e)}: ${o}
                          </span>
                        </div>
                      `:""}
                </div>
              `:""}

          <!-- Controls: Search bar & Quick Filters -->
          ${this._config.show_search!==!1||this._config.show_filters!==!1?p`
                <div class="controls-row">
                  ${this._config.show_search!==!1?p`
                        <div class="search-wrapper">
                          <ha-icon class="search-icon-left" icon="mdi:magnify"></ha-icon>
                          <input
                            type="text"
                            class="search-input"
                            .value=${this._searchQuery}
                            placeholder=${d("search_placeholder",e)}
                            @input=${n=>this._searchQuery=n.target.value}
                          />
                          ${this._searchQuery?p`
                                <button
                                  class="search-clear-btn"
                                  @click=${()=>this._searchQuery=""}
                                >
                                  <ha-icon icon="mdi:close-circle"></ha-icon>
                                </button>
                              `:""}
                        </div>
                      `:""}
                  ${this._config.show_filters!==!1?p`
                        <div class="filter-pills">
                          <button
                            class="filter-btn ${this._activeFilter==="all"?"active":""}"
                            @click=${()=>this._activeFilter="all"}
                          >
                            ${d("filter_all",e)}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter==="low"?"active":""}"
                            @click=${()=>this._activeFilter="low"}
                          >
                            ${d("filter_low",e)} ${a>0?`(${a})`:""}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter==="critical"?"active":""}"
                            @click=${()=>this._activeFilter="critical"}
                          >
                            ${d("filter_critical",e)}
                          </button>
                        </div>
                      `:""}
                </div>
              `:""}

          <!-- Table Content -->
          ${l.length>0?p`
                <div class="table-wrapper">
                  <table class="battery-table">
                    <thead>
                      <tr>
                        ${c.name?p`
                              <th
                                class="col-name-th sortable"
                                @click=${()=>this._handleSort("name")}
                              >
                                <div class="th-content">
                                  <span>${d("col_name",e)}</span>
                                  ${this._sortBy==="name"?p`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.battery?p`
                              <th
                                class="col-battery-th sortable"
                                @click=${()=>this._handleSort("battery")}
                              >
                                <div class="th-content">
                                  <span>${d("col_battery",e)}</span>
                                  ${this._sortBy==="battery"?p`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.type?p`
                              <th
                                class="col-type-th sortable"
                                @click=${()=>this._handleSort("type")}
                              >
                                <div class="th-content">
                                  <span>${d("col_type",e)}</span>
                                  ${this._sortBy==="type"?p`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.last_replaced?p`
                              <th
                                class="col-last-replaced-th sortable"
                                @click=${()=>this._handleSort("last_replaced")}
                              >
                                <div class="th-content">
                                  <span>${d("col_last_replaced",e)}</span>
                                  ${this._sortBy==="last_replaced"?p`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.status?p`
                              <th
                                class="col-status-th sortable"
                                @click=${()=>this._handleSort("status")}
                              >
                                <div class="th-content">
                                  <span>${d("col_status",e)}</span>
                                  ${this._sortBy==="status"?p`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection==="asc"?"mdi:arrow-up":"mdi:arrow-down"}"
                                      ></ha-icon>`:""}
                                </div>
                              </th>
                            `:""}
                        ${c.note?p`<th class="col-note-th">${d("col_note",e)}</th>`:""}
                        ${c.actions?p`<th class="col-actions-th">${d("col_actions",e)}</th>`:""}
                      </tr>
                    </thead>
                    <tbody>
                      ${l.map(n=>{let h=this._getLevelClass(n.batteryLevel),y=this._recentlyReplaced.has(n.id);return p`
                          <tr class="${n.isLow?"row-low":""}">
                            <!-- Name -->
                            ${c.name?p`
                                  <td class="col-name-td">
                                    <div class="device-cell">
                                      <button
                                        class="device-name-btn"
                                        @click=${()=>this._handleOpenEntity(n.entityId)}
                                        title="${n.name}"
                                      >
                                        ${n.name}
                                      </button>
                                      ${n.note&&!c.note?p`<span class="device-subtext">${n.note}</span>`:""}
                                    </div>
                                  </td>
                                `:""}

                            <!-- Battery Level -->
                            ${c.battery?p`
                                  <td class="col-battery-td">
                                    <div class="battery-level-cell">
                                      <ha-icon
                                        class="battery-icon level-${h}"
                                        icon="${this._getBatteryIcon(n.batteryLevel)}"
                                      ></ha-icon>
                                      <div class="battery-bar-container">
                                        <div
                                          class="battery-bar-fill bar-${h}"
                                          style="width: ${Math.min(Math.max(n.batteryLevel??0,0),100)}%;"
                                        ></div>
                                      </div>
                                      <span class="battery-percent-text level-${h}">
                                        ${n.batteryLevel!==null?`${Math.round(n.batteryLevel)}%`:"-"}
                                      </span>
                                    </div>
                                  </td>
                                `:""}

                            <!-- Battery Type -->
                            ${c.type?p`
                                  <td class="col-type-td">
                                    <span class="type-badge">
                                      <ha-icon icon="mdi:battery-charging-outline"></ha-icon>
                                      ${n.batteryTypeAndQuantity}
                                    </span>
                                  </td>
                                `:""}

                            <!-- Last Replaced -->
                            ${c.last_replaced?p`
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
                            ${c.status?p`
                                  <td class="col-status-td">
                                    ${n.isUnavailable?p`<span class="status-badge unavailable"
                                          >${d("status_unavailable",e)}</span
                                        >`:n.isLow?p`<span class="status-badge low"
                                          >${d("status_low",e)}</span
                                        >`:p`<span class="status-badge ok"
                                          >${d("status_ok",e)}</span
                                        >`}
                                  </td>
                                `:""}

                            <!-- Note -->
                            ${c.note?p`
                                  <td class="col-note-td">
                                    <span class="note-text" title="${n.note||""}"
                                      >${n.note||"-"}</span
                                    >
                                  </td>
                                `:""}

                            <!-- Action -->
                            ${c.actions?p`
                                  <td class="col-actions-td">
                                    <button
                                      class="action-btn ${y?"success":""}"
                                      @click=${()=>this._handleReplaceBattery(n)}
                                      title="${d("action_mark_replaced",e)}"
                                    >
                                      <ha-icon
                                        icon="${y?"mdi:check-bold":"mdi:battery-sync"}"
                                      ></ha-icon>
                                      <span
                                        >${y?d("action_replaced",e):d("action_mark_replaced",e)}</span
                                      >
                                    </button>
                                  </td>
                                `:""}
                          </tr>
                        `})}
                    </tbody>
                  </table>
                </div>
              `:p`
                <div class="empty-state">
                  <ha-icon icon="mdi:battery-check"></ha-icon>
                  <span>
                    ${s.length===0?d("no_devices",e):d("no_results",e)}
                  </span>
                </div>
              `}
        </div>
      </ha-card>
    `}};$([D({attribute:!1})],x.prototype,"hass",2),$([k()],x.prototype,"_config",2),$([k()],x.prototype,"_searchQuery",2),$([k()],x.prototype,"_activeFilter",2),$([k()],x.prototype,"_sortBy",2),$([k()],x.prototype,"_sortDirection",2),$([k()],x.prototype,"_recentlyReplaced",2);customElements.get("battery-notes-card")||customElements.define("battery-notes-card",x);window.customCards=window.customCards||[];window.customCards.push({type:"battery-notes-card",name:"Battery Notes Card",description:"A customizable Lovelace table card for Home Assistant Battery Notes integration.",preview:!0,documentationURL:"https://github.com/vitals5/battery-notes-card"});})();
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
