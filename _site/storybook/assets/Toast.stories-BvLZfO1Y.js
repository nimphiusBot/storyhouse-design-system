import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{n as k,M as W,a as r}from"./index-4d24GJmF.js";import"./index-B3e6rcmj.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const N={title:"Components/Toast",component:k,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{type:{control:"select",options:["success","error","warning","info"]},message:{control:"text"},duration:{control:"number"}}},a={args:{message:"Successfully saved changes!",type:"success",show:!0}},o={args:{message:"Failed to save changes. Please try again.",type:"error",show:!0}},n={args:{message:"This action cannot be undone.",type:"warning",show:!0}},t={args:{message:"New updates are available.",type:"info",show:!0}},c={render:()=>{const{showToast:s,ToastContainer:C}=W();return e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx(r,{onClick:()=>s("Saved!","success"),children:"Success"}),e.jsx(r,{variant:"danger",onClick:()=>s("Error!","error"),children:"Error"}),e.jsx(r,{variant:"secondary",onClick:()=>s("Warning!","warning",4e3),children:"Warning"}),e.jsx(r,{variant:"secondary",onClick:()=>s("Info message","info",2e3),children:"Info"}),e.jsx(C,{})]})}};var i,u,p;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    message: 'Successfully saved changes!',
    type: 'success',
    show: true
  }
}`,...(p=(u=a.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var d,g,m;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    message: 'Failed to save changes. Please try again.',
    type: 'error',
    show: true
  }
}`,...(m=(g=o.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var l,h,w;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    message: 'This action cannot be undone.',
    type: 'warning',
    show: true
  }
}`,...(w=(h=n.parameters)==null?void 0:h.docs)==null?void 0:w.source}}};var f,y,v;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    message: 'New updates are available.',
    type: 'info',
    show: true
  }
}`,...(v=(y=t.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var x,T,S;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => {
    const {
      showToast,
      ToastContainer
    } = useToast();
    return <div className="flex flex-wrap gap-3">
        <Button onClick={() => showToast('Saved!', 'success')}>Success</Button>
        <Button variant="danger" onClick={() => showToast('Error!', 'error')}>Error</Button>
        <Button variant="secondary" onClick={() => showToast('Warning!', 'warning', 4000)}>Warning</Button>
        <Button variant="secondary" onClick={() => showToast('Info message', 'info', 2000)}>Info</Button>
        <ToastContainer />
      </div>;
  }
}`,...(S=(T=c.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};const F=["Success","Error","Warning","Info","WithHook"];export{o as Error,t as Info,a as Success,n as Warning,c as WithHook,F as __namedExportsOrder,N as default};
