import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form/Form";
import Dashboard from "./components/Dashboard/Dashboard";
import Delete from './components/Delete/Delete';
import Edit from './components/Edit/Edit';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Form />} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
        <Route exact path="/delete/:id" element={<Delete/>} />
        <Route exact path="/edit/:id" element={<Edit/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
