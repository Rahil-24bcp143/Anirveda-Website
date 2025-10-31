import { Client, Databases, Account, ID, Query } from 'appwrite';


const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // e.g. 'https://cloud.appwrite.io/v1'
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your Appwrite project ID


const apiKey = import.meta.env.VITE_APPWRITE_API_KEY;
if (apiKey && typeof client.setKey === 'function') {
  client.setKey(apiKey);
}

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = '68e0e7410033603c9eb2';
export const TEAMS_COLLECTION_ID = 'table';
export const SITUATIONS_COLLECTION_ID = 'situations';
export const RESPONSES_COLLECTION_ID = 'responses';

export { ID, Query };