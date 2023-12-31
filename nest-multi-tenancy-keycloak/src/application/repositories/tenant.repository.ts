import { Tenants } from '@prisma/client';
import { Tenant } from '../entities/tenant.entity';

export abstract class TenantRepository {
  abstract create(tenant: Tenant): Promise<Tenants>;
  abstract findByTenantId(tenant_id: string): Promise<Tenants>
}
