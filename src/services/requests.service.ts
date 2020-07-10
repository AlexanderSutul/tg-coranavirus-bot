import axios from 'axios';

export class RequestsService {

  async get(url: string) {
    const response = await axios.get(url);
    return response.data;
  }

  async post(url: string, payload: any) {
    const response = await axios.post(url, payload);
    return response.data;
  }
}
