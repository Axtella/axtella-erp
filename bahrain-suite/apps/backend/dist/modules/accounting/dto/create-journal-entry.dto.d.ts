import { JournalLineInputDto } from './journal-line-input.dto';
export declare class CreateJournalEntryDto {
    entryDate: string;
    propertyId?: string;
    narration?: string;
    lines: JournalLineInputDto[];
}
