const contactoForm = document.getElementById('contact-form');

contactoForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const nombre = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("message").value;
  
    alert('Gracias por contactarnos - Nombre: ' + nombre + '- Email: ' + email + '- Mensaje: ' + mensaje);
  
    contactoForm.reset();
  });
  