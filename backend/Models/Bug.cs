namespace backend.Models
{
    public class Bug
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Priority { get; set; }  
        public bool IsResolved { get; set; }
    }
}
