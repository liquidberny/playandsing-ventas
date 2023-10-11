// Clase definida

class eventos {
  constructor(id, name, description, fecha, lugar, pais, precio, image) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.fecha = fecha;
    this.lugar = lugar;
    this.pais = pais;
    this.precio = precio;
    this.image = image;
  }
}

// objetos

// Objetos
const evento1 = new eventos(
  1,
  "Bonaroo",
  "Bonnaroo es un festival de música y artes escénicas conocido por su ambiente festivo y ecléctico.",
  "Junio del 2023",
  "Great Stage Park, Mnachester Tenesee",
  "USA",
  122,
  "Bonaroo-2023-Editado.png"
);
const evento2 = new eventos(
  2,
  "Coachella",
  "Coachella es uno de los festivales de música más grandes y populares del mundo.",
  "Abril de 2023",
  "Empire Polo Club, California",
  "USA",
  350,
  "coachella-2023-cartel-lineup.webp"
);
const evento3 = new eventos(
  3,
  "Louder Than Life",
  "Louder Than Life es un festival de rock y metal que presenta actuaciones de algunas de las bandas más grandes del género.",
  "Septiembre de 2023",
  "Highland Festival Grounds, Kentucky",
  "USA",
  175,
  "LTL23_Social_1200x1500-scaled.jpg"
);
const evento4 = new eventos(
  4,
  "Tecate Pal Norte",
  "Tecate Pal Norte es un festival de música que ofrece una mezcla de artistas internacionales y locales en un ambiente vibrante.",
  "Octubre de 2023",
  "Parque Fundidora, Monterrey",
  "México",
  850,
  "pal-norte-2023.jpeg"
);
const evento5 = new eventos(
  5,
  "Glastonbury",
  "Glastonbury es uno de los festivales de música más grandes y emblemáticos.",
  "Junio de 2023",
  "Worthy Farm, Somerset",
  "Reino Unido",
  300,
  "Poster_2023_4x5_M4y_upd4t3_1912.png"
);
const evento6 = new eventos(
  6,
  "Primavera Sound",
  "Primavera Sound es un festival de música que se destaca por su ecléctica selección de artistas y su ambiente festivo.",
  "Junio de 2023",
  "Parc del Fòrum, Barcelona",
  "España",
  140,
  "clzbhlnvke8f34ze1azf_1685440467527.jpg"
);

// array con objetos

const eventosList = [evento1, evento2, evento3, evento4, evento5, evento6];

// ordernar por indices

console.log("Impresion en consola de elementos accesados por indices: ");
console.log(eventosList[0]);
console.log(eventosList[1]);
console.log(eventosList[2]);

// Accedemos datos con funcion forEach() de array
console.log("Impresion en consola de elementos accesados con forEach(): ");
eventosList.forEach((item) => {
  console.log(item);
});

// Funcion que controla el despliegue de un array de RealEstate en la tabla, asi como el mensaje a mostrar.
function displayTable(eventos) {

  clearTable();

  showLoadingMessage();

  setTimeout(() => {

    if (eventos.length === 0) {

      showNotFoundMessage();

    } else {

        hideMessage();

        const tablaBody = document.getElementById('data-table-body');

        const imagePath = `../assets/img/events`;

        eventos.forEach(eventos => {

          const row = document.createElement('tr');

          row.innerHTML = `
            <td> ${eventos.id} </td>
            <td> <img src="${imagePath + eventos.image}" alt="${eventos.name}" width="100"> </td>
            <td>${eventos.name}</td>
            <td>${eventos.description}</td>
            <td>${eventos.fecha}</td>
            <td>${eventos.lugar}</td>
            <td>${eventos.pais}</td>
            <td>${formatCurrency(eventos.price)}</td>
          `;

          tablaBody.appendChild(row);

        });

    }

  }, 2000);

}


const eventContainer = document.querySelector(".event-list");
const imagePath = `../assets/img/events/`;

document.addEventListener("DOMContentLoaded", function () {
  const eventContainer = document.querySelector(".event-list");

  eventosList.forEach((evento) => {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event");
    eventDiv.innerHTML = `
      <div class="event-image">
        <img src="${imagePath+evento.image}" alt="${evento.name}" />
      </div>
      <div class="event-details">
        <div class="event-info">
          <p><strong>Nombre:</strong> ${evento.name}</p>
          <p><strong>Ubicación:</strong> ${evento.lugar}, ${evento.pais}</p>
          <p><strong>Precio:</strong> $${evento.precio}</p>
          <p><strong>Fecha:</strong> ${evento.fecha}</p>
          <p><strong>Descripción:</strong> ${evento.description}</p>
        </div>
      </div>
    `;

    eventContainer.appendChild(eventDiv);
  });
});

// funcion para limpiar tabla no estoy seguro si es necesario

function clearTable() {
  const tableBody = document.getElementById('data-table-body');

  tableBody.innerHTML = '';
}


// funcion muestra mensaje de carga

function showLoadingMessage() {
  const message = document.getElementById('message');

  message.innerHTML = 'Espera jeje cargando...';

  message.style.display = 'block';
}

// Funcion que muestra mensaje de que no se encuentraron datos
function showNotFoundMessage() {
  const message = document.getElementById('message');

  message.innerHTML = 'No hay eventos con tus filtros especificos.';

  message.style.display = 'block';
}

// Funcion que oculta mensaje
function hideMessage() {
  const message = document.getElementById('message');

  message.style.display = 'none';
}

// Funcion que inicializa los eventos de los botones del filto
function initButtonsHandler() {

  document.getElementById('filter-form').addEventListener('submit', event => {
    event.preventDefault();
    applyFilters();
  });

  document.getElementById('reset-filters').addEventListener('click', () => {
    document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
    applyFilters();
  });

}

// Funcion que gestiona la aplicacion del filtro a los datos y su despliegue.
function applyFilters() {
  const filterText = document.getElementById('text').value.toLowerCase();;
  const filterPais = parseFloat(document.getElementById('pais').value);
  const filterMinPrice = parseFloat(document.getElementById('price-min').value);
  const filterMaxPrice = parseFloat(document.getElementById('price-max').value);

  const filteredEventos = filterEventos(eventosList, filterText, filterPais, filterMinPrice, filterMaxPrice);

  displayTable(filteredEventos);
}

// Funcion con la logica para filtrar los eventos.
function filterEventos(eventos, text, pais, minPrice, maxPrice) {

  return eventos.filter( eventos =>
      (!pais || eventos.pais === pais) &&
      (!minPrice || eventos.price >= minPrice) &&
      (!maxPrice || eventos.price <= maxPrice) &&
      (!text     || eventos.name.toLowerCase().includes(text) || eventos.description.toLowerCase().includes(text))
    );
}


displayTable(eventosList);

initButtonsHandler();
