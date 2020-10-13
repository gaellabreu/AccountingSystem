using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Setting
{
    public class empresas
    {
        [Key]
        public int Id { get; set; }
        public string nombre { get; set; }
        public string telefono { get; set; }
        public string celular { get; set; }
        public string contacto { get; set; }
        public string RNC { get; set; }
        public string direccion { get; set; }
        public string ciudad { get; set; }
        public string Provincia { get; set; }
        public bool Deleted { get; set; }
    }
}
