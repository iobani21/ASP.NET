using System;
using System.Collections.Generic;

namespace ProyectoEscuela.Models
{
    public partial class Parentesco
    {
        public Parentesco()
        {
            Tutor = new HashSet<Tutor>();
        }

        public int Idparentesco { get; set; }
        public string Parentesco1 { get; set; }

        public virtual ICollection<Tutor> Tutor { get; set; }
    }
}
