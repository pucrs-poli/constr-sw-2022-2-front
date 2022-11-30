import { Reserva } from 'models/reserva';
import ResourcesAPIInterface from './ReservaApiInterface';

export default class ResourcesService {
  constructor(private api: ResourcesAPIInterface) {}

  public async getAll(): Promise<Reserva[]> {
    return await this.api.getAll();
  }

  public async getOne(id: number): Promise<Reserva | undefined> {
    return await this.api.getOne(id);
  }

  public async create(resource: any): Promise<boolean | undefined> {
    return await this.api.create(resource);
  }

  public async update(resource: any): Promise<Reserva | undefined> {
    return await this.api.update(resource);
  }

  public async delete(id: number): Promise<number> {
    return await this.api.delete(id);
  }

}
