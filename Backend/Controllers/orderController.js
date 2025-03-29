import Order from "../Models/orders.js";
import Stripe from "stripe";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @desc    Create a Stripe Payment Intent
 * @route   POST /api/payment/create-payment-intent
 * @access  Private
 */
export const createPaymentIntent = async (req, res) => {
  const { cart, shippingAddress, totalPrice, user } = req.body;

  try {
    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100, // Stripe requires amount in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(201).json({
      success: true,
      clientSecret: paymentIntent.client_secret, // Send client secret to frontend
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private
 */
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

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(409).json({ message: error.message });
  }
};

/**
 * @desc    Get all orders (Admin)
 * @route   GET /api/orders
 * @access  Private/Admin
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user"); // Populate user details
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(409).json({ message: error.message });
  }
};

/**
 * @desc    Get orders by user ID
 * @route   GET /api/orders/user/:id
 * @access  Private
 */
export const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id });
    res.status(200).json(orders);
  } catch (error) {
    console.error("User Orders Fetch Error:", error);
    res.status(409).json({ message: error.message });
  }
};

/**
 * @desc    Update order status (Admin)
 * @route   PATCH /api/orders/:id
 * @access  Private/Admin
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error("Order Update Error:", error);
    res.status(409).json({ message: error.message });
  }
};

/**
 * @desc    Delete an order (Admin)
 * @route   DELETE /api/orders/:id
 * @access  Private/Admin
 */
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Order Deletion Error:", error);
    res.status(409).json({ message: error.message });
  }
};