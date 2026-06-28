// ১. ৮টা ডামি ডেটার অ্যারে (Lorem Ipsum ছাড়া অর্থপূর্ণ ডেটা)
let jobsData = [
    { id: 1, companyName: "Google", position: "Frontend Developer", location: "Dhaka", type: "Remote", salary: "$1200", description: "Expert in JS DOM.", status: "All" },
    { id: 2, companyName: "Facebook", position: "React Developer", location: "Remote", type: "Full-time", salary: "$1500", description: "Need UI specialist.", status: "All" },
    { id: 3, companyName: "Pathao", position: "Backend Engineer", location: "Banani", type: "Hybrid", salary: "$800", description: "Node.js expert required.", status: "All" },
    { id: 4, companyName: "Microsoft", position: "Software Engineer", location: "Remote", type: "Full-time", salary: "$2000", description: "C# and Azure cloud knowledge required.", status: "All" },
    { id: 5, companyName: "Bkash", position: "UI/UX Designer", location: "Gulshan", type: "Full-time", salary: "$1000", description: "Figma expert for mobile app design.", status: "All" },
    { id: 6, companyName: "Netflix", position: "Full Stack Developer", location: "Remote", type: "Contract", salary: "$1800", description: "MERN Stack expert needed.", status: "All" },
    { id: 7, companyName: "ShopUp", position: "Product Manager", location: "Tejgaon", type: "Hybrid", salary: "$1100", description: "Agile and Scrum methodologies.", status: "All" },
    { id: 8, companyName: "Amazon", position: "DevOps Engineer", location: "Remote", type: "Full-time", salary: "$2200", description: "Docker, Kubernetes, and AWS automation.", status: "All" }
];

let currentTab = "All"; // শুরুতে ডিফল্ট ট্যাব থাকবে All

// ২. ড্যাশবোর্ডের সংখ্যা আপডেট করার ফাংশন
function updateDashboard() {
    const total = jobsData.length;
    const interview = jobsData.filter(job => job.status === "Interview").length;
    const rejected = jobsData.filter(job => job.status === "Rejected").length;

    document.getElementById("total-jobs-count").innerText = total;
    document.getElementById("interview-count").innerText = interview;
    document.getElementById("rejected-count").innerText = rejected;
}

// ৩. UI-তে কার্ডগুলো দেখানোর মেইন ফাংশন
function renderJobs() {
    const container = document.getElementById("jobs-container");
    const noJobsMsg = document.getElementById("no-jobs-msg");
    container.innerHTML = ""; // আগের কোড ক্লিয়ার করা

    // ট্যাব অনুযায়ী ডেটা ফিল্টার করা
    let filteredJobs = jobsData;
    if (currentTab !== "All") {
        filteredJobs = jobsData.filter(job => job.status === currentTab);
    }

    // যদি কোনো জব না থাকে, মেসেজ দেখাবে
    if (filteredJobs.length === 0) {
        noJobsMsg.classList.remove("hidden");
    } else {
        noJobsMsg.classList.add("hidden");
    }

    // লুপ চালিয়ে কার্ড তৈরি করা
    filteredJobs.forEach(job => {
        const card = document.createElement("div");
        // 'relative' ক্লাস অ্যাড করা হয়েছে যেন ডিলিট বাটনটি কার্ডের সাপেক্ষে পজিশন হয়
        card.className = "bg-white p-5 rounded-lg shadow-md border relative transition duration-200 hover:shadow-lg";
        card.innerHTML = `
            <!-- ওপরের ডান পাশের ডিলিট আইকন বাটন -->
            <button onclick="handleDelete(${job.id})" class="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition duration-150" title="Delete Job">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>

            <!-- 'pr-8' ব্যবহার করা হয়েছে যেন নাম বড় হলেও ডিলিট আইকনের নিচে না ঢুকে যায় -->
            <h2 class="text-xl font-bold pr-8">${job.companyName}</h2>
            <p class="text-gray-600">${job.position} (${job.type})</p>
            <p class="text-sm text-gray-500">${job.location} | ${job.salary}</p>
            <p class="my-3 text-sm text-gray-700">${job.description}</p>
            
            <!-- নিচের বাটনে এখন শুধু Interview এবং Rejected আছে -->
            <div class="flex gap-2">
                <button onclick="handleStatus(${job.id}, 'Interview')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition">Interview</button>
                <button onclick="handleStatus(${job.id}, 'Rejected')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition">Rejected</button>
            </div>
        `;
        container.appendChild(card);
    });

    updateDashboard(); // ড্যাশবোর্ড আপডেট করা
}

// ৪. স্ট্যাটাস পরিবর্তন (Interview / Rejected বাটনে ক্লিক করলে)
function handleStatus(id, newStatus) {
    jobsData = jobsData.map(job => {
        if (job.id === id) {
            job.status = newStatus;
        }
        return job;
    });
    renderJobs(); // স্ট্যাটাস চেঞ্জ করে আবার UI রি-রেন্ডার করা
}

// ৫. ডিলিট বাটনের লজিক (আইকন ক্লিকে এটি রান হবে)
function handleDelete(id) {
    jobsData = jobsData.filter(job => job.id !== id); // ওই আইডি বাদে বাকিদের রাখা
    renderJobs(); // ডিলিট করার পর আবার UI রি-রেন্ডার করা
}

// ৬. ট্যাব পরিবর্তন করার ফাংশন
function switchTab(tabName) {
    currentTab = tabName;
    renderJobs();
}

// অ্যাপ রান করার শুরুতে প্রথমবার রেন্ডার করা
renderJobs();