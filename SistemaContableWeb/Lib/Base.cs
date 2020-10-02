using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SistemaContableWeb.Context;
using SistemaContableWeb.Models;
using SistemaContableWeb.Models.Setting;
namespace SistemaContableWeb.Lib.Class
{
    public abstract class Base
    {
        public Boolean result;

        public string query;
        //  public DataTable dtVenta;
      
        public bool Login(Login login)
        {
            using (var context = new DataContext())
                return context.usuario.Any(x => x.Usuario == login.Usuario && x.pass == login.pass);
        }
        public bool ExitsUser(string usuario)
        {
            using (var context = new DataContext())
                return context.usuario.Any(x => x.Usuario == usuario);
        }
        public bool ExitsCompany(string name)
        {
            using (var context = new DataContext())
                return context.empresas.Any(x => x.nombre == name);
        }
        public bool ExitsCurrency(string IdMoneda)
        {
            using (var context = new DataContext())
                return context.MaestroMoneda.Any(x => x.IdMoneda == IdMoneda);
        }

        public void KeyresetUser(Login login)
        {
            using (var context = new DataContext())
            {
                var Upda = context.usuario.Where(x => x.Usuario == login.Usuario && x.pass == login.pass).FirstOrDefault();
                Upda.pass = login.pass;
                context.Entry(Upda).State = EntityState.Modified;
                context.SaveChanges();
            }
        }
    }
}
