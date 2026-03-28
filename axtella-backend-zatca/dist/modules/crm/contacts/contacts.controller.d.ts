import { ContactsService } from './contacts.service';
export declare class ContactsController {
    private readonly service;
    constructor(service: ContactsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
