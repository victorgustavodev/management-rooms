import { InMemoryEntityRepository } from './in-memory-entity.repository'
import { CertificateRepository } from 'src/domain/repositories/certificate.repository'
import { Certificate } from 'src/domain/entities/certificate.entity'

export class InMemoryCertificateRepository
  extends InMemoryEntityRepository<Certificate>
  implements CertificateRepository
{

}