const baseURl='http://35.171.25.92:5000/';

//this is a explame data for base url api CAMBIO RANDOM 1.1
const baseApi={
    users:baseURl+'users/',
    product:baseURl+'product/',
    shopping:baseURl+'shopping/',
    home:baseURl+'home/',
    cart:baseURl+'cart/',
    payment:baseURl+'payment/'
}
//this is a exmple data for enpoint api
export const Urls = {
    usersApi:{
        findAll:baseApi.users+'findAll',
        find:baseApi.users+'find',
        registrar:baseApi.users+'insert',
        delete:baseApi.users+'delete',
        findEmail:baseApi.users+'findEmail',
        changePass:baseApi.users+'changePass'
    },
    productApi:{
        findAll:baseApi.product+'findAll',
        update:baseApi.product+'update',
        insert:baseApi.product+'insert',
        delete:baseApi.product+'delete'
    },
    shoppingApi:{
        findAll:baseApi.shopping+'findAll',
        update:baseApi.shopping+'update',
        cancel:baseApi.shopping+'cancel',
        findDedicatoria:baseApi.shopping+'findDedicatoria',
        findByUserId:baseApi.shopping+'findByUserId',
        actualizarDedicatoria:baseApi.shopping+'updateDed',
        insertar:baseApi.shopping+'insert'
    },
    homeApi:{
        find:baseApi.home+'find',
        insert:baseApi.home+'insert',
        update:baseApi.home+'update',
        findByUserId:baseApi.home+'findByUserId'
    },
  
    cartApi:{
        findByUserId:baseApi.cart+'findByUserId',
        delete:baseApi.cart+'delete',
        insert:baseApi.cart+'insert'
    },
    paymentApi:{
        find:baseApi.payment+'find',
        insert:baseApi.payment+'insert',
        update:baseApi.payment+'update',
        findByUserId:baseApi.payment+'findByUserId'
    }
}
