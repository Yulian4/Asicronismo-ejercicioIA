
const imagenes = [
    'assets/gatito.png',
    'assets/perro.jpg',
    'assets/tiburoncin.webp',
    'assets/elefante.webp',
    'assets/pantera.jpg',
    'assets/duck.jpg'
]

const aleatoria = imagenes[Math.floor(Math.random() * imagenes.length)]

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("imagen").src = aleatoria;
})

async function sendToGemini() {

    const inputText = document.getElementById('inputText').value;
    const responseContainer = document.getElementById('responseContainer');
    const loader = document.getElementById('loader');
    const apiKey = "AIzaSyDQsUtn0MsaxqHSCX72sfEIGVfyUkVw7GM";
    const texto = 'Clasifica el siguiente comentario respondiendo solo "positivo" , "negativo " y si no tiene clasificacion en positivo y negativo dices "neutral : "' + inputText


    if (!inputText.trim()) {
        responseContainer.textContent = "Por favor, ingresa algún texto.";
        return;
    }

    if (apiKey === "YOUR_API_KEY") {
        responseContainer.innerHTML = "<strong>Error:</strong> Por favor, reemplaza 'YOUR_API_KEY' con tu clave de API real en el código JavaScript.";
        return;
    }

    responseContainer.textContent = ""; // Limpiar respuesta anterior
    loader.style.display = 'block'; // Mostrar loader

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
        "contents": [
            {
                "parts": [
                    {
                        "text": texto
                    }
                ]
            }
        ]
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        loader.style.display = 'none'; // Ocultar loader

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error en la API:", errorData);
            responseContainer.textContent = `Error: ${response.status} - ${errorData.error?.message || 'Error desconocido. Revisa la consola para más detalles.'}`;
            return;
        }

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
            respuesta = data.candidates[0].content.parts[0].text;

            if (respuesta.toLowerCase().trim() === "positivo") {
                Swal.fire("La clasificación de tu comentario es: ", respuesta, "success").then(() => {
                    location.reload();
                });
            } else if (respuesta.toLowerCase().trim() === "negativo") {
                Swal.fire("La clasificación de tu comentario es:", respuesta, "error").then(() => {
                    location.reload();
                });
            } else {
                Swal.fire("La clasificación de tu comentario es:", respuesta, "warning").then(() => {
                    location.reload();
                });
            }

        } else if (data.promptFeedback && data.promptFeedback.blockReason) {
            responseContainer.textContent = `Solicitud bloqueada: ${data.promptFeedback.blockReason}. Razón: ${data.promptFeedback.blockReasonMessage || 'No se proporcionó un mensaje específico.'}`;
        }
        else {
            responseContainer.textContent = "No se recibió contenido en la respuesta o la estructura es inesperada.";
            console.log("Respuesta completa de la API:", data);
        }

    } catch (error) {
        loader.style.display = 'none'; // Ocultar loader
        console.error("Error en la solicitud fetch:", error);
        responseContainer.textContent = "Error al conectar con la API. Revisa la consola para más detalles.";
    }
}