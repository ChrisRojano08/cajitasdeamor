import {Urls} from '../../resources/Urls';

export class ProductoController {
    async addCart(data){
        const respuesta = await fetch(Urls.cartApi.insert, {
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