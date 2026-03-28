import { OpportunitiesService } from './opportunities.service';
export declare class OpportunitiesController {
    private readonly service;
    constructor(service: OpportunitiesService);
    findAll(): {
        module: string;
        items: any[];
    };
}
