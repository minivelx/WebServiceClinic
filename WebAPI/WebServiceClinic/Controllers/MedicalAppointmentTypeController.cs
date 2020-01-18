using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Logic;
using Logic.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebServiceClinic.Controllers
{
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MedicalAppointmentTypeController : Controller
    {
        private readonly GenericRepository<MedicalAppointmentType> _repository;

        public MedicalAppointmentTypeController(GenericRepository<MedicalAppointmentType> repository)
        {
            _repository = repository;
        }

        // GET: api/MedicalAppointmentType
        [HttpGet]
        public async Task<IActionResult> GetMedicalAppointmentTypesByUser()
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
