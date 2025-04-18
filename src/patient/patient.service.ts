import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './schema/patient.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      // Verificar si ya existe un paciente con el mismo RUT
      const existingPatient = await this.patientModel.findOne({
        rut: createPatientDto.rut,
      });

      if (existingPatient) {
        throw new HttpException('Ya existe un paciente con este RUT', 400);
      }

      // Crear el nuevo paciente
      const newPatient = await this.patientModel.create(createPatientDto);
      return {
        message: 'Paciente registrado exitosamente',
        patient: newPatient,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error al registrar el paciente: ' + error.message,
        500,
      );
    }
  }

  async findAll() {
    try {
      const patients = await this.patientModel
        .find()
        .populate('evaluations')
        .populate('clinicalRecords')
        .exec();

      return {
        message: 'Pacientes encontrados',
        patients,
      };
    } catch (error) {
      throw new HttpException(
        'Error al buscar pacientes: ' + error.message,
        500,
      );
    }
  }

  async findOne(id: string) {
    try {
      const patient = await this.patientModel
        .findById(id)
        .populate('evaluations')
        .populate('clinicalRecords')
        .exec();

      if (!patient) {
        throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
      }

      return {
        message: 'Paciente encontrado',
        patient,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        'Error al buscar el paciente: ' + error.message,
        500,
      );
    }
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    try {
      // Verificar si el paciente existe
      const existingPatient = await this.patientModel.findById(id);

      if (!existingPatient) {
        throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
      }

      // Si se está actualizando el RUT, verificar que no exista otro paciente con ese RUT
      if (updatePatientDto.rut) {
        // Solo verificar duplicados si el RUT es diferente al actual
        if (updatePatientDto.rut !== existingPatient.rut) {
          console.log(
            `Verificando RUT ${updatePatientDto.rut} para paciente con ID ${id}`,
          );

          const patientWithSameRut = await this.patientModel.findOne({
            rut: updatePatientDto.rut,
            _id: { $ne: id },
          });

          if (patientWithSameRut) {
            console.log(
              `Encontrado otro paciente con el mismo RUT: ${patientWithSameRut._id}`,
            );
            throw new HttpException(
              'Ya existe otro paciente con este RUT',
              400,
            );
          }

          console.log('No se encontraron pacientes con el mismo RUT');
        } else {
          console.log(`El RUT no ha cambiado: ${existingPatient.rut}`);
        }
      }

      // Actualizar el paciente
      const updatedPatient = await this.patientModel
        .findByIdAndUpdate(id, updatePatientDto, { new: true })
        .populate('evaluations')
        .populate('clinicalRecords')
        .exec();

      return {
        message: 'Paciente actualizado exitosamente',
        patient: updatedPatient,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof HttpException
      ) {
        throw error;
      }
      throw new HttpException(
        'Error al actualizar el paciente: ' + error.message,
        500,
      );
    }
  }

  async remove(id: string) {
    try {
      // Verificar si el paciente existe
      const existingPatient = await this.patientModel.findById(id);

      if (!existingPatient) {
        throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
      }

      // Eliminar el paciente
      await this.patientModel.findByIdAndDelete(id);

      return {
        message: 'Paciente eliminado exitosamente',
        patientId: id,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        'Error al eliminar el paciente: ' + error.message,
        500,
      );
    }
  }
}
