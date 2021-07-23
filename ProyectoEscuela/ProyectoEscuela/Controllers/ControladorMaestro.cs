using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProyectoEscuela.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

public class MaestroVista
{
    public int idmaestro { get; set; }
    public String nombre { get; set; }
    public String app { get; set; }
    public String apm { get; set; }
    public String puesto { get; set; }
    public String rfc { get; set; }
    public String direccion{ get; set; }
    public String correo { get; set; }
    public String telefono { get; set; }
    public String clave { get; set; }

    public int idpuesto { get; set; }
}

public class userLogin
{
    public int idmaestro { get; set; }
    public String nombre { get; set; }

    public int puesto { get; set; }

    public String passwordñ { get; set; }
}

public class Login
{
    public String correo { get; set; }
    public String password { get; set; }
}
public class MaestroInsertar
{

    public String nombre { get; set; }
    public String app { get; set; }
    public String apm { get; set; }
    public String  idpuesto { get; set; }
    public String rfc { get; set; }
    public String direccion { get; set; }
    public String correo { get; set; }
    public String telefono { get; set; }
    public String clave { get; set; }
}

namespace ProyectoEscuela.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ControladorMaestro : ControllerBase
    {
        // GET: api/<ControladorMaestro>
        [HttpGet]
        public IEnumerable<MaestroVista> Get()
        {
            var context = new escuelaContext();
            //  var tutores = context.Tutor.Where<Tutor>(e => e.Nombre.Contains("Iobani"));
            // var tutores = context.Tutor;
            var maestro = from e in context.Maestros
                          join t in context.Puesto on e.Idpuesto equals t.Idpuesto
                          // where e.Idtutor.Equals(1)
                          select new MaestroVista
                          {
                               idpuesto=t.Idpuesto,
                              idmaestro = e.Idmaestro,
                              nombre = e.Nombre,
                              app = e.App,
                              apm = e.Apm,
                              puesto = t.Puesto1,
                              rfc=e.Rfc,
                              direccion=e.Direccion,
                              correo = e.Correoelectronico,
                              telefono = e.Telefono,
                              clave = Encriptacion.DesEncriptar(e.Clave)
                          };
            return maestro;
        }

        // GET api/<ControladorMaestro>/5
        [HttpGet("{id}")]
        public IEnumerable<MaestroVista> Get(int id)
        {
            var context = new escuelaContext();
            //  var tutores = context.Tutor.Where<Tutor>(e => e.Nombre.Contains("Iobani"));
            // var tutores = context.Tutor;
            var maestro = from e in context.Maestros
                        join t in context.Puesto on e.Idpuesto equals t.Idpuesto
                        where e.Idmaestro.Equals(id)
                        select new MaestroVista
                        {
                            idmaestro = e.Idmaestro,
                            nombre = e.Nombre,
                            app = e.App,
                            apm = e.Apm,
                            puesto = t.Puesto1,
                            rfc = e.Rfc,
                            direccion = e.Direccion,
                            correo = e.Correoelectronico,
                            telefono = e.Telefono,
                            clave =Encriptacion.DesEncriptar(e.Clave)
                        };
            return maestro;
        }

        // POST api/<ControladorMaestro>
        [HttpPost]
        public void Post( MaestroInsertar value)
        {
            try
            {

                var context = new escuelaContext();



                // NOMBRE EN TUTOR.cs || NOMBRE DE LA CLASE QUE CREE
                Maestros maestro = new Maestros
                {

                    Nombre = value.nombre,
                    App = value.app,
                    Apm = value.apm,
                    Idpuesto = int.Parse(value.idpuesto),
                    Rfc = value.rfc,
                    Direccion = value.direccion,
                    Correoelectronico = value.correo,
                    Telefono = value.telefono,
                    Clave = Encriptacion.Encriptar(value.clave)
                };



                context.Maestros.Add(maestro);
                context.SaveChanges();
                return;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException.Message);
                return;
            }
        }

 


        // PUT api/<ControladorMaestro>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] MaestroInsertar value)
        {
            try
            {
                var context = new escuelaContext();


                var maestro = context.Maestros.Where<Maestros>(e => e.Idmaestro == id).FirstOrDefault();
                if (maestro == null) return;

                maestro.Idpuesto = int.Parse(value.idpuesto);
                maestro.Nombre = value.nombre;
                maestro.App = value.app;
                maestro.Apm = value.apm;
                maestro.Rfc = value.rfc;
                maestro.Direccion = value.direccion;
                maestro.Correoelectronico = value.correo;
                maestro.Telefono = value.telefono;
                maestro.Clave = Encriptacion.Encriptar(value.clave);



                context.SaveChanges();
                return;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException.Message);
                return;
            }

        }

        // DELETE api/<ControladorMaestro>/5
        [HttpDelete("{id}")]
         public void Delete(int id)
        {
            try
            {
                var context = new escuelaContext();
                var context2 = new escuelaContext();

                var salon = context2.Salones.Where<Salones>(e => e.Idmaestro == id).FirstOrDefault();
                if (salon != null)
                {
                    salon.Idmaestro = 0;
                    context2.SaveChanges();
                }




                var maestro = context.Maestros.Where<Maestros>(e => e.Idmaestro == id).FirstOrDefault();
                if (maestro == null) return;

                context.Maestros.Remove(maestro);
                context.SaveChanges();


                foreach (var c in context.Salones.Where(c => c.Idmaestro == id))
                {
                    c.Idmaestro = 0;
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
