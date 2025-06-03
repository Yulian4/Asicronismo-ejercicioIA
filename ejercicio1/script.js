//solo por consola

//funciones de archivos con promesas
const fs = require('fs/promises');
//para trabajar con rutas de carpetas de forma segura
const path = require('path');

const CARPETA_SALIDA = path.join(__dirname, 'salida');
//__dirname es una palabra especial que representa la carpeta donde está tu archivo JS.
//path.join une carpetas de forma segura (evita errores de ruta).
//Así creamos: ./salida/ PODEO COLOCAR OTOS NOMBRES DE CARPETAS
const TOTAL_ARCHIVOS = 10; // Puedes ajustar esta cantidad
const ARCHIVOS_POR_LOTE = 2; // Controla cuántos archivos se procesan a la vez

// Asegura que la carpeta de salida exista
async function asegurarCarpetaSalida() {
    try {
        //  Esta función usa mkdir para crear la carpeta si no existe.
        // El { recursive: true } le dice que puede crear carpetas anidadas sin problema.
        await fs.mkdir(CARPETA_SALIDA, { recursive: true });
    } catch (error) {
        console.error(" Error al crear la carpeta de salida:", error);
    }
}

// Genera contenido 
function generarContenidoArchivo(indice) {
    return `Archivo número: ${indice}\nContenido generado automáticamente.\n`;
}

// Escribe un solo archivo
async function escribirArchivo(indice) {
    const nombreArchivo = path.join(CARPETA_SALIDA, `archivo_${indice}.txt`);
    const contenido = generarContenidoArchivo(indice);
    await fs.writeFile(nombreArchivo, contenido);
}
// ejecutra segun los lotes
async function generarArchivos() {
    await asegurarCarpetaSalida();

    for (let i = 0; i < TOTAL_ARCHIVOS; i += ARCHIVOS_POR_LOTE) {
        const lote = [];

        for (let j = i; j < i + ARCHIVOS_POR_LOTE && j < TOTAL_ARCHIVOS; j++) {
            lote.push(escribirArchivo(j));
        }
        //ese allsettled espera a que todas las promesas terminen
        await Promise.allSettled(lote);
        console.log(`Lote ${i} de ${i + lote.length - 1} completado.`);
    }

    console.log(` Generación de ${TOTAL_ARCHIVOS} archivos completada.`);
}

// Iniciar
generarArchivos().catch(error => console.error(" Error durante la generación:", error));
