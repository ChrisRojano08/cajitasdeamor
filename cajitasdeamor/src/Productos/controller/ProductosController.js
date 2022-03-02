import {Urls} from '../../resources/Urls'
import {Client} from "../../resources/Client";

export class ProductosController {
    async findAll(){
        let res = await Client.POST({
            url: Urls.productApi.findAll
        });
        console.log('res')
        console.log(res);
        return res;
    } 

}