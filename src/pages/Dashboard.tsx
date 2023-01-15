import { IonContent, IonPage } from "@ionic/react";
import "./Dashboard.css";

import Header from "../components/Header";
import NewProduct from "../components/NewProduct";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import { getProducts } from "../firestore";

const Dashboard: React.FC = () => {
  const [products, setproducts] = useState<any>([]);

  async function fetchData() {
    setproducts(await getProducts());
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen className="ion-padding">
        <h1>Nuevo producto</h1>
        <NewProduct onChange={() => {fetchData()}} />
        <h1>Lista de productos</h1>
        {products.map((product: any) => {
          return (
            <Product onChange={() => {fetchData()}}
              key={product.docId}
              name={product.name}
              price={product.price}
              id={product.docId}
            />
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
