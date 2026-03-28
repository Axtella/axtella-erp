import { Injectable } from '@nestjs/common';

@Injectable()
export class LeaveService {
  findAll() {
    return { module: 'leave', items: [] };
  }
}
