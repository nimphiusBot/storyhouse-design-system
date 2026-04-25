import{j as e}from"./jsx-runtime.BjG_zV1W.js";import{r}from"./index.3X4_umFU.js";const n=({checked:s,onChange:o,label:a,disabled:t})=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("button",{type:"button",role:"switch","aria-checked":s,disabled:t,onClick:()=>!t&&o(!s),className:`
        relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
        ${s?"bg-orange-600":"bg-gray-300 dark:bg-gray-600"}
        ${t?"opacity-50 cursor-not-allowed":"cursor-pointer"}
      `,children:[e.jsx("span",{className:"sr-only",children:a}),e.jsx("span",{className:`
          pointer-events-none inline-block w-4 h-4 rounded-full bg-white shadow transform ring-0
          transition-transform duration-200 ease-in-out
          ${s?"translate-x-5":"translate-x-0"}
        `})]}),e.jsx("span",{className:"text-sm text-gray-700 dark:text-gray-300 select-none",children:a})]});function x(){const[s,o]=r.useState(!0),[a,t]=r.useState(!1),[i,l]=r.useState(!0);return e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("p",{className:"mb-3 text-sm font-medium text-gray-500",children:"Settings"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(n,{checked:s,onChange:o,label:"Dark Mode"}),e.jsx(n,{checked:a,onChange:t,label:"Notifications"}),e.jsx(n,{checked:i,onChange:l,label:"Auto-save"}),e.jsx(n,{checked:!1,onChange:()=>{},label:"Disabled",disabled:!0})]})]}),e.jsx("p",{className:"text-xs text-gray-400",children:"Toggle switches for binary settings with on, off, and disabled states."})]})}export{x as default};
