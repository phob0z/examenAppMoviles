import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
} from "@ionic/react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/Header";
import { registerUser } from "../firestore";
import { toast } from "../toast";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmation, setconfirmation] = useState("");
  const history = useHistory();

  const register = async () => {
    if (password !== confirmation) {
      return toast("Las contraseñas no coinciden");
    }
    if (email.trim() === "") {
      return toast("El campo email es requerido");
    }
    if (password.trim() === "") {
      return toast("El campo contraseña es requerido");
    }
    if (await registerUser(email, password)) history.push("/login");
  };

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen className="ion-padding">
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
        <IonInput
          type="password"
          maxlength={30}
          placeholder="Confirmar Contraseña"
          value={confirmation}
          onIonChange={(event: any) => {
            setconfirmation(event.currentTarget.value);
          }}
        />
        <IonButton onClick={register}>Registrarse</IonButton>
        <IonButton color="danger" routerLink="/home">
          Volver
        </IonButton>
        <p>
          Ya tengo una cuenta <Link to="/login">Login</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
