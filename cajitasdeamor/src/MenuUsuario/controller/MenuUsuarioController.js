import { Urls } from "../../resources/Urls"; 

export class MenuUsuarioController {
  async findByUserId(data) {
    const respuesta = await fetch(Urls.shoppingApi.findByUserId, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .catch(error => console.log(error,))
    return respuesta;
  }

  async findHome(data) {
    const respuesta = await fetch(Urls.homeApi.findByUserId, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .catch(error => console.log(error,))
    return respuesta;
  }

  async findPay(data) {
    const respuesta = await fetch(Urls.paymentApi.findByUserId, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .catch(error => console.log(error,))
    return respuesta;
  }

  async delete(data) {
    const respuesta = await fetch(Urls.MenuUsuarioApi.delete, {
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

}