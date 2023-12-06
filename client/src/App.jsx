import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:username" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
