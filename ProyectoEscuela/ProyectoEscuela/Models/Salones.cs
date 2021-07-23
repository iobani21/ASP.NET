using System;
using System.Collections.Generic;

namespace ProyectoEscuela.Models
{
    public partial class Salones
    {
        public Salones()
        {
            Alumnos = new HashSet<Alumnos>();
        }

        public int Idsalon { get; set; }
        public int? Idhorario { get; set; }
        public int? Idmaestro { get; set; }
        public string Salon { get; set; }

        public virtual Horarios IdhorarioNavigation { get; set; }
        public virtual Maestros IdmaestroNavigation { get; set; }
        public virtual ICollection<Alumnos> Alumnos { get; set; }
    }
}
