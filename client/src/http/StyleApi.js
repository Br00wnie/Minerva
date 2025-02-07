import { privateApi, publicApi } from "./index";
import { SERVER_NOT_RESPONDING_MESSAGE } from "../consts";

class StyleApi {
  /* 
    Base requests
  */

  static async create({ style }) {
    try {
      const res = await privateApi.post("/styles/create/", {
        ...style,
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

  static async get({ styleId: style_id, styleName: style_name }) {
    const params = {};
    if (style_id) params.style_id = style_id;
    if (style_name) params.style_name = style_name;
    try {
      const res = await privateApi.get("/styles/get/", {
        params,
      });
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

  static async update({ styleId: style_id, style }) {
    try {
      const res = await privateApi.put(
        "/styles/update/",
        { ...style },
        {
          params: { style_id },
        }
      );
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

  static async delete({ styleId: style_id }) {
    try {
      const res = await privateApi.delete("/styles/delete/", {
        params: { style_id },
      });
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

  static async list({ page, limit }) {
    try {
      const res = await privateApi.get("/styles/list/", {
        params: { page, limit },
      });
      return {
        success: res.status >= 200 && res.status < 300,
        data: res.data.data,
        total: res.data.total,
        message: res.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: SERVER_NOT_RESPONDING_MESSAGE,
      };
    }
  }

  static async search({ page, limit, styleName: style_name }) {
    try {
      const res = await publicApi.get("/styles/search/", {
        params: { page, limit, style_name },
      });
      return {
        success: res.status >= 200 && res.status < 300,
        data: res.data.data,
        total: res.data.total,
        message: res.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: SERVER_NOT_RESPONDING_MESSAGE,
      };
    }
  }

  static async copy({ styleId: style_id }) {
    try {
      const res = await privateApi.post("/styles/copy/", {
        params: { style_id },
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
}

export default new DocumentApi();
