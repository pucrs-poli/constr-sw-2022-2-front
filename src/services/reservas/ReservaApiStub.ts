import { Reserva } from 'models/reserva';
import ReservaApiInterface from './ReservaApiInterface';

export default class ReservaApiStub implements ReservaApiInterface {
  constructor() {}

  private static exemploReservas: Reserva[] = [
    {
        id: 1,
        observation: 'Alocação recurso 1',
        class: 1,
        resource: {
          description: 'Recurso 1',
          id: 1,
        },
        data: '20/02/2023',
        active: true,
      },
      {
        id: 2,
        observation: 'é os guris nao tem jeito',
        class: 2,
        resource: {
          description: 'Recurso 2',
          id: 2,
        },
        data: '20/02/2023',
        active: true,
      },
      {
        id: 3,
        observation: 'bom dia a todos',
        class: 3,
        resource: {
          description: 'Recurso 3',
          id: 3,
        },
        data: '20/02/2023',
        active: true,
      },
  ];


  public async getAll(): Promise<Reserva[]> {
    return ReservaApiStub.exemploReservas;
  }

  public async getOne(id: number): Promise<Reserva| undefined> {
    return ReservaApiStub.exemploReservas.find(
      (resource) => resource.id === id
    );
  }

  public async update(body: any): Promise<Reserva| undefined> {
    ReservaApiStub.exemploReservas.forEach((element:any) => {
        if(element.id === body.id){
            element = body;
        }
        return element;
    });
    return ReservaApiStub.exemploReservas.find(
      (resource) => resource.id === body.id
    );
  }

  public async create(resource: Reserva[]): Promise<boolean | undefined> {
    for (const rec of resource) {
      rec.id = ReservaApiStub.exemploReservas.length + 1;
      ReservaApiStub.exemploReservas.push(rec);
    }
    return true;
  }

  public async delete(id: number): Promise<number> {
    ReservaApiStub.exemploReservas =
      ReservaApiStub.exemploReservas.filter(
        (resource) => resource.id !== id
      );
    return id;
  }

}
