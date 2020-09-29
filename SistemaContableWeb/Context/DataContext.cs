using Microsoft.EntityFrameworkCore;
using SistemaContableWeb.Models.Setting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Context
{
    public class DataContext: DbContext
    {
        //public DataContext(DbContextOptions<DataContext> options) : base(options)
        //{ }
        public virtual DbSet<usuario> usuario { get; set; }
        public virtual DbSet<empresas> empresas { get; set; }
        public virtual DbSet<MaestroMoneda> MaestroMoneda { get; set; }
        public virtual DbSet<acceso> acceso { get; set; }
        public virtual DbSet<Opciones> Opciones { get; set; }
        public virtual DbSet<AccesoMoneda> AccesoMoneda { get; set; }
        public virtual DbSet<Perfiles> Perfiles { get; set; }
        public virtual DbSet<PerfilUsuario> PerfilUsuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer(@"Server=DESKTOP-MKAB65N\GP2013;Database=CONT;Persist Security Info=True;User ID=sa;Password=Soporte100;MultipleActiveResultSets=True;");
        }
    }
}
