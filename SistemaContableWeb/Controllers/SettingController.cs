using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using System.Web.Http;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SistemaContableWeb.Context;
using SistemaContableWeb.Models.Setting;
using SistemaContableWeb.Lib.Class;
namespace SistemaContableWeb.Controllers
{
    [ApiController]
    public class SettingController : ControllerBase
    {
        Setting setting;
        public SettingController()
        {
            setting = new Setting();
        }

        [Route("api/setting/login")]
        [HttpPost]
        public IActionResult Login(Login login)
        {
            try
            {
                if (setting.Login(login))
                    return Ok();
                return BadRequest("Usuario y clave incorrecto");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/KeyresetUser")]
        [HttpPost]
        public IActionResult KeyresetUser(Login login)
        {
            try
            {
                setting.KeyresetUser(login);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/GetUser")]
        [HttpGet]
        public IActionResult GetUser(int id)
        {
            try
            {
                var UserId = setting.GetUser(id);
                return Ok(UserId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/ListUser")]
        [HttpGet]
        public IActionResult ListUser()
        {
            try
            {
                var list = setting.ListUser();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/SearchUsers")]
        [HttpGet]
        public IActionResult SearchUsers(string search)
        {
            try
            {
                var list = setting.SearchUsers(search);
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/AddUser")]
        [HttpPost]
        public IActionResult AddUser(usuario usuario)
        {
            try
            {
                if (!setting.ExitsUser(usuario.Usuario))
                {
                    setting.AddUser(usuario);
                    return Ok();
                }
                else return BadRequest("Este usuario ya existe");


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/DeleteUser")]
        [HttpPost]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                setting.DeleteUser(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/EditUser")]
        [HttpPost]
        public IActionResult EditUser(usuario Usuario)
        {
            try
            {
                setting.EditUser(Usuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //*********************************SECCION EMPRESA**********************************************
        [Route("api/setting/GetCompany")]
        [HttpGet]
        public IActionResult GetCompany(int id)
        {
            try
            {
                var company = setting.GetCompany(id);
                return Ok(company);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/ListCompany")]
        [HttpGet]
        public IActionResult ListCompany()
        {
            try
            {
                var list = setting.ListCompany();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/AddCompany")]
        [HttpPost]
        public IActionResult AddCompany(empresas company)
        {
            try
            {
                if (!setting.ExitsCompany(company.nombre))
                {
                    setting.AddCompany(company);
                    return Ok();
                }
                else return BadRequest("Esta empresa ya existe");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/DeleteCompany")]
        [HttpPost]
        public IActionResult DeleteCompany(int id)
        {
            try
            {
                setting.DeleteCompany(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/EditCompany")]
        [HttpPost]
        public IActionResult EditCompany(empresas company)
        {
            try
            {
                setting.EditCompany(company);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //*********************************SECCION MONEDA**********************************************
        [Route("api/setting/GetCurrency")]
        [HttpGet]
        public IActionResult GetCurrency(int id)
        {
            try
            {
                var currency = setting.GetCompany(id);
                return Ok(currency);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/ListCurrency")]
        [HttpGet]
        public IActionResult ListCurrency()
        {
            try
            {
                var list = setting.ListCurrency();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/AddCurrency")]
        [HttpPost]
        public IActionResult AddCurrency(MaestroMoneda currency)
        {
            try
            {
                if (!setting.ExitsCurrency(currency.IdMoneda))
                {
                    setting.AddCurrency(currency);
                    return Ok();
                }
                else return BadRequest("Este Id de Moneda ya existe");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/DeleteCurrency")]
        [HttpPost]
        public IActionResult DeleteCurrency(int id)
        {
            try
            {
                setting.DeleteCurrency(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("api/setting/EditCurrency")]
        [HttpPost]
        public IActionResult EditCurrency(MaestroMoneda currency)
        {
            try
            {
                setting.EditCurrency(currency);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        //PERFILES//

        [Route("api/setting/getprofiles")]
        [HttpGet]
        public IActionResult Getprofiles()
        {
            try
            {
                return Ok(setting.getProfiles());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("api/setting/getPermissions")]
        [HttpGet]
        public IActionResult GetPermissions(int empresa, int usuario)
        {
            try
            {
                return Ok(setting.getPermissions(empresa, usuario));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }

        [Route("api/setting/editPermissions")]
        [HttpPost]
        public IActionResult EditPermissions(List<PerfilUsuario> perfilUsuarios)
        {
            try
            {
                setting.EditPermissions(perfilUsuarios);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }

        //ACCESOS

        [Route("api/setting/GetCompaniesByUser")]
        [HttpGet]
        public IActionResult GetCompaniesByUser(int userId)
        {
            try
            {
                return Ok(setting.GetCompaniesByUser(userId));
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.InnerException);
            }
        }

        [Route("api/setting/SaveAccess")]
        [HttpPost]
        public IActionResult SaveAccess(List<acceso> acceso)
        {
            try
            {
                setting.SaveAccess(acceso);
                return Ok();
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.InnerException);
            }
        }
    }
}
