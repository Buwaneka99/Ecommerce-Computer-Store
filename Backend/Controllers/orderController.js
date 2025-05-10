import Order from "../Models/orders.js";
import User from "../Models/User.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY);
export const createPaymentIntent = async (req, res) => {
  const { cart, shippingAddress, totalPrice, user } = req.body;
  console.log("cart", cart);
  console.log("shippingAddress", shippingAddress);
  console.log("totalPrice", totalPrice);
  console.log("user", user);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: "usd",
      payment_method_types: ["card"],
      // description: `Order for user ${user._id}`,
    });

    res.status(201).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { cart, shippingAddress, paymentMethod, totalPrice, user } = req.body;

    const newOrder = new Order({
      orderItems: cart,
      shippingAddress,
      paymentMethod,
      totalPrice,
      user,
    });

    

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user");

    res.status(200).json(orders);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getOrdersByUserId = async (req, res) => { 
  try {
    const orders = await Order.find({ user: req.params.id });

    res.status(200).json(orders);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    console.log("id", id);
    console.log("orderStatus", orderStatus);
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const checkAndGenerateCoupon = async (userId) => {
  const orderCount = await Order.countDocuments({ user: userId });

  if (orderCount >= 10) {
    const user = await User.findById(userId);

    if (!user.coupon || !user.coupon.isActive) {
      const generatedCode = `LOYAL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      user.coupon = {
        code: generatedCode,
        discount: 20, // 20% discount
        isActive: true,
        issuedAt: new Date(),
      };

      await user.save();
      console.log("🎉 Coupon generated for user:", user.email);
    }
  }
};
