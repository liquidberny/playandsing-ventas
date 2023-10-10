function changeColor() {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  let index = 0;

  setInterval(() => {
    document.getElementById('name-txt').style.color = colors[index];
    index = (index + 1) % colors.length;
  }, 100); // Cambia el color cada 0.5 segundos (500 milisegundos)
}

changeColor();
