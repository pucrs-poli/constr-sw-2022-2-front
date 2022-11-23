import { Resource } from 'models/resource';
import APIInterface from './APIInterface';

export default class API implements APIInterface {
  constructor() {}

  public async getAll(): Promise<Resource[]> {
    return [];
  }

  public async getOne(id: number): Promise<Resource | null> {
    return null;
  }

  public async create(resource: Resource): Promise<Resource> {
    return resource;
  }

  public async delete(id: number): Promise<number> {
    return id;
  }
}
