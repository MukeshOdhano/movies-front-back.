// DATA ACCESS OBJECT = DAO

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId 

// CODE START HERE
let movies 

export default class MoviesDAO{
   static async injectDB(conn){
      if(movies){
         return
      }
      try{
         movies = await conn.db(process.env.MOVIEWSREVIEWS_NS)
         .collection('movies')
      }
      catch(e){
         console.log(`unable to connect in Movies DAO\n${e}`)
      }
   }

   static async getMovies({
      // default filter
      filters = null,
      page = 0,
      moviesPerPage = 20
   } = {})
   {
      let query
      if(filters){
         if("title" in filters){
            query = {
               $text:{
                  $search:filters['title']
               }
            }
         } else if("rated" in filters){
            query = {
               "rated": {
                  $eq: filters['rated']
               }
            }
         }
      }
   
      let cursor
      try{
         cursor = await movies
         .find(query)
         .limit(moviesPerPage)
         .skip(moviesPerPage * page)
   
         const moviesList = await cursor.toArray()
         const totalNumMovies = await movies.countDocuments(query)
         return{moviesList, totalNumMovies}
      }
      catch(e){
         console.log(`Unable to issue find command\n${e}`)
         return{moviesList:[], totalNumMovies: 0}
      }
   }

   // GET RATINGS
   static async getRatings(){
      let ratings = []
      try{
         ratings = await movies.distinct('rated')
         return ratings
      }
      catch(e){
         console.error(`Unable to get ratting\n${e}`)
         return ratings
      }
   }

   // GET MOVIES BY ID
   static async getMovieById(id){
      try{
         return await movies.aggregate([
            {
               $match:{
                  _id: new ObjectId(id),
               }
            },
            {
               $lookup:{
                  from: 'reviews',
                  localField: '_id',
                  foreignField: "movie_id",
                  as: 'reviews'
               }
            }
         ])
         .next()
      }
      catch(e){
         console.error(`Somethind went wrong in getMoviesById:\n${e}`)
         throw e
      }
   }
}
