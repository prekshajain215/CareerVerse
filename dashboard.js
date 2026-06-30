const orbitContainer = document.querySelector("#orbitContainer");
const panel = document.querySelector(".info-panel");
const username = document.querySelector("#username");
const levelText = document.querySelector("#level");
const xpText = document.querySelector("#xp");
const skillInput = document.querySelector("#skillInput");
const skillCategory = document.querySelector("#skillCategory");
const addSkillBtn = document.querySelector("#addSkill");
const xpPopup = document.querySelector("#xpPopup");
const levelPopup = document.querySelector("#levelPopup");
const sun = document.querySelector(".sun");
const skillMessage = document.querySelector("#skillMessage");
const progress = document.querySelector("#progress");

let xp = Number(localStorage.getItem("xp")) || 0;
let currentLevel = Math.floor(xp / 100) + 1;

let userName =
localStorage.getItem("username") || "Guest";

username.textContent = userName;

let planets =
JSON.parse(localStorage.getItem("planets")) || [];

let skills =
JSON.parse(localStorage.getItem("skills")) || {};

skillInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        addSkillBtn.click();

    }

});

function showWelcome(){

    let totalItems = 0;

    Object.values(skills).forEach((planet)=>{

        totalItems += planet.length;

    });

    panel.innerHTML = `

        <h2>🌌 Career Dashboard</h2>

        <hr>

        <p>👋 Welcome, <b>${userName}</b></p>

        <p>🪐 Planets : <b>${planets.length}</b></p>

        <p>📚 Total Items : <b>${totalItems}</b></p>

        <p>⭐ Level : <b>${currentLevel}</b></p>

        <p>🔥 XP : <b>${xp}</b></p>

        <hr>

        <p style="text-align:center;">
        Click any planet to explore 🚀
        </p>

    `;

}

function updateSun(){

    let level = Math.floor(xp/100)+1;

    if(level>currentLevel){

        currentLevel = level;

        showLevelUp(level);

    }

    let currentXP = xp % 100;

    let percentage = (currentXP/100)*100;

    levelText.textContent = `Level ${currentLevel}`;

    xpText.textContent = `${currentXP}/100 XP`;

    progress.style.width = percentage + "%";

}

function showLevelUp(level){

    levelPopup.innerHTML = `
        🎉<br>
        Level ${level}<br>
        Unlocked!
    `;

    levelPopup.style.opacity = "1";

    sun.classList.add("levelup");

    setTimeout(()=>{

        levelPopup.style.opacity = "0";

        sun.classList.remove("levelup");

    },2000);

}

function showXP(amount){

    if(!xpPopup) return;

    xpPopup.textContent = amount;

    xpPopup.style.color =
    amount.startsWith("+")
    ? "#00ff88"
    : "#ff5252";

    xpPopup.style.animation = "none";

    xpPopup.offsetHeight;

    xpPopup.style.animation =
    "floatXP 1.2s ease forwards";

}

updateSun();

showWelcome();
function generatePlanets(){

    orbitContainer.innerHTML = "";

    const orbitSizes = [220,320,420,520];

    planets.forEach((planet,index)=>{

        const orbitSize =
        orbitSizes[index % orbitSizes.length];

        const orbitSpeed =
        12 + (index % 4) * 4;

        const angle =
        (index * 45) % 360;

        orbitContainer.innerHTML += `

        <div
        class="orbit"

        style="
        width:${orbitSize}px;
        height:${orbitSize}px;
        animation:rotate ${orbitSpeed}s linear infinite;
        transform:
        translate(-50%,-50%)
        rotate(${angle}deg);
        ">

            <div

            class="planet"

            data-planet="${planet.name}"

            style="
            background:${planet.color};
            box-shadow:0 0 18px ${planet.color};
            ">

                ${planet.name}

            </div>

        </div>

        `;

    });

    attachPlanetEvents();

}

generatePlanets();

planets.forEach((planet)=>{

    skillCategory.innerHTML += `

    <option value="${planet.name}">

        ${planet.name}

    </option>

    `;

});

addSkillBtn.addEventListener("click",()=>{

    const skill =
    skillInput.value.trim();

    const category =
    skillCategory.value;

    if(skill===""){

        alert("Please enter a skill or project.");

        return;

    }

    if(

        skills[category].some(

            item=>

            item.toLowerCase()

            ===

            skill.toLowerCase()

        )

    ){

        alert("Already exists!");

        return;

    }

    skills[category].push(skill);

    xp += 20;

    showXP("+20 XP");

    localStorage.setItem(

        "skills",

        JSON.stringify(skills)

    );

    localStorage.setItem(

        "xp",

        xp

    );

    updateSun();

    showWelcome();

    skillInput.value = "";

    skillCategory.selectedIndex = 0;

    skillMessage.textContent =
    "✅ +20 XP Added";

    skillMessage.style.opacity="1";

    skillMessage.style.transform="translateX(0)";

    setTimeout(()=>{

        skillMessage.style.opacity="0";

        skillMessage.style.transform="translateX(100px)";

    },2000);

});
function showPlanet(planetName){

    const items = skills[planetName] || [];

    panel.innerHTML = `

        <h2>

        ${planetName==="Projects"

        ? "🚀 Projects"

        : "🪐 " + planetName}

        </h2>

        <hr>

        ${
        items.length===0

        ?

        `
        <div class="empty-message">

            <h3>Nothing Here Yet 🌌</h3>

            <p>

            Add your first skill or project
            to this planet.

            </p>

        </div>
        `

        :

        `

        <ul>

        ${items.map((item,index)=>`

        <li>

            ${item}

            <button

            class="delete-skill"

            data-planet="${planetName}"

            data-index="${index}">

            ❌

            </button>

        </li>

        `).join("")}

        </ul>

        `

        }

    `;

    addDeleteEvents();

}

function attachPlanetEvents(){

    const generatedPlanets =

    document.querySelectorAll(".planet");

    generatedPlanets.forEach((planet)=>{

        planet.addEventListener("click",()=>{

            showPlanet(

                planet.dataset.planet

            );

        });

    });

}

function addDeleteEvents(){

    const deleteBtns =

    document.querySelectorAll(".delete-skill");

    deleteBtns.forEach((btn)=>{

        btn.addEventListener("click",()=>{

            const planetName =

            btn.dataset.planet;

            const index =

            Number(btn.dataset.index);

            skills[planetName].splice(index,1);

            xp = Math.max(0,xp-20);

            showXP("-20 XP");

            localStorage.setItem(

                "skills",

                JSON.stringify(skills)

            );

            localStorage.setItem(

                "xp",

                xp

            );

            updateSun();

            showWelcome();

            showPlanet(planetName);

            skillMessage.textContent =

            "❌ -20 XP";

            skillMessage.style.opacity="1";

            skillMessage.style.transform="translateX(0)";

            setTimeout(()=>{

                skillMessage.style.opacity="0";

                skillMessage.style.transform="translateX(100px)";

            },2000);

        });

    });

}

attachPlanetEvents();