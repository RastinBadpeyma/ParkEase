import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSpacesController } from './parking-spaces.controller';
import { ParkingSpacesService } from './parking-spaces.service';
import { CreateParkingSpaceDto } from './dto/create.parking-space.dto';
import { UpdateParkingSpaceDto } from './dto/update.parking-space.dto';

const mockParkingSpacesService = {
  createParkingSpace: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('ParkingSpacesController', () => {
  let controller: ParkingSpacesController;
  let service: ParkingSpacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingSpacesController],
      providers: [
        {
          provide: ParkingSpacesService,
          useValue: mockParkingSpacesService,
        },
      ],
    }).compile();

    controller = module.get<ParkingSpacesController>(ParkingSpacesController);
    service = module.get<ParkingSpacesService>(ParkingSpacesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createParking', () => {
    it('should create a new parking space', async () => {
      const dto: CreateParkingSpaceDto = {
        location: 'Detroit',
        pricePerHour: '$5',
      };
      const mockResult = { id: 1, ...dto };

      mockParkingSpacesService.createParkingSpace.mockResolvedValue(mockResult);

      const result = await controller.createParking(dto);
      expect(result).toEqual(mockResult);
      expect(mockParkingSpacesService.createParkingSpace).toHaveBeenCalledWith(
        dto,
      );
    });
  });

  describe('getAllSpace', () => {
    it('should return all parking spaces', async () => {
      const mockResult = [
        { id: 1, location: 'Detroit', pricePerHour: '$5' },
        { id: 2, location: 'Washington', pricePerHour: '$7' },
      ];

      mockParkingSpacesService.findAll.mockResolvedValue(mockResult);

      const result = await controller.getAllSpace();
      expect(result).toEqual(mockResult);
      expect(mockParkingSpacesService.findAll).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return a single parking space', async () => {
      const mockResult = {
        id: 1,
        location: 'Detroit',
        pricePerHour: '$5',
        reservations: [],
      };

      mockParkingSpacesService.findOne.mockResolvedValue(mockResult);

      const result = await controller.getOne(1);
      expect(result).toEqual(mockResult);
      expect(mockParkingSpacesService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an error if parking space not found', async () => {
      mockParkingSpacesService.findOne.mockResolvedValue(null);

      await expect(controller.getOne(1)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update and return the parking space', async () => {
      const dto: UpdateParkingSpaceDto = { pricePerHour: '$6' };
      const mockResult = {
        id: 1,
        location: 'Detroit',
        pricePerHour: '$6',
        reservations: [],
      };

      mockParkingSpacesService.update.mockResolvedValue(mockResult);

      const result = await controller.update(1, dto);
      expect(result).toEqual(mockResult);
      expect(mockParkingSpacesService.update).toHaveBeenCalledWith(1, dto);
    });

    it('should throw an error if parking space not found', async () => {
      mockParkingSpacesService.update.mockResolvedValue(null);

      await expect(
        controller.update(1, { pricePerHour: '$6' }),
      ).rejects.toThrow();
    });
  });

  describe('deleteOne', () => {
    it('should delete a parking space and return success message', async () => {
      mockParkingSpacesService.delete.mockResolvedValue(
        'Parking space deleted successfully!',
      );

      const result = await controller.deleteOne(1);
      expect(result).toEqual('Parking space deleted successfully!');
      expect(mockParkingSpacesService.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if parking space not found', async () => {
      mockParkingSpacesService.delete.mockResolvedValue(null);

      await expect(controller.deleteOne(1)).rejects.toThrow();
    });
  });
});
