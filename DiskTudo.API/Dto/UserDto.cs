using System.ComponentModel.DataAnnotations;

namespace DiskTudo.API.Dto
{
    public class UserDto
    {
        [Required(ErrorMessage="Campo deve ser preenchido")]
        public string UserName { get; set; }

        [Required(ErrorMessage="Campo deve ser preenchido")]
        public string  Password { get; set; }
        
        [Required(ErrorMessage="Campo deve ser preenchido")]
        public string FullName { get; set; }
        
        [Required(ErrorMessage="Campo deve ser preenchido")]
        [Phone]
        public string Telefone { get; set; }
        
        [Required(ErrorMessage="Campo deve ser preenchido")]
        [StringLength(200, MinimumLength = 5)]
        public string Endereco { get; set; }
        
    }
}