// Configuration API
const API_BASE_URL = 'https://lisez-moi-api.onrender.com/api';

// État
let currentUser = null;

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  updateDate();
  checkAuth();
});

// Date
function updateDate() {
  const dateEl = document.getElementById('current-date');
  if (dateEl) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = new Date().toLocaleDateString('fr-FR', options);
  }
}

// Auth
function checkAuth() {
  const user = localStorage.getItem('user');
  if (user) {
    currentUser = JSON.parse(user);
    updateAuthUI();
  }
}

function updateAuthUI() {
  const authBtn = document.querySelector('.btn-auth');
  if (authBtn && currentUser) {
    authBtn.textContent = currentUser.name || 'Mon compte';
    authBtn.onclick = handleLogout;
  }
}

function openAuthModal() {
  document.getElementById('auth-backdrop').classList.add('active');
  document.getElementById('auth-modal').classList.add('active');
}

function closeAuthModal() {
  document.getElementById('auth-backdrop').classList.remove('active');
  document.getElementById('auth-modal').classList.remove('active');
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  // Simulation connexion
  let role = 'visitor';
  let name = 'Visiteur';
  
  if (email === 'admin@lisez-moi.fr') {
    role = 'admin';
    name = 'Administrateur';
  } else if (email === 'editeur@lisez-moi.fr') {
    role = 'editor';
    name = 'Éditeur';
  }
  
  currentUser = { email, name, role };
  localStorage.setItem('user', JSON.stringify(currentUser));
  
  showToast('Connexion réussie !', 'success');
  closeAuthModal();
  updateAuthUI();
}

function handleLogout() {
  localStorage.removeItem('user');
  currentUser = null;
  showToast('Déconnexion réussie');
  location.reload();
}

// Newsletter
function subscribeNewsletter(event) {
  event.preventDefault();
  const email = event.target.querySelector('input').value;
  showToast('Merci pour votre inscription !', 'success');
  event.target.reset();
}

// Toast notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAuthModal();
  }
});
