import { Resource, ResourceType } from 'models/resource';
import ResourcesAPIInterface from './ResourcesAPIInterface';

export default class ResourcesService {
  constructor(private api: ResourcesAPIInterface) {}

  public async getAll(): Promise<Resource[]> {
    return await this.api.getAll();
  }

  public async getOne(id: number): Promise<Resource | undefined> {
    return await this.api.getOne(id);
  }

  public async create(resource: Resource[]): Promise<boolean | undefined> {
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
  ): Promise<boolean | undefined> {
    return await this.api.createTypeResource(resourceType);
  }

  public async update(resource: Resource): Promise<number | undefined> {
    return await this.api.update(resource);
  }
}
