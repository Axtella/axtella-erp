import { ActivitiesService } from './activities.service';
export declare class ActivitiesController {
    private readonly service;
    constructor(service: ActivitiesService);
    findAll(): {
        module: string;
        items: any[];
    };
}
