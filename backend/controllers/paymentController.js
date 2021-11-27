const AsyncErrorHandler = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

exports.processPayment = AsyncErrorHandler(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res.status(200).json({ success: true, clien_secret: myPayment.clien_secret });
});

exports.sendStripeApiKey = AsyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
