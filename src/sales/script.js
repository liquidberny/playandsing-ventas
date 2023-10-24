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

class EventosDescriptor {

  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

function mapAPIToEventosDescriptors(data) {
  return data.map(item => {
    return new EventosDescriptor(
      item.id,
      item.name,
      item.price
    );
  });
}

//fin region

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

//region de filtros a ver q onda

function initFilterButtonsHandler() {

  document.getElementById('filter-form').addEventListener('submit', event => {
    event.preventDefault();
    searchSales();
  });

  document.getElementById('reset-filters').addEventListener('click', () => clearSales());

}


function clearSales() {
  document.querySelector('select.filter-field').selectedIndex = 0;
  document.querySelectorAll('input.filter-field').forEach(input => input.value = '');

  displayClearSalesView();
}


function resetSales() {
  document.querySelector('select.filter-field').selectedIndex = 0;
  document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
  searchSales();
}


function searchSales() {
  const eventName = document.getElementById('real-estate-filter').value;
  const clientName = document.getElementById('customer-filter').value;
  const salesman = document.getElementById('salesman-filter').value;
  const lugar = document.getElementById('date-filter').value;

  getSalesData(eventName, clientName, lugar, saleDate);
}

//#endregion

//#region 5. BOTONES PARA AGREGAR Y ELIMINAR VENTAS (VIEW)

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
  const clientName = document.getElementById('customer-name-field').value;
  const noTickets = document.getElementById('customer-phone-field').value;
  const eventName = document.getElementById('real-estate-field').value;
  const salePrice = document.getElementById('sale-price-field').value;
  const saleDate = document.getElementById('sale-date-field').value;
  // const salesman = document.getElementById('salesman-field').value;
  const lugar = document.getElementById('notes-field').value;

  const saleToSave = new Sale(
    null,
    clientName,
    noTickets,
    salePrice,
    // salesman,
    eventName,
    parseFloat(salePrice),
    lugar
  );

  createSale(saleToSave);
}


function initDeleteSaleButtonHandler() {

  document.querySelectorAll('.btn-delete').forEach(button => {

    button.addEventListener('click', () => {

      const saleId = button.getAttribute('data-sale-id'); // Obtenemos el ID de la venta
      deleteSale(saleId); // Llamamos a la función para eleminar la venta

    });

  });

}


//cargar datos de modelos para form view

// Funcion que agrega los datos de los modelos de casas a la tabla.
function displayEventoOptions(eventos) {

  const eventosFilter = document.getElementById('real-estate-filter');
  const eventosModal = document.getElementById('real-estate-field');

  eventos.forEach(evento => {

    const optionFilter = document.createElement('option');

    optionFilter.value = evento.name;
    optionFilter.text = `${evento.name} - ${formatCurrency(evento.price)}`;

    eventosFilter.appendChild(optionFilter);

    const optionModal = document.createElement('option');

    optionModal.value = realEstate.name;
    optionModal.text = `${evento.name} - ${formatCurrency(evento.price)}`;

    eventosModal.appendChild(optionModal);
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

function getSalesData(realEstate, customerName, salesman, saleDate) {

  const url = buildGetSalesDataUrl(realEstate, customerName, salesman, saleDate);

  fetchAPI(url, 'GET')
    .then(data => {
      const salesList = mapAPIToSales(data);
      displaySalesView(salesList);
    });
}


function createSale(sale) {

  fetchAPI(`${apiURL}/sales`, 'POST', sale)
    .then(sale => {
      closeAddSaleModal();
      resetSales();
      window.alert(`Venta ${sale.id} creada correctamente.`);
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

//#region filtros

// funcion que genera la URL para consultar ventas con filtros

function buildGetSalesDataUrl(realEstate, customerName, salesman, saleDate) {
  
  const url = new URL(`${apiURL}/sales`);

  if (realEstate) {
    url.searchParams.append('realEstate', realEstate);
  }

  if (customerName) {
    url.searchParams.append('customerName', customerName);
  }

  if (salesman) {
    url.searchParams.append('salesman', salesman);
  }

  if (saleDate) {
    url.searchParams.append('saleDate', saleDate);
  }

  return url;
}


//region crear venta

function createSale(sale) {

    fetchAPI(`${apiURL}/sales`, 'POST', sale)
        .then(sale => {
            closeAddSaleModal();
            resetSales();
            window.alert(`Venta ${sale.id} creada correctamente.`);
        });

}

//#region inicializamos funcionalidad
getSalesData();
//#endregion
