import { Urls } from "../../resources/Urls";

export class CarritoController {
    async findByUserId(data){
        const respuesta = await fetch(Urls.cartApi.findByUserId, {
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

    async delete(data){
        const respuesta = await fetch(Urls.cartApi.delete, {
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