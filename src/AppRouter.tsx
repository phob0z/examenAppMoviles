import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./context/AuthProvider";
import Dashboard from "./pages/Dashboard";

import { SplashScreen } from "@capacitor/splash-screen";

setupIonicReact();

async function removeSplash() {
  await SplashScreen.hide({
    fadeOutDuration: 2,
  });
}

removeSplash();

setupIonicReact();

const AppRouter: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <AuthProvider>
          <PublicRoute>
            <Switch>
              <Route path="/home" exact>
                <Home />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/register" exact>
                <Register />
              </Route>
              <Route path="*">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </PublicRoute>
          <PrivateRoute>
            <Switch>
              <Route path="*">
                <Dashboard />
              </Route>
            </Switch>
          </PrivateRoute>
        </AuthProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default AppRouter;
