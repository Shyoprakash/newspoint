import mongoose from 'mongoose'

const BookmarkSchema = new mongoose.Schema({
  articleId: String, 
  title: String,
  source: String,
  url: String,
  imageUrl: String,
  publishedAt: Date,
  addedAt: { type: Date, default: Date.now }, 
});

const ReadingHistorySchema = new mongoose.Schema({
  articleId: String,
  title: String,
  source: String,
  url: String,
  imageUrl: String,
  publishedAt: Date,
  readAt: { type: Date, default: Date.now }, 
})

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  preferences: [String],
  bookmarks: [BookmarkSchema],       
  readingHistory: [ReadingHistorySchema], 
});

const User = mongoose.model('User', UserSchema)

export default User