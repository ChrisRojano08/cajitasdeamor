import axios from "axios";
import {Utils} from "../resources/Utils";
export class Client {

    static async GET(params) {
        let response = null;
        try {

            if (Object.keys(params) === 0 || params.url == null) {
                throw new Error("Falta url")
            }

            let requestParamas = {
                method: 'get',
                url: params.url,
                headers: params.headers,
                params: params.params,
                timeout: params.timeout,
                auth: params.auth,
                catch: function (e) {
                    if (e.response) {
                        let msg = null,
                            res = e.response;
                        switch (res.status) {
                            case 400:
                                if (res.message) {
                                    msg = res.message;
                                } else {
                                    msg = "Error de par\u00e1metros";
                                }
                                Utils.swalError(msg);
                                break;
                            case 401:
                                msg = "Usuario no autenticado o token vencido, favor de acceder nuevamente";
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                                break;
                            case 403:
                                msg = "Permiso denegado";
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                                break;
                            case 404:
                                if (res.message) {
                                    msg = res.message;
                                } else {
                                    msg = "No se encontraron datos";
                                }
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                                console.error('Not found');
                                break;
                            case 500:
                                Utils.swalError("Error de servidor por favor comunicarse con el soporte tecnico");
                                break;
                            default:
                                if (res.message) {
                                    msg = res.message;
                                } else {
                                    msg = "Error de sistema";
                                }
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                        }
                    } else if (e.request) {
                        Utils.swalError('Error de servidor por favor comunicarse con el soporte tecnico');
                    }
                    return
                }
            };

            let res = await axios(requestParamas).catch(requestParamas.catch)
            if (res === undefined) {
                response=[]
            }else{
                if(res.data.success){
                    response = {
                        data : res.data.data,
                        total : res.data.total,
                        success : res.data.success
                    };
                    Utils.swlToast({
                        icon: 'success',
                        text: res.data.message
                    })
                }
            }
        } catch (e) {
            Utils.raise(e, 'Error al proceso')
        }
        return response
    }

    static async POST(params){

        let response = null;
        try {

            if (Object.keys(params) === 0 || params.url == null) {
                throw new Error("Falta url")
            }

            let requestParams = {
                method: 'post',
                url: params.url,
                headers: params.headers,
                params: params.params,
                data:params.data,
                timeout: params.timeout,
                auth: params.auth,
                catch: function (e) {
                    if (e.response) {
                        let msg = null,
                            res = e.response;
                        switch (res.status) {
                            case 400:
                                if (res.message) {
                                    msg = res.message;
                                } else {
                                    msg = "Error de par\u00e1metros";
                                }
                                Utils.swalError(msg);
                                break;
                            case 401:
                                msg = "Usuario no autenticado o token vencido, favor de acceder nuevamente";
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                                break;
                            case 403:
                                msg = "Permiso denegado";
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                                break;
                            case 404:
                                if (res.message) {
                                    msg = res.message;
                                } else {
                                    msg = "No se encontraron datos";
                                }
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                                console.error('Not found');
                                break;
                            case 409:
                                if (res.data.message) {
                                    msg = res.message;
                                } else {
                                    msg = "Confilcto en el servidor";
                                }
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                                console.error('Not found');
                                break;
                            case 500:
                                Utils.swalError("Error de servidor por favor comunicarse con el soporte tecnico");
                                break;
                            default:
                                if (res.message) {
                                    msg = res.message;
                                } else {
                                    msg = "Error de sistema";
                                }
                                if (params.failureMsg) {
                                    msg = params.failureMsg + ". " + msg;
                                }
                                Utils.swalError(msg);
                        }
                    } else if (e.request) {
                        Utils.swalError('Error de servidor por favor comunicarse con el soporte tecnico');
                    }
                    return
                }
            };

            let res = await axios(requestParams).catch(requestParams.catch)
            if (res === undefined) {
                response={}
            }else{
                if(res.data.success){
                    response = res.data.data;
                    Utils.swlToast({
                        icon: 'success',
                        text: res.data.message
                    })
                }
            }
        } catch (e) {
            Utils.raise(e, 'Error al proceso')
        }
        return response

    }

    static formatDate = (date) => {
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (month < 10) {
            if(day<10)
                return `0${day}-0${month}-${year}`
            else
                return `${day}-0${month}-${year}`
        } else {
            if(day<10)
                return `0${day}-${month}-${year}`
            else
                return `${day}-${month}-${year}`
        }
    }

    static async DOWNLOAD(params){
        const method = 'GET';
        const url = params.url;
        await axios
            .request({
                url,
                method,
                responseType: 'blob', //important
            })
            .then(({ data }) => {
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'Cuponealo-'+this.formatDate(new Date())+'.zip'); //any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
    }
    
}