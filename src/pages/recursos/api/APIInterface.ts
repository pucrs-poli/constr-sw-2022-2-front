import { Resource, ResourceType } from 'models/resource';

export default interface APIInterface {
  getAll(): Promise<Resource[]>;
  getOne(id: number): Promise<Resource | null>;
  create(resource: Resource[]): Promise<Resource | undefined>;
  delete(id: number): Promise<number>;
  createTypeResource(resourceType: ResourceType): Promise<ResourceType | undefined>;
}
