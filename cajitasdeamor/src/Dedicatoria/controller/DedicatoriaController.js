import { Urls } from "../../resources/Urls";
export class DedicatoriaController {
    async findDedicatoria(data){
        const respuesta = await fetch(Urls.shoppingApi.findDedicatoria,{
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