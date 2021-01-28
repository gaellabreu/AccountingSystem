using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SistemaContableWeb.Lib.Class;
using SistemaContableWeb.Models.Financial;
using Microsoft.AspNetCore.Http;

namespace SistemaContableWeb.Controllers
{
    [ApiController]
    public class FinancialController : ControllerBase
    {
        Financial financial;
        
        public FinancialController()
        {
            financial = new Financial("test");
        }
        
        [Route("api/Financial/Index")]
        public IActionResult Index()
        {
            return Ok();
        }


        [Route("api/Financial/Listcategory")]
        [HttpGet]
        public IActionResult Listcategory()
        {
            try
            {
                var list = financial.Listcategory();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/Financial/categoryexists")]
        [HttpGet]
        public IActionResult categoryexists(string descripcion)
        {
            try
            {
                var exis = financial.categoryexists(descripcion);
                return Ok(exis);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/Financial/AddCategory")]
        [HttpPost]
        public IActionResult AddCategory(categoriascuentas add)
        {
            try
            {
                financial.AddCategory(add);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/Financial/EditCategory")]
        [HttpPost]
        public IActionResult EditCategory(categoriascuentas edit)
        {
            try
            {
                financial.EditCategory(edit);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("api/Financial/DeleteCategory")]
        [HttpPost]
        public IActionResult DeleteCategory(categoriascuentas edit)
        {
            try
            {
                financial.DeleteCategory(edit);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        ///**********************************Account Master***********************************
        ///***********************************************************************************
        [Route("api/Financial/Listaccounts")]
        [HttpGet]
        public IActionResult Listaccounts()
        {
            try
            {
                var list = financial.Listaccounts();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/Financial/GetDataAccount")]
        [HttpGet]
        public IActionResult GetDataAccount(int idcuenta)
        {
            try
            {
                var dataA = financial.GetDataAccount(idcuenta);
                if (dataA != null)
                {
                    return Ok(dataA);   
                }
                else return BadRequest("No data");
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/Financial/AddAccount")]
        [HttpPost]
        public IActionResult AddAccount(cuentascontables add) 
        {
            try
            {
                add.usuario = HttpContext.Session.GetString("username");
                financial.AddAccount(add);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/Financial/EditAccount")]
        [HttpPost]
        public IActionResult EditAccount(cuentascontables edit)
        {
            try
            {
                edit.usuario = HttpContext.Session.GetString("username");
                financial.EditAccount(edit);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("api/Financial/DeleteAccount")]
        [HttpPost]
        public IActionResult DeleteAccount(cuentascontables del)
        {
            try
            {
                financial.DeleteAccount(del);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("api/Financial/searchAccounts")]
        [HttpGet]
        public IActionResult SearchAccounts(string term)
        {
            try
            {
                return Ok(financial.SearchAccounts(term));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        //************************PERIODOS****************************
        [Route("api/Financial/ListPeriod")]
        [HttpGet]
        public IActionResult ListPeriod(int year)
        {
            try
            {
                var data = financial.ListPeriod(year);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/Financial/ValidFiscalPeriod")]
        [HttpGet]
        public IActionResult ValidFiscalPeriod(DateTime fechaDoc, int modulo)
        {
            try
            {
               var data = !financial.ValidFiscalPeriod(fechaDoc.Date,modulo);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/Financial/SavePeriod")]
        [HttpPost]
        public IActionResult SavePeriod(List<periodosfiscales> periods)
        {
            try
            {
                financial.SavePeriod(periods);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //**************************TASA CAMBIO*******************************
        [Route("api/Financial/GetExchangerate")]
        [HttpGet]
        public IActionResult GetExchangerate(string idmoneda, DateTime docdate)
        {
            try
            {
               var data= financial.GetExchangerate(idmoneda, docdate);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/Financial/ExistExchangerate")]
        [HttpGet]
        public IActionResult ExistExchangerate(string idmoneda, DateTime docdate)
        {
            try
            {
                var data = financial.ExistExchangerate(idmoneda, docdate);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/Financial/Addrate")]
        [HttpPost]
        public IActionResult Addrate(registrotasa add)
        {
            try
            {
                financial.Addrate(add);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/Financial/Editrate")]
        [HttpPost]
        public IActionResult Editrate(registrotasa edit)
        {
            try
            {
                financial.Editrate(edit);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/Financial/Sourcedocument")]
        [HttpGet]
        public IActionResult Sourcedocument()
        {
            try
            {
                var data = financial.Sourcedocument();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
