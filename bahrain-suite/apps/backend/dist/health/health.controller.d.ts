import { DataSource } from 'typeorm';
export declare class HealthController {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    live(): {
        status: string;
        service: string;
        check: string;
        timestamp: string;
    };
    ready(): Promise<{
        status: string;
        check: string;
        database: string;
        timestamp: string;
    }>;
}
