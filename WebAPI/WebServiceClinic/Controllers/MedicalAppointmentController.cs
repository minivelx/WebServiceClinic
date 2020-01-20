using System;
using System.Threading.Tasks;
using Entities;
using Logic;
using Logic.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebServiceClinic.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MedicalAppointmentController : Controller
    {
        private readonly IGenericRepository<MedicalAppointment> _repository;
        private readonly IUnitOfWork _IunitOfWork;

        public MedicalAppointmentController(IGenericRepository<MedicalAppointment> repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _IunitOfWork = unitOfWork;
        }

        // GET: api/MedicalAppointment
        [HttpGet]
        public async Task<IActionResult> GetMedicalAppointmentsByUser()
        {
            try
            {
                var userId = User.getUserId();
                return Json(new { success = true, message = LMedicalAppointment.GetMedicalAppointmentsByUser(userId, _repository) });
            }
            catch (Exception exc)
            {
                string ErrorMsg = exc.GetBaseException().InnerException != null ? exc.GetBaseException().InnerException.Message : exc.GetBaseException().Message;
                return Json(new { success = false, message = "Error!. " + ErrorMsg });
            }
        }

        // GET: api/MedicalAppointment
        [HttpPost]
        public async Task<IActionResult> SaveMedicalAppointment([FromBody] MedicalAppointment entity)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, message = ErrorModelValidation.ShowError(new SerializableError(ModelState).Values) });
            }

            try
            {
                entity.UserId = User.getUserId();
                entity.Active = true;
                LMedicalAppointment.SaveMedicalAppointment(entity, _repository, _IunitOfWork);
                return Json(new { success = true, message = "Registro guardado correctamente." });
            }
            catch (Exception exc)
            {
                string ErrorMsg = exc.GetBaseException().InnerException != null ? exc.GetBaseException().InnerException.Message : exc.GetBaseException().Message;
                return Json(new { success = false, message = "Error!. " + ErrorMsg });
            }
        }

        // GET: api/MedicalAppointment
        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelMedicalAppointment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, message = ErrorModelValidation.ShowError(new SerializableError(ModelState).Values) });
            }

            try
            {
                var entity = LMedicalAppointment.GetMedicalAppointmentById(id, _repository);

                if (entity == null)
                    Json(new { success = false, message = "No se pudo encontrar el registro indicado." });

                LMedicalAppointment.CancelMedicalAppointment(entity, _repository, _IunitOfWork);
                return Json(new { success = true, message = "Registro cancelado correctamente." });
            }
            catch (Exception exc)
            {
                string ErrorMsg = exc.GetBaseException().InnerException != null ? exc.GetBaseException().InnerException.Message : exc.GetBaseException().Message;
                return Json(new { success = false, message = "Error!. " + ErrorMsg });
            }
        }

    }
}
