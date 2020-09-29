﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SistemaContableWeb.Context;

namespace SistemaContableWeb.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SistemaContableWeb.Models.Setting.AccesoMoneda", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IDMonedaAcc")
                        .HasColumnType("int");

                    b.Property<int>("IdEmpresa")
                        .HasColumnType("int");

                    b.Property<string>("UsuarioModif")
                        .HasColumnType("varchar(50)");

                    b.HasKey("id");

                    b.ToTable("AccesoMoneda");
                });

            modelBuilder.Entity("SistemaContableWeb.Models.Setting.MaestroMoneda", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Descripcion")
                        .HasColumnType("varchar(40)");

                    b.Property<string>("IdMoneda")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.Property<bool>("Inactivo")
                        .HasColumnType("bit");

                    b.HasKey("id");

                    b.ToTable("MaestroMoneda");
                });

            modelBuilder.Entity("SistemaContableWeb.Models.Setting.Opciones", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("GeneraContabilidad_Compra")
                        .HasColumnType("bit");

                    b.Property<bool>("GeneraContabilidad_Inventario")
                        .HasColumnType("bit");

                    b.Property<bool>("GeneraContabilidad_Nomina")
                        .HasColumnType("bit");

                    b.Property<bool>("GeneraContabilidad_Ventas")
                        .HasColumnType("bit");

                    b.Property<bool>("GenerarComprobantesHistoricos")
                        .HasColumnType("bit");

                    b.Property<int>("IdEmpresa")
                        .HasColumnType("int");

                    b.Property<bool>("MantenerHistorico_Compra")
                        .HasColumnType("bit");

                    b.Property<bool>("MantenerHistorico_Inventario")
                        .HasColumnType("bit");

                    b.Property<bool>("MantenerHistorico_Nomina")
                        .HasColumnType("bit");

                    b.Property<bool>("MantenerHistorico_Ventas")
                        .HasColumnType("bit");

                    b.Property<string>("UsuarioModif")
                        .HasColumnType("varchar(50)");

                    b.HasKey("id");

                    b.ToTable("Opciones");
                });

            modelBuilder.Entity("SistemaContableWeb.Models.Setting.PerfilUsuario", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Agregar")
                        .HasColumnType("bit");

                    b.Property<bool>("Editar")
                        .HasColumnType("bit");

                    b.Property<bool>("Eliminar")
                        .HasColumnType("bit");

                    b.Property<int>("IdEmpresa")
                        .HasColumnType("int");

                    b.Property<int>("IdPerfiles")
                        .HasColumnType("int");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<bool>("Listado")
                        .HasColumnType("bit");

                    b.Property<bool>("Vista")
                        .HasColumnType("bit");

                    b.Property<string>("usuarioMofi")
                        .HasColumnType("varchar(50)");

                    b.HasKey("id");

                    b.ToTable("PerfilUsuario");
                });

            modelBuilder.Entity("SistemaContableWeb.Models.Setting.Perfiles", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Form")
                        .IsRequired()
                        .HasColumnType("varchar(30)");

                    b.HasKey("id");

                    b.ToTable("Perfiles");
                });

            modelBuilder.Entity("SistemaContableWeb.Models.Setting.acceso", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IdEmpresa")
                        .HasColumnType("int");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<bool>("activo")
                        .HasColumnType("bit");

                    b.Property<string>("usurio")
                        .HasColumnType("varchar(50)");

                    b.HasKey("id");

                    b.ToTable("acceso");
                });

            modelBuilder.Entity("SistemaContableWeb.Models.Setting.empresas", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Deleted")
                        .HasColumnType("bit");

                    b.Property<string>("Provincia")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RNC")
                        .IsRequired()
                        .HasColumnType("varchar(11)");

                    b.Property<string>("celular")
                        .HasColumnType("varchar(15)");

                    b.Property<string>("ciudad")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("contacto")
                        .HasColumnType("varchar(15)");

                    b.Property<string>("direccion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("nombre")
                        .IsRequired()
                        .HasColumnType("varchar(70)");

                    b.Property<string>("telefono")
                        .HasColumnType("varchar(15)");

                    b.HasKey("Id");

                    b.ToTable("empresas");
                });

            modelBuilder.Entity("SistemaContableWeb.Models.Setting.usuario", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("varchar(60)");

                    b.Property<string>("Usuario")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Zicop")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("pass")
                        .IsRequired()
                        .HasColumnType("varchar(40)");

                    b.Property<string>("tipo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("usuario");
                });
#pragma warning restore 612, 618
        }
    }
}
