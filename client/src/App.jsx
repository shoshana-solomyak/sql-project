import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/Home";
import Login from "../components/Login";
import Todos from "../components/Todos";
import UserPosts from "../components/UserPosts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/:userId" element={<Home />} />
            <Route path="/:userId/posts" element={<UserPosts />} />
            <Route path="/:userId/todos" element={<Todos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
