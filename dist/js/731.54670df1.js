(self["webpackChunkvost_app"]=self["webpackChunkvost_app"]||[]).push([[731],{2731:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return k}});var l=a(3396);const n={class:"flex flex-col w-full h-screen items-center bg-gray-700 overflow-hidden space-y-1"},s={class:"w-full py-4 px-3 flex flex-col md:flex-row space-y-5 space-x-5 h-full",style:{"align-items":"center",display:"flex","justify-content":"center"}},o=(0,l._)("div",{class:"w-1/6"},null,-1),d={class:"card md:card-side bg-base-100 shadow-xl w-full md:w-2/6 h-80 p-4"},c={class:"card-body p-0",style:{"align-items":"center",display:"flex","justify-content":"space-between"}},i=(0,l._)("img",{src:"/img/upload.png",alt:"",class:"w-full object-fit"},null,-1),r={class:"card md:card-side bg-base-100 shadow-xl w-full md:w-2/6 h-80 p-4"},u={class:"card-body p-0",style:{"align-items":"center",display:"flex","justify-content":"space-between"}},b=(0,l._)("img",{src:"/img/backup.png",alt:"",class:"w-full object-fit"},null,-1),w=(0,l._)("div",{class:"w-1/6"},null,-1);function p(e,t,a,p,f,g){return(0,l.wg)(),(0,l.iD)("div",n,[(0,l._)("div",s,[o,(0,l._)("div",d,[(0,l._)("div",c,[i,(0,l._)("button",{onClick:t[0]||(t[0]=(...e)=>g.backupandDownload&&g.backupandDownload(...e)),class:"btn btn-primary btn-sm"}," Faire un Backup ")])]),(0,l._)("div",r,[(0,l._)("div",u,[b,(0,l._)("button",{onClick:t[1]||(t[1]=(...e)=>g.Downloadlast&&g.Downloadlast(...e)),class:"btn btn-primary btn-sm"}," telecharger le dernier backup ")])]),w])])}var f=a(1006),g=a(2884),m=a.n(g),y={methods:{backupandDownload(e){e.target.disable=!0,f.Z.get("/dump").then((t=>{m()(t.data,`${Date.now()}.sql`),e.target.disable=!1})).catch((t=>{console.log(t),e.target.disable=!1}))},Downloadlast(e){e.target.disable=!0,f.Z.get("/lastdump").then((t=>{console.log(t),m()(t.data,`${Date.now()}.sql`),e.target.disable=!1})).catch((t=>{console.log(t),e.target.disable=!1}))}}},v=a(89);const h=(0,v.Z)(y,[["render",p]]);var k=h},2884:function(e){e.exports=function(e,t,a,l){var n="undefined"!==typeof l?[l,e]:[e],s=new Blob(n,{type:a||"application/octet-stream"});if("undefined"!==typeof window.navigator.msSaveBlob)window.navigator.msSaveBlob(s,t);else{var o=window.URL&&window.URL.createObjectURL?window.URL.createObjectURL(s):window.webkitURL.createObjectURL(s),d=document.createElement("a");d.style.display="none",d.href=o,d.setAttribute("download",t),"undefined"===typeof d.download&&d.setAttribute("target","_blank"),document.body.appendChild(d),d.click(),setTimeout((function(){document.body.removeChild(d),window.URL.revokeObjectURL(o)}),200)}}}}]);
//# sourceMappingURL=731.54670df1.js.map