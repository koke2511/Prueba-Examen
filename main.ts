import { MongoClient, ObjectId } from "mongodb"
import type { monumentosModel } from "./types.ts";
import { fromModelToMonuments } from "./utils.ts";

//Obtener claves de Mongo
const MONGO_URL = Deno.env.get("MONGO_URL");
if(!MONGO_URL){
  console.error("MONGO_URL is not set");
  Deno.exit(1);
}

//Conectar el cliente
const client = new MongoClient(MONGO_URL);
await client.connect();
console.info("Connected to MongoDB");
const dbName = client.db("Prueba");

const monumentosCollection = dbName.collection<monumentosModel>('monumentos');

const handler = async(req: Request): Promise<Response> => {
  
  const method = req.method;
  const url = new URL (req.url);
  const path = url.pathname;

  if(method === "GET"){
    if(path === "/monumentos"){
      const monumentsDB = await monumentosCollection.find().toArray();
      const monuments = monumentsDB.map((m) => fromModelToMonuments(m));

      const monumentMap = monuments.map((m) => {
        m.id;
        m.nombre;
      });

      return new Response (JSON.stringify(monumentMap));

    }else if(path === "/monumento"){
      const id = url.searchParams.get("id");

      if(!id){
        return new Response("Bad request", {status: 404});
      }

      const IdDB = await monumentosCollection.findOne({ _id: new ObjectId(id) });

      if(!IdDB){
        return new Response("Not found", {status: 404});
      }

      const ids = fromModelToMonuments(IdDB);
      return new Response(JSON.stringify(ids));

    }
  }else if(method === "POST"){



  }else if(method === "PUT"){

  }else if(method === "DELETE"){

  }

  return new Response ("Endpoint not found", {status: 404});


};

Deno.serve({port: 3000}, handler);