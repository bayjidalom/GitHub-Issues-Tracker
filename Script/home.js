console.log("Hello! This is home page")
// console.log("Hello! This is home page")
let activeTab = "all"

const api = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

console.log(api.length)

fetch(api)
    .then(res => res.json())
    .then(data => {
        issuesData = data.data;
        showIssues(issuesData);
    })

// counter function


// card load

function showIssues(issues) {
    const issuesContainer = document.getElementById("issues-container");
    issuesContainer.innerHTML = "";

    // filter issue
    let filteredIssues;

    if (activeTab === "all") {
        filteredIssues = issues;
    } else {
        filteredIssues = issues.filter(function (issue) {
            return issue.status === activeTab;
        });
    }

    for (let issue of issues) {
        // console.log(issue)
        const statusImg = issue.status === "open"
            ? "assets/Open-Status.png"
            : "assets/Closed-Status.png";

        const issueCard = document.createElement("div");

        // add border top dynamically
        issueCard.style.borderTop = issue.status === "open" ? "4px solid #00A96E" : "4px solid #A855F7";
        issueCard.style.borderRadius = "0.5rem";

        // labels dynamically
        const labelAdd = issue.labels.map(label => `
                <button class="btn btn-soft btn-secondary rounded-full border">${label}</button>
            `).join(" ")


        issueCard.innerHTML = `
                <div class="issue-card space-y-4 shadow-sm p-4 rounded-lg">

                    <!-- card status img -->
                    <div class="card-img-priority flex flex-1 justify-between items-center">
                        <div>
                            <img width="30px" src="${statusImg}" alt="">
                        </div>
                        
                        <button class="btn btn-soft btn-secondary rounded-full">${issue.priority}</button>
                    </div>

                    <!-- card header -->
                     <div class="card-header space-y-2">
                        <h2 class="font-semibold">${issue.title}</h2>
                        <p class="text-[#64748B] text-[14px]">${issue.description}</p>
                     </div>

                     <!-- topics name -->
                      ${labelAdd}

                      <!-- date -->

                      <div class="date py-4 border-t border-[#64748B]">
                        <p class="text-[#64748B]">#${issue.id} by ${issue.author}</p>
                        <p class="text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString()}</p>
                      </div>


                </div>
        `

        issuesContainer.append(issueCard);

    }
}

// tab-buttons

document.querySelectorAll(".issue-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        console.log("btn")
        const tabButtons = document.querySelectorAll(".issue-tab-btn");
        tabButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                activeTab = btn.dataset.tab;

                tabButtons.forEach(b => {
                    b.classList.remove("btn-primary");
                    b.classList.add("btn-outline");
                });

                btn.classList.remove("btn-outline");
                btn.classList.add("btn-primary");

                if (activeTab === "all") {
                    showIssues(issuesData);
                } else {
                    const filtered = issuesData.filter(issue => issue.status === activeTab);
                    showIssues(filtered);
                }
            })
        })