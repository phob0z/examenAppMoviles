import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApaMEiBKnHIDD4YdYVESR1klc26jyqNlI",
  authDomain: "examenmoviles-7043b.firebaseapp.com",
  projectId: "examenmoviles-7043b",
  storageBucket: "examenmoviles-7043b.appspot.com",
  messagingSenderId: "22787390286",
  appId: "1:22787390286:web:8401a9fbf2b6f476eebc1f",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function registerUser(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return "Creado correctamente, inicie sesión";
  } catch (error: any) {
    return error.message;
  }
}

export async function createProduct(name: string, price: number) {
  try {
    const collectionRef = collection(db, "products");
    await addDoc(collectionRef, { name, price });
    return "El producto fue agregado correctamente";
  } catch (error: any) {
    return error.message;
  }
}

export async function deleteProduct(id: string) {
  try {
    await deleteDoc(doc(db, "products", id));
    return "El producto fue eliminado correctamente";
  } catch (error: any) {
    return error.message;
  }
}

export async function updateProduct(id: string, name: string, price: number) {
  try {
    await setDoc(doc(db, "products", id), {
      name: name,
      price: price,
    });
    return "El producto fue actualizado correctamente";
  } catch (error: any) {
    return error.message;
  }
}

export async function getProducts() {
  const products: { [x: string]: any }[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      const product = { ...doc.data() };
      product.docId = doc.id;
      products.push(product);
    });
    return products;
  } catch (error: any) {
    console.log(error.message, 4000);
  }
}
