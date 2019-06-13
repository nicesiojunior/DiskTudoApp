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
    public class CategoriaController : ControllerBase
    {
        private readonly IDiskTudoRepository _repo;
        private readonly IMapper _mapper;

        public CategoriaController(IDiskTudoRepository repo, IMapper mapper)
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
                var categorias = await _repo.GetAllCategoriaAsync(true);

                var results = _mapper.Map<IEnumerable<CategoriaDto>>(categorias);

                return Ok(results);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

        }

        [HttpGet("{CategoriaId}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int CategoriaId)
        {

            try
            {
                var categoria = await _repo.GetAllCategoriaAsyncById(CategoriaId, true);
                var results = _mapper.Map<CategoriaDto>(categoria);
                return Ok(results);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

        }


        [HttpGet("getByName/{name}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(string name)
        {

            try
            {
                var categoria = await _repo.GetAllCategoriaAsyncByName(name, true);
                var results = _mapper.Map<IEnumerable<CategoriaDto>>(categoria);
                return Ok(results);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Post(CategoriaDto model)
        {

            try
            {
                var categoria = _mapper.Map<Categoria>(model);
                _repo.Add(categoria);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/categoria/{model.Id}", _mapper.Map<CategoriaDto>(categoria));
                }
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();

        }

        [HttpPut]
        public async Task<IActionResult> Put(int CategoriaId, CategoriaDto model)
        {

            try
            {

                var categoria = await _repo.GetAllPedidoAsyncById(CategoriaId, false);

                if (categoria == null) return NotFound();

                _mapper.Map(model, categoria);

                _repo.Update(categoria);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/categoria/{model.Id}", _mapper.Map<CategoriaDto>(categoria));
                }
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();

        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int CategoriaId)
        {

            try
            {

                var categoria = await _repo.GetAllCategoriaAsyncById(CategoriaId, false);

                if (categoria == null) return NotFound();

                _repo.Delete(categoria);

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