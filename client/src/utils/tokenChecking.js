import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const checkToken = () => {
  const codedToken = Cookies.get("token");
  if (!codedToken) return false;
  try {
    const decodedToken = jwtDecode(codedToken);
    const user_id = decodedToken.user_id;
    if (isNaN(user_id)) return false;
    if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) return false;
    return true;
  } catch (error) {
    return false;
  }
};
