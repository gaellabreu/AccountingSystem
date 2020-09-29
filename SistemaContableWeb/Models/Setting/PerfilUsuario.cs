using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Setting
{
    public class PerfilUsuario
    {
        [Key]
        public int id { get; set; }
        [Required]
    
        public int IdPerfiles { get; set; }

     
        public int IdUsuario { get; set; }

        public int IdEmpresa { get; set; }

        public Boolean Editar { get; set; }
        public Boolean Agregar { get; set; }
        public Boolean Eliminar { get; set; }
        public Boolean Vista { get; set; }
        public Boolean Listado { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string usuarioMofi { get; set; }
        public DateTime fechaAsi = DateTime.Now.Date;
        public DateTime fechaModifi = DateTime.Now.Date;
    }
}
