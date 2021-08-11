

import Citas from './clases/Citas.js';
import UI from './clases/UI.js';

import {

    mascotaInput, 
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    frm 

} from './selectores.js';


const ui = new UI();
const administrarCitas = new Citas();
let editando;
export let DB;

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
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
    //console.log(citaObj);
}


//Validar y agregar una nueva cita
export function nuevaCita(e) {
    e.preventDefault();

    //Extraer informacion del objeto de citas
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    //Validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando){
        //console.log('Modo editando');
        ui.imprimirAlerta('Actualizado correctamente');

        //Pasar el objeto de la cita a ediicion
        administrarCitas.editarCita({ ...citaObj })

        frm.querySelector('button[type="submit"]').textContent = 'Crear cita';

        //OCultar el modo edición
        editando = false;
    }
    else {
        //console.log('Modo agregando');
        //Generar un id unico
        citaObj.id = Date.now();

        //Creando una nueva cita
        administrarCitas.agragarCita({ ...citaObj });

        const transaction = DB.transaction(['citas'], 'readwrite');
        const objectStore = transaction.objectStore('citas');
        objectStore.add(citaObj);

        transaction.oncomplete = function() {
            console.log('cita agregada correctamente')
            //Mensaje de agregado correctamente
            ui.imprimirAlerta('Se agrego correctamente');
        }

    }

    //Reiniciar objeto para la validacion
    reinciarObj();

    //Resetear el formulario
    frm.reset();

    ui.imprimirCitas();
}


export function reinciarObj() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}


export function eliminarCita(id) {
    //console.log(id);
    //Eliminar la cita
    administrarCitas.eliminarCita(id);

    //Mostrar mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    //Refrescar las citas
    ui.imprimirCitas();
}

export function cargarEdicion(cita) {
    //console.log(cita);
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Cambiar el texto del boton
    frm.querySelector('button[type="submit"]').textContent = 'Actializar';

    editando = true;
}


export function crearDB() {
    //Crear la base de datos en la version 1
    const crearDB = window.indexedDB.open('citas', 1);

    //Si hay un error
    crearDB.onerror = function() {
        console.log('Hubo un error');
    }

    //Si todo sale bien
    crearDB.onsuccess = function() {
        console.log('DB creada');
        DB = crearDB.result;

        //Mostrar citas al cargar (Pero index db ya esat listo)
        ui.imprimirCitas();
    }

    //Definir el schema
    crearDB.onupgradeneeded = function(e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore('citas', {
            keyPath: 'id',
            autoIncrement: true
        });

        //Definir todas las columnas
        objectStore.createIndex('mascota', 'mascota', { unique: false });
        objectStore.createIndex('propietario', 'propietario', { unique: false });
        objectStore.createIndex('telefono', 'telefono', { unique: false });
        objectStore.createIndex('fecha', 'fecha', { unique: false });
        objectStore.createIndex('hora', 'hora', { unique: false });
        objectStore.createIndex('sintomas', 'sintomas', { unique: false });
        objectStore.createIndex('id', 'id', { unique: true });

        console.log('DB Creada y lista');
    }
    
}