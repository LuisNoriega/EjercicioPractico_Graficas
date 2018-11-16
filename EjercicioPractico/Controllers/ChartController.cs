using ExcelDataReader;
using Newtonsoft.Json;
using System;
using System.Data;
using System.IO;
using System.Web.Mvc;

namespace EjercicioPractico.Controllers
{
    public class ChartController:Controller
    {
        public ActionResult Index()
        {
            return View();
        }

       public string LeerExcel()
        {
            //Cambiar la ubicacion de archivo a leer
            var pathToExcel = @"C:\Calificaciones.xlsx";
            using (var stream = System.IO.File.Open(pathToExcel, FileMode.Open, FileAccess.Read))
            {
                IExcelDataReader reader;

              
                reader = ExcelDataReader.ExcelReaderFactory.CreateReader(stream);

                //// reader.IsFirstRowAsColumnNames
                var conf = new ExcelDataSetConfiguration
                {
                    ConfigureDataTable = _ => new ExcelDataTableConfiguration
                    {
                        UseHeaderRow = true

                    }
                };

                var dataSet = reader.AsDataSet(conf);
                var dataTable = dataSet.Tables[0];

                DataTable dt = dataSet.Tables[0];


                string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
                return(json);
            }
        }
    }
}