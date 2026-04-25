import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{I as i}from"./index-4d24GJmF.js";import"./index-B3e6rcmj.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const W={title:"Components/FileUpload",component:i,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","primary","error","success"]},size:{control:"select",options:["sm","md","lg"]},label:{control:"text"},error:{control:"text"},helpText:{control:"text"},accept:{control:"text"},maxSize:{control:"number"},maxFiles:{control:"number"},multiple:{control:"boolean"},disabled:{control:"boolean"}}},a={args:{label:"Upload File",helpText:"Supports all file types."}},r={args:{label:"Upload Profile Image",accept:"image/*",helpText:"Recommended: Square image, max 5MB.",maxSize:5*1024*1024}},l={args:{label:"Upload Documents",multiple:!0,maxFiles:5,accept:".pdf,.doc,.docx",helpText:"Upload up to 5 documents (PDF, DOC)."}},s={args:{label:"Upload File",error:"File size exceeds the maximum limit of 5 MB."}},o={args:{label:"Upload File",disabled:!0}},t={render:()=>e.jsxs("div",{className:"flex flex-col gap-6 w-80",children:[e.jsx(i,{size:"sm",label:"Small"}),e.jsx(i,{size:"md",label:"Medium"}),e.jsx(i,{size:"lg",label:"Large"})]})},c={args:{label:"Upload File",icon:e.jsx("span",{className:"text-2xl",children:"📁"})}};var m,n,p;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: 'Upload File',
    helpText: 'Supports all file types.'
  }
}`,...(p=(n=a.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};var d,u,x;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: 'Upload Profile Image',
    accept: 'image/*',
    helpText: 'Recommended: Square image, max 5MB.',
    maxSize: 5 * 1024 * 1024
  }
}`,...(x=(u=r.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var g,b,F;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Upload Documents',
    multiple: true,
    maxFiles: 5,
    accept: '.pdf,.doc,.docx',
    helpText: 'Upload up to 5 documents (PDF, DOC).'
  }
}`,...(F=(b=l.parameters)==null?void 0:b.docs)==null?void 0:F.source}}};var S,f,U;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Upload File',
    error: 'File size exceeds the maximum limit of 5 MB.'
  }
}`,...(U=(f=s.parameters)==null?void 0:f.docs)==null?void 0:U.source}}};var h,z,D;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Upload File',
    disabled: true
  }
}`,...(D=(z=o.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var I,M,T;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6 w-80">
      <FileUpload size="sm" label="Small" />
      <FileUpload size="md" label="Medium" />
      <FileUpload size="lg" label="Large" />
    </div>
}`,...(T=(M=t.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};var j,y,C;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: 'Upload File',
    icon: <span className="text-2xl">📁</span>
  }
}`,...(C=(y=c.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};const O=["Default","SingleImage","MultipleFiles","WithError","Disabled","Sizes","WithCustomIcon"];export{a as Default,o as Disabled,l as MultipleFiles,r as SingleImage,t as Sizes,c as WithCustomIcon,s as WithError,O as __namedExportsOrder,W as default};
