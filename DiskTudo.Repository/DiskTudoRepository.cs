using System;
using System.Linq;
using System.Threading.Tasks;
using DiskTudo.Domain;
using DiskTudo.Domain.Identity;
using Microsoft.EntityFrameworkCore;

namespace DiskTudo.Repository
{
    public class DiskTudoRepository : IDiskTudoRepository
    {
        private readonly DiskTudoContext _context;

        public DiskTudoRepository(DiskTudoContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public async Task<Pedido[]> GetAllPedidoAsync(bool pedido)
        {
            IQueryable<Pedido> query = _context.Pedidos;

            if (pedido){
                query = query.AsNoTracking().OrderByDescending(c => c.Id);
            }

            return await query.ToArrayAsync();

        }

        public async Task<Pedido[]> GetAllPedidoAsyncById(int UserId, bool pedido = false)
        {
            IQueryable<Pedido> query = _context.Pedidos;

            if (pedido){
            }
            query = query.AsNoTracking().OrderByDescending(c => c.Id).Where(c => c.UserId == UserId);

            

            return await query.ToArrayAsync();
        }

        public async Task<Pedido> GetAllPedidoAsyncByData(DateTime data, bool pedido = false)
        {
            IQueryable<Pedido> query = _context.Pedidos.Include(c => c.UserId).Include(i => i.Item);

            if (pedido){
                query = query.AsNoTracking().OrderByDescending(c => c.DataHora).Where(c => c.DataHora == data);
            }

            

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Produto[]> GetAllProdutoAsyncByName(string name, bool produto = false)
        {
            IQueryable<Produto> query = _context.Produtos;

            if (produto){
                query = query.AsNoTracking().Where(c => c.NomeProduto.ToLower().Contains(name.ToLower()));
            }


            return await query.ToArrayAsync();
        }

        public async Task<Produto> GetAllProdutoAsyncById(int ProdutoId, bool produto = false)
        {
            IQueryable<Produto> query = _context.Produtos;

            if (produto){
            }
            
            query = query.AsNoTracking().OrderBy(c => c.NomeProduto).Where(c => c.Id == ProdutoId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Produto[]> GetAllProdutoAsync(bool produto = false)
        {
            IQueryable<Produto> query = _context.Produtos;

            if (produto){
                query = query.AsNoTracking().OrderBy(c => c.NomeProduto);
            }

            return await query.ToArrayAsync();

        }

        public async Task<Categoria[]> GetAllCategoriaAsync(bool categoria = false)
        {
            IQueryable<Categoria> query = _context.Categorias.Include(p => p.Produto);

            if (categoria){
                query = query.AsNoTracking().OrderBy(c => c.NomeCategoria);
            }

            return await query.ToArrayAsync();
        }

        public async Task<Categoria[]> GetAllCategoriaAsyncByName(string name, bool categoria = false)
        {
            IQueryable<Categoria> query = _context.Categorias.Include(p => p.Produto);

            if (categoria){
                query = query.AsNoTracking().OrderBy(c => c.NomeCategoria).Where(c => c.NomeCategoria == name);
            }
            
            return await query.ToArrayAsync();
        }

        public async Task<Categoria> GetAllCategoriaAsyncById(int CategoriaId, bool categoria = false)
        {
            IQueryable<Categoria> query = _context.Categorias.Include(p => p.Produto);

            if (categoria){
                query = query.AsNoTracking().OrderBy(c => c.NomeCategoria).Where(c => c.Id == CategoriaId);
            }
            
            return await query.FirstOrDefaultAsync();
        }

        public async Task<User> GetAllClienteAsyncById(int ClienteId, bool pedidoCliente = false)
        {
            IQueryable<User> query = _context.Users.Include(p => p.UserName);

            if (pedidoCliente){
                query = query.AsNoTracking().OrderBy(c => c.fullName).Where(c => c.Id == ClienteId);
            }
            
            return await query.FirstOrDefaultAsync();
        }

        public async Task<User[]> GetAllClienteAsync(bool pedidoCliente = false)
        {
            IQueryable<User> query = _context.Users.Include(p => p.Pedido);

            if (pedidoCliente){
                query = query.AsNoTracking().OrderBy(c => c.fullName);
            }

            return await query.ToArrayAsync();
        }

        public async Task<User[]> GetAllClienteAsyncByLogin(string Login, bool pedidoCliente = false)
        {
            IQueryable<User> query = _context.Users.Include(p => p.Pedido);

            if (pedidoCliente){
                query = query.AsNoTracking().Where(c => c.UserName == Login);
            }
            
            return await query.ToArrayAsync();
        }

    }
}