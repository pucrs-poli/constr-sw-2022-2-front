import { Resource, ResourceType } from 'models/resource';
import APIInterface from './APIInterface';

export default class APIStub implements APIInterface {
  constructor() {}

  private static exampleResources: Resource[] = [
    {
      id: 1,
      description: 'Recurso 1',
      status: 'Disponible',
      resourceType: {
        id: 1,
        name: 'Tipo 1',
      },
      details: [
        {
          id: 1,
          name: 'Detail 1',
        },
      ],
    },
  ];

  private static exampleResourcesTypes: ResourceType[] = [
    {
      id: 1,
      name: 'Tipo 1',
    },
  ];

  public async getAll(): Promise<Resource[]> {
    return APIStub.exampleResources;
  }

  public async getOne(id: number): Promise<Resource | undefined> {
    return APIStub.exampleResources.find((resource) => resource.id === id);
  }

  public async create(resource: Resource[]): Promise<Resource | undefined> {
    APIStub.exampleResources.push(resource[0]);
    return resource[0];
  }

  public async delete(id: number): Promise<number> {
    APIStub.exampleResources = APIStub.exampleResources.filter(
      (resource) => resource.id !== id
    );
    return id;
  }

  public async createTypeResource(
    resourceType: ResourceType
  ): Promise<ResourceType | undefined> {
    APIStub.exampleResourcesTypes.push(resourceType);
    return resourceType;
  }
}
