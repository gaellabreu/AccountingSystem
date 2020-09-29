using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SistemaContableWeb.Context;
using SistemaContableWeb.Models;
using SistemaContableWeb.Models.Setting;
namespace SistemaContableWeb.Lib.Class
{
    public class Base
    {
        public Boolean result;

        public string query;
        //  public DataTable dtVenta;
      
        public Boolean Login(Login login)
        {
            using (var context = new DataContext())
                return context.usuario.Any(x => x.Usuario == login.Usuario && x.pass == login.pass);
        }
    }
}
