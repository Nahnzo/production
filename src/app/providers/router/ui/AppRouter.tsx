import PageLoader from "widgets/PageLoader/PageLoader";
import { Suspense, memo, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { AppRoutesProps, routeConfig } from "shared/config/routeConfig/routeConfig";
import { RequireAuth } from "./RequireAuth";

function AppRouter() {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;
    return (
      <Route
        path={route.path}
        key={route.path}
        element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
      />
    );
  }, []);
  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
}

export default memo(AppRouter);
