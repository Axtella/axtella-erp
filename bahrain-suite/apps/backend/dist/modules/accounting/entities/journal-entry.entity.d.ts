import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class JournalEntry extends AppBaseEntity {
    journalNo: string;
    entryDate: string;
    propertyId?: string;
    narration?: string;
}
