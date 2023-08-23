import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/index.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/homepage/Home";
import SignIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Category from "./pages/Category";


// Define an ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI here
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary> {/* Wrap your entire App with the ErrorBoundary */}
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-category" element={<Category />} />
          <Route path="*" element={<h1>page not found </h1>} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
