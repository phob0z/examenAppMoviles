import { IonButton, IonContent, IonInput, IonPage } from "@ionic/react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthProvider";
import Header from "../components/Header";

const Login: React.FC = () => {
  const { loginUser } = useAuth();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen className="ion-padding">
        <div className="ion-text-center">
          <IonInput
            type="email"
            maxlength={30}
            placeholder="Correo"
            value={email}
            onIonChange={(event: any) => {
              setemail(event.currentTarget.value);
            }}
          />
          <IonInput
            type="password"
            maxlength={30}
            placeholder="Contraseña"
            value={password}
            onIonChange={(event: any) => {
              setpassword(event.currentTarget.value);
            }}
          />
          <IonButton
            onClick={() => {
              loginUser(email, password);
            }}
          >
            Login
          </IonButton>
          <IonButton color="danger" routerLink="/home">
            Volver
          </IonButton>
          <p>
            Crear una cuenta <Link to="/register">Registrarse</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
