import { Injectable, NotFoundException } from '@nestjs/common';
import { Parts } from 'src/infra/entity/Parts.entity';
import { CreatePartRequestDto } from '../dto/create-part.dto';
import { UpdatePartRequestDto } from '../dto/update-part.dto';
import { PartRepository } from '../repository/part.repository';
import { GenerationService } from '@modules/generation/service/generation.service';

@Injectable()
export class PartService {
  constructor(
    private readonly partRepository: PartRepository,
    private readonly generationService: GenerationService,
  ) {}

  async getParts(generationId?: string): Promise<Parts[]> {
    let targetId: number;
    if (generationId === undefined) {
      const generation =
        await this.generationService.findOneGenerationByCurrentDate();
      targetId = generation.id;
    } else {
      targetId = +generationId;
    }
    return this.partRepository.find({ where: { generationId: targetId } });
  }

  async createPart(body: CreatePartRequestDto): Promise<Parts> {
    return this.partRepository.save(body);
  }

  async getPart(id: number): Promise<Parts> {
    const part = await this.partRepository.findOneBy({ id });
    if (!part) {
      throw new NotFoundException();
    }
    return part;
  }

  async updatePart(id: number, body: UpdatePartRequestDto): Promise<Parts> {
    const part = await this.getPart(id);
    await this.partRepository.update(part.id, body);
    return this.getPart(part.id);
  }

  async deletePart(id: number) {
    await this.partRepository.delete(id);
    return { success: true };
  }
}
