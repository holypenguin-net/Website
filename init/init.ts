import { Client } from 'pg';
import { readFileSync } from 'fs';

async function main(){
    // Reading config from db-init.sql file
    console.log("Reading DB-Config...");
    const sqlFile = readFileSync('db-init.sql').toString(); 
    const dt = "SELECT table_name FROM information_schema.tables WHERE table_catalog = 'holypenguin' AND table_schema = 'public' ORDER BY table_name;";
    const tables = [
        "Game",
        "GameName",
        "GameVersion",
        "GameType",
        "Server",
        "User"
    ];


    // Creating new Client
    const client = new Client({
        host: "172.16.0.102",
        user: "holypenguin",
        password: "holypenguin",
        database: "holypenguin"
    });

    // Connection to DB
    console.log("Connection to DB...");
    await client.connect()
      .then(()=>console.log("Connected to DB!"))
      .catch(err => console.log("ERROR: ", err));
    
    // Check if Tables existing
    let res = await queryDB(client, dt);
    if(checkTables(tables, res.rows)){
        console.log("Tables already existing!");
        process.exit(0);
    }

    // Creating Tables
    console.log("Creating DB...");
    await queryDB(client, sqlFile);
    res = await queryDB(client, dt);
    if(res){
        console.log(res.rows);
    }
    process.exit(0);
};

async function queryDB(client: Client, query: string){
    const queryJSON = {
        text: query,
        rowMode: 'array'
    }
    try{
        const res = await client.query(queryJSON);
        return res;
    } catch(err){
        console.log("ERROR: ", err); 
        process.exit(1);
    };
};

function checkTables(tables: Array<string>, list: any){
    let item;
    console.log(list);
    console.log(tables);
    for(item of list){
        console.log(item);
        if(!tables.includes(item.game_name)){
            return false;
        }
    }
}

main();
