namespace RestaurantFavesBackend.Models;

public partial class Order
{
    public int Id { get; set; }

    public string? Description { get; set; }

    public string? Restaurant { get; set; }

    public byte? Rating { get; set; }

    public bool? OrderAgain { get; set; }

    public void CopyFrom(Order other)
    {
        Id = other.Id;
        Description = other.Description;
        Restaurant = other.Restaurant;
        Rating = other.Rating;
        OrderAgain = other.OrderAgain;
    }
}
