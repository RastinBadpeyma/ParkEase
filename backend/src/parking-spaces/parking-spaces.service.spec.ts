import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSpacesService } from './parking-spaces.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ParkingSpace } from './entities/parking-spaces.entity';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

const parkingSpaceMocks: ParkingSpace[] = [
  {
    id: 1,
    location: 'Detroit',
    pricePerHour: '$5',
    reservations: [],
  },
  {
    id: 2,
    location: 'Washington',
    pricePerHour: '$7',
    reservations: [],
  },
];

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  preload: jest.fn(),
  remove: jest.fn(),
};

describe('ParkingSpacesService', () => {
  let service: ParkingSpacesService;
  let repository: Repository<ParkingSpace>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingSpacesService,
        {
          provide: getRepositoryToken(ParkingSpace),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ParkingSpacesService>(ParkingSpacesService);
    repository = module.get<Repository<ParkingSpace>>(
      getRepositoryToken(ParkingSpace),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createParkingSpace', () => {
    it('should create and return a parking space', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      // jest.spyOn(repository , 'create').mockReturnValue(parkingSpaceMocks[0]);
      mockRepository.create.mockReturnValue(parkingSpaceMocks[0]);
      mockRepository.save.mockResolvedValue(parkingSpaceMocks[0]);

      const result = await service.createParkingSpace({
        location: 'Detroit',
        pricePerHour: '$5',
      });
      expect(result).toEqual(parkingSpaceMocks[0]);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { location: 'Detroit' },
      });
      expect(mockRepository.create).toHaveBeenCalledWith({
        location: 'Detroit',
        pricePerHour: '$5',
      });
      expect(mockRepository.save).toHaveBeenCalledWith(parkingSpaceMocks[0]);
    });

    it('should throw an error if parking space already exists', async () => {
      mockRepository.findOne.mockResolvedValue(parkingSpaceMocks[0]);

      await expect(
        service.createParkingSpace({ location: 'Detroit', pricePerHour: '$5' }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all parking spaces', async () => {
      mockRepository.find.mockResolvedValue(parkingSpaceMocks);

      const result = await service.findAll();
      expect(result).toEqual(parkingSpaceMocks);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a parking space by ID', async () => {
      mockRepository.findOne.mockResolvedValue(parkingSpaceMocks[0]);

      const result = await service.findOne(1);
      expect(result).toEqual(parkingSpaceMocks[0]);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw an error if parking space not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update and return the parking space', async () => {
      const updatedParkingSpace = {
        ...parkingSpaceMocks[0],
        pricePerHour: '$6',
      };
      mockRepository.preload.mockResolvedValue(updatedParkingSpace);

      const result = await service.update(1, { pricePerHour: '$6' });
      expect(result).toEqual(updatedParkingSpace);
      expect(mockRepository.preload).toHaveBeenCalledWith({
        id: 1,
        pricePerHour: '$6',
      });
      expect(mockRepository.save).toHaveBeenCalledWith(updatedParkingSpace);
    });

    it('should throw an error if parking space not found', async () => {
      mockRepository.preload.mockResolvedValue(null);

      await expect(service.update(1, { pricePerHour: '$6' })).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a parking space and return success message', async () => {
      mockRepository.findOne.mockResolvedValue(parkingSpaceMocks[0]);
      mockRepository.remove.mockResolvedValue(parkingSpaceMocks[0]);

      const result = await service.delete(1);
      expect(result).toEqual('Parking space deleted successfully!');
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepository.remove).toHaveBeenCalledWith(parkingSpaceMocks[0]);
    });

    it('should throw an error if parking space not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrow(HttpException);
    });
  });
});
