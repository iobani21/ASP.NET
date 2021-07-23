using System;
using System.Collections.Generic;

namespace ProyectoEscuela.Models
{
    public partial class Alumnos
    {
        public int Idalumnos { get; set; }
        public string Nombre { get; set; }
        public string App { get; set; }
        public string Apm { get; set; }
        public string Curp { get; set; }
        public int? Idgenero { get; set; }
        public int? Idtiposangre { get; set; }
        public float? Peso { get; set; }
        public float? Estatura { get; set; }
        public string Direccion { get; set; }
        public int? Idnivel { get; set; }
        public int? Idtutor { get; set; }
        public DateTime? Fechanacimiento { get; set; }
        public int? Idsalon { get; set; }

        public virtual Genero IdgeneroNavigation { get; set; }
        public virtual Nivel IdnivelNavigation { get; set; }
        public virtual Salones IdsalonNavigation { get; set; }
        public virtual Tiposangre IdtiposangreNavigation { get; set; }
        public virtual Tutor IdtutorNavigation { get; set; }
    }
}
