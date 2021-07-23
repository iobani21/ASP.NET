using System;
using System.Collections.Generic;

namespace ProyectoEscuela.Models
{
    public partial class Maestros
    {
        public Maestros()
        {
            Salones = new HashSet<Salones>();
        }

        public int Idmaestro { get; set; }
        public string Nombre { get; set; }
        public string App { get; set; }
        public string Apm { get; set; }
        public int? Idpuesto { get; set; }
        public string Rfc { get; set; }
        public string Direccion { get; set; }
        public string Correoelectronico { get; set; }
        public string Telefono { get; set; }
        public string Clave { get; set; }

        public virtual Puesto IdpuestoNavigation { get; set; }
        public virtual ICollection<Salones> Salones { get; set; }
    }
}
