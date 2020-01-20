using Entities;

namespace Logic.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        public ApplicationDbContext _context { get; }

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
