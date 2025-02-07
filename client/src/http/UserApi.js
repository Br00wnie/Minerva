import { publicApi, privateApi } from "./index";
import { SERVER_NOT_RESPONDING_MESSAGE } from "../consts";

class UserApi {
  /* 
    Base requests
  */

  static async create({ userLogin: user_login, userPassword: user_password }) {
    try {
      const res = await publicApi.post("/users/create/", {
        user_login,
        user_password,
      });
      return {
        message: res.data.message,
        success: res.status >= 200 && res.status < 300,
      };
    } catch (error) {
      return {
        success: false,
        message: SERVER_NOT_RESPONDING_MESSAGE,
      };
    }
  }

  static async get() {
    try {
      const res = await privateApi.get("/users/get/");
      return {
        success: res.status >= 200 && res.status < 300,
        data: res.data.data,
        message: res.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: SERVER_NOT_RESPONDING_MESSAGE,
      };
    }
  }

  static async update({ userLogin: user_login, userPassword: user_password }) {
    try {
      const res = await privateApi.put("/users/update/", {
        user_login,
        user_password,
      });
      return {
        success: res.status >= 200 && res.status < 300,
        message: res.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: SERVER_NOT_RESPONDING_MESSAGE,
      };
    }
  }

  static async delete() {
    try {
      const res = await privateApi.delete("/users/delete/");
      return {
        success: res.status >= 200 && res.status < 300,
      };
    } catch (error) {
      return {
        success: false,
        message: SERVER_NOT_RESPONDING_MESSAGE,
      };
    }
  }

  /* 
    Entity-specific requests
  */

  static async login({ userLogin: user_login, userPassword: user_password }) {
    try {
      const res = await privateApi.post("/users/login/", {
        user_login,
        user_password,
      });
      const responseCookies = res.headers["set-cookie"];
      const tokenCookie = responseCookies.find((c) => c.startsWith("token="));
      const tokenValue = tokenCookie.split(";")[0].split("=")[1];
      document.cookie = `token=${tokenValue}; ${tokenCookie
        .split(";")
        .slice(1)
        .join(";")}`;
      return {
        success: res.status >= 200 && res.status < 300,
        message: res.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: SERVER_NOT_RESPONDING_MESSAGE,
      };
    }
  }
}

export default UserApi;
