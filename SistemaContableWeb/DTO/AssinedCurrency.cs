using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.DTO
{
    public class AssinedCurrency
    {
        public int id { get; set; }
        public string currency { get; set; }
        public string description { get; set; }
        public string company { get; set; }
        public bool inactive { get; set; }

    }
}
