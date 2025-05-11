import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useGlobalReefetch } from "../../Store/Store";
import { useNavigate } from "react-router-dom";

const CheckOutModal = ({ isOpen, onOpenChange, total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const { globalRefetch, setGlobalRefetch } = useGlobalReefetch();
  const navigate = useNavigate();

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isCityValid, setIsCityValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    const cart = localStorage.getItem("cart");
    if (user) setUser(JSON.parse(user));
    if (cart) setCart(JSON.parse(cart));
  }, []);

  const validateName = (value) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      setIsNameValid(false);
      return false;
    } else if (value.length < 5) {
      setErrors((prev) => ({
        ...prev,
        name: "Name must be at least 5 characters",
      }));
      setIsNameValid(false);
      return false;
    } else {
      setErrors((prev) => ({ ...prev, name: null }));
      setIsNameValid(true);
      return true;
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!value) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      setIsEmailValid(false);
      return false;
    } else if (!emailRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      setIsEmailValid(false);
      return false;
    } else {
      setErrors((prev) => ({ ...prev, email: null }));
      setIsEmailValid(true);
      return true;
    }
  };

  const validateCity = (value) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, city: "City is required" }));
      setIsCityValid(false);
      return false;
    } else if (value.length < 5) {
      setErrors((prev) => ({
        ...prev,
        city: "City must be at least 5 characters",
      }));
      setIsCityValid(false);
      return false;
    } else {
      setErrors((prev) => ({ ...prev, city: null }));
      setIsCityValid(true);
      return true;
    }
  };

  const validatePhone = (value) => {
    const phoneRegex = /^0\d{9}$/;
    if (!value) {
      setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
      setIsPhoneValid(false);
      return false;
    } else if (!phoneRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Please enter a valid 10-digit phone number starting with 0",
      }));
      setIsPhoneValid(false);
      return false;
    } else {
      setErrors((prev) => ({ ...prev, phone: null }));
      setIsPhoneValid(true);
      return true;
    }
  };

  const validateAddress = (value) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, address: "Address is required" }));
      setIsAddressValid(false);
      return false;
    } else if (value.length < 5) {
      setErrors((prev) => ({
        ...prev,
        address: "Address must be at least 5 characters",
      }));
      setIsAddressValid(false);
      return false;
    } else {
      setErrors((prev) => ({ ...prev, address: null }));
      setIsAddressValid(true);
      return true;
    }
  };

  const validate = () => {
    const nameIsValid = validateName(name);
    const emailIsValid = validateEmail(email);
    const cityIsValid = validateCity(city);
    const phoneIsValid = validatePhone(phone);
    const addressIsValid = validateAddress(address);

    let cardValid = true;
    if (paymentMethod === "credit-card") {
      const cardElement = elements?.getElement(CardElement);
      if (!cardElement) {
        setErrors((prev) => ({
          ...prev,
          card: "Credit card information is incomplete",
        }));
        cardValid = false;
      } else {
        setErrors((prev) => ({ ...prev, card: null }));
      }
    }

    return (
      nameIsValid &&
      emailIsValid &&
      cityIsValid &&
      phoneIsValid &&
      addressIsValid &&
      cardValid
    );
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    if (!validate()) {
      setIsSubmitting(false);
      toast.error("Please correct the errors in the form.");
      return;
    }

    const data = {
      shippingAddress: { name, email, city, phone, address },
      user,
      cart,
      totalPrice: total,
      paymentMethod,
    };

    if (paymentMethod === "credit-card") {
      if (!stripe || !elements) {
        toast.error("Stripe.js has not loaded yet.");
        setIsSubmitting(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/orders/create-payment-intent",
          data
        );
        const clientSecret = response.data.clientSecret;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
              name: data.shippingAddress.name,
              email: data.shippingAddress.email,
            },
          },
        });

        if (paymentResult.error) {
          toast.error(paymentResult.error.message);
        } else if (paymentResult.paymentIntent.status === "succeeded") {
          await axios.post("http://localhost:5000/orders", data);
          toast.success("Payment successful, order placed!");
          localStorage.removeItem("cart");
          setGlobalRefetch(!globalRefetch);
          onOpenChange();
          navigate("/user/profile");
        }
      } catch (error) {
        toast.error("Failed to place order");
        console.error(error);
      }
    } else {
      try {
        await axios.post("http://localhost:5000/orders", data);
        toast.success("Order placed successfully");
        localStorage.removeItem("cart");
        setGlobalRefetch(!globalRefetch);
        navigate("/user/profile");
        onOpenChange();
      } catch (error) {
        toast.error("Failed to place order");
        console.error(error);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      data-testid="checkout-modal"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader
              className="flex flex-col gap-1"
              data-testid="checkout-modal-header"
            >
              <h4>Checkout</h4>
            </ModalHeader>
            <ModalBody data-testid="checkout-modal-body">
              <form className="flex flex-col gap-2" data-testid="checkout-form">
                <div className="flex gap-3">
                  <div className="w-full">
                    {errors.name && (
                      <p
                        className="text-red-500 text-sm mb-1"
                        data-testid="name-error"
                      >
                        {errors.name}
                      </p>
                    )}
                    <Input
                      label="Your name"
                      placeholder="Enter your name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={(e) => validateName(e.target.value)}
                      isInvalid={!isNameValid}
                      color={!isNameValid ? "danger" : "default"}
                      data-testid="name-input"
                      id="name-input"
                    />
                  </div>
                  <div className="w-full">
                    {errors.email && (
                      <p
                        className="text-red-500 text-sm mb-1"
                        data-testid="email-error"
                      >
                        {errors.email}
                      </p>
                    )}
                    <Input
                      label="Your email"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={(e) => validateEmail(e.target.value)}
                      isInvalid={!isEmailValid}
                      color={!isEmailValid ? "danger" : "default"}
                      data-testid="email-input"
                      id="email-input"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-full">
                    {errors.city && (
                      <p
                        className="text-red-500 text-sm mb-1"
                        data-testid="city-error"
                      >
                        {errors.city}
                      </p>
                    )}
                    <Input
                      label="Your city"
                      placeholder="Enter your city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onBlur={(e) => validateCity(e.target.value)}
                      isInvalid={!isCityValid}
                      color={!isCityValid ? "danger" : "default"}
                      data-testid="city-input"
                      id="city-input"
                    />
                  </div>
                  <div className="w-full">
                    {errors.phone && (
                      <p
                        className="text-red-500 text-sm mb-1"
                        data-testid="phone-error"
                      >
                        {errors.phone}
                      </p>
                    )}
                    <Input
                      label="Your phone number"
                      placeholder="Enter your phone number (10 digits starting with 0)"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setPhone(value);
                      }}
                      onBlur={(e) => validatePhone(e.target.value)}
                      isInvalid={!isPhoneValid}
                      color={!isPhoneValid ? "danger" : "default"}
                      data-testid="phone-input"
                      id="phone-input"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-full">
                    {errors.address && (
                      <p
                        className="text-red-500 text-sm mb-1"
                        data-testid="address-error"
                      >
                        {errors.address}
                      </p>
                    )}
                    <Textarea
                      label="Your address"
                      placeholder="Enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onBlur={(e) => validateAddress(e.target.value)}
                      isInvalid={!isAddressValid}
                      color={!isAddressValid ? "danger" : "default"}
                      data-testid="address-input"
                      id="address-input"
                    />
                  </div>
                </div>
                <RadioGroup
                  label="Select your payment method"
                  color="secondary"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  data-testid="payment-method-group"
                  id="payment-method-group"
                >
                  <Radio
                    size="sm"
                    value="cash-on-delivery"
                    data-testid="cash-on-delivery-option"
                    id="cash-on-delivery-option"
                  >
                    Cash on delivery
                  </Radio>
                  <Radio
                    size="sm"
                    value="credit-card"
                    data-testid="credit-card-option"
                    id="credit-card-option"
                  >
                    Credit card
                  </Radio>
                </RadioGroup>
                {paymentMethod === "credit-card" && (
                  <div
                    className="bg-black p-2 rounded-lg"
                    data-testid="card-element-container"
                  >
                    {errors.card && (
                      <p
                        className="text-red-500 text-sm mb-1"
                        data-testid="card-error"
                      >
                        {errors.card}
                      </p>
                    )}
                    <CardElement
                      options={{
                        style: {
                          base: {
                            iconColor: "#c4f0ff",
                            color: "#fff",
                            fontWeight: "500",
                            fontFamily:
                              "Roboto, Open Sans, Segoe UI, sans-serif",
                            fontSize: "16px",
                            fontSmoothing: "antialiased",
                            "::placeholder": { color: "#87BBFD" },
                          },
                          invalid: {
                            iconColor: "#FFC7EE",
                            color: "#FFC7EE",
                          },
                        },
                      }}
                      data-testid="card-element"
                      id="card-element"
                    />
                  </div>
                )}
              </form>
            </ModalBody>
            <ModalFooter data-testid="checkout-modal-footer">
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                data-testid="close-button"
                id="close-button"
              >
                Close
              </Button>
              <Button
                color="primary"
                onClick={onSubmit}
                disabled={isSubmitting}
                data-testid="submit-button"
                id="submit-button"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CheckOutModal;