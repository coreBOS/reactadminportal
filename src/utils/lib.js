import * as cbconn from 'corebos-ws-lib/WSClientm';

export const getChallenge = async (username, password) => {
    const challengeRes = await cbconn.doLogin(username, password);
    return challengeRes;
}

export const getListTypes = async () => {
    const listTypes = await cbconn.doListTypes();
    return listTypes;
}

export const getModDescribe = async (moduleName) => {
    const describe = await cbconn.doDescribe(moduleName);
    return describe;
}

export const doRetrieve = async (record) => {
    const result = await cbconn.doRetrieve(record);
    return result;
}

export const doMassRetrieve = async (ids) => {
    const result = await cbconn.doMassRetrieve(ids);
    return result;
}

export const doQuery = async (query) => {
    const result = await cbconn.doQuery(query);
    return result;
}

export const doInvoke = async (method, params, type) => {
    const result = await cbconn.doInvoke(method, params, type);
    return result;
}