import{j as A}from"./jsx-runtime-BjG_zV1W.js";import{r as l}from"./index-B3e6rcmj.js";import{c as F}from"./index-4d24GJmF.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-JG1J0hlI.js";const P={title:"Components/FilterBar",component:F,tags:["autodocs"],parameters:{layout:"padded"}},d=[{value:"active",label:"Active"},{value:"draft",label:"Draft"},{value:"archived",label:"Archived"}],c={render:()=>{const[v,i]=l.useState(""),[p,u]=l.useState(""),[S,r]=l.useState([]),[y,t]=l.useState(!1),o=[{key:"status",label:"Status",type:"select",options:d,value:p,onChange:e=>{u(e),r(s=>{const a=s.filter(n=>n.key!=="status");if(e){const n=d.find(V=>V.value===e);return[...a,{key:"status",label:"Status",value:e,displayValue:n==null?void 0:n.label}]}return a})}},{key:"featured",label:"Featured",type:"boolean",value:y,onChange:e=>{t(e),r(s=>{const a=s.filter(n=>n.key!=="featured");return e?[...a,{key:"featured",label:"Featured",value:"true",displayValue:"Enabled"}]:a})}}];return A.jsx(F,{searchValue:v,onSearchChange:i,filters:o,activeFilters:S,onRemoveFilter:e=>{e==="status"&&u(""),e==="featured"&&t(!1),r(s=>s.filter(a=>a.key!==e))},onClearAll:()=>{u(""),t(!1),r([])}})}},f={render:()=>{const[v,i]=l.useState(""),[p,u]=l.useState(""),[S,r]=l.useState([]),y=[{key:"status",label:"Status",type:"select",options:d,value:p,onChange:t=>{u(t),r(o=>{const e=o.filter(s=>s.key!=="status");if(t){const s=d.find(a=>a.value===t);return[...e,{key:"status",label:"Status",value:t,displayValue:s==null?void 0:s.label}]}return e})}}];return A.jsx(F,{searchValue:v,onSearchChange:i,filters:y,activeFilters:S,onRemoveFilter:t=>{t==="status"&&u(""),r(o=>o.filter(e=>e.key!==t))},presets:[{label:"Recent",onClick:()=>i("recent")},{label:"Popular",onClick:()=>i("popular")}]})}};var h,k,b;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
    const [featured, setFeatured] = useState(false);
    const filters: FilterConfig[] = [{
      key: 'status',
      label: 'Status',
      type: 'select',
      options: statusOptions,
      value: status,
      onChange: val => {
        setStatus(val as string);
        setActiveFilters(prev => {
          const filtered = prev.filter(f => f.key !== 'status');
          if (val) {
            const opt = statusOptions.find(o => o.value === val);
            return [...filtered, {
              key: 'status',
              label: 'Status',
              value: val as string,
              displayValue: opt?.label
            }];
          }
          return filtered;
        });
      }
    }, {
      key: 'featured',
      label: 'Featured',
      type: 'boolean',
      value: featured,
      onChange: val => {
        setFeatured(val as boolean);
        setActiveFilters(prev => {
          const filtered = prev.filter(f => f.key !== 'featured');
          if (val) {
            return [...filtered, {
              key: 'featured',
              label: 'Featured',
              value: 'true',
              displayValue: 'Enabled'
            }];
          }
          return filtered;
        });
      }
    }];
    return <FilterBar searchValue={search} onSearchChange={setSearch} filters={filters} activeFilters={activeFilters} onRemoveFilter={key => {
      if (key === 'status') setStatus('');
      if (key === 'featured') setFeatured(false);
      setActiveFilters(prev => prev.filter(f => f.key !== key));
    }} onClearAll={() => {
      setStatus('');
      setFeatured(false);
      setActiveFilters([]);
    }} />;
  }
}`,...(b=(k=c.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};var m,g,C;f.parameters={...f.parameters,docs:{...(m=f.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
    const filters: FilterConfig[] = [{
      key: 'status',
      label: 'Status',
      type: 'select',
      options: statusOptions,
      value: status,
      onChange: val => {
        setStatus(val as string);
        setActiveFilters(prev => {
          const filtered = prev.filter(f => f.key !== 'status');
          if (val) {
            const opt = statusOptions.find(o => o.value === val);
            return [...filtered, {
              key: 'status',
              label: 'Status',
              value: val as string,
              displayValue: opt?.label
            }];
          }
          return filtered;
        });
      }
    }];
    return <FilterBar searchValue={search} onSearchChange={setSearch} filters={filters} activeFilters={activeFilters} onRemoveFilter={key => {
      if (key === 'status') setStatus('');
      setActiveFilters(prev => prev.filter(f => f.key !== key));
    }} presets={[{
      label: 'Recent',
      onClick: () => setSearch('recent')
    }, {
      label: 'Popular',
      onClick: () => setSearch('popular')
    }]} />;
  }
}`,...(C=(g=f.parameters)==null?void 0:g.docs)==null?void 0:C.source}}};const B=["Default","WithPresets"];export{c as Default,f as WithPresets,B as __namedExportsOrder,P as default};
