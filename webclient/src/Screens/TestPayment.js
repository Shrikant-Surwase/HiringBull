import React, { useEffect } from "react";

const TestPayment = () => {
  // Load Razorpay script once
  useEffect(() => {
    if (window.Razorpay) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      console.log("✅ Razorpay script loaded");
    };

    script.onerror = () => {
      console.error("❌ Failed to load Razorpay script");
    };

    document.body.appendChild(script);
  }, []);

  const handlePay = async () => {
    try {
      console.log("🟡 Starting test payment...");

      // 1️⃣ Create order from backend
      const res = await fetch(
        "http://0.0.0.0:4000/api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test.user@gmail.com",
            amount: 100,            // ₹100
            planType: "STARTER",
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const data = await res.json();

      console.log("✅ Order created:", data);
      // data.amount is in PAISE (₹100 → 10000)

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: data.key,                 // rzp_test_...
        amount: data.amount,           // in paise
        currency: "INR",
        order_id: data.orderId,

        name: "HiringBull (Test)",
        description: "₹100 Test Payment",

        prefill: {
          name: "Test User",
          email: "test.user@gmail.com",
        },

        handler: async function (response) {
          console.log("🟢 Razorpay success:", response);

          // 3️⃣ Verify payment
          const verifyRes = await fetch(
            "http://0.0.0.0:4000/api/payment/verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );

          const verifyData = await verifyRes.json();
          console.log("🔐 Verify response:", verifyData);

          if (!verifyRes.ok || !verifyData.success) {
            alert("❌ Payment verification failed");
            return;
          }

          alert("✅ Payment successful (TEST MODE)");
        },

        modal: {
          ondismiss: () => {
            console.log("⚠️ Payment popup closed by user");
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
      console.error("❌ Payment error:", err);
      alert("Something went wrong. Check console.");
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
