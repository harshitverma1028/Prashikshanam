  const internships = [
      {id:1,title:"AI Research Intern",company:"NexTech Labs",stipend:25000,location:"Bengaluru",remote:false,match:87,skills:["Python","PyTorch","ML"],deadline:"2025-10-05"},
      {id:2,title:"Cloud & Infra Intern",company:"SkyScale",stipend:20000,location:"Remote",remote:true,match:74,skills:["AWS","Docker","Terraform"],deadline:"2025-09-28"},
      {id:3,title:"Product Management Intern",company:"Horizon Labs",stipend:15000,location:"Hyderabad",remote:false,match:66,skills:["Communication","Figma","Data Analysis"],deadline:"2025-10-12"}
    ];

    const listEl = document.getElementById("internshipList");
    const resultCount = document.getElementById("resultCount");
    const searchInput = document.getElementById("searchInput");
    const remoteOnly = document.getElementById("remoteOnly");
    const minMatch = document.getElementById("minMatch");
    const minMatchLabel = document.getElementById("minMatchLabel");
    const sortSelect = document.getElementById("sortSelect");
    const listViewBtn = document.getElementById("listViewBtn");
    const mapViewBtn = document.getElementById("mapViewBtn");
    const mapView = document.getElementById("mapView");

    let view = "list";

    function renderList() {
      listEl.innerHTML = "";
      let filtered = internships.filter(it=>{
        if(remoteOnly.checked && !it.remote) return false;
        if(it.match < minMatch.value) return false;
        if(searchInput.value && !(it.title+" "+it.company+" "+it.location).toLowerCase().includes(searchInput.value.toLowerCase())) return false;
        return true;
      });

      // sort
      if(sortSelect.value==="stipend") filtered.sort((a,b)=>b.stipend-a.stipend);
      if(sortSelect.value==="deadline") filtered.sort((a,b)=>new Date(a.deadline)-new Date(b.deadline));

      resultCount.textContent = filtered.length;

      if(view==="map") {
        listEl.style.display="none";
        mapView.style.display="block";
      } else {
        listEl.style.display="block";
        mapView.style.display="none";
        filtered.forEach(it=>{
          const card=document.createElement("div");
          card.className="internship-card";
          card.innerHTML=`
            <div class="company-icon">${it.company[0]}</div>
            <div style="flex:1">
              <div class="between">
                <div>
                  <h4 style="margin:0">${it.title}</h4>
                  <p style="margin:0;font-size:12px;opacity:0.7;">${it.company} • ${it.location}</p>
                </div>
                <div style="text-align:right;">
                  <p style="margin:0;font-size:14px;font-weight:bold;">₹${it.stipend}/mo</p>
                  <p style="margin:0;font-size:12px;opacity:0.7;">Deadline: ${it.deadline}</p>
                </div>
              </div>
              <div class="match-bar"><div class="match-fill" style="width:${it.match}%"></div></div>
              <div style="margin-top:8px;" class="skills">${it.skills.map(s=>`<span>${s}</span>`).join("")}</div>
              <div class="flex" style="margin-top:8px;">
                <button class="btn btn-primary" onclick="openModal(${it.id})">View</button>
                <button class="btn btn-outline">Save</button>
                <button class="btn btn-ghost">Not interested</button>
              </div>
            </div>`;
          listEl.appendChild(card);
        });
        if(filtered.length===0){
          listEl.innerHTML=`<div style="padding:20px;text-align:center;opacity:0.7;">No internships match your filters.</div>`;
        }
      }
    }

    function openModal(id){
      const it=internships.find(x=>x.id===id);
      document.getElementById("modalTitle").textContent=it.title;
      document.getElementById("modalCompany").textContent=it.company+" • "+it.location;
      document.getElementById("modalStipend").textContent="₹"+it.stipend+"/mo";
      document.getElementById("modalDeadline").textContent=it.deadline;
      document.getElementById("modalSkills").textContent=it.skills.join(", ");
      document.getElementById("modal").style.display="flex";
    }
    function closeModal(){
      document.getElementById("modal").style.display="none";
    }

    // events
    searchInput.addEventListener("input",renderList);
    remoteOnly.addEventListener("change",renderList);
    minMatch.addEventListener("input",()=>{minMatchLabel.textContent=minMatch.value;renderList();});
    sortSelect.addEventListener("change",renderList);
    listViewBtn.addEventListener("click",()=>{view="list";renderList();});
    mapViewBtn.addEventListener("click",()=>{view="map";renderList();});

    renderList();