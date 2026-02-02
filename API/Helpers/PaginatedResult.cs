using Microsoft.EntityFrameworkCore;
namespace API.Helpers;

public class PaginatedResult<T>
{
    public PaginationMetadata Metadata { get; set; } = default!;
    public List<T> Items { get; set; } = [];
}

public class PaginationMetadata
{
    public int CurrentPage { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }
};

public class PaginationHelper
{
    public static async Task<PaginatedResult<T>> CreateAsync<T>(IQueryable<T> query, int pageNumber, int pageSize)
    {
        var count = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(count / (double)pageSize);
        var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

        var metadata = new PaginationMetadata
        {
            CurrentPage = pageNumber,
            PageSize = pageSize,
            TotalCount = count,
            TotalPages = totalPages
        };

        return new PaginatedResult<T>
        {
            Metadata = metadata,
            Items = items
        };
    }

}
