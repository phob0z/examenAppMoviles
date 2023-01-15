import { toastController } from "@ionic/core";

export async function toast(message: string, time = 2000) {
  const toast = await toastController.create({
    message: message,
    duration: time,
    position: "middle",
  });
  toast.present();
}
