﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Setting
{
    public class MaestroMoneda
    {
        [Key]
        public int id { get; set; }
 
        public string IdMoneda { get; set; }

        public string Descripcion { get; set; }

        public Boolean Inactivo { get; set; }

     
    }
}
