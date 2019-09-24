using DiskTudo.API.Dto;
using DiskTudo.Domain.Identity;
using AutoMapper;
using DiskTudo.Domain;
using System.Linq;

namespace DiskTudo.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Produto, ProdutoDto>().ReverseMap();
            CreateMap<Pedido, PedidoDto>().ReverseMap();
            CreateMap<Categoria, CategoriaDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();  
            CreateMap<User, UserLoginDto>().ReverseMap();     
        }
    }
}