import axios from 'axios';
import { HttpClient } from './http-client';

export class AxiosAdapter implements HttpClient {
  private http: any;
  constructor(
    private readonly baseUrl: string,
    private readonly token: string,
  ) {
    console.log('baseUrl', baseUrl);
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
    this.addInterceptorsRequest();
  }

  private base64Encode() {
    console.log('token', this.token);
    const clientId = this.token;
    const credentials = `${clientId}:`;
    return Buffer.from(credentials).toString('base64');
  }

  private addInterceptorsRequest() {
    this.http.interceptors.request.use((config: any) => {
      const token = this.base64Encode();
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      };
      return config;
    });
  }

  get(url: string, config?: any): Promise<any> {
    return this.http.get(url, config).then((response: any) => response.data);
  }
}
