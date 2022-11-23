import { Reservation } from "./reservation";
import { Resource, ResourceReference } from "./resource";

export type Class = {
    id: number;
    room?: {
        id: number;
        numRoom?: number;
    },
    group: {
        id: number;
        numGroup?: number;
        subject?: {
            id: number;
            name?: string;
        }
    },
    reservations: Reservation[];
    date: Date;
    content: string;
    call: ClassCall[];
}

export type CreateClass = Omit<Class, 'reservations'> & {
    resources: ResourceReference[];
};

export type ClassCall = {
    call?: Call;
    studentId: number;
    present: boolean;
}

export type Call = {
    studentName: string;
}
