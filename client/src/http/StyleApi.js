import { privateApi, publicApi } from "./index";
import { SERVER_NOT_RESPONDING_MESSAGE } from "../consts";

class StyleApi {
  /* 
    Base requests
  */

  static async create({ styleName, styleContent, styleDescription }) {
    try {
      const res = await privateApi.post("/styles/create/", {
        style_name: styleName,
        style_content: styleContent,
        style_description: styleDescription,
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

  static async get({ styleId, styleName }) {
    const params = {};
    if (styleId) params.style_id = styleId;
    if (styleName) params.style_name = styleName;
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

  static async update({
    styleId,
    styleName,
    styleContent,
    styleDescription,
    styleIsPublic,
  }) {
    try {
      const res = await privateApi.put(
        "/styles/update/",
        {
          style_name: styleName,
          style_content: styleContent,
          style_description: styleDescription,
          style_is_public: styleIsPublic,
        },
        {
          params: { style_id: styleId },
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

  static async delete({ styleId }) {
    try {
      const res = await privateApi.delete("/styles/delete/", {
        params: { style_id: styleId },
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

  static async search({ page, limit, styleName }) {
    try {
      const res = await publicApi.get("/styles/search/", {
        params: { page, limit, style_name: styleName },
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

  static async copy({ styleId }) {
    try {
      const res = await privateApi.post("/styles/copy/", {
        params: { style_id: styleId },
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

export default StyleApi;
