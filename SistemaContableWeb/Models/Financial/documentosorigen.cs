using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Models.Financial
{
    public class documentosorigen
    {
        [Key]
        public int id { get; set; }
        public string origendocumento { get; set; }
        public int serie { get; set; }
    }
}
