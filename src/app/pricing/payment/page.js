"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const paymentOptions = [
  {
    label: "Stripe",
    value: "stripe",
    icon: `
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="35" viewBox="0 0 48 48">
<path fill="#03A9F4" d="M41.765,38H6.235C4.439,38,3,36.63,3,34.848v-22.62C3,10.445,4.439,9,6.235,9h35.529C43.56,9,45,10.445,45,12.228v22.62C45,36.63,43.56,38,41.765,38z"></path><path fill="#FFF" d="M36.847,23.277c0.069-1.101,0.354-1.613,0.926-1.613c0.548,0,0.848,0.527,0.886,1.613H36.847z M40.953,23.935c0-1.23-0.27-2.203-0.781-2.885c-0.54-0.697-1.346-1.05-2.359-1.05c-2.088,0-3.396,1.546-3.396,4.022c0,1.384,0.345,2.427,1.038,3.085C36.072,27.702,36.958,28,38.085,28c1.047,0,2.017-0.251,2.632-0.655l-0.268-1.688c-0.607,0.331-1.31,0.511-2.095,0.511c-0.47,0-0.806-0.103-1.044-0.308c-0.262-0.219-0.408-0.572-0.46-1.076h4.068C40.944,24.669,40.953,24.106,40.953,23.935z M31.057,25.533c-0.221,0.377-0.531,0.58-0.89,0.58c-0.241,0-0.472-0.053-0.669-0.147v-3.718c0.428-0.441,0.814-0.491,0.942-0.491c0.631,0,0.941,0.681,0.941,2.017C31.384,24.534,31.269,25.126,31.057,25.533z M33.113,20.709c-0.438-0.571-1.059-0.853-1.845-0.853c-0.712,0-1.343,0.302-1.934,0.936l-0.142-0.784H27V31l2.481-0.416l0.017-2.799c0.387,0.121,0.779,0.185,1.131,0.185c0.627,0,1.53-0.157,2.235-0.926c0.667-0.73,0.996-1.862,0.996-3.361C33.86,22.358,33.615,21.353,33.113,20.709z M23.527,20.008H26V28h-2.473V20.008z M24.784,19.233c0.718,0,1.3-0.594,1.3-1.313c0-0.733-0.584-1.32-1.3-1.32c-0.738,0-1.323,0.587-1.323,1.32C23.461,18.64,24.046,19.233,24.784,19.233z M22.463,19.9c-0.705,0-1.279,0.372-1.491,1.031l-0.15-0.921h-2.17V28h2.482v-5.25c0.312-0.382,0.749-0.52,1.362-0.52c0.127,0,0.256,0,0.438,0.026v-2.294C22.751,19.921,22.6,19.9,22.463,19.9z M17.68,21.855l0.308-1.848h-1.601v-2.245l-2.129,0.354l-0.309,1.891L13.2,20.13l-0.277,1.726h1.024v3.622c0,0.941,0.238,1.599,0.72,1.998c0.421,0.335,1.011,0.493,1.843,0.493c0.654,0,1.043-0.112,1.297-0.184v-1.959c-0.133,0.041-0.48,0.115-0.716,0.115c-0.48,0-0.705-0.25-0.705-0.825v-3.265h1.294V21.855z M10.531,23.05c-0.707-0.265-1.118-0.473-1.118-0.803c0-0.275,0.229-0.434,0.646-0.434c0.737,0,1.509,0.281,2.023,0.544l0.3-1.829C11.964,20.326,11.113,20,9.94,20c-0.84,0-1.535,0.22-2.014,0.621c-0.532,0.429-0.802,1.043-0.802,1.786c0,1.347,0.824,1.918,2.166,2.402c0.857,0.308,1.154,0.527,1.154,0.868c0,0.322-0.274,0.514-0.795,0.514c-0.624,0-1.641-0.31-2.327-0.703l-0.282,1.853C7.616,27.663,8.676,28,9.788,28c0.887,0,1.622-0.21,2.102-0.606c0.568-0.432,0.844-1.077,0.844-1.905C12.736,24.106,11.891,23.531,10.531,23.05L10.531,23.05z"></path>
</svg>
    `,
  },
  {
    label: "PayPal",
    value: "paypal",
    icon: `
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="35" viewBox="0 0 48 48">
<path fill="#1565C0" d="M18.7,13.767l0.005,0.002C18.809,13.326,19.187,13,19.66,13h13.472c0.017,0,0.034-0.007,0.051-0.006C32.896,8.215,28.887,6,25.35,6H11.878c-0.474,0-0.852,0.335-0.955,0.777l-0.005-0.002L5.029,33.813l0.013,0.001c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,0.991,1,0.991h8.071L18.7,13.767z"></path><path fill="#039BE5" d="M33.183,12.994c0.053,0.876-0.005,1.829-0.229,2.882c-1.281,5.995-5.912,9.115-11.635,9.115c0,0-3.47,0-4.313,0c-0.521,0-0.767,0.306-0.88,0.54l-1.74,8.049l-0.305,1.429h-0.006l-1.263,5.796l0.013,0.001c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,1,1,1h7.333l0.013-0.01c0.472-0.007,0.847-0.344,0.945-0.788l0.018-0.015l1.812-8.416c0,0,0.126-0.803,0.97-0.803s4.178,0,4.178,0c5.723,0,10.401-3.106,11.683-9.102C42.18,16.106,37.358,13.019,33.183,12.994z"></path><path fill="#283593" d="M19.66,13c-0.474,0-0.852,0.326-0.955,0.769L18.7,13.767l-2.575,11.765c0.113-0.234,0.359-0.54,0.88-0.54c0.844,0,4.235,0,4.235,0c5.723,0,10.432-3.12,11.713-9.115c0.225-1.053,0.282-2.006,0.229-2.882C33.166,12.993,33.148,13,33.132,13H19.66z"></path>
</svg>
    `,
  },
];

const fakeBackendUrl = "https://jsonplaceholder.typicode.com/posts"; // Fake endpoint

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState("google");
  const [plan, setPlan] = useState(null);
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Load plan from localStorage
    const stored = localStorage.getItem("selectedPlan");
    if (stored) {
      setPlan(JSON.parse(stored));
    }
  }, []);

  const handleInput = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const amount = plan?.priceValue || 0;
      const payload = { amount };
      await fetch(fakeBackendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSuccess(true);
    } catch (err) {
      setError("Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  // Card number formatting for preview
  const formatCardNumber = (num) => {
    const clean = num.replace(/\D/g, "").slice(0, 16);
    return clean.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary via-white to-secondary/10 p-0">
      {/* Back Button */}
      <button
        className="absolute top-6 left-6 flex items-center gap-2 text-primary hover:text-secondary bg-white/80 rounded-full p-2 shadow transition-all z-50"
        onClick={() => router.push("/pricing")}
        aria-label="Back to pricing"
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path
            d="M15.75 19.25L8.25 12l7.5-7.25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="hidden sm:inline font-medium">Back</span>
      </button>
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full mt-8 md:mt-0">
        {/* Card stack */}
        <div className="relative flex-1 bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-8 min-h-[500px]">
          {/* Card 1 */}
          <div
            className="absolute left-1/2 top-32 -translate-x-1/2 z-10 w-80 h-48 rounded-2xl bg-white bg-opacity-10 border border-white border-opacity-20 shadow-lg backdrop-blur-sm"
            style={{ transform: "translate(-50%, 0) rotate(-8deg)" }}
          ></div>
          {/* Card 2 */}
          <div
            className="absolute left-1/2 top-40 -translate-x-1/2 z-20 w-80 h-48 rounded-2xl bg-white bg-opacity-20 border border-white border-opacity-30 shadow-lg backdrop-blur-sm"
            style={{ transform: "translate(-50%, 0) rotate(-4deg)" }}
          ></div>
          {/* Card 3 (active) */}
          <div className="relative z-30 w-80 h-48 rounded-2xl bg-white bg-opacity-20 border border-white border-opacity-30 shadow-lg backdrop-blur-sm shadow-xl flex flex-col justify-between p-6 text-white">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg tracking-widest">VISA</span>
              <span className="text-xs">{plan?.name || "Plan"}</span>
            </div>
            <div className="text-2xl font-mono tracking-widest mt-4 mb-2">
              {formatCardNumber(card.number) || "**** **** **** ****"}
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>{card.name || "Card Holder"}</span>
              <span>{card.expiry || "mm/yy"}</span>
            </div>
          </div>
        </div>
        {/* Payment form */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Payment details
            </h2>
          </div>
          <form className="space-y-5" onSubmit={handlePay}>
            <div className="flex gap-2 mb-2">
              {paymentOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                    selectedOption === opt.value
                      ? "border-primary bg-primary/10"
                      : "border-input bg-white"
                  }`}
                  onClick={() => setSelectedOption(opt.value)}
                >
                  <div dangerouslySetInnerHTML={{ __html: opt.icon }} />
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
              <span className="flex-1 h-px bg-gray-200"></span>
              <span>Or</span>
              <span className="flex-1 h-px bg-gray-200"></span>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-medium mb-1">
                  Card Number *
                </label>
                <input
                  type="text"
                  name="number"
                  value={card.number}
                  onChange={handleInput}
                  className="w-full border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>
              <button
                type="button"
                tabIndex={-1}
                className="self-end mb-1 text-gray-400 hover:text-input"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <path
                    d="M2.5 10a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm7.5-3.75a.625.625 0 100 1.25.625.625 0 000-1.25zm0 2.5a.625.625 0 00-.625.625v2.5a.625.625 0 001.25 0v-2.5A.625.625 0 0010 8.75z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">
                Card Holder Name
              </label>
              <input
                type="text"
                name="name"
                value={card.name}
                onChange={handleInput}
                className="w-full border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Full name"
                required
              />
            </div>
            <section className="flex gap-2 w-full">
              <div className="w-11/12 flex gap-2">
                <div className="flex-1 w-1/2">
                  <label className="block text-xs font-medium mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    value={card.expiry}
                    onChange={handleInput}
                    className="w-full border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="mm/yy"
                    maxLength={5}
                    required
                  />
                </div>
                <div className="flex-1 w-1/2">
                  <label className="block text-xs font-medium mb-1">
                    CVV/CVV2 *
                  </label>
                  <input
                    type="password"
                    name="cvv"
                    value={card.cvv}
                    onChange={handleInput}
                    className="w-full border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="XXX"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
              <div className="flex items-end mt-4 w-1/12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="50"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#1565C0"
                    d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"
                  ></path>
                  <path
                    fill="#FFF"
                    d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z"
                  ></path>
                  <path
                    fill="#FFC107"
                    d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z"
                  ></path>
                </svg>
              </div>
            </section>
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-500 font-medium">Total Amount:</span>
              <span className="text-primary text-lg font-bold">
                {plan
                  ? plan.price.startsWith("£")
                    ? plan.price
                    : `$${plan.priceValue}`
                  : "$0"}
              </span>
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-lg bg-primary text-white font-semibold text-lg shadow-md hover:bg-primary-dark transition-all disabled:opacity-60"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : `Pay ${
                    plan
                      ? plan.price.startsWith("£")
                        ? plan.price
                        : `$${plan.priceValue}`
                      : "$0"
                  }`}
            </button>
            {success && (
              <div className="text-green-600 text-center mt-2">
                Payment successful!
              </div>
            )}
            {error && (
              <div className="text-red-600 text-center mt-2">{error}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
