import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/types/role.interface';

const Roles = (role: Role[]) => SetMetadata('role', role);
export default Roles;
