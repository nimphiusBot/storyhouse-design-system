import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as J}from"./index-B3e6rcmj.js";import{b as r,U as K}from"./index-4d24GJmF.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const re={title:"Components/Checkbox",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","primary","success","error"]},size:{control:"select",options:["sm","md","lg"]},label:{control:"text"},description:{control:"text"},error:{control:"text"},indeterminate:{control:"boolean"},disabled:{control:"boolean"}}},s={args:{label:"Accept terms and conditions"}},a={args:{label:"Accept terms and conditions",checked:!0}},t={args:{label:"Subscribe to newsletter",description:"Receive weekly updates and product announcements."}},o={args:{label:"Select all items",indeterminate:!0}},c={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{variant:"default",label:"Default"}),e.jsx(r,{variant:"primary",label:"Primary"}),e.jsx(r,{variant:"success",label:"Success"}),e.jsx(r,{variant:"error",label:"Error"})]})},n={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{size:"sm",label:"Small"}),e.jsx(r,{size:"md",label:"Medium"}),e.jsx(r,{size:"lg",label:"Large"})]})},l={args:{"aria-label":"Checkbox without label"}},i={args:{label:"Disabled checkbox",disabled:!0,checked:!0}},d={args:{label:"I agree to the terms",error:"You must agree to the terms to continue."}},u={render:()=>{const[m,q]=J.useState([]),p=b=>{q(g=>g.includes(b)?g.filter(F=>F!==b):[...g,b])};return e.jsxs(K,{label:"Select your interests",description:"Choose all that apply.",children:[e.jsx(r,{label:"Technology",checked:m.includes("tech"),onChange:()=>p("tech")}),e.jsx(r,{label:"Design",checked:m.includes("design"),onChange:()=>p("design")}),e.jsx(r,{label:"Business",checked:m.includes("business"),onChange:()=>p("business")})]})}};var h,x,k;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Accept terms and conditions'
  }
}`,...(k=(x=s.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var C,S,v;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    label: 'Accept terms and conditions',
    checked: true
  }
}`,...(v=(S=a.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var f,y,j;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Subscribe to newsletter',
    description: 'Receive weekly updates and product announcements.'
  }
}`,...(j=(y=t.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var D,z,E;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: 'Select all items',
    indeterminate: true
  }
}`,...(E=(z=o.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var w,A,G;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Checkbox variant="default" label="Default" />
      <Checkbox variant="primary" label="Primary" />
      <Checkbox variant="success" label="Success" />
      <Checkbox variant="error" label="Error" />
    </div>
}`,...(G=(A=c.parameters)==null?void 0:A.docs)==null?void 0:G.source}}};var I,N,O;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium" />
      <Checkbox size="lg" label="Large" />
    </div>
}`,...(O=(N=n.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};var R,T,B;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Checkbox without label'
  }
}`,...(B=(T=l.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};var L,M,P;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    label: 'Disabled checkbox',
    disabled: true,
    checked: true
  }
}`,...(P=(M=i.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var U,V,W;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    label: 'I agree to the terms',
    error: 'You must agree to the terms to continue.'
  }
}`,...(W=(V=d.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var Y,_,H;u.parameters={...u.parameters,docs:{...(Y=u.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const toggle = (value: string) => {
      setSelected(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    };
    return <CheckboxGroup label="Select your interests" description="Choose all that apply.">
        <Checkbox label="Technology" checked={selected.includes('tech')} onChange={() => toggle('tech')} />
        <Checkbox label="Design" checked={selected.includes('design')} onChange={() => toggle('design')} />
        <Checkbox label="Business" checked={selected.includes('business')} onChange={() => toggle('business')} />
      </CheckboxGroup>;
  }
}`,...(H=(_=u.parameters)==null?void 0:_.docs)==null?void 0:H.source}}};const se=["Default","Checked","WithDescription","Indeterminate","Variants","Sizes","CheckboxOnly","Disabled","ErrorState","CheckboxGroupExample"];export{u as CheckboxGroupExample,l as CheckboxOnly,a as Checked,s as Default,i as Disabled,d as ErrorState,o as Indeterminate,n as Sizes,c as Variants,t as WithDescription,se as __namedExportsOrder,re as default};
