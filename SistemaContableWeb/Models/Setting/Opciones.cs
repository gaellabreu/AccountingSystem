using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Setting
{
    public class Opciones
    {
        [Key]
        public int id { get; set; }

        [Required]
        public int IdEmpresa { get; set; }
        public Boolean GeneraContabilidad_Ventas { get; set; }
        public Boolean GeneraContabilidad_Compra { get; set; }
        public Boolean GeneraContabilidad_Inventario { get; set; }
        public Boolean GeneraContabilidad_Nomina { get; set; }
        public Boolean MantenerHistorico_Ventas { get; set; }
        public Boolean MantenerHistorico_Compra { get; set; }
        public Boolean MantenerHistorico_Inventario { get; set; }
        public Boolean MantenerHistorico_Nomina { get; set; }
        public Boolean GenerarComprobantesHistoricos { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string UsuarioModif { get; set; }
        public DateTime FechaCreacion = DateTime.Now.Date;
        public DateTime FechaModif = DateTime.Now.Date;
    }
}
