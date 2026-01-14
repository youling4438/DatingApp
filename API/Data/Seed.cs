using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedMembersAsync(AppDbContext context)
    {
        if (await context.Members.AnyAsync()) return;

        var memberData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var members = JsonSerializer.Deserialize<List<SeedUserDto>>(memberData);

        if (members != null)
        {
            foreach (var member in members)
            {
                using var hmac = new HMACSHA512();
                var user = new AppUser
                {
                    Id = member.Id,
                    Email = member.Email,
                    DisplayName = member.DisplayName,
                    ImageUrl = member.ImageUrl,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")),
                    PasswordSalt = hmac.Key,
                    Member = new Member
                    {
                        Id = member.Id,
                        DateOfBirth = member.DateOfBirth,
                        City = member.City,
                        Country = member.Country,
                        DisplayName = member.DisplayName,
                        Description = member.Description,
                        ImageUrl = member.ImageUrl,
                        Gender = member.Gender,
                        Created = member.Created,
                        LastActive = member.LastActive,
                    }
                };
                user.Member.Photos.Add(new Photo
                {
                    Url = member.ImageUrl!,
                    MemberId = member.Id,
                });
                context.Users.Add(user);
            } 
            await context.SaveChangesAsync();
        }
        else
        {
            Console.WriteLine("No members in seed data.");
        }
    }
}
