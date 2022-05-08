const baseURl='http://192.168.1.77:5000/';

//this is a explame data for base url api CAMBIO RANDOM 1.1
const baseApi={
    users:baseURl+'users/',
    product:baseURl+'product/',
    shopping:baseURl+'shopping/',
    home:baseURl+'home/',
    cart:baseURl+'cart/',
    pago:baseURl+'pago/',
    MenuUsuario:baseURl+'MenuUsuario/'
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
        findDedicatoria:baseApi.shopping+'findDedicatoria'
    },
    homeApi:{
        find:baseApi.home+'find',
        insert:baseApi.home+'insert',
        update:baseApi.home+'update'
    },
  
    cartApi:{
        findByUserId:baseApi.cart+'findByUserId',
        delete:baseApi.cart+'delete',
        insert:baseApi.cart+'insert'
    },
    pagoApi:{
        find:baseApi.pago+'find',
        insert:baseApi.pago+'insert',
        update:baseApi.pago+'update'
    },
    MenuUsuarioApi:{
        findByUserId:baseApi.MenuUsuario+'findByUserId',
        delete:baseApi.MenuUsuario+'delete'
    }
}
