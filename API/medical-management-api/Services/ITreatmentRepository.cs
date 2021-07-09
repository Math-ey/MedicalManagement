using System.Collections.Generic;
using Eu.InCloud.Medical.Management.Models;

namespace Eu.InCloud.Medical.Management.Services
{
    public interface ITreatmentRepository
    {
        Treatment GetTreatmentById(int treatmentId);
        IEnumerable<Treatment> GetTreatmentsByEmployeeId(int employeeId);
        IEnumerable<Treatment> GetAllTreatments();
        Treatment CreateTreatment(Treatment treatment);
        Treatment UpdateTreatment(Treatment treatment);
        bool DeleteTreatment(int treatmentId);
        IEnumerable<EnumModel> GetTreatmentTypes();
        IEnumerable<EnumModel> GetTreatmentStatus();
    }
}