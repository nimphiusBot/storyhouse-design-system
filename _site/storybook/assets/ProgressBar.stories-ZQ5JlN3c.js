import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{B as s}from"./index-4d24GJmF.js";import"./index-B3e6rcmj.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const M={title:"Components/ProgressBar",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:{type:"range",min:0,max:100}},max:{control:"number"},size:{control:"select",options:["sm","md","lg"]},variant:{control:"select",options:["default","success","warning","error","info","primary",void 0]},showLabel:{control:"boolean"},labelPosition:{control:"select",options:["top","bottom","inline"]},showValues:{control:"boolean"}}},a={args:{value:65}},r={args:{value:65,showLabel:!0}},o={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-64",children:[e.jsx(s,{value:75,size:"sm",showLabel:!0,labelPosition:"top"}),e.jsx(s,{value:75,size:"md",showLabel:!0,labelPosition:"top"}),e.jsx(s,{value:75,size:"lg",showLabel:!0,labelPosition:"top"})]})},n={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-64",children:[e.jsx(s,{value:65,variant:"default"}),e.jsx(s,{value:65,variant:"success"}),e.jsx(s,{value:65,variant:"warning"}),e.jsx(s,{value:65,variant:"error"}),e.jsx(s,{value:65,variant:"info"}),e.jsx(s,{value:65,variant:"primary"})]})},t={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-64",children:[e.jsx(s,{value:30,thresholds:{success:50,warning:80},showLabel:!0}),e.jsx(s,{value:65,thresholds:{success:50,warning:80},showLabel:!0}),e.jsx(s,{value:90,thresholds:{success:50,warning:80},showLabel:!0})]})},l={args:{value:234,max:500,showValues:!0,showLabel:!0}},c={args:{value:72,showLabel:!0,labelPosition:"top"}},u={args:{value:72,showLabel:!0,labelPosition:"bottom"}},i={args:{value:100,variant:"success",showLabel:!0}},m={args:{value:0}};var p,d,v;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    value: 65
  }
}`,...(v=(d=a.parameters)==null?void 0:d.docs)==null?void 0:v.source}}};var g,h,b;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    value: 65,
    showLabel: true
  }
}`,...(b=(h=r.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var w,x,L;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <ProgressBar value={75} size="sm" showLabel labelPosition="top" />
      <ProgressBar value={75} size="md" showLabel labelPosition="top" />
      <ProgressBar value={75} size="lg" showLabel labelPosition="top" />
    </div>
}`,...(L=(x=o.parameters)==null?void 0:x.docs)==null?void 0:L.source}}};var P,f,j;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <ProgressBar value={65} variant="default" />
      <ProgressBar value={65} variant="success" />
      <ProgressBar value={65} variant="warning" />
      <ProgressBar value={65} variant="error" />
      <ProgressBar value={65} variant="info" />
      <ProgressBar value={65} variant="primary" />
    </div>
}`,...(j=(f=n.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};var B,S,z;t.parameters={...t.parameters,docs:{...(B=t.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <ProgressBar value={30} thresholds={{
      success: 50,
      warning: 80
    }} showLabel />
      <ProgressBar value={65} thresholds={{
      success: 50,
      warning: 80
    }} showLabel />
      <ProgressBar value={90} thresholds={{
      success: 50,
      warning: 80
    }} showLabel />
    </div>
}`,...(z=(S=t.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var y,V,N;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    value: 234,
    max: 500,
    showValues: true,
    showLabel: true
  }
}`,...(N=(V=l.parameters)==null?void 0:V.docs)==null?void 0:N.source}}};var T,E,C;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    value: 72,
    showLabel: true,
    labelPosition: 'top'
  }
}`,...(C=(E=c.parameters)==null?void 0:E.docs)==null?void 0:C.source}}};var D,W,_;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    value: 72,
    showLabel: true,
    labelPosition: 'bottom'
  }
}`,...(_=(W=u.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var O,R,k;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    value: 100,
    variant: 'success',
    showLabel: true
  }
}`,...(k=(R=i.parameters)==null?void 0:R.docs)==null?void 0:k.source}}};var q,A,F;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    value: 0
  }
}`,...(F=(A=m.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};const Q=["Default","WithLabel","Sizes","Variants","Thresholds","ShowValues","LabelTop","LabelBottom","Complete","Empty"];export{i as Complete,a as Default,m as Empty,u as LabelBottom,c as LabelTop,l as ShowValues,o as Sizes,t as Thresholds,n as Variants,r as WithLabel,Q as __namedExportsOrder,M as default};
