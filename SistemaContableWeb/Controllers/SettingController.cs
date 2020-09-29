using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SistemaContableWeb.Models.Setting;

namespace SistemaContableWeb.Controllers
{
    public class SettingController : Controller
    {
        // GET: SettingController
        public SettingController()
        { 
        }
           
        public ActionResult Index()
        {
            return View();
        }

        // GET: SettingController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: SettingController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: SettingController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
        [HttpPost]
        [EnableCors("AllowOrigin")]
        public JsonResult Login(Login data)
        {
            try
            {
               
                }
                return new JsonResult("ok");
            }
            catch (Exception ex)
            {
                return new JsonResult("Error");
            }


        }
        // POST: SettingController/Edit/5

    }
}
