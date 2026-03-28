import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../properties/entities/property.entity';
import { AccountingController } from './accounting.controller';
import { AccountingService } from './accounting.service';
import { CoaAccountHeadsService } from './coa-account-heads.service';
import { CoaAccountHead } from './entities/coa-account-head.entity';
import { JournalEntry } from './entities/journal-entry.entity';
import { JournalLine } from './entities/journal-line.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JournalEntry,
      JournalLine,
      Property,
      CoaAccountHead,
    ]),
  ],
  controllers: [AccountingController],
  providers: [AccountingService, CoaAccountHeadsService],
  exports: [AccountingService, CoaAccountHeadsService],
})
export class AccountingModule {}
