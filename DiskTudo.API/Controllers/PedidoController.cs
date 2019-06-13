using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DiskTudo.API.Dto;
using DiskTudo.Domain;
using DiskTudo.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DiskTudo.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly IDiskTudoRepository _repo;
        private readonly IMapper _mapper;

        public PedidoController(IDiskTudoRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {

            try
            {
                var pedidos = await _repo.GetAllPedidoAsync(true);
                var results = _mapper.Map<IEnumerable<PedidoDto>>(pedidos);
                return Ok(results);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

        }

        [HttpGet("{PedidoId}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int PedidoId)
        {

            try
            {
                var pedido = await _repo.GetAllPedidoAsyncById(PedidoId, true);
                var results = _mapper.Map<PedidoDto>(pedido);
                return Ok(results);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

        }

        [HttpGet("getByData/{data}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(DateTime data)
        {

            try
            {
                var pedido = await _repo.GetAllPedidoAsyncByData(data, true);
                var results = _mapper.Map<Pedido[]>(pedido);
                return Ok(results);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Post(PedidoDto model)
        {

            try
            {
                var pedido = _mapper.Map<Pedido>(model);
                _repo.Add(pedido);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/pedido/{model.Id}", _mapper.Map<PedidoDto>(pedido));
                }
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();

        }

        [HttpPut]
        [AllowAnonymous]
        public async Task<IActionResult> Put(int PedidoId, Produto model)
        {

            try
            {

                var pedido = await _repo.GetAllPedidoAsyncById(PedidoId, false);

                if (pedido == null) return NotFound();

                _mapper.Map(model, pedido);

                _repo.Update(pedido);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/produto/{model.Id}", _mapper.Map<PedidoDto>(pedido));
                }
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();

        }

        [HttpDelete]
        [AllowAnonymous]
        public async Task<IActionResult> Delete(int PedidoId)
        {

            try
            {

                var pedido = await _repo.GetAllPedidoAsyncById(PedidoId, false);

                if (pedido == null) return NotFound();

                _repo.Delete(pedido);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();

        }


    }
}