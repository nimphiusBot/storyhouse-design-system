import{j as r}from"./jsx-runtime-BjG_zV1W.js";import{r as n}from"./index-B3e6rcmj.js";import{T as s}from"./index-4d24GJmF.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const q={title:"Components/Pagination",component:s,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","compact"]},showFirstLast:{control:"boolean"},showPageSize:{control:"boolean"},showTotal:{control:"boolean"},disabled:{control:"boolean"}}},o={render:e=>{const[a,t]=n.useState(1);return r.jsx(s,{...e,currentPage:a,onPageChange:t})},args:{totalPages:20,pageSize:10,totalItems:200,onPageSizeChange:()=>{}}},g={render:e=>{const[a,t]=n.useState(1);return r.jsx(s,{...e,currentPage:a,onPageChange:t})},args:{totalPages:3,pageSize:10,totalItems:25}},c={render:e=>{const[a,t]=n.useState(50);return r.jsx(s,{...e,currentPage:a,onPageChange:t})},args:{totalPages:100,pageSize:25,totalItems:2500}},p={render:e=>{const[a,t]=n.useState(3);return r.jsx(s,{...e,currentPage:a,onPageChange:t})},args:{variant:"compact",totalPages:15,pageSize:10,totalItems:150,showFirstLast:!1,showPageSize:!1,showTotal:!0}},P={render:e=>{const[a,t]=n.useState(1);return r.jsx(s,{...e,currentPage:a,onPageChange:t})},args:{totalPages:10,pageSize:20,totalItems:200,showPageSize:!1,showPageInput:!0}},u={render:e=>{const[a,t]=n.useState(1);return r.jsx(s,{...e,currentPage:a,onPageChange:t})},args:{totalPages:0,pageSize:10,totalItems:0}},i={render:e=>{const[a,t]=n.useState(1);return r.jsx(s,{...e,currentPage:a,onPageChange:t})},args:{totalPages:10,pageSize:10,totalItems:100,disabled:!0}};var l,m,d;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalPages: 20,
    pageSize: 10,
    totalItems: 200,
    onPageSizeChange: () => {}
  }
}`,...(d=(m=o.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var S,h,z;g.parameters={...g.parameters,docs:{...(S=g.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalPages: 3,
    pageSize: 10,
    totalItems: 25
  }
}`,...(z=(h=g.parameters)==null?void 0:h.docs)==null?void 0:z.source}}};var C,I,w;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => {
    const [page, setPage] = useState(50);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalPages: 100,
    pageSize: 25,
    totalItems: 2500
  }
}`,...(w=(I=c.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var f,x,b;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => {
    const [page, setPage] = useState(3);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    variant: 'compact',
    totalPages: 15,
    pageSize: 10,
    totalItems: 150,
    showFirstLast: false,
    showPageSize: false,
    showTotal: true
  }
}`,...(b=(x=p.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var j,y,T;P.parameters={...P.parameters,docs:{...(j=P.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalPages: 10,
    pageSize: 20,
    totalItems: 200,
    showPageSize: false,
    showPageInput: true
  }
}`,...(T=(y=P.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var E,F,D;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalPages: 0,
    pageSize: 10,
    totalItems: 0
  }
}`,...(D=(F=u.parameters)==null?void 0:F.docs)==null?void 0:D.source}}};var v,L,M;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalPages: 10,
    pageSize: 10,
    totalItems: 100,
    disabled: true
  }
}`,...(M=(L=i.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};const A=["Default","FewPages","ManyPages","Compact","WithoutPageSize","Empty","Disabled"];export{p as Compact,o as Default,i as Disabled,u as Empty,g as FewPages,c as ManyPages,P as WithoutPageSize,A as __namedExportsOrder,q as default};
