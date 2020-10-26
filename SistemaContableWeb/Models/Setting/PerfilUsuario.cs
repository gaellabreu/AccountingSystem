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
        public int IdPerfiles { get; set; }     
        public int IdUsuario { get; set; }
        public int IdEmpresa { get; set; }
        public bool Editar { get; set; }
        public bool Agregar { get; set; }
        public bool Eliminar { get; set; }
        public bool Vista { get; set; }
        public bool Listado { get; set; }
        public string usuarioMofi { get; set; }
        public DateTime fechaAsi = DateTime.Now.Date;
        public DateTime fechaModifi = DateTime.Now.Date;
    }
}
