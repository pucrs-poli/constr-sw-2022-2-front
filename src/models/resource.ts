
export type Resource = {
    id: number;
    name: string;
}

export type ResourceReference = Pick<Resource, 'id'>;
