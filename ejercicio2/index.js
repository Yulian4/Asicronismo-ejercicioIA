document.getElementById("resumir").addEventListener("click", async () => {
    const texto = document.getElementById("entrada").value;

    if (!texto || texto.length < 50) {
        document.getElementById("resultado").textContent = "Por favor ingresa un texto más largo.";
        return;
    }

    document.getElementById("resultado").textContent = "Generando resumen...";

    try {
        const respuesta = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",// aqui es para eviar datos en json
            },
            body: JSON.stringify({ inputs: texto })// aqui se envuara el texto del usuario como propiedad inputs

        });

        const resultado = await respuesta.json();

        // se compara si es un array asi: y eso significa que obtuvimos un resumen exitosamente
        if (Array.isArray(resultado)) {
            const resumen = resultado[0].summary_text;
            document.getElementById("resultado").textContent = resumen;
        } else if (resultado.error) {
            document.getElementById("resultado").textContent = "la IA está encendiendo";
           // Si la respuesta noviene en array no das error
        } else {
            document.getElementById("resultado").textContent = "Error al generar el resumen.";
        }

    } catch (error) {
        console.error("Error al conectar con IA:", error);
        document.getElementById("resultado").textContent = "Error de red o servidor.";
    }
});