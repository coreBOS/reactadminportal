import Dexie from 'dexie';

const localDBName = 'ESS_LocalDB';
const tablePermissions = {
  tableName: 'permissions',
  fields: 'module, permissions',
};
const tableGSMaps = {
  tableName: 'gsmaps',
  fields: 'id++',
};
const tableDescribe = {
  tableName: 'describe',
  fields: 'id++',
};
const tableListViews = {
  tableName: 'list_views',
  fields: 'id++',
};
const tableAuth = {
  tableName: 'auth',
  fields: 'id++, user, logindata, language',
};

let db = null;

const openLocalDB = () => {
  db = new Dexie(`${localDBName}`);
  db.version(1).stores({
    permissions: tablePermissions.fields,
    gsmaps: tableGSMaps.fields,
    describe: tableDescribe.fields,
    list_views: tableListViews.fields,
    auth: tableAuth.fields,
  });
  return db.open();
};

//Exports
export const LOCAL_DB_NAME = localDBName;
export const TABLE_PERMISSIONS = tablePermissions;
export const TABLE_GS_MAPS = tableGSMaps;
export const TABLE_DESCRIBE = tableDescribe;
export const TABLE_LIST_VIEWS = tableListViews;
export const TABLE_AUTH = tableAuth;


export const deleteLocalDB = async () => {
  return openLocalDB().then(async db2 => {
    try {
      await db2.delete();
    } catch (err) {
      console.log("Error while deleting: ");
    }
  })
};

export const clearTable = async (tableName) => {
  return openLocalDB().then(async db2 => {
    try {
      await db2.table(`${tableName}`).clear();
    } catch (err) {
      console.log("Error while clearing: ");
    }
  })
};

export const getDataFromLocalDB = async (tableName) => {
  return openLocalDB().then(async db2 => {
    try {
      return await db2.table(`${tableName}`).toArray();
    } catch (err) {
      console.log("Error while deleting: ");
    }
  });
};

export const saveDataToLocalDB = async (tableName, data, isBulkSaving = false) => {
  return openLocalDB().then(async db2 => {
    try {
      isBulkSaving ? db2.table(`${tableName}`).bulkPut(data) : await db2.table(`${tableName}`).put(data);
    } catch (err) {
      console.log("Error while saving: ");
    }
  });
};

export const TABLE_NAMES = [
  'permissions',
  'gsmaps',
  'describe',
  'list_views',
  'auth'
]