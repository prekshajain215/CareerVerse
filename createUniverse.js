const userName =
document.querySelector("#userName");

const planetName =
document.querySelector("#planetName");

const planetColor =
document.querySelector("#planetColor");
planetColor.value =
"#7c4dff";

const addPlanet =
document.querySelector("#addPlanet");

const planetList =
document.querySelector("#planetList");

const createUniverse =
document.querySelector("#createUniverse");
const message =
document.querySelector("#message");


let planets = [];
renderPlanets();
addPlanet.addEventListener("click",()=>{

    const name =
    planetName.value.trim();

    if(name==="") return;

    planets.push({

        name:name,

        color:planetColor.value

    });

    renderPlanets();

    message.textContent =
   `${name} added successfully! 🚀`;
    setTimeout(() => {

        message.textContent = "";

    }, 1000);

    planetName.value="";
});
const colorPicker =
document.querySelector("#planetColor");
function renderPlanets(){

    planetList.innerHTML = "";
 document.querySelector("#planetCount").textContent =
    `${planets.length} Planet(s) Created`;
    planets.forEach((planet,index)=>{

        planetList.innerHTML += `
        <div
            class="planet-tag"
            style="
                background:${planet.color};
                box-shadow:0 0 15px ${planet.color};
            ">

            🪐 ${planet.name}

            <span
            class="delete-planet"
            onclick="deletePlanet(${index})">
            ❌
            </span>

        </div>
        `;
    });
}
planetName.addEventListener("keydown",(e)=>{

    if(e.key === "Enter"){

        addPlanet.click();

    }

});
function deletePlanet(index){

    planets.splice(index,1);

    renderPlanets();
    document.querySelector("#planetCount").textContent =
    `${planets.length} Planet(s) Created`;
}
createUniverse.addEventListener("click",()=>{
 if(planets.length === 0){
        alert("Please add at least one planet!");
        return;
    }

    localStorage.setItem(
        "username",
        userName.value
    );

    localStorage.setItem(
        "planets",
        JSON.stringify(planets)
    );
let skills = {};

planets.forEach((planet)=>{
    skills[planet.name] = [];
});

localStorage.setItem(
    "skills",
    JSON.stringify(skills)
);
if(planets.length===0){

    alert(
    "Add at least one planet!"
    );

    return;
}
    window.location.href =
    "dashboard.html";
});
