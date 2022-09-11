import Header from "../src/components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Study from "./components/Study";
import  Toggle from "../src/components/Toggle/Index";
import Report from "./components/Report";
import Animation from "./components/Animation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        

          <Animation/>
          {/* <Route path="/" element={<Study />} />
          <Route path="/report" element={<Report />} />
          <Route path="/profile" element={<Study />} />
        <Route path="*" element={<h1>404</h1>} /> */}
    
 
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
