using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Logic.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly IUnitOfWork _unitOfWork;

        public GenericRepository(IUnitOfWork UnitOfWork)
        {
            _unitOfWork = UnitOfWork;
        }

        public void Add(T entity)
        {
            _unitOfWork._context.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            _unitOfWork._context.Set<T>().Remove(entity);
        }

        public void Edit(T entity)
        {
            _unitOfWork._context.Entry(entity).State = EntityState.Modified;
        }

        //public IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
        //{
        //    return _unitOfWork._context.Set<T>().Where(predicate);
        //}

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = _unitOfWork._context.Set<T>();
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return query.Where(predicate);
        }

        public IEnumerable<T> GetAll()
        {
            return _unitOfWork._context.Set<T>().ToList();
        }
        
    }
}
