import { ReservationsService } from './reservations.service';
export declare class ReservationsController {
    private readonly service;
    constructor(service: ReservationsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
