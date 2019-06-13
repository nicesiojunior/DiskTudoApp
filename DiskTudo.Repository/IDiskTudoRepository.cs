using System;
using System.Threading.Tasks;
using DiskTudo.Domain;
using DiskTudo.Domain.Identity;

namespace DiskTudo.Repository
{
    public interface IDiskTudoRepository
    {
         void Add <T>(T entity) where T: class;

         void Update <T>(T entity) where T: class;
         void Delete <T>(T entity) where T: class;
         Task <bool> SaveChangesAsync();

         Task<Pedido[]> GetAllPedidoAsync(bool includeProduto);
         Task<Pedido> GetAllPedidoAsyncById(int Id, bool includeProduto);
         Task<Pedido> GetAllPedidoAsyncByData(DateTime data, bool includeProduto);
         Task<Produto> GetAllProdutoAsyncById(int Id, bool includePedido);
         Task<Produto[]> GetAllProdutoAsync(bool includePedido);         
         Task<Produto[]> GetAllProdutoAsyncByName(string name, bool includePedido);
         Task<Categoria[]> GetAllCategoriaAsync(bool includePedido);
         Task<Categoria[]> GetAllCategoriaAsyncByName(string name, bool categoria);
         Task<Categoria> GetAllCategoriaAsyncById(int Id, bool categoria);
         Task<User[]> GetAllClienteAsync(bool clientePedido);
         Task<User> GetAllClienteAsyncById(int Id, bool clientePedido);
         Task<User[]> GetAllClienteAsyncByLogin(string Login, bool clientePedido);
    }
}