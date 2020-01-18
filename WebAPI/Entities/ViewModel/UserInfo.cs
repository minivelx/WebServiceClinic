using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class UserInfo
    {
        public string Id { get; set; }
        [Required(ErrorMessage = "Se requiere el campo {0}")]
        public string PersonalId { get; set; }
        [Required(ErrorMessage = "Se requiere una contraseña")]
        public string Password { get; set; }
        public string Name { get; set; }        
        public string PersonalID { get; set; }
    }
}
