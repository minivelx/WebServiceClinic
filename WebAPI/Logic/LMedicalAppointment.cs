using Entities;
using Logic.Repository;
using System.Collections.Generic;
using System.Linq;

namespace Logic
{
    public class LMedicalAppointment
    {
        //public static List<MedicalAppointment> GetMedicalAppointmentsByUser(string userId, ApplicationDbContext _context)
        //{
        //    return _context.MedicalAppointment.Where(x => x.UserId == userId).ToList();
        //}

        public static List<MedicalAppointment> GetMedicalAppointmentsByUser(string userId, GenericRepository<MedicalAppointment> repository)
        {
            return repository.Find(x => x.UserId == userId).ToList();
        }        
    }
}
