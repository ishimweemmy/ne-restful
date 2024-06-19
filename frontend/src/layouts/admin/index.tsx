import React, { Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "src/components/navbar";
import Sidebar from "src/components/sidebar";
import Footer from "src/components/footer/Footer";
import routes from "src/routes";

export default function Admin(props: { [x: string]: any }) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Home");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true),
    );
  }, []);

  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes: RoutesType[]): string | boolean => {
    let activeRoute = "Home";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path,
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes: RoutesType[]): string | boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary || false; // Return the secondary value or false
      }
    }
    return activeNavbar;
  };

  const getRoutes = (routes: RoutesType[]): any => {
    const allRoutes = routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key}>
            {prop.children &&
              prop.children.map((child, key) => {
                return (
                  <Route
                    path={`${child.path}`}
                    element={child.component}
                    key={key}
                  />
                );
              })}
          </Route>
        );
      } else {
        return null;
      }
    });
    return allRoutes;
  };

  document.documentElement.dir = "ltr";

  return (
    <div className="flex w-full h-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[250px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Suspense fallback={<h1>Loading.....</h1>}>
                <Routes>
                  {getRoutes(routes)}

                  <Route
                    path="/"
                    element={<Navigate to="/admin/default" replace />}
                  />
                </Routes>
              </Suspense>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
