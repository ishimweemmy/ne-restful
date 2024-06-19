import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./views/auth/Register";
import SignIn from "./views/auth/SignIn";
import { ChakraProvider } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import makeStore, { AppStore } from "./app/store";
import { Suspense, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./providers/ProtectedRoute";
import { MantineProvider } from "@mantine/core";
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";
import { createTheme, ThemeProvider } from '@mui/material';

const App = () => {
  const storeRef: any = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const theme = createTheme({});

  return (
    <Provider store={storeRef.current.store}>
      <ToastContainer />
      <PersistGate
        loading={<div>Loading....</div>}
        persistor={storeRef.current.persistor}>
        <ChakraProvider>
          <MantineProvider>
            <ThemeProvider theme={theme}>
              <Suspense fallback={<h1>Loading...</h1>}>
                <Routes>
                  <Route
                    path="auth"
                    element={<AuthLayout />}>
                    <Route
                      path=""
                      element={<Navigate to="/auth/sign-in" />}
                    />
                    <Route
                      path="register"
                      element={<Register />}
                    />
                    <Route
                      path="sign-in"
                      element={<SignIn />}
                    />
                  </Route>
                  <Route
                    path="admin/*"
                    element={
                      <ProtectedRoute>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/"
                    element={
                      <Navigate
                        to="/admin"
                        replace
                      />
                    }
                  />
                  <Route
                    path="*"
                    element={<div>Page not found</div>}
                  />
                </Routes>
              </Suspense>
            </ThemeProvider>
          </MantineProvider>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
