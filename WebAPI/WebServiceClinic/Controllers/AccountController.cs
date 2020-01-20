using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Entities;
using Entities.ViewModel;
using System.Text;

namespace WebServiceClinic.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Produces("application/json")]
    [Route("administration/Account")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<ApplicationRole> _rolManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AccountController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<ApplicationRole> rolManager,
            ApplicationDbContext context,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _rolManager = rolManager;
            _configuration = configuration;
            _context = context;
        }
        
        [AllowAnonymous]
        [Route("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserInfo model)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, message = ErrorModelValidation.ShowError(new SerializableError(ModelState).Values) });
            }

            try
            {
                var user = new ApplicationUser { UserName = model.PersonalId, Name = model.Name, Email = model.Email, PhoneNumber = model.PhoneNumber,  PersonalID = model.PersonalId, Active = true };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    _userManager.Dispose();
                    return Json(new { success = true, message = "Usuario creado correctamente." });
                }
                else
                {
                    string ErrorMsj = "";
                    result.Errors.ToList().ForEach(x => ErrorMsj +=x.Code);
                    return Json(new { success = false, message = ErrorMsj });
                }
            }
            catch (Exception exc)
            {
                string ErrorMsg = exc.GetBaseException().InnerException != null ? exc.GetBaseException().InnerException.Message : exc.GetBaseException().Message;
                return Json(new { success = false, message = "Error!. " + ErrorMsg });
            }
        }       
          
        [Route("ChangePassword")] 
        [HttpPost]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, message = ErrorModelValidation.ShowError(new SerializableError(ModelState).Values) });
            }

            try
            {
                string Id = User.getUserId();
                if (Id == null)
                    return Json(new { success = false, message = "Usuario no identificado, intente loguearse nuevamente." });

                var usuarioActual = _userManager.FindByIdAsync(Id).Result;

                if (usuarioActual != null)
                {

                    var result = await _userManager.ChangePasswordAsync(usuarioActual, model.OldPassword, model.NewPassword);

                    if (result.Succeeded)
                    {
                        return Json(new { success = true, message = "Contraseña cambiada satisfactoriamente." });
                    }
                    else
                    {
                        return Json(new { success = false, message = "La contraseña antigua es incorrecta." });
                    }
                }
                else
                {
                    return Json(new { success = false, message = "El usuario no se encuentra logueado." });
                }
            }
            catch (Exception exc)
            {
                string ErrorMsg = exc.GetBaseException().InnerException != null ? exc.GetBaseException().InnerException.Message : exc.GetBaseException().Message;
                return Json(new { success = false, message = ErrorMsg });
            }
        }        
        
        [Route("ForcePassword")] 
        [HttpPost]
        public async Task<ActionResult> ForcePassword([FromBody] EditPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, message = ErrorModelValidation.ShowError(new SerializableError(ModelState).Values) });
            }

            try
            {
                var user = _userManager.FindByIdAsync(model.Id).Result;
                var Token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var result = await _userManager.ResetPasswordAsync(user, Token, model.Password);

                if (result.Succeeded)
                {
                    return Json(new { success = true, message = "La contraseña se ha cambiado satisfactoriamente." });
                }
                else
                {
                    string ErrorMsj = "";
                    result.Errors.ToList().ForEach(x => ErrorMsj += x.Code);
                    return Json(new { success = false, message = ErrorMsj });
                }
            }
            catch (Exception excError)
            {
                return Json(new { success = false, message = excError.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserInfo userInfo)
        {
            try
            {
                var usuario = userInfo.Email.Contains('@') ? _userManager.FindByEmailAsync(userInfo.Email).Result : _userManager.FindByNameAsync(userInfo.Email).Result;

                if (usuario == null)
                    return Json(new { success = false, message = "Usuario o contraseña invalido." });

                var result = await _signInManager.PasswordSignInAsync(usuario, userInfo.Password, isPersistent: false, lockoutOnFailure: false);

                if (!result.Succeeded)
                {
                    return Json(new { success = false, message = "Usuario o contraseña invalido." });
                }

                return BuildToken(userInfo);
            }
            catch (Exception exc)
            {
                string ErrorMsg = exc.GetBaseException().InnerException != null ? exc.GetBaseException().InnerException.Message : exc.GetBaseException().Message;
                return Json(new { success = false, message = "Error! " + ErrorMsg });
            }
        }

        private IActionResult BuildToken(UserInfo userInfo)
        {
            try
            {
                ApplicationUser Usuario;
                // Adding roles code
                // Roles property is string collection but you can modify Select code if it it's not 
                if (userInfo.Email.Contains('@'))
                    Usuario = _userManager.FindByEmailAsync(userInfo.Email).Result;
                else
                    Usuario = _userManager.FindByNameAsync(userInfo.Email).Result;

                var roles = _userManager.GetRolesAsync(Usuario).Result;

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.UniqueName, userInfo.Email),
                    new Claim(ClaimTypes.NameIdentifier, Usuario.Id), 
                    new Claim(ClaimTypes.GivenName, Usuario.Name), 
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token");
                claimsIdentity.AddClaims(roles.Select(role => new Claim(ClaimTypes.Role, role)));

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetConnectionString("Key").ToString()));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var expiration = DateTime.UtcNow.AddDays(1);
                var codigos = claimsIdentity.Claims;

                JwtSecurityToken token = new JwtSecurityToken(
                   issuer: _configuration.GetConnectionString("serverDomain"),
                   audience: _configuration.GetConnectionString("serverDomain"),
                   claims: claimsIdentity.Claims,
                   expires: expiration,
                   signingCredentials: creds);

                return Ok(new
                {
                    success = true,
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = expiration,
                    nombre = Usuario.Name,
                    id = Usuario.Id
                });
            }
            catch (Exception exc)
            {
                string ErrorMsg = exc.GetBaseException().InnerException != null ? exc.GetBaseException().InnerException.Message : exc.GetBaseException().Message;
                return Json(new { success = false, message = "Error! " + ErrorMsg });
            }
        }
        
    }
}