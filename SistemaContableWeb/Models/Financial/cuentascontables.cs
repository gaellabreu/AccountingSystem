using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Financial
{
    public class cuentascontables
    {
        [Key]
        public int idcuenta { get; set; }
        public string cuenta { get; set; }
        public string descripcion { get; set; }
        public int idcategoria { get; set; }
        public int tipocontabilizacion { get; set; }
        public int tiposaldo { get; set; }
        public int IdMoneda { get; set; }
        public string usuario { get; set; }
        public DateTime fechacreacion { get; set; }
        public DateTime fechamodificacion { get; set; }
    }
}
