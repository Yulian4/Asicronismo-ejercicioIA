const lat = 6.25184;
const lon = -75.56359;

const api1 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

const api2 = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

document.getElementById("button").addEventListener("click", obtenerClima);

async function obtenerClima() {
  try {
    const promesa1 = fetch(api1).then(async r => {
      const data = await r.json();
      return {
        fuente: "Open-Meteo",
        temperatura: data.current_weather.temperature,
        viento: data.current_weather.windspeed
      };
    });

    const promesa2 = fetch(api2, {
      headers: { "User-Agent": "mi-aplicacion" }
    }).then(async r => {
      const data = await r.json();
      const datosHoraActual = data.properties.timeseries[0].data.instant.details;
      return {
        fuente: "Met.no",
        temperatura: datosHoraActual.air_temperature,
        viento: datosHoraActual.wind_speed
      };
    });

    const clima = await Promise.race([promesa1, promesa2]);

    const resumen = generarResumen(clima);
    document.getElementById("resultado").textContent = resumen;
    console.log(` Fuente: ${clima.fuente}`);
  } catch (error) {
    console.error(" No se pudo obtener el clima:", error.message);
    document.getElementById("resultado").textContent = "Error obteniendo el clima.";
  }
}

function generarResumen({ temperatura, viento }) {
  let descripcion = '';
  if (temperatura > 30) descripcion += 'Hace mucho calor. ';
  else if (temperatura > 20) descripcion += 'El clima está cálido. ';
  else descripcion += 'Hace algo de frío. ';

  descripcion += `Temperatura: ${temperatura}°C. Viento: ${viento} km/h.`;
  return descripcion;
}
