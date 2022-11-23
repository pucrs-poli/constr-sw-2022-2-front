import { Resource, ResourceType } from 'models/resource';
import axios from "axios";
import APIInterface from './APIInterface';

const BASE_URL: string = 'http://localhost:8082/resources';
export default class API implements APIInterface {
  constructor() { }

  public async getAll(): Promise<Resource[]> {
    const response = await axios.get(`${BASE_URL}`);
    const resources: Resource[] = response.data.map((resource: any) => {
      return {
        id: resource.id,
        description: resource.description,
        status: resource.status,
        resourceType: resource.resourceType,
        details: resource.details
      };
    });
    return resources;
  }

  public async getOne(id: number): Promise<Resource | null> {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data as Resource;
  }

  public async create(resource: Resource[]): Promise<Resource | undefined> {
    try {
      const response = await axios.post(
        BASE_URL,
        resource,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000"
          },
        }
      );
      return resource[0];
      
    } catch (error: any) {
      console.log(error)
    }
  }

  public async delete(id: number): Promise<number> {
    const response = await axios.delete(`${BASE_URL}/${id}`);

    return id;
  }

  public async createTypeResource(resourceType: ResourceType): Promise<ResourceType | undefined> {
    try {
      const response = await axios.post(
        `${BASE_URL}/type`,
        resourceType,
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      );
      return resourceType;
      
    } catch (error: any) {
      console.log(error)
    }
  }
}
