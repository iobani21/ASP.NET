using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProyectoEscuela.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProyectoEscuela.Controllers
{

    public class Tutorados
    {
        public int idalumno { get; set; }
        public String nombre { get; set; }
        public String app { get; set; }
        public String apm { get; set; }

        public String salon { get; set; }

        public String nivel { get; set; }
    }

    public class TutorVista
    {
        public int Idtutor { get; set; }
        public String nombre { get; set; }
        public String app { get; set; }
        public String apm { get; set; }
        public int idparentesco { get; set; }
        public String parentesco { get; set; }
        public String correo { get; set; }
        public String telefono { get; set; }
    }

    public class TutorInsertar
    {
  
        public String nombre { get; set; }
        public String app { get; set; }
        public String apm { get; set; }
        public int  idparentesco { get; set; }
        public String correo { get; set; }
        public String telefono { get; set; }
    }



    [Route("api/[controller]")]
    [ApiController]
    public class ControladorTutor : ControllerBase
    {
        // GET: api/<ControladorMaestros>
        [HttpGet]
        public IEnumerable<TutorVista> Get()
        {
            var context = new escuelaContext();
            //  var tutores = context.Tutor.Where<Tutor>(e => e.Nombre.Contains("Iobani"));
            // var tutores = context.Tutor;
            var tutores = from e in context.Tutor
                          join t in context.Parentesco on e.Idparentesco equals t.Idparentesco
                         // where e.Idtutor.Equals(1)
                          select new TutorVista
                          {
                              Idtutor=e.Idtutor,
                              nombre = e.Nombre,
                              app = e.App,
                              apm = e.Apm,
                              parentesco = t.Parentesco1,
                              correo = e.Correoelectronico,
                              telefono=e.Telefono,
                              idparentesco=t.Idparentesco
                          };
            return tutores;
        }

        // GET api/<ControladorMaestros>/5
        [HttpGet("{id}")]
        public IEnumerable<Tutorados> Get(int id)
        {
            var context = new escuelaContext();

            var Alumnos = from e in context.Alumnos
                          join v in context.Nivel on e.Idnivel equals v.Idnivel
                          join x in context.Salones on e.Idsalon equals x.Idsalon
                          where e.Idtutor == id
                          select new Tutorados
                          {
                              idalumno = e.Idalumnos,
                              nombre = e.Nombre,
                              app = e.App,
                              apm = e.Apm,
                              nivel= v.Nivel1,
                              salon =x.Salon

                          };
            return Alumnos;
        }

        // POST api/<ControladorMaestros>
        [HttpPost]
        public void Post([FromBody] TutorInsertar value)
        {
            try
            {
                var context = new escuelaContext();



                // NOMBRE EN TUTOR.cs || NOMBRE DE LA CLASE QUE CREE
                Tutor tutor = new Tutor
                {

                    Nombre = value.nombre,
                    App = value.app,
                    Apm = value.apm,
                    Idparentesco = value.idparentesco,
                    Correoelectronico = value.correo,
                    Telefono = value.telefono
                };



                context.Tutor.Add(tutor);
                context.SaveChanges();
                return;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException.Message);
                return;
            }

        }

        // PUT api/<ControladorMaestros>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] TutorInsertar value)
        {
            try
            {
                var context = new escuelaContext();

                var tutor = context.Tutor.Where<Tutor>(e => e.Idtutor == id).FirstOrDefault();
                if (tutor == null) return;

                tutor.Nombre = value.nombre;
                tutor.App = value.app;
                tutor.Apm = value.apm;
                tutor.Idparentesco = value.idparentesco;
                tutor.Correoelectronico = value.correo;
                tutor.Telefono = value.telefono;




                context.SaveChanges();
                return;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException.Message);
                return;
            }
        }

        // DELETE api/<ControladorMaestros>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {


            try
            {

                var db = new escuelaContext();

            var query = (from a in db.Alumnos.Where<Alumnos>(a => a.Idtutor == id)
                         select a).ToList();

            foreach (var item in query)
            {
                item.Idtutor = 0;
            }
            db.SaveChanges();


            var context = new escuelaContext();

            var tutor = context.Tutor.Where<Tutor>(e => e.Idtutor == id).FirstOrDefault();
            if (tutor == null) return;

            context.Tutor.Remove(tutor);
            context.SaveChanges();

            foreach (var c in context.Alumnos.Where(c => c.Idtutor== id))
            {
                c.Idtutor = 0;
                context.SaveChanges();
            }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException.Message);
                return;
            }
        }
    }
}
