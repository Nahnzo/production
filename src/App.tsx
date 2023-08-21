import { Route, Routes } from "react-router-dom";
import Counter from "./components/Counter";
import "./index.scss";

import { Link } from "react-router-dom";
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";
import { Suspense } from "react";

const App = () => {
  return (
    <div className="App">
      <Link to={"/"}>Главная</Link>
      <Link to={"/about"}>Сайте</Link>
      <Suspense fallback={<div>Load</div>}>
        <Routes>
          <Route path={"/about"} element={<AboutPageAsync />} />
          <Route path={"/"} element={<MainPageAsync />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
