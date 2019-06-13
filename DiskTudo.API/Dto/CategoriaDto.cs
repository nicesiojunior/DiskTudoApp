using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DiskTudo.API.Dto
{
    public class CategoriaDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage="Campo deve ser preenchido")]
        public string NomeCategoria { get; set; }
        public List<ProdutoDto> Produtos { get; set; }
        
    }
}