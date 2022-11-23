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

  public async create(resource: Resource): Promise<Resource> {
    return await this.api.create(resource);
  }

  public async delete(id: number): Promise<number> {
    return await this.api.delete(id);
  }
}
