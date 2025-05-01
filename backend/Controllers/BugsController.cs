namespace backend.Controllers
{
    using backend.Data;
    using backend.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [ApiController]
    [Route("/[controller]")]
    public class BugsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BugsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bug>>> GetBugs()
        {
            return await _context.Bugs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Bug>> GetBug(int id)
        {
            var bug = await _context.Bugs.FindAsync(id);
            if (bug == null) return NotFound();
            return bug;
        }

        [HttpPost]
        public async Task<ActionResult<Bug>> CreateBug(Bug bug)
        {
            _context.Bugs.Add(Bug);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBug), new { id = bug.Id }, bug);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBug(int id, Bug bug)
        {
            if (id != bug.Id) return BadRequest();

            _context.Entry(bug).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBug(int id)
        {
            var bug = await _context.Bugs.FindAsync(id);
            if (bug == null) return NotFound();

            _context.Tasks.Remove(bug);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}