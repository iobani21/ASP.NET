using System;
using System.Collections.Generic;

namespace ProyectoEscuela.Models
{
    public partial class Puesto
    {
        public Puesto()
        {
            Maestros = new HashSet<Maestros>();
        }

        public int Idpuesto { get; set; }
        public string Puesto1 { get; set; }

        public virtual ICollection<Maestros> Maestros { get; set; }
    }
}
