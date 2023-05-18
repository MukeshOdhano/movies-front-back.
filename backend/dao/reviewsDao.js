import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO{
   static async injectDB(conn){
      if(reviews){
         return
      }
      
      try{
         reviews = await conn.db(process.env.MOVIEWSREVIEWS_NS).collection('reviews')
      } catch(e){
         console.log(`unable to establish connection handle in reviewDAO: ${e}`)
      }
   }

   // ReviewsDAO addReview
   static async addReview(movieId,user,review,date){
      try{
         const reviewDoc={
            name: user.name,
            user_id: user._id,
            date: date,
            review: review,
            movie: new ObjectId(movieId)
         }
         return await reviews.insertOne(reviewDoc)
      }
      catch(e){
         console.error(`unable to post review: \n${e}`)
         return {error: e}
      }
   }

   // ReviewsDAO UpdateReview
   static async updateReview(reviewId, userId, review, date){
      try{
         const updateRespone = await reviews.updateOne(
            {
               user_id: userId,
               _id: new ObjectId(reviewId)
            },
            {
               $set:{
                  review: review,
                  date: date
               }
            }
         )
         return updateRespone
      }
      catch(e){
         console.error(`ReviewsDAO addReview: ${e}`)
         return {error:e}
      }
   }

   // ReviewsDAO DeleteReview
   static async deleteReview(reviewId, userId){
      try{
         const deleteResponse = await reviews.deleteOne({
            _id: new ObjectId(reviewId),
            user_id: userId,
         })
         return deleteResponse
      }
      catch(e){
         console.error(`unable to delete review: ${e}`)
         return {error: e}
      }
   }
}