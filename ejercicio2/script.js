async function ConsumirApi() {
    
    const texto = "Al venir al mundo fueron delicadamente mecidas por las manos de la lustral Doniazada, su buena tía, que grabó sus nombres sobre hojas de oro coloreadas de húmedas pedrerías y las cuidó bajo el terciopelo de sus pupilas hasta la adolescencia dura, para esparcirlas después, voluptuosas y libres, sobre el mundo oriental, eternizado por su sonrisa.Yo os las entrego tales como son, en su frescor de carne y de rosa. Sólo existe un método honrado y lógico de traducción: la «literalidad», una literalidad impersonal, apenas atenuada por un leve parpadeo y una ligera sonrisa del traductor. Ella crea, sugestiva, la más grande potencia literaria. Ella produce el placer de la evocación. Ella es la garantía de la verdad. Ella es firme e inmutable, en su desnudez de piedra. Ella cautiva el aroma primitivo y lo cristaliza. Ella separa y desata... Ella fija.La literalidad encadena el espíritu divagador y lo doma, al mismo tiempo que detiene la infernal facilidad de la pluma. Yo me felicito de que así sea; porque ¿dónde encontrar un traductor de genio simple, anónimo, libre de la necia manía de su renombre";

    if (!texto || texto.length < 50) {
        console.log("Por favor ingresa un texto más largo.") ;
        return;
    }

    console.log("se esta generando el resumnen") ;

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
            console.log(resumen) ;
        } else if (resultado.error) {
            console.log("la IA está encendiendo") ;
            // Si la respuesta noviene en array no das error
        } else {
            console.log("Error al generar el resumen.") ;
        }

    } catch (error) {
        console.error("Error", error);
        console.log("otro error") ;
    }
};

ConsumirApi();