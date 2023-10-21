//Modelos
class Sale {
  constructor(
    id,
    eventName,
    lugar,
    saleDate,
    clientName,
    noTickets,
    salePrice
  ) {
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
  return data.map((item) => {
    return new Sale(
      item.id,
      item.nombre_evento,
      item.lugar,
      new Date(item.fecha_compra),
      item.cliente,
      item.numero_boletos,
      item.precio_venta
    );
  });
}

//Manipulacion del DOM
function displaySalesView(sales) {
  clearTable();

  showLoadingMessage();

  setTimeout(() => {
    if (sales.length === 0) {
      showNotFoundMessage();
    } else {
      hideMessage();

      displayTable(sales);
    }
  }, 2000);
}

function displayClearSalesView() {
  clearTable();

  showInitialMessage();
}

// Funcion que agrega los datos de los modelos de casas a la tabla.
function displayTable(sales) {
  const tablaBody = document.getElementById("data-table-body");

  sales.forEach((sale) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${sale.id}</td>
    <td>${sale.clientName}</td>
    <td>${sale.eventName}</td>
    <td>${sale.lugar}</td>
    <td class="text-right">${sale.noTickets}</td>
    <td>${formatDate(sale.saleDate)}</td>
    <td class="text-right">${formatCurrency(sale.salePrice)}</td>
    <td>
      <button class="btn-delete" data-sale-id="${sale.id}">Eliminar</button>
    </td>
      `;

    tablaBody.appendChild(row);
  });
  initDeleteSaleButtonHandler();
}

// Funcion que limpia la tabla
function clearTable() {
  const tableBody = document.getElementById("data-table-body");

  tableBody.innerHTML = "";
}

// Funcion que muestra mensaje de carga
function showLoadingMessage() {
  const message = document.getElementById("message");

  message.innerHTML = "Cargando...";

  message.style.display = "block";
}

// Funcion que muestra mensaje de carga
function showInitialMessage() {
  const message = document.getElementById("message");

  message.innerHTML = "No se ha realizado una consulta de ventas.";

  message.style.display = "block";
}

function showNotFoundMessage() {
  const message = document.getElementById("message");

  message.innerHTML = "No se encontraron casas con el filtro proporcionado.";

  message.style.display = "block";
}

// Funcion que oculta mensaje
function hideMessage() {
  const message = document.getElementById("message");

  message.style.display = "none";
}

function resetSales() {
  getSalesData();
}
//#region boton para eliminar y para crear
function initDeleteSaleButtonHandler() {

  document.querySelectorAll('.btn-delete').forEach(button => {

    button.addEventListener('click', () => {

      const saleId = button.getAttribute('data-sale-id'); // Obtenemos el ID de la venta
      deleteSale(saleId); // Llamamos a la función para eleminar la venta

    });

  });

}
//#endregion

//#region Consumo de datos desde API
function getSalesData() {
  fetchAPI(`${apiURL}/entradas`, "GET").then((data) => {
    const salesList = mapAPIToSales(data);
    displaySalesView(salesList);
  });
}


function deleteSale(saleId) {

  const confirm = window.confirm(`¿Estás seguro de que deseas eliminar la venta ${saleId}?`);

  if (confirm) {

    fetchAPI(`${apiURL}/entradas/${saleId}`, 'DELETE')
      .then(() => {
        resetSales();
        window.alert("Venta eliminada.");
      });

  }
}
//#endregion


//#region inicializamos funcionalidad
getSalesData();
//#endregion
