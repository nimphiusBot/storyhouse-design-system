import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{R as o}from"./index-B3e6rcmj.js";import{k as l,a as c}from"./index-4d24GJmF.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const j={title:"Components/SlideOutPanel",component:l,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg","xl"]}}},t={render:()=>{const[s,n]=o.useState(!0);return e.jsxs("div",{className:"p-8",children:[e.jsx(c,{onClick:()=>n(!0),children:"Open Panel"}),e.jsx(l,{isOpen:s,onClose:()=>n(!1),title:"Settings Panel",subtitle:"Configure your preferences",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("p",{className:"text-gray-600",children:"This is the slide-out panel content. It can contain any React components, forms, or content."}),e.jsx("div",{className:"rounded-lg bg-gray-50 p-4",children:e.jsx("p",{className:"text-sm text-gray-500",children:"Example settings content area"})})]})})]})}},a={render:()=>{const[s,n]=o.useState(!0);return e.jsxs("div",{className:"p-8",children:[e.jsx(c,{onClick:()=>n(!0),children:"Open Small Panel"}),e.jsx(l,{isOpen:s,onClose:()=>n(!1),title:"Small Panel",size:"sm",children:e.jsx("p",{className:"text-gray-600",children:"Compact panel for quick actions."})})]})}},r={render:()=>{const[s,n]=o.useState(!0);return e.jsxs("div",{className:"p-8",children:[e.jsx(c,{onClick:()=>n(!0),children:"Open Large Panel"}),e.jsx(l,{isOpen:s,onClose:()=>n(!1),title:"Large Panel",size:"lg",children:e.jsx("p",{className:"text-gray-600",children:"Expanded panel with more space for complex content."})})]})}};var i,p,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);
    return <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Open Panel</Button>
        <SlideOutPanel isOpen={isOpen} onClose={() => setIsOpen(false)} title="Settings Panel" subtitle="Configure your preferences">
          <div className="space-y-4">
            <p className="text-gray-600">
              This is the slide-out panel content. It can contain any React components, forms, or content.
            </p>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Example settings content area</p>
            </div>
          </div>
        </SlideOutPanel>
      </div>;
  }
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var d,u,O;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);
    return <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Open Small Panel</Button>
        <SlideOutPanel isOpen={isOpen} onClose={() => setIsOpen(false)} title="Small Panel" size="sm">
          <p className="text-gray-600">Compact panel for quick actions.</p>
        </SlideOutPanel>
      </div>;
  }
}`,...(O=(u=a.parameters)==null?void 0:u.docs)==null?void 0:O.source}}};var x,g,S;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);
    return <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Open Large Panel</Button>
        <SlideOutPanel isOpen={isOpen} onClose={() => setIsOpen(false)} title="Large Panel" size="lg">
          <p className="text-gray-600">Expanded panel with more space for complex content.</p>
        </SlideOutPanel>
      </div>;
  }
}`,...(S=(g=r.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};const C=["Default","Small","Large"];export{t as Default,r as Large,a as Small,C as __namedExportsOrder,j as default};
