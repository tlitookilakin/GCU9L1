using Microsoft.AspNetCore.Mvc;
using RestaurantFavesBackend.Models;

namespace RestaurantFavesBackend.Controllers
{
	[Route("orders")]
	[ApiController]
	public class OrderController(IRestaurantDB database) : ControllerBase
	{
		[HttpGet]
		public IActionResult GetAll(string? restaurant = null, bool? orderAgain = null)
		{
			IEnumerable<Order> results = database.Orders;

			if (orderAgain.HasValue)
				results = results.Where(o => o.OrderAgain == orderAgain.Value);

			if (restaurant is not null)
				results = results.Where(o => o.Restaurant.StartsWith(restaurant, StringComparison.OrdinalIgnoreCase));

			return Ok(results);
		}

		[HttpGet("{id}")]
		public IActionResult GetSpecific(int id)
			=> database.Orders.Find(id) is Order order ? Ok(order) : NotFound();

		[HttpPost]
		public IActionResult CreateEntry([FromBody] Order order)
		{
			order.Id = 0;
			database.Orders.Add(order);
			database.SaveChanges();
			return Created($"orders/{order.Id}", order);
		}

		[HttpPut("{id}")]
		public IActionResult UpdateOrder(int id, [FromBody] Order order)
		{
			if (order.Id != id)
				return BadRequest("Id mismatch");

			if (database.Orders.Find(id) is not Order existing)
				return NotFound();

			existing.CopyFrom(order);
			database.Orders.Update(existing);
			database.SaveChanges();

			return Ok(order);
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteOrder(int id)
		{
			if (database.Orders.Find(id) is not Order order)
				return NotFound();

			database.Orders.Remove(order);
			return NoContent();
		}
	}
}
