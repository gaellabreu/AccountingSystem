﻿using Microsoft.EntityFrameworkCore;
using SistemaContableWeb.Models.Setting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaContableWeb.Context
{
    public class DataContext: DbContext
    {
        string dbName = "CONT";
        public DataContext(string db = "CONT")
        {
            dbName = db;
        }
        public virtual DbSet<usuario> usuario { get; set; }
        public virtual DbSet<empresas> empresas { get; set; }
        public virtual DbSet<MaestroMoneda> MaestroMoneda { get; set; }
        public virtual DbSet<acceso> acceso { get; set; }
        public virtual DbSet<Opciones> Opciones { get; set; }
        public virtual DbSet<AccesoMoneda> AccesoMoneda { get; set; }
        public virtual DbSet<Perfiles> Perfiles { get; set; }
        public virtual DbSet<PerfilUsuario> PerfilUsuario { get; set; }
        public virtual DbSet<roles> roles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseMySQL(@$"Server=localhost;Port=3306;Database={dbName};Uid=root;Pwd=G@el155931394;");
        }
    }
}
