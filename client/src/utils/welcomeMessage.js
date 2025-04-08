import toast from "./toast";
import Storage from "./storageManagement";

const showWelcomeMessage = () => {
  const userLogin = Storage.read("userLogin");
  if (userLogin) {
    toast(`С возвращением, ${userLogin}`);
  } else {
    toast("Вы вошли как гость");
  }
};

export default showWelcomeMessage;
