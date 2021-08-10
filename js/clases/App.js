
import { datosCita, nuevaCita, crearDB } from '../funciones.js'
import {

    mascotaInput, 
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    frm 

} from '../selectores.js';


class App {

    constructor() {
        this.initApp();
        crearDB();
    }

    initApp() {
        mascotaInput.addEventListener('input', datosCita);
        propietarioInput.addEventListener('input', datosCita);
        telefonoInput.addEventListener('input', datosCita);
        fechaInput.addEventListener('input', datosCita);
        horaInput.addEventListener('input', datosCita);
        sintomasInput.addEventListener('input', datosCita);

        //Formulario
        frm.addEventListener('submit', nuevaCita);
    }
}

export default App;
