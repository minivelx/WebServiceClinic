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
    public class MedicalAppointmentController : Controller
    {
        private readonly GenericRepository<MedicalAppointment> _repository;

        public MedicalAppointmentController(GenericRepository<MedicalAppointment> repository)
        {
            _repository = repository;
        }

        // GET: api/MedicalAppointment
        [HttpGet]
        public async Task<IActionResult> GetMedicalAppointmentsByUser()
        {
            try
            {
                return Json(new { success = true, message = LMedicalAppointment.GetMedicalAppointmentsByUser(User.getUserId(), _repository) });
            }
            catch (Exception exc)
            {
                string ErrorMsg = exc.GetBaseException().InnerException != null ? exc.GetBaseException().InnerException.Message : exc.GetBaseException().Message;
                return Json(new { success = false, message = "Error!. " + ErrorMsg });
            }
        }

    }
}
