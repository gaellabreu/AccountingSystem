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
        public bool tipocotabilizacion { get; set; }
        public bool tiposaldo { get; set; }
        public string IdMoneda { get; set; }
        public string usuario { get; set; }

        public DateTime fechacreacion = DateTime.Now.Date;
        public DateTime fechamodificacion = DateTime.Now.Date;


    }
}
