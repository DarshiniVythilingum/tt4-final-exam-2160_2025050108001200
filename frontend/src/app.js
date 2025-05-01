const modal = document.getElementById("createBugModal");
const openBtn = document.getElementById("createBugBtn");
const closeBtn = document.getElementById("closeModalBtn");

openBtn.onclick = () => modal.style.display = "flex";
closeBtn.onclick = () => modal.style.display = "none";

const bugForm = document.getElementById("bugForm");
bugForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const bugData = {
        title: document.getElementById("bugTitle").value,
        description: document.getElementById("bugDescription").value,
        priority: document.getElementById("bugPriority").value,
        isResolved: false
    };

    fetch("http://localhost:3000/bugs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bugData)
    })
    .then(res => res.json())
    .then(data => {
        alert("Bug created!");
        modal.style.display = "none";
        bugForm.reset();
    });
});
