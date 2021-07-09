using System.Collections.Generic;
using System.Threading.Tasks;
using Eu.InCloud.Medical.Management.Dtos;
using Eu.InCloud.Medical.Management.Models;

namespace Eu.InCloud.Medical.Management.Services
{
    public interface IEmployeeRepository
    {
        Employee GetEmployeeById(int id);
        IEnumerable<Employee> GetEmployeesByIds(List<int> id);
        EmployeeListDto GetEmployeeList(string query, PaginationParameters paginationParameters);
        Employee CreateEmployee(Employee employee);
        Employee UpdateEmployee(Employee employee);
        bool DeleteEmployee(int employeeId);
        IEnumerable<EnumModel> GetMaritalStatus();
        IEnumerable<EnumModel> GetGenders();
        IEnumerable<EnumModel> GetRoles();
        IEnumerable<EnumModel> GetEducationalLevels();
        
    }
}