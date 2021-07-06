import { eliminarCita, cargarEdicion } from "../funciones.js";
import { contenedorCitas, heading } from "../selectores.js"

export default class UI {

    imprimirAlerta(mensaje, tipo){
        //Crear el div
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center","alert","d-block", "col-12");

        //Agregar clase en base al tipo de error
        if (tipo ==="error"){
            divMensaje.classList.add("alert-danger");;
        } else {
            divMensaje.classList.add("alert-success");
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Agregar al DOM
        document.querySelector("#contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita"));//seleccionamos el elemento y donde
        
        //Quitar la alerta despues de 3 segundos
        setTimeout(() =>{
            divMensaje.remove();
        }, 3000 );
    }

    imprimirCitas({citas}) {

        this.limpiarHTML();

      //se puede aplicar destructuring desde el parentesis
      //const { citas } = citas; 
      /*  console.log(citas); */

      citas.forEach ( cita => {
          //destructuring y le agregamos el id que definimos abajo
        const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

        const divCita = document.createElement("div");
        divCita.classList.add("cita", "p-3");
        divCita.dataset.id = id;

        //Scripting de los elementos de la cita
        const mascotaParrafo = document.createElement("h2");
        mascotaParrafo.classList.add("card-title", "font-weight-bolder");
        mascotaParrafo.textContent = mascota;

        const propietarioParrafo = document.createElement("p");
        //template string
        propietarioParrafo.innerHTML=`
            <span class="font-weight-bolder">Propietario: </span> ${propietario};
        `
        const telefonoParrafo = document.createElement("p");
        telefonoParrafo.innerHTML=`
            <span class="font-weight-bolder">Tel: </span> ${telefono};
        `
        const fechaParrafo = document.createElement("p");
        fechaParrafo.innerHTML=`
            <span class="font-weight-bolder">Fecha: </span> ${fecha};
        `
        const horaParrafo = document.createElement("p");
        horaParrafo.innerHTML=`
            <span class="font-weight-bolder">Hora: </span> ${hora};
        `
        const sintomasParrafo = document.createElement("p");
        sintomasParrafo.innerHTML=`
            <span class="font-weight-bolder">Sintomas: </span> ${sintomas};
        `;

        //Boton para eliminar esta cita
        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger", "mr-2");
        btnEliminar.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>'

        btnEliminar.onclick = () => eliminarCita(id); //definida abajo


        //Añade un boton para editar
        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-info");
        btnEditar.innerHTML = "Editar";

        btnEditar.onclick = () => cargarEdicion(cita);//definida abajo

        //Agregar los parrafos al divCita
        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomasParrafo);
        divCita.appendChild(btnEliminar);
        divCita.appendChild(btnEditar);

        //Agregar las citas al HTML
        contenedorCitas.appendChild(divCita);

      })
    }

    textoHeading(citas){
        if (citas.length > 0 ){
            heading.textContent = "Administrar Citas"
        } else {
            heading.textContent = "No hay citas, comienza creando una"
        }
    }

    limpiarHTML(){
        //mientras sea verdadera la condicion va eliminando cada uno de los hijos del contenedor de citas
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild (contenedorCitas.firstChild)
        }
        //lo mando a llamar antes de hacer la iteracion


    }

}


// O export default UI;