export interface EmployeeModel {
  id: number;
  personal: {
    gender: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    birthPlace: string;
    citizenShip: string;
    maritalStatus: string;
    picture: string;
    street: string;
    houseNumber: string,
    city: string;
    state: string;
    zipCode: string;
    email: string;
    phone: string;
  };
  education: {
    highestEducationalLevelAttained: string;
    degree: string;
    schools: SchoolModel[];
  };
  workExperience: {
    jobs: WorkExperienceModel[];
  };
  role: string;
  created: Date;
  hireDate: Date;
}

export interface SchoolModel {
  schoolName: string;
  schoolAddress: string;
  schoolSpecialisation: string;
  attendedSchoolFromYear: string;
  attendedSchoolToYear: string;
}

export interface WorkExperienceModel {
  companyName: string;
  companyAddress: string;
  companyPosition: string;
  workDescription: string;
  hiredInCompanyFromDate: Date;
  hiredInCompanyToDate: Date;
}
