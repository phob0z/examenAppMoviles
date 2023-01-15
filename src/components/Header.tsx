import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAuth } from "../context/AuthProvider";

import { exitOutline } from "ionicons/icons";

const Header: React.FC = () => {
  const { logged, logout } = useAuth();
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle slot="start">Examen</IonTitle>
        {logged && (
          <IonButtons slot="end">
            <IonButton
              fill="solid"
              onClick={() => {
                logout();
              }}
              color="danger"
            >
              <IonIcon slot="start" icon={exitOutline}></IonIcon>
              Salir
            </IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};
export default Header;
