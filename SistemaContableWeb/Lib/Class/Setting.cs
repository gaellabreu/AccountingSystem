using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SistemaContableWeb.Models.Setting;
using SistemaContableWeb.Context;
using Microsoft.EntityFrameworkCore;

namespace SistemaContableWeb.Lib.Class
{
    public class Setting: Base
    {
        //*****************************************SECCION DE USUARIO******************************************************
        //*****************************************************************************************************************
        public usuario GetUser(int id)
        {
            using (var context = new DataContext())
                return context.usuario.Find(id);
        }
        public List<usuario> ListUser()
        {
            using (var context = new DataContext())
                return context.usuario.ToList();
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
                user.pass = Usuario.pass;
                user.Nombre = Usuario.Nombre;
                user.tipo = Usuario.tipo;
                user.Email = Usuario.Email;
                user.Zicop = Usuario.Zicop;
                context.Entry(user).State = EntityState.Modified;
                context.SaveChanges();
            }
        }

        //*****************************************SECCION DE EMPRESA******************************************************
        //*****************************************************************************************************************

        public empresas GetCompany(int id)
        {
            using (var context = new DataContext())
                return context.empresas.Find(id);
        }
        public List<empresas> ListCompany()
        {
            using (var context = new DataContext())
                return context.empresas.Where(x=> x.Deleted ==false).ToList();
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
                return context.MaestroMoneda.Where(x => x.Inactivo == false).ToList();
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
    }
}
