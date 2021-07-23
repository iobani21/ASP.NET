using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProyectoEscuela.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
public class Usuario
{
    public String correo { get; set; }
    public String clave { get; set; }
}

public class Logueado
{
    public String correo { get; set; }
    public String clave { get; set; }

    public String nombre { get; set; }

    public int idpuesto { get; set; }

    public int idmaestro { get; set; }

}
namespace ProyectoEscuela.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Login : ControllerBase
    {
        int bandera=0;
        // POST api/<ControladorAlumno>
        [HttpPost]
        public IEnumerable<Logueado> Post([FromBody] Usuario value)
        {
            
            var context = new escuelaContext();
            //  var tutores = context.Tutor.Where<Tutor>(e => e.Nombre.Contains("Iobani"));
            // var tutores = context.Tutor;
            var maestro = from e in context.Maestros
                          join t in context.Puesto on e.Idpuesto equals t.Idpuesto
                          where e.Correoelectronico.Equals(value.correo)
                          where e.Clave.Equals(Encriptacion.Encriptar(value.clave))
                          select new Logueado
                          {
                              idmaestro = e.Idmaestro,
                              nombre = e.Nombre,
                              idpuesto = t.Idpuesto,
                              correo = e.Correoelectronico,
                              clave = e.Clave,
                         
                          };
            if (maestro == null)
            {
                return null;
            }
        
                return maestro;

        }


    }
}
