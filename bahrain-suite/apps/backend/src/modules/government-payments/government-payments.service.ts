import { Injectable } from '@nestjs/common';

@Injectable()
export class GovernmentPaymentsService {
  findAll() {
    return { module: 'government-payments', items: [] };
  }
}
