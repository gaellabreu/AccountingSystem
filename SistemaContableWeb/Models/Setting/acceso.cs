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
        public int IdUsuario { get; set; }
        public int IdEmpresa { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime FechaModif { get; set; }
        public bool activo { get; set; }
    }
}
