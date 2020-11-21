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
        //*****************************************SECCION DE USUARIO******************************************************
        //*****************************************************************************************************************
        public usuario GetUser(int id)
        {
            using (var context = new DataContext())
                return context.usuario.Find(id);
        }
        public List<ListUser> ListUser()
        {
            using (var context = new DataContext())
                return context.usuario.Select(s => new ListUser
                {
                    id = s.id,
                    nombre = s.Nombre,
                    tipo = s.tipo,
                    usuario = s.Usuario,
                    email = s.Email
                }).ToList();
        }
        public List<Option> SearchUsers(string s)
        {
            using (var context = new DataContext())
                return context.usuario.Where(x => x.Usuario.ToLower().Contains(s.ToLower()))
                    .Select(s => new Option
                    {
                        id = s.id,
                        value = s.Usuario,
                    }).ToList();
        }
        public void AddUser(usuario User)
        {
            using (var context = new DataContext())
            {
                context.usuario.Add(User);
                context.SaveChanges();
            }

        }
        public void DeleteUser(int id)
        {
            using (var context = new DataContext())
            {
                var dele = context.usuario.Find(id);
                context.Entry(dele).State = EntityState.Deleted;
                context.SaveChanges();
            }
        }
        public void EditUser(usuario Usuario)
        {
            using (var context = new DataContext())
            {
                var user = context.usuario.Find(Usuario.id);
                user.Nombre = Usuario.Nombre;
                user.tipo = Usuario.tipo;
                user.Email = Usuario.Email;

                context.Entry(user).State = EntityState.Modified;
                context.SaveChanges();
            }
        }


        //*****************************************SECCION DE EMPRESA******************************************************
        //*****************************************************************************************************************
        public bool DatabaseValidity(string dbName)
        {
            using (var context = new DataContext())
                return context.empresas.Any(x => x.dbName == dbName);
        }
        public empresas GetCompany(int id)
        {
            using (var context = new DataContext())
                return context.empresas.Find(id);
        }
        public List<empresas> ListCompany()
        {
            using (var context = new DataContext())
                return context.empresas.Where(x => !x.Deleted).ToList();
        }
        public void AddCompany(empresas company)
        {
            using (var context = new DataContext())
            {
                context.empresas.Add(company);
                context.SaveChanges();
            }
        }
        public void DeleteCompany(int id)
        {
            using (var context = new DataContext())
            {
                var comp = context.empresas.Find(id);
                comp.Deleted = true;
                context.Entry(comp).State = EntityState.Modified;
                context.SaveChanges();
            }
        }
        public void EditCompany(empresas company)
        {
            using (var context = new DataContext())
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
            using (var context = new DataContext())
                return context.MaestroMoneda.Find(id);
        }
        public List<MaestroMoneda> ListCurrency()
        {
            using (var context = new DataContext())
                return context.MaestroMoneda.Where(x => !x.Inactivo).ToList();
        }
        public void AddCurrency(MaestroMoneda Currency)
        {
            using (var context = new DataContext())
            {
                context.MaestroMoneda.Add(Currency);
                context.SaveChanges();
            }
        }
        public void DeleteCurrency(int id)
        {
            using (var context = new DataContext())
            {
                var comp = context.MaestroMoneda.Find(id);
                comp.Inactivo = true;
                context.Entry(comp).State = EntityState.Modified;
                context.SaveChanges();
            }
        }
        public void EditCurrency(MaestroMoneda Currency)
        {
            using (var context = new DataContext())
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
            using (var ctx = new DataContext())
                return ctx.Perfiles.ToList();
        }

        public List<PerfilUsuario> getPermissions(int e, int u)
        {
            using (var ctx = new DataContext())
            {
                var data = ctx.Set<PerfilUsuario>().FromSqlRaw("CALL sp_Pefil_UserId ({0},{1})", u, e).ToList();
                return data;
            }
        }

        public void EditPermissions(List<PerfilUsuario> p)
        {
            using (var ctx = new DataContext())
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
            using (var ctx = new DataContext())
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

            using (var ctx = new DataContext())
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
