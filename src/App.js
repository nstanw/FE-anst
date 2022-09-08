import Header from "../src/components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Study from "./components/Study";
import  Toggle from "../src/components/Toggle/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Report from "./components/Report";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Study />} />
          <Route path="/report" element={<Report />} />
          <Route path="/profile" element={<Study />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
