import { IonButton, IonContent, IonInput, IonPage } from "@ionic/react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/Header";
import { registerUser } from "../firestore";
import { IonToast } from "@ionic/react";
import { toast } from "../toast";

const Login: React.FC = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmation, setconfirmation] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, settoastMessage] = useState("");

  const history = useHistory();

  const register = async () => {
    if (password !== confirmation) {
      settoastMessage("Las contraseñas no coinciden");
      setShowToast(true);
    } else if (email.trim() === "") {
      settoastMessage("El campo email es requerido");
      setShowToast(true);
    } else if (password.trim() === "") {
      settoastMessage("El campo contraseña es requerido");
      setShowToast(true);
    } else {
      const resp = await registerUser(email, password);
      if (resp) {
        settoastMessage(resp);
        setShowToast(true);
        history.push("/login");
      }
    }
  };

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen className="ion-padding">
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
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
