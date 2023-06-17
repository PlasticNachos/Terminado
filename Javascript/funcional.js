window.addEventListener("load",inicio);

let sistema = new Sistema;

function inicio(){
    document.getElementById("idBotonBuscar").addEventListener("click",buscar);
    document.getElementById("idPrincipal").addEventListener("click",menuPrincipal);
    document.getElementById("idVerReclamos").addEventListener("click",menuReclamos);
    document.getElementById("idEstadisticas").addEventListener("click",menuEstadisticas);
    document.getElementById("idAgregarEmpresa").addEventListener("click",menuAgregarEmpresa);
    document.getElementById("idBotonReclamo").addEventListener("click",menuAgregarReclamo);
    document.getElementById("idBotonAgregar").addEventListener("click",agregarReclamo);
    document.getElementById("idOrdenNombreCreciente").addEventListener("click",ordenNomCreciente);
    document.getElementById("idOrdenNombreDecreciente").addEventListener("click",ordenNomDecreciente);
    document.getElementById("idBotonAgregar2").addEventListener("click",agregarEmpresa);
    document.getElementById("idBotonVolver").addEventListener("click",volver);
    esconderAgregarReclamo()
    menuPrincipal();
}

function buscar(){  
    event.preventDefault(); 
    esconderSecciones();
    let input = document.getElementById("idBuscador").value
    let formBuscador = document.getElementById("idFormBuscador");
    if (formBuscador.reportValidity()){
        let contenedor = document.getElementById("idDiv");
        contenedor.innerHTML="";
        if (sistema.darTodoRelacionado(input).length!=0){
            esconderSecciones();
            document.getElementById("Seccion2").style.display = "block";
            let datos = sistema.darTodoRelacionado(input).sort(function(a,b){return b.numeroReclamo-a.numeroReclamo})
            for (let elem of datos){
                agregarArticulosDeReclamo(elem);
            }
        } else {
            document.getElementById("Seccion2").style.display = "block";
            let nodo = document.createElement("p");
            let nodoTexto = document.createTextNode("No hay datos.");
            nodo.appendChild(nodoTexto);
            document.getElementById("idDiv").appendChild(nodo);
        }
        
    }
    formBuscador.reset();
}

function menuPrincipal(){
    esconderSecciones();
    document.getElementById("Seccion1").style.display = "block";
}

function menuReclamos(){
    if (sistema.listaReclamos!=0){
        esconderSecciones();
        document.getElementById("Seccion2").style.display = "block";
        document.getElementById("idDiv").innerHTML="";
        for (let i = sistema.listaReclamos.length - 1; i >= 0; i--) {
            agregarArticulosDeReclamo(sistema.listaReclamos[i]);
        }
    } else {
        alert("No hay reclamos ingresados.");
    }
}

function menuEstadisticas(){
    if (sistema.listaEmpresas !=0){
        esconderSecciones();
        document.getElementById("Seccion3").style.display = "block";
    } else {
        alert("No hay empresas ingresadas.")
    };
}

function menuAgregarEmpresa(){
    esconderSecciones();
    document.getElementById("Seccion4").style.display = "block";
}

function menuAgregarReclamo(){
    if (sistema.listaEmpresas.length!=0){
        mostrarAgregarReclamo();
        esconderGestionReclamos();
    } else {
        alert("No hay empresas agregadas.");
    }
}

function esconderSecciones(){
    let secciones = document.getElementsByClassName("Seccion");
    for (let elemento of secciones){
        elemento.style.display = "none"
    }
}

function agregarReclamo(){
    let miForm = document.getElementById("idFormulario");
    let nombre = document.getElementById("idNom").value;
    let empresa = sistema.darEmpresaPorNombre(document.getElementById("idSelectDropdown").value);
    let titulo = document.getElementById("idReclamo").value;
    let reclamo = document.getElementById("idParrafoReclamo").value;

    if(miForm.reportValidity()){
        let nuevoReclamo = new Reclamo (nombre, empresa, titulo, reclamo);
        sistema.agregarReclamo(nuevoReclamo);
        let nombreReclamo = variableParaReclamo();
        globalThis[nombreReclamo] = nuevoReclamo;
        document.getElementById("idDiv").innerHTML="";
        for (let i = sistema.listaReclamos.length - 1; i >= 0; i--) {
            agregarArticulosDeReclamo(sistema.listaReclamos[i]);
        }
        miForm.reset();
        cargarPromedio();
    }     
}

function agregarEmpresa(){
    let miForm2 = document.getElementById("idFormulario2")
    let nomEmpresa = document.getElementById("idNom2").value;
    let direc = document.getElementById("idDirec").value;
    let rubro = document.getElementById("idRubro").value;
    
    if(miForm2.reportValidity()){
        if(!sistema.existeEmpresa(nomEmpresa)){
            let nuevaEmpresa = new Empresa(nomEmpresa, direc, rubro);
            let nombreEmpresa = variableParaEmpresa();
            globalThis[nombreEmpresa] = nuevaEmpresa;
            miForm2.reset();
            sistema.agregarEmpresa(nuevaEmpresa);
            agregarEmpresaASelect(nuevaEmpresa);
            agregarBotonLetra(sistema.darInicialesEmpresasOrdenadas());
            cargarPromedio();
            ingresarCantEmpresas();
            cargarListaEmpresasSinReclamos();
            cargarListaRubrosMaxCantidadReclamos();
        } else {
            alert("Esa empresa ya existe.")
        }
    }     
}

function agregarEmpresaASelect(nombre){
    let nodo = document.createElement("option");
    let nodoTexto = document.createTextNode(nombre);
    nodo.appendChild(nodoTexto);
    document.getElementById("idSelectDropdown").appendChild(nodo);
}

function agregarArticulosDeReclamo(nuevoReclamo){
    let articuloNuevo = document.createElement("article");
    articuloNuevo.setAttribute("id", "idArticuloNuevo")
    document.getElementById("idDiv").appendChild(articuloNuevo);
    let h3 = document.createElement("h3");
    articuloNuevo.appendChild(h3);
    let textnodo = document.createTextNode("Reclamo No."+nuevoReclamo.numeroReclamo);
    h3.appendChild(textnodo);
    let div = document.createElement("div");
    div.setAttribute("class", "ReclamosIngresados");
    articuloNuevo.appendChild(div);
    let p1 = document.createElement("p");
    let textnodo2 = document.createTextNode(nuevoReclamo.nombre+": ");
    p1.appendChild(textnodo2);
    div.appendChild(p1);
    let span1 = document.createElement("span");
    span1.setAttribute("class", "Comentarios");
    let textnodo3 = document.createTextNode(nuevoReclamo.titulo);
    span1.appendChild(textnodo3);
    p1.appendChild(span1);
    let p2 = document.createElement("p");
    let textnodo4 = document.createTextNode("Empresa: ");
    p2.appendChild(textnodo4);
    div.appendChild(p2);
    let span2 = document.createElement("span");
    span2.setAttribute("class", "Empresas");
    let textnodo5 = document.createTextNode(nuevoReclamo.empresa);
    span2.appendChild(textnodo5);
    p2.appendChild(span2);
    let p3 = document.createElement("p");
    let textnodo6 = document.createTextNode(nuevoReclamo.reclamo);
    p3.appendChild(textnodo6);
    div.appendChild(p3);
    let p4 = document.createElement("p");
    div.appendChild(p4);
    let boton = document.createElement("button");
    let textnodo7 = document.createTextNode("¡A mi también me pasó!");
    boton.appendChild(textnodo7);
    p4.appendChild(boton);
    let textnodo8 = document.createTextNode(" Contador: ");
    p4.appendChild(textnodo8);
    let span3 = document.createElement("span");
    let textnodo9 = document.createTextNode(nuevoReclamo.contador);
    span3.appendChild(textnodo9);
    p4.appendChild(span3);
    actualizarReclamos();
    cargarListaEmpresasSinReclamos();
    cargarListaRubrosMaxCantidadReclamos();
    boton.addEventListener("click", function(){
        nuevoReclamo.subirContador();
        span3.innerHTML=nuevoReclamo.contador;
        cargarPromedio();
        cargarListaRubrosMaxCantidadReclamos();
        
        let tabla = document.getElementById("idTabla");
        let filas = tabla.rows;
      
        for (let i = 1; i < filas.length; i++) {
          let fila = filas[i];
          let celda4 = fila.cells[3]; 
          let empresaNombre = fila.cells[0].innerHTML;
          celda4.innerHTML = sistema.darNumeroDeReclamosDeEmpresa(empresaNombre);
        }
    });
}

function test() {
    let empresas = [
        new Empresa("La Pasiva", "26 de marzo 554", "Restaurantes"),
        new Empresa("Santander", "18 de julio 332", "Bancos"),
        new Empresa("Divino", "Constituyente 1881", "Muebles"),
        new Empresa("Hyundai", "Rambla Ghandi 787", "Autos"),
        new Empresa("Barométrica Marcos", "Andes 1612", "Servicios"),
        new Empresa("Burger King", "Luis A. de Herrera 332", "Restaurantes"),
        new Empresa("La Ibérica", "Sarandí 1254", "Muebles"),
    ];
  
    let reclamos = [
        new Reclamo("Miguel", empresas[1], "No me llegó la tarjeta", "La pedí hace más de un mes y aún no me ha llegado.", 4),
        new Reclamo("Edgardo", empresas[3], "Se me averió el auto", "Tenía menos de 5 mil kilómetros y se fundió el motor.", 2),
        new Reclamo("Ximena", empresas[2], "Piezas faltantes", "Compré el escritorio gamer y me vino sin los tornillos.", 11),
        new Reclamo("Matías", empresas[2], "Tabla rota", "Compré la mesa de comedor para 5 personas y la tabla de la mesada estaba rajada.", 1),
        new Reclamo("Edgardo", empresas[6], "Pésima atención", "Espantosa atención. Las vendedoras no tienen idea de lo que venden. Ya no es lo que supo ser.", 6),
    ];
  
    for (let empresa of empresas) {
        sistema.agregarEmpresa(empresa);
        agregarEmpresaASelect(empresa);
        let nombreEmpresa = variableParaEmpresa();
        globalThis[nombreEmpresa] = empresa;
    }
  
    for (let reclamo of reclamos) {
        sistema.agregarReclamo(reclamo)
        let nombreReclamo = variableParaReclamo();
        globalThis[nombreReclamo] = reclamo;
    }
  
    document.getElementById("idDiv").innerHTML = "";
    for (let i = sistema.listaReclamos.length - 1; i >= 0; i--) {
        agregarArticulosDeReclamo(sistema.listaReclamos[i]);
    }
    agregarBotonLetra(sistema.darInicialesEmpresasOrdenadas());
    cargarPromedio();
    ingresarCantEmpresas();
}

var numeroParaReclamo = 0;
var numeroparaEmpresa = 0;

function variableParaReclamo(){
    numeroParaReclamo++;
    return "Reclamo" + numeroParaReclamo;
}

function variableParaEmpresa(){
    numeroparaEmpresa++;
    return "Empresa" + numeroparaEmpresa;
}

function agregarBotonLetra(array){
    let contenedor = document.getElementById("idBotones");
    contenedor.innerHTML = "";
    array.push("*");
    for (let letra of array){
        let botonNuevo = document.createElement("button");
        botonNuevo.setAttribute("class","Botones");
        botonNuevo.textContent = letra;
        contenedor.appendChild(botonNuevo);
        botonNuevo.addEventListener("click", function(){
            let botones = contenedor.children;
            for (let i = 0; i < botones.length; i++) {
                botones[i].classList.remove("BotonesActive");
                botones[i].classList.add("Botones");
            }
            botonNuevo.classList.remove("Botones")
            botonNuevo.classList.add("BotonesActive");
            cargarTabla(letra);

            //Mantiene la selección de la tabla (creciente o decreciente)
            let radioCreciente = document.getElementById("idOrdenNombreCreciente");
            let radioDecreciente = document.getElementById("idOrdenNombreDecreciente");
            if (radioCreciente.checked){
                ordenNomCreciente();
            } else if (radioDecreciente.checked){
                ordenNomDecreciente();
            }
        });
    }

    //simula un click
    let todosBotones = contenedor.getElementsByTagName("button");
    if (todosBotones.length > 0) {
        todosBotones[todosBotones.length - 1].click();
    }
}

function cargarTabla(letra){

    let tabla = document.getElementById("idTabla");
    tabla.innerHTML="";

    let caption = document.createElement("caption");
    caption.innerHTML="Empresas que empiezan con " + letra;
    tabla.appendChild(caption);

    let fila0 = tabla.insertRow();
    let celdaNombre = document.createElement("th");
    celdaNombre.innerHTML = "Nombre";
    fila0.appendChild(celdaNombre);
    
    let celdaDireccion = document.createElement("th");
    celdaDireccion.innerHTML = "Dirección";
    fila0.appendChild(celdaDireccion);
    
    let celdaRubro = document.createElement("th");
    celdaRubro.innerHTML = "Rubro";
    fila0.appendChild(celdaRubro);
    
    let celdaCantidad = document.createElement("th");
    celdaCantidad.innerHTML = "Cantidad";
    fila0.appendChild(celdaCantidad);

    let datos = sistema.darEmpresasQueEmpiezanCon(letra)

    if(letra=="*"){
        datos = sistema.ordenarEmpresasOrdenCreciente();
        caption.innerHTML = "Empresas: Todas"
    }

    for (let elem of datos){
        let fila = tabla.insertRow();
        let celda1 = fila.insertCell();
        celda1.innerHTML = elem.nombre;
        let celda2 = fila.insertCell();
        celda2.innerHTML = elem.direccion;
        let celda3 = fila.insertCell();
        celda3.innerHTML = elem.rubro;
        let celda4 = fila.insertCell();
        celda4.innerHTML = sistema.darNumeroDeReclamosDeEmpresa(elem.nombre);
    }
}

function ordenNomCreciente() {
    let tabla = document.getElementById("idTabla");
    
    // Obtener todas las filas excepto la primera fila (encabezado) y convertirlas en un array.
    let rows = Array.from(tabla.rows).slice(1);
    
    // Ordenar las filas en orden ascendente basándose en la primera columna (nombre)
    rows.sort((a, b) => {
        // Extraer los nombres de las celdas y convertirlos a minúsculas
        let nombreA = a.cells[0].innerHTML.toLowerCase();
        let nombreB = b.cells[0].innerHTML.toLowerCase();
      
        return nombreA.localeCompare(nombreB);
    });
    
    // Agregar cada fila ordenada de nuevo a la tabla
    rows.forEach(row => tabla.appendChild(row));
    
    document.getElementById("idOrdenNombreCreciente").removeEventListener("click", ordenNomCreciente);
    document.getElementById("idOrdenNombreDecreciente").addEventListener("click", ordenNomDecreciente);
}
  
function ordenNomDecreciente() {
    let tabla = document.getElementById("idTabla");
    let rows = Array.from(tabla.rows).slice(1);
    rows.sort((a, b) => {
        let nombreA = a.cells[0].innerHTML.toLowerCase();
        let nombreB = b.cells[0].innerHTML.toLowerCase();
        return nombreB.localeCompare(nombreA);
    });
    rows.forEach(row => tabla.appendChild(row));
    document.getElementById("idOrdenNombreDecreciente").removeEventListener("click", ordenNomDecreciente);
    document.getElementById("idOrdenNombreCreciente").addEventListener("click", ordenNomCreciente);
}
  
function cargarPromedio(){
    let promedioEnPagina = document.getElementById("idSpanPromedio");
    promedioEnPagina.innerHTML="";
    promedioEnPagina.innerHTML=sistema.darPromedioReclamosPorEmpresa();
}

function actualizarReclamos() {
    let tabla = document.getElementById("idTabla");
    let rows = Array.from(tabla.rows).slice(1);
  
    rows.forEach((row) => {
        let nombreDeEmpresa = row.cells[0].textContent.trim();
        let reclamoCell = row.cells[row.cells.length - 1];
        let cantidadReclamos = sistema.darNumeroDeReclamosDeEmpresa(nombreDeEmpresa);
        reclamoCell.textContent = cantidadReclamos.toString();
    });
}
  
function ingresarCantEmpresas(){
    let cantEnPagina = document.getElementById("idSpanCantEmpresas");
    cantEnPagina.innerHTML="";
    cantEnPagina.innerHTML=sistema.listaEmpresas.length;
}

function cargarListaEmpresasSinReclamos(){
    let listaEmpresasSinReclamosEnPagina = document.getElementById("idListaEmpresasSinReclamos");
    listaEmpresasSinReclamosEnPagina.innerHTML = "";
    let datos = sistema.darEmpresasSinReclamos();
    for (let elem of datos){
        let nodo = document.createElement("li");
        let nodotexto = document.createTextNode(elem);
        nodo.appendChild(nodotexto);
        listaEmpresasSinReclamosEnPagina.appendChild(nodo);
    }
}

function cargarListaRubrosMaxCantidadReclamos(){
    let listaRubrosMaxReclamosEnPagina = document.getElementById("idListaRubrosMaxCantidadReclamos");
    if (sistema.listaReclamos!=0){
        listaRubrosMaxReclamosEnPagina.innerHTML="";
        let datos = sistema.darRubroConMayorReclamos();
        for (let elem of datos){
            let nodo = document.createElement("li");
            let nodotexto = document.createTextNode(elem);
            nodo.appendChild(nodotexto);
            listaRubrosMaxReclamosEnPagina.appendChild(nodo);
        }
    } else {
        listaRubrosMaxReclamosEnPagina.innerHTML="";
        let nodo = document.createElement("li");
        let nodotexto = document.createTextNode("No hay datos.");
        nodo.appendChild(nodotexto);
        listaRubrosMaxReclamosEnPagina.appendChild(nodo);
    }
   
}

function esconderAgregarReclamo(){
    document.getElementById("idAgregarReclamo").style.display = "none";
}

function mostrarAgregarReclamo(){
    document.getElementById("idAgregarReclamo").style.display = "block";
}

function esconderGestionReclamos(){
    document.getElementById("idGestionReclamos").style.display = "none";
}

function mostrarGestionReclamos(){
    document.getElementById("idGestionReclamos").style.display = "block";
}

function volver(){
    esconderAgregarReclamo();
    mostrarGestionReclamos();
}
