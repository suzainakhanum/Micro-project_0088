import { useState } from "react";
import "./App.css";

function App() {
  // Form values
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  // Details shown on cards only after Confirm
  const [confirmedDetails, setConfirmedDetails] = useState(null);

  // Validation errors
  const [errors, setErrors] = useState({});

  // Success message
  const [showSuccess, setShowSuccess] = useState(false);

  // Format card number
  const handleCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    value = value.substring(0, 16);

    value = value.replace(/(.{4})/g, "$1 ").trim();

    setCardNumber(value);
  };

  // Confirm button
  const handleConfirm = () => {
    const newErrors = {};

    // Name
    if (!cardHolder.trim()) {
      newErrors.cardHolder =
        "Cardholder name is required";
    }

    // Card number
    const cleanNumber = cardNumber.replace(/\s/g, "");

    if (!cleanNumber) {
      newErrors.cardNumber =
        "Card number is required";
    } else if (cleanNumber.length !== 16) {
      newErrors.cardNumber =
        "Card number must contain 16 digits";
    }

    // Month
    if (!expiryMonth) {
      newErrors.expiryMonth =
        "Month is required";
    } else if (
      Number(expiryMonth) < 1 ||
      Number(expiryMonth) > 12
    ) {
      newErrors.expiryMonth =
        "Enter a valid month";
    }

    // Year
    if (!expiryYear) {
      newErrors.expiryYear =
        "Year is required";
    }

    // CVV
    if (!cvv) {
      newErrors.cvv =
        "CVV is required";
    } else if (cvv.length !== 3) {
      newErrors.cvv =
        "CVV must contain 3 digits";
    }

    setErrors(newErrors);

    // Show details on cards only when valid
    if (Object.keys(newErrors).length === 0) {
      setConfirmedDetails({
        cardHolder,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
      });

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="app">

      {/* =========================
          CARD DISPLAY
      ========================= */}

      <div className="cards-area">

        {/* FRONT CARD */}

        <div className="credit-card front-card">

          <div className="card-top">

            <div className="card-circle"></div>

            <div className="small-circle"></div>

            <div className="visa">
              VISA
            </div>

          </div>

          <div className="card-number">

            {confirmedDetails
              ? confirmedDetails.cardNumber
              : "0000 0000 0000 0000"}

          </div>

          <div className="front-bottom">

            <div>
              <span>Cardholder Name</span>

              <h3>
                {confirmedDetails
                  ? confirmedDetails.cardHolder.toUpperCase()
                  : "JANE APPLESEED"}
              </h3>
            </div>

            <div>
              <span>Expires</span>

              <h3>
                {confirmedDetails
                  ? `${confirmedDetails.expiryMonth}/${confirmedDetails.expiryYear}`
                  : "00/00"}
              </h3>
            </div>

          </div>

        </div>


        {/* BACK CARD */}

        <div className="credit-card back-card">

          {/* Magnetic strip */}

          <div className="magnetic-strip"></div>

          {/* CVV */}

          <div className="back-content">

            <span className="cvv-label">
              CVV
            </span>

            <div className="cvv-box">

              {confirmedDetails
                ? confirmedDetails.cvv
                : "000"}

            </div>

            <div className="back-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>

        </div>

      </div>


      {/* =========================
          CARD DETAILS FORM
      ========================= */}

      <div className="details-card">

        <h1>Card Details</h1>


        {/* CARDHOLDER NAME */}

        <div className="form-group">

          <label>
            Cardholder Name
          </label>

          <input
            type="text"
            placeholder="e.g. Jane Appleseed"
            value={cardHolder}
            onChange={(e) =>
              setCardHolder(e.target.value)
            }
          />

          {errors.cardHolder && (
            <p className="error">
              {errors.cardHolder}
            </p>
          )}

        </div>


        {/* CARD NUMBER */}

        <div className="form-group">

          <label>
            Card Number
          </label>

          <input
            type="text"
            placeholder="e.g. 1234 5678 9123 0000"
            value={cardNumber}
            onChange={handleCardNumber}
          />

          {errors.cardNumber && (
            <p className="error">
              {errors.cardNumber}
            </p>
          )}

        </div>


        {/* EXPIRY + CVV */}

        <div className="form-row">

          {/* EXPIRY */}

          <div className="form-group">

            <label>
              Expiry Date
            </label>

            <div className="expiry-inputs">

              <input
                type="text"
                placeholder="MM"
                maxLength="2"
                value={expiryMonth}
                onChange={(e) =>
                  setExpiryMonth(
                    e.target.value.replace(/\D/g, "")
                  )
                }
              />

              <input
                type="text"
                placeholder="YY"
                maxLength="2"
                value={expiryYear}
                onChange={(e) =>
                  setExpiryYear(
                    e.target.value.replace(/\D/g, "")
                  )
                }
              />

            </div>

            {errors.expiryMonth && (
              <p className="error">
                {errors.expiryMonth}
              </p>
            )}

            {errors.expiryYear && (
              <p className="error">
                {errors.expiryYear}
              </p>
            )}

          </div>


          {/* CVV */}

          <div className="form-group">

            <label>
              CVV
            </label>

            <input
              type="password"
              placeholder="e.g. 123"
              maxLength="3"
              value={cvv}
              onChange={(e) =>
                setCvv(
                  e.target.value.replace(/\D/g, "")
                )
              }
            />

            {errors.cvv && (
              <p className="error">
                {errors.cvv}
              </p>
            )}

          </div>

        </div>


        {/* CONFIRM */}

        <button
          className="confirm-btn"
          onClick={handleConfirm}
        >
          Confirm
        </button>

      </div>


      {/* SUCCESS MESSAGE */}

      {showSuccess && (
        <div className="success-toast">
          ✓ Card details confirmed successfully!
        </div>
      )}

    </div>
  );
}

export default App;