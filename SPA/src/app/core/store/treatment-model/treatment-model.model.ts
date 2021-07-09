import { SimpleEmployee } from '@core/models/simple-employee';

export interface TreatmentModel {
  id: number;
  title: string;
  type: number;
  description: string;
  mainDoctorObject: SimpleEmployee;
  roomNumber: string;
  date: Date;
  otherDoctorsObject: SimpleEmployee[];
  status: number;
}
