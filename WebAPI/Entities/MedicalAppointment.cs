using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities
{
    public class MedicalAppointment
    {
        [Key]
        public int Id { get; set; }

        [Required, ForeignKey("MedicalAppointmentType")]
        public int IdMedicalAppointmentType { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [StringLength(450)]
        public string UserId { get; set; }

        [Required]
        public bool Active { get; set; }

        [NotMapped]
        public string NameType { get { return MedicalAppointmentType?.Description ?? ""; } }

        [JsonIgnore]
        public MedicalAppointmentType MedicalAppointmentType { get; set; }
    }
}
