import { Reserva } from 'models/reserva';

export default interface ReservaApinterface {
  getAll(): Promise<Reserva[]>;
  getOne(id: number): Promise<Reserva | undefined>;
  create(reserva: any): Promise<boolean | undefined>;
  update(reserva: any): Promise<Reserva | undefined>;
  delete(id: number): Promise<number>;

}
