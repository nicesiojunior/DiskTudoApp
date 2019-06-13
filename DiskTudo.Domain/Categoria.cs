using System.Collections.Generic;

namespace DiskTudo.Domain
{
    public class Categoria
    {
        public int Id { get; set; }
        public string NomeCategoria { get; set; }
        public List<Produto> Produto { get; set; }
    }
}