import{j as o}from"./jsx-runtime-BjG_zV1W.js";import{u as k,a as t}from"./index-4d24GJmF.js";import{c as C}from"./createLucideIcon-BXSMqvta.js";import"./index-B3e6rcmj.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],_=C("circle-question-mark",N),D={title:"Components/Tooltip",component:k,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{content:{control:"text"},position:{control:"select",options:["top","bottom","left","right"]},delay:{control:"number"}},decorators:[w=>o.jsx("div",{style:{padding:"100px"},children:o.jsx(w,{})})]},e={args:{content:"This tooltip appears on top",position:"top",children:o.jsx(t,{children:"Hover me (top)"})}},r={args:{content:"This tooltip appears below",position:"bottom",children:o.jsx(t,{children:"Hover me (bottom)"})}},s={args:{content:"This tooltip is on the left",position:"left",children:o.jsx(t,{children:"Hover me (left)"})}},n={args:{content:"This tooltip is on the right",position:"right",children:o.jsx(t,{children:"Hover me (right)"})}},a={args:{content:"Helpful information",position:"top",children:o.jsxs("span",{className:"inline-flex items-center gap-1 text-sm text-gray-500 cursor-pointer hover:text-gray-700",children:[o.jsx(_,{className:"w-4 h-4"})," Hover for help"]})}},i={args:{content:"Appears after 1 second",position:"top",delay:1e3,children:o.jsx(t,{variant:"secondary",children:"Slow tooltip (1s)"})}};var c,p,l;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    content: 'This tooltip appears on top',
    position: 'top',
    children: <Button>Hover me (top)</Button>
  }
}`,...(l=(p=e.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var m,d,h;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    content: 'This tooltip appears below',
    position: 'bottom',
    children: <Button>Hover me (bottom)</Button>
  }
}`,...(h=(d=r.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};var u,g,x;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    content: 'This tooltip is on the left',
    position: 'left',
    children: <Button>Hover me (left)</Button>
  }
}`,...(x=(g=s.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var f,y,v;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    content: 'This tooltip is on the right',
    position: 'right',
    children: <Button>Hover me (right)</Button>
  }
}`,...(v=(y=n.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var H,B,T;a.parameters={...a.parameters,docs:{...(H=a.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    content: 'Helpful information',
    position: 'top',
    children: <span className="inline-flex items-center gap-1 text-sm text-gray-500 cursor-pointer hover:text-gray-700">
        <HelpCircle className="w-4 h-4" /> Hover for help
      </span>
  }
}`,...(T=(B=a.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var j,b,S;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    content: 'Appears after 1 second',
    position: 'top',
    delay: 1000,
    children: <Button variant="secondary">Slow tooltip (1s)</Button>
  }
}`,...(S=(b=i.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};const E=["Top","Bottom","Left","Right","WithIcon","CustomDelay"];export{r as Bottom,i as CustomDelay,s as Left,n as Right,e as Top,a as WithIcon,E as __namedExportsOrder,D as default};
