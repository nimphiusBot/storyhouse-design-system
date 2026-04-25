import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as U}from"./index-B3e6rcmj.js";import{P as s,H as B}from"./index-4d24GJmF.js";import{c as V}from"./createLucideIcon-BXSMqvta.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]],J=V("pencil",I);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],W=V("trash-2",O),r=[{id:1,name:"Alice Johnson",email:"alice@example.com",role:"Admin",status:"active"},{id:2,name:"Bob Smith",email:"bob@example.com",role:"Editor",status:"active"},{id:3,name:"Carol Williams",email:"carol@example.com",role:"Viewer",status:"inactive"},{id:4,name:"Dave Brown",email:"dave@example.com",role:"Editor",status:"pending"},{id:5,name:"Eve Davis",email:"eve@example.com",role:"Admin",status:"active"}],t=[{key:"name",label:"Name",sortable:!0,render:a=>e.jsx("span",{className:"font-medium text-gray-900",children:a.name})},{key:"email",label:"Email",sortable:!0,render:a=>e.jsx("span",{className:"text-gray-600",children:a.email})},{key:"role",label:"Role",sortable:!0,render:a=>e.jsx("span",{className:"text-gray-500 capitalize",children:a.role})},{key:"status",label:"Status",sortable:!0,render:a=>e.jsx(B,{variant:a.status==="active"?"success":a.status==="pending"?"warning":"neutral",size:"sm",children:a.status})},{key:"actions",label:"Actions",align:"right",render:()=>e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx("button",{className:"text-gray-400 hover:text-orange-600 transition-colors",children:e.jsx(J,{className:"w-4 h-4"})}),e.jsx("button",{className:"text-gray-400 hover:text-red-600 transition-colors",children:e.jsx(W,{className:"w-4 h-4"})})]})}],X={title:"Components/DataTable",component:s,parameters:{layout:"padded"},tags:["autodocs"]},o={render:()=>e.jsx(s,{data:r,columns:t})},c={render:()=>{const[a,n]=U.useState(new Set);return e.jsx(s,{data:r,columns:t,selectable:!0,selectedRows:a,onSelectionChange:n})}},l={render:()=>e.jsx(s,{data:r,columns:t,sortable:!0})},d={render:()=>e.jsx(s,{data:r,columns:t,striped:!0})},m={render:()=>e.jsx(s,{data:r,columns:t,dense:!0})},i={render:()=>e.jsx(s,{data:[],columns:t,loading:!0})},p={render:()=>e.jsx(s,{data:[],columns:t,empty:{title:"No users found",description:"There are no users matching your criteria."}})},u={render:()=>{const[a]=U.useState(r.slice(0,2));return e.jsx(s,{data:a,columns:t.slice(0,3),expandable:!0,renderExpandedRow:n=>e.jsxs("div",{className:"p-4 space-y-2",children:[e.jsx("p",{className:"text-sm font-medium",children:"User Details"}),e.jsxs("p",{className:"text-sm text-gray-600",children:["Email: ",n.email]}),e.jsxs("p",{className:"text-sm text-gray-600",children:["Role: ",n.role]})]})})}};var x,b,h;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <DataTable data={sampleData} columns={columns} />
}`,...(h=(b=o.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var g,y,S;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<Set<string | number>>(new Set());
    return <DataTable data={sampleData} columns={columns} selectable selectedRows={selected} onSelectionChange={setSelected} />;
  }
}`,...(S=(y=c.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var D,j,v;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <DataTable data={sampleData} columns={columns} sortable />
}`,...(v=(j=l.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var N,E,f;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <DataTable data={sampleData} columns={columns} striped />
}`,...(f=(E=d.parameters)==null?void 0:E.docs)==null?void 0:f.source}}};var k,w,T;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <DataTable data={sampleData} columns={columns} dense />
}`,...(T=(w=m.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var R,M,_;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <DataTable data={[]} columns={columns} loading />
}`,...(_=(M=i.parameters)==null?void 0:M.docs)==null?void 0:_.source}}};var z,A,C;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <DataTable data={[]} columns={columns} empty={{
    title: 'No users found',
    description: 'There are no users matching your criteria.'
  }} />
}`,...(C=(A=p.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var L,H,P;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
    const [expandedData] = useState(sampleData.slice(0, 2));
    return <DataTable data={expandedData} columns={columns.slice(0, 3)} expandable renderExpandedRow={(user: User) => <div className="p-4 space-y-2">
            <p className="text-sm font-medium">User Details</p>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
            <p className="text-sm text-gray-600">Role: {user.role}</p>
          </div>} />;
  }
}`,...(P=(H=u.parameters)==null?void 0:H.docs)==null?void 0:P.source}}};const Y=["Default","Selectable","Sortable","Striped","Dense","Loading","Empty","Expandable"];export{o as Default,m as Dense,p as Empty,u as Expandable,i as Loading,c as Selectable,l as Sortable,d as Striped,Y as __namedExportsOrder,X as default};
