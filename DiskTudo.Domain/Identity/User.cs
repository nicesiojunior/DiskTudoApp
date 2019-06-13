using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace DiskTudo.Domain.Identity
{
    public class User: IdentityUser<int>
    {
        [Column(TypeName = "nvarchar(150)")]
        public string fullName { get; set; }
        public string Telefone { get; set; }
        public string Endereco { get; set; }
        public List<Pedido> Pedido { get; set; }
        public List<UserRole> UserRoles { get; set; }
    }
}