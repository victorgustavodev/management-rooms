import { InMemoryEntityRepository } from './in-memory-entity.repository';
import { PlayerCertificateRepository } from 'src/domain/repositories/player-certificate.repository';
import { PlayerCertificate } from 'src/domain/entities/player-certificate.entity';

export class InMemoryPlayerCertificateRepository
  extends InMemoryEntityRepository<PlayerCertificate>
  implements PlayerCertificateRepository
{
  // Nenhum método adicional necessário
}