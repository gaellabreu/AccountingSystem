using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Financial
{
    public class registrotasa
    {
        [Key]
        public int id { get; set; }
        public string IdMoneda { get; set; }
        public DateTime fecha { get; set; }
        public decimal tasa { get; set; }
        public DateTime fechaexpiracion { get; set; }
    }
}
