export type Endereco = {
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
};

export type Sala = {
  _id: string;
  number: number;
  capacity: number;
  floor: number;
  resource: string;
  building: string;
};

export type Predio = {
  _id: string;
  name: string;
  number: number;
  address: Endereco;
  classrooms: Sala[];
};
