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
        <div className="ion-text-center">
          <h1>Bienvenido al sistema de registro de productos</h1>
          <IonButton routerLink="/login" color="primary">
            Login
          </IonButton>
          <IonButton routerLink="/register" color="secondary">
            Registrarse
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
