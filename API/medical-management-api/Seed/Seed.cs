using System;
using System.Collections.Generic;
using System.Linq;
using Eu.InCloud.Medical.Management.Models;
using Eu.InCloud.Medical.Management.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Eu.InCloud.Medical.Management.Seed {
    public class Seed {

        public static void SeedEmployees (ILiteDbContext context) {
            var EMPLOYEES_COLECTION = "employees";
            var collection = context.Database.GetCollection<Employee> (EMPLOYEES_COLECTION);

            if (collection.Count () == 0) {
                var employeesData = System.IO.File.ReadAllText ("Seed/SeedEmployeeData.json");
                var employees = JsonConvert.DeserializeObject<List<Employee>> (employeesData);
                foreach (var emp in employees) {
                    collection.Insert(emp);
                }
            }
        }

        public static void SeedTreatments (ILiteDbContext context) {
            var TREATMENTS_COLECTION = "treatments";
            var collection = context.Database.GetCollection<Treatment> (TREATMENTS_COLECTION);

            if (collection.Count () == 0) {
                var treatmentsData = System.IO.File.ReadAllText ("Seed/SeedTreatmentData.json");
                var treatments = JsonConvert.DeserializeObject<List<Treatment>> (treatmentsData);
                foreach (var treatment in treatments) {
                    collection.Insert (treatment);
                }
            }
        }

        public static void SeedEnumMaritalStatus (ILiteDbContext context) {
            var MARTITAL_STATUS_COLECTION = "marital_status";
            var collection = context.Database.GetCollection<EnumModel> (MARTITAL_STATUS_COLECTION);

            if (collection.Count () == 0) {
                var maritalStatusData = System.IO.File.ReadAllText ("Seed/SeedMaritalStatusData.json");
                var statusLst = JsonConvert.DeserializeObject<List<EnumModel>> (maritalStatusData);
                foreach (var status in statusLst) {
                    collection.Insert (status);
                }
            }
        }

        public static void SeedEnumRoles (ILiteDbContext context) {
            var ROLES_COLECTION = "roles";
            var collection = context.Database.GetCollection<EnumModel> (ROLES_COLECTION);

            if (collection.Count () == 0) {
                var rolesData = System.IO.File.ReadAllText ("Seed/SeedRolesData.json");
                var roles = JsonConvert.DeserializeObject<List<EnumModel>> (rolesData);
                foreach (var role in roles) {
                    collection.Insert (role);
                }
            }
        }

        public static void SeedEnumEducationalLevel (ILiteDbContext context) {
            var EDUCATIONAL_LEVELS_COLECTION = "educational_levels";
            var collection = context.Database.GetCollection<EnumModel> (EDUCATIONAL_LEVELS_COLECTION);

            if (collection.Count () == 0) {
                var eduLevelsData = System.IO.File.ReadAllText ("Seed/SeedEducationalLevelData.json");
                var eduLevels = JsonConvert.DeserializeObject<List<EnumModel>> (eduLevelsData);
                foreach (var lvl in eduLevels) {
                    collection.Insert (lvl);
                }
            }
        }

        public static void SeedEnumGenders (ILiteDbContext context) {
            var GENDERS_COLECTION = "genders";
            var collection = context.Database.GetCollection<EnumModel> (GENDERS_COLECTION);

            if (collection.Count () == 0) {
                var genderData = System.IO.File.ReadAllText ("Seed/SeedGenderData.json");
                var genders = JsonConvert.DeserializeObject<List<EnumModel>> (genderData);
                foreach (var gender in genders) {
                    collection.Insert (gender);
                }
            }
        }

        public static void SeedEnumTreatmentTypes (ILiteDbContext context) {
            var TREATMENT_TYPES_COLECTION = "treatment_types";
            var collection = context.Database.GetCollection<EnumModel> (TREATMENT_TYPES_COLECTION);

            if (collection.Count () == 0) {
                var treatmentTypesData = System.IO.File.ReadAllText ("Seed/SeedTreatmentTypeData.json");
                var treatmentTypes = JsonConvert.DeserializeObject<List<EnumModel>> (treatmentTypesData);
                foreach (var type in treatmentTypes) {
                    collection.Insert (type);
                }
            }
        }

        public static void SeedEnumTreatmentStatus (ILiteDbContext context) {
            var TREATMENT_STATUS_COLECTION = "treatment_status";
            var collection = context.Database.GetCollection<EnumModel> (TREATMENT_STATUS_COLECTION);

            if (collection.Count () == 0) {
                var treatmentStatusData = System.IO.File.ReadAllText ("Seed/SeedTreatmentStatusData.json");
                var treatmentStatusLst = JsonConvert.DeserializeObject<List<EnumModel>> (treatmentStatusData);
                foreach (var status in treatmentStatusLst) {
                    collection.Insert (status);
                }
            }
        }
    }
}