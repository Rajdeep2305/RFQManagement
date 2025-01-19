import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organizationName: { type: String, required: true },
  registerId: { type: String, required: true, unique: true },
  phoneNo: { type: String, required: true },
  selectedValue: { type: String, required: true },
  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
  UserId: { type: String, unique: true, sparse: true },
  VenderModel: [{type: mongoose.Schema.Types.ObjectId, ref:"vendor"}],
  BuyerModel: [{type: mongoose.Schema.Types.ObjectId, ref:"buyer"}]
});

userSchema.pre('save', function(next) {
  if (!this.UserId) {
    this.UserId = `${Date.now()}-${Math.random()}`; // Generate a unique ID
  }
  next();
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
