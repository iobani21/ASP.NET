using System;
using System.Collections.Generic;

namespace ProyectoEscuela.Models
{
    public partial class Genero
    {
        public Genero()
        {
            Alumnos = new HashSet<Alumnos>();
        }

        public int Idgenero { get; set; }
        public string Genero1 { get; set; }

        public virtual ICollection<Alumnos> Alumnos { get; set; }
    }
}
