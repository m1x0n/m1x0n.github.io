var E=Object.defineProperty;var k=(r,t,e)=>t in r?E(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var i=(r,t,e)=>(k(r,typeof t!="symbol"?t+"":t,e),e),C=(r,t,e)=>{if(!t.has(r))throw TypeError("Cannot "+e)};var a=(r,t,e)=>(C(r,t,"read from private field"),e?e.call(r):t.get(r)),l=(r,t,e)=>{if(t.has(r))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(r):t.set(r,e)},c=(r,t,e,n)=>(C(r,t,"write to private field"),n?n.call(r,e):t.set(r,e),e);import{createApp as O}from"https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js";const x=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}};x();var I="/assets/placeholder.2e34e2a7.webm",f;class y{constructor(t){l(this,f,void 0);c(this,f,t)}content(){return a(this,f)}}f=new WeakMap;var p,u;class h{constructor(t=null,e=null){l(this,p,void 0);l(this,u,void 0);c(this,p,t),c(this,u,e)}static fromCat(t){return new this(t,null)}static fromError(t){return new this(null,t)}isOk(){return!a(this,u)}isError(){return!this.isOk()}cat(){return a(this,p)}error(){return a(this,u)}}p=new WeakMap,u=new WeakMap;class w{constructor(t="",e={}){this.endpoint=t,this.options=e}async getCatOrError(){return Promise.resolve(h.fromError(new Error("Must be implemented")))}}class L extends w{constructor(){super("https://cataas.com/cat/gif?json=true",{}),this.name="cataas"}async getCatOrError(){return fetch(this.endpoint,{mode:"no-cors"}).then(t=>t.json()).then(t=>Promise.resolve(h.fromCat(new y("https://cataas.com/cat/"+t.id)))).catch(t=>Promise.resolve(h.fromError("["+this.name+"] "+t.toString())))}}class A extends w{constructor(){super("https://api.thecatapi.com/v1/images/search?limit=1&mime_types=gif",{key:"DEMO-API-KEY"}),this.name="thecatapi"}async getCatOrError(){return fetch(this.endpoint,{headers:{"x-api-key":this.options.key}}).then(t=>t.json()).then(t=>Promise.resolve(h.fromCat(new y(t[0].url)))).catch(t=>Promise.resolve(h.fromError("["+this.name+"] "+t.toString())))}}class S extends w{constructor(){super("https://api.giphy.com/v1/gifs/random?tag=cat&rating=g",{key:"atSc6rXC6mkBvhxFJN5TT04lH6Y3uixi"}),this.name="giphy"}async getCatOrError(){return fetch(this.endpoint+`&api_key=${this.options.key}`).then(t=>t.json()).then(t=>Promise.resolve(h.fromCat(new y(t.data.images.downsized.url)))).catch(t=>Promise.resolve(h.fromError("["+this.name+"] "+t.toString())))}}var g;class j{constructor(t){l(this,g,void 0);c(this,g,t)}cat(){return new y(a(this,g))}}g=new WeakMap;var v,m;class B{constructor(t,e){l(this,v,void 0);l(this,m,void 0);c(this,v,t),c(this,m,e)}async tryGet(t,e,n){let s=a(this,v)[t];console.log("Attempt: %d of %d. Trying %s provider",e,n,s.name);let o=await s.getCatOrError();if(o.isError()){if(console.log(o.error().toString()),e+1>n)return Promise.resolve(a(this,m).cat());let d=function(b){return{0:1,1:2,2:0}[b]}(t);return this.tryGet(d,e+1,n)}return Promise.resolve(o.cat())}async getCat(){let e=1,n=Date.now()%3;return this.tryGet(n,e,3)}getFallbackCat(){return a(this,m).cat()}}v=new WeakMap,m=new WeakMap;const P=new B([new A,new L,new S],new j(I));class F{constructor(t=5,e="\u{1F43E}",n=500,s="Load more \u{1F43E}"){i(this,"timer");i(this,"bar");i(this,"value");i(this,"max");i(this,"delay");i(this,"defaultValue");this.timer=null,this.value=[],this.bar=e,this.max=t,this.delay=n,this.defaultValue=s}start(){this.value=[this.bar],this.timer=setInterval(()=>this.advance(),this.delay)}end(){clearInterval(this.timer),this.timer=null}advance(){if(this.value.length===this.max){this.value=[this.bar];return}this.value.length>0&&this.value.length<this.max&&this.value.push(this.bar)}val(){return this.timer?this.value.join(""):this.defaultValue}}const G="https://github.com/m1x0n";function N(r){return{$template:"#cats-viewer",loading:!1,catImage:{src:P.getFallbackCat().content(),onLoad:null,isFallback:function(){return this.src.includes("placeholder")}},progressBar:new F,async loadImage(){this.loading=!0,this.progressBar.start(),this.catImage.onLoad=null;let t=await P.getCat();this.catImage.src=t.content(),this.catImage.onLoad=()=>{this.loading=!1,this.progressBar.end()}},viewProjects(){window.location.href=G},label(){return this.progressBar.val()}}}O({CatsViewer:N}).mount();
