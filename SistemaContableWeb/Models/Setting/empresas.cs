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
        [Required]
        [Column(TypeName = "varchar(70)")]
        public string nombre { get; set; }

        [Column(TypeName = "varchar(15)")]
        public string telefono { get; set; }

        [Column(TypeName = "varchar(15)")]
        public string celular { get; set; }
      
        [Column(TypeName = "varchar(15)")]
        public string contacto { get; set; }

        [Required]
        [Column(TypeName = "varchar(11)")]
        public string RNC { get; set; }
        public string direccion { get; set; }
        public string ciudad { get; set; }
        public string Provincia { get; set; }
        public Boolean Deleted { get; set; }
    }
}
