import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from './entities/attendance-record.entity';
import { CreateAttendanceRecordDto } from './dto/create-attendance-record.dto';
import { FindAttendanceDto } from './dto/find-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private readonly repo: Repository<AttendanceRecord>,
  ) {}

  async create(dto: CreateAttendanceRecordDto) {
    const row = this.repo.create({
      employeeCode: dto.employeeCode.trim(),
      employeeName: dto.employeeName?.trim(),
      workDate: dto.workDate,
      clockIn: dto.clockIn,
      clockOut: dto.clockOut,
      status: dto.status || 'present',
      propertyId: dto.propertyId,
      notes: dto.notes,
    });
    return this.repo.save(row);
  }

  async findAll(query: FindAttendanceDto) {
    const qb = this.repo
      .createQueryBuilder('a')
      .orderBy('a.workDate', 'DESC')
      .addOrderBy('a.createdAt', 'DESC');
    if (query.propertyId) {
      qb.andWhere('a.propertyId = :pid', { pid: query.propertyId });
    }
    if (query.from) {
      qb.andWhere('a.workDate >= :from', { from: query.from });
    }
    if (query.to) {
      qb.andWhere('a.workDate <= :to', { to: query.to });
    }
    const items = await qb.getMany();
    return { items, total: items.length };
  }
}
