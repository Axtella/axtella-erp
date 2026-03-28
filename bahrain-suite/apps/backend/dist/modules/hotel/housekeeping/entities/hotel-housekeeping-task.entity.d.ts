import { AppBaseEntity } from '../../../../common/base/base.entity';
export declare class HotelHousekeepingTask extends AppBaseEntity {
    customerId: string;
    propertyId: string;
    roomId: string;
    taskType: string;
    status: string;
    assignedTo?: string;
    scheduledFor?: string;
    completedAt?: Date;
    notes?: string;
}
