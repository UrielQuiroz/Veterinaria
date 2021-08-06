
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
}