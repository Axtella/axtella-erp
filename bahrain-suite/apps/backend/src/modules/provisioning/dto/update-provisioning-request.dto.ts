import { PartialType } from '@nestjs/mapped-types';
import { CreateProvisioningRequestDto } from './create-provisioning-request.dto';

export class UpdateProvisioningRequestDto extends PartialType(
  CreateProvisioningRequestDto,
) {}
