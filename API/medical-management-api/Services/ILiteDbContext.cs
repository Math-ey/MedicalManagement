using LiteDB;

namespace Eu.InCloud.Medical.Management.Services
{
    public interface ILiteDbContext
    {
        LiteDatabase Database { get; }
    }
}