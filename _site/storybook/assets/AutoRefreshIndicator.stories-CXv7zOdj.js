import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{z as a}from"./index-4d24GJmF.js";import"./index-B3e6rcmj.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const _={title:"Components/AutoRefreshIndicator",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{enabled:{control:"boolean"},isPolling:{control:"boolean"},intervalLabel:{control:"text"},tabHidden:{control:"boolean"},lastPolledLabel:{control:"text"},lastPollFailed:{control:"boolean"},dataJustRefreshed:{control:"boolean"},effectiveIntervalLabel:{control:"text"}}},l={args:{enabled:!0,isPolling:!1,intervalLabel:"30s",lastPolledLabel:"2m ago",lastPolledAt:Date.now()-12e4}},s={args:{enabled:!0,isPolling:!0,intervalLabel:"30s"}},r={args:{enabled:!0,isPolling:!1,intervalLabel:"30s",tabHidden:!0}},n={args:{enabled:!0,isPolling:!1,intervalLabel:"30s",lastPollFailed:!0,lastPolledLabel:"1m ago"}},t={args:{enabled:!1,isPolling:!1,intervalLabel:"30s"}},o={args:{enabled:!0,isPolling:!1,intervalLabel:"30s",dataJustRefreshed:!0,lastPolledLabel:"just now"}},i={args:{enabled:!0,isPolling:!1,intervalLabel:"30s",effectiveIntervalLabel:"60s (backoff)",lastPolledLabel:"3m ago"}},d={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("div",{children:e.jsx(a,{enabled:!0,isPolling:!1,intervalLabel:"30s",lastPolledLabel:"2m ago"})}),e.jsx("div",{children:e.jsx(a,{enabled:!0,isPolling:!0,intervalLabel:"30s"})}),e.jsx("div",{children:e.jsx(a,{enabled:!1,isPolling:!1,intervalLabel:"30s",lastPolledLabel:"5m ago"})}),e.jsx("div",{children:e.jsx(a,{enabled:!0,isPolling:!1,intervalLabel:"30s",tabHidden:!0})}),e.jsx("div",{children:e.jsx(a,{enabled:!0,isPolling:!1,intervalLabel:"30s",lastPollFailed:!0,lastPolledLabel:"1m ago"})}),e.jsx("div",{children:e.jsx(a,{enabled:!0,isPolling:!1,intervalLabel:"30s",dataJustRefreshed:!0,lastPolledLabel:"just now"})})]})};var c,b,u;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    enabled: true,
    isPolling: false,
    intervalLabel: '30s',
    lastPolledLabel: '2m ago',
    lastPolledAt: Date.now() - 120000
  }
}`,...(u=(b=l.parameters)==null?void 0:b.docs)==null?void 0:u.source}}};var g,f,m;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    enabled: true,
    isPolling: true,
    intervalLabel: '30s'
  }
}`,...(m=(f=s.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};var v,P,L;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    enabled: true,
    isPolling: false,
    intervalLabel: '30s',
    tabHidden: true
  }
}`,...(L=(P=r.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var p,x,h;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    enabled: true,
    isPolling: false,
    intervalLabel: '30s',
    lastPollFailed: true,
    lastPolledLabel: '1m ago'
  }
}`,...(h=(x=n.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var j,R,I;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    enabled: false,
    isPolling: false,
    intervalLabel: '30s'
  }
}`,...(I=(R=t.parameters)==null?void 0:R.docs)==null?void 0:I.source}}};var A,S,F;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    enabled: true,
    isPolling: false,
    intervalLabel: '30s',
    dataJustRefreshed: true,
    lastPolledLabel: 'just now'
  }
}`,...(F=(S=o.parameters)==null?void 0:S.docs)==null?void 0:F.source}}};var H,J,w;i.parameters={...i.parameters,docs:{...(H=i.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    enabled: true,
    isPolling: false,
    intervalLabel: '30s',
    effectiveIntervalLabel: '60s (backoff)',
    lastPolledLabel: '3m ago'
  }
}`,...(w=(J=i.parameters)==null?void 0:J.docs)==null?void 0:w.source}}};var D,E,T;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div><AutoRefreshIndicator enabled isPolling={false} intervalLabel="30s" lastPolledLabel="2m ago" /></div>
      <div><AutoRefreshIndicator enabled isPolling intervalLabel="30s" /></div>
      <div><AutoRefreshIndicator enabled={false} isPolling={false} intervalLabel="30s" lastPolledLabel="5m ago" /></div>
      <div><AutoRefreshIndicator enabled isPolling={false} intervalLabel="30s" tabHidden /></div>
      <div><AutoRefreshIndicator enabled isPolling={false} intervalLabel="30s" lastPollFailed lastPolledLabel="1m ago" /></div>
      <div><AutoRefreshIndicator enabled isPolling={false} intervalLabel="30s" dataJustRefreshed lastPolledLabel="just now" /></div>
    </div>
}`,...(T=(E=d.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};const C=["Enabled","Polling","TabHidden","LastPollFailed","Disabled","DataJustRefreshed","WithEffectiveInterval","AllStates"];export{d as AllStates,o as DataJustRefreshed,t as Disabled,l as Enabled,n as LastPollFailed,s as Polling,r as TabHidden,i as WithEffectiveInterval,C as __namedExportsOrder,_ as default};
