import { Client, Databases, Account, ID, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID =
  import.meta.env.VITE_APPWRITE_DATABASE_ID;

export const TEAMS_COLLECTION_ID =
  import.meta.env.VITE_APPWRITE_TEAMS_COLLECTION_ID;

export const SITUATIONS_COLLECTION_ID =
  import.meta.env.VITE_APPWRITE_SITUATIONS_COLLECTION_ID;

export const RESPONSES_COLLECTION_ID =
  import.meta.env.VITE_APPWRITE_RESPONSES_COLLECTION_ID;

export { ID, Query };