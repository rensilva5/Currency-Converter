import { useEffect } from "react";
import "./CurrencyConverter.css";
import { useState } from "react";

function CurrencyConverter({ url }) {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const sendRequest = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        setError("Please try again");
        return;
      }
      const data = await response.json();
      console.log("data=", data);
      return data;
    } catch (error) {
      console.error(error);
      setError("Service is unavailable, try again");
    }
  };

  const fetchCurrencies = async () => {
    const data = await sendRequest(`${url}/currencies`);
    console.log("fetchCurrencies", data);
    setCurrencies(Object.keys(data));
  };

  return (
    <div className="currency-converter">
      <h2>Convert Currency</h2>
      <form>
        <div>
          <label>Amount</label>
          <input type="number" />
        </div>
        <div>
          <label>From</label>
          <select>
            {currencies.map((currency) => (
              <option value={currency} key={`from_${currency}`}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>To</label>
          <select>
            {currencies.map((currency) => (
              <option value={currency} key={`to_${currency}`}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}

export default CurrencyConverter;
