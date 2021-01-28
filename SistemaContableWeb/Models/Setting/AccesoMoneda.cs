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
        public int IDMonedaAcc { get; set; }
        public int IdEmpresa { get; set; }
        public string UsuarioModif { get; set; }
    }
}
