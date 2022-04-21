const baseURl='http://127.0.0.1:5000/';

//this is a explame data for base url api CAMBIO RANDOM 1.1
const baseApi={
    users:baseURl+'users/',
    product:baseURl+'product/',
    shopping:baseURl+'shopping/'
}
//this is a exmple data for enpoint api
export const Urls = {
    usersApi:{
        findAll:baseApi.users+'findAll',
        find:baseApi.users+'find',
        registrar:baseApi.users+'insert',
        delete:baseApi.users+'delete'
    },
    productApi:{
        findAll:baseApi.product+'findAll'
    },
    shoppingApi:{
        findAll:baseApi.shopping+'findAll',
        update:baseApi.shopping+'update',
        cancel:baseApi.shopping+'cancel'
    }
}
