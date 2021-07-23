using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProyectoEscuela.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
public class AlumnoVista
{
    public int idalumno { get; set; }
    public int idsalon { get; set; }

    public int idtiposangre { get; set; }

    public int idgenero { get; set; }

    public int idnivel { get; set; }

    public int idtutor { get; set; }
    public String nombre { get; set; }
    public String app { get; set; }
    public String apm { get; set; }
    public String curp { get; set; }
    public String genero { get; set; }
    public String sangre { get; set; }
    public float peso { get; set; }
    public float estatura { get; set; }
    public String direccion{ get; set; }
    public String nivel { get; set; }

    public String tutor { get; set; }
    public String apptutor { get; set; }
    public String apmtutor { get; set; }


    public DateTime fechanacimiento { get;  set; }

    public String salon { get; set; }
}

public class AlumnoModificar
{
    
    public String nombre { get; set; }
    public String app { get; set; }
    public String apm { get; set; }
    public String curp { get; set; }
    public int idgenero { get; set; }
    public int idtiposangre { get; set; }
    public float peso { get; set; }
    public float estatura { get; set; }
    public String direccion { get; set; }
    public int idnivel { get; set; }

    public int  idtutor { get; set; }

    public String fechanacimiento { get; set; }

    public int idsalon { get; set; }
}

public class AlumnoInsertar
{

    public String nombre { get; set; }
    public String app { get; set; }
    public String apm { get; set; }
    public String curp { get; set; }
    public String idgenero { get; set; }
    public String idtiposangre { get; set; }
    public String peso { get; set; }
    public String estatura { get; set; }
    public String direccion { get; set; }
    public String idnivel { get; set; }

    public String idtutor { get; set; }

    public String fechanacimiento { get; set; }

    public String idsalon { get; set; }
}

namespace ProyectoEscuela.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ControladorAlumno : ControllerBase
    {
        // GET: api/<ControladorAlumno>
        [HttpGet]
        public IEnumerable<AlumnoVista> Get()
        {
            var context = new escuelaContext();
            //  var tutores = context.Tutor.Where<Tutor>(e => e.Nombre.Contains("Iobani"));
            // var tutores = context.Tutor;
            var alumno = from e in context.Alumnos
                          join t in context.Genero on e.Idgenero equals t.Idgenero
                          join u in context.Tiposangre on e.Idtiposangre equals u.Idtiposangre
                          join v in context.Nivel on e.Idnivel equals v.Idnivel
                          join w in context.Tutor on e.Idtutor equals w.Idtutor
                          join x in context.Salones on e.Idsalon equals x.Idsalon
                         // where e.Idtutor.Equals(1)
                         select new AlumnoVista
                          {
                              idalumno = e.Idalumnos,
                              nombre = e.Nombre,
                              app = e.App,
                              apm = e.Apm,
                              genero = t.Genero1,
                              sangre = u.Tiposangre1,
                              peso = (float)e.Peso,
                              curp=e.Curp,
                              estatura= (float)e.Estatura,
                              direccion = e.Direccion,
                              nivel = v.Nivel1,
                              tutor = w.Nombre,
                              apptutor=w.App,
                              apmtutor=w.Apm,
                              fechanacimiento= (DateTime)e.Fechanacimiento,
                              salon=x.Salon,
                              idtutor=w.Idtutor,
                              idsalon=x.Idsalon,
                             idgenero=t.Idgenero,
                             idtiposangre=u.Idtiposangre,
                             idnivel=v.Idnivel

                          };
            return alumno;
        }

        // GET api/<ControladorAlumno>/5
        [HttpGet("{id}")]
        public void Get(int id)
        {
        
            var context = new escuelaContext();

            var alumno = context.Alumnos.Where<Alumnos>(e => e.Idalumnos == id).FirstOrDefault();


            alumno.Idsalon = 0;

            context.SaveChanges();
        }


        // POST api/<ControladorAlumno>
        [HttpPost]
        public void Post([FromBody] AlumnoInsertar value)
        {


            try
            {



                var context = new escuelaContext();



                // NOMBRE EN Alunos.cs || NOMBRE DE LA CLASE QUE CREE
                Alumnos alumno = new Alumnos
                {


                    Nombre = value.nombre,
                    App = value.app,
                    Apm = value.apm,
                    Idgenero = int.Parse(value.idgenero),
                    Idtiposangre = int.Parse(value.idtiposangre),
                    Peso = float.Parse(value.peso),
                    Curp = value.curp,
                    Estatura = float.Parse(value.estatura),
                    Direccion = value.direccion,
                    Idnivel = int.Parse(value.idnivel),
                    Idtutor = int.Parse(value.idtutor),
                    Fechanacimiento = DateTime.Parse(value.fechanacimiento),
                    Idsalon = int.Parse(value.idsalon)

                };



                context.Alumnos.Add(alumno);
                context.SaveChanges();
                return;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException.Message);
                return;
            }
        }

        // PUT api/<ControladorAlumno>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] AlumnoModificar value)
        {

            try
            {
                var context = new escuelaContext();

                var alumno = context.Alumnos.Where<Alumnos>(e => e.Idalumnos == id).FirstOrDefault();
                if (alumno == null) return;

                alumno.Nombre = value.nombre;
                alumno.App = value.app;
                alumno.Apm = value.apm;
                alumno.Curp = value.curp;
                alumno.Idgenero = value.idgenero;
                alumno.Peso = value.peso;
                alumno.Peso = value.estatura;
                alumno.Direccion = value.direccion;
                alumno.Idnivel = value.idnivel;
                alumno.Idtutor = value.idtutor;
                alumno.Fechanacimiento = DateTime.Parse(value.fechanacimiento);
                alumno.Idsalon = value.idsalon;
                alumno.Idtiposangre = value.idtiposangre;
              

                context.SaveChanges();
                return;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException.Message);
                return;
            }
        }

    

        // DELETE api/<ControladorAlumno>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

            try
            {
                var context = new escuelaContext();

                var alumno = context.Alumnos.Where<Alumnos>(e => e.Idalumnos == id).FirstOrDefault();
                if (alumno == null) return;

                context.Alumnos.Remove(alumno);
                context.SaveChanges();
                return;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException.Message);
                return;
            }

        }
    }
}
