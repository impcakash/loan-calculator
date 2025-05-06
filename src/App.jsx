import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeRegistry";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import HomePage from "./pages/HomePage";
import ExchangeRatesPage from "./pages/ExchangeRatesPage";
import AboutPage from "./pages/AboutPage";
import ErrorDemoPage from "./pages/ErrorDemoPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exchange-rates" element={<ExchangeRatesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/error-demo" element={<ErrorDemoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
