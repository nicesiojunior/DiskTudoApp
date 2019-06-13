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
            CreateMap<Produto, ProdutoDto>()
                .ForMember(dest => dest.Pedido, opt => {
                    opt.MapFrom(src => src.ProdutoPedido.Select(x => x.Pedido).ToList());
                }).ReverseMap();
            CreateMap<Pedido, PedidoDto>().ForMember(dest => dest.Produto, opt => {
                    opt.MapFrom(src => src.ProdutoPedido.Select(x => x.Produto).ToList());
                }).ReverseMap();
            CreateMap<Categoria, CategoriaDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();  
            CreateMap<User, UserLoginDto>().ReverseMap();     
        }
    }
}