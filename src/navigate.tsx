
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./page/main";
import Test from "./page/test";
import Print from "./page/print";


function Navigate() {
  return (
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/test" element={<Test />} />
            <Route path="/print" element={<Print />} />
          </Routes>
        </div>
      </Router>
  );
}

export default Navigate;
