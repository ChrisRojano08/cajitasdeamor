import { Utils } from "../resources/Utils";

export class Verify {
    verify() {
        if (sessionStorage.getItem('token')) {
            if (sessionStorage.getItem('role') !== 'admin') {
                if(sessionStorage.getItem('role') !== 'sudosu'){
                    Utils.swalNeddLogin("Rol no autorizado")
                }
            }
        } else {
            Utils.swalNeddLogin("Acceso denegado")
        }
    }

    verifyToken() {
        if (sessionStorage.getItem('token')) {
            return true;
        } else {
            Utils.swalNeddLogin("Acceso denegado");
            return false;
        }
    }

    MenuTypeUser(props){
        if (sessionStorage.getItem('token')) {
                props.push('/superAdminMenu')
        } else {
            Utils.swalNeddLogin("Acceso denegado");
            props.push('/login')
        }
    }
}