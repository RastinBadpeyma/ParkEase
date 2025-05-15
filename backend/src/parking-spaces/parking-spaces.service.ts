import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSpace } from './entities/parking-spaces.entity';
import { Repository } from 'typeorm';
import { CreateParkingSpaceDto } from './dto/create.parking-space.dto';
import { UpdateParkingSpaceDto } from './dto/update.parking-space.dto';

@Injectable()
export class ParkingSpacesService {
  constructor(
    @InjectRepository(ParkingSpace)
    private readonly parkingspaceRepo: Repository<ParkingSpace>,
  ) {}

  async createParkingSpace(
    createParkingSpaceDto: CreateParkingSpaceDto,
  ): Promise<ParkingSpace> {
    const existingParking = await this.parkingspaceRepo.findOne({
      where: {
        location: createParkingSpaceDto.location,
      },
    });

    if (existingParking) {
      throw new BadRequestException(
        'Parking space already exists at this location',
      );
    }

    // If no existing parking space found, proceed to create a new one
    const newParkingSpace = this.parkingspaceRepo.create(createParkingSpaceDto);
    return await this.parkingspaceRepo.save(newParkingSpace);
  }

  async findAll(): Promise<ParkingSpace[]> {
    return await this.parkingspaceRepo.find();
  }

  async findOne(id: number): Promise<ParkingSpace> {
    const parkingSpace = await this.parkingspaceRepo.findOne({ where: { id } });

    if (!parkingSpace) {
      throw new HttpException('Parking space not found', HttpStatus.NOT_FOUND);
    }

    return parkingSpace;
  }

  async update(
    id: number,
    updateParkingSpaceDto: UpdateParkingSpaceDto,
  ): Promise<ParkingSpace> {
    const parkingSpace = await this.parkingspaceRepo.preload({
      id,
      ...updateParkingSpaceDto,
    });

    if (!parkingSpace) {
      throw new HttpException('Parking space not found', HttpStatus.NOT_FOUND);
    }

    return await this.parkingspaceRepo.save(parkingSpace);
  }

  async delete(id: number): Promise<string> {
    const parkingSpace = await this.parkingspaceRepo.findOne({ where: { id } });

    if (!parkingSpace) {
      throw new HttpException('Parking space not found', HttpStatus.NOT_FOUND);
    }

    await this.parkingspaceRepo.remove(parkingSpace);
    return 'Parking space deleted successfully!';
  }
}
