using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Financial
{
    public class TrabajoEntradaDiarioEnc
    {
        [Key]
        public int Identrada { get; set; }
        public string origendocumento { get; set; }
        public int tipo { get; set; }
        public string documento { get; set; }
        public string referencia { get; set; }
        public DateTime fecha { get; set; }
        public string usuario { get; set; }
        public int series { get; set; }
        public string IdMoneda { get; set; }
        public decimal tasa { get; set; }
        public int periodo { get; set; }
        public int YearOpen { get; set; }
    }
}
