import {
  IonButton,
  IonContent,
  IonPage,
} from "@ionic/react";
import Header from "../components/Header";

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen className="ion-padding">
        <IonButton routerLink="/login" color="primary">
          Login
        </IonButton>
        <IonButton routerLink="/register" color="secondary">
          Registrarse
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
