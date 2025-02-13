import { useEffect } from "react";
import "./CurrencyConverter.css";
import { useState } from "react";

function CurrencyConverter({ url }) {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [rate, setRate] = useState(null);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    fetchRate();
  }, [amount, fromCurrency, toCurrency]);

  const sendRequest = async (endpoint) => {
    try {
      setError("");
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("try test");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Wrong request, try again a different value or params");
      return null;
    }
  };

  const fetchCurrencies = async () => {
    const data = await sendRequest(`http://localhost:5000/api/currencies`);
    if (data) {
      console.log("fetchCurrencies", data);
      setCurrencies(Object.keys(data));
    }
  };

  const fetchRate = async () => {
    const data = await sendRequest(
      `http://localhost:5000/api/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    );
    if (data) {
      console.log("fetchRate", data);
      setRate(data);
    }
  };

  return (
    <div className="currency-converter">
      <h2>Convert Currency</h2>
      {/* {error && <h2 className="error">{error}</h2>} */}
      <form>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            required
          >
            {currencies.map((currency) => (
              <option value={currency} key={`from_${currency}`}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            required
          >
            {currencies.map((currency) => (
              <option value={currency} key={`to_${currency}`}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </form>
      <h2 className="currency-coverter-error">
        <div>
          {rate && rate.rates && rate.rates[toCurrency] && (
            <p>
              {amount} {fromCurrency} is approximately{" "}
              {(amount * rate.rates[toCurrency]).toFixed(2)} {toCurrency}
            </p>
          )}
        </div>
      </h2>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CurrencyConverter;
