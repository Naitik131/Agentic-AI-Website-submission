const API_KEY = "MY_API_KEY";

const button = document.getElementById("generateBtn");
const goalInput = document.getElementById("goal");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const tasksDiv = document.getElementById("tasks");

button.addEventListener("click", generateTasks);

async function generateTasks() {

    const goal = goalInput.value.trim();

    if(goal===""){
        alert("Please enter a goal.");
        return;
    }

    tasksDiv.innerHTML="";
    error.classList.add("hidden");
    loading.classList.remove("hidden");

    const prompt = `
You are a smart planner.

Break the following goal into tasks.

Goal:
${goal}

Return ONLY a JSON array.

Each object should contain:

{
"task":"Task Name",
"priority":"High/Medium/Low",
"estimated_time":"1 hour"
}

Do not return markdown.
`;

    try{

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    contents:[
                        {
                            parts:[
                                {
                                    text:prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        if(!response.ok){
            throw new Error("Failed to fetch from Gemini.");
        }

        const data = await response.json();

        let text =
            data.candidates[0].content.parts[0].text;

        text = text.replace(/```json/g,"")
                   .replace(/```/g,"")
                   .trim();

        const tasks = JSON.parse(text);

        displayTasks(tasks);

    }
    catch(err){

        error.innerText =
            "Unable to generate task plan. Please try again.";

        error.classList.remove("hidden");
    }
    finally{
        loading.classList.add("hidden");
    }

}

function displayTasks(tasks){

    tasks.forEach((task,index)=>{

        const div=document.createElement("div");

        div.className="task";

        div.innerHTML=`
            <h3>Step ${index+1}: ${task.task}</h3>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Estimated Time:</strong> ${task.estimated_time}</p>
        `;

        tasksDiv.appendChild(div);

    });

}
