//Modelos
class Sale {
  constructor(
    id,
    nombre_evento,
    lugar,
    fecha_compra,
    cliente,
    numero_boletos,
    precio_venta
  ) {
    this.id = id; // Identificador de la venta
    this.nombre_evento = nombre_evento; // Nombre del evento
    this.lugar = lugar; // Teléfono del cliente
    this.cliente = cliente; // Nombre del cliente
    this.numero_boletos = numero_boletos; //Numero de entradas vendidas
    this.fecha_compra = fecha_compra; // Fecha de la venta
    this.precio_venta = precio_venta; // Precio de la venta
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
    <td>${sale.cliente}</td>
    <td>${sale.nombre_evento}</td>
    <td>${sale.lugar}</td>
    <td class="text-right">${sale.numero_boletos}</td>
    <td>${formatDate(sale.fecha_compra)}</td>
    <td class="text-right">${formatCurrency(sale.precio_venta)}</td>
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

function initAddSaleButtonsHandler() {

  document.getElementById('addSale').addEventListener('click', () => {
    openAddSaleModal()
  });

  document.getElementById('modal-background').addEventListener('click', () => {
    closeAddSaleModal();
  });

  document.getElementById('sale-form').addEventListener('submit', event => {
    event.preventDefault();
    processSubmitSale();
  });

}

function openAddSaleModal() {
  document.getElementById('sale-form').reset();
  document.getElementById('modal-background').style.display = 'block';
  document.getElementById('modal').style.display = 'block';
}
function closeAddSaleModal() {
  document.getElementById('sale-form').reset();
  document.getElementById('modal-background').style.display = 'none';
  document.getElementById('modal').style.display = 'none';
}

function processSubmitSale() {
  const cliente = document.getElementById('customer-name-field').value;
  const nombre_evento = document.getElementById('event-name-field').value;
  const location = document.getElementById('location-name-field').value;
  const numberOfTickets = document.getElementById('number-tickets-field').value;
  const precio_venta = document.getElementById('sale-price-field').value;
  const fecha_compra = document.getElementById('sale-date-field').value;


  const saleToSave = new Sale(
    null,
    nombre_evento,
    location,
    fecha_compra,
    cliente,
    parseFloat(numberOfTickets),
    parseFloat(precio_venta),
    
  );

  createSale(saleToSave);
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

function createSale(sale) {

  fetchAPI(`${apiURL}/entradas`, 'POST', sale)
    .then(sale => {
      closeAddSaleModal();
      resetSales();
      window.alert(`Venta ${sale.id} creada correctamente.`);
    });

}
//#endregion


//#region inicializamos funcionalidad
initAddSaleButtonsHandler();
getSalesData();
//#endregion
