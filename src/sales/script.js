//Modelos
class Sale {
  constructor(id, eventName, lugar, saleDate, clientName, noTickets, salePrice) {
    this.id = id; // Identificador de la venta
    this.eventName = eventName; // Nombre del evento
    this.lugar = lugar; // Teléfono del cliente
    this.clientName = clientName; // Nombre del cliente 
    this.noTickets = noTickets; //Numero de entradas vendidas
    this.saleDate = saleDate; // Fecha de la venta
    this.salePrice = salePrice; // Precio de la venta
  }
}

function mapAPIToSales(data) {
  return data.map(item => {
    return new Sale(
      item.id,
      item.eventName,
      item.lugar,
      new Date(item.saleDate),
      item.clientName,
      item.noTickets,
      item.salePrice
    );
  });
}

//Manipulacion del DOM
function displayView(events) {

  clearTable();

  showLoadingMessage();

  if (events.length === 0) {

    showNotFoundMessage();

  } else {

    hideMessage();

    displayTable(events);
  }

}

  // Funcion que agrega los datos de los modelos de casas a la tabla.
  function displayTable(events) {

    const tablaBody = document.getElementById('data-table-body');

    events.forEach(house => {

      const row = document.createElement('tr');

      row.innerHTML = `
        <td> ${house.id} </td>
        <td> <img src="${imagePath + house.image}" alt="${house.name}" width="100"> </td>
        <td>${house.name}</td>
        <td>${house.description}</td>
        <td>${house.bedrooms}</td>
        <td>${house.bathrooms}</td>
        <td>${formatCurrency(house.price)}</td>
        <td>${formatM2(house.landArea)}</td>
        <td>${formatM2(house.constructionArea)}</td>
      `;

      tablaBody.appendChild(row);

    });

  }

  // Funcion que limpia la tabla
  function clearTable() {
    const tableBody = document.getElementById('data-table-body');

    tableBody.innerHTML = '';
  }
  
  // Funcion que muestra mensaje de carga
  function showLoadingMessage() {
    const message = document.getElementById('message');

    message.innerHTML = 'Cargando...';

    message.style.display = 'block';
  }

  function showNotFoundMessage() {
    const message = document.getElementById('message');

    message.innerHTML = 'No se encontraron casas con el filtro proporcionado.';

    message.style.display = 'block';
  }

    // Funcion que oculta mensaje
    function hideMessage() {
      const message = document.getElementById('message');
  
      message.style.display = 'none';
    }
  