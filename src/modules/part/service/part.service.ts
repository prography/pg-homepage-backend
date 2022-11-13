import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePartRequestDto,
  CreatePartResponseDto,
} from '../dto/create-part.dto';
import { GetPartResponseDto } from '../dto/get-part.dto';
import { GetPartsResponseDto } from '../dto/get-parts.dto';
import {
  UpdatePartRequestDto,
  UpdatePartResponseDto,
} from '../dto/update-part.dto';
import { PartRepository } from '../repository/part.repository';

@Injectable()
export class PartService {
  constructor(private readonly partRepository: PartRepository) {}

  async getParts(): Promise<GetPartsResponseDto> {
    return this.partRepository.find();
  }

  async createPart(body: CreatePartRequestDto): Promise<CreatePartResponseDto> {
    return this.partRepository.save(body);
  }

  async getPart(id: number): Promise<GetPartResponseDto> {
    const part = await this.partRepository.findOneBy({ id });
    if (!part) {
      throw new NotFoundException();
    }
    return part;
  }

  async updatePart(
    id: number,
    body: UpdatePartRequestDto,
  ): Promise<UpdatePartResponseDto> {
    const part = await this.getPart(id);
    await this.partRepository.update(part.id, body);
    return this.getPart(part.id);
  }

  async deletePart(id: number) {
    await this.partRepository.delete(id);
    return { success: true };
  }
}
