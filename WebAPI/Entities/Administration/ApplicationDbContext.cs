using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Entities
{
    public class ApplicationDbContext : IdentityDbContext
        <   ApplicationUser, // TUser
            ApplicationRole, // TRole
            string, // TKey
            IdentityUserClaim<string>, // TUserClaim
            ApplicationUserRole, // TUserRole,
            IdentityUserLogin<string>, // TUserLogin
            IdentityRoleClaim<string>, // TRoleClaim
            IdentityUserToken<string> // TUserToken
        >
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        //Entities to SQL Tables
        public DbSet<MedicalAppointmentType> MedicalAppointmentType { get; set; }
        public DbSet<MedicalAppointment> MedicalAppointment { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {            
            base.OnModelCreating(modelBuilder);

            //Seed Data
            var medicalAppointmentType1 = new MedicalAppointmentType() { Id = 1, Description = "Medicina General" };
            var medicalAppointmentType2 = new MedicalAppointmentType() { Id = 2, Description = "Odontología" };
            var medicalAppointmentType3 = new MedicalAppointmentType() { Id = 3, Description = "Pediatría" };
            var medicalAppointmentType4 = new MedicalAppointmentType() { Id = 4, Description = "Neurología" };

            modelBuilder.Entity<MedicalAppointmentType>().HasData(medicalAppointmentType1);
            modelBuilder.Entity<MedicalAppointmentType>().HasData(medicalAppointmentType2);
            modelBuilder.Entity<MedicalAppointmentType>().HasData(medicalAppointmentType3);
            modelBuilder.Entity<MedicalAppointmentType>().HasData(medicalAppointmentType4);

            //Custom Identity Tables
            modelBuilder.Entity<ApplicationUser>().ToTable("Users");
            modelBuilder.Entity<ApplicationRole>().ToTable("Roles");
            modelBuilder.Entity<ApplicationUserRole>().ToTable("RolesUsers");
        }
    }
}
