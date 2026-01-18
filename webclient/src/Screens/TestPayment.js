import React, { useEffect } from "react";

const TestPayment = () => {

  // Load Razorpay script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePay = async () => {
    try {
      // 1️⃣ Create order from backend
      const res = await fetch(
        "http://localhost:4000/api/public/testing/razorpay/create-order",
        { method: "POST" }
      );

      const data = await res.json();

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: data.key, // rzp_test_...
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Hiringbull (Test)",
        description: "₹100 Test Payment",
        handler: async function (response) {
          // 3️⃣ Verify payment
          await fetch(
            "http://localhost:4000/api/public/testing/razorpay/verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );

          alert("✅ Payment successful (TEST MODE)");
        },
        modal: {
          ondismiss: () => {
            alert("❌ Payment cancelled");
          },
        },
        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Razorpay Test Payment</h2>
      <p>Amount: ₹100 (Test Mode)</p>

      <button
        onClick={handlePay}
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Pay ₹100 (Test)
      </button>
    </div>
  );
};

export default TestPayment;
