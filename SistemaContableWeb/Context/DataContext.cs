using Microsoft.EntityFrameworkCore;
using SistemaContableWeb.Models.Financial;
using SistemaContableWeb.Models.Setting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Context
{
    public class DataContext : DbContext
    {
        private string dbName;
        //public DataContext(DbContextOptions<DataContext> options) : base(options)
        //{ }
        public DataContext()
        {
            dbName = "CONT";
        }
        public DataContext(string sdbname)
        {
            dbName = sdbname;
        }
        public virtual DbSet<usuario> usuario { get; set; }
        public virtual DbSet<empresas> empresas { get; set; }
        public virtual DbSet<MaestroMoneda> MaestroMoneda { get; set; }
        public virtual DbSet<acceso> acceso { get; set; }
        public virtual DbSet<Opciones> Opciones { get; set; }
        public virtual DbSet<AccesoMoneda> AccesoMoneda { get; set; }
        public virtual DbSet<Perfiles> Perfiles { get; set; }
        public virtual DbSet<PerfilUsuario> PerfilUsuario { get; set; }


        //*********************Datos modulo financiero o contables******************************

        public virtual DbSet<categoriascuentas> categoriascuentas { get; set; }
        public virtual DbSet<cuentascontables> cuentascontables { get; set; }
        public virtual DbSet<TrabajoEntradaDiarioEnc> TrabajoEntradaDiarioEnc { get; set; }
        public virtual DbSet<TrabajoEntradaDiarioDetail> TrabajoEntradaDiarioDetail { get; set; }
        public virtual DbSet<periodosfiscales> periodosfiscales { get; set; }
        public virtual DbSet<registrotasa> registrotasa { get; set; }
        public virtual DbSet<documentosorigen> documentosorigen { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder
            //    .UseSqlServer(@"Server=DESKTOP-MKAB65N\GP2013;Database=CONT;Persist Security Info=True;User ID=sa;Password=Soporte100;MultipleActiveResultSets=True;");
            optionsBuilder
                .UseMySQL(@"Server=localhost;Port=3306;Database="+ dbName +";Uid=root");
        }
    }
}
