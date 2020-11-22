using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.DTO
{
    public class LoginResponse
    {
        public string username { get; set; }
        public string companyName { get; set; }
        public int companyId { get; set; }
    }
}
