using Entities;
using Logic.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Logic
{
    public class LMedicalAppointment
    {
        public static MedicalAppointment GetMedicalAppointmentById(int id, IGenericRepository<MedicalAppointment> repository)
        {
            var result = repository.Find(x => x.Id == id).FirstOrDefault();
            return result;
        }

        public static List<MedicalAppointment> GetMedicalAppointmentsByUser(string userId, IGenericRepository<MedicalAppointment> repository)
        {
            var lstResult = repository.Find(x=> x.UserId == userId && x.Active, x=> x.MedicalAppointmentType);
            return lstResult.ToList();
        }

        public static void SaveMedicalAppointment(MedicalAppointment entity, IGenericRepository<MedicalAppointment> repository,
            IUnitOfWork unitOfWork)
        {
            ValidateDateMedicalAppointment(entity, repository);
            repository.Add(entity);
            unitOfWork.Commit();
        }

        public static void CancelMedicalAppointment(MedicalAppointment entity, IGenericRepository<MedicalAppointment> repository,
            IUnitOfWork unitOfWork)
        {
            ValidateCancelMedicalAppointment(entity, repository);
            entity.Active = false;
            repository.Edit(entity);
            unitOfWork.Commit();
        }

        private static void ValidateCancelMedicalAppointment(MedicalAppointment entity, IGenericRepository<MedicalAppointment> repository)
        {
            if ((entity.Date - DateTime.Now).TotalSeconds <= 24 * 60 * 60)
                throw new ArgumentException("Las citas deben cancelarse con al menos 24 horas de antelación.", "Date" );
        }

        private static void ValidateDateMedicalAppointment(MedicalAppointment entity, IGenericRepository<MedicalAppointment> repository)
        {
            var medicalAppointments = GetMedicalAppointmentsByUser(entity.UserId, repository);

            if (medicalAppointments.Any(x=> x.Date.Date == entity.Date.Date))            
                throw new ArgumentException("Ya ha registrado una cita para el día seleccionado.", "Date");

            if (entity.Date < DateTime.Now)
                throw new ArgumentException("Ingrese una fecha y hora posterior a la actual", "Date");
        }
    }
}
