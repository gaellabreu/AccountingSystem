using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Setting
{
    public class usuario
    {
        [Key]
        public int id { get; set; }
        public string Usuario { get; set; }
        public string  pass { get; set; }
        public string tipo { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; } 
 
    }
}
