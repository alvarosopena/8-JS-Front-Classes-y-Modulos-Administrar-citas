//Classes 
//NO REQUIERE IMPORTAR NADA NINGUNA FUNCION NI SELECTOR


export default class Citas{
    
    constructor(){
        this.citas =[];
    }

    agregarCita(cita){
        //copia de citas y le agregamos la cita
        this.citas = [...this.citas, cita];

        console.log(this.citas);
    }

    eliminarCita(id){
        //accedemos y traemos todas menos la que estamos pasando
        this.citas = this.citas.filter( cita => cita.id !== id );
    }

    editarCita(citaActualizada){
        //toma toda la cita, es mejor reescribir todo el objeto
        //es .map() y no filter().. filter quita un elemento o quita los demas,
        //como es edicion .map recorre los elementos y crea un nuevo elemento y se asinga a citas y no forEach
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
        //itera en cada una de las citas y verifica que la cita actualizada y la cita actual tengan el mismo id
        //en caso q esa condicion se cumple se reescribe todo el objeto de la cita con la cita actualizada, que viene desde
        //administrarCitas.editarCita({...citaObj})
    }

}

// O export default Citas;