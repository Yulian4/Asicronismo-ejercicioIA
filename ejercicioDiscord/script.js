async function sendMsj() {
  const prompt = document.getElementById('prompt').value.trim();
  const respuestaIA = document.getElementById('respuestaIA');
   const apiKey = "AIzaSyDQsUtn0MsaxqHSCX72sfEIGVfyUkVw7GM";

  respuestaIA.textContent = "";

  if (!prompt) {
    respuestaIA.textContent = "Por favor, ingresa algún texto.";
    return;
  }

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      respuestaIA.textContent = `Error: ${response.status} - ${errorData.error?.message || 'Error desconocido'}`;
      console.error("Error en la API:", errorData);
      return;
    }

    const data = await response.json();
    const textoRespuesta =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No se recibió contenido útil.";

    respuestaIA.textContent = textoRespuesta;

  } catch (error) {
    console.error("Error en la solicitud:", error);
    respuestaIA.textContent = "Error al conectar con la API.";
  }
}

async function btnDiscord() {
  const prompt = document.getElementById('prompt').value.trim();
  const respuestaIA = document.getElementById('respuestaIA');
  const discordURL = "https://discord.com/api/webhooks/1378884850571808839/gVfPZ3j6hH_G6Jlmum7evHkszMK92OPoWzSVB1pBo3nT9InR6eanHiYzaJctHx5d2oE6";

  if (!prompt) {
    respuestaIA.textContent = "Por favor, ingresa algún texto.";
    return;
  }

  try {
    await fetch(discordURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: `📩 Mensaje enviado desde el formulario: ${prompt}`
      })
    });

    Swal.fire("¡Envío exitoso!", "Revisa tu Discord", "success");
  } catch (error) {
    console.error("Error al enviar a Discord:", error);
    Swal.fire("Error", "No se pudo enviar el mensaje a Discord", "error");
  }
}
