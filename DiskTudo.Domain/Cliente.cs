using System.Collections.Generic;

namespace DiskTudo.Domain
{
    public class Cliente
    {
        public int Id { get; set; }
        public string NomeCliente { get; set; }
        public string Endereco { get; set; }
        public string Telefone { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public List<Pedido> Pedido { get; set; }
    }
}