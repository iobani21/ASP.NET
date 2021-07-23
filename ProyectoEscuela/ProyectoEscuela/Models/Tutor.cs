using System;
using System.Collections.Generic;

namespace ProyectoEscuela.Models
{
    public partial class Tutor
    {
        public Tutor()
        {
            Alumnos = new HashSet<Alumnos>();
        }

        public int Idtutor { get; set; }
        public string Nombre { get; set; }
        public string App { get; set; }
        public string Apm { get; set; }
        public int? Idparentesco { get; set; }
        public string Correoelectronico { get; set; }
        public string Telefono { get; set; }

        public virtual Parentesco IdparentescoNavigation { get; set; }
        public virtual ICollection<Alumnos> Alumnos { get; set; }
    }
}
