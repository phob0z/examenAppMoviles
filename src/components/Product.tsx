import { IonButton, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { useState } from "react";
import { deleteProduct, updateProduct } from "../firestore";

type Props = {
  name: string;
  price: number;
  id: string;
  onChange: Function;
};

const Product: React.FC<Props> = (props) => {
  const [buttonTitle, setbuttonTitle] = useState("Editar");
  const [name, setname] = useState(props.name);
  const [price, setprice] = useState(props.price);
  const [disabled, setdisabled] = useState(true);
  const [remove, setremove] = useState(false);
  const [color, setcolor] = useState("primary");
  const onAddHandler = async () => {
    if (buttonTitle === "Editar") {
      setremove(true);
      setbuttonTitle("Guardar");
      setcolor("success");
      setdisabled(false);
    } else {
      setremove(false);
      setbuttonTitle("Editar");
      setcolor("primary");
      setdisabled(true);
      updateProduct(props.id, name, price);
      props.onChange();
    }
  };

  const onRemoveHandler = async () => {
    deleteProduct(props.id);
    props.onChange();
  };

  return (
    <IonRow>
      <IonItem>
        <IonLabel>Nombre</IonLabel>
        <IonInput
          disabled={disabled}
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
          disabled={disabled}
          placeholder="Precio"
          type="number"
          value={price}
          onIonChange={(event: any) => {
            setprice(event.currentTarget.value);
          }}
        />
      </IonItem>
      <IonButton onClick={onAddHandler} color={color}>
        {buttonTitle}
      </IonButton>
      {remove && (
        <IonButton onClick={onRemoveHandler} color="danger">
          Eliminar
        </IonButton>
      )}
    </IonRow>
  );
};

export default Product;
