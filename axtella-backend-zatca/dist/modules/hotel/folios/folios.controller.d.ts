import { FoliosService } from './folios.service';
export declare class FoliosController {
    private readonly service;
    constructor(service: FoliosService);
    findAll(): {
        module: string;
        items: any[];
    };
}
