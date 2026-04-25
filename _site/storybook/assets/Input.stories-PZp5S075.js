import{d as H}from"./index-4d24GJmF.js";import"./index-B3e6rcmj.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const O={title:"Components/Input",component:H,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]},type:{control:"select",options:["text","email","password","number","search","tel","url"]},disabled:{control:"boolean"},fullWidth:{control:"boolean"}}},e={args:{placeholder:"Enter text..."}},r={args:{label:"Email",placeholder:"you@example.com",type:"email"}},a={args:{label:"Email",placeholder:"you@example.com",error:"Please enter a valid email address",value:"invalid"}},s={args:{label:"Password",placeholder:"Enter password",type:"password",helperText:"Must be at least 8 characters"}},o={args:{size:"sm",placeholder:"Small input"}},t={args:{size:"lg",placeholder:"Large input"}},l={args:{disabled:!0,placeholder:"Disabled input",value:"Cannot edit this"}},n={args:{fullWidth:!0,placeholder:"Full width input"}};var c,p,d;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...(d=(p=e.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var i,m,u;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email'
  }
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var h,g,b;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address',
    value: 'invalid'
  }
}`,...(b=(g=a.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var x,S,y;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    helperText: 'Must be at least 8 characters'
  }
}`,...(y=(S=s.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var E,W,w;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    size: 'sm',
    placeholder: 'Small input'
  }
}`,...(w=(W=o.parameters)==null?void 0:W.docs)==null?void 0:w.source}}};var v,f,D;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    size: 'lg',
    placeholder: 'Large input'
  }
}`,...(D=(f=t.parameters)==null?void 0:f.docs)==null?void 0:D.source}}};var L,z,T;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    value: 'Cannot edit this'
  }
}`,...(T=(z=l.parameters)==null?void 0:z.docs)==null?void 0:T.source}}};var F,P,C;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    fullWidth: true,
    placeholder: 'Full width input'
  }
}`,...(C=(P=n.parameters)==null?void 0:P.docs)==null?void 0:C.source}}};const j=["Default","WithLabel","WithError","WithHelperText","Small","Large","Disabled","FullWidth"];export{e as Default,l as Disabled,n as FullWidth,t as Large,o as Small,a as WithError,s as WithHelperText,r as WithLabel,j as __namedExportsOrder,O as default};
