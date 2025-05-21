document.getElementById("generar").addEventListener("click",async()=>{
    let cantidad = parseInt(document.getElementById("cant").value)
    let bloques = parseInt(document.getElementById("bloques").value)

    if(cantidad<=0||isNaN(cantidad)){
        document.getElementById("msj").textContent="Recuerda ingresar datos válidos"
        return
    }
    if(bloques<=0||isNaN(bloques)){
        document.getElementById("msj").textContent="Recuerda ingresar datos validos"
        return
    }


    //genero la peticion http de nav a servidor
    const res = await fetch("/generar",{
        method:"POST", //envio para procesar
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({cantidad,bloques})
    })

    const data = await res.text() 
    document.getElementById("msj").textContent=data
})