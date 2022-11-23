import { Resource, ResourceType } from 'models/resource';
import axios from 'axios';
import APIInterface from './APIInterface';

const BASE_URL: string = 'http://localhost:8082/resources';

export default class API implements APIInterface {
  constructor() {}

  public async getAll(): Promise<Resource[]> {
    try {
      const response = await axios.get(`${BASE_URL}`);
      const resources: Resource[] = response.data.map((resource: any) => {
        return {
          id: resource.id,
          description: resource.description,
          status: resource.status,
          resourceType: resource.resourceType,
          details: resource.details,
        };
      });
      return resources;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getOne(id: number): Promise<Resource | undefined> {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data as Resource;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public async create(resource: Resource[]): Promise<Resource | undefined> {
    try {
      await axios.post(BASE_URL, resource, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      return resource[0];
    } catch (error: any) {
      console.log(error);
    }
  }

  public async delete(id: number): Promise<number> {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (error) {
      console.error(error);
      return -1;
    }
  }

  public async createTypeResource(
    resourceType: ResourceType
  ): Promise<ResourceType | undefined> {
    try {
      await axios.post(`${BASE_URL}/type`, resourceType, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return resourceType;
    } catch (error: any) {
      console.log(error);
      return undefined;
    }
  }
}
