import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as Q}from"./index-B3e6rcmj.js";import{g as a,h as b,i as q}from"./index-4d24GJmF.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const Y={title:"Components/Radio",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","primary","success","error"]},size:{control:"select",options:["sm","md","lg"]},label:{control:"text"},description:{control:"text"},error:{control:"text"},disabled:{control:"boolean"}}},o={args:{label:"Option A"}},t={args:{label:"Option A",checked:!0}},l={args:{label:"Option A",description:"This is a helpful description for this option."}},i={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(a,{variant:"default",label:"Default"}),e.jsx(a,{variant:"primary",label:"Primary"}),e.jsx(a,{variant:"success",label:"Success"}),e.jsx(a,{variant:"error",label:"Error"})]})},n={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(a,{size:"sm",label:"Small"}),e.jsx(a,{size:"md",label:"Medium"}),e.jsx(a,{size:"lg",label:"Large"})]})},c={args:{"aria-label":"Radio without label"}},d={args:{label:"Disabled option",disabled:!0}},p={args:{label:"Option A",error:"Please select a valid option."}},u={render:()=>{const[r,s]=Q.useState("free");return e.jsxs(q,{label:"Select a plan",description:"Choose the best plan for your needs.",name:"plan",value:r,onChange:s,children:[e.jsx(a,{value:"free",label:"Free",description:"Basic features for personal use"}),e.jsx(a,{value:"pro",label:"Pro",description:"Advanced features for professionals"}),e.jsx(a,{value:"enterprise",label:"Enterprise",description:"Custom solutions for teams"})]})}},m={render:()=>{const[r,s]=Q.useState("basic");return e.jsxs("div",{className:"flex flex-col gap-3 w-80",children:[e.jsx("p",{className:"text-sm font-medium text-gray-700",children:"Billing Plan"}),e.jsx(b,{title:"Basic",description:"$10/mo - Essential features",name:"billing",value:"basic",checked:r==="basic",onChange:()=>s("basic")}),e.jsx(b,{title:"Pro",description:"$29/mo - Full access to all features",name:"billing",value:"pro",checked:r==="pro",onChange:()=>s("pro")}),e.jsx(b,{title:"Enterprise",description:"$99/mo - Custom solutions and support",name:"billing",value:"enterprise",checked:r==="enterprise",onChange:()=>s("enterprise")})]})}};var g,f,x;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Option A'
  }
}`,...(x=(f=o.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var h,v,S;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Option A',
    checked: true
  }
}`,...(S=(v=t.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var R,C,j;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    label: 'Option A',
    description: 'This is a helpful description for this option.'
  }
}`,...(j=(C=l.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};var E,y,O;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Radio variant="default" label="Default" />
      <Radio variant="primary" label="Primary" />
      <Radio variant="success" label="Success" />
      <Radio variant="error" label="Error" />
    </div>
}`,...(O=(y=i.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};var k,A,D;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Radio size="sm" label="Small" />
      <Radio size="md" label="Medium" />
      <Radio size="lg" label="Large" />
    </div>
}`,...(D=(A=n.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var P,z,N;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Radio without label'
  }
}`,...(N=(z=c.parameters)==null?void 0:z.docs)==null?void 0:N.source}}};var B,$,w;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    label: 'Disabled option',
    disabled: true
  }
}`,...(w=($=d.parameters)==null?void 0:$.docs)==null?void 0:w.source}}};var F,G,T;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    label: 'Option A',
    error: 'Please select a valid option.'
  }
}`,...(T=(G=p.parameters)==null?void 0:G.docs)==null?void 0:T.source}}};var W,L,M;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState('free');
    return <RadioGroup label="Select a plan" description="Choose the best plan for your needs." name="plan" value={selected} onChange={setSelected}>
        <Radio value="free" label="Free" description="Basic features for personal use" />
        <Radio value="pro" label="Pro" description="Advanced features for professionals" />
        <Radio value="enterprise" label="Enterprise" description="Custom solutions for teams" />
      </RadioGroup>;
  }
}`,...(M=(L=u.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};var V,_,H;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState('basic');
    return <div className="flex flex-col gap-3 w-80">
        <p className="text-sm font-medium text-gray-700">Billing Plan</p>
        <RadioCard title="Basic" description="$10/mo - Essential features" name="billing" value="basic" checked={selected === 'basic'} onChange={() => setSelected('basic')} />
        <RadioCard title="Pro" description="$29/mo - Full access to all features" name="billing" value="pro" checked={selected === 'pro'} onChange={() => setSelected('pro')} />
        <RadioCard title="Enterprise" description="$99/mo - Custom solutions and support" name="billing" value="enterprise" checked={selected === 'enterprise'} onChange={() => setSelected('enterprise')} />
      </div>;
  }
}`,...(H=(_=m.parameters)==null?void 0:_.docs)==null?void 0:H.source}}};const Z=["Default","Checked","WithDescription","Variants","Sizes","RadioOnly","Disabled","ErrorState","RadioGroupExample","RadioCardExample"];export{t as Checked,o as Default,d as Disabled,p as ErrorState,m as RadioCardExample,u as RadioGroupExample,c as RadioOnly,n as Sizes,i as Variants,l as WithDescription,Z as __namedExportsOrder,Y as default};
