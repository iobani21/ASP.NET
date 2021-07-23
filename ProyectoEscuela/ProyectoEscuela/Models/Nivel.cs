using System;
using System.Collections.Generic;

namespace ProyectoEscuela.Models
{
    public partial class Nivel
    {
        public Nivel()
        {
            Alumnos = new HashSet<Alumnos>();
        }

        public int Idnivel { get; set; }
        public string Nivel1 { get; set; }

        public virtual ICollection<Alumnos> Alumnos { get; set; }
    }
}
