using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; } = null!;
    public DbSet<Member> Members { get; set; } = null!;
    public DbSet<Photo> Photos { get; set; } = null!;
}
