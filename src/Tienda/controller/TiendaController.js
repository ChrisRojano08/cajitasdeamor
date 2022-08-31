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


    async findCats(){
        const respuesta = await fetch(Urls.categorieApi.findAll, {
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