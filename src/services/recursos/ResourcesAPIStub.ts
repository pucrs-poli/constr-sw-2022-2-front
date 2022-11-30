import { Resource, ResourceType } from 'models/resource';
import ResourcesAPIInterface from './ResourcesAPIInterface';

export default class ResourcesAPIStub implements ResourcesAPIInterface {
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
      description: 'Recurso 2',
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
      description: 'Recurso 3',
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
    return ResourcesAPIStub.exampleResources;
  }

  public async getOne(id: number): Promise<Resource | undefined> {
    return ResourcesAPIStub.exampleResources.find(
      (resource) => resource.id === id
    );
  }

  public async create(resource: Resource[]): Promise<boolean | undefined> {
    for (const rec of resource) {
      rec.id = ResourcesAPIStub.exampleResources.length + 1;
      ResourcesAPIStub.exampleResources.push(rec);
    }
    return true;
  }

  public async delete(id: number): Promise<number> {
    ResourcesAPIStub.exampleResources =
      ResourcesAPIStub.exampleResources.filter(
        (resource) => resource.id !== id
      );
    return id;
  }

  public async getAllTypes(): Promise<ResourceType[]> {
    return ResourcesAPIStub.exampleResourcesTypes;
  }

  public async createTypeResource(
    resourceType: ResourceType
  ): Promise<boolean | undefined> {
    resourceType.id = ResourcesAPIStub.exampleResourcesTypes.length + 1;
    ResourcesAPIStub.exampleResourcesTypes.push(resourceType);
    return true;
  }
}
