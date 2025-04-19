import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cita } from './entities/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CitasService {
  constructor(
    @InjectModel(Cita.name) private readonly citaModel: Model<Cita>,
  ) {}

  async create(createCitaDto: CreateCitaDto): Promise<Cita> {
    try {
      const cita = new this.citaModel(createCitaDto);
      const savedCita = await cita.save();
      return await savedCita.populate('paciente');
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new NotFoundException('Paciente no encontrado');
      }
      throw error;
    }
  }

  async findAll(): Promise<Cita[]> {
    try {
      const now = new Date();
      const appointments = await this.citaModel
        .find({ completada: false, cancelada: false })
        .populate('paciente')
        .sort({ fecha: 1, hora: 1 })
        .exec();
      
      // Filtrar las citas para mostrar solo las que están dentro del rango de tiempo permitido
      return appointments.filter(appointment => {
        // Crear una fecha combinando la fecha y hora de la cita
        const appointmentDate = new Date(appointment.fecha);
        const [hours, minutes] = appointment.hora.split(':').map(Number);
        
        // Establecer la hora y minutos en la fecha de la cita
        appointmentDate.setHours(hours, minutes, 0, 0);
        
        // Calcular el tiempo de expiración (30 minutos después)
        const expirationTime = new Date(appointmentDate.getTime() + (30 * 60 * 1000));
        
        console.log('Backend - Cita:', {
          id: appointment._id,
          original: appointmentDate.toLocaleString(),
          expiracion: expirationTime.toLocaleString(),
          ahora: now.toLocaleString(),
          visible: expirationTime > now
        });
        
        return expirationTime > now;
      });
    } catch (error) {
      console.error('Error al buscar citas:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Cita> {
    const cita = await this.citaModel.findById(id).populate('paciente').exec();
    if (!cita) {
      throw new NotFoundException('Cita no encontrada');
    }
    return cita;
  }

  async update(id: string, updateCitaDto: UpdateCitaDto): Promise<Cita> {
    const cita = await this.citaModel
      .findByIdAndUpdate(id, updateCitaDto, { new: true })
      .populate('paciente')
      .exec();
    if (!cita) {
      throw new NotFoundException('Cita no encontrada');
    }
    return cita;
  }

  async remove(id: string): Promise<void> {
    const cita = await this.citaModel.findByIdAndDelete(id).exec();
    if (!cita) {
      throw new NotFoundException('Cita no encontrada');
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleExpiredAppointments() {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    await this.citaModel.updateMany(
      {
        fecha: { $lte: now },
        hora: { $lte: currentTime },
        completada: false,
        cancelada: false,
      },
      { completada: true },
    );
  }
}
