import { Resource, ResourceType } from 'models/resource';

export default interface APIInterface {
  getAll(): Promise<Resource[]>;
  getOne(id: number): Promise<Resource | undefined>;
  create(resource: Resource[]): Promise<Resource | undefined>;
  delete(id: number): Promise<number>;
  getAllTypes(): Promise<ResourceType[]>;
  createTypeResource(
    resourceType: ResourceType
  ): Promise<ResourceType | undefined>;
}
