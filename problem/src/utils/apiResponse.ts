import { ApiResponseType } from "../types/apiResponseType.js";

export default class ApiResponse implements ApiResponseType {
  status: number;
  message: string;
  success: boolean;
  data: any;

  constructor(status: number, message?: string, success?: boolean, data?: any) {
    this.status = status;
    this.message = message || "Success";
    this.success = success !== undefined ? success : true;
    this.data = data || null;
  }
}
