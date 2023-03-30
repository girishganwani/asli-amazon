import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const checkout = async (req, res) => {
  const { successUrl, cancelUrl, products } = req.body;
  console.log("body: ", req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: products.map((product) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        };
      }),
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    res.status(200).json({ data: { url: session.url } });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
};
