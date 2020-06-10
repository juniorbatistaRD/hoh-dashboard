import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import AuthContextProvider from "./context/AuthContext";
import Main from "./layout/Main";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/app/*" element={<Main />} />
            {/* <Route path="/app" element={<Dashboard />} /> */}
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
