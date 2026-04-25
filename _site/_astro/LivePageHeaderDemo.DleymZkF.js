import{j as a}from"./jsx-runtime.BjG_zV1W.js";import{r as s}from"./index.3X4_umFU.js";import{R as j}from"./index.B9Jhf-cL.js";import"./index.sJw7XE3i.js";/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=(...t)=>t.filter((e,o,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===o).join(" ").trim();/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,o,r)=>r?r.toUpperCase():o.toLowerCase());/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=t=>{const e=A(t);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var d={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1},L=s.createContext({}),_=()=>s.useContext(L),W=s.forwardRef(({color:t,size:e,strokeWidth:o,absoluteStrokeWidth:r,className:i="",children:n,iconNode:y,...h},g)=>{const{size:l=24,strokeWidth:u=2,absoluteStrokeWidth:b=!1,color:v="currentColor",className:k=""}=_()??{},f=r??b?Number(o??u)*24/Number(e??l):o??u;return s.createElement("svg",{ref:g,...d,width:e??l??d.width,height:e??l??d.height,stroke:t??v,strokeWidth:f,className:x("lucide",k,i),...!n&&!M(h)&&{"aria-hidden":"true"},...h},[...y.map(([w,C])=>s.createElement(w,C)),...Array.isArray(n)?n:[n]])});/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=(t,e)=>{const o=s.forwardRef(({className:r,...i},n)=>s.createElement(W,{ref:n,iconNode:e,className:x(`lucide-${N(m(t))}`,`lucide-${t}`,r),...i}));return o.displayName=m(t),o};/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],z=c("activity",$);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],p=c("chart-column",R);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],E=c("file-text",S);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],P=c("plus",H),I=()=>{const[t,e]=s.useState("overview"),o=[{label:"Overview",value:"overview",icon:a.jsx(p,{className:"w-4 h-4"})},{label:"Analytics",value:"analytics",icon:a.jsx(z,{className:"w-4 h-4"})},{label:"Reports",value:"reports",icon:a.jsx(E,{className:"w-4 h-4"})}];return a.jsxs("div",{className:"border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden",children:[a.jsx(j,{title:"Dashboard",description:"Welcome to your project dashboard",icon:a.jsx(p,{className:"w-6 h-6 text-orange-500"}),tabs:o,activeTab:t,onTabChange:e,actions:a.jsxs("button",{className:"inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors",children:[a.jsx(P,{className:"w-4 h-4"}),"Create"]})}),a.jsxs("div",{className:"p-6 bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400",children:["Content for ",a.jsx("strong",{children:t})," tab"]})]})};export{I as default};
