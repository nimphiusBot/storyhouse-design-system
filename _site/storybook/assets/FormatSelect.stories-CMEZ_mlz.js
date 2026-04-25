import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{R as h}from"./index-B3e6rcmj.js";import{N as s}from"./index-4d24GJmF.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const w={title:"Components/FormatSelect",component:s,tags:["autodocs"],parameters:{layout:"padded"}},m=[{format:"YouTube Short",intent:"Short-form video content for YouTube",emoji:"📱",sources:[],defaultAspectRatio:"9:16",generationModel:"GPT-4"},{format:"Instagram Post",intent:"Square social media post",emoji:"📸",sources:[],defaultAspectRatio:"1:1"},{format:"Blog Article",intent:"Long-form written content",emoji:"📝",sources:[{name:"Docs"}]}],t={render:()=>{const[r,n]=h.useState("");return e.jsx("div",{className:"max-w-md",children:e.jsx(s,{options:m,value:r,onChange:n})})}},a={render:()=>{const[r,n]=h.useState("YouTube Short");return e.jsx("div",{className:"max-w-md",children:e.jsx(s,{options:m,value:r,onChange:n})})}},o={render:()=>e.jsx("div",{className:"max-w-md",children:e.jsx(s,{options:m,value:"",onChange:()=>{},disabled:!0})})};var c,i,u;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = React.useState('');
    return <div className="max-w-md">
        <FormatSelect options={sampleOptions} value={value} onChange={setValue} />
      </div>;
  }
}`,...(u=(i=t.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var l,d,p;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = React.useState('YouTube Short');
    return <div className="max-w-md">
        <FormatSelect options={sampleOptions} value={value} onChange={setValue} />
      </div>;
  }
}`,...(p=(d=a.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var v,S,x;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="max-w-md">
      <FormatSelect options={sampleOptions} value="" onChange={() => {}} disabled />
    </div>
}`,...(x=(S=o.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};const C=["Default","WithSelection","Disabled"];export{t as Default,o as Disabled,a as WithSelection,C as __namedExportsOrder,w as default};
