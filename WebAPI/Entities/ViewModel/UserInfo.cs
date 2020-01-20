using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class UserInfo
    {
        public string Id { get; set; }
        [Required(ErrorMessage = "Se requiere el campo de Identificación personal")]
        public string PersonalId { get; set; }
        [Required(ErrorMessage = "Se requiere una contraseña")]
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
