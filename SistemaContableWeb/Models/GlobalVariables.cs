using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaContableWeb.Models
{
    public static class GlobalVariables
    {
        public static int LookUserId { get; set; }
        public static string UserId { get; set; }
        public static string UserIdInt { get; set; }
        public static string TipoUserId { get; set; }
    }
}