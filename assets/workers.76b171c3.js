import{b as E,d as T,e as p,u as P,f as _,o,j as y,s as g,k as a,q as S,R as b,n as z,_ as N,t as W,l as f,m as d,K as t,a4 as h,E as w,aW as B,aX as M,aY as C,aZ as I,ag as O,Q as s,P as i,an as V,O as $,aE as F,a_ as j,aO as q,r as R,aF as G}from"./index.17cb9627.js";const J=E({direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},contentPosition:{type:String,values:["left","center","right"],default:"center"},borderStyle:{type:T(String),default:"solid"}}),K={name:"ElDivider"},L=p({...K,props:J,setup(e){const n=e,l=P("divider"),u=_(()=>l.cssVar({"border-style":n.borderStyle}));return(r,c)=>(o(),y("div",{class:g([a(l).b(),a(l).m(r.direction)]),style:z(a(u)),role:"separator"},[r.$slots.default&&r.direction!=="vertical"?(o(),y("div",{key:0,class:g([a(l).e("text"),a(l).is(r.contentPosition)])},[S(r.$slots,"default")],2)):b("v-if",!0)],6))}});var Q=N(L,[["__file","/home/runner/work/element-plus/element-plus/packages/components/divider/src/divider.vue"]]);const X=W(Q);const Y={style:{display:"flex","justify-content":"space-between"}},Z={class:"card-header"},A={style:{"margin-left":"0.5rem"}},H={class:"small-font"},U={class:"small-font"},ee=p({__name:"WorkerBox",props:{worker:null},setup(e){const n=e;function l(r){if(r==null)return"?";if(r=Number(r),r===0)return"0s";let c=Math.floor(r/86400);var v=Math.floor(r%86400/3600),k=Math.floor(r%86400%3600/60),m=c>0?c+"d ":"",x=v>0?v+"h ":"",D=k>0?k+"m ":"";return m+x+D}const u=_(()=>n.worker.stale?"Offline":n.worker.paused?"Paused":n.worker.maintenance_mode?"Maintenance":"Online");return(r,c)=>(o(),f(a(F),{class:"worker-box"},{header:d(()=>[t("div",Y,[t("div",Z,[h(a(O),{content:a(u),placement:"top"},{default:d(()=>[e.worker.stale?(o(),f(a(w),{key:0,size:20,color:"red"},{default:d(()=>[h(a(B))]),_:1})):e.worker.paused?(o(),f(a(w),{key:1,size:20,color:"orange"},{default:d(()=>[h(a(M))]),_:1})):e.worker.maintenance_mode?(o(),f(a(w),{key:2,size:20,color:"orange"},{default:d(()=>[h(a(C))]),_:1})):(o(),f(a(w),{key:3,size:20,color:"green"},{default:d(()=>[h(a(I))]),_:1}))]),_:1},8,["content"]),t("span",A,s(e.worker.name),1)]),S(r.$slots,"header",{},void 0,!0)])]),default:d(()=>{var v,k;return[t("div",H,"ID: "+s(e.worker.id),1),t("div",null,[i("This worker has run for "),t("strong",null,s(l(e.worker.uptime)),1)]),t("div",null,[i("They have generated "),t("strong",null,s(e.worker.megapixelsteps_generated),1),i(" MPS")]),t("div",null,[i("They're going at a speed of "),t("strong",null,s((v=e.worker.performance)==null?void 0:v.split(" ")[0]),1),i(" MPS/s")]),t("div",null,[i("They have fulfilled "),t("strong",null,s(e.worker.requests_fulfilled),1),i(" requests")]),t("div",null,[i("They have NSFW set to "),t("strong",null,s(e.worker.nsfw),1)]),t("div",null,[i("They support the models: "),t("strong",null,s(e.worker.models.length===0?"stable_diffusion":""),1),(o(!0),y($,null,V((k=e.worker.models)==null?void 0:k.length,m=>(o(),y("strong",{key:m},s(e.worker.models[m-1])+s(m==e.worker.models.length?"":", "),1))),128))]),e.worker.info?(o(),f(a(X),{key:0,style:{margin:"10px 0"}})):b("",!0),t("div",U,s(e.worker.info),1)]}),_:3}))}});const te=j(ee,[["__scopeId","data-v-eeb61e8e"]]),ae=q("workers",()=>{const e=R([]);async function n(){const l=G(),u=await fetch("https://stablehorde.net/api/v2/workers"),r=await u.json();!l.validateResponse(u,r,200,"Failed to update workers")||(r.forEach(c=>c.stale=!1),e.value=r)}return n(),setInterval(n,1e3*60),{workers:e,updateWorkers:n}});export{X as E,te as W,ae as u};
