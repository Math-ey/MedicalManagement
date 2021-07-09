using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eu.InCloud.Medical.Management.Dtos;
using Eu.InCloud.Medical.Management.Models;
using LiteDB;

namespace Eu.InCloud.Medical.Management.Services
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private ILiteDbContext _context;
        private  ITreatmentRepository _treatmentRepo;
        private static readonly string EMPLOYEES_COLLECTION = "employees";
        private static readonly string MARITAL_STATUS_COLLECTION = "marital_status";
        private static readonly string ROLES_COLECTION = "roles";
        private static readonly string EDUCATIONAL_LEVELS_COLECTION = "educational_levels";
        private static readonly string GENDERS_COLECTION = "genders";

        

        public EmployeeRepository(ILiteDbContext context, ITreatmentRepository treatmentRepo)
        {
            this._context = context;
            this._treatmentRepo = treatmentRepo;
        }

        public IEnumerable<EnumModel> GetMaritalStatus()
        {
            var collection = this._context.Database.GetCollection<EnumModel>(MARITAL_STATUS_COLLECTION);
            return collection.FindAll().ToList();
        }

        public IEnumerable<EnumModel> GetGenders()
        {
            var collection = this._context.Database.GetCollection<EnumModel>(GENDERS_COLECTION);
            return collection.FindAll().ToList();
        }

        public IEnumerable<EnumModel> GetRoles()
        {
            var collection = this._context.Database.GetCollection<EnumModel>(ROLES_COLECTION);
            return collection.FindAll().ToList();
        }

        public IEnumerable<EnumModel> GetEducationalLevels()
        {
            var collection = this._context.Database.GetCollection<EnumModel>(EDUCATIONAL_LEVELS_COLECTION);
            return collection.FindAll().ToList();
        }

        public Employee CreateEmployee(Employee employee)
        {
            var collection = this._context.Database.GetCollection<Employee>(EMPLOYEES_COLLECTION);

            var id = collection.Insert(employee);
            employee.Id = id;

            return employee;
        }

        public Employee UpdateEmployee(Employee employee)
        {
            var collection = this._context.Database.GetCollection<Employee>(EMPLOYEES_COLLECTION);
            var existingEmployee = collection.FindById(employee.Id);
            if (existingEmployee == null)
                return null;

            collection.Update(employee);

            return employee;
        }

        public bool DeleteEmployee(int employeeId)
        {
            var employeeTreatments = this._treatmentRepo.GetTreatmentsByEmployeeId(employeeId);
            if (employeeTreatments.Count() > 0)
                throw new Exception("Trying to delete employee with existing treatments.");

            var collection = this._context.Database.GetCollection<Employee>(EMPLOYEES_COLLECTION);
            return collection.Delete(employeeId);
        }

        public Employee GetEmployeeById(int id)
        {
            var collection = this._context.Database.GetCollection<Employee>(EMPLOYEES_COLLECTION);
            return collection.FindById(id);
        }

        public IEnumerable<Employee> GetEmployeesByIds(List<int> listId)
        {
            var collection = this._context.Database.GetCollection<Employee>(EMPLOYEES_COLLECTION);
            var employeeList = collection.Find(Query.Where("_id", id => listId.Contains(id))).ToList();

            return employeeList;
        }

        public EmployeeListDto GetEmployeeList(string query, PaginationParameters paginationParameters)
        {
            var collection = this._context.Database.GetCollection<Employee>(EMPLOYEES_COLLECTION);
            collection.EnsureIndex("Personal.FirstName", "LOWER($.Personal.FirstName)");
            collection.EnsureIndex("Personal.LastName", "LOWER($.Personal.LastName)");

            var employeeListQuery = (query != null && query != "") ? collection.Find(Query.Or(
                        Query.Contains("Personal.FirstName", query.ToLower()),
                        Query.Contains("Personal.LastName", query.ToLower()))
                ) : collection.FindAll();

            var employeeList = employeeListQuery
                .Skip((paginationParameters.Page) * paginationParameters.Limit)
                .Take(paginationParameters.Limit)
                .ToList();

            var employeeListDto = new EmployeeListDto
            {
                List = employeeList,
                Total = collection.Count()
            };

            return employeeListDto;
        }
    }
}