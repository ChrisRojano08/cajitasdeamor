import Swal from "sweetalert2";
import {Urls} from "./Urls";

export class Utils {

    static successToast(props){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire(props)
    }

    static swl(props){
        return Swal.fire(props)
    }
    static swlToast(config) {
        this.swl( Object.assign(config, {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        }));
    }

    static swalError(params){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: params
        });
    }

    static swalNeddLogin(params){
        Swal.fire({
            icon:'error',
            title:params,
            text:'Se requiere haber iniciado sesión para entrar a esta sección'
        }).then(function (){
            window.location = Urls.navApi.login;
        });
    }


    static swalSuccess(msg){
        Swal.fire({
            icon: 'success',
            toast: true,
            title: msg,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500
        });
    }

    static raise (e, msg) {
        if (typeof e === "string") {
            throw new Error(e);
        } else if (Object.keys(msg)===0) {
            console.error("Error de sistema:", e);
            throw new Error("Error de sistema");
        } else {
            console.error("Error en proceso: " + msg.toLowerCase(), e);
            throw new Error("Error en proceso: " + msg.toLowerCase());
        }
    }

    static handle(e, msg) {
        if (typeof e === "string") {
          console.error(e);
        } else {
          try {
            Utils.raise(e, msg);
          } catch (e2) {
            Utils.handle(e2);
          }
        }
      }
    
    static parseDate(date){
        let fecha=new Date(date)
        fecha.setHours(0,0,0,0)
        return fecha;
    }

    formatDate = (date) => {
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (month < 10) {
            if(day<10)
                return `0${day}-0${month}-${year}`
            else
                return `${day}-0${month}-${year}`
        } else {
            if(day<10)
                return `0${day}-${month}-${year}`
            else
                return `${day}-${month}-${year}`
        }
    }
    maxDate(){
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
        today = yyyy+'-'+mm+'-'+dd;
        return today;
    }

    formatDates(date){
        return date.substring(6,10)+"-"+date.substring(3,5)+"-"+date.substring(0,2);
    }

}

export const deleteLastOneObject = (obj={}) => {
    let last =  Object.keys(this.state.discountMap)[Object.keys(this.state.discountMap).length-1]
    delete obj[last]
    return {...obj}
}