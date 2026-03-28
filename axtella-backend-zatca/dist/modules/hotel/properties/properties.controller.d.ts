import { PropertiesService } from './properties.service';
export declare class PropertiesController {
    private readonly service;
    constructor(service: PropertiesService);
    findAll(): {
        module: string;
        items: any[];
    };
}
