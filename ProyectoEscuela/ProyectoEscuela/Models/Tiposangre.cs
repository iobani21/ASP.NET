using System;
using System.Collections.Generic;

namespace ProyectoEscuela.Models
{
    public partial class Tiposangre
    {
        public Tiposangre()
        {
            Alumnos = new HashSet<Alumnos>();
        }

        public int Idtiposangre { get; set; }
        public string Tiposangre1 { get; set; }

        public virtual ICollection<Alumnos> Alumnos { get; set; }
    }
}
