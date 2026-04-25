import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as i}from"./index-B3e6rcmj.js";import{S as r,a as p}from"./index-4d24GJmF.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const L={title:"Components/ThumbnailLightbox",component:r,tags:["autodocs"],parameters:{layout:"fullscreen"}},a={render:()=>{const[s,t]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>t(!0),children:"Open Lightbox"}),e.jsx(r,{isOpen:s,onClose:()=>t(!1),imageUrl:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",orientation:"landscape",aspectRatio:"16:9",dimensions:{width:1920,height:1080},metadata:{generatedAt:new Date().toISOString(),model:"DALL-E 3",processingTime:2450}})]})}},n={render:()=>{const[s,t]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>t(!0),children:"Open Portrait"}),e.jsx(r,{isOpen:s,onClose:()=>t(!1),imageUrl:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",orientation:"portrait",aspectRatio:"9:16"})]})}},o={render:()=>{const[s,t]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(p,{onClick:()=>t(!0),children:"Open Lightbox"}),e.jsx(r,{isOpen:s,onClose:()=>t(!1),imageUrl:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",orientation:"landscape",aspectRatio:"16:9"})]})}};var c,l,m;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button onClick={() => setIsOpen(true)}>Open Lightbox</Button>
        <ThumbnailLightbox isOpen={isOpen} onClose={() => setIsOpen(false)} imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800" orientation="landscape" aspectRatio="16:9" dimensions={{
        width: 1920,
        height: 1080
      }} metadata={{
        generatedAt: new Date().toISOString(),
        model: 'DALL-E 3',
        processingTime: 2450
      }} />
      </>;
  }
}`,...(m=(l=a.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var u,d,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button onClick={() => setIsOpen(true)}>Open Portrait</Button>
        <ThumbnailLightbox isOpen={isOpen} onClose={() => setIsOpen(false)} imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400" orientation="portrait" aspectRatio="9:16" />
      </>;
  }
}`,...(h=(d=n.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};var g,O,f;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button onClick={() => setIsOpen(true)}>Open Lightbox</Button>
        <ThumbnailLightbox isOpen={isOpen} onClose={() => setIsOpen(false)} imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800" orientation="landscape" aspectRatio="16:9" />
      </>;
  }
}`,...(f=(O=o.parameters)==null?void 0:O.docs)==null?void 0:f.source}}};const j=["Default","Portrait","NoMetadata"];export{a as Default,o as NoMetadata,n as Portrait,j as __namedExportsOrder,L as default};
