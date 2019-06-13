using DiskTudo.Domain;
using DiskTudo.Domain.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DiskTudo.Repository
{
    public class DiskTudoContext: IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DiskTudoContext(DbContextOptions<DiskTudoContext> options):base (options){

        }
        public DbSet<Produto>Produtos{get;set;}
        public DbSet<Cliente>Clientes{get;set;}
        public DbSet<Pedido>Pedidos{get;set;}
        public DbSet<Categoria>Categorias{get;set;}
        public DbSet<ProdutoPedido>ProdutoPedidos{get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>(userRole =>
                {
                    userRole.HasKey(ur => new {ur.RoleId, ur.UserId});
                
                    userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                    userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
                
                }
            );

            modelBuilder.Entity<ProdutoPedido>()
            .HasKey(PE => new {PE.ProdutoId, PE.PedidoId});
        }
    }
}