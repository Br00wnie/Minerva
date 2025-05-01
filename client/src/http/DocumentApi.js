import { privateApi } from "@http/index";
import { SERVER_NOT_RESPONDING_MESSAGE } from "@src/consts";

class DocumentApi {
  /* 
    Base requests
  */

  static async create({ documentName, documentContent }) {
    try {
      const res = await privateApi.post("/documents/create/", {
        document_name: documentName,
        document_content: documentContent,
      });
      return {
        success: res.status >= 200 && res.status < 300,
        message: res.data.message,
      };
    } catch {
      return {
        success: false,
        message: SERVER_NOT_RESPONDING_MESSAGE,
      };
    }
  }

  static async get({ documentId, documentName }) {
    const params = {};
    if (documentId) params.document_id = documentId;
    if (documentName) params.document_name = documentName;
    try {
      const res = await privateApi.get("/documents/get/", {
        params,
      });
      return {
        success: res.status >= 200 && res.status < 300,
        data: res.data.data,
        message: res.data.message,
      };
    } catch {
      return {
        success: false,
        message: SERVER_NOT_RESPONDING_MESSAGE,
      };
    }
  }

  static async update({ documentId, documentName, documentContent }) {
    try {
      const res = await privateApi.put(
        "/documents/update/",
        { document_name: documentName, document_content: documentContent },
        {
          params: { document_id: documentId },
        }
      );
      return {
        success: res.status >= 200 && res.status < 300,
        message: res.data.message,
      };
    } catch {
      return {
        success: false,
        message: SERVER_NOT_RESPONDING_MESSAGE,
      };
    }
  }

  static async delete({ documentId }) {
    try {
      const res = await privateApi.delete("/documents/delete/", {
        params: { document_id: documentId },
      });
      return {
        success: res.status >= 200 && res.status < 300,
        message: res.data.message,
      };
    } catch {
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
    } catch {
      return {
        success: false,
        message: SERVER_NOT_RESPONDING_MESSAGE,
      };
    }
  }
}

export default DocumentApi;
