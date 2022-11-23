import { Resource } from 'models/resource';

export default interface APIInterface {
  getAll(): Promise<Resource[]>;
  getOne(id: number): Promise<Resource | null>;
}