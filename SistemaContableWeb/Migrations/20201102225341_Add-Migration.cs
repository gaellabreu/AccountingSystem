using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace SistemaContableWeb.Migrations
{
    public partial class AddMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "acceso",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    IdUsuario = table.Column<int>(nullable: false),
                    IdEmpresa = table.Column<int>(nullable: false),
                    Fecha = table.Column<DateTime>(nullable: false),
                    FechaModif = table.Column<DateTime>(nullable: false),
                    activo = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_acceso", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "AccesoMoneda",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    IDMonedaAcc = table.Column<int>(nullable: false),
                    IdEmpresa = table.Column<int>(nullable: false),
                    UsuarioModif = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccesoMoneda", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "empresas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    nombre = table.Column<string>(nullable: true),
                    telefono = table.Column<string>(nullable: true),
                    celular = table.Column<string>(nullable: true),
                    contacto = table.Column<string>(nullable: true),
                    RNC = table.Column<string>(nullable: true),
                    direccion = table.Column<string>(nullable: true),
                    ciudad = table.Column<string>(nullable: true),
                    Provincia = table.Column<string>(nullable: true),
                    Deleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_empresas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MaestroMoneda",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    IdMoneda = table.Column<string>(nullable: true),
                    Descripcion = table.Column<string>(nullable: true),
                    Inactivo = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaestroMoneda", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Opciones",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    IdEmpresa = table.Column<int>(nullable: false),
                    GeneraContabilidad_Ventas = table.Column<bool>(nullable: false),
                    GeneraContabilidad_Compra = table.Column<bool>(nullable: false),
                    GeneraContabilidad_Inventario = table.Column<bool>(nullable: false),
                    GeneraContabilidad_Nomina = table.Column<bool>(nullable: false),
                    MantenerHistorico_Ventas = table.Column<bool>(nullable: false),
                    MantenerHistorico_Compra = table.Column<bool>(nullable: false),
                    MantenerHistorico_Inventario = table.Column<bool>(nullable: false),
                    MantenerHistorico_Nomina = table.Column<bool>(nullable: false),
                    GenerarComprobantesHistoricos = table.Column<bool>(nullable: false),
                    UsuarioModif = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Opciones", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Perfiles",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Form = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Perfiles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "PerfilUsuario",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    IdPerfiles = table.Column<int>(nullable: false),
                    IdUsuario = table.Column<int>(nullable: false),
                    IdEmpresa = table.Column<int>(nullable: false),
                    Editar = table.Column<bool>(nullable: false),
                    Agregar = table.Column<bool>(nullable: false),
                    Eliminar = table.Column<bool>(nullable: false),
                    Vista = table.Column<bool>(nullable: false),
                    Listado = table.Column<bool>(nullable: false),
                    usuarioMofi = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerfilUsuario", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Usuario = table.Column<string>(nullable: true),
                    pass = table.Column<string>(nullable: true),
                    tipo = table.Column<string>(nullable: true),
                    Nombre = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuario", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "acceso");

            migrationBuilder.DropTable(
                name: "AccesoMoneda");

            migrationBuilder.DropTable(
                name: "empresas");

            migrationBuilder.DropTable(
                name: "MaestroMoneda");

            migrationBuilder.DropTable(
                name: "Opciones");

            migrationBuilder.DropTable(
                name: "Perfiles");

            migrationBuilder.DropTable(
                name: "PerfilUsuario");

            migrationBuilder.DropTable(
                name: "usuario");
        }
    }
}
