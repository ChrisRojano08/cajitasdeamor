import { Urls } from "../../resources/Urls";

export class PagoController {
    async insert(data){
        const respuesta = await fetch(Urls.paymentApi.insert, {
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

    async update(data){
      const respuesta = await fetch(Urls.paymentApi.update, {
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
 
}