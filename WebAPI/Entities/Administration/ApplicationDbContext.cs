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

        //Entities to SQL Table
        //public DbSet<Entity> Entity { get; set; }

        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {            
            base.OnModelCreating(modelBuilder);

            //Custom Identity Tables
            modelBuilder.Entity<ApplicationUser>().ToTable("Users");
            modelBuilder.Entity<ApplicationRole>().ToTable("Roles");
            modelBuilder.Entity<ApplicationUserRole>().ToTable("RolesUsers");
        }
    }
}
