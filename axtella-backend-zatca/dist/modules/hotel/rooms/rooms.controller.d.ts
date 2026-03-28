import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private readonly service;
    constructor(service: RoomsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
