using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Setting
{
    public class acceso
    {
        [Key]
        public int id { get; set; }
        [Required]
        public int IdUsuario { get; set; }

        [Required]
        public int IdEmpresa { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string usurio { get; set; }
        public DateTime Fecha = DateTime.Now.Date;
        public DateTime FechaModif = DateTime.Now.Date;
        public Boolean activo { get; set; }
    }
}
