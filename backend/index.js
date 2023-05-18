import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/ReviewsDAO.js";
import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

async function main(){
   dotenv.config() 
   const client = new mongodb.MongoClient(
      process.env.MOVIEWSREVIEWS_DB_URI
   )
   const port = process.env.PORT || 5000

   try{
      await client.connect()
      await MoviesDAO.injectDB(client)
      await ReviewsDAO.injectDB(client)
      app.listen(port, ()=>{
         console.log(`Server is Runing....\non port\t${port}`)
      })
   } catch (e){
      console.error(e);
      process.exit(1)
   }
}

main().catch(console.error);