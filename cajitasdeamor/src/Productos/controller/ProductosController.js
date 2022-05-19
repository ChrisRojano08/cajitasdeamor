import {Urls} from '../../resources/Urls';

export class ProductosController {
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

    async update(data){
        const respuesta = await fetch(Urls.productApi.update, {
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

    async insert(data){
        const respuesta = await fetch(Urls.productApi.insert, {
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
      const respuesta = await fetch(Urls.productApi.delete, {
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