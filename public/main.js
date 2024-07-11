document.addEventListener('DOMContentLoaded', function() {
  // AOS Initialization
  AOS.init({
    offset: 120,
    delay: 0,
    duration: 900,
    easing: 'ease',
    once: false,
    mirror: false,
    anchorPlacement: 'top-bottom',
  });

  // Registro de usuarios
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
      registerForm.addEventListener('submit', function(event) {
          event.preventDefault();
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const confirmPassword = document.getElementById('confirm-password').value;

          if (password !== confirmPassword) {
              alert('Las contraseñas no coinciden.');
              return;
          }

          fetch('http://localhost:3000/api/auth/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, email, password })
          })
          .then(response => response.json())
          .then(data => {
              if (data.message) {
                  alert(data.message);
                  window.location.href = 'login.html';
              } else {
                  alert('Error al registrarse: ' + data.message);
              }
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Error al procesar la solicitud.');
          });
      });
  }

  // Inicio de sesión de usuarios
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
      loginForm.addEventListener("submit", function(event) {
          event.preventDefault();
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;

          fetch('http://localhost:3000/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
          })
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  alert(data.message);
              } else {
                  localStorage.setItem('token', data.token); // Guardar token en localStorage
                  const userRole = jwt_decode(data.token).role; // Decodificar token para obtener el rol

                  switch(userRole) { // Redirección basada en el rol
                      case 'user':
                          window.location.href = "user-dashboard.html";
                          break;
                      case 'consultant':
                          window.location.href = "consultantdashboard.html";
                          break;
                      case 'admin':
                          window.location.href = "admindashboard.html";
                          break;
                      default:
                          window.location.href = "index.html";
                          break;
                  }
              }
          })
          .catch(error => {
              console.error('Error:', error);
              alert("Error en el inicio de sesión. Inténtalo de nuevo.");
          });
      });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const nameElement = document.getElementById('name-placeholder');
  const emailElement = document.getElementById('email-placeholder');
  const logoutButton = document.getElementById('logout');

  // Recuperar nombre y correo del localStorage
  const name = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');

  // Mostrar nombre y correo en la página
  nameElement.textContent = name || 'No disponible';
  emailElement.textContent = email || 'No disponible';

  // Función para manejar el cierre de sesión
  logoutButton.addEventListener('click', function() {
      localStorage.clear();
      window.location.href = '../index.html';
  });
});
