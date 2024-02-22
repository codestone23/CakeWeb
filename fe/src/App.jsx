import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/layout';
import HomePage from "./components/HomePage";
import Payment from "./components/Payment";
import SearchOrder from "./components/SearchOrder";
import ShowBill from "./components/ShowBill";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/homepage" element={<HomePage />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/search-order" element={<SearchOrder />}></Route>
          <Route path="/show-bill" element={<ShowBill />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/*" element={<HomePage />}></Route>
        </Route>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
