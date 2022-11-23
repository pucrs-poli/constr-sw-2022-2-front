
export type Resource = {
    id: string;
    name: string;
}

export type ResourceReference = Pick<Resource, 'id'>;
