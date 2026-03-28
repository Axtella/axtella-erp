import { EmployeesService } from './employees.service';
export declare class EmployeesController {
    private readonly service;
    constructor(service: EmployeesService);
    findAll(): {
        module: string;
        items: any[];
    };
}
