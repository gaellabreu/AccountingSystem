using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Setting
{
    public class Perfiles
    {
        [Key]
        public int id { get; set; }
        [Required]
        [Column(TypeName = "varchar(30)")]
        public string Form { get; set; }

        private Boolean Editar = false;
        private Boolean Agregar = false;
        private Boolean Eliminar = false;
        private Boolean Vista = false;
        private Boolean Listado = false;
    }
}
