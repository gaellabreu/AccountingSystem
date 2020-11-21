using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Financial
{
    public class categoriascuentas
    {
        [Key]
        public int idcategoria { get; set; }
        public string descripcion { get; set; }

    }
}
