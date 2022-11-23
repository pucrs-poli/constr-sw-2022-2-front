import { Resource } from 'models/resource';
import APIInterface from 'pages/recursos/api/APIInterface';

export default class ResourcesService {
  constructor(private api: APIInterface) {}

  public async getAll(): Promise<Resource[]> {
    return await this.api.getAll();
  }

  public async getOne(id: number): Promise<Resource | null> {
    return await this.api.getOne(id);
  }
}
