import{j as V}from"./jsx-runtime-BjG_zV1W.js";import{_ as j}from"./index-4d24GJmF.js";import"./index-B3e6rcmj.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const T={title:"Components/DurationSlider",component:j,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:"select",options:[20,60,90,900]},disabled:{control:"boolean"}}},e={args:{value:20}},r={args:{value:60}},a={args:{value:90}},s={args:{value:900}},o={args:{value:60,disabled:!0}},t={render:()=>{const[C,R]=React.useState(60);return V.jsx(j,{value:C,onChange:R})}};var n,c,u;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    value: 20
  }
}`,...(u=(c=e.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var d,m,l;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    value: 60
  }
}`,...(l=(m=r.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var p,i,g;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    value: 90
  }
}`,...(g=(i=a.parameters)==null?void 0:i.docs)==null?void 0:g.source}}};var v,S,x;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    value: 900
  }
}`,...(x=(S=s.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var b,h,D;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    value: 60,
    disabled: true
  }
}`,...(D=(h=o.parameters)==null?void 0:h.docs)==null?void 0:D.source}}};var E,_,f;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = React.useState<20 | 60 | 90 | 900>(60);
    return <DurationSlider value={value} onChange={setValue} />;
  }
}`,...(f=(_=t.parameters)==null?void 0:_.docs)==null?void 0:f.source}}};const k=["Short","Standard","Extended","LongForm","Disabled","Interactive"];export{o as Disabled,a as Extended,t as Interactive,s as LongForm,e as Short,r as Standard,k as __namedExportsOrder,T as default};
