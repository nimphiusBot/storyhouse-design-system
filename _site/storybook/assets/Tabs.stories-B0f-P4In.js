import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as n}from"./index-B3e6rcmj.js";import{s as i,v as t}from"./index-4d24GJmF.js";import{c as d}from"./createLucideIcon-BXSMqvta.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],_=d("bell",P);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],I=d("mail",k);/**
 * @license lucide-react v1.11.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],G=d("user",D),z={title:"Components/Tabs",component:i,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","pills"]},size:{control:"select",options:["sm","md","lg"]}}},M=[{label:"Account",value:"account"},{label:"Notifications",value:"notifications"},{label:"Settings",value:"settings"}],l={render:()=>{const[a,s]=n.useState("account");return e.jsx("div",{className:"w-96",children:e.jsxs(i,{tabs:M,activeTab:a,onTabChange:s,children:[e.jsx(t,{value:"account",activeTab:a,children:e.jsx("p",{className:"text-sm text-gray-600",children:"Account settings content."})}),e.jsx(t,{value:"notifications",activeTab:a,children:e.jsx("p",{className:"text-sm text-gray-600",children:"Notification preferences."})}),e.jsx(t,{value:"settings",activeTab:a,children:e.jsx("p",{className:"text-sm text-gray-600",children:"General settings."})})]})})}},r={render:()=>{const[a,s]=n.useState("inbox"),c=[{label:"Inbox",value:"inbox",icon:e.jsx(I,{className:"w-4 h-4"})},{label:"Updates",value:"updates",icon:e.jsx(_,{className:"w-4 h-4"})},{label:"Profile",value:"profile",icon:e.jsx(G,{className:"w-4 h-4"})}];return e.jsx("div",{className:"w-96",children:e.jsxs(i,{tabs:c,activeTab:a,onTabChange:s,children:[e.jsx(t,{value:"inbox",activeTab:a,children:e.jsx("p",{className:"text-sm text-gray-600",children:"Your inbox messages."})}),e.jsx(t,{value:"updates",activeTab:a,children:e.jsx("p",{className:"text-sm text-gray-600",children:"Latest updates."})}),e.jsx(t,{value:"profile",activeTab:a,children:e.jsx("p",{className:"text-sm text-gray-600",children:"Profile settings."})})]})})}},o={render:()=>{const[a,s]=n.useState("inbox"),c=[{label:"Inbox",value:"inbox",badge:12},{label:"Drafts",value:"drafts",badge:3},{label:"Sent",value:"sent",badge:0}];return e.jsx("div",{className:"w-96",children:e.jsxs(i,{tabs:c,activeTab:a,onTabChange:s,children:[e.jsx(t,{value:"inbox",activeTab:a,children:e.jsx("p",{className:"text-sm text-gray-600",children:"12 unread messages."})}),e.jsx(t,{value:"drafts",activeTab:a,children:e.jsx("p",{className:"text-sm text-gray-600",children:"3 draft messages."})}),e.jsx(t,{value:"sent",activeTab:a,children:e.jsx("p",{className:"text-sm text-gray-600",children:"Sent messages."})})]})})}},v={render:()=>{const[a,s]=n.useState("general"),c=[{label:"General",value:"general"},{label:"Security",value:"security"},{label:"Privacy",value:"privacy"}];return e.jsx("div",{className:"w-96",children:e.jsxs(i,{variant:"pills",tabs:c,activeTab:a,onTabChange:s,children:[e.jsx(t,{value:"general",activeTab:a,children:e.jsx("p",{className:"text-sm text-gray-600",children:"General settings."})}),e.jsx(t,{value:"security",activeTab:a,children:e.jsx("p",{className:"text-sm text-gray-600",children:"Security settings."})}),e.jsx(t,{value:"privacy",activeTab:a,children:e.jsx("p",{className:"text-sm text-gray-600",children:"Privacy settings."})})]})})}},b={render:()=>{const[a,s]=n.useState("available"),c=[{label:"Available",value:"available"},{label:"Pending",value:"pending",disabled:!0},{label:"Archived",value:"archived"}];return e.jsx("div",{className:"w-96",children:e.jsxs(i,{tabs:c,activeTab:a,onTabChange:s,children:[e.jsx(t,{value:"available",activeTab:a,children:e.jsx("p",{className:"text-sm text-gray-600",children:"Available items."})}),e.jsx(t,{value:"archived",activeTab:a,children:e.jsx("p",{className:"text-sm text-gray-600",children:"Archived items."})})]})})}};var u,m,x;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState('account');
    return <div className="w-96">
        <Tabs tabs={sampleTabs} activeTab={active} onTabChange={setActive}>
          <TabsContent value="account" activeTab={active}>
            <p className="text-sm text-gray-600">Account settings content.</p>
          </TabsContent>
          <TabsContent value="notifications" activeTab={active}>
            <p className="text-sm text-gray-600">Notification preferences.</p>
          </TabsContent>
          <TabsContent value="settings" activeTab={active}>
            <p className="text-sm text-gray-600">General settings.</p>
          </TabsContent>
        </Tabs>
      </div>;
  }
}`,...(x=(m=l.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var p,T,g;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState('inbox');
    const tabs = [{
      label: 'Inbox',
      value: 'inbox',
      icon: <Mail className="w-4 h-4" />
    }, {
      label: 'Updates',
      value: 'updates',
      icon: <Bell className="w-4 h-4" />
    }, {
      label: 'Profile',
      value: 'profile',
      icon: <User className="w-4 h-4" />
    }];
    return <div className="w-96">
        <Tabs tabs={tabs} activeTab={active} onTabChange={setActive}>
          <TabsContent value="inbox" activeTab={active}>
            <p className="text-sm text-gray-600">Your inbox messages.</p>
          </TabsContent>
          <TabsContent value="updates" activeTab={active}>
            <p className="text-sm text-gray-600">Latest updates.</p>
          </TabsContent>
          <TabsContent value="profile" activeTab={active}>
            <p className="text-sm text-gray-600">Profile settings.</p>
          </TabsContent>
        </Tabs>
      </div>;
  }
}`,...(g=(T=r.parameters)==null?void 0:T.docs)==null?void 0:g.source}}};var h,y,N;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState('inbox');
    const tabs = [{
      label: 'Inbox',
      value: 'inbox',
      badge: 12
    }, {
      label: 'Drafts',
      value: 'drafts',
      badge: 3
    }, {
      label: 'Sent',
      value: 'sent',
      badge: 0
    }];
    return <div className="w-96">
        <Tabs tabs={tabs} activeTab={active} onTabChange={setActive}>
          <TabsContent value="inbox" activeTab={active}>
            <p className="text-sm text-gray-600">12 unread messages.</p>
          </TabsContent>
          <TabsContent value="drafts" activeTab={active}>
            <p className="text-sm text-gray-600">3 draft messages.</p>
          </TabsContent>
          <TabsContent value="sent" activeTab={active}>
            <p className="text-sm text-gray-600">Sent messages.</p>
          </TabsContent>
        </Tabs>
      </div>;
  }
}`,...(N=(y=o.parameters)==null?void 0:y.docs)==null?void 0:N.source}}};var j,C,f;v.parameters={...v.parameters,docs:{...(j=v.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState('general');
    const tabs = [{
      label: 'General',
      value: 'general'
    }, {
      label: 'Security',
      value: 'security'
    }, {
      label: 'Privacy',
      value: 'privacy'
    }];
    return <div className="w-96">
        <Tabs variant="pills" tabs={tabs} activeTab={active} onTabChange={setActive}>
          <TabsContent value="general" activeTab={active}>
            <p className="text-sm text-gray-600">General settings.</p>
          </TabsContent>
          <TabsContent value="security" activeTab={active}>
            <p className="text-sm text-gray-600">Security settings.</p>
          </TabsContent>
          <TabsContent value="privacy" activeTab={active}>
            <p className="text-sm text-gray-600">Privacy settings.</p>
          </TabsContent>
        </Tabs>
      </div>;
  }
}`,...(f=(C=v.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};var A,S,w;b.parameters={...b.parameters,docs:{...(A=b.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState('available');
    const tabs = [{
      label: 'Available',
      value: 'available'
    }, {
      label: 'Pending',
      value: 'pending',
      disabled: true
    }, {
      label: 'Archived',
      value: 'archived'
    }];
    return <div className="w-96">
        <Tabs tabs={tabs} activeTab={active} onTabChange={setActive}>
          <TabsContent value="available" activeTab={active}>
            <p className="text-sm text-gray-600">Available items.</p>
          </TabsContent>
          <TabsContent value="archived" activeTab={active}>
            <p className="text-sm text-gray-600">Archived items.</p>
          </TabsContent>
        </Tabs>
      </div>;
  }
}`,...(w=(S=b.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};const Y=["Default","WithIcons","WithBadges","Pills","DisabledTab"];export{l as Default,b as DisabledTab,v as Pills,o as WithBadges,r as WithIcons,Y as __namedExportsOrder,z as default};
