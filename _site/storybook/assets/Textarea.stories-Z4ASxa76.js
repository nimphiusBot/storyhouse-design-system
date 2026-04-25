import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{m as r}from"./index-4d24GJmF.js";import"./index-B3e6rcmj.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const X={title:"Components/Textarea",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","filled","error","success"]},size:{control:"select",options:["sm","md","lg"]},focusRing:{control:"select",options:["default","none","subtle"]},placeholder:{control:"text"},label:{control:"text"},error:{control:"text"},helpText:{control:"text"},disabled:{control:"boolean"},resize:{control:"boolean"},autoResize:{control:"boolean"},showCharCount:{control:"boolean"},maxLength:{control:"number"},minRows:{control:"number"}}},a={args:{placeholder:"Enter your message..."}},s={args:{label:"Description",placeholder:"Enter a description..."}},o={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-80",children:[e.jsx(r,{variant:"default",label:"Default",placeholder:"Default textarea"}),e.jsx(r,{variant:"filled",label:"Filled",placeholder:"Filled background"}),e.jsx(r,{variant:"success",label:"Success",placeholder:"Success state"}),e.jsx(r,{variant:"error",label:"Error",placeholder:"Error state",error:"This field has an error"})]})},t={render:()=>e.jsxs("div",{className:"flex flex-col gap-4 w-80",children:[e.jsx(r,{size:"sm",label:"Small",placeholder:"Small textarea"}),e.jsx(r,{size:"md",label:"Medium",placeholder:"Medium textarea"}),e.jsx(r,{size:"lg",label:"Large",placeholder:"Large textarea"})]})},l={args:{label:"Bio",helpText:"A short bio about yourself.",placeholder:"Tell us about yourself..."}},n={args:{label:"Description",error:"Description is required.",placeholder:"Enter a description..."}},c={args:{label:"Auto-resizing textarea",autoResize:!0,placeholder:"Type a lot of text to see auto-resize...",minRows:3,maxRows:10}},i={args:{label:"Limited input",showCharCount:!0,maxLength:200,placeholder:"Max 200 characters..."}},d={args:{label:"Disabled",value:"This textarea is disabled.",disabled:!0}};var p,u,m;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter your message...'
  }
}`,...(m=(u=a.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var h,x,b;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Description',
    placeholder: 'Enter a description...'
  }
}`,...(b=(x=s.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var g,f,T;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-80">
      <Textarea variant="default" label="Default" placeholder="Default textarea" />
      <Textarea variant="filled" label="Filled" placeholder="Filled background" />
      <Textarea variant="success" label="Success" placeholder="Success state" />
      <Textarea variant="error" label="Error" placeholder="Error state" error="This field has an error" />
    </div>
}`,...(T=(f=o.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var z,S,v;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-80">
      <Textarea size="sm" label="Small" placeholder="Small textarea" />
      <Textarea size="md" label="Medium" placeholder="Medium textarea" />
      <Textarea size="lg" label="Large" placeholder="Large textarea" />
    </div>
}`,...(v=(S=t.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var D,E,w;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: 'Bio',
    helpText: 'A short bio about yourself.',
    placeholder: 'Tell us about yourself...'
  }
}`,...(w=(E=l.parameters)==null?void 0:E.docs)==null?void 0:w.source}}};var R,j,C;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    label: 'Description',
    error: 'Description is required.',
    placeholder: 'Enter a description...'
  }
}`,...(C=(j=n.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};var L,y,W;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    label: 'Auto-resizing textarea',
    autoResize: true,
    placeholder: 'Type a lot of text to see auto-resize...',
    minRows: 3,
    maxRows: 10
  }
}`,...(W=(y=c.parameters)==null?void 0:y.docs)==null?void 0:W.source}}};var A,M,F;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Limited input',
    showCharCount: true,
    maxLength: 200,
    placeholder: 'Max 200 characters...'
  }
}`,...(F=(M=i.parameters)==null?void 0:M.docs)==null?void 0:F.source}}};var N,k,q;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: 'Disabled',
    value: 'This textarea is disabled.',
    disabled: true
  }
}`,...(q=(k=d.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};const G=["Default","WithLabel","Variants","Sizes","WithHelpText","WithError","AutoResize","WithCharCount","Disabled"];export{c as AutoResize,a as Default,d as Disabled,t as Sizes,o as Variants,i as WithCharCount,n as WithError,l as WithHelpText,s as WithLabel,G as __namedExportsOrder,X as default};
