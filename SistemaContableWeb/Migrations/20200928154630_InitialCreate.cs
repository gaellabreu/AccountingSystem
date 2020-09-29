using Microsoft.EntityFrameworkCore.Migrations;

namespace SistemaContableWeb.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "acceso",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<int>(nullable: false),
                    IdEmpresa = table.Column<int>(nullable: false),
                    usurio = table.Column<string>(type: "varchar(50)", nullable: true),
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
                        .Annotation("SqlServer:Identity", "1, 1"),
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
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "varchar(70)", nullable: false),
                    telefono = table.Column<string>(type: "varchar(15)", nullable: true),
                    celular = table.Column<string>(type: "varchar(15)", nullable: true),
                    contacto = table.Column<string>(type: "varchar(15)", nullable: true),
                    RNC = table.Column<string>(type: "varchar(11)", nullable: false),
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
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdMoneda = table.Column<string>(type: "varchar(10)", nullable: false),
                    Descripcion = table.Column<string>(type: "varchar(40)", nullable: true),
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
                        .Annotation("SqlServer:Identity", "1, 1"),
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
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Form = table.Column<string>(type: "varchar(30)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Perfiles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "PerfilUsuario",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdPerfiles = table.Column<int>(nullable: false),
                    IdUsuario = table.Column<int>(nullable: false),
                    IdEmpresa = table.Column<int>(nullable: false),
                    Editar = table.Column<bool>(nullable: false),
                    Agregar = table.Column<bool>(nullable: false),
                    Eliminar = table.Column<bool>(nullable: false),
                    Vista = table.Column<bool>(nullable: false),
                    Listado = table.Column<bool>(nullable: false),
                    usuarioMofi = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerfilUsuario", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Usuario = table.Column<string>(type: "varchar(50)", nullable: false),
                    pass = table.Column<string>(type: "varchar(40)", nullable: false),
                    tipo = table.Column<string>(nullable: true),
                    Nombre = table.Column<string>(type: "varchar(60)", nullable: false),
                    Email = table.Column<string>(nullable: true),
                    Zicop = table.Column<string>(nullable: true)
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
