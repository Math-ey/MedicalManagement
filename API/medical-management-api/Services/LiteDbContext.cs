using System;
using Eu.InCloud.Medical.Management.Models;
using LiteDB;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Eu.InCloud.Medical.Management.Services
{
    public class LiteDbContext : ILiteDbContext
    {
        public LiteDatabase Database { get; }
        
        public LiteDbContext(IConfiguration config)
        {
            var options = config.GetSection("LiteDbOptions:DatabaseLocation").Value;
            Database = new LiteDatabase(options);
        }
    }

    public class LiteDbContextTest : ILiteDbContext
    {
        public LiteDatabase Database { get; }

        public LiteDbContextTest()
        {
            Database = new LiteDatabase("LiteDb.db");
        }
    }
}