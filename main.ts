import { PigController } from "./PigController";
import { GreyPig, ChestnutPig, WhitePig, BlackPig } from "./Pigs";

//Group all subclasses of pig to make it easier to work
type PigType = GreyPig | ChestnutPig | WhitePig | BlackPig;
const controller = new PigController();

const pigCategorySelect = document.getElementById("pig-category") as HTMLSelectElement;
const addRowButton = document.getElementById('add-row') as HTMLButtonElement;
const hideInputButton = document.getElementById('hide-input') as HTMLButtonElement;
const tableBody = document.getElementById('table-body') as HTMLButtonElement;
const inputFormTemplate = document.getElementById('input-form-template') as HTMLButtonElement;
const saveInputButton = document.getElementById('save-input') as HTMLButtonElement;
const dynamicInput = document.getElementById('dynamicForm') as HTMLInputElement;
const title = document.getElementById("dynamic") as HTMLElement;
const breedDropdown = document.getElementById("pig-breed");

var restrict = 0;
var pig_id = 0;

//Load pig Id generator from local storage
const storedPigId = localStorage.getItem('pig_id');

if(storedPigId !== null){

  pig_id = parseInt(storedPigId, 10);
}

addRowButton.addEventListener('click', () => showInputForm());
hideInputButton.addEventListener('click', () => hideInputForm());
saveInputButton.addEventListener('click', () => AddPigs());
dynamicInput.addEventListener('input', AdjustInput)

//Listener for changing input form
pigCategorySelect.addEventListener("change", function(event){

    const target = event.target as HTMLSelectElement;
    updateFormFields(target.value);
});

//Used to change the "more info" button to "less info" and vice versa
document.addEventListener('click', (event) => {

    const target = event.target as HTMLButtonElement | null;
    var graph = document.getElementById("hiddenGraph");

    if(target?.tagName === 'BUTTON'){

        if(target.textContent === 'More Info'){

            target.textContent = 'Less Info';
            target.style.color = 'red';

            const expandedRows = document.querySelectorAll('.expanded');
            expandedRows.forEach((row) => {

                if(row !== target.closest('tr')){

                    const button = row.querySelector('button')!;
                    button.textContent = 'More Info';
            
                    button.style.color = 'green';
                    row.classList.remove('expanded');
                }
            });
       
            target.closest('tr')!.classList.add('expanded');

            if(graph){
       
                graph.style.display = "block";
            }
        } 
        
        else if(target.textContent === 'Less Info'){
         
            target.textContent = 'More Info';
            target.style.color = 'green';

            target.closest('tr')!.classList.remove('expanded');

            if(graph){

                graph.style.display = "none";
            }
        }
    }
});

//Load pig objects from local storage
const stored_pigs = localStorage.getItem('pigs');

if(stored_pigs !== null){

    const pigs = JSON.parse(stored_pigs);

    for(const pig of pigs){

        controller.addPig(pig);
    }

    controller.getPigs().sort(function (a, b){

        var aCata = a.category;
        var bCata = b.category;
        var aName = a.name;
        var bName = b.name;
        
        if(aCata == bCata){

            return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
        }

        else{

            return (aCata < bCata) ? -1 : 1;
        }
    });

    updateTable(controller);
}

//Take inputs from input form and turn into pig object
function AddPigs(){

    const name = document.querySelector('input[name="name"]') as HTMLInputElement;
    const breed = document.querySelector('select[name="breed"]') as HTMLSelectElement;
    const height = document.querySelector('input[name="height"]') as HTMLInputElement;
    const weight = document.querySelector('input[name="weight"]') as HTMLInputElement;
    const personality = document.querySelector('input[name="personality"]') as HTMLInputElement;
    const category = document.querySelector('select[name="category"]') as HTMLSelectElement;
    const dynamic = document.getElementById('dynamicForm') as HTMLInputElement;

    const breedOptions: { [key: string]: string[] } = {

        "Grey": ["Yorkshire Pig", "Duroc Pig", "Landrace Pig"],
    };

    //Ensure all fields have inputs entered
    const missingFields: string[] = [];

    if (!name.value) missingFields.push("Name");
    if (!height.value) missingFields.push("Height");
    if (!weight.value) missingFields.push("Weight");
    if (!personality.value) missingFields.push("Personality");
    if (!dynamic.value) missingFields.push("Dynamic");

    //Alert the user if any fields are missing
    if (missingFields.length > 0) {
        const missingFieldsStr = missingFields.join(', ');
        alert(`Please fill in the following required fields: ${missingFieldsStr}`);
        return;
    }

    if(category.value == "Grey"){
        
        const greyPig = new GreyPig(pig_id, name.value, breed.value, Number(height.value), Number(weight.value), personality.value, category.value);
        greyPig.swimmingAbility = Number(dynamic.value);
        controller.addPig(greyPig);
    }

    else if(category.value == "Chestnut"){

        const chestnutPig = new ChestnutPig(pig_id, name.value, breed.value, Number(height.value), Number(weight.value), personality.value, category.value);
        chestnutPig.language = dynamic.value;
        controller.addPig(chestnutPig); 
    }

    else if(category.value == "White"){

        const whitePig = new WhitePig(pig_id, name.value, breed.value, Number(height.value), Number(weight.value), personality.value, category.value);
        whitePig.runningAbility = Number(dynamic.value);
        controller.addPig(whitePig); 
    }

    else if(category.value == "Black"){

        const blackPig = new BlackPig(pig_id, name.value, breed.value, Number(height.value), Number(weight.value), personality.value, category.value);
        blackPig.strengthAbility = Number(dynamic.value);
        controller.addPig(blackPig); 
    }
    
    //Store pig id into local storage
    pig_id++;
    localStorage.setItem('pig_id', JSON.stringify(pig_id));

    //Sort pigs by colour, then by name
    controller.getPigs().sort(function (a, b){

        var aCata = a.category;
        var bCata = b.category;
        var aName = a.name;
        var bName = b.name;
        
        if(aCata == bCata){

            return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
        }
        else{

            return (aCata < bCata) ? -1 : 1;
        }
    });

    updateTable(controller);

    //Set default values for all inputs
    name.value = '';
    breed.selectedIndex= 0;
    weight.value = '';
    height.value = '';
    personality.value = '';
    category.selectedIndex = 0;
    dynamic.value = '';

    inputFormTemplate.style.display = "none";

    if(dynamicInput){

        dynamicInput.name = "swimming";
        dynamicInput.type = "number";
        dynamicInput.value = '';
        restrict = 0;
    }
           
    if(title){

        title.textContent = "Swimming (0-100)";
    }   

    if(breedDropdown){

        breedDropdown.innerHTML = "";
        breedOptions["Grey"].forEach((optionText) => {
            const option = document.createElement("option");
            option.value = optionText;
            option.textContent = optionText;
            breedDropdown.appendChild(option);
        });
    }
}

//Used to update the main table after each new pig is added
function updateTable(pigController: PigController){

    const tableBody = document.getElementById('table-body');
  
    if(tableBody){

        tableBody.innerHTML = '';
        const pigs = pigController.getPigs();
    
        for(const pig of pigs){

            const newRow = document.createElement('tr');

            const name_Cell = document.createElement('td');
            name_Cell.textContent = pig.name;
    
            const category_Cell = document.createElement('td');
            category_Cell.textContent = pig.category;
    
            const delete_Cell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', (event) => deleteRow(event, pig.id));
            delete_Cell.appendChild(deleteButton);

            const more_Cell = document.createElement('td');
            const moreButton = document.createElement('button');
            moreButton.textContent = 'More Info';
            moreButton.classList.add('more-info-button');
            moreButton.addEventListener('click', (event) => showForm(event, pig.id));
            more_Cell.appendChild(moreButton);
    
            newRow.appendChild(name_Cell);
            newRow.appendChild(category_Cell);
            newRow.appendChild(more_Cell);
            newRow.appendChild(delete_Cell);
    
            tableBody.appendChild(newRow);
        }

        localStorage.setItem('pigs', JSON.stringify(pigs));

        var graph = document.getElementById("hiddenGraph");
        if(graph){

            graph.style.display = "none";
        }
    }
}

//Used to update input form depending on chosen pig colour
function updateFormFields(category: string){

    //Key value list to hold all breeds, used ChatGPT to help generate this map
    const breedOptions: { [key: string]: string[] } = {

        "Grey": ["Yorkshire Pig", "Duroc Pig", "Landrace Pig"],
        "Chestnut": ["Kune Kune Pig", "Tamworth Pig", "Mangalitsa Pig"],
        "White": ["Hampshire Pig", "Meishan Pig", "Saddleback Pig"],
        "Black": ["Potbelly Pig", "Large Black Pig", "Pietrain Pig"]
    };

    let titleText = "";
    let fieldInputName = "";
    let fieldType = "text";

    switch(category){

        case "Grey":
            titleText = "Swimming (0-100)";
            fieldInputName = "swimming";
            fieldType = "number";
            restrict = 0;
            break;

        case "Chestnut":
            titleText = "Language";
            fieldInputName = "language";
            restrict = 2;
            break;

        case "White":
            titleText = "Running (0-100)";
            fieldInputName = "running";
            fieldType = "number";
            restrict = 0;
            break;

        case "Black":
            titleText = "Strength (1-10)";
            fieldInputName = "strength";
            fieldType = "number";
            restrict = 1;
            break;

        default:
            break;
    }

    if(breedDropdown){

        breedDropdown.innerHTML = "";
        breedOptions[category].forEach((optionText) =>{

            const option = document.createElement("option");
            option.value = optionText;
            option.textContent = optionText;
            breedDropdown.appendChild(option);
        });
    }
    
    if(title){

        title.textContent = titleText;
    }

    if(dynamicInput){

        dynamicInput.name = fieldInputName;
        dynamicInput.type = fieldType;
        dynamicInput.value = '';
    }
}

//Ensures the inputs stay within range of the input type
function AdjustInput(){

    if(restrict == 0){

        if(Number(dynamicInput.value) > 100){
            dynamicInput.value = "100";
        }

        if(Number(dynamicInput.value) < 0){
            dynamicInput.value = "0";
        }
    }

    if(restrict == 1){

        if(Number(dynamicInput.value) > 10){
            dynamicInput.value = "10";
        }

        if(Number(dynamicInput.value) < 1){
            dynamicInput.value = "1";
        }
    }

}

//Used to delete a row after delete button is pressed
function deleteRow(event: MouseEvent, pigId: number) {
    const confirmed = confirm("Are you sure you want to delete this pig?");
    
    if (confirmed) {
        controller.removePig(pigId);
        updateTable(controller);
    }
}

//Used to show the pig info after more info button is pressed
function showForm(event: MouseEvent, pigId: number){

    const name = document.getElementById('nameCell') as HTMLElement;
    const breed = document.getElementById('breedCell') as HTMLElement;
    const height = document.getElementById('heightCell') as HTMLElement;
    const weight = document.getElementById('weightCell') as HTMLElement;
    const dynamic = document.getElementById('dynamicCell') as HTMLElement;
    const dynamicHeader = document.getElementById('dynamicHeader') as HTMLElement;
    const personality = document.getElementById('personalityCell') as HTMLElement;

    const selectedPig = controller.getPigs().find(pig => pig.id == pigId);

    switch(selectedPig?.category){

        case "Grey":
            dynamicHeader.textContent = "Swimming (0-100)";
            dynamic.textContent = (selectedPig as GreyPig).swimmingAbility.toString();
            break;

        case "Chestnut":
            dynamicHeader.textContent = "Language";
            dynamic.textContent = (selectedPig as ChestnutPig).language;
            break;

        case "White":
            dynamicHeader.textContent = "Running (0-100)";
            dynamic.textContent = (selectedPig as WhitePig).runningAbility.toString();
            break;

        case "Black":
            dynamic.textContent = (selectedPig as BlackPig).strengthAbility.toString();
            dynamicHeader.textContent = "Strength (0-10)";
            break;

        default:
            break;
    }
    
    if(selectedPig?.name){

        name.textContent = selectedPig?.name;
    }

    if(selectedPig?.breed){

        breed.textContent = selectedPig?.breed;
    }

    if(selectedPig?.height){

        height.textContent = selectedPig?.height.toString();
    }

    if(selectedPig?.weight){

        weight.textContent = selectedPig?.weight.toString();
    }

    if(selectedPig?.personality){
        
        personality.textContent = selectedPig?.personality;
    }
}

function showInputForm(){

    inputFormTemplate.style.display = "block";
}

//Used to hide and clear info form when the less info button is pressed
function hideInputForm(){

    const name = document.querySelector('input[name="name"]') as HTMLInputElement;
    const breed = document.querySelector('select[name="breed"]') as HTMLSelectElement;
    const height = document.querySelector('input[name="height"]') as HTMLInputElement;
    const weight = document.querySelector('input[name="weight"]') as HTMLInputElement;
    const personality = document.querySelector('input[name="personality"]') as HTMLInputElement;
    const category = document.querySelector('select[name="category"]') as HTMLSelectElement;
    const dynamic = document.getElementById('dynamicForm') as HTMLInputElement;

    name.value = '';
    breed.selectedIndex = 0;
    weight.value = '';
    height.value = '';
    personality.value = '';
    category.selectedIndex = 0;
    dynamic.value = '';

    inputFormTemplate.style.display = "none";

    if(dynamicInput){
        dynamicInput.name = "swimming";
        dynamicInput.type = "number";
        dynamicInput.value = '';
        restrict = 0;
    }
           
    if(title){

        title.textContent = "Swimming (0-100)";
    } 
}

