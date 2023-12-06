import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/:username" element={<Feed />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
