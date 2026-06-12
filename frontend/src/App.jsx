import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./Pages/Home";



function Search() {
  return <div className="text-white text-2xl">Search Page</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;