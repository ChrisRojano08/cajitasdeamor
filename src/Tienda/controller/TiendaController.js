import { Urls } from "../../resources/Urls";

export class TiendaController {
    async findAll(){
        const respuesta = await fetch(Urls.productApi.findAll, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .catch(error => console.log(error))

      return respuesta;
    }
 
}