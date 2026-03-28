import { VatService } from './vat.service';
export declare class VatController {
    private readonly service;
    constructor(service: VatService);
    findAll(): {
        module: string;
        items: any[];
    };
}
