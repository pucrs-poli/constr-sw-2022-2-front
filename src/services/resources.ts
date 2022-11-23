import { Resource, ResourceType } from 'models/resource';
import APIInterface from 'pages/recursos/api/APIInterface';

export default class ResourcesService {
  constructor(private api: APIInterface) {}

  public async getAll(): Promise<Resource[]> {
    return await this.api.getAll();
  }

  public async getOne(id: number): Promise<Resource | undefined> {
    return await this.api.getOne(id);
  }

  public async create(resource: Resource[]): Promise<Resource | undefined> {
    return await this.api.create(resource);
  }

  public async delete(id: number): Promise<number> {
    return await this.api.delete(id);
  }

  public async getAllTypes(): Promise<ResourceType[]> {
    return await this.api.getAllTypes();
  }

  public async createTypeResource(
    resourceType: ResourceType
  ): Promise<ResourceType | undefined> {
    return await this.api.createTypeResource(resourceType);
  }
}
