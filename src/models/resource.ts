export type Detail = {
  id: number;
  name: string;
};

export type ResourceType = {
  id: number;
  name: string;
};

export type Resource = {
  id: number;
  description: string;
  status: string;
  resourceType: ResourceType;
  details: Detail[];
};
