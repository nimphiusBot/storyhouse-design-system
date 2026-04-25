import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as c}from"./index-B3e6rcmj.js";import{E as r,a}from"./index-4d24GJmF.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const P={title:"Components/SlidePanel",component:r,tags:["autodocs"],parameters:{layout:"fullscreen"}},t={render:()=>{const[s,n]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"p-8",children:e.jsx(a,{onClick:()=>n(!0),children:"Open Slide Panel"})}),e.jsx(r,{isOpen:s,onClose:()=>n(!1),title:"Settings",subtitle:"Manage your preferences",children:e.jsx("p",{className:"text-gray-600 dark:text-gray-400",children:"Panel content goes here. This panel has a title and subtitle."})})]})}},o={render:()=>{const[s,n]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"p-8",children:e.jsx(a,{onClick:()=>n(!0),children:"Open Panel with Footer"})}),e.jsx(r,{isOpen:s,onClose:()=>n(!1),title:"Confirm Changes",description:"Review your changes before saving.",footer:e.jsxs("div",{className:"flex justify-end gap-3",children:[e.jsx(a,{variant:"secondary",onClick:()=>{},children:"Cancel"}),e.jsx(a,{onClick:()=>{},children:"Save"})]}),children:e.jsx("p",{className:"text-gray-600 dark:text-gray-400",children:"This panel has a footer with action buttons."})})]})}},l={render:()=>{const[s,n]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"p-8",children:e.jsx(a,{onClick:()=>n(!0),children:"Open from Left"})}),e.jsx(r,{isOpen:s,onClose:()=>n(!1),title:"Navigation",position:"left",children:e.jsxs("nav",{className:"space-y-2",children:[e.jsx("a",{href:"#",className:"block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800",children:"Dashboard"}),e.jsx("a",{href:"#",className:"block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800",children:"Projects"}),e.jsx("a",{href:"#",className:"block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800",children:"Settings"})]})})]})}},i={render:()=>{const[s,n]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"p-8",children:e.jsx(a,{onClick:()=>n(!0),children:"Open Large Panel"})}),e.jsx(r,{isOpen:s,onClose:()=>n(!1),title:"Large Panel",size:"lg",children:e.jsx("p",{className:"text-gray-600 dark:text-gray-400",children:'This panel uses the "lg" size variant for more content space.'})})]})}};var d,p,u;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <div className="p-8">
          <Button onClick={() => setIsOpen(true)}>Open Slide Panel</Button>
        </div>
        <SlidePanel isOpen={isOpen} onClose={() => setIsOpen(false)} title="Settings" subtitle="Manage your preferences">
          <p className="text-gray-600 dark:text-gray-400">
            Panel content goes here. This panel has a title and subtitle.
          </p>
        </SlidePanel>
      </>;
  }
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,h,m;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <div className="p-8">
          <Button onClick={() => setIsOpen(true)}>Open Panel with Footer</Button>
        </div>
        <SlidePanel isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Changes" description="Review your changes before saving." footer={<div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => {}}>Cancel</Button>
              <Button onClick={() => {}}>Save</Button>
            </div>}>
          <p className="text-gray-600 dark:text-gray-400">
            This panel has a footer with action buttons.
          </p>
        </SlidePanel>
      </>;
  }
}`,...(m=(h=o.parameters)==null?void 0:h.docs)==null?void 0:m.source}}};var f,x,v;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <div className="p-8">
          <Button onClick={() => setIsOpen(true)}>Open from Left</Button>
        </div>
        <SlidePanel isOpen={isOpen} onClose={() => setIsOpen(false)} title="Navigation" position="left">
          <nav className="space-y-2">
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Dashboard</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Projects</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Settings</a>
          </nav>
        </SlidePanel>
      </>;
  }
}`,...(v=(x=l.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var y,O,j;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <div className="p-8">
          <Button onClick={() => setIsOpen(true)}>Open Large Panel</Button>
        </div>
        <SlidePanel isOpen={isOpen} onClose={() => setIsOpen(false)} title="Large Panel" size="lg">
          <p className="text-gray-600 dark:text-gray-400">
            This panel uses the &quot;lg&quot; size variant for more content space.
          </p>
        </SlidePanel>
      </>;
  }
}`,...(j=(O=i.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};const I=["Default","WithFooter","LeftPosition","LargeSize"];export{t as Default,i as LargeSize,l as LeftPosition,o as WithFooter,I as __namedExportsOrder,P as default};
