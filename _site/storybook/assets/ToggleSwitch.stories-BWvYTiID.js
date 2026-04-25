import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{o as s}from"./index-4d24GJmF.js";import"./index-B3e6rcmj.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const O={title:"Components/ToggleSwitch",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"},checked:{control:"boolean"}}},a={args:{checked:!1}},t={args:{checked:!0}},c={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"text-sm text-gray-500 w-16",children:"Small"}),e.jsx(s,{checked:!0,size:"sm"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"text-sm text-gray-500 w-16",children:"Medium"}),e.jsx(s,{checked:!0,size:"md"})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"text-sm text-gray-500 w-16",children:"Large"}),e.jsx(s,{checked:!0,size:"lg"})]})]})},r={args:{checked:!0,disabled:!0}},n={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"text-sm text-gray-500 w-24",children:"Off"}),e.jsx(s,{checked:!1})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"text-sm text-gray-500 w-24",children:"On"}),e.jsx(s,{checked:!0})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"text-sm text-gray-500 w-24",children:"Disabled off"}),e.jsx(s,{checked:!1,disabled:!0})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"text-sm text-gray-500 w-24",children:"Disabled on"}),e.jsx(s,{checked:!0,disabled:!0})]})]})};var l,d,i;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    checked: false
  }
}`,...(i=(d=a.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var m,o,x;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    checked: true
  }
}`,...(x=(o=t.parameters)==null?void 0:o.docs)==null?void 0:x.source}}};var p,g,h;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 items-center">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-16">Small</span>
        <ToggleSwitch checked size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-16">Medium</span>
        <ToggleSwitch checked size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-16">Large</span>
        <ToggleSwitch checked size="lg" />
      </div>
    </div>
}`,...(h=(g=c.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,u,N;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    checked: true,
    disabled: true
  }
}`,...(N=(u=r.parameters)==null?void 0:u.docs)==null?void 0:N.source}}};var v,j,w;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 items-center">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-24">Off</span>
        <ToggleSwitch checked={false} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-24">On</span>
        <ToggleSwitch checked />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-24">Disabled off</span>
        <ToggleSwitch checked={false} disabled />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-24">Disabled on</span>
        <ToggleSwitch checked disabled />
      </div>
    </div>
}`,...(w=(j=n.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};const T=["Off","On","Sizes","Disabled","AllStates"];export{n as AllStates,r as Disabled,a as Off,t as On,c as Sizes,T as __namedExportsOrder,O as default};
