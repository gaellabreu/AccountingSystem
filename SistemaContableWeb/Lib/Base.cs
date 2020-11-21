using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SistemaContableWeb.Context;
using SistemaContableWeb.DTO;
using SistemaContableWeb.Models.Setting;

namespace SistemaContableWeb.Lib.Class
{
    public abstract class Base
    {
        public DataContext db;
        public Base(string dbName) {
            db = new DataContext(dbName);
        }
    }
}
