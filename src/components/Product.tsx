import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonToast,
} from "@ionic/react";
import { Fragment, useState } from "react";
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

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, settoastMessage] = useState("");

  const onAddHandler = async () => {
    if (buttonTitle === "Editar") {
      setremove(true);
      setbuttonTitle("Guardar");
      setcolor("success");
      setdisabled(false);
    } else {
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
          setremove(false);
          setbuttonTitle("Editar");
          setcolor("primary");
          setdisabled(true);
          const resp = await updateProduct(props.id, name, price);
          if (resp) {
            settoastMessage(resp);
            setShowToast(true);
          }
          props.onChange();
        }
      }
    }
  };

  const onRemoveHandler = async () => {
    const resp = await deleteProduct(props.id);
    if (resp) {
      settoastMessage(resp);
      setShowToast(true);
    }
    props.onChange();
  };

  return (
    <Fragment>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
      />
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
    </Fragment>
  );
};

export default Product;
