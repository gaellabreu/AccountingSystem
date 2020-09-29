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
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Usuario { get; set; }

        [Required]
        [Column(TypeName = "varchar(40)")]
        public string  pass { get; set; }
        public string tipo { get; set; }
        [Key]
        public int id { get; set; }

        [Required]
        [Column(TypeName = "varchar(60)")]
        public string Nombre { get; set; }
        public string Email { get; set; } 
        public string Zicop { get; set; }
    }
}
