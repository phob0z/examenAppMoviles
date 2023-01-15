import { IonButton, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { useState } from "react";
import { createProduct } from "../firestore";
import { toast } from "../toast";

type Props = {
  onChange: Function,
}

const NewProduct: React.FC<Props> = ({onChange}) => {
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const onAddHandler = async () => {
    if (name.trim() === "") {
      return toast("Debe asignar un nombre");
    }
    if (price <= 0) {
      return toast("El precio debe ser mayor a cero");
    }
    if (await createProduct(name, price)) {
      onChange();
    }
  };

  return (
    <IonRow>
      <IonItem>
        <IonLabel>Nombre</IonLabel>
        <IonInput
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
  );
};

export default NewProduct;
