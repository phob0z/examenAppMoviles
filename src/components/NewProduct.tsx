import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonToast,
} from "@ionic/react";
import { Fragment, useState } from "react";
import { createProduct } from "../firestore";

type Props = {
  onChange: Function;
};

const NewProduct: React.FC<Props> = ({ onChange }) => {
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, settoastMessage] = useState("");

  const onAddHandler = async () => {
    if (name.trim() === "") {
      settoastMessage("Debe asignar un nombre");
      setShowToast(true);
    } else {
      setprice((prevState) => {
        return +prevState;
      });
      if (price <= 0) {
        settoastMessage("El precio debe ser mayor a 0");
        setShowToast(true);
      } else if (price > 999999) {
        settoastMessage("El precio debe ser menor a 999999");
        setShowToast(true);
      } else {
        const resp = await createProduct(name, +price)
        settoastMessage(resp);
        setShowToast(true);
        setname("");
        setprice(0);
        onChange();
      }
    }
  };

  return (
    <Fragment>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        position="middle"
      />
      <IonRow>
        <IonItem>
          <IonLabel>Nombre</IonLabel>
          <IonInput
            maxlength={20}
            placeholder="Nombre"
            type="text"
            value={name}
            onIonChange={(event: any) => {
              setname(event.currentTarget.value);
            }}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Precio</IonLabel>
          <IonInput
            max={999999}
            maxlength={6}
            step="1"
            placeholder="Precio"
            type="number"
            value={price}
            onIonChange={(event: any) => {
              setprice(event.currentTarget.value);
            }}
          />
        </IonItem>
        <IonButton onClick={onAddHandler} color="primary">
          Agregar
        </IonButton>
      </IonRow>
    </Fragment>
  );
};

export default NewProduct;
