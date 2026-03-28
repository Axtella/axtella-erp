import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly service;
    constructor(service: TasksService);
    findAll(): {
        module: string;
        items: any[];
    };
}
