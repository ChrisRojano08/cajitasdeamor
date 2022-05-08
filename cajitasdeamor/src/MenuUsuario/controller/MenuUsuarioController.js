import { Urls } from "../../resources/Urls"; 

export class MenuUsuarioController {
  async findByUserId(data) {
    const respuesta = await fetch(Urls.MenuUsuarioApi.findByUserId, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .catch(error => console.log(error,))
      console.log(respuesta)
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
}