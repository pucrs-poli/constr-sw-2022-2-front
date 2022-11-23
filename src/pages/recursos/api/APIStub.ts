import { Resource } from 'models/resource';
import APIInterface from './APIInterface';

export default class APIStub implements APIInterface {
  constructor() {}

  public async getAll(): Promise<Resource[]> {
    return [
      {
        name: 'Recurso 1',
      },
      {
        name: 'Recurso 2',
      },
      {
        name: 'Recurso 3',
      },
    ];
  }

  public async getOne(id: number): Promise<Resource | null> {
    return {
      name: 'Recurso 1',
    };
  }
}
