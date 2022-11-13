import { Injectable, NotFoundException } from '@nestjs/common';
import { Parts } from 'src/infra/entity/Parts.entity';
import { CreatePartRequestDto } from '../dto/create-part.dto';
import { UpdatePartRequestDto } from '../dto/update-part.dto';
import { PartRepository } from '../repository/part.repository';

@Injectable()
export class PartService {
  constructor(private readonly partRepository: PartRepository) {}

  async getParts(): Promise<Parts[]> {
    return this.partRepository.find();
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
