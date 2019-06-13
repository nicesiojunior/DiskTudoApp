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

    public class ProdutoController : ControllerBase
    {
        private readonly IDiskTudoRepository _repo;
        private readonly IMapper _mapper;

        public ProdutoController(IDiskTudoRepository repo, IMapper mapper)
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
                var produtos = await _repo.GetAllProdutoAsync(true);
                var results = _mapper.Map<IEnumerable<ProdutoDto>>(produtos);
                return Ok(results);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

        }

        [HttpGet("{ProdutoId}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int ProdutoId)
        {

            try
            {
                var produto = await _repo.GetAllProdutoAsyncById(ProdutoId, true);
                var results = _mapper.Map<ProdutoDto>(produto);
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
                var produto = await _repo.GetAllProdutoAsyncByName(name, true);
                var results = _mapper.Map<ProdutoDto[]>(produto);
                return Ok(results);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Post(ProdutoDto model)
        {

            try
            {
                var produto = _mapper.Map<Produto>(model);
                _repo.Add(produto);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/produto/{model.Id}", _mapper.Map<ProdutoDto>(produto));
                }
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();

        }

        [HttpPut]
        public async Task<IActionResult> Put(int ProdutoId, Produto model)
        {

            try
            {

                var produto = await _repo.GetAllProdutoAsyncById(ProdutoId, false);

                if (produto == null) return NotFound();

                _mapper.Map(model, produto);

                _repo.Update(produto);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/produto/{model.Id}", _mapper.Map<ProdutoDto>(produto));
                }
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();

        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int ProdutoId)
        {

            try
            {

                var produto = await _repo.GetAllProdutoAsyncById(ProdutoId, false);

                if (produto == null) return NotFound();

                _repo.Delete(produto);

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