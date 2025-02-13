import mongoose from "mongoose"


const dbConnect =async() => {
    try {
        const connection  = mongoose.connect('mongodb://127.0.0.1:27017/news_point')
        console.log('MONGODB CONNECTED')
    } catch (error) {
        console.log(error)
    }

}

export default dbConnect