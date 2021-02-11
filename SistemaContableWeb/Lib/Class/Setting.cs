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

            var userData = db.usuario
                .Join(db.acceso, user => user.id, access => access.IdUsuario, (user, access) => new { user, access })
                .Join(db.empresas, parent => parent.access.IdEmpresa, company => company.Id, (parent, company) => new { parent, company })
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
        public bool ExitsUser(string usuario) => db.usuario.Any(x => x.Usuario == usuario);
        public bool ExitsCompany(string name) => db.empresas.Any(x => x.nombre == name);
        public bool ExitsCurrency(string IdMoneda) => db.MaestroMoneda.Any(x => x.IdMoneda == IdMoneda);

        public void AssignCurrency(AccesoMoneda accesoMoneda)
        {
            db.Add(accesoMoneda);
            db.SaveChanges();
        }

        public void RemoveAssignedCurrency(int id)
        {
            var acceso = db.AccesoMoneda.Find(id);
            db.Remove(acceso);
            db.SaveChanges();
        }

        public bool isCurrencyAssigned(AccesoMoneda accesoMoneda)
        {
            var _x = db.AccesoMoneda.Where(x => x.IDMonedaAcc == accesoMoneda.IDMonedaAcc && x.IdEmpresa == accesoMoneda.IdEmpresa);
            return db.AccesoMoneda.Any(x => x.IDMonedaAcc == accesoMoneda.IDMonedaAcc && x.IdEmpresa == accesoMoneda.IdEmpresa);
        }

        public void KeyresetUser(Login login)
        {
            var Upda = db.usuario.Where(x => x.Usuario == login.username && x.pass == login.password).FirstOrDefault();
            Upda.pass = login.password;
            db.Entry(Upda).State = EntityState.Modified;
            db.SaveChanges();
        }

        public usuario GetUser(int id) => db.usuario.Find(id);
        public List<ListUser> ListUser() => db.usuario.Join(db.roles, x => x.tipo, y => y.id, (x, y) => new { x, y })
                    .Select(x => new ListUser() { 
                        id = x.x.id,
                        usuario = x.x.Usuario,
                        email = x.x.Email,
                        nombre = x.x.Nombre,
                        tipo = x.x.tipo,
                        nombreTipo = x.y.name
                    }).ToList();

        public List<Option> SearchUsers(string s) => db.usuario.Where(x => x.Usuario.ToLower().Contains(s.ToLower()))
                    .Select(s => new Option
                    {
                        id = s.id,
                        value = s.Usuario,
                    }).ToList();

        public void AddUser(usuario User)
        {
            db.usuario.Add(User);
            db.SaveChanges();
        }

        public void DeleteUser(int id)
        {
            var dele = db.usuario.Find(id);
            db.Entry(dele).State = EntityState.Deleted;
            db.SaveChanges();
        }

        public void EditUser(usuario Usuario)
        {
                var user = db.usuario.Find(Usuario.id);
                user.Nombre = Usuario.Nombre;
                user.tipo = Usuario.tipo;
                user.Email = Usuario.Email;

                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
        }

        public List<roles> GetRoles() => db.roles.ToList();


        //*****************************************SECCION DE EMPRESA******************************************************
        //*****************************************************************************************************************
        public bool DatabaseValidity(string dbName)
        {
            using (var context = new DataContext())
                return context.empresas.Any(x => x.dbName == dbName);
        }

        public empresas GetCompany(int id) => db.empresas.Find(id);
        public List<empresas> ListCompany() => db.empresas.Where(x => !x.Deleted).ToList();
        public void AddCompany(empresas company)
        {
                db.empresas.Add(company);
                db.SaveChanges();
        }
        public void DeleteCompany(int id)
        {
                var comp = db.empresas.Find(id);
                comp.Deleted = true;
                db.Entry(comp).State = EntityState.Modified;
                db.SaveChanges();
        }
        public void EditCompany(empresas company)
        {
                var comp = db.empresas.Find(company.Id);
                comp.nombre = company.nombre;
                comp.telefono = company.telefono;
                comp.celular = company.celular;
                comp.contacto = company.contacto;
                comp.RNC = company.RNC;
                comp.direccion = company.direccion;
                comp.ciudad = company.ciudad;
                comp.Provincia = company.Provincia;
                db.Entry(comp).State = EntityState.Modified;
                db.SaveChanges();
        }

        //****************************************SECCION MONEDA********************************************************
        
        public MaestroMoneda GetCurrency(int id) => db.MaestroMoneda.Find(id);
        public List<MaestroMoneda> ListCurrency() => db.MaestroMoneda.Where(x => !x.Inactivo).ToList();
        public AssinedCurrency ListAssignedCurrency(int empresa) => db.MaestroMoneda
                .Where(x => !x.Inactivo)
                .Join(db.AccesoMoneda, x => x.id, y => y.IDMonedaAcc, (x, y) => new
                {
                    x.Descripcion,
                    x.id,
                    x.IdMoneda,
                    x.Inactivo,
                    y.IdEmpresa
                })
                .Join(db.empresas.Where(x => x.Id == empresa), x => x.IdEmpresa, y => y.Id, (x, y) => new AssinedCurrency(){ 
                    id = x.id,
                    currency = x.IdMoneda,
                    inactive = x.Inactivo,
                    description = x.Descripcion,
                    company = y.nombre
                })
                .FirstOrDefault();

        public List<AssinedCurrency> ListCompanyAssignedCurrency() => db.MaestroMoneda
               .Where(x => !x.Inactivo)
               .Join(db.AccesoMoneda, x => x.id, y => y.IDMonedaAcc, (x, y) => new
               {
                   x.Descripcion,
                   x.id,
                   x.IdMoneda,
                   x.Inactivo,
                   y.IdEmpresa
               })
               .Join(db.empresas, x => x.IdEmpresa, y => y.Id, (x, y) => new AssinedCurrency()
               {
                   id = x.id,
                   currency = x.IdMoneda,
                   inactive = x.Inactivo,
                   description = x.Descripcion,
                   company = y.nombre
               })
               .ToList();

        public void AddCurrency(MaestroMoneda Currency)
        {
            db.MaestroMoneda.Add(Currency);
            db.SaveChanges();
        }

        public void DeleteCurrency(int id)
        {
            var comp = db.MaestroMoneda.Find(id);
            comp.Inactivo = true;
            db.Entry(comp).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void EditCurrency(MaestroMoneda Currency)
        {
            var curr = db.MaestroMoneda.Find(Currency.id);
            curr.IdMoneda = Currency.IdMoneda;
            curr.Descripcion = Currency.Descripcion;
            db.Entry(curr).State = EntityState.Modified;
            db.SaveChanges();
        }

        //PERFILES//

        public List<Perfiles> getProfiles() => db.Perfiles.ToList();

        public List<PerfilUsuario> getPermissions(int e, int u) => db.Set<PerfilUsuario>().FromSqlRaw("CALL sp_Pefil_UserId ({0},{1})", u, e).ToList();

        public void EditPermissions(List<PerfilUsuario> p)
        {
                var perfiles = p.Select(x => x.IdPerfiles);
                var usuarios = p.Select(x => x.IdUsuario);
                var empresas = p.Select(x => x.IdEmpresa);

                var created = db.PerfilUsuario.Where(x => perfiles.Contains(x.IdPerfiles) && usuarios.Contains(x.IdUsuario) && empresas.Contains(x.IdEmpresa)).AsNoTracking().ToList();

                var created_id = created.Select(x => x.Id);

                var correct_ids = p.Select(x => x.Id).Intersect(created_id).ToList();
                var data = p.Where(x => correct_ids.Contains(x.Id)).ToList();
                if (data.Any())
                    db.UpdateRange(data);

                var _data = p.Where(x => !correct_ids.Contains(x.Id));
                foreach (var d in _data)
                {
                    d.Id = 0;
                }
                if (_data.Any())
                    db.AddRange(_data);

                db.SaveChanges();
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
