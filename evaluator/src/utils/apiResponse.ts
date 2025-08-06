export class ApiResponse {
  private status: number;
  private message: string;
  private data: any;
  private error: any;

  constructor(status: number, message: string, data: any, error: any) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  public toJSON() {
    return {
      status: this.status,
      message: this.message,
      data: this.data,
      error: this.error,
    };
  }
}
