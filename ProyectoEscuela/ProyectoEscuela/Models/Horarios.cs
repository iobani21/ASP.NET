using System;
using System.Collections.Generic;

namespace ProyectoEscuela.Models
{
    public partial class Horarios
    {
        public Horarios()
        {
            Salones = new HashSet<Salones>();
        }

        public int Idhorario { get; set; }
        public string Horario { get; set; }

        public virtual ICollection<Salones> Salones { get; set; }
    }
}
