import { useTheme } from "app/providers/ThemeProvider";
import { classNames } from "shared/lib/classNames/classNames";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserMounted, userActions } from "entities/User";
import { AppRouter } from "./providers/router";

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const mounted = useSelector(getUserMounted);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <div className="page-wrapper">{mounted && <AppRouter />}</div>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
