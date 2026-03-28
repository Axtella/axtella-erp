import { FixedAssetsService } from './fixed-assets.service';
export declare class FixedAssetsController {
    private readonly service;
    constructor(service: FixedAssetsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
