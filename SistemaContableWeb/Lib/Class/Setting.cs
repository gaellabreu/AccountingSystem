using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SistemaContableWeb.Models.Setting;
using SistemaContableWeb.Context;
using Microsoft.EntityFrameworkCore;
using SistemaContableWeb.DTO;

namespace SistemaContableWeb.Lib.Class
{
    public class Setting : Base
    {
        public Setting(string dbName = "CONT") : base(dbName) { }
        //*****************************************SECCION DE USUARIO******************************************************
        //*****************************************************************************************************************
        public (bool result, LoginResponse userData) Login(Login login)
        {
            var loginResponse = new LoginResponse();

            using (var context = db)
            {
                var userData = context.usuario
                    .Join(context.acceso, user => user.id, access => access.IdUsuario, (user, access) => new { user, access })
                    .Join(context.empresas, parent => parent.access.IdEmpresa, company => company.Id, (parent, company) => new { parent, company })
                    .Where(x => x.parent.user.Usuario == login.username && x.parent.user.pass == login.password).FirstOrDefault();

                if (userData != null)
                {
                    loginResponse = new LoginResponse()
                    {
                        username = userData.parent.user.Usuario,
                        companyId = userData.company.Id,
                        companyName = userData.company.nombre
                    };
                }

                return (userData != null, loginResponse);
            }
        }
        public bool ExitsUser(string usuario)
        {
            using (var context = db)
                return context.usuario.Any(x => x.Usuario == usuario);
        }
        public bool ExitsCompany(string name)
        {
            using (var context = db)
                return context.empresas.Any(x => x.nombre == name);
        }
        public bool ExitsCurrency(string IdMoneda)
        {
            using (var context = db)
                return context.MaestroMoneda.Any(x => x.IdMoneda == IdMoneda);
        }

        public void KeyresetUser(Login login)
        {
            using (var context = db)
            {
                var Upda = context.usuario.Where(x => x.Usuario == login.username && x.pass == login.password).FirstOrDefault();
                Upda.pass = login.password;
                context.Entry(Upda).State = EntityState.Modified;
                context.SaveChanges();
            }
        }
        public usuario GetUser(int id)
        {
            using (var context = db)
                return context.usuario.Find(id);
        }
        public List<ListUser> ListUser()
        {
            using (var context = db)
            {
                return context.usuario.Join(context.roles, x => x.tipo, y => y.id, (x, y) => new { x, y })
                    .Select(x => new ListUser() { 
                        id = x.x.id,
                        usuario = x.x.Usuario,
                        email = x.x.Email,
                        nombre = x.x.Nombre,
                        tipo = x.x.tipo,
                        nombreTipo = x.y.name
                    }).ToList();
            }
        }
        public List<Option> SearchUsers(string s)
        {
            using (var context = db)
                return context.usuario.Where(x => x.Usuario.ToLower().Contains(s.ToLower()))
                    .Select(s => new Option
                    {
                        id = s.id,
                        value = s.Usuario,
                    }).ToList();
        }
        public void AddUser(usuario User)
        {
            using (var context = db)
            {
                context.usuario.Add(User);
                context.SaveChanges();
            }

        }
        public void DeleteUser(int id)
        {
            using (var context = db)
            {
                var dele = context.usuario.Find(id);
                context.Entry(dele).State = EntityState.Deleted;
                context.SaveChanges();
            }
        }
        public void EditUser(usuario Usuario)
        {
            using (var context = db)
            {
                var user = context.usuario.Find(Usuario.id);
                user.Nombre = Usuario.Nombre;
                user.tipo = Usuario.tipo;
                user.Email = Usuario.Email;

                context.Entry(user).State = EntityState.Modified;
                context.SaveChanges();
            }
        }

        public List<roles> GetRoles()
        {
            using (var context = db)
                return context.roles.ToList();
        }


        //*****************************************SECCION DE EMPRESA******************************************************
        //*****************************************************************************************************************

        public empresas GetCompany(int id)
        {
            using (var context = db)
                return context.empresas.Find(id);
        }
        public List<empresas> ListCompany()
        {
            using (var context = db)
                return context.empresas.Where(x => !x.Deleted).ToList();
        }
        public void AddCompany(empresas company)
        {
            using (var context = db)
            {
                context.empresas.Add(company);
                context.SaveChanges();
            }
        }
        public void DeleteCompany(int id)
        {
            using (var context = db)
            {
                var comp = context.empresas.Find(id);
                comp.Deleted = true;
                context.Entry(comp).State = EntityState.Modified;
                context.SaveChanges();
            }
        }
        public void EditCompany(empresas company)
        {
            using (var context = db)
            {
                var comp = context.empresas.Find(company.Id);
                comp.nombre = company.nombre;
                comp.telefono = company.telefono;
                comp.celular = company.celular;
                comp.contacto = company.contacto;
                comp.RNC = company.RNC;
                comp.direccion = company.direccion;
                comp.ciudad = company.ciudad;
                comp.Provincia = company.Provincia;
                context.Entry(comp).State = EntityState.Modified;
                context.SaveChanges();
            }
        }

        //****************************************SECCION MONEDA********************************************************
        //Currency
        public MaestroMoneda GetCurrency(int id)
        {
            using (var context = db)
                return context.MaestroMoneda.Find(id);
        }
        public List<MaestroMoneda> ListCurrency()
        {
            using (var context = db)
                return context.MaestroMoneda.Where(x => !x.Inactivo).ToList();
        }
        public void AddCurrency(MaestroMoneda Currency)
        {
            using (var context = db)
            {
                context.MaestroMoneda.Add(Currency);
                context.SaveChanges();
            }
        }
        public void DeleteCurrency(int id)
        {
            using (var context = db)
            {
                var comp = context.MaestroMoneda.Find(id);
                comp.Inactivo = true;
                context.Entry(comp).State = EntityState.Modified;
                context.SaveChanges();
            }
        }
        public void EditCurrency(MaestroMoneda Currency)
        {
            using (var context = db)
            {
                var curr = context.MaestroMoneda.Find(Currency.id);
                curr.IdMoneda = Currency.IdMoneda;
                curr.Descripcion = Currency.Descripcion;
                context.Entry(curr).State = EntityState.Modified;
                context.SaveChanges();
            }
        }

        //PERFILES//

        public List<Perfiles> getProfiles()
        {
            using (var ctx = db)
                return ctx.Perfiles.ToList();
        }

        public List<PerfilUsuario> getPermissions(int e, int u)
        {
            using (var ctx = db)
            {
                var data = ctx.Set<PerfilUsuario>().FromSqlRaw("CALL sp_Pefil_UserId ({0},{1})", u, e).ToList();
                return data;
            }
        }

        public void EditPermissions(List<PerfilUsuario> p)
        {
            using (var ctx = db)
            {
                var perfiles = p.Select(x => x.IdPerfiles);
                var usuarios = p.Select(x => x.IdUsuario);
                var empresas = p.Select(x => x.IdEmpresa);

                var created = ctx.PerfilUsuario.Where(x => perfiles.Contains(x.IdPerfiles) && usuarios.Contains(x.IdUsuario) && empresas.Contains(x.IdEmpresa)).AsNoTracking().ToList();

                var created_id = created.Select(x => x.Id);

                var correct_ids = p.Select(x => x.Id).Intersect(created_id).ToList();
                var data = p.Where(x => correct_ids.Contains(x.Id)).ToList();
                if (data.Any())
                    ctx.UpdateRange(data);

                var _data = p.Where(x => !correct_ids.Contains(x.Id));
                foreach (var d in _data)
                {
                    d.Id = 0;
                }
                if (_data.Any())
                    ctx.AddRange(_data);

                ctx.SaveChanges();
            }
        }

        //ACCESO

        public List<Access> GetCompaniesByUser(int id)
        {
            using (var ctx = db)
            {
                var companies = ctx.empresas.Select(x => new Access
                {
                    id = x.Id,
                    name = x.nombre,
                    assigned = false
                }).ToList();

                var userAccess = ctx.acceso.Where(x => x.IdUsuario == id).ToList();

                companies.ForEach((c) =>
                {
                    c.assigned = userAccess.Select(x => x.IdEmpresa).Contains(c.id) && userAccess.Find(x => x.IdEmpresa == c.id).activo;
                });

                return companies;
            }
        }

        public void SaveAccess(List<acceso> accs)
        {

            using (var ctx = db)
            {
                accs.ForEach((a) =>
                {
                    var exists = ctx.acceso.Any(x => x.IdEmpresa == a.IdEmpresa && x.IdUsuario == a.IdUsuario);
                    if (!exists)
                    {
                        a.Fecha = DateTime.Now;
                        a.FechaModif = DateTime.Now;
                        ctx.Add(a);
                    }
                    else
                    {
                        var acc = ctx.acceso.FirstOrDefault(x => x.IdEmpresa == a.IdEmpresa && x.IdUsuario == a.IdUsuario);
                        a.FechaModif = DateTime.Now;
                        acc.activo = a.activo;
                        ctx.Update(acc);
                    }
                });
                ctx.SaveChanges();
            }
        }
    }
}
