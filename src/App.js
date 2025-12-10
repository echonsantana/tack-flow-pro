
/* ===== MODELS (Sin cambios) ===== */
class User {
  constructor({ id, username, email, password, role = 'user', createdAt = null }) {
    this.id = id || User.nextId();
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt || new Date().toISOString();
  }

  static nextId() {
    const raw = localStorage.getItem('sgt_lastUserId') || '0';
    const next = parseInt(raw, 10) + 1;
    localStorage.setItem('sgt_lastUserId', String(next));
    return String(next);
  }

  isAdmin() {
    return this.role === 'admin';
  }
}

class Task {
  constructor({ 
    id, 
    title, 
    description = '', 
    priority = 'medium', 
    category = 'general', 
    dueDate = null, 
    status = 'pending', 
    userId, 
    tags = [], 
    subtasks = [],
    reminder = null,
    createdAt = null, 
    updatedAt = null 
  }) {
    this.id = id || Task.nextId();
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.category = category;
    this.dueDate = dueDate;
    this.status = status;
    this.userId = userId;
    this.tags = tags;
    this.subtasks = subtasks;
    this.reminder = reminder;
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
  }

  static nextId() {
    const raw = localStorage.getItem('sgt_lastTaskId') || '0';
    const next = parseInt(raw, 10) + 1;
    localStorage.setItem('sgt_lastTaskId', String(next));
    return String(next);
  }

  toggleSubtask(subtaskIndex) {
    if (this.subtasks[subtaskIndex]) {
      this.subtasks[subtaskIndex].completed = !this.subtasks[subtaskIndex].completed;
      this.updatedAt = new Date().toISOString();
    }
  }

  getCompletionPercentage() {
    if (!this.subtasks.length) return this.status === 'completed' ? 100 : 0;
    const completed = this.subtasks.filter(st => st.completed).length;
    return Math.round((completed / this.subtasks.length) * 100);
  }
}

class Category {
  constructor({ id, name, color = '#4361ee', userId, createdAt = null }) {
    this.id = id || Category.nextId();
    this.name = name;
    this.color = color;
    this.userId = userId;
    this.createdAt = createdAt || new Date().toISOString();
  }

  static nextId() {
    const raw = localStorage.getItem('sgt_lastCategoryId') || '0';
    const next = parseInt(raw, 10) + 1;
    localStorage.setItem('sgt_lastCategoryId', String(next));
    return String(next);
  }
}

class Tag {
  constructor({ id, name, color = '#4361ee', userId, createdAt = null }) {
    this.id = id || Tag.nextId();
    this.name = name;
    this.color = color;
    this.userId = userId;
    this.createdAt = createdAt || new Date().toISOString();
  }

  static nextId() {
    const raw = localStorage.getItem('sgt_lastTagId') || '0';
    const next = parseInt(raw, 10) + 1;
    localStorage.setItem('sgt_lastTagId', String(next));
    return String(next);
  }
}

class Subtask {
  constructor({ title, completed = false, createdAt = null }) {
    this.id = Date.now() + Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.completed = completed;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

class Notification {
  constructor({ id, title, message, type = 'info', read = false, userId, taskId = null, createdAt = null }) {
    this.id = id || Notification.nextId();
    this.title = title;
    this.message = message;
    this.type = type;
    this.read = read;
    this.userId = userId;
    this.taskId = taskId;
    this.createdAt = createdAt || new Date().toISOString();
  }

  static nextId() {
    const raw = localStorage.getItem('sgt_lastNotificationId') || '0';
    const next = parseInt(raw, 10) + 1;
    localStorage.setItem('sgt_lastNotificationId', String(next));
    return String(next);
  }
}

class ColorSettings {
  constructor({ 
    userId, 
    theme = 'light',
    primaryColor = '#4361ee',
    secondaryColor = '#64748b',
    cardBg = '#ffffff',
    textColor = '#1e293b',
    borderColor = '#e2e8f0',
    appBg = '#f8fafc',
    accentColor = '#4cc9f0'
  }) {
    this.userId = userId;
    this.theme = theme;
    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;
    this.cardBg = cardBg;
    this.textColor = textColor;
    this.borderColor = borderColor;
    this.appBg = appBg;
    this.accentColor = accentColor;
  }
}

/* ===== REPOSITORIES (Sin cambios) ===== */
const Repo = {
  // Keys
  USERS_KEY: 'sgt_users_v2',
  TASKS_KEY: 'sgt_tasks_v2',
  CATEGORIES_KEY: 'sgt_categories_v2',
  TAGS_KEY: 'sgt_tags_v2',
  NOTIFICATIONS_KEY: 'sgt_notifications_v1',
  COLOR_SETTINGS_KEY: 'sgt_color_settings_v2',
  SESSION_KEY: 'sgt_session_v2',
  APP_SETTINGS_KEY: 'sgt_app_settings_v1',

  // Users
  loadUsers() {
    const raw = localStorage.getItem(this.USERS_KEY);
    return raw ? JSON.parse(raw).map(o => new User(o)) : [];
  },
  
  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

  // Tasks
  loadTasks() {
    const raw = localStorage.getItem(this.TASKS_KEY);
    return raw ? JSON.parse(raw).map(o => new Task(o)) : [];
  },
  
  saveTasks(tasks) {
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
  },

  // Categories
  loadCategories() {
    const raw = localStorage.getItem(this.CATEGORIES_KEY);
    return raw ? JSON.parse(raw).map(o => new Category(o)) : [];
  },
  
  saveCategories(categories) {
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(categories));
  },

  // Tags
  loadTags() {
    const raw = localStorage.getItem(this.TAGS_KEY);
    return raw ? JSON.parse(raw).map(o => new Tag(o)) : [];
  },
  
  saveTags(tags) {
    localStorage.setItem(this.TAGS_KEY, JSON.stringify(tags));
  },

  // Notifications
  loadNotifications() {
    const raw = localStorage.getItem(this.NOTIFICATIONS_KEY);
    return raw ? JSON.parse(raw).map(o => new Notification(o)) : [];
  },
  
  saveNotifications(notifications) {
    localStorage.setItem(this.NOTIFICATIONS_KEY, JSON.stringify(notifications));
  },

  // Color Settings
  loadColorSettings() {
    const raw = localStorage.getItem(this.COLOR_SETTINGS_KEY);
    return raw ? JSON.parse(raw) : {};
  },
  
  saveColorSettings(settings) {
    localStorage.setItem(this.COLOR_SETTINGS_KEY, JSON.stringify(settings));
  },

  // App Settings
  loadAppSettings() {
    const raw = localStorage.getItem(this.APP_SETTINGS_KEY);
    return raw ? JSON.parse(raw) : { notificationsEnabled: true, reminderTime: '09:00' };
  },
  
  saveAppSettings(settings) {
    localStorage.setItem(this.APP_SETTINGS_KEY, JSON.stringify(settings));
  },

  // Session
  getSession() {
    const raw = localStorage.getItem(this.SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  
  setSession(user) {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
  },
  
  clearSession() {
    localStorage.removeItem(this.SESSION_KEY);
  },

  // Initialize default admin user
  initDefaultAdmin() {
    const users = this.loadUsers();
    if (users.length === 0) {
      const adminUser = new User({
        username: 'admin',
        email: 'admin@taskflow.com',
        password: 'admin',
        role: 'admin'
      });
      users.push(adminUser);
      this.saveUsers(users);
    }
  }
};

// Initialize default admin on load
Repo.initDefaultAdmin();

/* ===== SERVICES (Sin cambios) ===== */
const AuthService = {
  register(userData) {
    const users = Repo.loadUsers();
    
    // Validate username
    if (users.find(u => u.username === userData.username)) {
      throw new Error('El nombre de usuario ya existe');
    }
    
    // Validate email
    if (users.find(u => u.email === userData.email)) {
      throw new Error('El correo electrónico ya está registrado');
    }

    const user = new User(userData);
    users.push(user);
    Repo.saveUsers(users);
    
    // Create default categories for new user
    const defaultCategories = [
      { name: 'Personal', color: '#4361ee', userId: user.id },
      { name: 'Trabajo', color: '#f72585', userId: user.id },
      { name: 'Estudio', color: '#4cc9f0', userId: user.id },
      { name: 'Hogar', color: '#f8961e', userId: user.id }
    ];
    
    const categories = Repo.loadCategories();
    defaultCategories.forEach(cat => categories.push(new Category(cat)));
    Repo.saveCategories(categories);
    
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };
  },

  login(username, password) {
    const users = Repo.loadUsers();
    const user = users.find(u => u.username === username);
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    if (user.password !== password) {
      throw new Error('Contraseña incorrecta');
    }

    const { password: _, ...userWithoutPassword } = user;
    Repo.setSession(userWithoutPassword);
    return userWithoutPassword;
  },

  logout() {
    Repo.clearSession();
  },

  getCurrentUser() {
    return Repo.getSession();
  },

  updateProfile(userId, updates) {
    const users = Repo.loadUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) throw new Error('Usuario no encontrado');
    
    Object.assign(users[index], updates);
    Repo.saveUsers(users);
    
    // Update session
    const { password: _, ...userWithoutPassword } = users[index];
    Repo.setSession(userWithoutPassword);
    
    return userWithoutPassword;
  }
};

const TaskService = {
  getAll(userId) {
    const tasks = Repo.loadTasks();
    return tasks.filter(t => t.userId === userId);
  },

  create(data, userId) {
    const tasks = Repo.loadTasks();
    const task = new Task({ ...data, userId });
    tasks.unshift(task);
    Repo.saveTasks(tasks);
    
    // Create notification for due dates
    if (task.dueDate) {
      NotificationService.create({
        title: 'Nueva tarea creada',
        message: `"${task.title}" se ha creado con fecha límite ${new Date(task.dueDate).toLocaleDateString()}`,
        type: 'info',
        userId: userId,
        taskId: task.id
      });
    }
    
    return task;
  },

  update(id, fields, userId) {
    const tasks = Repo.loadTasks();
    const index = tasks.findIndex(t => t.id === id && t.userId === userId);
    if (index === -1) throw new Error('Tarea no encontrada');
    
    const oldTask = { ...tasks[index] };
    Object.assign(tasks[index], fields);
    tasks[index].updatedAt = new Date().toISOString();
    Repo.saveTasks(tasks);
    
    // Create notification for status changes
    if (fields.status && fields.status !== oldTask.status) {
      const statusText = fields.status === 'completed' ? 'completada' : 'pendiente';
      NotificationService.create({
        title: 'Tarea actualizada',
        message: `"${tasks[index].title}" ha sido marcada como ${statusText}`,
        type: fields.status === 'completed' ? 'success' : 'info',
        userId: userId,
        taskId: tasks[index].id
      });
    }
    
    return tasks[index];
  },

  delete(id, userId) {
    let tasks = Repo.loadTasks();
    const task = tasks.find(t => t.id === id && t.userId === userId);
    tasks = tasks.filter(t => !(t.id === id && t.userId === userId));
    Repo.saveTasks(tasks);
    
    // Create notification
    if (task) {
      NotificationService.create({
        title: 'Tarea eliminada',
        message: `"${task.title}" ha sido eliminada`,
        type: 'warning',
        userId: userId
      });
    }
  },

  clearAll(userId) {
    let tasks = Repo.loadTasks();
    tasks = tasks.filter(t => t.userId !== userId);
    Repo.saveTasks(tasks);
    
    NotificationService.create({
      title: 'Todas las tareas eliminadas',
      message: 'Se han eliminado todas las tareas',
      type: 'warning',
      userId: userId
    });
  },

  toggleSubtask(taskId, subtaskIndex, userId) {
    const tasks = Repo.loadTasks();
    const index = tasks.findIndex(t => t.id === taskId && t.userId === userId);
    if (index === -1) throw new Error('Tarea no encontrada');
    
    tasks[index].toggleSubtask(subtaskIndex);
    Repo.saveTasks(tasks);
    
    return tasks[index];
  },

  getStats(userId) {
    const tasks = this.getAll(userId);
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const today = new Date().toISOString().split('T')[0];
    const dueToday = tasks.filter(t => t.dueDate === today).length;
    
    return { total, completed, pending, dueToday };
  }
};

const CategoryService = {
  getAll(userId) {
    const categories = Repo.loadCategories();
    return categories.filter(c => c.userId === userId);
  },

  create(data, userId) {
    const categories = Repo.loadCategories();
    const category = new Category({ ...data, userId });
    categories.push(category);
    Repo.saveCategories(categories);
    return category;
  },

  update(id, fields, userId) {
    const categories = Repo.loadCategories();
    const index = categories.findIndex(c => c.id === id && c.userId === userId);
    if (index === -1) throw new Error('Categoría no encontrada');
    
    Object.assign(categories[index], fields);
    Repo.saveCategories(categories);
    return categories[index];
  },

  delete(id, userId) {
    let categories = Repo.loadCategories();
    categories = categories.filter(c => !(c.id === id && c.userId === userId));
    Repo.saveCategories(categories);
    
    // Update tasks using this category
    const tasks = Repo.loadTasks();
    tasks.forEach(task => {
      if (task.category === id && task.userId === userId) {
        task.category = 'general';
      }
    });
    Repo.saveTasks(tasks);
  },

  getWithCount(userId) {
    const categories = this.getAll(userId);
    const tasks = TaskService.getAll(userId);
    
    return categories.map(category => ({
      ...category,
      count: tasks.filter(t => t.category === category.id).length
    }));
  }
};

const TagService = {
  getAll(userId) {
    const tags = Repo.loadTags();
    return tags.filter(t => t.userId === userId);
  },

  create(data, userId) {
    const tags = Repo.loadTags();
    
    // Check for duplicate tag name
    const existingTag = tags.find(t => 
      t.name.toLowerCase() === data.name.toLowerCase() && t.userId === userId
    );
    if (existingTag) {
      throw new Error('Ya existe una etiqueta con este nombre');
    }
    
    const tag = new Tag({ ...data, userId });
    tags.push(tag);
    Repo.saveTags(tags);
    return tag;
  },

  update(id, fields, userId) {
    const tags = Repo.loadTags();
    const index = tags.findIndex(t => t.id === id && t.userId === userId);
    if (index === -1) throw new Error('Etiqueta no encontrada');
    
    Object.assign(tags[index], fields);
    Repo.saveTags(tags);
    return tags[index];
  },

  delete(id, userId) {
    let tags = Repo.loadTags();
    tags = tags.filter(t => !(t.id === id && t.userId === userId));
    Repo.saveTags(tags);
    
    // Remove tag from tasks
    const tasks = Repo.loadTasks();
    tasks.forEach(task => {
      if (task.tags && task.tags.includes(id) && task.userId === userId) {
        task.tags = task.tags.filter(tagId => tagId !== id);
      }
    });
    Repo.saveTasks(tasks);
  }
};

const NotificationService = {
  getAll(userId) {
    const notifications = Repo.loadNotifications();
    return notifications.filter(n => n.userId === userId);
  },

  create(data) {
  const notifications = Repo.loadNotifications();
  const notification = new Notification(data);
  notifications.unshift(notification);
  Repo.saveNotifications(notifications);
  
  // ⛔️⛔️⛔️ ELIMINAR ESTO COMPLETAMENTE ⛔️⛔️⛔️
  // NO mostrar toast automáticamente
  
  // ✅ Solo actualizar el badge si la app está cargada
  if (window.app && window.app.currentUser && data.userId === window.app.currentUser.id) {
    // Actualizar badge asíncronamente para no bloquear
    setTimeout(() => {
      if (window.app && window.app.updateNotificationBadge) {
        window.app.updateNotificationBadge();
      }
    }, 100);
  }
  
  return notification;
},

  markAsRead(id, userId) {
    const notifications = Repo.loadNotifications();
    const index = notifications.findIndex(n => n.id === id && n.userId === userId);
    if (index === -1) return;
    
    notifications[index].read = true;
    Repo.saveNotifications(notifications);
  },

  markAllAsRead(userId) {
    const notifications = Repo.loadNotifications();
    notifications.forEach(n => {
      if (n.userId === userId && !n.read) {
        n.read = true;
      }
    });
    Repo.saveNotifications(notifications);
  },

  delete(id, userId) {
    let notifications = Repo.loadNotifications();
    notifications = notifications.filter(n => !(n.id === id && n.userId === userId));
    Repo.saveNotifications(notifications);
  },

  getUnreadCount(userId) {
    const notifications = this.getAll(userId);
    return notifications.filter(n => !n.read).length;
  },

  checkDueTasks(userId) {
    const tasks = TaskService.getAll(userId);
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    
    // Check for tasks due today
    const dueToday = tasks.filter(t => t.dueDate === today && t.status === 'pending');
    dueToday.forEach(task => {
      this.create({
        title: 'Tarea vence hoy',
        message: `"${task.title}" vence hoy`,
        type: 'warning',
        userId: userId,
        taskId: task.id
      });
    });
    
    // Check for tasks due tomorrow
    const dueTomorrow = tasks.filter(t => t.dueDate === tomorrow && t.status === 'pending');
    dueTomorrow.forEach(task => {
      this.create({
        title: 'Tarea vence mañana',
        message: `"${task.title}" vence mañana`,
        type: 'info',
        userId: userId,
        taskId: task.id
      });
    });
  }
};

const ColorService = {
  getSettings(userId) {
    const allSettings = Repo.loadColorSettings();
    return allSettings[userId] || new ColorSettings({ userId });
  },

  saveSettings(userId, settings) {
    const allSettings = Repo.loadColorSettings();
    allSettings[userId] = settings;
    Repo.saveColorSettings(allSettings);
  },

  applyTheme(settings) {
    const root = document.documentElement;
    
    // Apply CSS variables
    root.style.setProperty('--primary-color', settings.primaryColor);
    root.style.setProperty('--secondary-color', settings.secondaryColor);
    root.style.setProperty('--card-bg', settings.cardBg);
    root.style.setProperty('--bg-color', settings.appBg);
    root.style.setProperty('--text-primary', settings.textColor);
    root.style.setProperty('--border-color', settings.borderColor);
    
    // Set theme attribute
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    // Update primary color in meta tag for browser UI
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', settings.primaryColor);
    }
  },

  getPreset(presetName) {
    const presets = {
      default: new ColorSettings({ userId: '' }),
      dark: new ColorSettings({
        userId: '',
        theme: 'dark',
        primaryColor: '#60a5fa',
        secondaryColor: '#94a3b8',
        cardBg: '#1e293b',
        textColor: '#f1f5f9',
        borderColor: '#334155',
        appBg: '#0f172a',
        accentColor: '#38bdf8'
      }),
      warm: new ColorSettings({
        userId: '',
        primaryColor: '#ea580c',
        secondaryColor: '#9a3412',
        cardBg: '#fef7ed',
        textColor: '#431407',
        borderColor: '#fdba74',
        appBg: '#fffbeb',
        accentColor: '#f97316'
      }),
      cool: new ColorSettings({
        userId: '',
        primaryColor: '#0ea5e9',
        secondaryColor: '#0369a1',
        cardBg: '#f0f9ff',
        textColor: '#0c4a6e',
        borderColor: '#7dd3fc',
        appBg: '#f0fdfa',
        accentColor: '#22d3ee'
      }),
      professional: new ColorSettings({
        userId: '',
        primaryColor: '#2563eb',
        secondaryColor: '#475569',
        cardBg: '#ffffff',
        textColor: '#1e293b',
        borderColor: '#e2e8f0',
        appBg: '#f8fafc',
        accentColor: '#3b82f6'
      })
    };
    return presets[presetName] || presets.default;
  }
};

const AppSettingsService = {
  getSettings() {
    return Repo.loadAppSettings();
  },

  saveSettings(settings) {
    Repo.saveAppSettings(settings);
  },

  updateSettings(updates) {
    const settings = this.getSettings();
    Object.assign(settings, updates);
    this.saveSettings(settings);
    return settings;
  }
};

/* ===== API LAYER (Sin cambios) ===== */
const API = {
  // Authentication
  async register(userData) {
    try {
      const user = AuthService.register(userData);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async login(username, password) {
    try {
      const user = AuthService.login(username, password);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  logout() {
    AuthService.logout();
    return Promise.resolve();
  },

  getCurrentUser() {
    return Promise.resolve(AuthService.getCurrentUser());
  },

  // Tasks
  async fetchTasks(filters = {}, userId) {
    let tasks = TaskService.getAll(userId);
    
    // Apply filters
    if (filters.status && filters.status !== 'all') {
      tasks = tasks.filter(t => t.status === filters.status);
    }
    
    if (filters.priority && filters.priority !== 'all') {
      tasks = tasks.filter(t => t.priority === filters.priority);
    }
    
    if (filters.category && filters.category !== 'all') {
      tasks = tasks.filter(t => t.category === filters.category);
    }
    
    if (filters.tag && filters.tag !== 'all') {
      tasks = tasks.filter(t => t.tags && t.tags.includes(filters.tag));
    }
    
    if (filters.dueDate) {
      tasks = tasks.filter(t => t.dueDate === filters.dueDate);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      tasks = tasks.filter(t => 
        t.title.toLowerCase().includes(searchTerm) || 
        (t.description && t.description.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply sorting
    if (filters.sortBy === 'dueDate') {
      tasks.sort((a, b) => new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31'));
    } else if (filters.sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else {
      tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    return tasks;
  },

  createTask(data, userId) {
    return Promise.resolve(TaskService.create(data, userId));
  },

  updateTask(id, fields, userId) {
    return Promise.resolve(TaskService.update(id, fields, userId));
  },

  deleteTask(id, userId) {
    return Promise.resolve(TaskService.delete(id, userId));
  },

  clearAllTasks(userId) {
    TaskService.clearAll(userId);
    return Promise.resolve();
  },

  toggleSubtask(taskId, subtaskIndex, userId) {
    return Promise.resolve(TaskService.toggleSubtask(taskId, subtaskIndex, userId));
  },

  getTaskStats(userId) {
    return Promise.resolve(TaskService.getStats(userId));
  },

  // Categories
  fetchCategories(userId) {
    return Promise.resolve(CategoryService.getAll(userId));
  },

  fetchCategoriesWithCount(userId) {
    return Promise.resolve(CategoryService.getWithCount(userId));
  },

  createCategory(data, userId) {
    return Promise.resolve(CategoryService.create(data, userId));
  },

  updateCategory(id, fields, userId) {
    return Promise.resolve(CategoryService.update(id, fields, userId));
  },

  deleteCategory(id, userId) {
    return Promise.resolve(CategoryService.delete(id, userId));
  },

  // Tags
  fetchTags(userId) {
    return Promise.resolve(TagService.getAll(userId));
  },

  createTag(data, userId) {
    return Promise.resolve(TagService.create(data, userId));
  },

  updateTag(id, fields, userId) {
    return Promise.resolve(TagService.update(id, fields, userId));
  },

  deleteTag(id, userId) {
    return Promise.resolve(TagService.delete(id, userId));
  },

  // Notifications
  fetchNotifications(userId) {
    return Promise.resolve(NotificationService.getAll(userId));
  },

  markNotificationAsRead(id, userId) {
    return Promise.resolve(NotificationService.markAsRead(id, userId));
  },

  markAllNotificationsAsRead(userId) {
    return Promise.resolve(NotificationService.markAllAsRead(userId));
  },

  deleteNotification(id, userId) {
    return Promise.resolve(NotificationService.delete(id, userId));
  },

  getUnreadNotificationCount(userId) {
    return Promise.resolve(NotificationService.getUnreadCount(userId));
  },

  // Color Settings
  getColorSettings(userId) {
    return Promise.resolve(ColorService.getSettings(userId));
  },

  saveColorSettings(userId, settings) {
    ColorService.saveSettings(userId, settings);
    ColorService.applyTheme(settings);
    return Promise.resolve();
  },

  // App Settings
  getAppSettings() {
    return Promise.resolve(AppSettingsService.getSettings());
  },

  saveAppSettings(settings) {
    return Promise.resolve(AppSettingsService.saveSettings(settings));
  },

  // Export
  exportTasks(format = 'json', userId) {
    const tasks = TaskService.getAll(userId);
    const categories = CategoryService.getAll(userId);
    const tags = TagService.getAll(userId);
    
    const data = {
      tasks,
      categories,
      tags,
      exportedAt: new Date().toISOString(),
      version: '2.0',
      app: 'TaskFlow Pro'
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      return Promise.resolve(URL.createObjectURL(blob));
    } else if (format === 'csv') {
      const headers = ['ID', 'Título', 'Descripción', 'Prioridad', 'Categoría', 'Estado', 'Fecha Límite', 'Etiquetas', 'Creado', 'Actualizado'];
      const csvRows = [
        headers.join(','),
        ...tasks.map(t => [
          t.id,
          `"${t.title.replace(/"/g, '""')}"`,
          `"${(t.description || '').replace(/"/g, '""')}"`,
          t.priority,
          t.category,
          t.status,
          t.dueDate || '',
          t.tags ? `"${t.tags.join(';')}"` : '',
          t.createdAt,
          t.updatedAt
        ].join(','))
      ];
      const csv = csvRows.join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      return Promise.resolve(URL.createObjectURL(blob));
    }
  }
};

/* ===== UI COMPONENTS ===== */
class ToastManager {
  static show(title, message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    }[type] || 'fas fa-info-circle';
    
    toast.innerHTML = `
      <i class="${icon}"></i>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    container.appendChild(toast);
    
    // Remove toast after duration
    const removeToast = () => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(100%)';
      setTimeout(() => {
        if (toast.parentElement) {
          toast.remove();
        }
      }, 300);
    };
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', removeToast);
    
    // Auto remove
    if (duration > 0) {
      setTimeout(removeToast, duration);
    }
    
    return toast;
  }
}

class LoadingManager {
  static show() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
      spinner.style.opacity = '0';
      spinner.classList.remove('hidden');
      setTimeout(() => spinner.style.opacity = '1', 10);
    }
  }
  
  static hide() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
      spinner.style.opacity = '0';
      setTimeout(() => spinner.classList.add('hidden'), 300);
    }
  }
}

/* ===== MAIN APP CLASS CON MEJORAS ===== */
class App {
  constructor() {
    this.currentUser = null;
    this.categories = [];
    this.tags = [];
    this.notifications = [];
    this.currentTaskTags = [];
    this.currentTaskSubtasks = [];
    this.colorSettings = null;
    this.appSettings = null;
    this.viewMode = 'grid';
    this.init();
  }

  async init() {
    LoadingManager.show();
    
    // Initialize app
    await this.checkAuth();
    await this.loadAppSettings();
    this.setupEventListeners();
    
    // Nuevas características UX
    this.setupKeyboardShortcuts();
    this.createQuickActions();
    this.loadViewPreferences();
    
    // Check for due tasks notifications
    if (this.currentUser) {
      NotificationService.checkDueTasks(this.currentUser.id);
    }
    
    LoadingManager.hide();
  }

  // NUEVO: Cargar preferencias de vista
  async loadViewPreferences() {
    const prefs = JSON.parse(localStorage.getItem('taskflow_view_prefs') || '{}');
    this.viewMode = prefs.viewMode || 'grid';
    this.setViewMode(this.viewMode);
  }

  // NUEVO: Configurar atajos de teclado
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        this.openNewTask();
      }
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        document.getElementById('search')?.focus();
      }
      if (e.key === 'Escape') {
        this.hideModal();
        this.closeTaskDetail();
      }
      // Alt + N para notificaciones
      if (e.altKey && e.key === 'n') {
        e.preventDefault();
        this.toggleNotifications();
      }
    });
  }

  // NUEVO: Crear acciones rápidas flotantes
  createQuickActions() {
    const quickActions = document.createElement('div');
    quickActions.className = 'quick-actions';
    quickActions.innerHTML = `
      <button class="quick-action-btn" title="Nueva tarea" id="quickActionNewTask">
        <i class="fas fa-plus"></i>
      </button>
      <button class="quick-action-btn" title="Filtros rápidos" id="quickActionFilter">
        <i class="fas fa-filter"></i>
      </button>
      <button class="quick-action-btn" title="Buscar" id="quickActionSearch">
        <i class="fas fa-search"></i>
      </button>
    `;
    document.body.appendChild(quickActions);
    
    // Event listeners para quick actions
    document.getElementById('quickActionNewTask').addEventListener('click', () => this.openNewTask());
    document.getElementById('quickActionFilter').addEventListener('click', () => {
      document.querySelector('.filters-panel')?.scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('quickActionSearch').addEventListener('click', () => {
      document.getElementById('search')?.focus();
    });
  }

  async checkAuth() {
    this.currentUser = await API.getCurrentUser();
    if (this.currentUser) {
      await this.initializeApp();
    } else {
      this.showLogin();
    }
  }

  async initializeApp() {
    this.showApp();
    
    // Load user data
    await Promise.all([
      this.loadCategories(),
      this.loadTags(),
      this.loadNotifications(),
      this.loadUserColors()
    ]);
    
    // Update stats
    await this.updateStats();
    
    // Load tasks
    await this.refresh();
    
    // Apply theme
    this.applyTheme();
    
    // Schedule next notification check
    setTimeout(() => {
      if (this.currentUser) {
        NotificationService.checkDueTasks(this.currentUser.id);
      }
    }, 60000);
  }

  async loadAppSettings() {
    this.appSettings = await API.getAppSettings();
  }

  async loadCategories() {
    this.categories = await API.fetchCategories(this.currentUser.id);
    await this.renderCategorySidebar();
    this.renderCategoryFilters();
  }

  async loadTags() {
    this.tags = await API.fetchTags(this.currentUser.id);
    this.renderTagFilters();
  }

  async loadNotifications() {
    this.notifications = await API.fetchNotifications(this.currentUser.id);
    this.updateNotificationBadge();
    this.renderNotifications();
  }

  async loadUserColors() {
    this.colorSettings = await API.getColorSettings(this.currentUser.id);
  }

  async updateStats() {
    if (!this.currentUser) return;
    
    const stats = await API.getTaskStats(this.currentUser.id);
    
    document.getElementById('pendingCount').textContent = stats.pending;
    document.getElementById('completedCount').textContent = stats.completed;
    document.getElementById('todayCount').textContent = stats.dueToday;
    
    // Update completion progress
    const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
    const progressCircle = document.getElementById('completionProgress');
    if (progressCircle) {
      progressCircle.style.background = `conic-gradient(var(--primary-color) 0% ${completionRate}%, var(--border-color) ${completionRate}% 100%)`;
      progressCircle.querySelector('.progress-value').textContent = `${completionRate}%`;
    }
  }

  async updateNotificationBadge() {
    const count = await API.getUnreadNotificationCount(this.currentUser.id);
    const badge = document.getElementById('notificationCount');
    
    if (count > 0) {
      badge.textContent = count > 9 ? '9+' : count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  applyTheme() {
    if (this.colorSettings) {
      ColorService.applyTheme(this.colorSettings);
    }
  }

  // UI Navigation
  showLogin() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('registerScreen').classList.add('hidden');
    document.getElementById('app').classList.add('hidden');
    document.querySelector('.quick-actions')?.classList.add('hidden');
  }

  showRegister() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('registerScreen').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
    document.querySelector('.quick-actions')?.classList.add('hidden');
  }

  showApp() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('registerScreen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    document.querySelector('.quick-actions')?.classList.remove('hidden');
    
    // Update user info
    document.getElementById('userWelcome').textContent = this.currentUser.username;
    document.getElementById('dropdownUsername').textContent = this.currentUser.username;
    document.getElementById('dropdownEmail').textContent = this.currentUser.email;
  }

  // Event Listeners - MEJORADOS con nuevas características
  setupEventListeners() {
    // Auth events
    document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
    document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));
    document.getElementById('showRegister').addEventListener('click', (e) => { 
    e.preventDefault(); 
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('registerScreen').classList.remove('hidden');
});
    document.getElementById('showLogin').addEventListener('click', (e) => { e.preventDefault(); this.showLogin(); });
    
    // Header actions
    document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
    document.getElementById('notificationBtn').addEventListener('click', () => this.toggleNotifications());
    document.getElementById('quickTaskBtn').addEventListener('click', () => this.openNewTask());
    document.getElementById('userMenuBtn').addEventListener('click', () => this.toggleUserDropdown());
    document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
    
    // Task actions
    document.getElementById('newTaskBtn').addEventListener('click', () => this.openNewTask());
    document.getElementById('exportBtn').addEventListener('click', () => this.exportTasks());
    
    // Filters
    document.getElementById('search').addEventListener('input', () => this.debouncedRefresh());
    document.getElementById('searchBtn').addEventListener('click', () => this.refresh());
    document.getElementById('clearSearch').addEventListener('click', () => {
      document.getElementById('search').value = '';
      this.refresh();
    });
    
    document.getElementById('search').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.refresh();
      }
    });
    
    ['filterStatus', 'filterPriority', 'filterCategory', 'filterTags', 'filterDate'].forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('change', () => this.refresh());
      }
    });
    
    document.getElementById('clearFilters').addEventListener('click', () => this.clearFilters());
    
    // View controls
    document.getElementById('viewGrid').addEventListener('click', () => this.setViewMode('grid'));
    document.getElementById('viewList').addEventListener('click', () => this.setViewMode('list'));
    document.getElementById('sortTasks').addEventListener('click', () => this.showSortOptions());
    
    // Category sidebar
    document.getElementById('addCategoryBtn').addEventListener('click', () => this.openCategoryModal());
    
    // Modals
    document.getElementById('cancelBtn').addEventListener('click', () => this.hideModal());
    document.getElementById('cancelBtn2').addEventListener('click', () => this.hideModal());
    document.getElementById('taskForm').addEventListener('submit', (e) => this.handleTaskSubmit(e));
    document.getElementById('deleteTaskBtn').addEventListener('click', () => this.deleteCurrentTask());
    
    // Tag system
    document.getElementById('tagInput').addEventListener('input', (e) => this.showTagSuggestions(e));
    document.getElementById('tagInput').addEventListener('keydown', (e) => this.handleTagInput(e));
    document.getElementById('showTagsManager').addEventListener('click', () => this.openTagsModal());
    
    // Subtasks
    document.getElementById('addSubtaskBtn').addEventListener('click', () => this.addSubtask());
    document.getElementById('subtaskInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.addSubtask();
      }
    });
    
    // Priority selector
    document.querySelectorAll('.priority-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.priority-option').forEach(b => b.classList.remove('active'));
        e.target.closest('.priority-option').classList.add('active');
        document.getElementById('priority').value = e.target.closest('.priority-option').dataset.value;
      });
    });
    
    // Task detail
    document.getElementById('closeTaskDetail').addEventListener('click', () => this.closeTaskDetail());
    document.getElementById('taskDetailModal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('taskDetailModal')) {
        this.closeTaskDetail();
      }
    });
    
    // Color settings
    document.getElementById('colorSettingsBtn').addEventListener('click', () => this.openColorSettings());
    document.getElementById('saveColorsBtn').addEventListener('click', () => this.saveColorSettings());
    document.getElementById('cancelColorsBtn').addEventListener('click', () => {
      if (this.colorSettings) {
        ColorService.applyTheme(this.colorSettings);
      }
      document.getElementById('colorSettingsModal').classList.add('hidden');
    });
    document.getElementById('resetColorsBtn').addEventListener('click', () => this.resetColors());
    
    // Color preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const presetName = e.target.closest('.preset-btn').dataset.preset;
        this.applyColorPreset(presetName);
      });
    });
    
    // Real-time color preview
    ['primaryColor', 'secondaryColor', 'cardBgColor', 'appBgColor'].forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('input', (e) => {
          this.previewColorChange(e.target.id, e.target.value);
        });
      }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.user-menu')) {
        document.getElementById('userDropdown').classList.add('hidden');
      }
      if (!e.target.closest('.notification-center') && !e.target.closest('#notificationBtn')) {
        document.getElementById('notificationCenter').classList.add('hidden');
      }
    });
    
    // Close notifications panel
    const closeNotificationsBtn = document.getElementById('closeNotifications');
    if (closeNotificationsBtn) {
      closeNotificationsBtn.addEventListener('click', () => {
        document.getElementById('notificationCenter').classList.add('hidden');
      });
    }
    
    // Close tags modal
    document.getElementById('closeTagsModal').addEventListener('click', () => {
      document.getElementById('tagsModal').classList.add('hidden');
    });
    
    // Add tag button
    document.getElementById('addTagBtn').addEventListener('click', () => this.addNewTag());
    
    // Close category modal
    document.getElementById('closeCategoryModal').addEventListener('click', () => {
      document.getElementById('categoryModal').classList.add('hidden');
    });
    
    // Add category button in modal
    const addCategoryBtnModal = document.getElementById('addCategoryBtnModal');
    if (addCategoryBtnModal) {
      addCategoryBtnModal.addEventListener('click', () => this.addNewCategory());
    }
    
    // Manage tags button in dropdown
    document.getElementById('manageTagsBtn').addEventListener('click', () => this.openTagsModal());
    
    // NUEVO: Guardar preferencias de vista al cambiar
    document.getElementById('viewGrid').addEventListener('click', () => {
      this.saveViewPreference('viewMode', 'grid');
    });
    
    document.getElementById('viewList').addEventListener('click', () => {
      this.saveViewPreference('viewMode', 'list');
    });
  }

  // NUEVO: Guardar preferencias
  saveViewPreference(key, value) {
    const prefs = JSON.parse(localStorage.getItem('taskflow_view_prefs') || '{}');
    prefs[key] = value;
    localStorage.setItem('taskflow_view_prefs', JSON.stringify(prefs));
  }

  // Debounce function for search
  debouncedRefresh = this.debounce(() => this.refresh(), 300);

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Auth Handlers
  async handleLogin(e) {
    e.preventDefault();
    LoadingManager.show();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const result = await API.login(username, password);
    if (result.success) {
      this.currentUser = result.user;
      await this.initializeApp();
      this.showToast('¡Bienvenido!', `Hola ${this.currentUser.username}`, 'success');
    } else {
      this.showToast('Error de inicio de sesión', result.error, 'error');
    }
    
    LoadingManager.hide();
  }

  async handleRegister(e) {
    e.preventDefault();
    LoadingManager.show();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirmPassword) {
      this.showToast('Error de registro', 'Las contraseñas no coinciden', 'error');
      LoadingManager.hide();
      return;
    }
    
    const result = await API.register({ username, email, password });
    if (result.success) {
      this.showToast('¡Cuenta creada!', 'Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.', 'success');
      
      // Limpiar el formulario
      document.getElementById('registerForm').reset();
      
      // Mostrar pantalla de login
      this.showLogin();
    } else {
      this.showToast('Error de registro', result.error, 'error');
    }
    
    LoadingManager.hide();
  }

  async logout() {
    await API.logout();
    this.currentUser = null;
    this.showLogin();
    this.showToast('Sesión cerrada', 'Has cerrado sesión correctamente', 'info');
  }

  toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('hidden');
  }

  // Task Management
  async openNewTask() {
    document.getElementById('modalTitle').innerHTML = '<i class="fas fa-tasks"></i> Nueva Tarea';
    document.getElementById('taskForm').reset();
    document.getElementById('taskId').value = '';
    document.getElementById('category').value = 'general';
    document.getElementById('priority').value = 'medium';
    document.getElementById('reminder').value = 'none';
    
    // Reset priority selector
    document.querySelectorAll('.priority-option').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.value === 'medium') {
        btn.classList.add('active');
      }
    });
    
    // Clear tags and subtasks
    this.currentTaskTags = [];
    this.currentTaskSubtasks = [];
    this.renderTaskTags();
    this.renderSubtasks();
    
    // Hide delete button for new tasks
    document.getElementById('deleteTaskBtn').classList.add('hidden');
    
    this.showModal();
  }

  async openEditTask(task) {
    document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit"></i> Editar Tarea';
    document.getElementById('taskId').value = task.id;
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description || '';
    document.getElementById('priority').value = task.priority || 'medium';
    document.getElementById('category').value = task.category || 'general';
    document.getElementById('dueDate').value = task.dueDate || '';
    document.getElementById('reminder').value = task.reminder || 'none';
    
    // Update priority selector
    document.querySelectorAll('.priority-option').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.value === (task.priority || 'medium')) {
        btn.classList.add('active');
      }
    });
    
    // Load tags and subtasks
    this.currentTaskTags = task.tags || [];
    this.currentTaskSubtasks = task.subtasks || [];
    this.renderTaskTags();
    this.renderSubtasks();
    
    // Show delete button for existing tasks
    document.getElementById('deleteTaskBtn').classList.remove('hidden');
    
    this.showModal();
  }

  showModal() {
    document.getElementById('modal').classList.remove('hidden');
  }

  hideModal() {
    document.getElementById('modal').classList.add('hidden');
  }

  async handleTaskSubmit(e) {
    e.preventDefault();
    LoadingManager.show();
    
    const id = document.getElementById('taskId').value;
    const data = {
      title: document.getElementById('title').value.trim(),
      description: document.getElementById('description').value.trim(),
      priority: document.getElementById('priority').value,
      category: document.getElementById('category').value,
      dueDate: document.getElementById('dueDate').value || null,
      reminder: document.getElementById('reminder').value !== 'none' ? document.getElementById('reminder').value : null,
      tags: this.currentTaskTags,
      subtasks: this.currentTaskSubtasks
    };
    
    if (!data.title) {
      this.showToast('Error', 'El título es obligatorio', 'error');
      LoadingManager.hide();
      return;
    }
    
    try {
      if (id) {
        await API.updateTask(id, data, this.currentUser.id);
        this.showToast('Tarea actualizada', 'La tarea se ha actualizado correctamente', 'success');
      } else {
        await API.createTask(data, this.currentUser.id);
        this.showToast('Tarea creada', 'La tarea se ha creado correctamente', 'success');
      }
      
      this.hideModal();
      await this.refresh();
      await this.updateStats();
    } catch (error) {
      this.showToast('Error', 'No se pudo guardar la tarea', 'error');
    }
    
    LoadingManager.hide();
  }

  // MODIFICADO: Reemplazar prompt por modal
  async deleteCurrentTask() {
    const taskId = document.getElementById('taskId').value;
    const taskTitle = document.getElementById('title').value;
    
    if (!taskId) return;
    
    // Mostrar modal de confirmación en lugar de prompt
    this.showDeleteConfirmation(taskId, taskTitle, true); // true indica que es del modal de edición
  }

  // NUEVO: Mostrar modal de confirmación para eliminar
  showDeleteConfirmation(taskId, taskTitle = 'esta tarea', fromModal = false) {
    // Crear modal de confirmación
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
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
    `;
    
    modal.innerHTML = `
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
            Se eliminará permanentemente la tarea: <strong>"${this.escapeHtml(taskTitle)}"</strong>.
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
    `;
    
    document.body.appendChild(modal);
    
    // Estilos para animaciones
    const style = document.createElement('style');
    style.textContent = `
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
    `;
    document.head.appendChild(style);
    
    // Eventos del modal
    const cancelBtn = document.getElementById('cancelDeleteBtn');
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    
    const closeModal = () => {
      document.body.removeChild(modal);
      document.head.removeChild(style);
    };
    
    cancelBtn.addEventListener('click', closeModal);
    
    confirmBtn.addEventListener('click', async () => {
      closeModal();
      
      LoadingManager.show();
      
      try {
        await API.deleteTask(taskId, this.currentUser.id);
        this.showToast('Tarea eliminada', 'La tarea se ha eliminado correctamente', 'info');
        
        // Si estamos en el modal de edición, cerrarlo
        if (fromModal) {
          this.hideModal();
        }
        
        await this.refresh();
        await this.updateStats();
      } catch (error) {
        this.showToast('Error', 'No se pudo eliminar la tarea', 'error');
      }
      
      LoadingManager.hide();
    });
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // MODIFICADO: Reemplazar prompt por modal
  async deleteTask(taskId) {
    // Obtener título de la tarea para mostrarlo en el modal
    const tasks = await API.fetchTasks({}, this.currentUser.id);
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
      this.showDeleteConfirmation(taskId, task.title, false);
    }
  }

  // Tag System
  handleTagInput(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        this.addTagToTask(value);
        e.target.value = '';
        this.hideTagSuggestions();
      }
    }
  }

  showTagSuggestions(e) {
    const value = e.target.value.trim();
    const suggestions = document.getElementById('tagSuggestions');
    
    if (!value) {
      this.hideTagSuggestions();
      return;
    }
    
    const matchingTags = this.tags.filter(tag => 
      tag.name.toLowerCase().includes(value.toLowerCase()) &&
      !this.currentTaskTags.includes(tag.id)
    );
    
    suggestions.innerHTML = '';
    suggestions.classList.remove('hidden');
    
    // Existing tag suggestions
    matchingTags.forEach(tag => {
      const suggestion = document.createElement('div');
      suggestion.className = 'tag-suggestion';
      suggestion.innerHTML = `
        <span class="tag-color-preview" style="background-color: ${tag.color}; width: 12px; height: 12px; border-radius: 50%; display: inline-block; margin-right: 8px;"></span>
        ${tag.name}
      `;
      suggestion.onclick = () => {
        this.addTagToTask(tag.id);
        e.target.value = '';
        this.hideTagSuggestions();
      };
      suggestions.appendChild(suggestion);
    });
    
    // Create new tag option
    const createSuggestion = document.createElement('div');
    createSuggestion.className = 'tag-suggestion';
    createSuggestion.innerHTML = `+ Crear "${value}"`;
    createSuggestion.onclick = async () => {
      try {
        const newTag = await API.createTag({ name: value }, this.currentUser.id);
        this.tags.push(newTag);
        this.addTagToTask(newTag.id);
        e.target.value = '';
        this.hideTagSuggestions();
        this.renderTagFilters();
        this.showToast('Etiqueta creada', 'La etiqueta se ha creado y añadido a la tarea', 'success');
      } catch (error) {
        this.showToast('Error', error.message, 'error');
      }
    };
    suggestions.appendChild(createSuggestion);
  }

  hideTagSuggestions() {
    const suggestions = document.getElementById('tagSuggestions');
    if (suggestions) {
      suggestions.classList.add('hidden');
    }
  }

  addTagToTask(tagIdentifier) {
    if (typeof tagIdentifier === 'string') {
      // Find existing tag
      const existingTag = this.tags.find(t => t.name.toLowerCase() === tagIdentifier.toLowerCase());
      if (existingTag) {
        if (!this.currentTaskTags.includes(existingTag.id)) {
          this.currentTaskTags.push(existingTag.id);
        }
      } else {
        // Create new tag
        API.createTag({ name: tagIdentifier }, this.currentUser.id)
          .then(newTag => {
            this.tags.push(newTag);
            this.currentTaskTags.push(newTag.id);
            this.renderTaskTags();
            this.renderTagFilters();
            this.showToast('Etiqueta creada', 'La etiqueta se ha creado y añadido a la tarea', 'success');
          })
          .catch(error => {
            this.showToast('Error', error.message, 'error');
          });
        return;
      }
    } else {
      // Add tag by ID
      if (!this.currentTaskTags.includes(tagIdentifier)) {
        this.currentTaskTags.push(tagIdentifier);
      }
    }
    
    this.renderTaskTags();
  }

  removeTagFromTask(tagId) {
    this.currentTaskTags = this.currentTaskTags.filter(id => id !== tagId);
    this.renderTaskTags();
  }

  renderTaskTags() {
    const container = document.getElementById('tagsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    this.currentTaskTags.forEach(tagId => {
      const tag = this.tags.find(t => t.id === tagId);
      if (tag) {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.style.backgroundColor = tag.color;
        tagElement.style.color = this.getContrastColor(tag.color);
        tagElement.innerHTML = `
          ${tag.name}
          <button class="tag-remove" onclick="app.removeTagFromTask('${tag.id}')">
            <i class="fas fa-times"></i>
          </button>
        `;
        container.appendChild(tagElement);
      }
    });
  }

  // Subtask System
  addSubtask() {
    const input = document.getElementById('subtaskInput');
    if (!input) return;
    
    const title = input.value.trim();
    
    if (!title) return;
    
    this.currentTaskSubtasks.push({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    });
    
    input.value = '';
    this.renderSubtasks();
  }

  removeSubtask(index) {
    this.currentTaskSubtasks.splice(index, 1);
    this.renderSubtasks();
  }

  toggleSubtask(index) {
    if (this.currentTaskSubtasks[index]) {
      this.currentTaskSubtasks[index].completed = !this.currentTaskSubtasks[index].completed;
      this.renderSubtasks();
    }
  }

  renderSubtasks() {
    const container = document.getElementById('subtasksList');
    if (!container) return;
    
    container.innerHTML = '';
    
    this.currentTaskSubtasks.forEach((subtask, index) => {
      const subtaskItem = document.createElement('div');
      subtaskItem.className = `subtask-item ${subtask.completed ? 'completed' : ''}`;
      subtaskItem.innerHTML = `
        <input type="checkbox" class="subtask-checkbox" ${subtask.completed ? 'checked' : ''} 
               onchange="app.toggleSubtask(${index})">
        <span class="subtask-text">${subtask.title}</span>
        <button class="btn-icon small" onclick="app.removeSubtask(${index})">
          <i class="fas fa-times"></i>
        </button>
      `;
      container.appendChild(subtaskItem);
    });
  }

  // Category Management
  async renderCategorySidebar() {
    const container = document.getElementById('categoryList');
    if (!container) return;
    
    container.innerHTML = '';
    
    const tasks = await API.fetchTasks({}, this.currentUser.id);
    
    const categoriesWithCount = this.categories.map(category => {
      const count = tasks.filter(t => t.category === category.id).length;
      return { ...category, count };
    });
    
    // Ordenar por cantidad de tareas (mayor a menor)
    categoriesWithCount.sort((a, b) => b.count - a.count);
    
    categoriesWithCount.forEach(category => {
      const categoryItem = document.createElement('div');
      categoryItem.className = 'category-item';
      categoryItem.dataset.categoryId = category.id;
      categoryItem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
          <span class="category-color" style="background-color: ${category.color}"></span>
          <span class="category-name">${category.name}</span>
        </div>
        <span class="category-count">${category.count}</span>
      `;
      
      categoryItem.addEventListener('click', () => {
        const filterCategory = document.getElementById('filterCategory');
        if (filterCategory) {
          filterCategory.value = category.id;
          this.refresh();
        }
      });
      
      container.appendChild(categoryItem);
    });
    
    // Actualizar también las fechas próximas
    await this.renderUpcomingDates();
  }

  async renderUpcomingDates() {
    const container = document.getElementById('upcomingDates');
    if (!container) return;
    
    const tasks = await API.fetchTasks({}, this.currentUser.id);
    
    // Filtrar tareas con fecha límite en los próximos 7 días y que estén pendientes
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const upcomingTasks = tasks.filter(task => {
      if (!task.dueDate || task.status === 'completed') return false;
      
      const dueDate = new Date(task.dueDate);
      return dueDate >= today && dueDate <= nextWeek;
    });
    
    // Agrupar por fecha
    const tasksByDate = {};
    upcomingTasks.forEach(task => {
      if (!tasksByDate[task.dueDate]) {
        tasksByDate[task.dueDate] = 0;
      }
      tasksByDate[task.dueDate]++;
    });
    
    // Ordenar fechas
    const sortedDates = Object.keys(tasksByDate).sort();
    
    container.innerHTML = '';
    
    if (sortedDates.length > 0) {
      sortedDates.slice(0, 5).forEach(date => {
        const dateItem = document.createElement('div');
        dateItem.className = 'date-item';
        
        const formattedDate = new Date(date).toLocaleDateString('es-ES', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
        
        dateItem.innerHTML = `
          <span class="date">${formattedDate}</span>
          <span class="count">${tasksByDate[date]}</span>
        `;
        
        // Al hacer clic, filtrar por esa fecha
        dateItem.addEventListener('click', () => {
          document.getElementById('filterDate').value = date;
          this.refresh();
        });
        
        container.appendChild(dateItem);
      });
    } else {
      container.innerHTML = '<p style="text-align: center; color: var(--text-light); font-size: 0.875rem; padding: 8px;">No hay tareas próximas</p>';
    }
  }

  renderCategoryFilters() {
    const filterSelect = document.getElementById('filterCategory');
    const taskFormSelect = document.getElementById('category');
    
    if (!filterSelect || !taskFormSelect) return;
    
    // Clear existing options (keep "all" and "general")
    while (filterSelect.children.length > 2) filterSelect.removeChild(filterSelect.lastChild);
    while (taskFormSelect.children.length > 1) taskFormSelect.removeChild(taskFormSelect.lastChild);
    
    this.categories.forEach(category => {
      // Filter select
      const filterOption = document.createElement('option');
      filterOption.value = category.id;
      filterOption.textContent = category.name;
      filterSelect.appendChild(filterOption);
      
      // Task form select
      const formOption = document.createElement('option');
      formOption.value = category.id;
      formOption.textContent = category.name;
      taskFormSelect.appendChild(formOption);
    });
  }

  async openCategoryModal() {
    await this.renderCategoriesList();
    document.getElementById('categoryModal').classList.remove('hidden');
  }

  async renderCategoriesList() {
    const container = document.getElementById('categoriesList');
    if (!container) return;
    
    container.innerHTML = '';
    
    const categoriesWithCount = await API.fetchCategoriesWithCount(this.currentUser.id);
    
    categoriesWithCount.forEach(category => {
      const categoryItem = document.createElement('div');
      categoryItem.className = 'category-item';
      categoryItem.innerHTML = `
        <div class="category-info">
          <span class="category-color" style="background-color: ${category.color}"></span>
          <div>
            <strong>${category.name}</strong>
            <small>${category.count} tareas</small>
          </div>
        </div>
        <div class="category-actions">
          <button class="btn-icon small" onclick="app.editCategory('${category.id}')">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon small" onclick="app.deleteCategory('${category.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      container.appendChild(categoryItem);
    });
  }

  async addNewCategory() {
    const nameInput = document.getElementById('categoryName');
    const colorInput = document.getElementById('categoryColor');
    
    if (!nameInput || !colorInput) return;
    
    const name = nameInput.value.trim();
    const color = colorInput.value;
    
    if (!name) {
      this.showToast('Error', 'El nombre de la categoría es obligatorio', 'error');
      return;
    }
    
    try {
      const newCategory = await API.createCategory({ name, color }, this.currentUser.id);
      this.categories.push(newCategory);
      await this.renderCategorySidebar();
      this.renderCategoryFilters();
      await this.renderCategoriesList();
      nameInput.value = '';
      this.showToast('Categoría creada', 'La categoría se ha creado correctamente', 'success');
    } catch (error) {
      this.showToast('Error', error.message, 'error');
    }
  }

  // MODIFICADO: Reemplazar prompt por modal
  async editCategory(categoryId) {
    const category = this.categories.find(c => c.id === categoryId);
    if (!category) return;
    
    // Crear modal para editar categoría
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
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
    `;
    
    modal.innerHTML = `
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
            <input type="text" id="editCategoryNameInput" value="${category.name}" style="
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
            <input type="color" id="editCategoryColorInput" value="${category.color}" style="
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
    `;
    
    document.body.appendChild(modal);
    
    // Evento para cancelar
    document.getElementById('cancelEditCategoryBtn').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Evento para guardar
    document.getElementById('saveEditCategoryBtn').addEventListener('click', async () => {
      const newName = document.getElementById('editCategoryNameInput').value.trim();
      const newColor = document.getElementById('editCategoryColorInput').value;
      
      if (!newName) {
        this.showToast('Error', 'El nombre de la categoría es obligatorio', 'error');
        return;
      }
      
      try {
        await API.updateCategory(categoryId, { name: newName, color: newColor }, this.currentUser.id);
        await this.loadCategories();
        await this.refresh();
        this.showToast('Categoría actualizada', 'La categoría se ha actualizado correctamente', 'success');
        document.body.removeChild(modal);
      } catch (error) {
        this.showToast('Error', error.message, 'error');
      }
    });
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  // MODIFICADO: Reemplazar prompt por modal
  async deleteCategory(categoryId) {
    const category = this.categories.find(c => c.id === categoryId);
    if (!category) return;
    
    // Crear modal de confirmación
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
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
    `;
    
    modal.innerHTML = `
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
            Se eliminará la categoría: <strong>"${category.name}"</strong>.
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
    `;
    
    document.body.appendChild(modal);
    
    // Eventos del modal
    const cancelBtn = document.getElementById('cancelDeleteCategoryBtn');
    const confirmBtn = document.getElementById('confirmDeleteCategoryBtn');
    
    const closeModal = () => {
      document.body.removeChild(modal);
    };
    
    cancelBtn.addEventListener('click', closeModal);
    
    confirmBtn.addEventListener('click', async () => {
      closeModal();
      
      try {
        await API.deleteCategory(categoryId, this.currentUser.id);
        await this.loadCategories();
        await this.refresh();
        this.showToast('Categoría eliminada', 'La categoría se ha eliminado correctamente', 'info');
      } catch (error) {
        this.showToast('Error', error.message, 'error');
      }
    });
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Tag Management
  renderTagFilters() {
    let filterTags = document.getElementById('filterTags');
    if (!filterTags) return;
    
    while (filterTags.children.length > 1) filterTags.removeChild(filterTags.lastChild);
    
    this.tags.forEach(tag => {
      const option = document.createElement('option');
      option.value = tag.id;
      option.textContent = tag.name;
      filterTags.appendChild(option);
    });
  }

  async openTagsModal() {
    await this.renderTagsList();
    document.getElementById('tagsModal').classList.remove('hidden');
  }

  async renderTagsList() {
    const container = document.getElementById('tagsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    this.tags.forEach(tag => {
      const tagItem = document.createElement('div');
      tagItem.className = 'tag-item';
      tagItem.innerHTML = `
        <div class="tag-info">
          <span class="tag-color" style="background-color: ${tag.color}"></span>
          <span>${tag.name}</span>
        </div>
        <div class="tag-actions">
          <button class="btn-icon small" onclick="app.editTag('${tag.id}')">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon small" onclick="app.deleteTag('${tag.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      container.appendChild(tagItem);
    });
  }

  async addNewTag() {
    const nameInput = document.getElementById('newTagName');
    const colorInput = document.getElementById('newTagColor');
    
    if (!nameInput || !colorInput) return;
    
    const name = nameInput.value.trim();
    const color = colorInput.value;
    
    if (!name) {
      this.showToast('Error', 'El nombre de la etiqueta es obligatorio', 'error');
      return;
    }
    
    try {
      const newTag = await API.createTag({ name, color }, this.currentUser.id);
      this.tags.push(newTag);
      this.renderTagsList();
      this.renderTagFilters();
      nameInput.value = '';
      this.showToast('Etiqueta creada', 'La etiqueta se ha creado correctamente', 'success');
    } catch (error) {
      this.showToast('Error', error.message, 'error');
    }
  }

  // MODIFICADO: Ya usa modal (sin cambios)
  async editTag(tagId) {
    const tag = this.tags.find(t => t.id === tagId);
    if (!tag) return;
    
    // Crear un mini modal para editar
    const modal = document.createElement('div');
    modal.style.cssText = `
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
    `;
    
    modal.innerHTML = `
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
            <input type="text" id="editTagNameInput" value="${tag.name}" style="
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
            <input type="color" id="editTagColorInput" value="${tag.color}" style="
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
    `;
    
    document.body.appendChild(modal);
    
    // Evento para cancelar
    document.getElementById('cancelEditTagBtn').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Evento para guardar
    document.getElementById('saveEditTagBtn').addEventListener('click', async () => {
      const newName = document.getElementById('editTagNameInput').value.trim();
      const newColor = document.getElementById('editTagColorInput').value;
      
      if (!newName) {
        this.showToast('Error', 'El nombre de la etiqueta es obligatorio', 'error');
        return;
      }
      
      try {
        await API.updateTag(tagId, { name: newName, color: newColor }, this.currentUser.id);
        await this.loadTags();
        await this.renderTagsList();
        this.renderTagFilters();
        this.showToast('Etiqueta actualizada', 'La etiqueta se ha actualizado correctamente', 'success');
        document.body.removeChild(modal);
      } catch (error) {
        this.showToast('Error', error.message, 'error');
      }
    });
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  // MODIFICADO: Reemplazar prompt por modal
  async deleteTag(tagId) {
    const tag = this.tags.find(t => t.id === tagId);
    if (!tag) return;
    
    // Crear modal de confirmación
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
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
    `;
    
    modal.innerHTML = `
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
            Se eliminará la etiqueta: <strong>"${tag.name}"</strong>.
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
    `;
    
    document.body.appendChild(modal);
    
    // Eventos del modal
    const cancelBtn = document.getElementById('cancelDeleteTagBtn');
    const confirmBtn = document.getElementById('confirmDeleteTagBtn');
    
    const closeModal = () => {
      document.body.removeChild(modal);
    };
    
    cancelBtn.addEventListener('click', closeModal);
    
    confirmBtn.addEventListener('click', async () => {
      closeModal();
      
      try {
        await API.deleteTag(tagId, this.currentUser.id);
        this.tags = this.tags.filter(t => t.id !== tagId);
        this.renderTagsList();
        this.renderTagFilters();
        this.showToast('Etiqueta eliminada', 'La etiqueta se ha eliminado correctamente', 'info');
      } catch (error) {
        this.showToast('Error', error.message, 'error');
      }
    });
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Color Settings
  async openColorSettings() {
    const modal = document.getElementById('colorSettingsModal');
    if (!modal) return;
    
    // Fill with current values
    document.getElementById('primaryColor').value = this.colorSettings.primaryColor;
    document.getElementById('secondaryColor').value = this.colorSettings.secondaryColor;
    document.getElementById('cardBgColor').value = this.colorSettings.cardBg;
    document.getElementById('appBgColor').value = this.colorSettings.appBg;
    
    // Update color values display
    document.getElementById('primaryValue').textContent = this.colorSettings.primaryColor;
    document.getElementById('secondaryValue').textContent = this.colorSettings.secondaryColor;
    document.getElementById('cardBgValue').textContent = this.colorSettings.cardBg;
    document.getElementById('appBgValue').textContent = this.colorSettings.appBg;
    
    modal.classList.remove('hidden');
  }

  previewColorChange(id, value) {
    // Update the color value display
    const valueElement = document.getElementById(id + 'Value');
    if (valueElement) {
      valueElement.textContent = value;
    }
    
    // Create a preview settings object
    const previewSettings = new ColorSettings({
      ...this.colorSettings,
      [this.mapInputIdToProperty(id)]: value
    });
    
    // Apply preview
    ColorService.applyTheme(previewSettings);
  }

  mapInputIdToProperty(id) {
    const map = {
      'primaryColor': 'primaryColor',
      'secondaryColor': 'secondaryColor',
      'cardBgColor': 'cardBg',
      'appBgColor': 'appBg'
    };
    return map[id] || id;
  }

  async saveColorSettings() {
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    const cardBg = document.getElementById('cardBgColor').value;
    const appBg = document.getElementById('appBgColor').value;
    
    const settings = new ColorSettings({
      userId: this.currentUser.id,
      theme: this.colorSettings.theme,
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      cardBg: cardBg,
      textColor: this.colorSettings.textColor,
      borderColor: this.colorSettings.borderColor,
      appBg: appBg,
      accentColor: this.colorSettings.accentColor
    });

    await API.saveColorSettings(this.currentUser.id, settings);
    this.colorSettings = settings;
    document.getElementById('colorSettingsModal').classList.add('hidden');
    this.showToast('Tema guardado', 'Los cambios se han guardado correctamente', 'success');
  }

  async resetColors() {
    const defaultSettings = new ColorSettings({ userId: this.currentUser.id });
    await API.saveColorSettings(this.currentUser.id, defaultSettings);
    this.colorSettings = defaultSettings;
    ColorService.applyTheme(defaultSettings);
    this.openColorSettings();
    this.showToast('Tema restaurado', 'Se ha restaurado el tema predeterminado', 'info');
  }

  applyColorPreset(presetName) {
    const preset = ColorService.getPreset(presetName);
    
    // Update inputs
    document.getElementById('primaryColor').value = preset.primaryColor;
    document.getElementById('secondaryColor').value = preset.secondaryColor;
    document.getElementById('cardBgColor').value = preset.cardBg;
    document.getElementById('appBgColor').value = preset.appBg;
    
    // Update displays
    document.getElementById('primaryValue').textContent = preset.primaryColor;
    document.getElementById('secondaryValue').textContent = preset.secondaryColor;
    document.getElementById('cardBgValue').textContent = preset.cardBg;
    document.getElementById('appBgValue').textContent = preset.appBg;
    
    // Apply preview
    const previewSettings = new ColorSettings({
      ...preset,
      userId: this.currentUser.id
    });
    ColorService.applyTheme(previewSettings);
  }

  toggleTheme() {
    const newTheme = this.colorSettings.theme === 'light' ? 'dark' : 'light';
    this.colorSettings.theme = newTheme;
    
    // Update icon
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
      icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    ColorService.applyTheme(this.colorSettings);
    API.saveColorSettings(this.currentUser.id, this.colorSettings);
  }

  // Notifications
  async toggleNotifications() {
    const center = document.getElementById('notificationCenter');
    if (!center) return;
    
    center.classList.toggle('hidden');
    
    if (!center.classList.contains('hidden')) {
      await API.markAllNotificationsAsRead(this.currentUser.id);
      await this.loadNotifications();
    }
  }

  renderNotifications() {
    const container = document.getElementById('notificationsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    this.notifications.forEach(notification => {
      const notificationItem = document.createElement('div');
      notificationItem.className = `notification-item ${notification.read ? '' : 'unread'}`;
      notificationItem.innerHTML = `
        <div class="notification-title">${notification.title}</div>
        <div class="notification-message">${notification.message}</div>
        <div class="notification-time">${this.formatTimeAgo(notification.createdAt)}</div>
      `;
      
      if (notification.taskId) {
        notificationItem.style.cursor = 'pointer';
        notificationItem.addEventListener('click', async () => {
          // Find and open the task
          const tasks = await API.fetchTasks({}, this.currentUser.id);
          const task = tasks.find(t => t.id === notification.taskId);
          if (task) {
            this.openTaskDetail(task);
            document.getElementById('notificationCenter').classList.add('hidden');
          }
        });
      }
      
      container.appendChild(notificationItem);
    });
  }

  // Task List and Filters
  async refresh() {
    LoadingManager.show();
    
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    const filters = this.getFilters();

    // Obtener preferencia de ordenamiento
    const sortPref = JSON.parse(localStorage.getItem('taskflow_sort_preference') || '{"field":"createdAt","direction":"desc"}');
    filters.sortBy = sortPref.field;
    filters.sortDirection = sortPref.direction;
    
    const tasks = await API.fetchTasks(filters, this.currentUser.id);
    
    if (tasks.length === 0) {
      if (taskList) taskList.classList.add('hidden');
      if (emptyState) emptyState.classList.remove('hidden');
    } else {
      if (taskList) taskList.classList.remove('hidden');
      if (emptyState) emptyState.classList.add('hidden');
      
      if (taskList) {
        taskList.innerHTML = '';
        
        if (this.viewMode === 'grid') {
          taskList.className = 'task-grid';
          tasks.forEach(task => {
            const card = this.createTaskCard(task);
            taskList.appendChild(card);
          });
        } else {
          taskList.className = 'task-list-view';
          tasks.forEach(task => {
            const row = this.createTaskRow(task);
            taskList.appendChild(row);
          });
        }
      }
    }
    
    // Update tasks title
    const tasksTitle = document.getElementById('tasksTitle');
    if (tasksTitle) {
      const totalTasks = tasks.length;
      tasksTitle.textContent = `Mis Tareas ${totalTasks > 0 ? `(${totalTasks})` : ''}`;
    }
    
    // Actualizar sidebar de categorías
    await this.renderCategorySidebar();
    
    LoadingManager.hide();
  }

  getFilters() {
    const filterTags = document.getElementById('filterTags');
    const sortPref = JSON.parse(localStorage.getItem('taskflow_sort_preference') || '{"field":"createdAt","direction":"desc"}');
    
    return {
      status: document.getElementById('filterStatus')?.value || 'all',
      priority: document.getElementById('filterPriority')?.value || 'all',
      category: document.getElementById('filterCategory')?.value || 'all',
      tag: filterTags ? filterTags.value : 'all',
      dueDate: document.getElementById('filterDate')?.value || '',
      search: document.getElementById('search')?.value.trim() || '',
      sortBy: sortPref.field || 'createdAt',
      sortDirection: sortPref.direction || 'desc'
    };
  }

  clearFilters() {
    document.getElementById('filterStatus').value = 'all';
    document.getElementById('filterPriority').value = 'all';
    document.getElementById('filterCategory').value = 'all';
    document.getElementById('filterTags').value = 'all';
    document.getElementById('filterDate').value = '';
    document.getElementById('search').value = '';
    
    this.refresh();
  }

  setViewMode(mode) {
    this.viewMode = mode;
    
    // Update button states
    const viewGrid = document.getElementById('viewGrid');
    const viewList = document.getElementById('viewList');
    
    if (viewGrid) viewGrid.classList.toggle('active', mode === 'grid');
    if (viewList) viewList.classList.toggle('active', mode === 'list');
    
    this.refresh();
  }

  showSortOptions() {
    const modal = document.createElement('div');
    modal.style.cssText = `
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
    `;
    
    modal.innerHTML = `
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
    `;
    
    document.body.appendChild(modal);
    
    // Eventos de cierre
    document.getElementById('cancelSortBtn').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
    
    // Evento de envío
    document.getElementById('sort-form-modal').addEventListener('submit', (e) => {
      e.preventDefault();
      const sortBy = modal.querySelector('input[name="sort"]:checked').value;
      const direction = modal.querySelector('input[name="direction"]:checked').value;
      
      const sortMessage = `Ordenando por ${sortBy === 'createdAt' ? 'fecha de creación' : sortBy === 'dueDate' ? 'fecha límite' : 'prioridad'} (${direction === 'desc' ? 'descendente' : 'ascendente'})`;
      
      this.showToast('Ordenamiento', sortMessage, 'info');
      
      // Guardar preferencia
      localStorage.setItem('taskflow_sort_preference', JSON.stringify({ 
        field: sortBy, 
        direction: direction 
      }));
      
      // Recargar tareas
      this.refresh();
      
      document.body.removeChild(modal);
    });
  }

  createTaskCard(task) {
    const card = document.createElement('div');
    card.className = `task-card priority-${task.priority} ${task.status === 'completed' ? 'completed' : ''}`;
    
    // Get category color
    const category = this.categories.find(c => c.id === task.category);
    const categoryColor = category ? category.color : '#64748b';
    
    // Priority indicator
    card.style.borderLeftColor = this.getPriorityColor(task.priority);
    
    // Añadir gradiente sutil basado en prioridad
    if (task.priority === 'high') {
      card.style.background = 'linear-gradient(to right, rgba(239, 68, 68, 0.05), var(--card-bg))';
    } else if (task.priority === 'medium') {
      card.style.background = 'linear-gradient(to right, rgba(245, 158, 11, 0.05), var(--card-bg))';
    } else if (task.priority === 'low') {
      card.style.background = 'linear-gradient(to right, rgba(16, 185, 129, 0.05), var(--card-bg))';
    }
    
    // Task tags
    const taskTags = task.tags ? task.tags.map(tagId => {
      const tag = this.tags.find(t => t.id === tagId);
      return tag ? `<span class="task-tag" style="background-color: ${tag.color}; color: ${this.getContrastColor(tag.color)}">${tag.name}</span>` : '';
    }).join('') : '';
    
    // Due date indicator
    const dueDateInfo = task.dueDate ? this.getDueDateInfo(task.dueDate) : '';
    
    // Progress indicator for subtasks
    const progressIndicator = task.subtasks && task.subtasks.length > 0 ? 
      `<div class="progress-indicator">
        <div class="progress-fill" style="width: ${task.getCompletionPercentage()}%"></div>
      </div>` : '';
    
    const taskData = JSON.stringify(task).replace(/"/g, '&quot;');
    
    card.innerHTML = `
      <div class="task-header">
        <div class="task-title">${this.escapeHtml(task.title)}</div>
        <div class="task-actions">
          <button class="btn-icon small" onclick="app.toggleTaskStatus('${task.id}')">
            <i class="fas ${task.status === 'completed' ? 'fa-undo' : 'fa-check'}"></i>
          </button>
          <button class="btn-icon small" onclick="app.openEditTask(${taskData})">
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </div>
      <div class="task-description">${this.escapeHtml(task.description || 'Sin descripción')}</div>
      ${taskTags ? `<div class="task-tags">${taskTags}</div>` : ''}
      ${progressIndicator}
      <div class="task-meta">
        <div class="task-info">
          <span title="Categoría"><i class="fas fa-folder" style="color: ${categoryColor}"></i> ${category ? category.name : 'General'}</span>
          <span title="Fecha límite"><i class="fas fa-calendar"></i> ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Sin fecha'}</span>
          ${dueDateInfo}
        </div>
        <div class="task-status">
          <span class="status-badge ${task.status}">${task.status === 'completed' ? '✅ Completada' : '⏳ Pendiente'}</span>
        </div>
      </div>
    `;
    
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.btn-icon')) {
        this.openTaskDetail(task);
      }
    });
    
    return card;
  }

  createTaskRow(task) {
    const row = document.createElement('div');
    row.className = `task-row priority-${task.priority} ${task.status === 'completed' ? 'completed' : ''}`;
    
    // Get category color
    const category = this.categories.find(c => c.id === task.category);
    const categoryColor = category ? category.color : '#64748b';
    
    const taskData = JSON.stringify(task).replace(/"/g, '&quot;');
    
    row.innerHTML = `
      <div class="row-checkbox">
        <input type="checkbox" ${task.status === 'completed' ? 'checked' : ''} 
               onchange="app.toggleTaskStatus('${task.id}')">
      </div>
      <div class="row-title">
        <span class="task-title-text">${this.escapeHtml(task.title)}</span>
        ${task.description ? `<small class="row-description">${this.escapeHtml(task.description)}</small>` : ''}
      </div>
      <div class="row-category">
        <span class="category-dot" style="background-color: ${categoryColor}"></span>
        ${category ? category.name : 'General'}
      </div>
      <div class="row-date">${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</div>
      <div class="row-priority priority-${task.priority}">${this.getPriorityText(task.priority)}</div>
      <div class="row-actions">
        <button class="btn-icon small" onclick="app.openTaskDetail(${taskData})">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn-icon small" onclick="app.openEditTask(${taskData})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-icon small" onclick="app.deleteTask('${task.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    
    return row;
  }

  // Task Detail View
  async openTaskDetail(task) {
    // Load fresh task data
    const tasks = await API.fetchTasks({}, this.currentUser.id);
    const freshTask = tasks.find(t => t.id === task.id);
    if (!freshTask) return;
    
    // Fill detail modal
    document.getElementById('detailTitle').textContent = freshTask.title;
    document.getElementById('detailStatus').textContent = freshTask.status === 'completed' ? 'Completada' : 'Pendiente';
    document.getElementById('detailStatus').className = `detail-badge ${freshTask.status === 'completed' ? 'success' : 'warning'}`;
    document.getElementById('detailPriority').textContent = this.getPriorityText(freshTask.priority);
    document.getElementById('detailPriority').className = `detail-badge priority-${freshTask.priority}`;
    
    const category = this.categories.find(c => c.id === freshTask.category);
    document.getElementById('detailCategory').textContent = category ? category.name : 'General';
    document.getElementById('detailCategory').className = 'detail-badge';
    document.getElementById('detailCategory').style.backgroundColor = category ? category.color : '#64748b';
    document.getElementById('detailCategory').style.color = category ? this.getContrastColor(category.color) : 'white';
    
    document.getElementById('detailDueDate').textContent = freshTask.dueDate ? 
      new Date(freshTask.dueDate).toLocaleDateString() : 'No especificada';
    document.getElementById('detailCreatedAt').textContent = new Date(freshTask.createdAt).toLocaleDateString();
    document.getElementById('detailUpdatedAt').textContent = new Date(freshTask.updatedAt).toLocaleDateString();
    document.getElementById('detailDescription').textContent = freshTask.description || 'No hay descripción';
    
    // Tags
    const tagsContainer = document.getElementById('detailTags');
    if (tagsContainer) {
      tagsContainer.innerHTML = '';
      
      if (freshTask.tags && freshTask.tags.length > 0) {
        freshTask.tags.forEach(tagId => {
          const tag = this.tags.find(t => t.id === tagId);
          if (tag) {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.style.backgroundColor = tag.color;
            tagElement.style.color = this.getContrastColor(tag.color);
            tagElement.textContent = tag.name;
            tagsContainer.appendChild(tagElement);
          }
        });
        document.getElementById('detailTagsSection').classList.remove('hidden');
      } else {
        document.getElementById('detailTagsSection').classList.add('hidden');
      }
    }
    
    // Subtasks
    const subtasksContainer = document.getElementById('detailSubtasks');
    if (subtasksContainer) {
      subtasksContainer.innerHTML = '';
      
      if (freshTask.subtasks && freshTask.subtasks.length > 0) {
        freshTask.subtasks.forEach((subtask, index) => {
          const subtaskElement = document.createElement('div');
          subtaskElement.className = `detail-subtask ${subtask.completed ? 'completed' : ''}`;
          subtaskElement.innerHTML = `
            <input type="checkbox" ${subtask.completed ? 'checked' : ''} 
                   onchange="app.toggleTaskSubtask('${freshTask.id}', ${index})">
            <span>${subtask.title}</span>
          `;
          subtasksContainer.appendChild(subtaskElement);
        });
        document.getElementById('detailSubtasksSection').classList.remove('hidden');
      } else {
        document.getElementById('detailSubtasksSection').classList.add('hidden');
      }
    }
    
    // Action buttons
    const toggleBtn = document.getElementById('detailToggleBtn');
    if (toggleBtn) {
      toggleBtn.innerHTML = freshTask.status === 'completed' ? 
        '<i class="fas fa-undo"></i> Marcar como Pendiente' : 
        '<i class="fas fa-check-circle"></i> Marcar como Completada';
      toggleBtn.onclick = async () => {
        await this.toggleTaskStatus(freshTask.id);
        this.closeTaskDetail();
      };
    }
    
    const editBtn = document.getElementById('detailEditBtn');
    if (editBtn) {
      editBtn.onclick = () => {
        this.closeTaskDetail();
        this.openEditTask(freshTask);
      };
    }
    
    const deleteBtn = document.getElementById('detailDeleteBtn');
    if (deleteBtn) {
      // MODIFICADO: Reemplazar confirm por modal
      deleteBtn.onclick = () => {
        this.closeTaskDetail();
        this.showDeleteConfirmation(freshTask.id, freshTask.title, false);
      };
    }
    
    // Show modal
    document.getElementById('taskDetailModal').classList.remove('hidden');
  }

  closeTaskDetail() {
    document.getElementById('taskDetailModal').classList.add('hidden');
  }

  // Task Actions
  async toggleTaskStatus(taskId) {
    LoadingManager.show();
    
    try {
      const tasks = await API.fetchTasks({}, this.currentUser.id);
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;
      
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      await API.updateTask(taskId, { status: newStatus }, this.currentUser.id);
      
      await this.refresh();
      await this.updateStats();
      
      this.showToast(
        'Estado actualizado',
        `Tarea marcada como ${newStatus === 'completed' ? 'completada' : 'pendiente'}`,
        'success'
      );
    } catch (error) {
      this.showToast('Error', 'No se pudo actualizar el estado', 'error');
    }
    
    LoadingManager.hide();
  }

  async toggleTaskSubtask(taskId, subtaskIndex) {
    try {
      await API.toggleSubtask(taskId, subtaskIndex, this.currentUser.id);
      // Refresh the detail view if open
      if (!document.getElementById('taskDetailModal').classList.contains('hidden')) {
        const tasks = await API.fetchTasks({}, this.currentUser.id);
        const task = tasks.find(t => t.id === taskId);
        if (task) {
          this.openTaskDetail(task);
        }
      }
    } catch (error) {
      this.showToast('Error', 'No se pudo actualizar la subtarea', 'error');
    }
  }

  // MODIFICADO: Esta función ahora usa el modal (ver deleteTask arriba)

  // Export
  async exportTasks() {
    try {
      const format = confirm('¿Exportar como JSON? (Cancelar para CSV)') ? 'json' : 'csv';
      const url = await API.exportTasks(format, this.currentUser.id);
      const a = document.createElement('a');
      a.href = url;
      a.download = `taskflow_export_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      this.showToast('Exportación exitosa', `Datos exportados como ${format.toUpperCase()}`, 'success');
    } catch (error) {
      this.showToast('Error de exportación', 'No se pudieron exportar los datos', 'error');
    }
  }

  // Utility Functions
  getPriorityColor(priority) {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    };
    return colors[priority] || '#64748b';
  }

  getPriorityText(priority) {
    const texts = {
      high: 'Alta',
      medium: 'Media',
      low: 'Baja'
    };
    return texts[priority] || priority;
  }

  getDueDateInfo(dueDate) {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    
    if (dueDate === today) {
      return '<span title="Vence hoy" style="color: #ef4444;"><i class="fas fa-exclamation-circle"></i> Hoy</span>';
    } else if (dueDate === tomorrow) {
      return '<span title="Vence mañana" style="color: #f59e0b;"><i class="fas fa-clock"></i> Mañana</span>';
    } else if (dueDate < today) {
      return '<span title="Vencida" style="color: #dc2626;"><i class="fas fa-exclamation-triangle"></i> Vencida</span>';
    }
    return '';
  }

  getContrastColor(hexcolor) {
    hexcolor = hexcolor.replace("#", "");
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
  }

  formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'ahora';
    if (diffMins < 60) return `hace ${diffMins} min`;
    if (diffHours < 24) return `hace ${diffHours} h`;
    if (diffDays < 7) return `hace ${diffDays} d`;
    return date.toLocaleDateString();
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Toast notifications
  showToast(title, message, type = 'info') {
    return ToastManager.show(title, message, type, 3000);
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
