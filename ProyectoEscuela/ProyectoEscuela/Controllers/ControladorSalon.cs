using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProyectoEscuela.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
public class MostrarSalones
{
    public int idsalon { get; set; }
    public String salon { get; set; }
    public String horario { get; set; }
    public String nommaestro { get; set; }
    public String appmaestro { get; set; }
    public String apmmaestro { get; set; }

    public int idmaestro { get; set; }
    public int idhorario { get; set; }
}

public class InsertarSalon
{
   
    public int idhorario { get; set; }
    public int idmaestro { get; set; }
    public String salon { get; set; }
}


public class AlumnoSalon
{
    public int idalumno { get; set; }
    public String nombre { get; set; }
    public String app { get; set; }
    public String apm { get; set; }
}

namespace ProyectoEscuela.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ControladorSalon : ControllerBase
    {
        // GET: api/<ControladorSalon>
        [HttpGet]
        public IEnumerable<MostrarSalones> Get()
        {
            var context = new escuelaContext();
            var salones = from e in context.Salones
                        join t in context.Horarios on e.Idhorario equals t.Idhorario
                        join u in context.Maestros on e.Idmaestro equals u.Idmaestro
                        select new MostrarSalones
                        {
                            idsalon = e.Idsalon,
                            salon = e.Salon,
                            horario=t.Horario,
                            nommaestro=u.Nombre,
                            appmaestro=u.App,
                            apmmaestro=u.Apm,
                            idmaestro=u.Idmaestro,
                            idhorario=t.Idhorario

                        };
            return salones;

           
        }

        // GET api/<ControladorSalon>/5
        [HttpGet("{id}")]
        public IEnumerable<AlumnoSalon> Get(int id)
        {
            var context = new escuelaContext();
    
                var Alumnos = from e in context.Alumnos
            
                              where e.Idsalon==id
                              select new AlumnoSalon
                              {
                                  idalumno =e.Idalumnos,
                                  nombre=e.Nombre,
                                  app=e.App,
                                  apm=e.Apm

                              };
            return Alumnos; 
        }

        // POST api/<ControladorSalon>
        [HttpPost]
        public void Post([FromBody] InsertarSalon value)
        {
            try
            {

                var context = new escuelaContext();
                Salones salon = new Salones
                {

                    Idhorario = value.idhorario,
                    Idmaestro = value.idmaestro,
                    Salon = value.salon

                };
                context.Salones.Add(salon);
                context.SaveChanges();
                return;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException.Message);
                return;
            }
        }

        // PUT api/<ControladorSalon>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] InsertarSalon value)
        {
            try
            {
                var context = new escuelaContext();

                var salon = context.Salones.Where<Salones>(e => e.Idsalon == id).FirstOrDefault();

                salon.Salon = value.salon;
                salon.Idhorario = value.idhorario;
                salon.Idmaestro = value.idmaestro;
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException.Message);
                return;
            }

        }


        // DELETE api/<ControladorSalon>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            try
            {

                var db = new escuelaContext();

            var query = (from a in db.Alumnos.Where<Alumnos>(a=>a.Idsalon== id)
                         select a).ToList();

            foreach (var item in query)
            {
                item.Idsalon = 0;       
            }
                db.SaveChanges();
            



            var context = new escuelaContext();
            var salon = context.Salones.Where<Salones>(e => e.Idsalon == id).FirstOrDefault();
            if (salon == null) return;
            context.Salones.Remove(salon);
            context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException.Message);
                return;
            }
        }
    }
}
