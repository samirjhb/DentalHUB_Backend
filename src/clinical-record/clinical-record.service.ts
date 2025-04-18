import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClinicalRecordDto } from './dto/create-clinical-record.dto';
import { UpdateClinicalRecordDto } from './dto/update-clinical-record.dto';
import { AddTreatmentDto } from './dto/add-treatment.dto';
import { FilterClinicalRecordDto } from './dto/filter-clinical-record.dto';
import {
  ClinicalRecord,
  ClinicalRecordDocument,
} from './schema/clinical-record.schema';
import { PatientDocument } from 'src/patient/schema/patient.schema';

@Injectable()
export class ClinicalRecordService {
  constructor(
    @InjectModel(ClinicalRecord.name)
    private clinicalRecordModel: Model<ClinicalRecordDocument>,
    @InjectModel('Patient') private patientModel: Model<PatientDocument>,
  ) {}

  async create(
    createClinicalRecordDto: CreateClinicalRecordDto,
  ): Promise<ClinicalRecordDocument> {
    try {
      // Verificar que el paciente existe
      const patient = await this.patientModel.findById(
        createClinicalRecordDto.patient,
      );
      if (!patient) {
        throw new NotFoundException(
          `Paciente con ID ${createClinicalRecordDto.patient} no encontrado`,
        );
      }

      // Crear la ficha clínica
      const newClinicalRecord = new this.clinicalRecordModel(
        createClinicalRecordDto,
      );
      return await newClinicalRecord.save();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Error al crear la ficha clínica: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<ClinicalRecordDocument[]> {
    return this.clinicalRecordModel.find().populate('patient').exec();
  }

  async findWithFilters(
    filterDto: FilterClinicalRecordDto,
  ): Promise<ClinicalRecordDocument[]> {
    const { patientId, status, startDate, endDate, dentist } = filterDto;
    const query: any = {};

    // Filtrar por paciente si se proporciona un ID
    if (patientId) {
      query.patient = patientId;
    }

    // Filtrar por dentista
    if (dentist) {
      query.dentist = { $regex: dentist, $options: 'i' }; // Búsqueda insensible a mayúsculas/minúsculas
    }

    // Filtrar por estado de tratamiento
    if (status) {
      query.treatments = {
        $elemMatch: { status: status },
      };
    }

    // Filtrar por rango de fechas de cita
    if (startDate || endDate) {
      query.treatments = {
        $elemMatch: {},
      };

      if (startDate) {
        query.treatments.$elemMatch.appointmentDate = { $gte: startDate };
      }

      if (endDate) {
        query.treatments.$elemMatch.appointmentDate = {
          ...query.treatments.$elemMatch.appointmentDate,
          $lte: endDate,
        };
      }
    }

    return this.clinicalRecordModel.find(query).populate('patient').exec();
  }

  async findByPatient(patientId: string): Promise<ClinicalRecordDocument[]> {
    return this.clinicalRecordModel.find({ patient: patientId }).exec();
  }

  async findOne(id: string): Promise<ClinicalRecordDocument> {
    const clinicalRecord = await this.clinicalRecordModel
      .findById(id)
      .populate('patient')
      .exec();
    if (!clinicalRecord) {
      throw new NotFoundException(`Ficha clínica con ID ${id} no encontrada`);
    }
    return clinicalRecord;
  }

  async update(
    id: string,
    updateClinicalRecordDto: UpdateClinicalRecordDto,
  ): Promise<ClinicalRecordDocument> {
    try {
      // Si se está actualizando el paciente, verificar que existe
      if (updateClinicalRecordDto.patient) {
        const patient = await this.patientModel.findById(
          updateClinicalRecordDto.patient,
        );
        if (!patient) {
          throw new NotFoundException(
            `Paciente con ID ${updateClinicalRecordDto.patient} no encontrado`,
          );
        }
      }

      // Actualizar la ficha clínica
      const updatedRecord = await this.clinicalRecordModel
        .findByIdAndUpdate(id, updateClinicalRecordDto, { new: true })
        .exec();

      if (!updatedRecord) {
        throw new NotFoundException(`Ficha clínica con ID ${id} no encontrada`);
      }

      return updatedRecord;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Error al actualizar la ficha clínica: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<{ deleted: boolean; message: string }> {
    const result = await this.clinicalRecordModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Ficha clínica con ID ${id} no encontrada`);
    }
    return {
      deleted: true,
      message: `Ficha clínica con ID ${id} eliminada correctamente`,
    };
  }

  async updateStatus(
    id: string,
    status: string,
    treatmentIndex = 0, // Índice del tratamiento a actualizar
  ): Promise<ClinicalRecordDocument> {
    const clinicalRecord = await this.clinicalRecordModel.findById(id).exec();
    if (!clinicalRecord) {
      throw new NotFoundException(`Ficha clínica con ID ${id} no encontrada`);
    }

    if (
      !['Pendiente', 'En proceso', 'Completado', 'Cancelado'].includes(status)
    ) {
      throw new BadRequestException(
        'Estado no válido. Debe ser: Pendiente, En proceso, Completado o Cancelado',
      );
    }

    // Verificar que el índice del tratamiento es válido
    if (
      !clinicalRecord.treatments ||
      treatmentIndex >= clinicalRecord.treatments.length
    ) {
      throw new BadRequestException(
        `Tratamiento con índice ${treatmentIndex} no encontrado`,
      );
    }

    // Actualizar el estado del tratamiento específico
    clinicalRecord.treatments[treatmentIndex].status = status;
    return await clinicalRecord.save();
  }
  // Método para registrar un abono
  async addDeposit(
    id: string,
    amount: number,
    treatmentIndex = 0, // Índice del tratamiento a actualizar
  ): Promise<ClinicalRecordDocument> {
    const clinicalRecord = await this.clinicalRecordModel.findById(id).exec();
    if (!clinicalRecord) {
      throw new NotFoundException(`Ficha clínica con ID ${id} no encontrada`);
    }

    if (amount <= 0) {
      throw new BadRequestException('El monto del abono debe ser mayor a cero');
    }

    // Verificar que el índice del tratamiento es válido
    if (
      !clinicalRecord.treatments ||
      treatmentIndex >= clinicalRecord.treatments.length
    ) {
      throw new BadRequestException(
        `Tratamiento con índice ${treatmentIndex} no encontrado`,
      );
    }

    const treatment = clinicalRecord.treatments[treatmentIndex];
    const currentDeposit = treatment.deposit || 0;
    treatment.deposit = currentDeposit + amount;

    // Si el abono completa el pago, actualizar el estado
    if (treatment.deposit >= treatment.price) {
      treatment.status = 'Completado';
    }

    return await clinicalRecord.save();
  }

  // Método para actualizar la fecha de cita
  async updateAppointmentDate(
    id: string,
    date: Date,
    treatmentIndex = 0, // Índice del tratamiento a actualizar
  ): Promise<ClinicalRecordDocument> {
    const clinicalRecord = await this.clinicalRecordModel.findById(id).exec();
    if (!clinicalRecord) {
      throw new NotFoundException(`Ficha clínica con ID ${id} no encontrada`);
    }

    // Verificar que el índice del tratamiento es válido
    if (
      !clinicalRecord.treatments ||
      treatmentIndex >= clinicalRecord.treatments.length
    ) {
      throw new BadRequestException(
        `Tratamiento con índice ${treatmentIndex} no encontrado`,
      );
    }

    clinicalRecord.treatments[treatmentIndex].appointmentDate = date;
    return await clinicalRecord.save();
  }

  // Método para agregar un nuevo tratamiento a una ficha clínica existente
  async addTreatment(
    id: string,
    addTreatmentDto: AddTreatmentDto,
  ): Promise<ClinicalRecordDocument> {
    const clinicalRecord = await this.clinicalRecordModel.findById(id).exec();
    if (!clinicalRecord) {
      throw new NotFoundException(`Ficha clínica con ID ${id} no encontrada`);
    }

    // Crear el nuevo tratamiento como un objeto simple
    const newTreatment = {
      diagnosis: addTreatmentDto.diagnosis,
      radiography: addTreatmentDto.radiography,
      toothNumber: addTreatmentDto.toothNumber,
      treatment: addTreatmentDto.treatment,
      price: addTreatmentDto.price,
      status: addTreatmentDto.status || 'Pendiente',
      deposit: addTreatmentDto.deposit || 0,
      appointmentDate: addTreatmentDto.appointmentDate,
      observations: addTreatmentDto.observations,
    };

    // Agregar el tratamiento al array de tratamientos
    clinicalRecord.treatments.push(newTreatment);
    return await clinicalRecord.save();
  }

  // Método para eliminar un tratamiento específico de una ficha clínica
  async removeTreatment(
    id: string,
    treatmentIndex: number,
  ): Promise<ClinicalRecordDocument> {
    const clinicalRecord = await this.clinicalRecordModel.findById(id).exec();
    if (!clinicalRecord) {
      throw new NotFoundException(`Ficha clínica con ID ${id} no encontrada`);
    }

    // Verificar que el índice del tratamiento es válido
    if (
      !clinicalRecord.treatments ||
      treatmentIndex >= clinicalRecord.treatments.length
    ) {
      throw new BadRequestException(
        `Tratamiento con índice ${treatmentIndex} no encontrado`,
      );
    }

    // Eliminar el tratamiento del array
    clinicalRecord.treatments.splice(treatmentIndex, 1);

    // Si no quedan tratamientos, eliminar la ficha clínica completa
    if (clinicalRecord.treatments.length === 0) {
      await this.clinicalRecordModel.findByIdAndDelete(id).exec();
      throw new BadRequestException(
        `La ficha clínica ha sido eliminada porque no contiene tratamientos`,
      );
    }

    return await clinicalRecord.save();
  }

  // Método para calcular el saldo pendiente de un tratamiento
  async calculatePendingBalance(
    id: string,
    treatmentIndex: number,
  ): Promise<{ pendingBalance: number; percentagePaid: number }> {
    const clinicalRecord = await this.clinicalRecordModel.findById(id).exec();
    if (!clinicalRecord) {
      throw new NotFoundException(`Ficha clínica con ID ${id} no encontrada`);
    }

    // Verificar que el índice del tratamiento es válido
    if (
      !clinicalRecord.treatments ||
      treatmentIndex >= clinicalRecord.treatments.length
    ) {
      throw new BadRequestException(
        `Tratamiento con índice ${treatmentIndex} no encontrado`,
      );
    }

    const treatment = clinicalRecord.treatments[treatmentIndex];
    const totalPrice = treatment.price || 0;
    const totalDeposit = treatment.deposit || 0;
    const pendingBalance = totalPrice - totalDeposit;
    const percentagePaid =
      totalPrice > 0 ? (totalDeposit / totalPrice) * 100 : 0;

    return {
      pendingBalance,
      percentagePaid,
    };
  }

  // Método para calcular el saldo pendiente de todos los tratamientos de una ficha clínica
  async calculateTotalPendingBalance(id: string): Promise<{
    totalPrice: number;
    totalPaid: number;
    pendingBalance: number;
    percentagePaid: number;
  }> {
    const clinicalRecord = await this.clinicalRecordModel.findById(id).exec();
    if (!clinicalRecord) {
      throw new NotFoundException(`Ficha clínica con ID ${id} no encontrada`);
    }

    // Verificar que existen tratamientos
    if (!clinicalRecord.treatments || clinicalRecord.treatments.length === 0) {
      throw new BadRequestException(
        `La ficha clínica no contiene tratamientos`,
      );
    }

    // Calcular totales
    let totalPrice = 0;
    let totalPaid = 0;

    clinicalRecord.treatments.forEach((treatment) => {
      totalPrice += treatment.price || 0;
      totalPaid += treatment.deposit || 0;
    });

    const pendingBalance = totalPrice - totalPaid;
    const percentagePaid = totalPrice > 0 ? (totalPaid / totalPrice) * 100 : 0;

    return {
      totalPrice,
      totalPaid,
      pendingBalance,
      percentagePaid,
    };
  }
}
