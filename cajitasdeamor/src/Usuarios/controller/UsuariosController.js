import { Urls } from "../../resources/Urls";

export class UsuariosController {
    async findAll(){
        const respuesta = await fetch(Urls.usersApi.findAll, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .catch(error => console.log(error))

      return respuesta;
    }

  async eliminarUsuario(data){
    const respuesta = await fetch(Urls.usersApi.delete, {
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