using Entities;
using Logic.Repository;
using System.Collections.Generic;
using System.Linq;

namespace Logic
{
    public class LMedicalAppointmentType
    {
        public static List<MedicalAppointmentType> GetAll(GenericRepository<MedicalAppointmentType> repository)
        {
            return repository.GetAll().ToList();
        }
    }
}
