using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaContableWeb.Models
{
    public static class GlobalVariables
    {

  
        public static bool CheckBoxItem(int values)
        {
            if (values == 1)
                return true;
            else
                return false;

        }
        public static short CheckBoxToInt(bool values)
        {
            if (values == true)
                return 1;
            else
                return 0;

        }
        public static int LookUserId { get; set; }
        //public static string LookUserId
        //{
        //    get
        //    {
        //        return HttpContext.Current.Application["LookUserId"] as string;
        //    }
        //    set
        //    {
        //        HttpContext.Current.Application["LookUserId"] = value;
        //    }
        //}

        public static string UserId
        {
            get;
            set;
        }

        public static string UserIdInt
        {
            get;
            set;
        }
        public static string IdEmpresa
        {
            get;
            set;
        }
        public static string TipoUserId
        {
            get;
            set;
        }
    }
}
