using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Financial
{
    public class listaccounts
    {
        public int idcuenta { get; set; }
        public string cuenta { get; set; }
        public string descripcion { get; set; }
        public string categoria { get; set; }
        public bool tipocotabilizacion { get; set; }
  
    }
}
