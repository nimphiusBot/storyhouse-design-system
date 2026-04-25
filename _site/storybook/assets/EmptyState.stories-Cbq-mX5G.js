import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{L as E}from"./index-4d24GJmF.js";import{c as l}from"./createLucideIcon-BXSMqvta.js";import"./index-B3e6rcmj.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],d=l("database",M);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],W=l("lock",R);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],V=l("search",Y);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],q=l("triangle-alert",$),K={title:"Components/EmptyState",component:E,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["no-data","no-results","error","no-permission","loading"]},size:{control:"select",options:["sm","md","lg"]}}},r={args:{title:"No data available",description:"There are no items to display at this time.",icon:e.jsx(d,{className:"w-6 h-6"})}},a={args:{variant:"no-results",title:"No results found",description:"Try adjusting your search or filter criteria.",icon:e.jsx(V,{className:"w-6 h-6"})}},t={args:{variant:"error",title:"Something went wrong",description:"An error occurred while loading data. Please try again.",icon:e.jsx(q,{className:"w-6 h-6"}),primaryAction:{label:"Retry",onClick:()=>{}}}},o={args:{variant:"no-permission",title:"Access denied",description:"You do not have permission to view this content. Contact your administrator.",icon:e.jsx(W,{className:"w-6 h-6"})}},s={args:{title:"No projects yet",description:"Get started by creating your first project.",icon:e.jsx(d,{className:"w-6 h-6"}),primaryAction:{label:"Create Project",onClick:()=>{}},secondaryAction:{label:"Learn more",onClick:()=>{}}}},i={args:{variant:"loading",title:"Loading data...",description:"Please wait while we fetch your information."}},c={args:{size:"sm",title:"No items",description:"No items to show.",icon:e.jsx(d,{className:"w-4 h-4"})}},n={args:{size:"lg",title:"Welcome to your dashboard",description:"Your dashboard is empty. As you add data, it will appear here. Get started by creating your first item or importing data.",icon:e.jsx(d,{className:"w-8 h-8"}),primaryAction:{label:"Get Started",onClick:()=>{}}}};var m,p,u;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    title: 'No data available',
    description: 'There are no items to display at this time.',
    icon: <Database className="w-6 h-6" />
  }
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,h,y;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: 'no-results',
    title: 'No results found',
    description: 'Try adjusting your search or filter criteria.',
    icon: <Search className="w-6 h-6" />
  }
}`,...(y=(h=a.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var w,N,b;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    title: 'Something went wrong',
    description: 'An error occurred while loading data. Please try again.',
    icon: <AlertTriangle className="w-6 h-6" />,
    primaryAction: {
      label: 'Retry',
      onClick: () => {}
    }
  }
}`,...(b=(N=t.parameters)==null?void 0:N.docs)==null?void 0:b.source}}};var k,j,A;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    variant: 'no-permission',
    title: 'Access denied',
    description: 'You do not have permission to view this content. Contact your administrator.',
    icon: <Lock className="w-6 h-6" />
  }
}`,...(A=(j=o.parameters)==null?void 0:j.docs)==null?void 0:A.source}}};var v,S,f;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    title: 'No projects yet',
    description: 'Get started by creating your first project.',
    icon: <Database className="w-6 h-6" />,
    primaryAction: {
      label: 'Create Project',
      onClick: () => {}
    },
    secondaryAction: {
      label: 'Learn more',
      onClick: () => {}
    }
  }
}`,...(f=(S=s.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var x,C,L;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'loading',
    title: 'Loading data...',
    description: 'Please wait while we fetch your information.'
  }
}`,...(L=(C=i.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var _,z,P;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    size: 'sm',
    title: 'No items',
    description: 'No items to show.',
    icon: <Database className="w-4 h-4" />
  }
}`,...(P=(z=c.parameters)==null?void 0:z.docs)==null?void 0:P.source}}};var D,T,G;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    size: 'lg',
    title: 'Welcome to your dashboard',
    description: 'Your dashboard is empty. As you add data, it will appear here. Get started by creating your first item or importing data.',
    icon: <Database className="w-8 h-8" />,
    primaryAction: {
      label: 'Get Started',
      onClick: () => {}
    }
  }
}`,...(G=(T=n.parameters)==null?void 0:T.docs)==null?void 0:G.source}}};const Q=["NoData","NoResults","ErrorState","NoPermission","WithActions","Loading","Small","Large"];export{t as ErrorState,n as Large,i as Loading,r as NoData,o as NoPermission,a as NoResults,c as Small,s as WithActions,Q as __namedExportsOrder,K as default};
