(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();class T{constructor({id:e,username:a,email:t,password:s,role:r="user",createdAt:n=null}){this.id=e||T.nextId(),this.username=a,this.email=t,this.password=s,this.role=r,this.createdAt=n||new Date().toISOString()}static nextId(){const e=localStorage.getItem("sgt_lastUserId")||"0",a=parseInt(e,10)+1;return localStorage.setItem("sgt_lastUserId",String(a)),String(a)}isAdmin(){return this.role==="admin"}}class S{constructor({id:e,title:a,description:t="",priority:s="medium",category:r="general",dueDate:n=null,status:d="pending",userId:l,tags:g=[],subtasks:u=[],reminder:y=null,createdAt:p=null,updatedAt:L=null}){this.id=e||S.nextId(),this.title=a,this.description=t,this.priority=s,this.category=r,this.dueDate=n,this.status=d,this.userId=l,this.tags=g,this.subtasks=u,this.reminder=y,this.createdAt=p||new Date().toISOString(),this.updatedAt=L||new Date().toISOString()}static nextId(){const e=localStorage.getItem("sgt_lastTaskId")||"0",a=parseInt(e,10)+1;return localStorage.setItem("sgt_lastTaskId",String(a)),String(a)}toggleSubtask(e){this.subtasks[e]&&(this.subtasks[e].completed=!this.subtasks[e].completed,this.updatedAt=new Date().toISOString())}getCompletionPercentage(){if(!this.subtasks.length)return this.status==="completed"?100:0;const e=this.subtasks.filter(a=>a.completed).length;return Math.round(e/this.subtasks.length*100)}}class k{constructor({id:e,name:a,color:t="#4361ee",userId:s,createdAt:r=null}){this.id=e||k.nextId(),this.name=a,this.color=t,this.userId=s,this.createdAt=r||new Date().toISOString()}static nextId(){const e=localStorage.getItem("sgt_lastCategoryId")||"0",a=parseInt(e,10)+1;return localStorage.setItem("sgt_lastCategoryId",String(a)),String(a)}}class C{constructor({id:e,name:a,color:t="#4361ee",userId:s,createdAt:r=null}){this.id=e||C.nextId(),this.name=a,this.color=t,this.userId=s,this.createdAt=r||new Date().toISOString()}static nextId(){const e=localStorage.getItem("sgt_lastTagId")||"0",a=parseInt(e,10)+1;return localStorage.setItem("sgt_lastTagId",String(a)),String(a)}}class x{constructor({id:e,title:a,message:t,type:s="info",read:r=!1,userId:n,taskId:d=null,createdAt:l=null}){this.id=e||x.nextId(),this.title=a,this.message=t,this.type=s,this.read=r,this.userId=n,this.taskId=d,this.createdAt=l||new Date().toISOString()}static nextId(){const e=localStorage.getItem("sgt_lastNotificationId")||"0",a=parseInt(e,10)+1;return localStorage.setItem("sgt_lastNotificationId",String(a)),String(a)}}class E{constructor({userId:e,theme:a="light",primaryColor:t="#4361ee",secondaryColor:s="#64748b",cardBg:r="#ffffff",textColor:n="#1e293b",borderColor:d="#e2e8f0",appBg:l="#f8fafc",accentColor:g="#4cc9f0"}){this.userId=e,this.theme=a,this.primaryColor=t,this.secondaryColor=s,this.cardBg=r,this.textColor=n,this.borderColor=d,this.appBg=l,this.accentColor=g}}const i={USERS_KEY:"sgt_users_v2",TASKS_KEY:"sgt_tasks_v2",CATEGORIES_KEY:"sgt_categories_v2",TAGS_KEY:"sgt_tags_v2",NOTIFICATIONS_KEY:"sgt_notifications_v1",COLOR_SETTINGS_KEY:"sgt_color_settings_v2",SESSION_KEY:"sgt_session_v2",APP_SETTINGS_KEY:"sgt_app_settings_v1",loadUsers(){const o=localStorage.getItem(this.USERS_KEY);return o?JSON.parse(o).map(e=>new T(e)):[]},saveUsers(o){localStorage.setItem(this.USERS_KEY,JSON.stringify(o))},loadTasks(){const o=localStorage.getItem(this.TASKS_KEY);return o?JSON.parse(o).map(e=>new S(e)):[]},saveTasks(o){localStorage.setItem(this.TASKS_KEY,JSON.stringify(o))},loadCategories(){const o=localStorage.getItem(this.CATEGORIES_KEY);return o?JSON.parse(o).map(e=>new k(e)):[]},saveCategories(o){localStorage.setItem(this.CATEGORIES_KEY,JSON.stringify(o))},loadTags(){const o=localStorage.getItem(this.TAGS_KEY);return o?JSON.parse(o).map(e=>new C(e)):[]},saveTags(o){localStorage.setItem(this.TAGS_KEY,JSON.stringify(o))},loadNotifications(){const o=localStorage.getItem(this.NOTIFICATIONS_KEY);return o?JSON.parse(o).map(e=>new x(e)):[]},saveNotifications(o){localStorage.setItem(this.NOTIFICATIONS_KEY,JSON.stringify(o))},loadColorSettings(){const o=localStorage.getItem(this.COLOR_SETTINGS_KEY);return o?JSON.parse(o):{}},saveColorSettings(o){localStorage.setItem(this.COLOR_SETTINGS_KEY,JSON.stringify(o))},loadAppSettings(){const o=localStorage.getItem(this.APP_SETTINGS_KEY);return o?JSON.parse(o):{notificationsEnabled:!0,reminderTime:"09:00"}},saveAppSettings(o){localStorage.setItem(this.APP_SETTINGS_KEY,JSON.stringify(o))},getSession(){const o=localStorage.getItem(this.SESSION_KEY);return o?JSON.parse(o):null},setSession(o){localStorage.setItem(this.SESSION_KEY,JSON.stringify(o))},clearSession(){localStorage.removeItem(this.SESSION_KEY)},initDefaultAdmin(){const o=this.loadUsers();if(o.length===0){const e=new T({username:"admin",email:"admin@taskflow.com",password:"admin",role:"admin"});o.push(e),this.saveUsers(o)}}};i.initDefaultAdmin();const I={register(o){const e=i.loadUsers();if(e.find(r=>r.username===o.username))throw new Error("El nombre de usuario ya existe");if(e.find(r=>r.email===o.email))throw new Error("El correo electrónico ya está registrado");const a=new T(o);e.push(a),i.saveUsers(e);const t=[{name:"Personal",color:"#4361ee",userId:a.id},{name:"Trabajo",color:"#f72585",userId:a.id},{name:"Estudio",color:"#4cc9f0",userId:a.id},{name:"Hogar",color:"#f8961e",userId:a.id}],s=i.loadCategories();return t.forEach(r=>s.push(new k(r))),i.saveCategories(s),{id:a.id,username:a.username,email:a.email,role:a.role,createdAt:a.createdAt}},login(o,e){const t=i.loadUsers().find(n=>n.username===o);if(!t)throw new Error("Usuario no encontrado");if(t.password!==e)throw new Error("Contraseña incorrecta");const{password:s,...r}=t;return i.setSession(r),r},logout(){i.clearSession()},getCurrentUser(){return i.getSession()},updateProfile(o,e){const a=i.loadUsers(),t=a.findIndex(n=>n.id===o);if(t===-1)throw new Error("Usuario no encontrado");Object.assign(a[t],e),i.saveUsers(a);const{password:s,...r}=a[t];return i.setSession(r),r}},f={getAll(o){return i.loadTasks().filter(a=>a.userId===o)},create(o,e){const a=i.loadTasks(),t=new S({...o,userId:e});return a.unshift(t),i.saveTasks(a),t.dueDate&&h.create({title:"Nueva tarea creada",message:`"${t.title}" se ha creado con fecha límite ${new Date(t.dueDate).toLocaleDateString()}`,type:"info",userId:e,taskId:t.id}),t},update(o,e,a){const t=i.loadTasks(),s=t.findIndex(n=>n.id===o&&n.userId===a);if(s===-1)throw new Error("Tarea no encontrada");const r={...t[s]};if(Object.assign(t[s],e),t[s].updatedAt=new Date().toISOString(),i.saveTasks(t),e.status&&e.status!==r.status){const n=e.status==="completed"?"completada":"pendiente";h.create({title:"Tarea actualizada",message:`"${t[s].title}" ha sido marcada como ${n}`,type:e.status==="completed"?"success":"info",userId:a,taskId:t[s].id})}return t[s]},delete(o,e){let a=i.loadTasks();const t=a.find(s=>s.id===o&&s.userId===e);a=a.filter(s=>!(s.id===o&&s.userId===e)),i.saveTasks(a),t&&h.create({title:"Tarea eliminada",message:`"${t.title}" ha sido eliminada`,type:"warning",userId:e})},clearAll(o){let e=i.loadTasks();e=e.filter(a=>a.userId!==o),i.saveTasks(e),h.create({title:"Todas las tareas eliminadas",message:"Se han eliminado todas las tareas",type:"warning",userId:o})},toggleSubtask(o,e,a){const t=i.loadTasks(),s=t.findIndex(r=>r.id===o&&r.userId===a);if(s===-1)throw new Error("Tarea no encontrada");return t[s].toggleSubtask(e),i.saveTasks(t),t[s]},getStats(o){const e=this.getAll(o),a=e.length,t=e.filter(d=>d.status==="completed").length,s=e.filter(d=>d.status==="pending").length,r=new Date().toISOString().split("T")[0],n=e.filter(d=>d.dueDate===r).length;return{total:a,completed:t,pending:s,dueToday:n}}},b={getAll(o){return i.loadCategories().filter(a=>a.userId===o)},create(o,e){const a=i.loadCategories(),t=new k({...o,userId:e});return a.push(t),i.saveCategories(a),t},update(o,e,a){const t=i.loadCategories(),s=t.findIndex(r=>r.id===o&&r.userId===a);if(s===-1)throw new Error("Categoría no encontrada");return Object.assign(t[s],e),i.saveCategories(t),t[s]},delete(o,e){let a=i.loadCategories();a=a.filter(s=>!(s.id===o&&s.userId===e)),i.saveCategories(a);const t=i.loadTasks();t.forEach(s=>{s.category===o&&s.userId===e&&(s.category="general")}),i.saveTasks(t)},getWithCount(o){const e=this.getAll(o),a=f.getAll(o);return e.map(t=>({...t,count:a.filter(s=>s.category===t.id).length}))}},w={getAll(o){return i.loadTags().filter(a=>a.userId===o)},create(o,e){const a=i.loadTags();if(a.find(r=>r.name.toLowerCase()===o.name.toLowerCase()&&r.userId===e))throw new Error("Ya existe una etiqueta con este nombre");const s=new C({...o,userId:e});return a.push(s),i.saveTags(a),s},update(o,e,a){const t=i.loadTags(),s=t.findIndex(r=>r.id===o&&r.userId===a);if(s===-1)throw new Error("Etiqueta no encontrada");return Object.assign(t[s],e),i.saveTags(t),t[s]},delete(o,e){let a=i.loadTags();a=a.filter(s=>!(s.id===o&&s.userId===e)),i.saveTags(a);const t=i.loadTasks();t.forEach(s=>{s.tags&&s.tags.includes(o)&&s.userId===e&&(s.tags=s.tags.filter(r=>r!==o))}),i.saveTasks(t)}},h={getAll(o){return i.loadNotifications().filter(a=>a.userId===o)},create(o){const e=i.loadNotifications(),a=new x(o);return e.unshift(a),i.saveNotifications(e),window.app&&window.app.currentUser&&o.userId===window.app.currentUser.id&&setTimeout(()=>{window.app&&window.app.updateNotificationBadge&&window.app.updateNotificationBadge()},100),a},markAsRead(o,e){const a=i.loadNotifications(),t=a.findIndex(s=>s.id===o&&s.userId===e);t!==-1&&(a[t].read=!0,i.saveNotifications(a))},markAllAsRead(o){const e=i.loadNotifications();e.forEach(a=>{a.userId===o&&!a.read&&(a.read=!0)}),i.saveNotifications(e)},delete(o,e){let a=i.loadNotifications();a=a.filter(t=>!(t.id===o&&t.userId===e)),i.saveNotifications(a)},getUnreadCount(o){return this.getAll(o).filter(a=>!a.read).length},checkDueTasks(o){const e=f.getAll(o),a=new Date().toISOString().split("T")[0],t=new Date(Date.now()+864e5).toISOString().split("T")[0];e.filter(n=>n.dueDate===a&&n.status==="pending").forEach(n=>{this.create({title:"Tarea vence hoy",message:`"${n.title}" vence hoy`,type:"warning",userId:o,taskId:n.id})}),e.filter(n=>n.dueDate===t&&n.status==="pending").forEach(n=>{this.create({title:"Tarea vence mañana",message:`"${n.title}" vence mañana`,type:"info",userId:o,taskId:n.id})})}},v={getSettings(o){return i.loadColorSettings()[o]||new E({userId:o})},saveSettings(o,e){const a=i.loadColorSettings();a[o]=e,i.saveColorSettings(a)},applyTheme(o){const e=document.documentElement;e.style.setProperty("--primary-color",o.primaryColor),e.style.setProperty("--secondary-color",o.secondaryColor),e.style.setProperty("--card-bg",o.cardBg),e.style.setProperty("--bg-color",o.appBg),e.style.setProperty("--text-primary",o.textColor),e.style.setProperty("--border-color",o.borderColor),document.documentElement.setAttribute("data-theme",o.theme);const a=document.querySelector('meta[name="theme-color"]');a&&a.setAttribute("content",o.primaryColor)},getPreset(o){const e={default:new E({userId:""}),dark:new E({userId:"",theme:"dark",primaryColor:"#60a5fa",secondaryColor:"#94a3b8",cardBg:"#1e293b",textColor:"#f1f5f9",borderColor:"#334155",appBg:"#0f172a",accentColor:"#38bdf8"}),warm:new E({userId:"",primaryColor:"#ea580c",secondaryColor:"#9a3412",cardBg:"#fef7ed",textColor:"#431407",borderColor:"#fdba74",appBg:"#fffbeb",accentColor:"#f97316"}),cool:new E({userId:"",primaryColor:"#0ea5e9",secondaryColor:"#0369a1",cardBg:"#f0f9ff",textColor:"#0c4a6e",borderColor:"#7dd3fc",appBg:"#f0fdfa",accentColor:"#22d3ee"}),professional:new E({userId:"",primaryColor:"#2563eb",secondaryColor:"#475569",cardBg:"#ffffff",textColor:"#1e293b",borderColor:"#e2e8f0",appBg:"#f8fafc",accentColor:"#3b82f6"})};return e[o]||e.default}},B={getSettings(){return i.loadAppSettings()},saveSettings(o){i.saveAppSettings(o)},updateSettings(o){const e=this.getSettings();return Object.assign(e,o),this.saveSettings(e),e}},c={async register(o){try{return{success:!0,user:I.register(o)}}catch(e){return{success:!1,error:e.message}}},async login(o,e){try{return{success:!0,user:I.login(o,e)}}catch(a){return{success:!1,error:a.message}}},logout(){return I.logout(),Promise.resolve()},getCurrentUser(){return Promise.resolve(I.getCurrentUser())},async fetchTasks(o={},e){let a=f.getAll(e);if(o.status&&o.status!=="all"&&(a=a.filter(t=>t.status===o.status)),o.priority&&o.priority!=="all"&&(a=a.filter(t=>t.priority===o.priority)),o.category&&o.category!=="all"&&(a=a.filter(t=>t.category===o.category)),o.tag&&o.tag!=="all"&&(a=a.filter(t=>t.tags&&t.tags.includes(o.tag))),o.dueDate&&(a=a.filter(t=>t.dueDate===o.dueDate)),o.search){const t=o.search.toLowerCase();a=a.filter(s=>s.title.toLowerCase().includes(t)||s.description&&s.description.toLowerCase().includes(t))}if(o.sortBy==="dueDate")a.sort((t,s)=>new Date(t.dueDate||"9999-12-31")-new Date(s.dueDate||"9999-12-31"));else if(o.sortBy==="priority"){const t={high:0,medium:1,low:2};a.sort((s,r)=>t[s.priority]-t[r.priority])}else a.sort((t,s)=>new Date(s.createdAt)-new Date(t.createdAt));return a},createTask(o,e){return Promise.resolve(f.create(o,e))},updateTask(o,e,a){return Promise.resolve(f.update(o,e,a))},deleteTask(o,e){return Promise.resolve(f.delete(o,e))},clearAllTasks(o){return f.clearAll(o),Promise.resolve()},toggleSubtask(o,e,a){return Promise.resolve(f.toggleSubtask(o,e,a))},getTaskStats(o){return Promise.resolve(f.getStats(o))},fetchCategories(o){return Promise.resolve(b.getAll(o))},fetchCategoriesWithCount(o){return Promise.resolve(b.getWithCount(o))},createCategory(o,e){return Promise.resolve(b.create(o,e))},updateCategory(o,e,a){return Promise.resolve(b.update(o,e,a))},deleteCategory(o,e){return Promise.resolve(b.delete(o,e))},fetchTags(o){return Promise.resolve(w.getAll(o))},createTag(o,e){return Promise.resolve(w.create(o,e))},updateTag(o,e,a){return Promise.resolve(w.update(o,e,a))},deleteTag(o,e){return Promise.resolve(w.delete(o,e))},fetchNotifications(o){return Promise.resolve(h.getAll(o))},markNotificationAsRead(o,e){return Promise.resolve(h.markAsRead(o,e))},markAllNotificationsAsRead(o){return Promise.resolve(h.markAllAsRead(o))},deleteNotification(o,e){return Promise.resolve(h.delete(o,e))},getUnreadNotificationCount(o){return Promise.resolve(h.getUnreadCount(o))},getColorSettings(o){return Promise.resolve(v.getSettings(o))},saveColorSettings(o,e){return v.saveSettings(o,e),v.applyTheme(e),Promise.resolve()},getAppSettings(){return Promise.resolve(B.getSettings())},saveAppSettings(o){return Promise.resolve(B.saveSettings(o))},exportTasks(o="json",e){const a=f.getAll(e),t=b.getAll(e),s=w.getAll(e),r={tasks:a,categories:t,tags:s,exportedAt:new Date().toISOString(),version:"2.0",app:"TaskFlow Pro"};if(o==="json"){const n=new Blob([JSON.stringify(r,null,2)],{type:"application/json"});return Promise.resolve(URL.createObjectURL(n))}else if(o==="csv"){const l=[["ID","Título","Descripción","Prioridad","Categoría","Estado","Fecha Límite","Etiquetas","Creado","Actualizado"].join(","),...a.map(u=>[u.id,`"${u.title.replace(/"/g,'""')}"`,`"${(u.description||"").replace(/"/g,'""')}"`,u.priority,u.category,u.status,u.dueDate||"",u.tags?`"${u.tags.join(";")}"`:"",u.createdAt,u.updatedAt].join(","))].join(`
`),g=new Blob([l],{type:"text/csv;charset=utf-8;"});return Promise.resolve(URL.createObjectURL(g))}}};class D{static show(e,a,t="info",s=3e3){const r=document.getElementById("toastContainer");if(!r)return;const n=document.createElement("div");n.className=`toast ${t}`;const d={success:"fas fa-check-circle",error:"fas fa-exclamation-circle",warning:"fas fa-exclamation-triangle",info:"fas fa-info-circle"}[t]||"fas fa-info-circle";n.innerHTML=`
      <i class="${d}"></i>
      <div class="toast-content">
        <div class="toast-title">${e}</div>
        <div class="toast-message">${a}</div>
      </div>
      <button class="toast-close">
        <i class="fas fa-times"></i>
      </button>
    `,r.appendChild(n);const l=()=>{n.style.opacity="0",n.style.transform="translateY(100%)",setTimeout(()=>{n.parentElement&&n.remove()},300)};return n.querySelector(".toast-close").addEventListener("click",l),s>0&&setTimeout(l,s),n}}class m{static show(){const e=document.getElementById("loadingSpinner");e&&(e.style.opacity="0",e.classList.remove("hidden"),setTimeout(()=>e.style.opacity="1",10))}static hide(){const e=document.getElementById("loadingSpinner");e&&(e.style.opacity="0",setTimeout(()=>e.classList.add("hidden"),300))}}class N{constructor(){this.currentUser=null,this.categories=[],this.tags=[],this.notifications=[],this.currentTaskTags=[],this.currentTaskSubtasks=[],this.colorSettings=null,this.appSettings=null,this.viewMode="grid",this.init()}async init(){m.show(),await this.checkAuth(),await this.loadAppSettings(),this.setupEventListeners(),this.setupKeyboardShortcuts(),this.createQuickActions(),this.loadViewPreferences(),this.currentUser&&h.checkDueTasks(this.currentUser.id),m.hide()}async loadViewPreferences(){const e=JSON.parse(localStorage.getItem("taskflow_view_prefs")||"{}");this.viewMode=e.viewMode||"grid",this.setViewMode(this.viewMode)}setupKeyboardShortcuts(){document.addEventListener("keydown",e=>{e.ctrlKey&&e.key==="n"&&(e.preventDefault(),this.openNewTask()),e.ctrlKey&&e.key==="f"&&(e.preventDefault(),document.getElementById("search")?.focus()),e.key==="Escape"&&(this.hideModal(),this.closeTaskDetail()),e.altKey&&e.key==="n"&&(e.preventDefault(),this.toggleNotifications())})}createQuickActions(){const e=document.createElement("div");e.className="quick-actions",e.innerHTML=`
      <button class="quick-action-btn" title="Nueva tarea" id="quickActionNewTask">
        <i class="fas fa-plus"></i>
      </button>
      <button class="quick-action-btn" title="Filtros rápidos" id="quickActionFilter">
        <i class="fas fa-filter"></i>
      </button>
      <button class="quick-action-btn" title="Buscar" id="quickActionSearch">
        <i class="fas fa-search"></i>
      </button>
    `,document.body.appendChild(e),document.getElementById("quickActionNewTask").addEventListener("click",()=>this.openNewTask()),document.getElementById("quickActionFilter").addEventListener("click",()=>{document.querySelector(".filters-panel")?.scrollIntoView({behavior:"smooth"})}),document.getElementById("quickActionSearch").addEventListener("click",()=>{document.getElementById("search")?.focus()})}async checkAuth(){this.currentUser=await c.getCurrentUser(),this.currentUser?await this.initializeApp():this.showLogin()}async initializeApp(){this.showApp(),await Promise.all([this.loadCategories(),this.loadTags(),this.loadNotifications(),this.loadUserColors()]),await this.updateStats(),await this.refresh(),this.applyTheme(),setTimeout(()=>{this.currentUser&&h.checkDueTasks(this.currentUser.id)},6e4)}async loadAppSettings(){this.appSettings=await c.getAppSettings()}async loadCategories(){this.categories=await c.fetchCategories(this.currentUser.id),await this.renderCategorySidebar(),this.renderCategoryFilters()}async loadTags(){this.tags=await c.fetchTags(this.currentUser.id),this.renderTagFilters()}async loadNotifications(){this.notifications=await c.fetchNotifications(this.currentUser.id),this.updateNotificationBadge(),this.renderNotifications()}async loadUserColors(){this.colorSettings=await c.getColorSettings(this.currentUser.id)}async updateStats(){if(!this.currentUser)return;const e=await c.getTaskStats(this.currentUser.id);document.getElementById("pendingCount").textContent=e.pending,document.getElementById("completedCount").textContent=e.completed,document.getElementById("todayCount").textContent=e.dueToday;const a=e.total>0?Math.round(e.completed/e.total*100):0,t=document.getElementById("completionProgress");t&&(t.style.background=`conic-gradient(var(--primary-color) 0% ${a}%, var(--border-color) ${a}% 100%)`,t.querySelector(".progress-value").textContent=`${a}%`)}async updateNotificationBadge(){const e=await c.getUnreadNotificationCount(this.currentUser.id),a=document.getElementById("notificationCount");e>0?(a.textContent=e>9?"9+":e,a.classList.remove("hidden")):a.classList.add("hidden")}applyTheme(){this.colorSettings&&v.applyTheme(this.colorSettings)}showLogin(){document.getElementById("loginScreen").classList.remove("hidden"),document.getElementById("registerScreen").classList.add("hidden"),document.getElementById("app").classList.add("hidden"),document.querySelector(".quick-actions")?.classList.add("hidden")}showRegister(){document.getElementById("loginScreen").classList.add("hidden"),document.getElementById("registerScreen").classList.remove("hidden"),document.getElementById("app").classList.add("hidden"),document.querySelector(".quick-actions")?.classList.add("hidden")}showApp(){document.getElementById("loginScreen").classList.add("hidden"),document.getElementById("registerScreen").classList.add("hidden"),document.getElementById("app").classList.remove("hidden"),document.querySelector(".quick-actions")?.classList.remove("hidden"),document.getElementById("userWelcome").textContent=this.currentUser.username,document.getElementById("dropdownUsername").textContent=this.currentUser.username,document.getElementById("dropdownEmail").textContent=this.currentUser.email}setupEventListeners(){document.getElementById("loginForm").addEventListener("submit",t=>this.handleLogin(t)),document.getElementById("registerForm").addEventListener("submit",t=>this.handleRegister(t)),document.getElementById("showRegister").addEventListener("click",t=>{t.preventDefault(),document.getElementById("loginScreen").classList.add("hidden"),document.getElementById("registerScreen").classList.remove("hidden")}),document.getElementById("showLogin").addEventListener("click",t=>{t.preventDefault(),this.showLogin()}),document.getElementById("themeToggle").addEventListener("click",()=>this.toggleTheme()),document.getElementById("notificationBtn").addEventListener("click",()=>this.toggleNotifications()),document.getElementById("quickTaskBtn").addEventListener("click",()=>this.openNewTask()),document.getElementById("userMenuBtn").addEventListener("click",()=>this.toggleUserDropdown()),document.getElementById("logoutBtn").addEventListener("click",()=>this.logout()),document.getElementById("newTaskBtn").addEventListener("click",()=>this.openNewTask()),document.getElementById("exportBtn").addEventListener("click",()=>this.exportTasks()),document.getElementById("search").addEventListener("input",()=>this.debouncedRefresh()),document.getElementById("searchBtn").addEventListener("click",()=>this.refresh()),document.getElementById("clearSearch").addEventListener("click",()=>{document.getElementById("search").value="",this.refresh()}),document.getElementById("search").addEventListener("keydown",t=>{t.key==="Enter"&&this.refresh()}),["filterStatus","filterPriority","filterCategory","filterTags","filterDate"].forEach(t=>{const s=document.getElementById(t);s&&s.addEventListener("change",()=>this.refresh())}),document.getElementById("clearFilters").addEventListener("click",()=>this.clearFilters()),document.getElementById("viewGrid").addEventListener("click",()=>this.setViewMode("grid")),document.getElementById("viewList").addEventListener("click",()=>this.setViewMode("list")),document.getElementById("sortTasks").addEventListener("click",()=>this.showSortOptions()),document.getElementById("addCategoryBtn").addEventListener("click",()=>this.openCategoryModal()),document.getElementById("cancelBtn").addEventListener("click",()=>this.hideModal()),document.getElementById("cancelBtn2").addEventListener("click",()=>this.hideModal()),document.getElementById("taskForm").addEventListener("submit",t=>this.handleTaskSubmit(t)),document.getElementById("deleteTaskBtn").addEventListener("click",()=>this.deleteCurrentTask()),document.getElementById("tagInput").addEventListener("input",t=>this.showTagSuggestions(t)),document.getElementById("tagInput").addEventListener("keydown",t=>this.handleTagInput(t)),document.getElementById("showTagsManager").addEventListener("click",()=>this.openTagsModal()),document.getElementById("addSubtaskBtn").addEventListener("click",()=>this.addSubtask()),document.getElementById("subtaskInput").addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),this.addSubtask())}),document.querySelectorAll(".priority-option").forEach(t=>{t.addEventListener("click",s=>{document.querySelectorAll(".priority-option").forEach(r=>r.classList.remove("active")),s.target.closest(".priority-option").classList.add("active"),document.getElementById("priority").value=s.target.closest(".priority-option").dataset.value})}),document.getElementById("closeTaskDetail").addEventListener("click",()=>this.closeTaskDetail()),document.getElementById("taskDetailModal").addEventListener("click",t=>{t.target===document.getElementById("taskDetailModal")&&this.closeTaskDetail()}),document.getElementById("colorSettingsBtn").addEventListener("click",()=>this.openColorSettings()),document.getElementById("saveColorsBtn").addEventListener("click",()=>this.saveColorSettings()),document.getElementById("cancelColorsBtn").addEventListener("click",()=>{this.colorSettings&&v.applyTheme(this.colorSettings),document.getElementById("colorSettingsModal").classList.add("hidden")}),document.getElementById("resetColorsBtn").addEventListener("click",()=>this.resetColors()),document.querySelectorAll(".preset-btn").forEach(t=>{t.addEventListener("click",s=>{const r=s.target.closest(".preset-btn").dataset.preset;this.applyColorPreset(r)})}),["primaryColor","secondaryColor","cardBgColor","appBgColor"].forEach(t=>{const s=document.getElementById(t);s&&s.addEventListener("input",r=>{this.previewColorChange(r.target.id,r.target.value)})}),document.addEventListener("click",t=>{t.target.closest(".user-menu")||document.getElementById("userDropdown").classList.add("hidden"),!t.target.closest(".notification-center")&&!t.target.closest("#notificationBtn")&&document.getElementById("notificationCenter").classList.add("hidden")});const e=document.getElementById("closeNotifications");e&&e.addEventListener("click",()=>{document.getElementById("notificationCenter").classList.add("hidden")}),document.getElementById("closeTagsModal").addEventListener("click",()=>{document.getElementById("tagsModal").classList.add("hidden")}),document.getElementById("addTagBtn").addEventListener("click",()=>this.addNewTag()),document.getElementById("closeCategoryModal").addEventListener("click",()=>{document.getElementById("categoryModal").classList.add("hidden")});const a=document.getElementById("addCategoryBtnModal");a&&a.addEventListener("click",()=>this.addNewCategory()),document.getElementById("manageTagsBtn").addEventListener("click",()=>this.openTagsModal()),document.getElementById("viewGrid").addEventListener("click",()=>{this.saveViewPreference("viewMode","grid")}),document.getElementById("viewList").addEventListener("click",()=>{this.saveViewPreference("viewMode","list")})}saveViewPreference(e,a){const t=JSON.parse(localStorage.getItem("taskflow_view_prefs")||"{}");t[e]=a,localStorage.setItem("taskflow_view_prefs",JSON.stringify(t))}debouncedRefresh=this.debounce(()=>this.refresh(),300);debounce(e,a){let t;return function(...r){const n=()=>{clearTimeout(t),e(...r)};clearTimeout(t),t=setTimeout(n,a)}}async handleLogin(e){e.preventDefault(),m.show();const a=document.getElementById("username").value,t=document.getElementById("password").value,s=await c.login(a,t);s.success?(this.currentUser=s.user,await this.initializeApp(),this.showToast("¡Bienvenido!",`Hola ${this.currentUser.username}`,"success")):this.showToast("Error de inicio de sesión",s.error,"error"),m.hide()}async handleRegister(e){e.preventDefault(),m.show();const a=document.getElementById("regUsername").value,t=document.getElementById("regEmail").value,s=document.getElementById("regPassword").value,r=document.getElementById("regConfirmPassword").value;if(s!==r){this.showToast("Error de registro","Las contraseñas no coinciden","error"),m.hide();return}const n=await c.register({username:a,email:t,password:s});n.success?(this.showToast("¡Cuenta creada!","Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.","success"),document.getElementById("registerForm").reset(),this.showLogin()):this.showToast("Error de registro",n.error,"error"),m.hide()}async logout(){await c.logout(),this.currentUser=null,this.showLogin(),this.showToast("Sesión cerrada","Has cerrado sesión correctamente","info")}toggleUserDropdown(){document.getElementById("userDropdown").classList.toggle("hidden")}async openNewTask(){document.getElementById("modalTitle").innerHTML='<i class="fas fa-tasks"></i> Nueva Tarea',document.getElementById("taskForm").reset(),document.getElementById("taskId").value="",document.getElementById("category").value="general",document.getElementById("priority").value="medium",document.getElementById("reminder").value="none",document.querySelectorAll(".priority-option").forEach(e=>{e.classList.remove("active"),e.dataset.value==="medium"&&e.classList.add("active")}),this.currentTaskTags=[],this.currentTaskSubtasks=[],this.renderTaskTags(),this.renderSubtasks(),document.getElementById("deleteTaskBtn").classList.add("hidden"),this.showModal()}async openEditTask(e){document.getElementById("modalTitle").innerHTML='<i class="fas fa-edit"></i> Editar Tarea',document.getElementById("taskId").value=e.id,document.getElementById("title").value=e.title,document.getElementById("description").value=e.description||"",document.getElementById("priority").value=e.priority||"medium",document.getElementById("category").value=e.category||"general",document.getElementById("dueDate").value=e.dueDate||"",document.getElementById("reminder").value=e.reminder||"none",document.querySelectorAll(".priority-option").forEach(a=>{a.classList.remove("active"),a.dataset.value===(e.priority||"medium")&&a.classList.add("active")}),this.currentTaskTags=e.tags||[],this.currentTaskSubtasks=e.subtasks||[],this.renderTaskTags(),this.renderSubtasks(),document.getElementById("deleteTaskBtn").classList.remove("hidden"),this.showModal()}showModal(){document.getElementById("modal").classList.remove("hidden")}hideModal(){document.getElementById("modal").classList.add("hidden")}async handleTaskSubmit(e){e.preventDefault(),m.show();const a=document.getElementById("taskId").value,t={title:document.getElementById("title").value.trim(),description:document.getElementById("description").value.trim(),priority:document.getElementById("priority").value,category:document.getElementById("category").value,dueDate:document.getElementById("dueDate").value||null,reminder:document.getElementById("reminder").value!=="none"?document.getElementById("reminder").value:null,tags:this.currentTaskTags,subtasks:this.currentTaskSubtasks};if(!t.title){this.showToast("Error","El título es obligatorio","error"),m.hide();return}try{a?(await c.updateTask(a,t,this.currentUser.id),this.showToast("Tarea actualizada","La tarea se ha actualizado correctamente","success")):(await c.createTask(t,this.currentUser.id),this.showToast("Tarea creada","La tarea se ha creado correctamente","success")),this.hideModal(),await this.refresh(),await this.updateStats()}catch{this.showToast("Error","No se pudo guardar la tarea","error")}m.hide()}async deleteCurrentTask(){const e=document.getElementById("taskId").value,a=document.getElementById("title").value;e&&this.showDeleteConfirmation(e,a,!0)}showDeleteConfirmation(e,a="esta tarea",t=!1){const s=document.createElement("div");s.className="modal",s.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease;
    `,s.innerHTML=`
      <div style="
        background: var(--card-bg);
        padding: 25px;
        border-radius: var(--radius-lg);
        width: 90%;
        max-width: 400px;
        box-shadow: var(--shadow-xl);
        border: 2px solid var(--danger-color);
        animation: slideUp 0.3s ease;
      ">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="font-size: 48px; color: var(--danger-color); margin-bottom: 15px;">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <h3 style="margin-bottom: 10px; color: var(--text-primary); font-size: 1.25rem;">
            ¿Eliminar tarea?
          </h3>
          <p style="color: var(--text-secondary); margin-bottom: 25px; line-height: 1.5;">
            Se eliminará permanentemente la tarea: <strong>"${this.escapeHtml(a)}"</strong>.
            <br><span style="color: var(--danger-color); font-size: 0.9rem;">Esta acción no se puede deshacer.</span>
          </p>
        </div>
        
        <div style="display: flex; gap: 10px;">
          <button id="cancelDeleteBtn" style="
            flex: 1;
            padding: 12px 20px;
            background: var(--bg-color);
            color: var(--text-secondary);
            border: 2px solid var(--border-color);
            border-radius: var(--radius-md);
            cursor: pointer;
            font-weight: 600;
            transition: all var(--transition-fast);
          ">Cancelar</button>
          <button id="confirmDeleteBtn" style="
            flex: 1;
            padding: 12px 20px;
            background: var(--danger-color);
            color: white;
            border: none;
            border-radius: var(--radius-md);
            cursor: pointer;
            font-weight: 600;
            transition: all var(--transition-fast);
          ">Eliminar</button>
        </div>
      </div>
    `,document.body.appendChild(s);const r=document.createElement("style");r.textContent=`
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      #cancelDeleteBtn:hover {
        background: var(--border-color) !important;
        transform: translateY(-1px);
      }
      #confirmDeleteBtn:hover {
        background: var(--danger-light) !important;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      }
    `,document.head.appendChild(r);const n=document.getElementById("cancelDeleteBtn"),d=document.getElementById("confirmDeleteBtn"),l=()=>{document.body.removeChild(s),document.head.removeChild(r)};n.addEventListener("click",l),d.addEventListener("click",async()=>{l(),m.show();try{await c.deleteTask(e,this.currentUser.id),this.showToast("Tarea eliminada","La tarea se ha eliminado correctamente","info"),t&&this.hideModal(),await this.refresh(),await this.updateStats()}catch{this.showToast("Error","No se pudo eliminar la tarea","error")}m.hide()}),s.addEventListener("click",g=>{g.target===s&&l()})}async deleteTask(e){const t=(await c.fetchTasks({},this.currentUser.id)).find(s=>s.id===e);t&&this.showDeleteConfirmation(e,t.title,!1)}handleTagInput(e){if(e.key==="Enter"){e.preventDefault();const a=e.target.value.trim();a&&(this.addTagToTask(a),e.target.value="",this.hideTagSuggestions())}}showTagSuggestions(e){const a=e.target.value.trim(),t=document.getElementById("tagSuggestions");if(!a){this.hideTagSuggestions();return}const s=this.tags.filter(n=>n.name.toLowerCase().includes(a.toLowerCase())&&!this.currentTaskTags.includes(n.id));t.innerHTML="",t.classList.remove("hidden"),s.forEach(n=>{const d=document.createElement("div");d.className="tag-suggestion",d.innerHTML=`
        <span class="tag-color-preview" style="background-color: ${n.color}; width: 12px; height: 12px; border-radius: 50%; display: inline-block; margin-right: 8px;"></span>
        ${n.name}
      `,d.onclick=()=>{this.addTagToTask(n.id),e.target.value="",this.hideTagSuggestions()},t.appendChild(d)});const r=document.createElement("div");r.className="tag-suggestion",r.innerHTML=`+ Crear "${a}"`,r.onclick=async()=>{try{const n=await c.createTag({name:a},this.currentUser.id);this.tags.push(n),this.addTagToTask(n.id),e.target.value="",this.hideTagSuggestions(),this.renderTagFilters(),this.showToast("Etiqueta creada","La etiqueta se ha creado y añadido a la tarea","success")}catch(n){this.showToast("Error",n.message,"error")}},t.appendChild(r)}hideTagSuggestions(){const e=document.getElementById("tagSuggestions");e&&e.classList.add("hidden")}addTagToTask(e){if(typeof e=="string"){const a=this.tags.find(t=>t.name.toLowerCase()===e.toLowerCase());if(a)this.currentTaskTags.includes(a.id)||this.currentTaskTags.push(a.id);else{c.createTag({name:e},this.currentUser.id).then(t=>{this.tags.push(t),this.currentTaskTags.push(t.id),this.renderTaskTags(),this.renderTagFilters(),this.showToast("Etiqueta creada","La etiqueta se ha creado y añadido a la tarea","success")}).catch(t=>{this.showToast("Error",t.message,"error")});return}}else this.currentTaskTags.includes(e)||this.currentTaskTags.push(e);this.renderTaskTags()}removeTagFromTask(e){this.currentTaskTags=this.currentTaskTags.filter(a=>a!==e),this.renderTaskTags()}renderTaskTags(){const e=document.getElementById("tagsContainer");e&&(e.innerHTML="",this.currentTaskTags.forEach(a=>{const t=this.tags.find(s=>s.id===a);if(t){const s=document.createElement("span");s.className="tag",s.style.backgroundColor=t.color,s.style.color=this.getContrastColor(t.color),s.innerHTML=`
          ${t.name}
          <button class="tag-remove" onclick="app.removeTagFromTask('${t.id}')">
            <i class="fas fa-times"></i>
          </button>
        `,e.appendChild(s)}}))}addSubtask(){const e=document.getElementById("subtaskInput");if(!e)return;const a=e.value.trim();a&&(this.currentTaskSubtasks.push({id:Date.now()+Math.random().toString(36).substr(2,9),title:a,completed:!1,createdAt:new Date().toISOString()}),e.value="",this.renderSubtasks())}removeSubtask(e){this.currentTaskSubtasks.splice(e,1),this.renderSubtasks()}toggleSubtask(e){this.currentTaskSubtasks[e]&&(this.currentTaskSubtasks[e].completed=!this.currentTaskSubtasks[e].completed,this.renderSubtasks())}renderSubtasks(){const e=document.getElementById("subtasksList");e&&(e.innerHTML="",this.currentTaskSubtasks.forEach((a,t)=>{const s=document.createElement("div");s.className=`subtask-item ${a.completed?"completed":""}`,s.innerHTML=`
        <input type="checkbox" class="subtask-checkbox" ${a.completed?"checked":""} 
               onchange="app.toggleSubtask(${t})">
        <span class="subtask-text">${a.title}</span>
        <button class="btn-icon small" onclick="app.removeSubtask(${t})">
          <i class="fas fa-times"></i>
        </button>
      `,e.appendChild(s)}))}async renderCategorySidebar(){const e=document.getElementById("categoryList");if(!e)return;e.innerHTML="";const a=await c.fetchTasks({},this.currentUser.id),t=this.categories.map(s=>{const r=a.filter(n=>n.category===s.id).length;return{...s,count:r}});t.sort((s,r)=>r.count-s.count),t.forEach(s=>{const r=document.createElement("div");r.className="category-item",r.dataset.categoryId=s.id,r.innerHTML=`
        <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
          <span class="category-color" style="background-color: ${s.color}"></span>
          <span class="category-name">${s.name}</span>
        </div>
        <span class="category-count">${s.count}</span>
      `,r.addEventListener("click",()=>{const n=document.getElementById("filterCategory");n&&(n.value=s.id,this.refresh())}),e.appendChild(r)}),await this.renderUpcomingDates()}async renderUpcomingDates(){const e=document.getElementById("upcomingDates");if(!e)return;const a=await c.fetchTasks({},this.currentUser.id),t=new Date,s=new Date(t.getTime()+10080*60*1e3),r=a.filter(l=>{if(!l.dueDate||l.status==="completed")return!1;const g=new Date(l.dueDate);return g>=t&&g<=s}),n={};r.forEach(l=>{n[l.dueDate]||(n[l.dueDate]=0),n[l.dueDate]++});const d=Object.keys(n).sort();e.innerHTML="",d.length>0?d.slice(0,5).forEach(l=>{const g=document.createElement("div");g.className="date-item";const u=new Date(l).toLocaleDateString("es-ES",{weekday:"short",month:"short",day:"numeric"});g.innerHTML=`
          <span class="date">${u}</span>
          <span class="count">${n[l]}</span>
        `,g.addEventListener("click",()=>{document.getElementById("filterDate").value=l,this.refresh()}),e.appendChild(g)}):e.innerHTML='<p style="text-align: center; color: var(--text-light); font-size: 0.875rem; padding: 8px;">No hay tareas próximas</p>'}renderCategoryFilters(){const e=document.getElementById("filterCategory"),a=document.getElementById("category");if(!(!e||!a)){for(;e.children.length>2;)e.removeChild(e.lastChild);for(;a.children.length>1;)a.removeChild(a.lastChild);this.categories.forEach(t=>{const s=document.createElement("option");s.value=t.id,s.textContent=t.name,e.appendChild(s);const r=document.createElement("option");r.value=t.id,r.textContent=t.name,a.appendChild(r)})}}async openCategoryModal(){await this.renderCategoriesList(),document.getElementById("categoryModal").classList.remove("hidden")}async renderCategoriesList(){const e=document.getElementById("categoriesList");if(!e)return;e.innerHTML="",(await c.fetchCategoriesWithCount(this.currentUser.id)).forEach(t=>{const s=document.createElement("div");s.className="category-item",s.innerHTML=`
        <div class="category-info">
          <span class="category-color" style="background-color: ${t.color}"></span>
          <div>
            <strong>${t.name}</strong>
            <small>${t.count} tareas</small>
          </div>
        </div>
        <div class="category-actions">
          <button class="btn-icon small" onclick="app.editCategory('${t.id}')">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon small" onclick="app.deleteCategory('${t.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `,e.appendChild(s)})}async addNewCategory(){const e=document.getElementById("categoryName"),a=document.getElementById("categoryColor");if(!e||!a)return;const t=e.value.trim(),s=a.value;if(!t){this.showToast("Error","El nombre de la categoría es obligatorio","error");return}try{const r=await c.createCategory({name:t,color:s},this.currentUser.id);this.categories.push(r),await this.renderCategorySidebar(),this.renderCategoryFilters(),await this.renderCategoriesList(),e.value="",this.showToast("Categoría creada","La categoría se ha creado correctamente","success")}catch(r){this.showToast("Error",r.message,"error")}}async editCategory(e){const a=this.categories.find(s=>s.id===e);if(!a)return;const t=document.createElement("div");t.className="modal",t.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease;
    `,t.innerHTML=`
      <div style="
        background: var(--card-bg);
        padding: 25px;
        border-radius: var(--radius-lg);
        width: 90%;
        max-width: 350px;
        box-shadow: var(--shadow-xl);
        animation: slideUp 0.3s ease;
      ">
        <h3 style="margin-top: 0; margin-bottom: 20px; color: var(--text-primary);">
          <i class="fas fa-edit"></i> Editar Categoría
        </h3>
        
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <div>
            <label style="display: block; margin-bottom: 5px; color: var(--text-secondary);">Nombre:</label>
            <input type="text" id="editCategoryNameInput" value="${a.name}" style="
              width: 100%;
              padding: 10px;
              border: 2px solid var(--border-color);
              border-radius: 8px;
              background: var(--bg-color);
              color: var(--text-primary);
              font-size: 16px;
            " />
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 5px; color: var(--text-secondary);">Color:</label>
            <input type="color" id="editCategoryColorInput" value="${a.color}" style="
              width: 100%;
              height: 40px;
              border: 2px solid var(--border-color);
              border-radius: 8px;
              cursor: pointer;
            " />
          </div>
          
          <div style="display: flex; gap: 10px; margin-top: 10px;">
            <button id="cancelEditCategoryBtn" style="
              flex: 1;
              padding: 10px;
              background: var(--bg-color);
              color: var(--text-secondary);
              border: 2px solid var(--border-color);
              border-radius: 6px;
              cursor: pointer;
              font-weight: 600;
            ">Cancelar</button>
            <button id="saveEditCategoryBtn" style="
              flex: 1;
              padding: 10px;
              background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-weight: bold;
            ">Guardar</button>
          </div>
        </div>
      </div>
    `,document.body.appendChild(t),document.getElementById("cancelEditCategoryBtn").addEventListener("click",()=>{document.body.removeChild(t)}),document.getElementById("saveEditCategoryBtn").addEventListener("click",async()=>{const s=document.getElementById("editCategoryNameInput").value.trim(),r=document.getElementById("editCategoryColorInput").value;if(!s){this.showToast("Error","El nombre de la categoría es obligatorio","error");return}try{await c.updateCategory(e,{name:s,color:r},this.currentUser.id),await this.loadCategories(),await this.refresh(),this.showToast("Categoría actualizada","La categoría se ha actualizado correctamente","success"),document.body.removeChild(t)}catch(n){this.showToast("Error",n.message,"error")}}),t.addEventListener("click",s=>{s.target===t&&document.body.removeChild(t)})}async deleteCategory(e){const a=this.categories.find(d=>d.id===e);if(!a)return;const t=document.createElement("div");t.className="modal",t.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease;
    `,t.innerHTML=`
      <div style="
        background: var(--card-bg);
        padding: 25px;
        border-radius: var(--radius-lg);
        width: 90%;
        max-width: 400px;
        box-shadow: var(--shadow-xl);
        border: 2px solid var(--warning-color);
        animation: slideUp 0.3s ease;
      ">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="font-size: 48px; color: var(--warning-color); margin-bottom: 15px;">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <h3 style="margin-bottom: 10px; color: var(--text-primary); font-size: 1.25rem;">
            ¿Eliminar categoría?
          </h3>
          <p style="color: var(--text-secondary); margin-bottom: 15px; line-height: 1.5;">
            Se eliminará la categoría: <strong>"${a.name}"</strong>.
          </p>
          <p style="color: var(--warning-color); font-size: 0.9rem; margin-bottom: 25px; padding: 10px; background: rgba(245, 158, 11, 0.1); border-radius: 8px;">
            <i class="fas fa-info-circle"></i> Las tareas de esta categoría se moverán a "General".
          </p>
        </div>
        
        <div style="display: flex; gap: 10px;">
          <button id="cancelDeleteCategoryBtn" style="
            flex: 1;
            padding: 12px 20px;
            background: var(--bg-color);
            color: var(--text-secondary);
            border: 2px solid var(--border-color);
            border-radius: var(--radius-md);
            cursor: pointer;
            font-weight: 600;
            transition: all var(--transition-fast);
          ">Cancelar</button>
          <button id="confirmDeleteCategoryBtn" style="
            flex: 1;
            padding: 12px 20px;
            background: var(--warning-color);
            color: white;
            border: none;
            border-radius: var(--radius-md);
            cursor: pointer;
            font-weight: 600;
            transition: all var(--transition-fast);
          ">Eliminar</button>
        </div>
      </div>
    `,document.body.appendChild(t);const s=document.getElementById("cancelDeleteCategoryBtn"),r=document.getElementById("confirmDeleteCategoryBtn"),n=()=>{document.body.removeChild(t)};s.addEventListener("click",n),r.addEventListener("click",async()=>{n();try{await c.deleteCategory(e,this.currentUser.id),await this.loadCategories(),await this.refresh(),this.showToast("Categoría eliminada","La categoría se ha eliminado correctamente","info")}catch(d){this.showToast("Error",d.message,"error")}}),t.addEventListener("click",d=>{d.target===t&&n()})}renderTagFilters(){let e=document.getElementById("filterTags");if(e){for(;e.children.length>1;)e.removeChild(e.lastChild);this.tags.forEach(a=>{const t=document.createElement("option");t.value=a.id,t.textContent=a.name,e.appendChild(t)})}}async openTagsModal(){await this.renderTagsList(),document.getElementById("tagsModal").classList.remove("hidden")}async renderTagsList(){const e=document.getElementById("tagsList");e&&(e.innerHTML="",this.tags.forEach(a=>{const t=document.createElement("div");t.className="tag-item",t.innerHTML=`
        <div class="tag-info">
          <span class="tag-color" style="background-color: ${a.color}"></span>
          <span>${a.name}</span>
        </div>
        <div class="tag-actions">
          <button class="btn-icon small" onclick="app.editTag('${a.id}')">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon small" onclick="app.deleteTag('${a.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `,e.appendChild(t)}))}async addNewTag(){const e=document.getElementById("newTagName"),a=document.getElementById("newTagColor");if(!e||!a)return;const t=e.value.trim(),s=a.value;if(!t){this.showToast("Error","El nombre de la etiqueta es obligatorio","error");return}try{const r=await c.createTag({name:t,color:s},this.currentUser.id);this.tags.push(r),this.renderTagsList(),this.renderTagFilters(),e.value="",this.showToast("Etiqueta creada","La etiqueta se ha creado correctamente","success")}catch(r){this.showToast("Error",r.message,"error")}}async editTag(e){const a=this.tags.find(s=>s.id===e);if(!a)return;const t=document.createElement("div");t.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    `,t.innerHTML=`
      <div style="
        background: var(--card-bg);
        padding: 25px;
        border-radius: 12px;
        width: 90%;
        max-width: 350px;
        box-shadow: var(--shadow-xl);
      ">
        <h3 style="margin-top: 0; margin-bottom: 20px; color: var(--text-primary);">
          <i class="fas fa-edit"></i> Editar Etiqueta
        </h3>
        
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <div>
            <label style="display: block; margin-bottom: 5px; color: var(--text-secondary);">Nombre:</label>
            <input type="text" id="editTagNameInput" value="${a.name}" style="
              width: 100%;
              padding: 10px;
              border: 2px solid var(--border-color);
              border-radius: 8px;
              background: var(--bg-color);
              color: var(--text-primary);
              font-size: 16px;
            " />
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 5px; color: var(--text-secondary);">Color:</label>
            <input type="color" id="editTagColorInput" value="${a.color}" style="
              width: 100%;
              height: 40px;
              border: 2px solid var(--border-color);
              border-radius: 8px;
              cursor: pointer;
            " />
          </div>
          
          <div style="display: flex; gap: 10px; margin-top: 10px;">
            <button id="cancelEditTagBtn" style="
              flex: 1;
              padding: 10px;
              background: var(--bg-color);
              color: var(--text-secondary);
              border: 2px solid var(--border-color);
              border-radius: 6px;
              cursor: pointer;
              font-weight: 600;
            ">Cancelar</button>
            <button id="saveEditTagBtn" style="
              flex: 1;
              padding: 10px;
              background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-weight: bold;
            ">Guardar</button>
          </div>
        </div>
      </div>
    `,document.body.appendChild(t),document.getElementById("cancelEditTagBtn").addEventListener("click",()=>{document.body.removeChild(t)}),document.getElementById("saveEditTagBtn").addEventListener("click",async()=>{const s=document.getElementById("editTagNameInput").value.trim(),r=document.getElementById("editTagColorInput").value;if(!s){this.showToast("Error","El nombre de la etiqueta es obligatorio","error");return}try{await c.updateTag(e,{name:s,color:r},this.currentUser.id),await this.loadTags(),await this.renderTagsList(),this.renderTagFilters(),this.showToast("Etiqueta actualizada","La etiqueta se ha actualizado correctamente","success"),document.body.removeChild(t)}catch(n){this.showToast("Error",n.message,"error")}}),t.addEventListener("click",s=>{s.target===t&&document.body.removeChild(t)})}async deleteTag(e){const a=this.tags.find(d=>d.id===e);if(!a)return;const t=document.createElement("div");t.className="modal",t.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease;
    `,t.innerHTML=`
      <div style="
        background: var(--card-bg);
        padding: 25px;
        border-radius: var(--radius-lg);
        width: 90%;
        max-width: 400px;
        box-shadow: var(--shadow-xl);
        border: 2px solid var(--warning-color);
        animation: slideUp 0.3s ease;
      ">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="font-size: 48px; color: var(--warning-color); margin-bottom: 15px;">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <h3 style="margin-bottom: 10px; color: var(--text-primary); font-size: 1.25rem;">
            ¿Eliminar etiqueta?
          </h3>
          <p style="color: var(--text-secondary); margin-bottom: 15px; line-height: 1.5;">
            Se eliminará la etiqueta: <strong>"${a.name}"</strong>.
          </p>
          <p style="color: var(--warning-color); font-size: 0.9rem; margin-bottom: 25px; padding: 10px; background: rgba(245, 158, 11, 0.1); border-radius: 8px;">
            <i class="fas fa-info-circle"></i> La etiqueta se eliminará de todas las tareas.
          </p>
        </div>
        
        <div style="display: flex; gap: 10px;">
          <button id="cancelDeleteTagBtn" style="
            flex: 1;
            padding: 12px 20px;
            background: var(--bg-color);
            color: var(--text-secondary);
            border: 2px solid var(--border-color);
            border-radius: var(--radius-md);
            cursor: pointer;
            font-weight: 600;
            transition: all var(--transition-fast);
          ">Cancelar</button>
          <button id="confirmDeleteTagBtn" style="
            flex: 1;
            padding: 12px 20px;
            background: var(--warning-color);
            color: white;
            border: none;
            border-radius: var(--radius-md);
            cursor: pointer;
            font-weight: 600;
            transition: all var(--transition-fast);
          ">Eliminar</button>
        </div>
      </div>
    `,document.body.appendChild(t);const s=document.getElementById("cancelDeleteTagBtn"),r=document.getElementById("confirmDeleteTagBtn"),n=()=>{document.body.removeChild(t)};s.addEventListener("click",n),r.addEventListener("click",async()=>{n();try{await c.deleteTag(e,this.currentUser.id),this.tags=this.tags.filter(d=>d.id!==e),this.renderTagsList(),this.renderTagFilters(),this.showToast("Etiqueta eliminada","La etiqueta se ha eliminado correctamente","info")}catch(d){this.showToast("Error",d.message,"error")}}),t.addEventListener("click",d=>{d.target===t&&n()})}async openColorSettings(){const e=document.getElementById("colorSettingsModal");e&&(document.getElementById("primaryColor").value=this.colorSettings.primaryColor,document.getElementById("secondaryColor").value=this.colorSettings.secondaryColor,document.getElementById("cardBgColor").value=this.colorSettings.cardBg,document.getElementById("appBgColor").value=this.colorSettings.appBg,document.getElementById("primaryValue").textContent=this.colorSettings.primaryColor,document.getElementById("secondaryValue").textContent=this.colorSettings.secondaryColor,document.getElementById("cardBgValue").textContent=this.colorSettings.cardBg,document.getElementById("appBgValue").textContent=this.colorSettings.appBg,e.classList.remove("hidden"))}previewColorChange(e,a){const t=document.getElementById(e+"Value");t&&(t.textContent=a);const s=new E({...this.colorSettings,[this.mapInputIdToProperty(e)]:a});v.applyTheme(s)}mapInputIdToProperty(e){return{primaryColor:"primaryColor",secondaryColor:"secondaryColor",cardBgColor:"cardBg",appBgColor:"appBg"}[e]||e}async saveColorSettings(){const e=document.getElementById("primaryColor").value,a=document.getElementById("secondaryColor").value,t=document.getElementById("cardBgColor").value,s=document.getElementById("appBgColor").value,r=new E({userId:this.currentUser.id,theme:this.colorSettings.theme,primaryColor:e,secondaryColor:a,cardBg:t,textColor:this.colorSettings.textColor,borderColor:this.colorSettings.borderColor,appBg:s,accentColor:this.colorSettings.accentColor});await c.saveColorSettings(this.currentUser.id,r),this.colorSettings=r,document.getElementById("colorSettingsModal").classList.add("hidden"),this.showToast("Tema guardado","Los cambios se han guardado correctamente","success")}async resetColors(){const e=new E({userId:this.currentUser.id});await c.saveColorSettings(this.currentUser.id,e),this.colorSettings=e,v.applyTheme(e),this.openColorSettings(),this.showToast("Tema restaurado","Se ha restaurado el tema predeterminado","info")}applyColorPreset(e){const a=v.getPreset(e);document.getElementById("primaryColor").value=a.primaryColor,document.getElementById("secondaryColor").value=a.secondaryColor,document.getElementById("cardBgColor").value=a.cardBg,document.getElementById("appBgColor").value=a.appBg,document.getElementById("primaryValue").textContent=a.primaryColor,document.getElementById("secondaryValue").textContent=a.secondaryColor,document.getElementById("cardBgValue").textContent=a.cardBg,document.getElementById("appBgValue").textContent=a.appBg;const t=new E({...a,userId:this.currentUser.id});v.applyTheme(t)}toggleTheme(){const e=this.colorSettings.theme==="light"?"dark":"light";this.colorSettings.theme=e;const a=document.querySelector("#themeToggle i");a&&(a.className=e==="dark"?"fas fa-sun":"fas fa-moon"),v.applyTheme(this.colorSettings),c.saveColorSettings(this.currentUser.id,this.colorSettings)}async toggleNotifications(){const e=document.getElementById("notificationCenter");e&&(e.classList.toggle("hidden"),e.classList.contains("hidden")||(await c.markAllNotificationsAsRead(this.currentUser.id),await this.loadNotifications()))}renderNotifications(){const e=document.getElementById("notificationsList");e&&(e.innerHTML="",this.notifications.forEach(a=>{const t=document.createElement("div");t.className=`notification-item ${a.read?"":"unread"}`,t.innerHTML=`
        <div class="notification-title">${a.title}</div>
        <div class="notification-message">${a.message}</div>
        <div class="notification-time">${this.formatTimeAgo(a.createdAt)}</div>
      `,a.taskId&&(t.style.cursor="pointer",t.addEventListener("click",async()=>{const r=(await c.fetchTasks({},this.currentUser.id)).find(n=>n.id===a.taskId);r&&(this.openTaskDetail(r),document.getElementById("notificationCenter").classList.add("hidden"))})),e.appendChild(t)}))}async refresh(){m.show();const e=document.getElementById("taskList"),a=document.getElementById("emptyState"),t=this.getFilters(),s=JSON.parse(localStorage.getItem("taskflow_sort_preference")||'{"field":"createdAt","direction":"desc"}');t.sortBy=s.field,t.sortDirection=s.direction;const r=await c.fetchTasks(t,this.currentUser.id);r.length===0?(e&&e.classList.add("hidden"),a&&a.classList.remove("hidden")):(e&&e.classList.remove("hidden"),a&&a.classList.add("hidden"),e&&(e.innerHTML="",this.viewMode==="grid"?(e.className="task-grid",r.forEach(d=>{const l=this.createTaskCard(d);e.appendChild(l)})):(e.className="task-list-view",r.forEach(d=>{const l=this.createTaskRow(d);e.appendChild(l)}))));const n=document.getElementById("tasksTitle");if(n){const d=r.length;n.textContent=`Mis Tareas ${d>0?`(${d})`:""}`}await this.renderCategorySidebar(),m.hide()}getFilters(){const e=document.getElementById("filterTags"),a=JSON.parse(localStorage.getItem("taskflow_sort_preference")||'{"field":"createdAt","direction":"desc"}');return{status:document.getElementById("filterStatus")?.value||"all",priority:document.getElementById("filterPriority")?.value||"all",category:document.getElementById("filterCategory")?.value||"all",tag:e?e.value:"all",dueDate:document.getElementById("filterDate")?.value||"",search:document.getElementById("search")?.value.trim()||"",sortBy:a.field||"createdAt",sortDirection:a.direction||"desc"}}clearFilters(){document.getElementById("filterStatus").value="all",document.getElementById("filterPriority").value="all",document.getElementById("filterCategory").value="all",document.getElementById("filterTags").value="all",document.getElementById("filterDate").value="",document.getElementById("search").value="",this.refresh()}setViewMode(e){this.viewMode=e;const a=document.getElementById("viewGrid"),t=document.getElementById("viewList");a&&a.classList.toggle("active",e==="grid"),t&&t.classList.toggle("active",e==="list"),this.refresh()}showSortOptions(){const e=document.createElement("div");e.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    `,e.innerHTML=`
      <div style="
        background: var(--card-bg);
        padding: 25px;
        border-radius: 12px;
        width: 90%;
        max-width: 350px;
        box-shadow: var(--shadow-xl);
      ">
        <h3 style="margin-top: 0; margin-bottom: 20px; color: var(--text-primary);">
          <i class="fas fa-sort"></i> Ordenar por:
        </h3>
        
        <form id="sort-form-modal" style="display: flex; flex-direction: column; gap: 10px;">
          <label style="display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 8px; background: var(--bg-color); cursor: pointer;">
            <input type="radio" name="sort" value="createdAt" checked>
            <span>Fecha de creación (nuevas primero)</span>
          </label>
          
          <label style="display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 8px; background: var(--bg-color); cursor: pointer;">
            <input type="radio" name="sort" value="dueDate">
            <span>Fecha límite</span>
          </label>
          
          <label style="display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 8px; background: var(--bg-color); cursor: pointer;">
            <input type="radio" name="sort" value="priority">
            <span>Prioridad</span>
          </label>
          
          <div style="margin: 15px 0; padding: 15px 0; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
            <label style="display: flex; align-items: center; gap: 10px;">
              <input type="radio" name="direction" value="desc" checked>
              <span>Descendente (nuevas/urgentes primero)</span>
            </label>
            <label style="display: flex; align-items: center; gap: 10px;">
              <input type="radio" name="direction" value="asc">
              <span>Ascendente (antiguas/lejanas primero)</span>
            </label>
          </div>
          
          <div style="display: flex; gap: 10px; margin-top: 10px;">
            <button type="button" id="cancelSortBtn" style="
              flex: 1;
              padding: 10px;
              background: var(--bg-color);
              color: var(--text-secondary);
              border: 2px solid var(--border-color);
              border-radius: 6px;
              cursor: pointer;
              font-weight: 600;
            ">Cancelar</button>
            <button type="submit" style="
              flex: 1;
              padding: 10px;
              background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-weight: bold;
              box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
            ">Aplicar</button>
          </div>
        </form>
      </div>
    `,document.body.appendChild(e),document.getElementById("cancelSortBtn").addEventListener("click",()=>{document.body.removeChild(e)}),e.addEventListener("click",a=>{a.target===e&&document.body.removeChild(e)}),document.getElementById("sort-form-modal").addEventListener("submit",a=>{a.preventDefault();const t=e.querySelector('input[name="sort"]:checked').value,s=e.querySelector('input[name="direction"]:checked').value,r=`Ordenando por ${t==="createdAt"?"fecha de creación":t==="dueDate"?"fecha límite":"prioridad"} (${s==="desc"?"descendente":"ascendente"})`;this.showToast("Ordenamiento",r,"info"),localStorage.setItem("taskflow_sort_preference",JSON.stringify({field:t,direction:s})),this.refresh(),document.body.removeChild(e)})}createTaskCard(e){const a=document.createElement("div");a.className=`task-card priority-${e.priority} ${e.status==="completed"?"completed":""}`;const t=this.categories.find(g=>g.id===e.category),s=t?t.color:"#64748b";a.style.borderLeftColor=this.getPriorityColor(e.priority),e.priority==="high"?a.style.background="linear-gradient(to right, rgba(239, 68, 68, 0.05), var(--card-bg))":e.priority==="medium"?a.style.background="linear-gradient(to right, rgba(245, 158, 11, 0.05), var(--card-bg))":e.priority==="low"&&(a.style.background="linear-gradient(to right, rgba(16, 185, 129, 0.05), var(--card-bg))");const r=e.tags?e.tags.map(g=>{const u=this.tags.find(y=>y.id===g);return u?`<span class="task-tag" style="background-color: ${u.color}; color: ${this.getContrastColor(u.color)}">${u.name}</span>`:""}).join(""):"",n=e.dueDate?this.getDueDateInfo(e.dueDate):"",d=e.subtasks&&e.subtasks.length>0?`<div class="progress-indicator">
        <div class="progress-fill" style="width: ${e.getCompletionPercentage()}%"></div>
      </div>`:"",l=JSON.stringify(e).replace(/"/g,"&quot;");return a.innerHTML=`
      <div class="task-header">
        <div class="task-title">${this.escapeHtml(e.title)}</div>
        <div class="task-actions">
          <button class="btn-icon small" onclick="app.toggleTaskStatus('${e.id}')">
            <i class="fas ${e.status==="completed"?"fa-undo":"fa-check"}"></i>
          </button>
          <button class="btn-icon small" onclick="app.openEditTask(${l})">
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </div>
      <div class="task-description">${this.escapeHtml(e.description||"Sin descripción")}</div>
      ${r?`<div class="task-tags">${r}</div>`:""}
      ${d}
      <div class="task-meta">
        <div class="task-info">
          <span title="Categoría"><i class="fas fa-folder" style="color: ${s}"></i> ${t?t.name:"General"}</span>
          <span title="Fecha límite"><i class="fas fa-calendar"></i> ${e.dueDate?new Date(e.dueDate).toLocaleDateString():"Sin fecha"}</span>
          ${n}
        </div>
        <div class="task-status">
          <span class="status-badge ${e.status}">${e.status==="completed"?"✅ Completada":"⏳ Pendiente"}</span>
        </div>
      </div>
    `,a.addEventListener("click",g=>{g.target.closest(".btn-icon")||this.openTaskDetail(e)}),a}createTaskRow(e){const a=document.createElement("div");a.className=`task-row priority-${e.priority} ${e.status==="completed"?"completed":""}`;const t=this.categories.find(n=>n.id===e.category),s=t?t.color:"#64748b",r=JSON.stringify(e).replace(/"/g,"&quot;");return a.innerHTML=`
      <div class="row-checkbox">
        <input type="checkbox" ${e.status==="completed"?"checked":""} 
               onchange="app.toggleTaskStatus('${e.id}')">
      </div>
      <div class="row-title">
        <span class="task-title-text">${this.escapeHtml(e.title)}</span>
        ${e.description?`<small class="row-description">${this.escapeHtml(e.description)}</small>`:""}
      </div>
      <div class="row-category">
        <span class="category-dot" style="background-color: ${s}"></span>
        ${t?t.name:"General"}
      </div>
      <div class="row-date">${e.dueDate?new Date(e.dueDate).toLocaleDateString():"—"}</div>
      <div class="row-priority priority-${e.priority}">${this.getPriorityText(e.priority)}</div>
      <div class="row-actions">
        <button class="btn-icon small" onclick="app.openTaskDetail(${r})">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn-icon small" onclick="app.openEditTask(${r})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-icon small" onclick="app.deleteTask('${e.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `,a}async openTaskDetail(e){const t=(await c.fetchTasks({},this.currentUser.id)).find(u=>u.id===e.id);if(!t)return;document.getElementById("detailTitle").textContent=t.title,document.getElementById("detailStatus").textContent=t.status==="completed"?"Completada":"Pendiente",document.getElementById("detailStatus").className=`detail-badge ${t.status==="completed"?"success":"warning"}`,document.getElementById("detailPriority").textContent=this.getPriorityText(t.priority),document.getElementById("detailPriority").className=`detail-badge priority-${t.priority}`;const s=this.categories.find(u=>u.id===t.category);document.getElementById("detailCategory").textContent=s?s.name:"General",document.getElementById("detailCategory").className="detail-badge",document.getElementById("detailCategory").style.backgroundColor=s?s.color:"#64748b",document.getElementById("detailCategory").style.color=s?this.getContrastColor(s.color):"white",document.getElementById("detailDueDate").textContent=t.dueDate?new Date(t.dueDate).toLocaleDateString():"No especificada",document.getElementById("detailCreatedAt").textContent=new Date(t.createdAt).toLocaleDateString(),document.getElementById("detailUpdatedAt").textContent=new Date(t.updatedAt).toLocaleDateString(),document.getElementById("detailDescription").textContent=t.description||"No hay descripción";const r=document.getElementById("detailTags");r&&(r.innerHTML="",t.tags&&t.tags.length>0?(t.tags.forEach(u=>{const y=this.tags.find(p=>p.id===u);if(y){const p=document.createElement("span");p.className="tag",p.style.backgroundColor=y.color,p.style.color=this.getContrastColor(y.color),p.textContent=y.name,r.appendChild(p)}}),document.getElementById("detailTagsSection").classList.remove("hidden")):document.getElementById("detailTagsSection").classList.add("hidden"));const n=document.getElementById("detailSubtasks");n&&(n.innerHTML="",t.subtasks&&t.subtasks.length>0?(t.subtasks.forEach((u,y)=>{const p=document.createElement("div");p.className=`detail-subtask ${u.completed?"completed":""}`,p.innerHTML=`
            <input type="checkbox" ${u.completed?"checked":""} 
                   onchange="app.toggleTaskSubtask('${t.id}', ${y})">
            <span>${u.title}</span>
          `,n.appendChild(p)}),document.getElementById("detailSubtasksSection").classList.remove("hidden")):document.getElementById("detailSubtasksSection").classList.add("hidden"));const d=document.getElementById("detailToggleBtn");d&&(d.innerHTML=t.status==="completed"?'<i class="fas fa-undo"></i> Marcar como Pendiente':'<i class="fas fa-check-circle"></i> Marcar como Completada',d.onclick=async()=>{await this.toggleTaskStatus(t.id),this.closeTaskDetail()});const l=document.getElementById("detailEditBtn");l&&(l.onclick=()=>{this.closeTaskDetail(),this.openEditTask(t)});const g=document.getElementById("detailDeleteBtn");g&&(g.onclick=()=>{this.closeTaskDetail(),this.showDeleteConfirmation(t.id,t.title,!1)}),document.getElementById("taskDetailModal").classList.remove("hidden")}closeTaskDetail(){document.getElementById("taskDetailModal").classList.add("hidden")}async toggleTaskStatus(e){m.show();try{const t=(await c.fetchTasks({},this.currentUser.id)).find(r=>r.id===e);if(!t)return;const s=t.status==="pending"?"completed":"pending";await c.updateTask(e,{status:s},this.currentUser.id),await this.refresh(),await this.updateStats(),this.showToast("Estado actualizado",`Tarea marcada como ${s==="completed"?"completada":"pendiente"}`,"success")}catch{this.showToast("Error","No se pudo actualizar el estado","error")}m.hide()}async toggleTaskSubtask(e,a){try{if(await c.toggleSubtask(e,a,this.currentUser.id),!document.getElementById("taskDetailModal").classList.contains("hidden")){const s=(await c.fetchTasks({},this.currentUser.id)).find(r=>r.id===e);s&&this.openTaskDetail(s)}}catch{this.showToast("Error","No se pudo actualizar la subtarea","error")}}async exportTasks(){try{const e=confirm("¿Exportar como JSON? (Cancelar para CSV)")?"json":"csv",a=await c.exportTasks(e,this.currentUser.id),t=document.createElement("a");t.href=a,t.download=`taskflow_export_${new Date().toISOString().split("T")[0]}.${e}`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(a),this.showToast("Exportación exitosa",`Datos exportados como ${e.toUpperCase()}`,"success")}catch{this.showToast("Error de exportación","No se pudieron exportar los datos","error")}}getPriorityColor(e){return{high:"#ef4444",medium:"#f59e0b",low:"#10b981"}[e]||"#64748b"}getPriorityText(e){return{high:"Alta",medium:"Media",low:"Baja"}[e]||e}getDueDateInfo(e){const a=new Date().toISOString().split("T")[0],t=new Date(Date.now()+864e5).toISOString().split("T")[0];return e===a?'<span title="Vence hoy" style="color: #ef4444;"><i class="fas fa-exclamation-circle"></i> Hoy</span>':e===t?'<span title="Vence mañana" style="color: #f59e0b;"><i class="fas fa-clock"></i> Mañana</span>':e<a?'<span title="Vencida" style="color: #dc2626;"><i class="fas fa-exclamation-triangle"></i> Vencida</span>':""}getContrastColor(e){e=e.replace("#","");const a=parseInt(e.substr(0,2),16),t=parseInt(e.substr(2,2),16),s=parseInt(e.substr(4,2),16);return(a*299+t*587+s*114)/1e3>=128?"#000000":"#ffffff"}formatTimeAgo(e){const a=new Date(e),s=new Date-a,r=Math.floor(s/6e4),n=Math.floor(s/36e5),d=Math.floor(s/864e5);return r<1?"ahora":r<60?`hace ${r} min`:n<24?`hace ${n} h`:d<7?`hace ${d} d`:a.toLocaleDateString()}escapeHtml(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}showToast(e,a,t="info"){return D.show(e,a,t,3e3)}}document.addEventListener("DOMContentLoaded",()=>{window.app=new N});
//# sourceMappingURL=index-CDT_URGW.js.map
