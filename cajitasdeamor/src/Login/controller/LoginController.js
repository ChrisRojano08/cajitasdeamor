import { Urls } from "../../resources/Urls";

export class LoginController {
    async loguear(data){
        const respuesta = await fetch(Urls.usersApi.find, {
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

    async registrar(data){
      const respuesta = await fetch(Urls.usersApi.registrar, {
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