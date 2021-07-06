import Citas from "./classes/Citas.js";
import UI from "./classes/UI.js";

import {

    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario,

} from "./selectores.js";

const ui = new UI ();
const administrarCitas = new Citas ();

let editando = false;

/* Objeto con la información de la cita */
const citaObj = {
    //con el name del input
    mascota:"",
    propietario:"",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: "",
}

/* Agrega datos al objeto de cita */
export function datosCita(e){
    //accede a las propiedades
     //esto va a ir escribiendo sobre el objeto
    citaObj[e.target.name] = e.target.value;
    

}


/* Valida y agrega una nueva cita a la clase de citas */
export function nuevaCita(e){
    e.preventDefault();

    //Estraer información del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //Validar
    if(mascota ==="" ||propietario ===""||telefono ===""||fecha ===""||hora ===""||sintomas ===""){
        ui.imprimirAlerta("Todos los campos son obligatorios" , "error");

        return;
    }

    if(editando){
        //si estoy en editando
        console.log("Editando")

        ui.imprimirAlerta("Editado correctamente")

        //Pasar una copia objeto de la cita a edición
        //es citaObj porque en cargarEdicion() cargamos todos los valores
        administrarCitas.editarCita({...citaObj})

        // regresar el texto del boton a "crear cita"
        formulario.querySelector('button[type="submit"]').textContent="Crear Cita";
        
        //Quitar modo edición
        editando = false;



    } else {
        //si estoy creando una cita nueva
         //Generar un Id unico 
        citaObj.id = Date.now ();

        //Creando una nueva cita
        //se pasa la copia de la ultima y no todo el obj
        administrarCitas.agregarCita({...citaObj});

        //Mensaje de agregado correctamente
        ui.imprimirAlerta("Se agregó correctamente")

    }


    //Reiniciar el objeto para la validación
    reiniciarObjeto();

    //Reiniciar el formulario
    formulario.reset();

    

    //Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);


}

export function reiniciarObjeto() {
    //estamos reiniciando el objeto(ya reiniciamos el form)
    citaObj.mascota= "";
    citaObj.propietario= "";
    citaObj.telefono= "";
    citaObj.fecha= "";
    citaObj.hora= "";
    citaObj.sintomas= "";

}

export function eliminarCita(id){
    //Eliminar la cita
    //tenemos q definir unnuevo metodo.. vamos al class constructor
    administrarCitas.eliminarCita(id);

    //Mostrar mensaje
    ui.imprimirAlerta("La cita se eliminó correctamente")

    //Refrescar citas
    ui.imprimirCitas(administrarCitas); //volvemos a mostrar todas las citas
   
}

/* Cargar datos y modo edición */
export function cargarEdicion(cita){
    const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    
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
    //YA TENEMOS ID
    citaObj.id = id;

    //Cambiar el texto del boton cuando editamos
    //seleccionamos el type submit y le cambiamos el textcontent
    formulario.querySelector('button[type="submit"]').textContent="Guardar Cambios";

    editando = true;

}