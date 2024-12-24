import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from './environment.js'

const MONGODB_URI = env.MONGODB_URI
const DB_NAME = env.MONGODB_NAME

let ecommerceDBInstance = null;

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const CONNECT_DB = async () => {
  await client.connect();
  ecommerceDBInstance = client.db(DB_NAME);
};   

export const DISCONNECT_DB = async () => {
  console.log('Disconnecting from MongoDB...');
  await client.close();
  ecommerceDBInstance = null;
};

export const GET_DB = () => {
  if (!ecommerceDBInstance) {
    throw new Error('Database not connected');
  }
  return ecommerceDBInstance; 
}

export const GET_LIST_COLLECTION = () => {
  const db = GET_DB();
  return db.listCollections().toArray();
}

export const GET_COLLECTION = (collectionName) => {
  const db = GET_DB();
  return db.collection(collectionName);
}

export const GET_COLLECTION_BY_ID = (collectionName, id) => {
  const collection = GET_COLLECTION(collectionName);
  return collection.findOne({ _id: id });
} 