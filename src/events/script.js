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


function displayTable(events) {
  clearEvents();

  showLoadingMessage();

  setTimeout(() => {

    if (events.length === 0) {

      showNotFoundMessage();

    } else {

        hideMessage();

        const eventContainer = document.querySelector(".event-list");

        const imagePath = `../assets/img/events/`;

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

    }

  }, 2000);

}

// Funcion que limpia la tabla
function clearEvents() {
  const tableBody = document.querySelector('.event-list');

  tableBody.innerHTML = '';
}

// Funcion que muestra mensaje de carga
function showLoadingMessage() {
  const message = document.querySelector('.message');
  console.log(message);
  message.innerHTML = 'Cargando...';

  message.style.display = 'block';
}

// Funcion que muestra mensaje de que no se encuentraron datos
function showNotFoundMessage() {
  const message = document.querySelector('.message');

  message.innerHTML = 'No se encontraron eventos con el filtro proporcionado.';

  message.style.display = 'block';
}

// Funcion que oculta mensaje
function hideMessage() {
  const message = document.querySelector('.message');

  message.style.display = 'none';
}

//Region del formulario
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

function applyFilters() {
  const filterText = document.getElementById('text').value.toLowerCase();;
  const filterMinPrice = parseFloat(document.getElementById('price-min').value);
  const filterMaxPrice = parseFloat(document.getElementById('price-max').value);

  const filteredEvents = filterEvents(eventosList, filterText,  filterMinPrice, filterMaxPrice);

  displayTable(filteredEvents);
}

// Funcion con la logica para filtrar las casas.
function filterEvents(events, text, minPrice, maxPrice) {

  return events.filter( event =>
      (!minPrice || event.precio >= minPrice) &&
      (!maxPrice || event.precio <= maxPrice) &&
      (!text     || event.name.toLowerCase().includes(text) || event.description.toLowerCase().includes(text))
    );
}

displayTable(eventosList);
initButtonsHandler();
