import Razorpay from "razorpay";
var instance = new Razorpay({
  key_id: process.env.RAZOR_API_KEY!,
  key_secret: process.env.RAZOR_API_SECRET,
});
