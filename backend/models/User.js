import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    avatar: {
      type: String,
      default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
    },
    favorites: [
      {
        imdbID: { type: String, required: true },
        title: { type: String },
        poster: { type: String },
        year: { type: String },
      }
    ],
  },
  { timestamps: true }
);

//  Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


//  Compare password method (for login)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


export default mongoose.model('User', userSchema);