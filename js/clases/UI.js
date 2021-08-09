

import { eliminarCita, cargarEdicion } from '../funciones.js';
import { contenedorCitas } from '../selectores.js';


//Clases 
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

            //Boton para eliminar una cita
            const btnElminar = document.createElement('button');
            btnElminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnElminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'

            btnElminar.onclick = () => eliminarCita(id);

            //Boton para editar una cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-primary', 'mr-2');
            btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>'

            btnEditar.onclick = () => cargarEdicion(cita);

            //Agergar los parrafos al divcita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnElminar);
            divCita.appendChild(btnEditar);

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

export default UI;