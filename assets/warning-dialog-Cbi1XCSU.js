import{r as c,j as a,U as _}from"./index-CJd4kCnu.js";import{r as f,a as l,F as r,b as d}from"./animate-dialog-DazWgCrD.js";const m="_ui-dialog_12phd_1 ui-dialog",p="_container_12phd_5",h="_warning_12phd_17",D="_close-button_12phd_27",t={uiDialog:m,container:p,warning:h,closeButton:D},x=`Please add at least 2 valid options.

An option is considered valid if its title is not empty and its weight is greater than 0`,E="Close",N=({open:s,onClose:g})=>{const i=c.useRef(null),u=async()=>{const{current:o}=i;o&&(o.showModal(),await l(o,r.keyframes,r.options))},e=async o=>{const{current:n}=i;n&&(await l(n,d.keyframes,d.options),n.close(o))};return c.useLayoutEffect(()=>{s&&u()},[s]),s&&f.createPortal(a.jsx("dialog",{ref:i,className:t.uiDialog,onClick:o=>{o.target===o.currentTarget&&e("cancel")},onClose:()=>{g()},children:a.jsxs("div",{className:t.container,children:[a.jsx("p",{className:t.warning,children:x}),a.jsx(_,{className:t.closeButton,onClick:()=>{e()},children:E})]})}),document.body)};export{N as default};
