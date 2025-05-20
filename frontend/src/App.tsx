import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Events } from "./pages/Events.tsx";
import { Login } from "./pages/Login.tsx";
import { Registration } from "./pages/Registration.tsx";
import { Page404 } from "./pages/Page404.tsx";
import { Confirm } from "./pages/Confirm.tsx";
import { SuccessfulAction } from "./pages/SuccessfulAction.tsx";
import { FailedAction } from "./pages/FailedAction.tsx";

function App() {
  const [activeLayout, setActiveLayout] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const noLayoutRoutes = [
      "/registration/:token",
      "/password-reset-confirmed/:token",
      "/registration",
      "/login",
      "/check-email",
      "/link-error",
      "/password-reset",
      "/verify-error",
      "/confirm",
      "/successful-action",
      "/failed-action",
    ];

    const isNoLayoutPath = noLayoutRoutes.some((path) =>
        matchPath({ path, end: false }, location.pathname),
    );

    const isRootPath = location.pathname === "/";

    setActiveLayout(!isNoLayoutPath && !isRootPath);
  }, [location]);

  return (
    <div className="h-screen flex flex-col overflow-y-hidden">
      {activeLayout && (
        <>
          <Header />
        </>
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/events" element={<Events />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/successful-action" element={<SuccessfulAction />} />
        <Route path="/failed-action" element={<FailedAction />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;