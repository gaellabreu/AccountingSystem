using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using System.Web.Http;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SistemaContableWeb.Context;
using SistemaContableWeb.Models.Setting;

namespace SistemaContableWeb.Controllers
{
    [ApiController]
    public class SettingController : ControllerBase
    {
        [Route("api/setting/login")]
        [HttpPost]
        public IActionResult Login(Login login)
        {
            try
            {
                using(var ctx = new DataContext())
                {
                    if (login.Usuario == "gael")
                    {
                        var data = ctx.usuario.ToList();
                        return Ok(data);
                    }
                    else
                        return BadRequest("Usuario est◙ inactivo");
                }
                //return Ok(data);
                //return BadRequest();
                //return NoContent();

                //return new JsonResult("ok");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
