using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Financial
{
    public class periodosfiscales
    {
        [Key]
        public int id { get; set; }
        public int periodo { get; set; }
        public DateTime fechaInicio { get; set; }
        //*********SERIE 0**************
        public bool financiero { get; set; }

        //*********SERIE 1**************
        public bool inventario { get; set; }

        //*********SERIE 2**************
        public bool compras { get; set; }

        //*********SERIE 3**************
        public bool ventas { get; set; }

        //*********SERIE 4**************
        public bool nomina { get; set; }
        public int year { get; set; }
    }
}
