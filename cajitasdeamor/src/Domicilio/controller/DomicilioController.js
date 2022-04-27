import { Urls } from "../../resources/Urls";

export class DomicilioController {
    async insert(data){
        const respuesta = await fetch(Urls.homeApi.insert, {
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