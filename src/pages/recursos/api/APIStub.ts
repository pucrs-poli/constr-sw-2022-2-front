import { Resource } from 'models/resource';
import APIInterface from './APIInterface';

export default class APIStub implements APIInterface {
  constructor() {}

  public async getAll(): Promise<Resource[]> {
    return [
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
  }

  public async getOne(id: number): Promise<Resource | null> {
    return {
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
    };
  }
}
