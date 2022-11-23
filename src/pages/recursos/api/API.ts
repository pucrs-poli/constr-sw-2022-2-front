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

  public async create(resource: Resource[]): Promise<boolean | undefined> {
    try {
      await axios.post(BASE_URL, resource, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      return true;
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

  public async getAllTypes(): Promise<ResourceType[]> {
    try {
      const response = await axios.get(`${BASE_URL}/type`);
      const resourcesTypes: ResourceType[] = response.data.map((type: any) => {
        return {
          id: type.id,
          name: type.name,
        };
      });
      return resourcesTypes;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async createTypeResource(
    resourceType: ResourceType
  ): Promise<boolean | undefined> {
    try {
      await axios.post(`${BASE_URL}/type`, resourceType, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return true;
    } catch (error: any) {
      console.log(error);
      return undefined;
    }
  }
}
