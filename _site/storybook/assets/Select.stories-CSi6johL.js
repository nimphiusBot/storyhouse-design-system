import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{j as l}from"./index-4d24GJmF.js";import"./index-B3e6rcmj.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const A={title:"Components/Select",component:l,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","filled","error","success"]},size:{control:"select",options:["sm","md","lg"]},label:{control:"text"},error:{control:"text"},helpText:{control:"text"},placeholder:{control:"text"},fullWidth:{control:"boolean"},disabled:{control:"boolean"}}},e=[{value:"apple",label:"Apple"},{value:"banana",label:"Banana"},{value:"cherry",label:"Cherry"},{value:"date",label:"Date"},{value:"elderberry",label:"Elderberry"}],o={args:{label:"Choose a fruit",options:e,placeholder:"Select a fruit..."}},r={args:{label:"Choose a fruit",options:e,value:"cherry"}},s={render:()=>a.jsxs("div",{className:"flex flex-col gap-4 w-64",children:[a.jsx(l,{label:"Default",options:e,placeholder:"Select..."}),a.jsx(l,{variant:"filled",label:"Filled",options:e,placeholder:"Select..."}),a.jsx(l,{variant:"success",label:"Success",options:e,value:"banana"}),a.jsx(l,{variant:"error",label:"Error",options:e,error:"This field is required."})]})},t={render:()=>a.jsxs("div",{className:"flex flex-col gap-4 w-64",children:[a.jsx(l,{size:"sm",label:"Small",options:e,placeholder:"Select..."}),a.jsx(l,{size:"md",label:"Medium",options:e,placeholder:"Select..."}),a.jsx(l,{size:"lg",label:"Large",options:e,placeholder:"Select..."})]})},n={args:{label:"Disabled",options:e,value:"banana",disabled:!0}},c={args:{label:"Choose a food",placeholder:"Select...",options:[{label:"Fruits",options:[{value:"apple",label:"Apple"},{value:"banana",label:"Banana"}]},{label:"Vegetables",options:[{value:"carrot",label:"Carrot"},{value:"broccoli",label:"Broccoli"}]}]}},i={args:{label:"Country",options:[{value:"us",label:"United States"},{value:"ca",label:"Canada"},{value:"uk",label:"United Kingdom"}],helpText:"Select your country of residence."}};var p,d,u;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: 'Choose a fruit',
    options: defaultOptions,
    placeholder: 'Select a fruit...'
  }
}`,...(u=(d=o.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var b,m,f;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: 'Choose a fruit',
    options: defaultOptions,
    value: 'cherry'
  }
}`,...(f=(m=r.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};var S,h,v;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <Select label="Default" options={defaultOptions} placeholder="Select..." />
      <Select variant="filled" label="Filled" options={defaultOptions} placeholder="Select..." />
      <Select variant="success" label="Success" options={defaultOptions} value="banana" />
      <Select variant="error" label="Error" options={defaultOptions} error="This field is required." />
    </div>
}`,...(v=(h=s.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var g,x,y;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-64">
      <Select size="sm" label="Small" options={defaultOptions} placeholder="Select..." />
      <Select size="md" label="Medium" options={defaultOptions} placeholder="Select..." />
      <Select size="lg" label="Large" options={defaultOptions} placeholder="Select..." />
    </div>
}`,...(y=(x=t.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var C,O,j;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    label: 'Disabled',
    options: defaultOptions,
    value: 'banana',
    disabled: true
  }
}`,...(j=(O=n.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};var z,D,T;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: 'Choose a food',
    placeholder: 'Select...',
    options: [{
      label: 'Fruits',
      options: [{
        value: 'apple',
        label: 'Apple'
      }, {
        value: 'banana',
        label: 'Banana'
      }]
    }, {
      label: 'Vegetables',
      options: [{
        value: 'carrot',
        label: 'Carrot'
      }, {
        value: 'broccoli',
        label: 'Broccoli'
      }]
    }]
  }
}`,...(T=(D=c.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var V,B,E;i.parameters={...i.parameters,docs:{...(V=i.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    label: 'Country',
    options: [{
      value: 'us',
      label: 'United States'
    }, {
      value: 'ca',
      label: 'Canada'
    }, {
      value: 'uk',
      label: 'United Kingdom'
    }],
    helpText: 'Select your country of residence.'
  }
}`,...(E=(B=i.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};const k=["Default","WithValue","Variants","Sizes","Disabled","WithGroupedOptions","HelpText"];export{o as Default,n as Disabled,i as HelpText,t as Sizes,s as Variants,c as WithGroupedOptions,r as WithValue,k as __namedExportsOrder,A as default};
