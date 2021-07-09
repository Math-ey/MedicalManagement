using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eu.InCloud.Medical.Management.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Eu.InCloud.Medical.Management.Seed;
using Microsoft.AspNetCore;

namespace Eu.InCloud.Medical.Management
{
    /// <summary>
    /// Program
    /// </summary>
    public class Program
    {
        /// <summary>
        /// Main
        /// </summary>
        /// <param name="args"></param>
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<ILiteDbContext>();
                    Seed.Seed.SeedEmployees(context);
                    Seed.Seed.SeedTreatments(context);

                    Seed.Seed.SeedEnumMaritalStatus(context);
                    Seed.Seed.SeedEnumEducationalLevel(context);
                    Seed.Seed.SeedEnumGenders(context);
                    Seed.Seed.SeedEnumRoles(context);
                    Seed.Seed.SeedEnumTreatmentStatus(context);
                    Seed.Seed.SeedEnumTreatmentTypes(context);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occured during migration");
                }
            }


            host.Run();
        }

        /// <summary>
        /// Create the web host builder.
        /// </summary>
        /// <param name="args"></param>
        /// <returns>IWebHostBuilder</returns>
        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseUrls("http://*:8080");
    }
}
