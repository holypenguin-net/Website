import { Client } from 'pg';

export default function db(){
    // Creating new Client
    const client = new Client({
        host: "172.16.0.102",
        user: "holypenguin",
        password: "holypenguin",
        database: "holypenguin"
    });
    client.connect()
    .then(()=>{
        console.log("Connected to DB!");
    })
    .catch(err => console.log("ERROR: ", err));
    return client;
};
