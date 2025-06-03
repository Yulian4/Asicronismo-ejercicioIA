const express = require("express");
const fs = require("fs/promises");
const path = require("path");


process.on("uncaughtException", (err) => {
  console.error("Excepción no atrapada:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Promesa rechazada no manejada:", reason);
});

const app = express();
const PORT = 5500;

app.use(express.static("front"));
app.use(express.json());

const CARPETA_SALIDA = path.join(__dirname, "salida");

async function asegurarCarpetaSalida() {
  try {
    await fs.mkdir(CARPETA_SALIDA, { recursive: true });
  } catch (error) {
    console.error("Error al crear la carpeta de salida:", error);
  }
}

function generarContenidoArchivo(indice) {
  return `Archivo número: ${indice}\nContenido generado automáticamente.\n`;
}

async function escribirArchivo(indice) {
  const nombreArchivo = path.join(CARPETA_SALIDA, `archivo_${indice}.txt`);
  const contenido = generarContenidoArchivo(indice);
  await fs.writeFile(nombreArchivo, contenido);
}

async function generarArchivos(TOTAL_ARCHIVOS, ARCHIVOS_POR_LOTE) {
  await asegurarCarpetaSalida();

  for (let i = 0; i < TOTAL_ARCHIVOS; i += ARCHIVOS_POR_LOTE) {
    const lote = [];

    for (let j = i; j < i + ARCHIVOS_POR_LOTE && j < TOTAL_ARCHIVOS; j++) {
      lote.push(escribirArchivo(j));
    }

    await Promise.allSettled(lote);
    console.log(`Lote ${i} de ${i + lote.length - 1} completado.`);
  }

  console.log(`Generación de ${TOTAL_ARCHIVOS} archivos completada.`);
}

app.post("/generar", async (req, res) => {
  const { cantidad, bloques } = req.body;
   console.log("Datos recibidos:", { cantidad, bloques });

  try {
    await generarArchivos(cantidad, bloques);
    res.send(`Se generaron ${cantidad} archivos en bloques de ${bloques}`);
  } catch (error) {
    console.error("Error durante la generación:", error);
    res.status(500).send("Error generando archivos");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
