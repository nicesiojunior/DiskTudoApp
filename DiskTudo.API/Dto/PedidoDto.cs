using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DiskTudo.API.Dto
{
    public class PedidoDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage="Campo deve ser preenchido")]
        [Range(1, 100)]
        
        public int Qtadade { get; set; }
        public string Data { get; set; }
        public decimal ValorFinal { get; set; }
        public UserDto User { get; }
        public List<ProdutoDto> Produto { get; set; }
    }
}