using System;
using System.Collections.Generic;
using DiskTudo.Domain.Identity;

namespace DiskTudo.Domain
{
    public class Pedido
    {
        public int Id { get; set; }
        public int Qtadade { get; set; }
        public DateTime Data { get; set; }
        public int? ClienteId { get; }

        public decimal ValorFinal { get; set; }

        public User User { get; }

        public List<ProdutoPedido> ProdutoPedido { get; set; }
    }
}