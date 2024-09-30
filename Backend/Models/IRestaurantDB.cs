using Microsoft.EntityFrameworkCore;

namespace RestaurantFavesBackend.Models
{
	public interface IRestaurantDB
	{
		public DbSet<Order> Orders { get; }

		public int SaveChanges();
	}
}
