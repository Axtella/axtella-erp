import { RoomTypesService } from './room-types.service';
export declare class RoomTypesController {
    private readonly service;
    constructor(service: RoomTypesService);
    findAll(): {
        module: string;
        items: any[];
    };
}
