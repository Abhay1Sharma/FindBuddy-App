import './index.css';
import ReactDOM from "react-dom/client";
import { ToastContainer } from 'react-toastify';
import Navbar from "./LandingPage/Navbar/Navbar";
import FormData from './LandingPage/FormPage/FormPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './LandingPage/Home/Home';
import Footer from "./LandingPage/Footer/Footer";
import NotFound from "./LandingPage/NotFound/Hero";
import UpdateForm from './LandingPage/UpdateForm/UpdateForm';
import LogoutSync from './LandingPage/LogoutSync/LogoutSync';
import { useState, useEffect } from "react";

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // 1. Grab token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // 2. Store it
      localStorage.setItem("token", token);
      // 3. Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      window.location.href = "http://localhost:3000/login";
    }

    // 4. Set ready to true so the UI can finally show up
    setReady(true);
  }, []);

  // While checking for the token, show a loading screen
  if (!ready) {
    return (
      <div className='root' >
        <div className="loaderContent">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="page-wrapper">
        <Navbar setSearch={setSearch} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home search={search} />} />
            <Route path="/complete-profile" element={<FormData />} />
            <Route path="/update-profile" element={<UpdateForm />} />
            <Route path="/logout-sync" element={<LogoutSync />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

root.render(<App />);