import { publicApi, privateApi } from "./index";
import { SERVER_NOT_RESPONDING_MESSAGE } from "../consts";

class UserApi {
  /* 
    Base requests
  */

  static async create({ userLogin, userPassword }) {
    try {
      const res = await publicApi.post("/users/create/", {
        user_login: userLogin,
        user_password: userPassword,
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

  static async update({ userLogin, userPassword }) {
    try {
      const res = await privateApi.put("/users/update/", {
        user_login: userLogin,
        user_password: userPassword,
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
        message: res.data.message,
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

  static async logIn({ userLogin, userPassword }) {
    try {
      const res = await privateApi.post("/users/login/", {
        user_login: userLogin,
        user_password: userPassword,
      });
      return {
        success: res.status >= 200 && res.status < 300,
        data: res.headers,
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
