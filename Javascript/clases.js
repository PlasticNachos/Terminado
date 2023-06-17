class Empresa{
    constructor(nombre, direccion, rubro){
        this.nombre = nombre;
        this.direccion = direccion;
        this.rubro = rubro;
    }
    toString(){
        return this.nombre;
    }
}

class Reclamo{
    static #ultimoNumeroDeReclamoAsignado = 0;

    constructor(nombre, empresa, titulo, reclamo, contador = 1){ // "contador = 1" hace que el contador del reclamo sea 1 cuando no se ingresa como parámetro.
        this.nombre = nombre;
        this.empresa = empresa;
        this.titulo = titulo;
        this.reclamo = reclamo;
        this.contador = contador;
        this.numeroReclamo = ++Reclamo.#ultimoNumeroDeReclamoAsignado;
    }
    toString(){
        return this.nombre;
    }
    subirContador(){
        this.contador++
    }
}

class Sistema{
    constructor(){
        this.listaEmpresas = [];
        this.listaReclamos = [];
    }
    agregarEmpresa(unaEmpresa){
        this.listaEmpresas.push(unaEmpresa);
    }
    darTodasLasEmpresas(){
        return this.listaEmpresas;
    }
    existeEmpresa(nombre){
        let existe = false;
        for (let i = 0; i < this.listaEmpresas.length && !existe; i++) {
            let empresaActual = this.listaEmpresas[i];
            if( empresaActual.nombre.toLowerCase() === nombre.toLowerCase() ){
                existe = true;
            }
        }
        return existe;
    }
    darEmpresaPorNombre(nombre){
        let encontre = false;
        for(let i=0; i< this.listaEmpresas.length && !encontre; i++){
            if(this.listaEmpresas[i].nombre.toUpperCase()==nombre.toUpperCase()){
                encontre = true;
                return this.listaEmpresas[i];
            }
        }
    }
    darEmpresasQueEmpiezanCon(letra){
        let empresasQueEmpiezanConLetra = [];
        for (let empresa of this.listaEmpresas){
            if(empresa.nombre.toUpperCase().startsWith(letra.toUpperCase())){
                empresasQueEmpiezanConLetra.push(empresa);
            }
        }
        return empresasQueEmpiezanConLetra;
    }
    ordenarEmpresasOrdenCreciente(){
        let empresasdeAaZ = this.listaEmpresas.sort(function(a,b){return a.nombre.localeCompare(b.nombre)});
        return empresasdeAaZ;
    }
    ordenarEmpresasOrdenDecreciente(){
        let empresasdeZaA = this.listaEmpresas.sort(function(a,b){return b.nombre.localeCompare(a.nombre)});
        return empresasdeZaA;
    }
    agregarReclamo(unReclamo){
        this.listaReclamos.push(unReclamo);
    }
    darTodosLosReclamos(){
        return this.listaReclamos;
    }
    darReclamosPorPersona(persona){
        let listaReclamosDePersona = [];
        for(let reclamo of this.listaReclamos){
            if(reclamo.nombre.toUpperCase() == persona.toUpperCase()){
                listaReclamosDePersona.push(reclamo);
            }
        }
        return listaReclamosDePersona;
    }
    darNumeroDeReclamosDeEmpresa(nombreDeEmpresa) {
        let numeroDeReclamosDeEmpresa = 0;
        for (let reclamo of this.listaReclamos) {
            if (reclamo.empresa.nombre.toUpperCase() === nombreDeEmpresa.toUpperCase()) {
                numeroDeReclamosDeEmpresa += reclamo.contador;
            }
        }
        return numeroDeReclamosDeEmpresa;
    }
    darEmpresasSinReclamos(){
        let empresasSinReclamos = [];
        for (let empresa of this.listaEmpresas){
            if (this.darNumeroDeReclamosDeEmpresa(empresa.nombre)==0){
                empresasSinReclamos.push(empresa.nombre + " (" + empresa.direccion + ") " + "Rubro: " + empresa.rubro);
            }
        }
        return empresasSinReclamos;
    }
    darReclamosDeEmpresa(nombreDeEmpresa) {
        let reclamosDeEmpresa = [];
        for (let reclamo of this.listaReclamos) {
            if (reclamo.empresa.nombre.toUpperCase() === nombreDeEmpresa.toUpperCase()) {
                reclamosDeEmpresa.push(reclamo);
            }
        }
        return reclamosDeEmpresa;
    }
    darNumeroDeReclamosDeEmpresas(){
        let numeroDeReclamosDeEmpresas = 0;
        for(let empresa of this.listaEmpresas){
            numeroDeReclamosDeEmpresas += this.darNumeroDeReclamosDeEmpresa(empresa.nombre);
        }
        return numeroDeReclamosDeEmpresas;
    }
    darInicialesEmpresasOrdenadas() {
        let todasIniciales = [];
        let inicialesUnicas = [];
        for (let empresa of this.listaEmpresas) {
            if (!todasIniciales.includes(empresa.nombre[0].toUpperCase())) {
            inicialesUnicas.push(empresa.nombre[0].toUpperCase());
            }
            todasIniciales.push(empresa.nombre[0].toUpperCase());
        }
        let inicialesUnicasOrdenadas = inicialesUnicas.sort(function(a,b){return a.localeCompare(b)});
        return inicialesUnicasOrdenadas;
    }
    darRubroConMayorReclamos() {
        let reclamosRubros = [];
        for (let i = 0; i < 7; i++) {
            reclamosRubros[i] = 0;
        }
      
        for (let reclamo of this.listaReclamos) {
            switch (reclamo.empresa.rubro) {
                case "Viajes":
                    reclamosRubros[0] += reclamo.contador;
                break;
                case "Restaurantes":
                    reclamosRubros[1] += reclamo.contador;
                break;
                case "Bancos":
                    reclamosRubros[2] += reclamo.contador;
                break;
                case "Muebles":
                    reclamosRubros[3] += reclamo.contador;
                break;
                case "Autos":
                    reclamosRubros[4] += reclamo.contador;
                break;
                case "Servicios":
                    reclamosRubros[5] += reclamo.contador;
                break;
                case "General":
                    reclamosRubros[6] += reclamo.contador;
                break;
            }
        }
      
        let maxReclamo = Number.MIN_SAFE_INTEGER;
        let rubroConMayorReclamos = [];
      
        for (let i = 0; i < reclamosRubros.length; i++) {
          if (reclamosRubros[i] === maxReclamo) {
            rubroConMayorReclamos.push(this.darRubroPorIndex(i) + ": cantidad " + reclamosRubros[i]);
          } else if (reclamosRubros[i] > maxReclamo) {
            rubroConMayorReclamos.length = 0;
            rubroConMayorReclamos.push(this.darRubroPorIndex(i) + ": cantidad " + reclamosRubros[i]);
            maxReclamo = reclamosRubros[i];
          }
        }
      
        if (this.listaReclamos.length !== 0) {
            return rubroConMayorReclamos.sort(function(a,b){return a.localeCompare(b)});
        } else {
            return "0"; 
        }
    }
    darRubroPorIndex(index) {
        switch (index) {
            case 0:
                return "Viajes";
            case 1:
                return "Restaurantes";
            case 2:
                return "Bancos";
            case 3:
                return "Muebles";
            case 4:
                return "Autos";
            case 5:
                return "Servicios";
            case 6:
                return "General";
        }
    }
    darPromedioReclamosPorEmpresa(){
        return (this.darNumeroDeReclamosDeEmpresas() / this.listaEmpresas.length).toFixed(1);
    }
    darTodoRelacionado(input) {
        let reclamosRelacionadosConInput = [];
        let reclamosUnicos = [];
        for (let reclamo of this.listaReclamos) {
            if (
                reclamo.nombre.toUpperCase().includes(input.toUpperCase()) ||
                reclamo.titulo.toUpperCase().includes(input.toUpperCase()) ||
                reclamo.empresa.nombre.toUpperCase().includes(input.toUpperCase()) ||
                reclamo.reclamo.toUpperCase().includes(input.toUpperCase())
            ) {
                reclamosRelacionadosConInput.push(reclamo);
            }
        }
        for (let reclamo of reclamosRelacionadosConInput) {
            let esUnico = true;
            for (let elem of reclamosUnicos) {
                if (elem.reclamo === reclamo.reclamo) {
                    esUnico = false;
                    break;
                }
            }
            if (esUnico) {
                reclamosUnicos.push(reclamo);
            }
        }
        return reclamosUnicos;
    }    
}
