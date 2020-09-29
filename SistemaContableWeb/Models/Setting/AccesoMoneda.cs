using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Setting
{
    public class AccesoMoneda
    {
        [Key]
        public int id { get; set; }
        [Required]
        public int IDMonedaAcc { get; set; }
        [Required]
        public int IdEmpresa { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string UsuarioModif { get; set; }
        public DateTime fechaCreacion = DateTime.Now.Date;
        public DateTime fechaModifi = DateTime.Now.Date;
    }
}
