using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Setting
{
    public class ListUser
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public int tipo { get; set; }
        public string nombreTipo { get; set; }
        public string usuario { get; set; }
        public string email { get; set; }

    }
}
