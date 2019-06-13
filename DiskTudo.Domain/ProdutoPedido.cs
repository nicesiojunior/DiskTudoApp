namespace DiskTudo.Domain
{
    public class ProdutoPedido
    {
        public int ProdutoId { get; set; }
        public Produto Produto { get; set; }
        public int PedidoId { get; set; }
        public Pedido Pedido { get; set; }
    }
}