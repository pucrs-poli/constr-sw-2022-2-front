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
    {
      id: 2,
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
    {
      id: 3,
      description: 'Recurso 1',
      status: 'Disponible',
      resourceType: {
        id: 2,
        name: 'Tipo 2',
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
    {
      id: 2,
      name: 'Tipo 2',
    },
  ];

  public async getAll(): Promise<Resource[]> {
    return APIStub.exampleResources;
  }

  public async getOne(id: number): Promise<Resource | undefined> {
    return APIStub.exampleResources.find((resource) => resource.id === id);
  }

  public async create(resource: Resource[]): Promise<boolean | undefined> {
    for (const rec of resource) {
      rec.id = APIStub.exampleResources.length + 1;
      APIStub.exampleResources.push(rec);
    }
    return true;
  }

  public async delete(id: number): Promise<number> {
    APIStub.exampleResources = APIStub.exampleResources.filter(
      (resource) => resource.id !== id
    );
    return id;
  }

  public async getAllTypes(): Promise<ResourceType[]> {
    return APIStub.exampleResourcesTypes;
  }

  public async createTypeResource(
    resourceType: ResourceType
  ): Promise<boolean | undefined> {
    resourceType.id = APIStub.exampleResourcesTypes.length + 1;
    APIStub.exampleResourcesTypes.push(resourceType);
    return true;
  }
}
