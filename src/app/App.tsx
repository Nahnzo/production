import { Link } from "react-router-dom";
import { useTheme } from "app/providers/ThemeProvider";
import { classNames } from "shared/lib/classNames/classNames";
import { AppRouter } from "./providers/router";
import "./styles/index.scss";

const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={classNames("app", {}, [theme])}>
      <button onClick={() => toggleTheme()}>Toggle</button>
      <Link to={"/"}>Главная</Link>
      <Link to={"/about"}>Сайте</Link>
      <AppRouter />
    </div>
  );
};

export default App;
