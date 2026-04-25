import{j as r}from"./jsx-runtime-BjG_zV1W.js";import{r as n}from"./index-B3e6rcmj.js";import{O as l,a as d}from"./index-4d24GJmF.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const k={title:"Components/ErrorBoundary",component:l,parameters:{layout:"centered"},tags:["autodocs"]},c=({shouldThrow:e})=>{if(e)throw new Error("Something went wrong!");return r.jsx("p",{className:"text-sm text-gray-600",children:"Everything is working fine."})},o={render:()=>{const[e,s]=n.useState(!1);return r.jsx("div",{className:"w-96",children:r.jsx(l,{children:r.jsxs("div",{className:"space-y-4",children:[r.jsx(c,{shouldThrow:e}),r.jsx(d,{onClick:()=>s(!0),children:"Trigger Error"})]})})})}},t={render:()=>{const[e,s]=n.useState(!1);return r.jsx("div",{className:"w-96",children:r.jsx(l,{fallback:r.jsxs("div",{className:"p-8 text-center bg-yellow-50 rounded-lg border border-yellow-200",children:[r.jsx("p",{className:"text-yellow-800 font-medium",children:"Custom error UI"}),r.jsx("p",{className:"text-yellow-600 text-sm mt-1",children:"Try refreshing the page."})]}),children:r.jsxs("div",{className:"space-y-4",children:[r.jsx(c,{shouldThrow:e}),r.jsx(d,{onClick:()=>s(!0),children:"Trigger Error"})]})})})}},a={render:()=>{const[e,s]=n.useState(!1),[u,b]=n.useState(null);return r.jsxs("div",{className:"w-96 space-y-4",children:[u&&r.jsxs("div",{className:"text-xs text-red-500 bg-red-50 p-2 rounded border border-red-200",children:["Error logged: ",u]}),r.jsx(l,{onError:v=>b(v.message),fallback:r.jsxs("div",{className:"p-4 text-center bg-yellow-50 rounded-lg border border-yellow-200",children:[r.jsx("p",{className:"text-yellow-800 font-medium",children:"An error was caught"}),r.jsx("p",{className:"text-yellow-600 text-sm mt-1",children:"Check the log above for details."})]}),children:r.jsxs("div",{className:"space-y-4",children:[r.jsx(c,{shouldThrow:e}),r.jsx(d,{onClick:()=>s(!0),children:"Trigger Error"})]})})]})}};var i,m,h;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => {
    const [shouldThrow, setShouldThrow] = useState(false);
    return <div className="w-96">
        <ErrorBoundary>
          <div className="space-y-4">
            <BuggyComponent shouldThrow={shouldThrow} />
            <Button onClick={() => setShouldThrow(true)}>
              Trigger Error
            </Button>
          </div>
        </ErrorBoundary>
      </div>;
  }
}`,...(h=(m=o.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var p,g,x;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => {
    const [shouldThrow, setShouldThrow] = useState(false);
    return <div className="w-96">
        <ErrorBoundary fallback={<div className="p-8 text-center bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 font-medium">Custom error UI</p>
              <p className="text-yellow-600 text-sm mt-1">Try refreshing the page.</p>
            </div>}>
          <div className="space-y-4">
            <BuggyComponent shouldThrow={shouldThrow} />
            <Button onClick={() => setShouldThrow(true)}>
              Trigger Error
            </Button>
          </div>
        </ErrorBoundary>
      </div>;
  }
}`,...(x=(g=t.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var w,y,E;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => {
    const [shouldThrow, setShouldThrow] = useState(false);
    const [lastError, setLastError] = useState<string | null>(null);
    return <div className="w-96 space-y-4">
        {lastError && <div className="text-xs text-red-500 bg-red-50 p-2 rounded border border-red-200">
            Error logged: {lastError}
          </div>}
        <ErrorBoundary onError={error => setLastError(error.message)} fallback={<div className="p-4 text-center bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 font-medium">An error was caught</p>
              <p className="text-yellow-600 text-sm mt-1">Check the log above for details.</p>
            </div>}>
          <div className="space-y-4">
            <BuggyComponent shouldThrow={shouldThrow} />
            <Button onClick={() => setShouldThrow(true)}>
              Trigger Error
            </Button>
          </div>
        </ErrorBoundary>
      </div>;
  }
}`,...(E=(y=a.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};const C=["DefaultFallback","CustomFallback","WithErrorCallback"];export{t as CustomFallback,o as DefaultFallback,a as WithErrorCallback,C as __namedExportsOrder,k as default};
