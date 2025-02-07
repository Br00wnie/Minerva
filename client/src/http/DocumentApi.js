import { privateApi } from "./index";
import { SERVER_NOT_RESPONDING_MESSAGE } from "../consts";

class DocumentApi {
  /* 
    Base requests
  */

  static async create({ document }) {
    try {
      const res = await privateApi.post("/documents/create/", {
        ...document,
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

  static async get({ documentId: document_id, documentName: document_name }) {
    const params = {};
    if (document_id) params.document_id = document_id;
    if (document_name) params.document_name = document_name;
    try {
      const res = await privateApi.get("/documents/get/", {
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

  static async update({ documentId: document_id, document }) {
    try {
      const res = await privateApi.put(
        "/documents/update/",
        { ...document },
        {
          params: { document_id },
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

  static async delete({ documentId: document_id }) {
    try {
      const res = await privateApi.delete("/documents/delete/", {
        params: { document_id },
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
      const res = await privateApi.get("/documents/list/", {
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
}

export default new DocumentApi();
