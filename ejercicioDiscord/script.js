async function sendMsj() {
  
    const prompt = document.getElementById('prompt').value;
    const respuestaIA= document.getElementById('respuestaIA');
    const apiKey = "AIzaSyDQsUtn0MsaxqHSCX72sfEIGVfyUkVw7GM";


    if (!prompt.trim()) {
        respuestaIA.textContent = "Por favor, ingresa algún texto.";
        return;
    }

    if (apiKey === "YOUR_API_KEY") {
        respuestaIA.innerHTML = "<strong>Error:</strong> Por favor, reemplaza 'YOUR_API_KEY' con tu clave de API real en el código JavaScript.";
        return;
    }

    respuestaIA.textContent = ""; // Limpiar respuesta anterior

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
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


        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error en la API:", errorData);
            respuestaIA.textContent = `Error: ${response.status} - ${errorData.error?.message || 'Error desconocido. Revisa la consola para más detalles.'}`;
            return;
        }

        const data = await response.json();


       if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
    const respuesta = data.candidates[0].content.parts[0].text;
    respuestaIA.textContent = respuesta;

    if (
        prompt.toLowerCase().includes("mensaje") ||
        prompt.toLowerCase().includes("discord") ||
        prompt.toLowerCase().includes("enviar")
    ) {
        alert("Mensaje enviado a Discord.");
    }
}
else if (data.promptFeedback && data.promptFeedback.blockReason) {
    respuestaIA.textContent = `Solicitud bloqueada: ${data.promptFeedback.blockReason}. Razón: ${data.promptFeedback.blockReasonMessage || 'No se proporcionó un mensaje específico.'}`;
}
else {
    respuestaIA.textContent = "No se recibió contenido en la respuesta o la estructura es inesperada.";
    console.log("Respuesta completa de la API:", data);
}

    } catch (error) {
        console.error("Error en la solicitud fetch:", error);
        respuestaIA.textContent = "Error al conectar con la API. Revisa la consola para más detalles.";
    }
}