import { HotelCoreService } from './hotel-core.service';
export declare class HotelCoreController {
    private readonly service;
    constructor(service: HotelCoreService);
    getStatus(): import("../scaffold-status.type").ScaffoldStatus;
}
