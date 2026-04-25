import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{X as p,d as r,q as O}from"./index-4d24GJmF.js";import"./index-B3e6rcmj.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const R={title:"Components/FormField",component:p,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{layout:{control:"select",options:["vertical","horizontal"]},size:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"},required:{control:"boolean"},showOptional:{control:"boolean"}}},a={args:{label:"Email",children:e.jsx(r,{type:"email",placeholder:"Enter your email"})}},o={args:{label:"Email",error:"Please enter a valid email address",children:e.jsx(r,{type:"email",value:"invalid"})}},l={args:{label:"Password",helpText:"Must be at least 8 characters",children:e.jsx(r,{type:"password",placeholder:"Enter password"})}},t={args:{label:"Full Name",required:!0,children:e.jsx(r,{type:"text",placeholder:"Enter your name"})}},s={args:{label:"Phone Number",showOptional:!0,children:e.jsx(r,{type:"tel",placeholder:"Enter phone (optional)"})}},n={args:{label:"Full Name",layout:"horizontal",children:e.jsx(r,{type:"text",placeholder:"Enter your name"})}},i={render:()=>e.jsxs(O,{title:"Personal Information",description:"Enter your personal details below.",children:[e.jsx(p,{label:"First Name",required:!0,children:e.jsx(r,{placeholder:"John"})}),e.jsx(p,{label:"Last Name",required:!0,children:e.jsx(r,{placeholder:"Doe"})}),e.jsx(p,{label:"Email",children:e.jsx(r,{type:"email",placeholder:"john@example.com"})})]})};var c,d,m;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    children: <Input type="email" placeholder="Enter your email" />
  }
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var u,h,b;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    error: 'Please enter a valid email address',
    children: <Input type="email" value="invalid" />
  }
}`,...(b=(h=o.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var x,y,g;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    helpText: 'Must be at least 8 characters',
    children: <Input type="password" placeholder="Enter password" />
  }
}`,...(g=(y=l.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var E,F,j;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: 'Full Name',
    required: true,
    children: <Input type="text" placeholder="Enter your name" />
  }
}`,...(j=(F=t.parameters)==null?void 0:F.docs)==null?void 0:j.source}}};var q,w,I;s.parameters={...s.parameters,docs:{...(q=s.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    label: 'Phone Number',
    showOptional: true,
    children: <Input type="tel" placeholder="Enter phone (optional)" />
  }
}`,...(I=(w=s.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};var N,P,f;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: 'Full Name',
    layout: 'horizontal',
    children: <Input type="text" placeholder="Enter your name" />
  }
}`,...(f=(P=n.parameters)==null?void 0:P.docs)==null?void 0:f.source}}};var v,S,z;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <FormGroup title="Personal Information" description="Enter your personal details below.">
      <FormField label="First Name" required>
        <Input placeholder="John" />
      </FormField>
      <FormField label="Last Name" required>
        <Input placeholder="Doe" />
      </FormField>
      <FormField label="Email">
        <Input type="email" placeholder="john@example.com" />
      </FormField>
    </FormGroup>
}`,...(z=(S=i.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};const J=["Default","WithError","WithHelpText","Required","WithOptional","Horizontal","Grouped"];export{a as Default,i as Grouped,n as Horizontal,t as Required,o as WithError,l as WithHelpText,s as WithOptional,J as __namedExportsOrder,R as default};
