import { Urls } from "../../resources/Urls";
export class RecuperarController {
    async findEmail(data){
        const respuesta = await fetch(Urls.usersApi.findEmail,{
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .catch(error => console.log(error))
            return respuesta;
    }

    async changePass(data){
        const respuesta = await fetch(Urls.usersApi.changePass,{
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .catch(error => console.log(error))
            return respuesta;
    }
 
}