
using RestaurantFavesBackend.Models;

namespace RestaurantFavesBackend
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.

			builder.Services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			builder.Services.AddSingleton<IRestaurantDB, RestaurantFavsContext>();

			builder.Services.AddCors(options =>
			{
				options.AddDefaultPolicy(
					policy =>
					{
						//replace localhost with yours
						//also add your deployed website
						policy.WithOrigins("http://localhost:4200",
										   "https://dinosaur-lore-store.com")
							.AllowAnyMethod().AllowAnyHeader();
					});
			});

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();

			app.UseAuthorization();


			app.MapControllers();

			app.Run();
		}
	}
}
