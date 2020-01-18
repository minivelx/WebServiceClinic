using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class ApplicationUser : IdentityUser
    {
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(20)]
        public string PersonalID { get; set; }

        public bool Active { get; set; }        
    }

    public class ApplicationRole : IdentityRole<string>
    {

    }

    public class IdentityUserClaim : IdentityUserClaim<string>
    {

    }

    public class IdentityUserLogin : IdentityUserLogin<string>
    {

    }

    public class ApplicationUserRole : IdentityUserRole<string>
    {

    }
}
