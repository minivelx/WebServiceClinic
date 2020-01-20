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
    public class MedicalAppointmentTypeController : Controller
    {
        private readonly IGenericRepository<MedicalAppointmentType> _repository;
        private readonly IUnitOfWork _IunitOfWork;

        public MedicalAppointmentTypeController(IGenericRepository<MedicalAppointmentType> repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _IunitOfWork = unitOfWork;
        }

        // GET: api/MedicalAppointmentType
        [HttpGet]
        public async Task<IActionResult> GetMedicalAppointmentTypes()
        {
            try
            {
                return Json(new { success = true, message = LMedicalAppointmentType.GetAll(_repository) });
            }
            catch (Exception exc)
            {
                string ErrorMsg = exc.GetBaseException().InnerException != null ? exc.GetBaseException().InnerException.Message : exc.GetBaseException().Message;
                return Json(new { success = false, message = "Error!. " + ErrorMsg });
            }
        }
    }
}
