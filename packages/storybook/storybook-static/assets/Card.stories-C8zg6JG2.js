import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{d as N,u as B,p as E,f as T,b as z,a as o}from"./index-rY_rytsE.js";import"./index-B3e6rcmj.js";import"./_commonjsHelpers-Cpj98o6Y.js";const G={title:"Components/Card",component:N,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","elevated","bordered","flat"]},padding:{control:"select",options:["none","sm","md","lg"]}}},r={args:{children:"Card content",style:{maxWidth:320}}},a={render:S=>e.jsxs(N,{...S,style:{maxWidth:400},children:[e.jsxs(B,{children:[e.jsx(E,{children:"Getting Started"}),e.jsx("span",{className:"text-sm text-gray-500",children:"v2.1.0"})]}),e.jsxs(T,{children:[e.jsx("p",{className:"mb-4",children:"Welcome to the design system. This card demonstrates composing cards with headers, content, and footers."}),e.jsx("p",{className:"text-sm text-gray-500",children:"Cards are the foundation of our layout system."})]}),e.jsxs(z,{children:[e.jsx(o,{variant:"primary",size:"sm",children:"Learn More"}),e.jsx(o,{variant:"ghost",size:"sm",children:"Dismiss"})]})]})},t={args:{variant:"elevated",children:"Elevated card with shadow",style:{maxWidth:320}}},s={args:{variant:"bordered",children:"Card with thick border",style:{maxWidth:320}}},n={args:{variant:"flat",children:"Flat card without border or shadow",style:{maxWidth:320}}},d={args:{padding:"none",children:"Card without padding",style:{maxWidth:320}}};var i,c,m;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    children: 'Card content',
    style: {
      maxWidth: 320
    }
  }
}`,...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var l,h,p;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => <Card {...args} style={{
    maxWidth: 400
  }}>
      <CardHeader>
        <CardTitle>Getting Started</CardTitle>
        <span className="text-sm text-gray-500">v2.1.0</span>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Welcome to the design system. This card demonstrates composing cards with headers, content, and footers.</p>
        <p className="text-sm text-gray-500">Cards are the foundation of our layout system.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">Learn More</Button>
        <Button variant="ghost" size="sm">Dismiss</Button>
      </CardFooter>
    </Card>
}`,...(p=(h=a.parameters)==null?void 0:h.docs)==null?void 0:p.source}}};var u,g,x;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: 'elevated',
    children: 'Elevated card with shadow',
    style: {
      maxWidth: 320
    }
  }
}`,...(x=(g=t.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var y,C,v;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'bordered',
    children: 'Card with thick border',
    style: {
      maxWidth: 320
    }
  }
}`,...(v=(C=s.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var f,W,w;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'flat',
    children: 'Flat card without border or shadow',
    style: {
      maxWidth: 320
    }
  }
}`,...(w=(W=n.parameters)==null?void 0:W.docs)==null?void 0:w.source}}};var j,b,F;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    padding: 'none',
    children: 'Card without padding',
    style: {
      maxWidth: 320
    }
  }
}`,...(F=(b=d.parameters)==null?void 0:b.docs)==null?void 0:F.source}}};const L=["Default","WithHeaderAndFooter","Elevated","Bordered","Flat","NoPadding"];export{s as Bordered,r as Default,t as Elevated,n as Flat,d as NoPadding,a as WithHeaderAndFooter,L as __namedExportsOrder,G as default};
