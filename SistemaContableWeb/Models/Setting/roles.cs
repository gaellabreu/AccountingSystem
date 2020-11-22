using System.ComponentModel.DataAnnotations;

namespace SistemaContableWeb.Models.Setting
{
    public class roles
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
    }
}
