using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SistemaContableWeb.Models.Financial;
using SistemaContableWeb.Context;
using Microsoft.EntityFrameworkCore;
//using SistemaContableWeb.DTO;


namespace SistemaContableWeb.Lib.Class
{
    public class Financial
    {
        private string dbName;
        Boolean resut;
        public Financial(string sdbname)
        {
            dbName = sdbname;
        }
        public List<categoriascuentas> Listcategory()
        {
            using (var context = new DataContext(dbName))
                return context.categoriascuentas.Select(s => new categoriascuentas
                {
                    idcategoria = s.idcategoria,
                    descripcion = s.descripcion
                }).ToList();
        }
     

        public bool exitscategory(string descripcion)
        {
            using (var context = new DataContext(dbName))
                return context.categoriascuentas.Any(x => x.descripcion == descripcion);
        }

        public void AddCategory(categoriascuentas add)
        {
            using (var context = new DataContext(dbName))
            {
                context.categoriascuentas.Add(add);
                context.SaveChanges();
            }
            
        }
        public void EditCategory(categoriascuentas edit)
        {
            using (var ctx = new DataContext(dbName))
            {
              var editUp =  ctx.categoriascuentas.Find(edit.idcategoria);
                editUp.descripcion = edit.descripcion;
                ctx.Update(editUp);
                ctx.SaveChanges();
            }
        }
        ///**********************************Account Master***********************************
        ///***********************************************************************************
        public List<listaccounts> Listaccounts()
        {
            using (var context = new DataContext(dbName))
                return context.cuentascontables.Select(s => new listaccounts
                {
                    idcuenta = s.idcategoria,
                    descripcion = s.descripcion
                }).ToList();
        }
        public cuentascontables GetDataAccount(int idcuenta)
        {
            using (var context = new DataContext(dbName))
                return context.cuentascontables.Find(idcuenta);
        }
        public void AddAccount(cuentascontables add)
        {
            using (var context = new DataContext(dbName))
            {
                context.Add(add);
                context.SaveChanges();
            }
        }
        public void EditAccount(cuentascontables edit)
        {
            using (var context = new DataContext(dbName))
            {
                var upd = context.cuentascontables.Find(edit.idcuenta);
                upd.descripcion = edit.descripcion;
                upd.idcategoria = edit.idcategoria;
                upd.tipocotabilizacion = edit.tipocotabilizacion;
                upd.tiposaldo = edit.tiposaldo;
                upd.IdMoneda = edit.IdMoneda;
                upd.usuario = edit.usuario;
                context.Update(upd);
                context.SaveChanges();
            }
        }

        //*******************************************PERIODOS FISCALES********************************
        //*************************************************************************************************
        public bool ValidFiscalPeriod(DateTime fechaDoc, int modulo)
        {
        
            using (var context = new DataContext(dbName))
            {
                switch (modulo)
                {
                    case 0:
                        resut = context.periodosfiscales.Any(x => x.fechaInicio.Month == fechaDoc.Month && x.year == fechaDoc.Year && x.financiero); //listo
                        break;
                    case 1:
                        resut = context.periodosfiscales.Any(x => x.fechaInicio.Month == fechaDoc.Month && x.year == fechaDoc.Year && x.inventario); //listo
                        break;
                    case 2:
                        resut = context.periodosfiscales.Any(x => x.fechaInicio.Month == fechaDoc.Month && x.year == fechaDoc.Year && x.compras); //listo
                        break;
                    case 3:
                        resut = context.periodosfiscales.Any(x => x.fechaInicio.Month == fechaDoc.Month && x.year == fechaDoc.Year && x.ventas); //listo
                        break;
                    case 4:
                        resut = context.periodosfiscales.Any(x => x.fechaInicio.Month == fechaDoc.Month && x.year == fechaDoc.Year && x.nomina); //listo
                        break;

                }
                return resut;
            }
        }
        public void AddPeriodo(periodosfiscales add)
        {
            using (var context = new DataContext(dbName))
            {
                context.periodosfiscales.Add(add);
                context.SaveChanges();
            }
        }

        private bool existperiod(int period, int year)
        {
            using (var context = new DataContext(dbName))
                return context.periodosfiscales.Any(x => x.periodo == period && x.year == year);
        }

        private int idperiod(int period, int year)
        {
            using (var context = new DataContext(dbName))
                return context.periodosfiscales.Where(x => x.periodo == period && x.year == year).Select(z => z.id).First();
        }

        public void SavePeriod(List<periodosfiscales> randeperiod)
        {
            foreach (var data in randeperiod)
            {
                if (!existperiod(data.periodo, data.year))
                    AddPeriod(data);
                else EditPeriod(data);
                //d.Id = 0;
            }
        }
        private void AddPeriod(periodosfiscales add)
        {
            using (var context = new DataContext(dbName))
            {
                context.periodosfiscales.Add(add);
                context.SaveChanges();
            }
        }
        private void EditPeriod(periodosfiscales edit)
        {
            using (var context = new DataContext(dbName))
            {
                var editp = context.periodosfiscales.Find(edit.id);
                editp.fechaInicio = edit.fechaInicio.Date;
                editp.financiero = edit.financiero;
                editp.inventario = edit.inventario;
                editp.compras = edit.compras;
                editp.ventas = edit.ventas;
                editp.nomina = edit.nomina;
                context.periodosfiscales.Update(editp);
                context.SaveChanges();
            }
        }
        public List<periodosfiscales> ListPeriod(int year)
        {
            using (var context = new DataContext(dbName))
             return  context.periodosfiscales.Where(x => x.year == year).ToList();
        }

        //*************************************TASA DE CAMBIO***************************************
        public decimal GetExchangerate(string idmoneda,DateTime docdate)
        {
            using (var context = new DataContext(dbName))
            {
                if (ExistExchangerate(idmoneda, docdate))
                    return context.registrotasa.Where(x => x.IdMoneda == idmoneda && x.fecha == docdate.Date && x.fechaexpiracion >= docdate.Date).Select(s => s.tasa).First();
                else return 0;
            }
                
        }
        public bool ExistExchangerate(string idmoneda, DateTime docdate)
        {
            using (var context = new DataContext(dbName))
                return context.registrotasa.Any(x => x.IdMoneda == idmoneda && x.fecha == docdate.Date && x.fechaexpiracion >= docdate.Date);
        }
        public void Addrate(registrotasa add)
        {
            using (var context = new DataContext(dbName))
            {
                context.registrotasa.Add(add);
                context.SaveChanges();
            }
        }
        public void Editrate(registrotasa edit)
        {
            using (var context = new DataContext(dbName))
            {
                var update = context.registrotasa.Find(edit.id);
                update.tasa = edit.tasa;
                update.fecha = edit.fecha.Date;
                update.fechaexpiracion = edit.fechaexpiracion.Date;
                context.registrotasa.Update(update);
                context.SaveChanges();
            }
        }
        public List<documentosorigen> Sourcedocument()
        {
            using (var context = new DataContext(dbName))
                return context.documentosorigen.ToList();
        }


    }
}
