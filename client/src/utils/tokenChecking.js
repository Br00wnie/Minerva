import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const checkToken = () => {
  const codedToken = Cookies.get("token");
  if (!codedToken) return false;
  try {
    const decodedToken = jwtDecode(codedToken);
    if (decodedToken.exp < Date.now() / 1000) return false;
    return true;
  } catch (error) {
    return false;
  }
};

export default checkToken;
