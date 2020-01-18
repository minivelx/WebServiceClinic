using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class MedicalAppointmentType
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Se requiere agregar una descripción"), StringLength(40, ErrorMessage = "La descripción no debe tener más de {1} caracteres.")]
        public string Description { get; set; }
    }
}
