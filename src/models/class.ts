import { Reservation } from "./reservation";
import { Resource, ResourceReference } from "./resource";

export type Class = {
    id: string;
    room?: {
        id: string;
        numRoom?: number;
    },
    group: {
        id: string;
        numGroup?: number;
        subject?: {
            id: string;
            name?: string;
        }
    },
    reservations: Reservation[];
    date: Date;
    content: string;   
    call: ClassCall[];
}

export type CreateClass = Omit<Class, 'reservations'|'call'> & {
    roomId: string
    groupId: string
    resourcesReservations: ResourceReference[];
};




export type ClassCall = {
    call?: Call;
    studentId: number;
    present: boolean;
}

export type Call = {
    studentName: string;
}
