import * as cbconn from "corebos-ws-lib/WSClientm";
import cbUtils from '../corebosUtils/corebosUtils';


export const saveAction = (data, module) => {

    return cbUtils.remoteValidate(data.id, module, data).then((errorRes) => {
        if (errorRes) {
            console.log('errorRes', errorRes);
            return {
                success: false, error: errorRes, data: null
            }
        }
    
        cbconn.doUpdate(module, data).then((result) => {
            return {
                success: true, error: null, data: result
            }
        }).catch((err) => {
            console.log('err', err);
            return {
                success: false, error: err, data: null
            }
        });
    }).catch((error) => {
        console.log('error', error);
        return {
            success: false, error: error, data: null
        }
    })
     
};