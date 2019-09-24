using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DiskTudo.API.Dto;
using DiskTudo.Domain;
using DiskTudo.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net.Http.Headers;

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

        [HttpPost("upload")]
        [AllowAnonymous]
        public async Task<IActionResult> upload()
        {

            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0){
                    var filename = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
                    var fullPath = Path.Combine(pathToSave, filename.Replace("\"", " ").Trim());

                    using (var stream = new FileStream(fullPath, FileMode.Create)){
                        file.CopyTo(stream);
                    } 
                }
                return Ok();

            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            return BadRequest("Erro ao carregar imagem");

        }

        [HttpGet("{Id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int Id)
        {

            try
            {
                var produto = await _repo.GetAllProdutoAsyncById(Id, true);
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

        [HttpPut("{Id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Put(int Id, ProdutoDto model)
        {

            try
            {

                var produto = await _repo.GetAllProdutoAsyncById(Id, false);

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

        [HttpDelete("{Id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Delete(int Id)
        {

            try
            {

                var produto = await _repo.GetAllProdutoAsyncById(Id, false);

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