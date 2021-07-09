export interface EnumModel {
    id: number;
    value: string;
}

export interface TreatmentEnums {
    treatmentTypes: EnumModel[];
    treatmentStatus: EnumModel[];
}

export interface EmployeeEnums {
  maritalStatus: EnumModel[];
  roles: EnumModel[];
  educationalLevels: EnumModel[];
  genders: EnumModel[];
}
