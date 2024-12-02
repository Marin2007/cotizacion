// Elementos del DOM
const loadingGif = document.getElementById('loading');
const cotizacionesDiv = document.getElementById('cotizaciones');
const usdToBtcElem = document.getElementById('usdToBtc');
const usdToEurElem = document.getElementById('usdToEur');
const usdToCopElem = document.getElementById('usdToCop');

// Función para obtener cotización USD a BTC
async function fetchUsdToBtc() {
  const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
  const data = await response.json();
  return data.bpi.USD.rate_float;
}

// Función para obtener cotización USD a EUR
async function fetchUsdToEur() {
  const response = await fetch('https://open.er-api.com/v6/latest/USD');
  const data = await response.json();
  return data.rates.EUR;
}

// Función para obtener cotización USD a COP
async function fetchUsdToCop() {
  const response = await fetch('https://open.er-api.com/v6/latest/COP');
  const data = await response.json();
  return data.rates.USD; // COP inverso a USD
}

// Función para cargar las cotizaciones
async function cargarCotizaciones() {
  try {
    // Mostrar el gif de carga
    loadingGif.style.display = 'block';

    // Hacer las peticiones asincrónicas
    const [usdToBtc, usdToEur, usdToCop] = await Promise.all([
      fetchUsdToBtc(),
      fetchUsdToEur(),
      fetchUsdToCop(),
    ]);

    // Mostrar los datos en la página
    usdToBtcElem.textContent = usdToBtc.toFixed(6) + ' BTC';
    usdToEurElem.textContent = usdToEur.toFixed(2) + ' EUR';
    usdToCopElem.textContent = (1 / usdToCop).toFixed(2) + ' COP'; // Invertir la tasa

    // Ocultar el gif y mostrar las cotizaciones
    loadingGif.style.display = 'none';
    cotizacionesDiv.style.display = 'block';
  } catch (error) {
    console.error('Error al cargar las cotizaciones:', error);
    alert('No se pudieron cargar las cotizaciones. Intenta nuevamente más tarde.');
  }
}

// Cargar las cotizaciones al cargar la página
cargarCotizaciones();
