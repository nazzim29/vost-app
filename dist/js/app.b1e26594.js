(function(){var e={3286:function(e,t,r){"use strict";var n=r(9242),a=r(3396),o=r(7139);function s(e,t,r,n,s,i){const d=(0,a.up)("nav-bar"),c=(0,a.up)("router-view"),u=(0,a.up)("Icon");return(0,a.wg)(),(0,a.iD)(a.HY,null,[i.loggedIn?((0,a.wg)(),(0,a.j4)(d,{key:0,extended:!0})):(0,a.kq)("",!0),(0,a._)("div",{class:(0,o.C_)(["flex-1 w-full overflow-x-hidden h-screen",{"pl-1/6 md:pl-16 bg":i.loggedIn}])},[(0,a.Wm)(c)],2),(0,a._)("div",{ref:"cursorRef",class:(0,o.C_)(["cursor",{hover:s.hover},{hidden:s.hideCursor}]),style:(0,o.j5)(i.cursorCircle)},[(0,a.Wm)(u,{icon:"bi:brush",class:"h-10 w-10 text-gray-300"})],6)],64)}var i=r(6088),d={name:"App",components:{Icon:i.JO},data(){return{hover:!1,hideCursor:!0,xParent:0,yParent:0}},computed:{loggedIn(){return this.$store.state.users.authenticated},cursorCircle(){return`transform: translateX(${this.xParent}px) translateY(${this.yParent}px) translateZ(0) translate3d(0, 0, 0);`}},methods:{moveCursor(e){this.xParent=e.clientX-1,this.yParent=e.clientY-25}},mounted(){document.addEventListener("mousemove",this.moveCursor),document.addEventListener("mouseleave",(()=>{this.hideCursor=!0})),document.addEventListener("mouseenter",(()=>{this.hideCursor=!1}))}},c=r(89);const u=(0,c.Z)(d,[["render",s]]);var l=u,m=r(678),h=r(5692);function p(e){return()=>r(2513)(`./${e}.vue`)}const g=[{path:"/",name:"Home",component:p("Home"),meta:{auth:!0}},{path:"/parametres",name:"Parametres",component:p("Parametres"),meta:{auth:!0,role:"admin"}},{path:"/login",name:"Login",component:p("user/Login"),meta:{auth:!1}},{path:"/user",name:"User",component:p("user/UsersIndex"),meta:{auth:!0,autorisation:"read-utilisateur"}},{path:"/fonction",name:"Fonction",component:p("user/Fonction"),meta:{auth:!0,role:"admin"}},{path:"/commandes",name:"Commandes",component:p("commandes/Commandes"),meta:{auth:!0,autorisation:"read-commande"}},{path:"/commandes/:id",name:"Commande",component:p("commandes/CommandeShow"),meta:{auth:!0,autorisation:"read-commande"}},{path:"/produits",name:"Produits",component:p("produits/Produits"),meta:{auth:!0,autorisation:"read-produit"}},{path:"/productions",name:"Productions",component:p("produits/Productions"),meta:{auth:!0,autorisation:"read-production"}},{path:"/MatierePremiere",name:"MatierePremiere",component:p("produits/MatierePremiere"),meta:{auth:!0,autorisation:"read-matiere"}},{path:"/contact-client",name:"ContactClient",component:p("client/ContactClient"),meta:{auth:!0,autorisation:"read-contactclient"}},{path:"/Ventes/:id",name:"Vente",component:p("vente/VenteShow"),meta:{auth:!0,autorisation:"read-vente"}},{path:"/Ventes",name:"Ventes",component:p("vente/Ventes"),meta:{auth:!0,autorisation:"read-vente"}},{path:"/clients",name:"Clients",component:p("client/Client"),meta:{auth:!0,autorisation:"read-client"}},{path:"/clients/add",name:"AddClients",component:p("client/ClientShow"),meta:{auth:!0,autorisation:"add-client"}},{path:"/clients/:id",name:"ClientShow",component:p("client/ClientShow"),meta:{auth:!0,autorisation:"read-client"}},{path:"/paiements",name:"Paiements",component:p("paiement/index"),meta:{auth:!0}},{path:"/paiements/:id",name:"PaiementShow",component:p("paiement/PaiementShow"),meta:{auth:!0}}],f=(0,m.p7)({history:(0,m.PO)("/"),routes:g});let v=null;async function w(){return!!h.Z.getters.isAuth&&(v||(v=setInterval((async()=>{await h.Z.dispatch("checkAuth")}),5e3)),!0)}function y(e){e.router=f,e.use(f)}f.beforeEach((async function(e,t,r){console.log();let n=await w();if(e.meta.auth&&!n)return console.log("not logged in"),r({name:"Login"});if(e.meta.auth&&n){if(console.log("logged in"),e.meta.role)return h.Z.getters.getCurrentUser.Profile.nom===e.meta.role?r():(console.log("not authorized (role)"),r("/"));if(e.meta.autorisation)return h.Z.getters.getCurrentUser.Profile.Autorisations.find((t=>t.nom==e.meta.autorisation))?r():(console.log("not authorized (autorisation)"),r("/"))}return r()}));var C=r(7979),b=(r(5113),r(9907));(0,b.z)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});const P={class:"fixed h-screen w-full flex flex-row z-50 pointer-events-none"},x=(0,a._)("img",{src:"https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg",alt:"avatar",class:"object-cover w-12 h-10 rounded-md"},null,-1),Z={class:"flex flex-col"},k={class:"flex flex-row w-full"},_={class:"flex-row mt-2 w-full"};function j(e,t,r,n,s,i){const d=(0,a.up)("Icon");return(0,a.wg)(),(0,a.iD)("div",P,[(0,a._)("div",{onMouseover:t[12]||(t[12]=e=>s.extended=!0),class:(0,o.C_)(["pointer-events-auto transition-all duration-100 ease-linear group overflow-hidden h-screen flex flex-col bg-gray-900 rounded-r-lg shadow-4xl z-50",[s.extended?"w-1/2 md:w-52 ":"w-1/6 md:w-16"]])},[(0,a._)("div",{class:(0,o.C_)(["p-1 w-full bg-gray-600 flex items-center transition-all duration-100 delay-200 h-24 ease-linear",[s.extended?"flex-row space-x-1 md:space-x-2 md:justify-center":"flex-col justify-center space-y-1"]])},[x,(0,a._)("div",Z,[(0,a._)("div",{class:(0,o.C_)([[s.extended?"w-full h-6":"w-0 h-0"],"text-white text-md font-semibold overflow-hidden transition-all duration-100 ease-linear"])},(0,o.zw)(i.nom)+" "+(0,o.zw)(i.prenom),3),(0,a._)("div",{class:(0,o.C_)(["flex transition-all duration-100 delay-200 ease-linear",[s.extended?"flex-row":" justify-center items-center flex-col-reverse mx-auto"]])},[(0,a.Wm)(d,{icon:i.iconProfile,class:"h-5 w-5",style:(0,o.j5)({color:i.iconColor})},null,8,["icon","style"]),(0,a._)("div",{class:(0,o.C_)(["text-white text-xs transition-all duration-100 ease-linear ml-1 font-semibold overflow-hidden",[s.extended?"w-full h-6":"w-0 h-0"]])},(0,o.zw)(i.profile),3)],2)])],2),(0,a._)("div",k,[(0,a._)("div",_,[i.hasPermission("read-client")?((0,a.wg)(),(0,a.iD)("div",{key:0,class:(0,o.C_)(["group transition-colors duration-100 ease-linear w-full h-10 text-white inline-flex space-x-2 justify-center items-center",["Clients"===this.$router.currentRoute.value.name?"bg-gray-600 border-r-2 border-blue-700":"bg-gray-900 hover:bg-gray-500",this.extended?"justify-evenly p-1 pr-1":"justify-center"]]),onClick:t[0]||(t[0]=e=>i.goto("/clients"))},[(0,a.Wm)(d,{class:"transition-all ease-linear flex-1 w-10 h-10",icon:"gridicons:multiple-users"}),(0,a._)("label",{class:(0,o.C_)(["h-6 overflow-hidden",[s.extended?"w-full":"w-0"]])},"Clients",2)],2)):(0,a.kq)("",!0),i.hasPermission("read-utilisateur")?((0,a.wg)(),(0,a.iD)("div",{key:1,class:(0,o.C_)(["group transition-colors duration-100 ease-linear w-full h-10 text-white inline-flex space-x-2 justify-center items-center",["User"===this.$router.currentRoute.value.name?"bg-gray-600 border-r-2 border-blue-700":"bg-gray-900 hover:bg-gray-500",this.extended?"justify-evenly p-1":"justify-center"]]),onClick:t[1]||(t[1]=e=>i.goto("/user"))},[(0,a.Wm)(d,{icon:"clarity:employee-group-solid",class:"transition-all ease-linear flex-1 w-10 h-10"}),(0,a._)("label",{class:(0,o.C_)(["overflow-hidden",[s.extended?"w-full h-6":"w-0 h-0"]])},"Utilisateurs",2)],2)):(0,a.kq)("",!0),"admin"==i.user.Profile.nom?((0,a.wg)(),(0,a.iD)("div",{key:2,class:(0,o.C_)(["group transition-colors duration-100 ease-linear w-full h-10 text-white inline-flex space-x-2 justify-center items-center",["Fonction"===this.$router.currentRoute.value.name?"bg-gray-600 border-r-2 border-blue-700":"bg-gray-900 hover:bg-gray-500",this.extended?"justify-evenly p-1":"justify-center"]]),onClick:t[2]||(t[2]=e=>i.goto("/fonction"))},[(0,a.Wm)(d,{icon:"icon-park-outline:permissions",class:"transition-all ease-linear flex-1 w-10 h-10"}),(0,a._)("label",{class:(0,o.C_)(["overflow-hidden",[s.extended?"w-full h-6":"w-0 h-0"]])},"Privileges",2)],2)):(0,a.kq)("",!0),i.hasPermission("read-matiere")?((0,a.wg)(),(0,a.iD)("div",{key:3,class:(0,o.C_)(["group transition-colors duration-100 ease-linear w-full h-10 text-white inline-flex space-x-2 justify-center items-center",["MatierePremiere"===this.$router.currentRoute.value.name?"bg-gray-600 border-r-2 border-blue-700":"bg-gray-900 hover:bg-gray-500",this.extended?"justify-evenly p-1":"justify-center"]]),onClick:t[3]||(t[3]=e=>i.goto("/MatierePremiere"))},[(0,a.Wm)(d,{icon:"ri:paint-fill",class:"transition-all ease-linear flex-1 w-10 h-10"}),(0,a._)("label",{class:(0,o.C_)(["overflow-hidden",[s.extended?"w-full h-6":"w-0 h-0"]])},"Matieres premiere",2)],2)):(0,a.kq)("",!0),i.hasPermission("read-produit")?((0,a.wg)(),(0,a.iD)("div",{key:4,class:(0,o.C_)(["group transition-colors duration-100 ease-linear w-full h-10 text-white inline-flex space-x-2 justify-center items-center",["Produits"===this.$router.currentRoute.value.name?"bg-gray-600 border-r-2 border-blue-700":"bg-gray-900 hover:bg-gray-500",this.extended?"justify-evenly p-1":"justify-center"]]),onClick:t[4]||(t[4]=e=>i.goto("/Produits"))},[(0,a.Wm)(d,{icon:"ri:paint-fill",class:"transition-all ease-linear flex-1 w-10 h-10"}),(0,a._)("label",{class:(0,o.C_)(["overflow-hidden",[s.extended?"w-full h-6":"w-0 h-0"]])},"Produits",2)],2)):(0,a.kq)("",!0),i.hasPermission("read-commande")?((0,a.wg)(),(0,a.iD)("div",{key:5,class:(0,o.C_)(["group transition-colors duration-100 ease-linear w-full h-10 text-white inline-flex space-x-2 justify-center items-center",["Commandes"===this.$router.currentRoute.value.name?"bg-gray-600 border-r-2 border-blue-700":"bg-gray-900 hover:bg-gray-500",this.extended?"justify-evenly p-1 pr-1":"justify-center"]]),onClick:t[5]||(t[5]=e=>i.goto("/commandes"))},[(0,a.Wm)(d,{class:"transition-all ease-linear flex-1 w-10 h-10",icon:"icon-park-outline:transaction-order"}),(0,a._)("label",{class:(0,o.C_)(["h-6 overflow-hidden",[s.extended?"w-full":"w-0"]])},"Commandes",2)],2)):(0,a.kq)("",!0),i.hasPermission("read-vente")?((0,a.wg)(),(0,a.iD)("div",{key:6,class:(0,o.C_)(["group transition-colors duration-100 ease-linear w-full h-10 text-white inline-flex space-x-2 justify-center items-center",["Ventes"===this.$router.currentRoute.value.name?"bg-gray-600 border-r-2 border-blue-700":"bg-gray-900 hover:bg-gray-500",this.extended?"justify-evenly p-1":"justify-center"]]),onClick:t[6]||(t[6]=e=>i.goto("/ventes"))},[(0,a.Wm)(d,{icon:"mdi:shipping-pallet",class:"transition-all ease-linear flex-1 w-10 h-10"}),(0,a._)("label",{class:(0,o.C_)(["overflow-hidden",[s.extended?"w-full h-6":"w-0 h-0"]])},"Ventes",2)],2)):(0,a.kq)("",!0),(0,a._)("div",{class:(0,o.C_)(["group transition-colors duration-100 ease-linear w-full h-10 text-white inline-flex space-x-2 justify-center items-center",["Paiements"===this.$router.currentRoute.value.name?"bg-gray-600 border-r-2 border-blue-700":"bg-gray-900 hover:bg-gray-500",this.extended?"justify-evenly p-1 pr-1":"justify-center"]]),onClick:t[7]||(t[7]=e=>i.goto("/paiements"))},[(0,a.Wm)(d,{class:"transition-all ease-linear flex-1 w-8 h-8",icon:"fa-solid:money-check-alt"}),(0,a._)("label",{class:(0,o.C_)(["h-6 overflow-hidden",[s.extended?"w-full":"w-0"]])},"Paiements",2)],2),"admin"==i.user.Profile.nom?((0,a.wg)(),(0,a.iD)("div",{key:7,class:(0,o.C_)(["group transition-colors duration-100 ease-linear w-full h-10 text-white inline-flex space-x-2 justify-center items-center",["Parametres"===this.$router.currentRoute.value.name?"bg-gray-600 border-r-2 border-blue-700":"bg-gray-900 hover:bg-gray-500",this.extended?"justify-evenly p-1":"justify-center"]]),onClick:t[8]||(t[8]=e=>i.goto("/parametres"))},[(0,a.Wm)(d,{icon:"ci:settings-filled",class:"transition-all ease-linear flex-1 w-10 h-10"}),(0,a._)("label",{class:(0,o.C_)(["overflow-hidden",[s.extended?"w-full h-6":"w-0 h-0"]])},"Parametres",2)],2)):(0,a.kq)("",!0),i.hasPermission("read-production")?((0,a.wg)(),(0,a.iD)("div",{key:8,class:(0,o.C_)(["group transition-colors duration-100 ease-linear w-full h-10 text-white inline-flex space-x-2 justify-center items-center",["Productions"===this.$router.currentRoute.value.name?"bg-gray-600 border-r-2 border-blue-700":"bg-gray-900 hover:bg-gray-500",this.extended?"justify-evenly p-1":"justify-center"]]),onClick:t[9]||(t[9]=e=>i.goto("/Productions"))},[(0,a.Wm)(d,{icon:"lucide:package-plus",class:"transition-all ease-linear flex-1 w-10 h-10"}),(0,a._)("label",{class:(0,o.C_)(["overflow-hidden",[s.extended?"w-full h-6":"w-0 h-0"]])},"Productions",2)],2)):(0,a.kq)("",!0),i.hasPermission("read-contactclient")?((0,a.wg)(),(0,a.iD)("div",{key:9,class:(0,o.C_)(["group transition-colors duration-100 ease-linear w-full h-10 text-white inline-flex space-x-2 justify-center items-center",["ContactClient"===this.$router.currentRoute.value.name?"bg-gray-600 border-r-2 border-blue-700":"bg-gray-900 hover:bg-gray-500",this.extended?"justify-evenly p-1":"justify-center"]]),onClick:t[10]||(t[10]=e=>i.goto("/contact-client"))},[(0,a.Wm)(d,{icon:"icon-park-outline:mail-package",class:"transition-all ease-linear flex-1 w-10 h-10"}),(0,a._)("label",{class:(0,o.C_)(["overflow-hidden",[s.extended?"w-full h-6":"w-0 h-0"]])},"Contact Client",2)],2)):(0,a.kq)("",!0)])]),(0,a._)("div",{class:(0,o.C_)(["mt-auto text-center text-light text-white mb-2 h-10 overflow-hidden transistion-all ease-in-out",[s.extended?"w-full delay-300 duration-100":"w-0 duration-75"]]),onClick:t[11]||(t[11]=(...e)=>i.logout&&i.logout(...e))}," EURL NANOKIMYA ",2)],34),s.extended?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"ml-4 flex-1 z-40 pointer-events-auto",onMouseenter:t[13]||(t[13]=e=>this.extended=!1)},null,32)):(0,a.kq)("",!0)])}r(7679);var $={components:{Icon:i.JO},mounted(){},setup(){const e=()=>window.localStorage.getItem("dark")?JSON.parse(window.localStorage.getItem("dark")):!!window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=e=>{window.localStorage.setItem("dark",e)};return{loading:!0,isDark:e(),toggleTheme(){this.isDark=!this.isDark,t(this.isDark)}}},data(){return{extended:!1}},computed:{nom(){return console.log(this.user),this.user.nom.toUpperCase()},user(){return this.$store.getters.getCurrentUser},prenom(){return this.user.prenom.toUpperCase().slice(0,1)+this.user.prenom.toLowerCase().slice(1)},profile(){return this.user.Profile.nom},iconProfile(){return this.user.Profile.icon},iconColor(){return this.user.Profile.couleur}},methods:{goto(e){this.$router.push(e)},hasPermission(e){return!!this.user.Profile.Autorisations.find((t=>t.nom==e))},logout(){console.log("logout"),this.$store.dispatch("logout"),this.$router.push("/login")}}};const F=(0,c.Z)($,[["render",j]]);var A=F,T=r(4226),D=r.n(T);(0,n.ri)(l).use(h.Z).use(y).use(C.Z).component("v-select",D()).component("NavBar",A).mount("#app")},8873:function(e,t,r){"use strict";var n=r(1006);function a(e){return n.Z.get("/user",{...e})}function o(e){return n.Z.get("/user/"+e)}function s(e){return n.Z.post("/user",e)}function i(e){return n.Z["delete"](`/user/${e}`)}function d(e){return n.Z.patch(`/user/${e.id}`,e)}function c(e,t){return!!e.Profile.Autorisations.find((e=>e.nom==t))}function u(){return n.Z.get("/user/count")}t["ZP"]={get:a,create:s,show:o,destroy:i,update:d,hasRight:c,getCount:u}},1006:function(e,t,r){"use strict";var n=r(6265),a=r.n(n),o=r(5692);const s="http://localhost:2931";a().defaults.port=2931,t["Z"]={post(e,t,{ContentType:r}={}){return a().post(`${s}${e}`,t,{headers:{Authorization:`Bearer ${o.Z.state.users.jwt||""}`,"Content-Type":r}})},get(e,t=null,r){return a().get(`${s}${e}`,{...r,headers:{Authorization:`Bearer ${o.Z.state.users.jwt||""}`},params:t})},delete(e){return a()["delete"](`${s}${e}`,{headers:{Authorization:`Bearer ${o.Z.state.users.jwt||""}`}})},patch(e,t){return a().patch(`${s}${e}`,t,{headers:{Authorization:`Bearer ${o.Z.state.users.jwt||""}`}})}}},5692:function(e,t,r){"use strict";r.d(t,{Z:function(){return he}});var n=r(9749),a=r(2415),o=r(1006),s={login(e){return o.Z.post("/login",{...e,type:"admin"})},checklogin(){return o.Z.get("/checklogin",{})},getAutorisation(e){return o.Z.get("/fonction",e)},getAutorisations(e){return o.Z.get("/autorisation",e)}},i=r(8873);const d=()=>({jwt:"",user:null,authenticated:!1,users:[],count:0}),c={state:d(),mutations:{login(e,{user:t,token:r}){e.jwt=r,e.user=t,e.authenticated=!0},logout(e){Object.assign(e,d()),console.log(e)},getUsers(e,t){e.users=t},refresh(e,{user:t}){e.user=t},setCount(e,t){e.count=t}},actions:{login(e,t){return s.login(t).then((t=>{e.commit("login",t.data)})).catch((t=>e.dispatch("add-error",t.response.data.message)))},getCountUser(e){return i.ZP.getCount().then((t=>e.commit("setCount",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},checkAuth(e){return s.checklogin(e.state.jwt).then((t=>{e.commit("refresh",t.data)})).catch((()=>{e.commit("logout")}))},logout(e){e.commit("logout")},getUsers(e,t){return i.ZP.get(t).then((t=>e.commit("getUsers",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},deleteUser(e,t){return i.ZP.destroy(t).then((()=>e.dispatch("getUsers",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},addUser(e,t){return i.ZP.create(t).then((()=>e.dispatch("getUsers"))).catch((t=>e.dispatch("add-error",t.response.data.message)))},updateUser(e,t){return i.ZP.update(t).then((()=>e.dispatch("getUsers"))).catch((t=>e.dispatch("add-error",t.response.data.message)))}},getters:{isAuth:e=>e.authenticated,getCurrentUser:e=>e.user,getUsers:e=>e.users,getJwt:e=>e.jwt,countUsers:e=>e.count}};var u=c;function l(e){return o.Z.get("/fonction",{...e})}function m(e){return o.Z.post("/fonction",e,{})}function h(e){return o.Z.post(`/fonction/${e.id}`,e,{})}function p(e){return o.Z["delete"](`/fonction/${e}`)}var g={get:l,create:m,update:h,destroy:p};const f=()=>({fonctions:[],autorisations:[]}),v={state:f(),mutations:{getFonctions(e,t){e.fonctions=t},getAutorisations(e,t){e.autorisations=t}},actions:{getFonctions(e,t){return g.get(t).then((t=>e.commit("getFonctions",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},getAutorisations(e,t){return s.getAutorisations(t).then((t=>e.commit("getAutorisations",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},deleteFonction(e,t){return g.destroy(t).then((()=>e.dispatch("getFonctions",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},addFonction(e,t){return g.create(t).then((()=>e.dispatch("getFonctions",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},updateFonction(e,t){return g.update(t).then((()=>e.dispatch("getFonctions",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))}},getters:{getFonctions:e=>e.fonctions,getAutorisations:e=>e.autorisations}};var w=v;function y(e){return o.Z.get("/produit",{...e})}function C(e){return o.Z.get("/couleur",{...e})}function b(e){return o.Z.get("/typeProduit",{...e})}function P(e){return o.Z.get("/produit/"+e)}function x(e){const t=new FormData;for(let r in e)t.append(r,e[r]);return o.Z.post("/produit",t,{ContentType:"multipart/form-data"})}function Z(e){return o.Z["delete"](`/produit/${e}`)}function k(e){const t=new FormData;for(let r in e)console.log({key:e[r]}),t.append(r,e[r]);return console.log(t.values()),o.Z.post(`/produit/${e.id}`,t,{ContentType:"multipart/form-data"})}function _(e){return o.Z.post(`/produit/${e.ProduitId}/formule`,e)}function j(e){return o.Z["delete"](`/produit/${e.ProduitId}/formule/${e.MatiereId}`)}var $={get:y,show:P,destroy:Z,update:k,create:x,getCouleurs:C,getTypes:b,addFormule:_,removeFormule:j};const F=()=>({produits:[],couleurs:[],type:[]}),A={state:F(),mutations:{getProduits(e,t){e.produits=t},getCouleurs(e,t){e.couleurs=t},getTypeproduits(e,t){e.type=t}},actions:{getCouleurs(e,t){return $.getCouleurs(t).then((t=>e.commit("getCouleurs",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},getProduits(e,t){return $.get(t).then((t=>(console.log("hey"),e.commit("getProduits",t.data)))).catch((t=>e.dispatch("add-error",t.response.data.message)))},getTypeproduits(e,t){return $.getTypes(t).then((t=>e.commit("getTypeproduits",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},deleteProduit(e,t){return $.destroy(t).then((()=>e.dispatch("getProduits",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},addProduit(e,t){return $.create(t).then((()=>e.dispatch("getProduits"))).catch((t=>e.dispatch("add-error",t.response.data.message)))},updateProduit(e,t){return $.update(t).then((()=>e.dispatch("getProduits"))).catch((t=>e.dispatch("add-error",t.response.data.message)))},addFormule(e,t){return $.addFormule(t).then((()=>e.dispatch("getProduits"))).catch((t=>e.dispatch("add-error",t.response.data.message)))},removeFormule(e,t){return $.removeFormule(t).then((()=>e.dispatch("getProduits"))).catch((t=>e.dispatch("add-error",t.response.data.message)))}},getters:{getProduits:e=>e.produits,getCouleurs:e=>e.couleurs,getTypeproduits:e=>e.type}};var T=A,D={create(e){return o.Z.post("/commande",e)},get(e){return o.Z.get("/commande",e)},show(e){return o.Z.get("/commande/"+e)},update(e){return o.Z.put("/commande/"+e.id,e)},destroy(e){return o.Z["delete"]("/commande/"+e)},addProduit(e,t){return o.Z.post("/commande/"+e+"/produit",t)},updateProduit(e,t){return o.Z.patch("/commande/"+e+"/produit/"+t.id,t)},downloadBonDeCommande(e){return o.Z.get("/commande/"+e+"/document",{},{ResponseType:"blob"})},deleteProduit(e,t){return o.Z["delete"]("/commande/"+e+"/produit/"+t)},validate(e){return o.Z.get(`/commande/${e}/validate`)},uploadBonDeCommande(e,t){return o.Z.post(`/commande/${e}/bon-de-commande`,t)},count(){return o.Z.get("/commande/count")}};const M=()=>({commandes:[],commande:{},count:{total:0,attente:0}}),U={state:M(),mutations:{getCommandes(e,t){e.commandes=t},showCommande(e,t){e.commande=t},setCountCommande(e,t){console.log(t),e.count=t}},actions:{getCommandes(e,t){return D.get(t).then((t=>e.commit("getCommandes",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},getCountCommande(e){return D.count().then((t=>e.commit("setCountCommande",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},showCommande(e,t){if("new"!=t)return D.show(t).then((t=>e.commit("showCommande",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)));console.log(e),e.commit("showCommande",{Client:{},Produits:[],User:e.getters.getCurrentUser,etat:"non Enregistré",montant:0,Payements:[]})},downloadBonDeCommande(e,t){return D.downloadBonDeCommande(t).then((e=>e)).catch((t=>e.dispatch("add-error",t.response.data.message)))},uploadBonDeCommande(e,{id:t,formData:r}){return D.uploadBonDeCommande(t,r).then((()=>e.dispatch("showCommande",t)))},deleteCommande(e,t){return D.destroy(t).then((()=>e.dispatch("getCommandes",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},setCommande(e,t){return e.commit("showCommande",t)},addCommande(e,t){return D.create(t).then((({data:t})=>(console.log(t),e.commit("showCommande",t)))).catch((t=>e.dispatch("add-error",t.response.data.message)))},updateCommande(e,t){return D.update(t).then((t=>e.commit("showCommande",t))).catch((t=>e.dispatch("add-error",t.response.data.message)))},"commande/addProducts"(e,{commandeId:t,product:r}){return D.addProduit(t,r).then((()=>e.dispatch("showCommande",t))).catch((t=>e.dispatch("add-error",t.response.data.message)))},"commande/updateProduit"(e,{commandeId:t,product:r}){return D.updateProduit(t,r).then((()=>e.dispatch("showCommande",t))).catch((t=>e.dispatch("add-error",t.response.data.message)))},"commande/deleteProduit"(e,{commandeId:t,productId:r}){return D.deleteProduit(t,r).then((()=>e.dispatch("showCommande",t))).catch((t=>e.dispatch("add-error",t.response.data.message)))},"commande/validate"(e,{idCommande:t,next:r}){return D.validate(t).then((()=>(e.dispatch("getCommandes"),e.dispatch("getVentes"),r.go(-1)))).catch((t=>e.dispatch("add-error",t.response.data.message)))}},getters:{getCommandes:e=>e.commandes,getCommande:e=>e.commande,countCommande:e=>e.count}};var V=U,S={create(e){return o.Z.post("/client",e)},get(e){return o.Z.get("/client",e)},show(e){return o.Z.get("/client/"+e)},update(e){return o.Z.patch("/client/"+e.id,e)},destroy(e){return o.Z["delete"]("/client/"+e)},getTypeClient(){return o.Z.get("/typeClient")},getFeedbacks(e){return o.Z.get("/feedback",e)},updateFeedback(e){return o.Z.post("/feedback/"+e.id)},count(){return o.Z.get("/client/count")}};const O=()=>({clients:[],client:{},typeClient:[],feedbacks:[],count:0}),I={state:O(),mutations:{getClients(e,t){e.clients=t},showClient(e,t){e.client=t},getTypeClients(e,t){e.typeClient=t},getFeedbacks(e,t){e.feedbacks=t},setCountClient(e,t){console.log(t),e.count=t}},actions:{getClients(e,t){return S.get(t).then((t=>e.commit("getClients",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},getCountClient(e){return S.count().then((t=>e.commit("setCountClient",t.data.count))).catch((t=>e.dispatch("add-error",t.response.data.message)))},showClient(e,t){return S.show(t).then((t=>e.commit("showClient",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},deleteClient(e,t){return S.destroy(t).then((()=>e.dispatch("getCommandes",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},addClient(e,t){return S.create(t).then((t=>(e.dispatch("getClients",{}),t))).catch((t=>e.dispatch("add-error",t.response.data.message)))},updateClient(e,t){return S.update(t).then((()=>e.dispatch("getClients",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},getTypeClients(e){return S.getTypeClient().then((t=>e.commit("getTypeClients",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},getFeedbacks(e,t){return S.getFeedbacks(t).then((t=>e.commit("getFeedbacks",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},validerFeedback(e,t){return S.updateFeedback(t).then((()=>e.dispatch("getFeedbacks"))).catch((t=>e.dispatch("add-error",t.response.data.message)))}},getters:{getClients:e=>e.clients,getClient:e=>e.client,getTypeClients:e=>e.typeClient,getFeedbacks:e=>e.feedbacks,countClient:e=>e.count}};var E=I,q={create(e){return o.Z.post("/vente",e)},get(e){return o.Z.get("/vente",e)},show(e){return o.Z.get("/vente/"+e)},update(e){return o.Z.post("/vente/"+e.id,e)},destroy(e){return o.Z["delete"]("/vente/"+e)},downloadFacture(e){return o.Z.get("/vente/"+e+"/facture",{},{responseType:"arraybuffer",reponseEncoding:"binary"})},addProduit(e,t){return o.Z.post("/vente/"+e+"/produit",t.map((e=>({id:e.id,quantite:e.produits_vente.quantite,prix:e.produits_vente.prix}))))},getCount(){return o.Z.get("/vente/count")}};const B=()=>({ventes:[],vente:{},count:0}),N={state:B(),mutations:{getVentes(e,t){e.ventes=t},showVente(e,t){e.vente=t},setCountVentes(e,t){e.count=t}},actions:{getVentes(e,t){return q.get(t).then((t=>e.commit("getVentes",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},getCountVentes(e){return q.getCount().then((t=>e.commit("setCountVentes",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},showVente(e,t){return q.show(t).then((t=>e.commit("showVente",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},downloadFacture(e,t){return q.downloadFacture(t).then((e=>e)).catch((t=>e.dispatch("add-error",t.response.data.message)))},deleteVente(e,t){return q.destroy(t).then((()=>e.dispatch("getVentes",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},addVente(e,t){return q.create(t).then((()=>e.dispatch("getVentes",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},updateVente(e,t){return q.update(t).then((()=>e.dispatch("getVentes",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},"vente/addProducts"(e,{commandeId:t,products:r}){return q.addProduit(t,r).then((()=>e.dispatch("getVentes",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))}},getters:{getVentes:e=>e.ventes,getVente:e=>e.vente,countVentes:e=>e.count}};var R=N;function L(e){return o.Z.get("/matiere",{...e})}function W(e){return o.Z.get("/matiere/"+e)}function z(e){return o.Z.post("/matiere",e)}function H(e){return o.Z["delete"](`/matiere/${e}`)}function J(e){return o.Z.patch(`/matiere/${e.id}`,e)}function Y(e){return o.Z.post("/matiere/arrivage",e)}var K={get:L,show:W,destroy:H,update:J,create:z,arrivage:Y};const X=()=>({matieres:[]}),G={state:X(),mutations:{getMatieres(e,t){console.log(t),e.matieres=t}},actions:{getMatieres(e,t){return console.log(t),K.get(t).then((t=>(console.log(t),e.commit("getMatieres",t.data)))).catch((t=>e.dispatch("add-error",t.response.data.message)))},updateMatiere(e,t){return K.update(t).then((()=>e.dispatch("getMatieres",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},deleteMatiere(e,t){return K.destroy(t).then((()=>e.dispatch("getMatieres",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},addMatiere(e,t){return K.create(t).then((()=>e.dispatch("getMatieres",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},arrivageMatieres(e,t){return K.arrivage(t).then((()=>e.dispatch("getMatieres",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))}},getters:{getMatieres:e=>e.matieres}};var Q=G;function ee(e){return o.Z.get("/production",{...e})}function te(e){return o.Z.get("/production/"+e)}function re(e){return o.Z.post("/production",e)}function ne(e){return o.Z["delete"](`/production/${e}`)}function ae(e){return o.Z.patch(`/production/${e.id}`,e)}var oe={get:ee,show:te,destroy:ne,update:ae,create:re};const se=()=>({productions:[]}),ie={state:se(),mutations:{getProductions(e,t){e.productions=t}},actions:{getProductions(e,t){return oe.get(t).then((t=>e.commit("getProductions",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},deleteProduction(e,t){return oe.destroy(t).then((()=>e.dispatch("getCommandes",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},addProduction(e,t){return oe.create(t).then((()=>e.dispatch("getCommandes",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},updateProduction(e,t){return oe.update(t).then((()=>e.dispatch("getCommandes",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},getTypeProductions(e){return oe.getTypeProduction().then((t=>e.commit("getTypeProductions",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))}},getters:{getProductions:e=>e.productions}};var de=ie,ce={create(e){return o.Z.post("/payement",e)},get(e){return o.Z.get("/payement",e)},show(e){return o.Z.get("/payement/"+e)},update(e){return o.Z.put("/payement/"+e.id,e)},destroy(e){return o.Z["delete"]("/payement/"+e)},addProduit(e,t){return o.Z.post("/payement/"+e+"/produit",t)},updateProduit(e,t){return o.Z.patch("/paiement/"+e+"/produit/"+t.id,t)},downloadBonDeCommande(e){return o.Z.get("/paiement/"+e+"/document",{},{ResponseType:"blob"})},deleteProduit(e,t){return o.Z["delete"]("/paiement/"+e+"/produit/"+t)},validate(e){return o.Z.get(`/paiement/${e}/validate`)},uploadBonDeCommande(e,t){return o.Z.post(`/paiement/${e}/bon-de-paiement`,t)}};const ue=()=>({paiements:[],paiement:{}}),le={state:ue(),mutations:{setPaiements(e,t){console.log(t),e.paiements=t},setPaiement(e,t){console.log(t),e.paiement=t}},actions:{getPaiements(e,t){return console.log(t),ce.get(t).then((t=>(console.log(t),e.commit("setPaiements",t.data)))).catch((t=>e.dispatch("add-error",t.response.data.message)))},showPaiement(e,t){return ce.show(t).then((t=>e.commit("setPaiement",t.data))).catch((t=>e.dispatch("add-error",t.response.data.message)))},updatePaiement(e,t){return ce.update(t).then((()=>e.dispatch("getPaiements",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},deletePaiement(e,t){return ce.destroy(t).then((()=>e.dispatch("getPaiements",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},addPaiement(e,t){return ce.create(t).then((()=>e.dispatch("getPaiements",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))},arrivagePaiements(e,t){return ce.arrivage(t).then((()=>e.dispatch("getPaiements",{}))).catch((t=>e.dispatch("add-error",t.response.data.message)))}},getters:{getPaiements:e=>e.paiements,getPaiement:e=>e.paiement}};var me=le,he=(0,n.MT)({plugins:[(0,a.Z)({paths:["users.jwt","users.authenticated","users.user"]})],modules:{users:u,fonctions:w,produits:T,commandes:V,clients:E,vente:R,matiere:Q,production:de,paiement:me}})},2513:function(e,t,r){var n={"./Home.vue":[9837,797,361],"./Messagerie.vue":[2864,864],"./Parametres.vue":[2731,731],"./client/Client.vue":[78,770,806,761,996],"./client/ClientShow.vue":[4300,770,797,300],"./client/ContactClient.vue":[9162,770,806,162],"./commandes/CommandeShow.vue":[7023,770,437],"./commandes/Commandes.vue":[4232,770,806,232],"./paiement/PaiementShow.vue":[4493,770,981],"./paiement/index.vue":[4840,770,806,797,840],"./produits/MatierePremiere.vue":[2418,770,806,418],"./produits/ProductionShow.vue":[5091,91],"./produits/Productions.vue":[4947,770,806,947],"./produits/Produits.vue":[4554,770,806,761,55],"./user/Fonction.vue":[2830,770,806,830],"./user/Login.vue":[4933,933],"./user/NewUser.vue":[8542,542],"./user/Profile.vue":[4314,314],"./user/UsersIndex.vue":[1639,770,806,761,928],"./vente/VenteShow.vue":[6837,770,797,837],"./vente/Ventes.vue":[6203,770,806,203]};function a(e){if(!r.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],a=t[0];return Promise.all(t.slice(1).map(r.e)).then((function(){return r(a)}))}a.keys=function(){return Object.keys(n)},a.id=2513,e.exports=a}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}r.m=e,function(){var e=[];r.O=function(t,n,a,o){if(!n){var s=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],o=e[u][2];for(var i=!0,d=0;d<n.length;d++)(!1&o||s>=o)&&Object.keys(r.O).every((function(e){return r.O[e](n[d])}))?n.splice(d--,1):(i=!1,o<s&&(s=o));if(i){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,a,o]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){r.f={},r.e=function(e){return Promise.all(Object.keys(r.f).reduce((function(t,n){return r.f[n](e,t),t}),[]))}}(),function(){r.u=function(e){return"js/"+e+"."+{55:"5c7f2dcf",91:"9e7d7e74",162:"fd023e00",203:"1e91b010",232:"7680c33c",300:"62c3ac51",314:"4b24945f",361:"0a73c510",418:"90fb7ee1",437:"bd3ce7ac",542:"cfa46db2",731:"54670df1",761:"b1f21ba0",770:"0d129933",797:"b0a9ec31",806:"f3bda589",830:"1333c167",837:"48356b35",840:"54fc68bd",864:"4b88bfef",928:"aa9ddd98",933:"7fd4c5a8",947:"c2e90051",981:"7c0b4ced",996:"f83123a8"}[e]+".js"}}(),function(){r.miniCssF=function(e){return"css/"+e+"."+{55:"0a9f4d40",162:"8baf85f5",203:"e4c5a329",232:"e4c5a329",418:"6dc5389e",437:"80894d0b",542:"2b95b40d",830:"9d377f24",837:"724cb860",840:"e4c5a329",928:"62c94e70",947:"d474d1bc",981:"724cb860",996:"276af15c"}[e]+".css"}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="vost-app:";r.l=function(n,a,o,s){if(e[n])e[n].push(a);else{var i,d;if(void 0!==o)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var l=c[u];if(l.getAttribute("src")==n||l.getAttribute("data-webpack")==t+o){i=l;break}}i||(d=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,r.nc&&i.setAttribute("nonce",r.nc),i.setAttribute("data-webpack",t+o),i.src=n),e[n]=[a];var m=function(t,r){i.onerror=i.onload=null,clearTimeout(h);var a=e[n];if(delete e[n],i.parentNode&&i.parentNode.removeChild(i),a&&a.forEach((function(e){return e(r)})),t)return t(r)},h=setTimeout(m.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=m.bind(null,i.onerror),i.onload=m.bind(null,i.onload),d&&document.head.appendChild(i)}}}(),function(){r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){r.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){r.p="/"}(),function(){var e=function(e,t,r,n){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var o=function(o){if(a.onerror=a.onload=null,"load"===o.type)r();else{var s=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.href||t,d=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");d.code="CSS_CHUNK_LOAD_FAILED",d.type=s,d.request=i,a.parentNode.removeChild(a),n(d)}};return a.onerror=a.onload=o,a.href=t,document.head.appendChild(a),a},t=function(e,t){for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var a=r[n],o=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===e||o===t))return a}var s=document.getElementsByTagName("style");for(n=0;n<s.length;n++){a=s[n],o=a.getAttribute("data-href");if(o===e||o===t)return a}},n=function(n){return new Promise((function(a,o){var s=r.miniCssF(n),i=r.p+s;if(t(s,i))return a();e(n,i,a,o)}))},a={143:0};r.f.miniCss=function(e,t){var r={55:1,162:1,203:1,232:1,418:1,437:1,542:1,830:1,837:1,840:1,928:1,947:1,981:1,996:1};a[e]?t.push(a[e]):0!==a[e]&&r[e]&&t.push(a[e]=n(e).then((function(){a[e]=0}),(function(t){throw delete a[e],t})))}}(),function(){var e={143:0};r.f.j=function(t,n){var a=r.o(e,t)?e[t]:void 0;if(0!==a)if(a)n.push(a[2]);else{var o=new Promise((function(r,n){a=e[t]=[r,n]}));n.push(a[2]=o);var s=r.p+r.u(t),i=new Error,d=function(n){if(r.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var o=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;i.message="Loading chunk "+t+" failed.\n("+o+": "+s+")",i.name="ChunkLoadError",i.type=o,i.request=s,a[1](i)}};r.l(s,d,"chunk-"+t,t)}},r.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,o,s=n[0],i=n[1],d=n[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(a in i)r.o(i,a)&&(r.m[a]=i[a]);if(d)var u=d(r)}for(t&&t(n);c<s.length;c++)o=s[c],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(u)},n=self["webpackChunkvost_app"]=self["webpackChunkvost_app"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=r.O(void 0,[998],(function(){return r(3286)}));n=r.O(n)})();
//# sourceMappingURL=app.b1e26594.js.map