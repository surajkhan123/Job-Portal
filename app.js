let jobs =[
  {title: "Frontend Developer", location: "Bangalore", salary: "6 LPA"},
  {title: "Backend Developer", location: "Mumbai", salary: "8 LPA"},
  {title: "Full Stack Developer", location: "Noida", salary: "10 LPA"},
];

const jobList = document.getElementById("job-list");

function displayJobs(data){
  jobList.innerHTML ="";

  data.forEach(job =>{
    let div = document.createElement("div");
    div.classList.add("col-md-4");

    div.innerHTML = `
    <div class="job-card">
    <h4>${job.title}</h4>
    <p>${job.location}</p>
    <p>${job.salary}</p>
    <button class="btn btn-primary apply-btn" onclick="applyJob('${job.title}', this)">Apply</button>
    </div>
    
    `;
    jobList.appendChild(div);
  });
}

function applyJob(title, btn){

  let msg = document.getElementById("applyMsg");
  let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
  
  msg.innerText = "";

  // check duplicate
  if(appliedJobs.includes(title)){
    msg.classList.remove("text-success");
    msg.classList.add("text-danger");
    msg.innerText = "⚠️ Already applied for this job";
    return;
  }

  // save job
  appliedJobs.push(title);
  localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));

  // show success message
  msg.classList.remove("text-danger");
  localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));

  // show success message
  msg.classList.remove("text-danger");
  msg.classList.add("text-success");
  msg.innerText = "✅ Applied Successfully";

  // disable button
  btn.innerText = "Applied";
  btn.disabled = true;
  btn.classList.remove("btn-primary");
  btn.classList.add("btn-success");
  

}
displayJobs(jobs);

//Search
document.getElementById("searchInput").addEventListener("input", function(e){
  let value = e.target.value.toLowerCase();

  let filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(value)
  );
  displayJobs(filtered);
});

// page protection check login
let user = localStorage.getItem("loggedInUser");

if(!user){
  window.location.href = "login.html";
}

// show user email in navbar
/* let userEmail = localStorage.getItem("loggedInUser");

 if(userEmail){
   let el = document.getElementById("userEmail");
  if(el) el.innerText = userEmail;
 } */

// showing user name
let storedUser = JSON.parse(localStorage.getItem("user"));

if(storedUser){
  let el = document.getElementById("userName");
  if (el) el.innerText = "Welcome, "+storedUser.name;
}

// logout
function logout(){
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
}