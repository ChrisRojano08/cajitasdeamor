import { Urls } from "../../resources/Urls";

export class ComprasController {
    async findAll(){
        const respuesta = await fetch(Urls.shoppingApi.findAll, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .catch(error => console.log(error))

      return respuesta;
    }

    async cambiarEstado(data){
      const respuesta = await fetch(Urls.shoppingApi.update, {
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

  async insertar(data){
    const respuesta = await fetch(Urls.shoppingApi.insertar, {
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

  async cancelarCompra(data){
    const respuesta = await fetch(Urls.shoppingApi.cancel, {
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

async vaciarCarrito(data){
  const respuesta = await fetch(Urls.cartApi.deleteAll, {
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