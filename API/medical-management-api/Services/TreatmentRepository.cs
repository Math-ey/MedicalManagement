using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eu.InCloud.Medical.Management.Dtos;
using Eu.InCloud.Medical.Management.Models;
using LiteDB;

namespace Eu.InCloud.Medical.Management.Services
{
    public class TreatmentRepository : ITreatmentRepository
    {
        private ILiteDbContext _context;
        private static readonly string TREATMENTS_COLLECTION = "treatments";
        private static readonly string TREATMENT_TYPES_COLECTION = "treatment_types";
        private static readonly string TREATMENT_STATUS_COLECTION = "treatment_status";


        public TreatmentRepository(ILiteDbContext context)
        {
            _context = context;
        }

        public IEnumerable<EnumModel> GetTreatmentTypes()
        {
            var collection = this._context.Database.GetCollection<EnumModel>(TREATMENT_TYPES_COLECTION);
            return collection.FindAll().ToList();
        }

        public IEnumerable<EnumModel> GetTreatmentStatus()
        {
            var collection = this._context.Database.GetCollection<EnumModel>(TREATMENT_STATUS_COLECTION);
            return collection.FindAll().ToList();
        }

        public Treatment CreateTreatment(Treatment treatment) {
            var treatmentCollection = this._context.Database.GetCollection<Treatment>(TREATMENTS_COLLECTION);


            var id = treatmentCollection.Insert(treatment);
            treatment.Id = id;

            return treatment;
        }

        public Treatment UpdateTreatment(Treatment treatment)
        {
            var collection = this._context.Database.GetCollection<Treatment>(TREATMENTS_COLLECTION);
            var existingTreatment = collection.FindById(treatment.Id);
            if (existingTreatment == null)
                return null;
        
            collection.Update(treatment);

            return treatment;
        }

        public bool DeleteTreatment(int treatmentId)
        {
            var collection = this._context.Database.GetCollection<Treatment>(TREATMENTS_COLLECTION);
            return collection.Delete(treatmentId);
        }

        public Treatment GetTreatmentById(int treatmentId)
        {
            var collection = this._context.Database.GetCollection<Treatment>(TREATMENTS_COLLECTION);
            var treatment = collection.FindById(treatmentId);
            return treatment;
        }

        public IEnumerable<Treatment> GetAllTreatments()
        {
            var collection = this._context.Database.GetCollection<Treatment>(TREATMENTS_COLLECTION);
            return collection.FindAll();

        }

        public IEnumerable<Treatment> GetTreatmentsByEmployeeId(int employeeId)
        {
            var collection = this._context.Database.GetCollection<Treatment>(TREATMENTS_COLLECTION);
            var employeeTreatments = collection.FindAll().Where(t => t.MainDoctorId == employeeId 
                || t.OtherDoctorsId.Contains(employeeId));

            return employeeTreatments.ToList();
        }
    }
}