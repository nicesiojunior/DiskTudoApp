using System.ComponentModel.DataAnnotations;

namespace DiskTudo.API.Dto
{
    public class UserAdminDto
    {
        [Required(ErrorMessage="Campo deve ser preenchido")]
        public string UserName { get; set; }

        [Required(ErrorMessage="Campo deve ser preenchido")]
        public string  Password { get; set; }
    }
}