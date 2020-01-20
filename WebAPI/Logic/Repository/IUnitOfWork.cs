using Entities;
using System;

namespace Logic.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        ApplicationDbContext _context { get; }
        void Commit();
    }
}
