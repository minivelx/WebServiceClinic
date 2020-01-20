using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Logic.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> Find(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
        void Add(T entity);
        void Delete(T entity);
        void Edit(T entity);      
    }
}
