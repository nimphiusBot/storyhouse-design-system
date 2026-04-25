import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r}from"./index-B3e6rcmj.js";import{f as o,a as n}from"./index-4d24GJmF.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const z={title:"Components/Modal",component:o,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg","xl","2xl","full"]},variant:{control:"select",options:["default","danger","success","info","warning"]},showCloseButton:{control:"boolean"},closeOnOverlayClick:{control:"boolean"},loading:{control:"boolean"}}},l={render:a=>{const[s,t]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>t(!0),children:"Open Modal"}),e.jsx(o,{...a,isOpen:s,onClose:()=>t(!1),footer:e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:"secondary",onClick:()=>t(!1),children:"Cancel"}),e.jsx(n,{variant:"primary",onClick:()=>t(!1),children:"Save Changes"})]})})]})},args:{title:"Modal Title",description:"This is a description of what this modal is for.",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("p",{className:"text-sm text-gray-600",children:"This is the modal content. You can put anything here - forms, text, images, etc."}),e.jsx("p",{className:"text-sm text-gray-600",children:"The modal is centered on the screen and has a backdrop."})]})}},i={render:()=>{const[a,s]=r.useState(!1),[t,m]=r.useState(!1),[N,u]=r.useState(!1);return e.jsxs("div",{className:"flex gap-3",children:[e.jsx(n,{onClick:()=>s(!0),children:"Small"}),e.jsx(n,{onClick:()=>m(!0),children:"Medium"}),e.jsx(n,{onClick:()=>u(!0),children:"Large"}),e.jsx(o,{size:"sm",isOpen:a,onClose:()=>s(!1),title:"Small Modal",footer:e.jsx(n,{variant:"primary",onClick:()=>s(!1),children:"OK"}),children:e.jsx("p",{className:"text-sm text-gray-600",children:"Compact modal content."})}),e.jsx(o,{size:"md",isOpen:t,onClose:()=>m(!1),title:"Medium Modal",footer:e.jsx(n,{variant:"primary",onClick:()=>m(!1),children:"OK"}),children:e.jsx("p",{className:"text-sm text-gray-600",children:"Standard modal content."})}),e.jsx(o,{size:"lg",isOpen:N,onClose:()=>u(!1),title:"Large Modal",footer:e.jsx(n,{variant:"primary",onClick:()=>u(!1),children:"OK"}),children:e.jsx("p",{className:"text-sm text-gray-600",children:"Large modal content with more space."})})]})}},c={render:a=>{const[s,t]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>t(!0),children:"Open Modal"}),e.jsx(o,{...a,isOpen:s,onClose:()=>t(!1),footer:e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:"secondary",onClick:()=>t(!1),children:"Cancel"}),e.jsx(n,{variant:"primary",onClick:()=>t(!1),children:"Accept"})]})})]})},args:{title:"Terms & Conditions",children:e.jsx("div",{className:"space-y-4 text-sm text-gray-600",children:Array.from({length:10},(a,s)=>e.jsxs("p",{children:["Section ",s+1,": Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]},s))})}},d={render:a=>{const[s,t]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:"danger",onClick:()=>t(!0),children:"Delete"}),e.jsx(o,{...a,isOpen:s,onClose:()=>t(!1),footer:e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:"secondary",onClick:()=>t(!1),children:"Cancel"}),e.jsx(n,{variant:"danger",onClick:()=>t(!1),children:"Delete"})]})})]})},args:{variant:"danger",title:"Delete Account",description:"This action cannot be undone. All your data will be permanently deleted.",children:e.jsx("p",{className:"text-sm text-gray-600",children:"Are you sure you want to proceed?"})}},p={render:a=>{const[s,t]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>t(!0),children:"Open Modal"}),e.jsx(o,{...a,isOpen:s,onClose:()=>t(!1),loading:!0})]})},args:{title:"Loading"}};var g,x,f;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} footer={<>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>Save Changes</Button>
            </>} />
      </>;
  },
  args: {
    title: 'Modal Title',
    description: 'This is a description of what this modal is for.',
    children: <div className="space-y-4">
        <p className="text-sm text-gray-600">
          This is the modal content. You can put anything here - forms, text, images, etc.
        </p>
        <p className="text-sm text-gray-600">The modal is centered on the screen and has a backdrop.</p>
      </div>
  }
}`,...(f=(x=l.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var O,h,C;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => {
    const [openSm, setOpenSm] = useState(false);
    const [openMd, setOpenMd] = useState(false);
    const [OpenLg, setOpenLg] = useState(false);
    return <div className="flex gap-3">
        <Button onClick={() => setOpenSm(true)}>Small</Button>
        <Button onClick={() => setOpenMd(true)}>Medium</Button>
        <Button onClick={() => setOpenLg(true)}>Large</Button>

        <Modal size="sm" isOpen={openSm} onClose={() => setOpenSm(false)} title="Small Modal" footer={<Button variant="primary" onClick={() => setOpenSm(false)}>OK</Button>}>
          <p className="text-sm text-gray-600">Compact modal content.</p>
        </Modal>

        <Modal size="md" isOpen={openMd} onClose={() => setOpenMd(false)} title="Medium Modal" footer={<Button variant="primary" onClick={() => setOpenMd(false)}>OK</Button>}>
          <p className="text-sm text-gray-600">Standard modal content.</p>
        </Modal>

        <Modal size="lg" isOpen={OpenLg} onClose={() => setOpenLg(false)} title="Large Modal" footer={<Button variant="primary" onClick={() => setOpenLg(false)}>OK</Button>}>
          <p className="text-sm text-gray-600">Large modal content with more space.</p>
        </Modal>
      </div>;
  }
}`,...(C=(h=i.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};var y,j,S;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} footer={<>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>Accept</Button>
            </>} />
      </>;
  },
  args: {
    title: 'Terms & Conditions',
    children: <div className="space-y-4 text-sm text-gray-600">
        {Array.from({
        length: 10
      }, (_, i) => <p key={i}>
            Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>)}
      </div>
  }
}`,...(S=(j=c.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var v,M,k;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>Delete</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} footer={<>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setIsOpen(false)}>Delete</Button>
            </>} />
      </>;
  },
  args: {
    variant: 'danger',
    title: 'Delete Account',
    description: 'This action cannot be undone. All your data will be permanently deleted.',
    children: <p className="text-sm text-gray-600">Are you sure you want to proceed?</p>
  }
}`,...(k=(M=d.parameters)==null?void 0:M.docs)==null?void 0:k.source}}};var B,I,L;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} loading />
      </>;
  },
  args: {
    title: 'Loading'
  }
}`,...(L=(I=p.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};const q=["Default","Sizes","WithLongContent","Danger","Loading"];export{d as Danger,l as Default,p as Loading,i as Sizes,c as WithLongContent,q as __namedExportsOrder,z as default};
