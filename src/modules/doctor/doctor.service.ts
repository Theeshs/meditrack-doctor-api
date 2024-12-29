import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDTO } from './dto/create-doctor.dto';
import { UpdateDoctorDTO } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async createDoctor(data: CreateDoctorDTO): Promise<Doctor> {
    const doctor = this.doctorRepository.create(data);
    return this.doctorRepository.save(doctor);
  }

  async getAllDoctors(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async getDoctorById(id: string): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async updateDoctor(id: string, data: UpdateDoctorDTO): Promise<Doctor> {
    await this.getDoctorById(id); // Ensure doctor exists
    await this.doctorRepository.update(id, data);
    return this.getDoctorById(id);
  }

  async deleteDoctor(id: string): Promise<void> {
    const doctor = await this.getDoctorById(id);
    await this.doctorRepository.remove(doctor);
  }

  async checkAvailability(doctorId: string): Promise<boolean> {
    const doctor = await this.getDoctorById(doctorId);
    return doctor.isAvailable;
  }
}
