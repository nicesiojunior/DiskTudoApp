using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DiskTudo.API.Dto
{
    public class PedidoDto{
        public int Id { get; set; }
        public string DataHora { get; set; }
        public decimal ValorTotal { get; set; }
        public int UserId { get; set; }
        public string Item { get; set; }
        [Required(ErrorMessage="Campo deve ser preenchido")]
        [StringLength(200, MinimumLength = 5)]
        public string Endereco { get; set; }
        [Required(ErrorMessage="Campo deve ser preenchido")]
        [Phone]
        public string Telefone { get; set; }
    }
}