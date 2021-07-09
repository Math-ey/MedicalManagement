using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using Eu.InCloud.Medical.Management.Dtos;
using Eu.InCloud.Medical.Management.Seed;
using Eu.InCloud.Medical.Management.Services;
using LiteDB;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace medical_management_api.tests
{
    [TestClass]
    public class EmployeeTests
    {

        private ILiteDbContext _context;
        private IEmployeeRepository _employeeRepo;

        [TestInitialize]
        public void TestInit()
        {
            var services = new ServiceCollection();
            services.AddSingleton(typeof(ILiteDbContext), typeof(LiteDbContextTest));
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<ITreatmentRepository, TreatmentRepository>();

            var serviceProvider = services.BuildServiceProvider();

            _context = serviceProvider.GetService<ILiteDbContext>();
            _employeeRepo = serviceProvider.GetService<IEmployeeRepository>();

            Seed.SeedEmployees(_context);
            Seed.SeedTreatments(_context);
        }

        [TestCleanup]
        public void TestCleanup()
        {
            _context.Database.Dispose();
            File.Delete("LiteDb.db");
        }

        [TestMethod]
        public void GetEmployeeList_NoQueryParametersUsed_AreEqual()
        {
            // Given
            var query = "";
            PaginationParameters parameters = new PaginationParameters();
            var arrayOfEmployeeIds = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };


            // When
            var result = _employeeRepo.GetEmployeeList(query, parameters);

            // Then
            for (int i = 0; i < result.List.Count; i++)
            {
                Assert.AreEqual(result.List[i].Id, arrayOfEmployeeIds[i]);
            }
        }

        [TestMethod]
        public void GetEmployeeList_QueryStringSelected_AreEqual()
        {
            // Given
            var query = "haynes";
            PaginationParameters parameters = new PaginationParameters();

            // When
            var result = _employeeRepo.GetEmployeeList(query, parameters);

            // Then
            Assert.AreEqual(result.List.Count, 1);
            Assert.AreEqual(result.List[0].Id, 1);
        }

        [TestMethod]
        public void GetEmployeeList_QueryStringNull_AreEqual()
        {
            // Given
            string query = null;
            PaginationParameters parameters = new PaginationParameters();
            var arrayOfEmployeeIds = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };


            // When
            var result = _employeeRepo.GetEmployeeList(query, parameters);

            // Then
            Assert.AreEqual(result.List.Count, 10);
            for (int i = 0; i < result.List.Count; i++)
            {
                Assert.AreEqual(result.List[i].Id, arrayOfEmployeeIds[i]);
            }
        }

        [TestMethod]
        public void GetEmployeeList_Limit5_AreEqual()
        {
            // Given
            var query = "";
            PaginationParameters parameters = new PaginationParameters();
            parameters.Limit = 5;
            var arrayOfEmployeeIds = new int[] { 1, 2, 3, 4, 5 };

            // When
            var result = _employeeRepo.GetEmployeeList(query, parameters);

            // Then
            Assert.AreEqual(result.List.Count, 5);
            for (int i = 0; i < result.List.Count; i++)
            {
                Assert.AreEqual(result.List[i].Id, arrayOfEmployeeIds[i]);
            }
        }

        [DataTestMethod]
        [DataRow(5, 0, 5, new int[] { 1, 2, 3, 4, 5 })]
        [DataRow(5, 1, 5, new int[] { 6, 7, 8, 9, 10 })]
        [DataRow(5, 2, 4, new int[] { 11, 12, 13, 14 })]
        public void GetEmployeeList_LimitAndPageSet_AreEqual(int limit, int page, int employeeCount, int[] arrayOfEmployeeIds)
        {
            // Given
            var query = "";
            var parameters = new PaginationParameters { Limit = limit, Page = page };

            // When
            var result = _employeeRepo.GetEmployeeList(query, parameters);

            // Then
            Assert.AreEqual(result.List.Count, employeeCount);
            for (int i = 0; i < result.List.Count; i++)
            {
                Assert.AreEqual(result.List[i].Id, arrayOfEmployeeIds[i]);
            }
        }

        [TestMethod]
        public void DeleteEmployee_NoTreatments_True()
        {
            // When
            var result = _employeeRepo.DeleteEmployee(14);

            // Then
            Assert.IsTrue(result);
        }


        [TestMethod]
        public void DeleteEmployee_NotExistingEmployee_False()
        {
            // When
            var result = _employeeRepo.DeleteEmployee(100);

            // Then
            Assert.IsFalse(result);
        }

        [TestMethod]
        public void DeleteEmployee_ExistingTreatments_ThrowsException()
        {
            // When
            var ex = Assert.ThrowsException<Exception>(() => _employeeRepo.DeleteEmployee(1));

            // Then
            Assert.AreEqual("Trying to delete employee with existing treatments.", ex.Message);
        }
    }
}