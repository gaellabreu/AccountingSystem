using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.DTO
{
    public class Permissions
    {
        public int Id { get; set; }
        public string Form { get; set; }
        public bool Editar { get; set; }
        public bool Agregar { get; set; }
        public bool Eliminar { get; set; }
        public bool Vista { get; set; }
        public bool Listado { get; set; }
    }
}
