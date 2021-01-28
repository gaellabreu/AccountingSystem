using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Financial
{
    public class TrabajoEntradaDiarioDetail
    {
        [Key]
        public int id { get; set; }
        public int Identrada { get; set; }
        public int idcuenta { get; set; }
        public decimal tasa { get; set; }
        public string descripcion { get; set; }
        public string IdMoneda { get; set; }
        public int origendocumento { get; set; }
        public string documento { get; set; }
        public decimal credito { get; set; }
        public decimal debito { get; set; }
        public string usuario { get; set; }
        public DateTime fechacreacion = DateTime.Now.Date;
        public DateTime fechamodificacion = DateTime.Now.Date;
    }
}
