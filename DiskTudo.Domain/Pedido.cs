using System;
using System.Collections.Generic;
using DiskTudo.Domain.Identity;

namespace DiskTudo.Domain
{
    public class Pedido
    {
        public int Id { get; set; }
        public DateTime DataHora { get; set; }
        public int UserId { get; set; }

        public decimal ValorTotal { get; set; }

        public string Item { get; set; }
        public string Endereco { get; set; }
        public string Telefone { get; set; }
    }
}