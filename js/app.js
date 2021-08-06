
//Variables
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

//UI
const frm = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");


//Clases 
class Citas {
    
    constructor() {
        this.citas = [];
    }

    agragarCita(cita) {
        this.citas = [ ...this.citas, cita ];
        //console.log(this.citas);
    }
    
}

class UI {

    imprimirAlerta(msj, tipo) {

        //Crear el div
        const divMsj = document.createElement('div');
        divMsj.classList.add('text-center', 'alert', 'd-block', 'col-12');
        
        //Agregar clase en base al tipo de error
        if(tipo === 'error'){
            divMsj.classList.add('alert-danger');
        } else {
            divMsj.classList.add('alert-success');
        }

        //Mensaje de error
        divMsj.textContent = msj;

        //Agregar al DOm
        document.querySelector('#contenido').insertBefore(divMsj, document.querySelector('.agregar-cita'));

        //Quitar la alerta despues de 3 seg
        setTimeout(() => {
            divMsj.remove();
        }, 3000);

    }


    imprimirCitas({citas}) {

        this.limpiarHTML();

        citas.forEach( cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            //Agergar los parrafos al divcita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

            //Ageragr las citas al HTML
            contenedorCitas.appendChild(divCita);
        })

    }


    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild( contenedorCitas.firstChild );
        }
    }

}

const ui = new UI();
const administrarCitas = new Citas();


//Eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    frm.addEventListener('submit', nuevaCita);
}


//Objeto con la informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

//funcion para agregar datos al objeto de citas
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
    //console.log(citaObj);
}


//Validar y agregar una nueva cita
function nuevaCita(e) {
    e.preventDefault();

    //Extraer informacion del objeto de citas
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    //Validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }


    //Generar un id unico
    citaObj.id = Date.now();

    //Creando una nueva cita
    administrarCitas.agragarCita({ ...citaObj });

    //Reiniciar objeto para la validacion
    reinciarObj();

    //Resetear el formulario
    frm.reset();

    ui.imprimirCitas(administrarCitas);
}


function reinciarObj() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}