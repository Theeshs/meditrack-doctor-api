import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDTO } from './dto/create-doctor.dto';
import { UpdateDoctorDTO } from './dto/update-doctor.dto';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createDoctor(@Body() data: CreateDoctorDTO) {
    return this.doctorService.createDoctor(data);
  }

  @Get()
  getAllDoctors() {
    return this.doctorService.getAllDoctors();
  }

  @Get(':id')
  getDoctorById(@Param('id') id: string) {
    return this.doctorService.getDoctorById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateDoctor(@Param('id') id: string, @Body() data: UpdateDoctorDTO) {
    return this.doctorService.updateDoctor(id, data);
  }

  @Delete(':id')
  deleteDoctor(@Param('id') id: string) {
    return this.doctorService.deleteDoctor(id);
  }

  @Get(':id/availability')
  checkAvailability(@Param('id') id: string) {
    return this.doctorService.checkAvailability(id);
  }
}
