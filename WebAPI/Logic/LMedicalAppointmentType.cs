using Entities;
using Logic.Repository;
using System.Collections.Generic;
using System.Linq;

namespace Logic
{
    public class LMedicalAppointmentType
    {
        public static List<MedicalAppointmentType> GetAll(IGenericRepository<MedicalAppointmentType> repository)
        {
            var lstResult = repository.GetAll();
            return lstResult.ToList();
        }
    }
}
