using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ProyectoEscuela.Models
{
    public partial class escuelaContext : DbContext
    {
        public escuelaContext()
        {
        }

        public escuelaContext(DbContextOptions<escuelaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Alumnos> Alumnos { get; set; }
        public virtual DbSet<Genero> Genero { get; set; }
        public virtual DbSet<Horarios> Horarios { get; set; }
        public virtual DbSet<Maestros> Maestros { get; set; }
        public virtual DbSet<Nivel> Nivel { get; set; }
        public virtual DbSet<Parentesco> Parentesco { get; set; }
        public virtual DbSet<Puesto> Puesto { get; set; }
        public virtual DbSet<Salones> Salones { get; set; }
        public virtual DbSet<Tiposangre> Tiposangre { get; set; }
        public virtual DbSet<Tutor> Tutor { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySql("server=localhost;database=escuela;user=root;password=admin", x => x.ServerVersion("8.0.21-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Alumnos>(entity =>
            {
                entity.HasKey(e => e.Idalumnos)
                    .HasName("PRIMARY");

                entity.ToTable("alumnos");

                entity.HasIndex(e => e.Idgenero)
                    .HasName("idgenero_idx");

                entity.HasIndex(e => e.Idnivel)
                    .HasName("idnivel_idx");

                entity.HasIndex(e => e.Idsalon)
                    .HasName("idsalon_idx");

                entity.HasIndex(e => e.Idtiposangre)
                    .HasName("idtipodesangre_idx");

                entity.HasIndex(e => e.Idtutor)
                    .HasName("idtutor_idx");

                entity.Property(e => e.Idalumnos).HasColumnName("idalumnos");

                entity.Property(e => e.Apm)
                    .HasColumnName("apm")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.App)
                    .HasColumnName("app")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Curp)
                    .HasColumnName("curp")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Direccion)
                    .HasColumnName("direccion")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Estatura).HasColumnName("estatura");

                entity.Property(e => e.Fechanacimiento)
                    .HasColumnName("fechanacimiento")
                    .HasColumnType("date");

                entity.Property(e => e.Idgenero).HasColumnName("idgenero");

                entity.Property(e => e.Idnivel).HasColumnName("idnivel");

                entity.Property(e => e.Idsalon).HasColumnName("idsalon");

                entity.Property(e => e.Idtiposangre).HasColumnName("idtiposangre");

                entity.Property(e => e.Idtutor).HasColumnName("idtutor");

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Peso).HasColumnName("peso");

                entity.HasOne(d => d.IdgeneroNavigation)
                    .WithMany(p => p.Alumnos)
                    .HasForeignKey(d => d.Idgenero)
                    .HasConstraintName("idgenero");

                entity.HasOne(d => d.IdnivelNavigation)
                    .WithMany(p => p.Alumnos)
                    .HasForeignKey(d => d.Idnivel)
                    .HasConstraintName("idnivel");

                entity.HasOne(d => d.IdsalonNavigation)
                    .WithMany(p => p.Alumnos)
                    .HasForeignKey(d => d.Idsalon)
                    .HasConstraintName("idsalon");

                entity.HasOne(d => d.IdtiposangreNavigation)
                    .WithMany(p => p.Alumnos)
                    .HasForeignKey(d => d.Idtiposangre)
                    .HasConstraintName("idtipodesangre");

                entity.HasOne(d => d.IdtutorNavigation)
                    .WithMany(p => p.Alumnos)
                    .HasForeignKey(d => d.Idtutor)
                    .HasConstraintName("idtutor");
            });

            modelBuilder.Entity<Genero>(entity =>
            {
                entity.HasKey(e => e.Idgenero)
                    .HasName("PRIMARY");

                entity.ToTable("genero");

                entity.Property(e => e.Idgenero).HasColumnName("idgenero");

                entity.Property(e => e.Genero1)
                    .HasColumnName("genero")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            modelBuilder.Entity<Horarios>(entity =>
            {
                entity.HasKey(e => e.Idhorario)
                    .HasName("PRIMARY");

                entity.ToTable("horarios");

                entity.Property(e => e.Idhorario).HasColumnName("idhorario");

                entity.Property(e => e.Horario)
                    .HasColumnName("horario")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            modelBuilder.Entity<Maestros>(entity =>
            {
                entity.HasKey(e => e.Idmaestro)
                    .HasName("PRIMARY");

                entity.ToTable("maestros");

                entity.HasIndex(e => e.Idpuesto)
                    .HasName("idpuesto_idx");

                entity.Property(e => e.Idmaestro).HasColumnName("idmaestro");

                entity.Property(e => e.Apm)
                    .HasColumnName("apm")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.App)
                    .HasColumnName("app")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Clave)
                    .HasColumnName("clave")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Correoelectronico)
                    .HasColumnName("correoelectronico")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Direccion)
                    .HasColumnName("direccion")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Idpuesto).HasColumnName("idpuesto");

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Rfc)
                    .HasColumnName("rfc")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Telefono)
                    .HasColumnName("telefono")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.HasOne(d => d.IdpuestoNavigation)
                    .WithMany(p => p.Maestros)
                    .HasForeignKey(d => d.Idpuesto)
                    .HasConstraintName("idpuesto");
            });

            modelBuilder.Entity<Nivel>(entity =>
            {
                entity.HasKey(e => e.Idnivel)
                    .HasName("PRIMARY");

                entity.ToTable("nivel");

                entity.Property(e => e.Idnivel).HasColumnName("idnivel");

                entity.Property(e => e.Nivel1)
                    .HasColumnName("nivel")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            modelBuilder.Entity<Parentesco>(entity =>
            {
                entity.HasKey(e => e.Idparentesco)
                    .HasName("PRIMARY");

                entity.ToTable("parentesco");

                entity.Property(e => e.Idparentesco).HasColumnName("idparentesco");

                entity.Property(e => e.Parentesco1)
                    .HasColumnName("parentesco")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            modelBuilder.Entity<Puesto>(entity =>
            {
                entity.HasKey(e => e.Idpuesto)
                    .HasName("PRIMARY");

                entity.ToTable("puesto");

                entity.Property(e => e.Idpuesto).HasColumnName("idpuesto");

                entity.Property(e => e.Puesto1)
                    .HasColumnName("puesto")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            modelBuilder.Entity<Salones>(entity =>
            {
                entity.HasKey(e => e.Idsalon)
                    .HasName("PRIMARY");

                entity.ToTable("salones");

                entity.HasIndex(e => e.Idhorario)
                    .HasName("idhorario_idx");

                entity.HasIndex(e => e.Idmaestro)
                    .HasName("idmaestro_idx");

                entity.Property(e => e.Idsalon).HasColumnName("idsalon");

                entity.Property(e => e.Idhorario).HasColumnName("idhorario");

                entity.Property(e => e.Idmaestro).HasColumnName("idmaestro");

                entity.Property(e => e.Salon)
                    .HasColumnName("salon")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.HasOne(d => d.IdhorarioNavigation)
                    .WithMany(p => p.Salones)
                    .HasForeignKey(d => d.Idhorario)
                    .HasConstraintName("idhorario");

                entity.HasOne(d => d.IdmaestroNavigation)
                    .WithMany(p => p.Salones)
                    .HasForeignKey(d => d.Idmaestro)
                    .HasConstraintName("idmaestro");
            });

            modelBuilder.Entity<Tiposangre>(entity =>
            {
                entity.HasKey(e => e.Idtiposangre)
                    .HasName("PRIMARY");

                entity.ToTable("tiposangre");

                entity.Property(e => e.Idtiposangre).HasColumnName("idtiposangre");

                entity.Property(e => e.Tiposangre1)
                    .HasColumnName("tiposangre")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            modelBuilder.Entity<Tutor>(entity =>
            {
                entity.HasKey(e => e.Idtutor)
                    .HasName("PRIMARY");

                entity.ToTable("tutor");

                entity.HasIndex(e => e.Idparentesco)
                    .HasName("idparentesco_idx");

                entity.Property(e => e.Idtutor).HasColumnName("idtutor");

                entity.Property(e => e.Apm)
                    .HasColumnName("apm")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.App)
                    .HasColumnName("app")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Correoelectronico)
                    .HasColumnName("correoelectronico")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Idparentesco).HasColumnName("idparentesco");

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Telefono)
                    .HasColumnName("telefono")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.HasOne(d => d.IdparentescoNavigation)
                    .WithMany(p => p.Tutor)
                    .HasForeignKey(d => d.Idparentesco)
                    .HasConstraintName("idparentesco");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        internal void SubmitChanges()
        {
            throw new NotImplementedException();
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
