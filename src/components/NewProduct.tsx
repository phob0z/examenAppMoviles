import { IonButton, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { useState } from "react";
import { createProduct } from "../firestore";
import { toast } from "../toast";

type Props = {
  onChange: Function;
};

const NewProduct: React.FC<Props> = ({ onChange }) => {
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const onAddHandler = async () => {
    if (name.trim() === "") {
      return toast("Debe asignar un nombre");
    }
    setprice((prevState)=>{ return +prevState})
    if (price <= 0) {
      return toast("El precio debe ser mayor a 0");
    }
    if (price > 999999) {
      return toast("El precio debe ser menor a 999999");
    }
    if (await createProduct(name, +price)) {
      setname("");
      setprice(0);
      onChange();
    }
  };

  return (
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
  );
};

export default NewProduct;
