"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext(null);

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

export function CurrencyProvider({ children }) {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://v6.exchangerate-api.com/v6/69e10e8aa21d1761038bd8d2/latest/USD"
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.result === "success") {
          setExchangeRates(data.conversion_rates);
        } else {
          throw new Error(data.error || "Failed to fetch exchange rates");
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setError("Failed to load currency data. Using USD only.");

        setExchangeRates({
          EUR: 0.91,
          GBP: 0.78,
          JPY: 149.56,
          CAD: 1.35,
          AUD: 1.52,
          INR: 83.12,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const convertAmount = (
    amount,
    fromCurrency = "USD",
    toCurrency = selectedCurrency
  ) => {
    if (!exchangeRates || amount === null || amount === undefined)
      return amount;

    if (fromCurrency === toCurrency) return amount;

    try {
      if (fromCurrency === "USD") {
        return amount * (exchangeRates[toCurrency] || 1);
      } else if (toCurrency === "USD") {
        return amount / (exchangeRates[fromCurrency] || 1);
      } else {
        const amountInUSD = amount / (exchangeRates[fromCurrency] || 1);
        return amountInUSD * (exchangeRates[toCurrency] || 1);
      }
    } catch (error) {
      console.error("Conversion error:", error);
      return amount;
    }
  };

  const formatCurrency = (amount, currency = selectedCurrency) => {
    if (amount === null || amount === undefined) return "";

    try {
      const formatter = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return formatter.format(amount);
    } catch (error) {
      console.error("Formatting error:", error);
      return `${currency} ${Number(amount).toFixed(2)}`;
    }
  };

  const value = {
    exchangeRates,
    selectedCurrency,
    setSelectedCurrency,
    loading,
    error,
    convertAmount,
    formatCurrency,
    availableCurrencies: exchangeRates ? Object.keys(exchangeRates) : [],
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}
