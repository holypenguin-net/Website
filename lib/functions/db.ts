import { Client } from 'pg';

export default function db(){
    // Creating new Client
    const client = new Client();
    client.connect()
    .catch(err => console.log("ERROR: ", err));
    return client;
};
