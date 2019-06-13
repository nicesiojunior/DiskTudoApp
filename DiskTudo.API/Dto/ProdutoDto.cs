using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DiskTudo.Domain;

namespace DiskTudo.API.Dto
{
    public class ProdutoDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage="Campo deve ser preenchido")]
        public string NomeProduto { get; set; }
        [Required(ErrorMessage="Campo deve ser preenchido")]
        public string Descricao { get; set; }
        [Required(ErrorMessage="Campo deve ser preenchido")]
        public decimal Valor { get; set; }
        public string ImagemURL { get; set; }
        public Categoria Categoria { get; }
        public List<PedidoDto> Pedido { get; set; }
    }
}