using System.Collections.Generic;

namespace DiskTudo.Domain
{
    public class Produto
    {
        public int Id { get; set; }
        public string NomeProduto { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public string ImagemURL { get; set; }
        public int? CategoriaId { get; set; }
        public Categoria Categoria { get; }

        public List<ProdutoPedido> ProdutoPedido { get; set; }
    }
}