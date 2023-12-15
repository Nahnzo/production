import { classNames } from "shared/lib/classNames/classNames";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserMounted, userActions } from "entities/User";
import { useTheme } from "app/providers/ThemeProvider";
import { AppRouter } from "./providers/router";

function App() {
  const mounted = useSelector(getUserMounted);
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          {/* <div className="page-wrapper">{mounted && <AppRouter />}</div> */}
          {mounted && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
}

export default App;
