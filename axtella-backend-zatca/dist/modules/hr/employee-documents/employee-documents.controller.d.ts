import { EmployeeDocumentsService } from './employee-documents.service';
export declare class EmployeeDocumentsController {
    private readonly service;
    constructor(service: EmployeeDocumentsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
