System.register(["./PigController", "./Pigs"], function (exports_1, context_1) {
    "use strict";
    var PigController_1, Pigs_1, controller, pigCategorySelect, addRowButton, hideInputButton, tableBody, inputFormTemplate, saveInputButton, dynamicInput, title, breedDropdown, restrict, pig_id, storedPigId, stored_pigs;
    var __moduleName = context_1 && context_1.id;
    //Take inputs from input form and turn into pig object
    function AddPigs() {
        const name = document.querySelector('input[name="name"]');
        const breed = document.querySelector('select[name="breed"]');
        const height = document.querySelector('input[name="height"]');
        const weight = document.querySelector('input[name="weight"]');
        const personality = document.querySelector('input[name="personality"]');
        const category = document.querySelector('select[name="category"]');
        const dynamic = document.getElementById('dynamicForm');
        const breedOptions = {
            "Grey": ["Yorkshire Pig", "Duroc Pig", "Landrace Pig"],
        };
        //Ensure all fields have inputs entered
        const missingFields = [];
        if (!name.value)
            missingFields.push("Name");
        if (!height.value)
            missingFields.push("Height");
        if (!weight.value)
            missingFields.push("Weight");
        if (!personality.value)
            missingFields.push("Personality");
        if (!dynamic.value)
            missingFields.push("Dynamic");
        //Alert the user if any fields are missing
        if (missingFields.length > 0) {
            const missingFieldsStr = missingFields.join(', ');
            alert(`Please fill in the following required fields: ${missingFieldsStr}`);
            return;
        }
        if (category.value == "Grey") {
            const greyPig = new Pigs_1.GreyPig(pig_id, name.value, breed.value, Number(height.value), Number(weight.value), personality.value, category.value);
            greyPig.swimmingAbility = Number(dynamic.value);
            controller.addPig(greyPig);
        }
        else if (category.value == "Chestnut") {
            const chestnutPig = new Pigs_1.ChestnutPig(pig_id, name.value, breed.value, Number(height.value), Number(weight.value), personality.value, category.value);
            chestnutPig.language = dynamic.value;
            controller.addPig(chestnutPig);
        }
        else if (category.value == "White") {
            const whitePig = new Pigs_1.WhitePig(pig_id, name.value, breed.value, Number(height.value), Number(weight.value), personality.value, category.value);
            whitePig.runningAbility = Number(dynamic.value);
            controller.addPig(whitePig);
        }
        else if (category.value == "Black") {
            const blackPig = new Pigs_1.BlackPig(pig_id, name.value, breed.value, Number(height.value), Number(weight.value), personality.value, category.value);
            blackPig.strengthAbility = Number(dynamic.value);
            controller.addPig(blackPig);
        }
        //Store pig id into local storage
        pig_id++;
        localStorage.setItem('pig_id', JSON.stringify(pig_id));
        //Sort pigs by colour, then by name
        controller.getPigs().sort(function (a, b) {
            var aCata = a.category;
            var bCata = b.category;
            var aName = a.name;
            var bName = b.name;
            //sorting method for two fields received from here:
            //https://stackoverflow.com/questions/6129952/sort-javascript-array-by-two-numeric-fields
            if (aCata == bCata) {
                return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
            }
            else {
                return (aCata < bCata) ? -1 : 1;
            }
        });
        updateTable(controller);
        //Set default values for all inputs
        name.value = '';
        breed.selectedIndex = 0;
        weight.value = '';
        height.value = '';
        personality.value = '';
        category.selectedIndex = 0;
        dynamic.value = '';
        inputFormTemplate.style.display = "none";
        if (dynamicInput) {
            dynamicInput.name = "swimming";
            dynamicInput.type = "number";
            dynamicInput.value = '';
            restrict = 0;
        }
        if (title) {
            title.textContent = "Swimming (0-100)";
        }
        if (breedDropdown) {
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
    function updateTable(pigController) {
        const tableBody = document.getElementById('table-body');
        if (tableBody) {
            tableBody.innerHTML = '';
            const pigs = pigController.getPigs();
            for (const pig of pigs) {
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
            if (graph) {
                graph.style.display = "none";
            }
        }
    }
    //Used to update input form depending on chosen pig colour
    function updateFormFields(category) {
        //Key value list to hold all breeds, used ChatGPT to help generate this map
        const breedOptions = {
            "Grey": ["Yorkshire Pig", "Duroc Pig", "Landrace Pig"],
            "Chestnut": ["Kune Kune Pig", "Tamworth Pig", "Mangalitsa Pig"],
            "White": ["Hampshire Pig", "Meishan Pig", "Saddleback Pig"],
            "Black": ["Potbelly Pig", "Large Black Pig", "Pietrain Pig"]
        };
        let titleText = "";
        let fieldInputName = "";
        let fieldType = "text";
        switch (category) {
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
        if (breedDropdown) {
            breedDropdown.innerHTML = "";
            breedOptions[category].forEach((optionText) => {
                const option = document.createElement("option");
                option.value = optionText;
                option.textContent = optionText;
                breedDropdown.appendChild(option);
            });
        }
        if (title) {
            title.textContent = titleText;
        }
        if (dynamicInput) {
            dynamicInput.name = fieldInputName;
            dynamicInput.type = fieldType;
            dynamicInput.value = '';
        }
    }
    //Ensures the inputs stay within range of the input type
    function AdjustInput() {
        if (restrict == 0) {
            if (Number(dynamicInput.value) > 100) {
                dynamicInput.value = "100";
            }
            if (Number(dynamicInput.value) < 0) {
                dynamicInput.value = "0";
            }
        }
        if (restrict == 1) {
            if (Number(dynamicInput.value) > 10) {
                dynamicInput.value = "10";
            }
            if (Number(dynamicInput.value) < 1) {
                dynamicInput.value = "1";
            }
        }
    }
    //Used to delete a row after delete button is pressed
    function deleteRow(event, pigId) {
        const confirmed = confirm("Are you sure you want to delete this pig?");
        if (confirmed) {
            controller.removePig(pigId);
            updateTable(controller);
        }
    }
    //Used to show the pig info after more info button is pressed
    function showForm(event, pigId) {
        const name = document.getElementById('nameCell');
        const breed = document.getElementById('breedCell');
        const height = document.getElementById('heightCell');
        const weight = document.getElementById('weightCell');
        const dynamic = document.getElementById('dynamicCell');
        const dynamicHeader = document.getElementById('dynamicHeader');
        const personality = document.getElementById('personalityCell');
        const selectedPig = controller.getPigs().find(pig => pig.id == pigId);
        switch (selectedPig === null || selectedPig === void 0 ? void 0 : selectedPig.category) {
            case "Grey":
                dynamicHeader.textContent = "Swimming (0-100)";
                dynamic.textContent = selectedPig.swimmingAbility.toString();
                break;
            case "Chestnut":
                dynamicHeader.textContent = "Language";
                dynamic.textContent = selectedPig.language;
                break;
            case "White":
                dynamicHeader.textContent = "Running (0-100)";
                dynamic.textContent = selectedPig.runningAbility.toString();
                break;
            case "Black":
                dynamic.textContent = selectedPig.strengthAbility.toString();
                dynamicHeader.textContent = "Strength (0-10)";
                break;
            default:
                break;
        }
        if (selectedPig === null || selectedPig === void 0 ? void 0 : selectedPig.name) {
            name.textContent = selectedPig === null || selectedPig === void 0 ? void 0 : selectedPig.name;
        }
        if (selectedPig === null || selectedPig === void 0 ? void 0 : selectedPig.breed) {
            breed.textContent = selectedPig === null || selectedPig === void 0 ? void 0 : selectedPig.breed;
        }
        if (selectedPig === null || selectedPig === void 0 ? void 0 : selectedPig.height) {
            height.textContent = selectedPig === null || selectedPig === void 0 ? void 0 : selectedPig.height.toString();
        }
        if (selectedPig === null || selectedPig === void 0 ? void 0 : selectedPig.weight) {
            weight.textContent = selectedPig === null || selectedPig === void 0 ? void 0 : selectedPig.weight.toString();
        }
        if (selectedPig === null || selectedPig === void 0 ? void 0 : selectedPig.personality) {
            personality.textContent = selectedPig === null || selectedPig === void 0 ? void 0 : selectedPig.personality;
        }
    }
    function showInputForm() {
        inputFormTemplate.style.display = "block";
    }
    //Used to hide and clear info form when the less info button is pressed
    function hideInputForm() {
        const name = document.querySelector('input[name="name"]');
        const breed = document.querySelector('select[name="breed"]');
        const height = document.querySelector('input[name="height"]');
        const weight = document.querySelector('input[name="weight"]');
        const personality = document.querySelector('input[name="personality"]');
        const category = document.querySelector('select[name="category"]');
        const dynamic = document.getElementById('dynamicForm');
        name.value = '';
        breed.selectedIndex = 0;
        weight.value = '';
        height.value = '';
        personality.value = '';
        category.selectedIndex = 0;
        dynamic.value = '';
        inputFormTemplate.style.display = "none";
        if (dynamicInput) {
            dynamicInput.name = "swimming";
            dynamicInput.type = "number";
            dynamicInput.value = '';
            restrict = 0;
        }
        if (title) {
            title.textContent = "Swimming (0-100)";
        }
    }
    return {
        setters: [
            function (PigController_1_1) {
                PigController_1 = PigController_1_1;
            },
            function (Pigs_1_1) {
                Pigs_1 = Pigs_1_1;
            }
        ],
        execute: function () {
            controller = new PigController_1.PigController();
            pigCategorySelect = document.getElementById("pig-category");
            addRowButton = document.getElementById('add-row');
            hideInputButton = document.getElementById('hide-input');
            tableBody = document.getElementById('table-body');
            inputFormTemplate = document.getElementById('input-form-template');
            saveInputButton = document.getElementById('save-input');
            dynamicInput = document.getElementById('dynamicForm');
            title = document.getElementById("dynamic");
            breedDropdown = document.getElementById("pig-breed");
            restrict = 0;
            pig_id = 0;
            //Load pig Id generator from local storage
            storedPigId = localStorage.getItem('pig_id');
            if (storedPigId !== null) {
                pig_id = parseInt(storedPigId, 10);
            }
            addRowButton.addEventListener('click', () => showInputForm());
            hideInputButton.addEventListener('click', () => hideInputForm());
            saveInputButton.addEventListener('click', () => AddPigs());
            dynamicInput.addEventListener('input', AdjustInput);
            //Listener for changing input form
            pigCategorySelect.addEventListener("change", function (event) {
                const target = event.target;
                updateFormFields(target.value);
            });
            //Used to change the "more info" button to "less info" and vice versa
            document.addEventListener('click', (event) => {
                const target = event.target;
                var graph = document.getElementById("hiddenGraph");
                if ((target === null || target === void 0 ? void 0 : target.tagName) === 'BUTTON') {
                    if (target.textContent === 'More Info') {
                        target.textContent = 'Less Info';
                        target.style.color = 'red';
                        const expandedRows = document.querySelectorAll('.expanded');
                        expandedRows.forEach((row) => {
                            //Used ChatGPT to create this "if" statement
                            if (row !== target.closest('tr')) {
                                const button = row.querySelector('button');
                                button.textContent = 'More Info';
                                button.style.color = 'green';
                                row.classList.remove('expanded');
                            }
                        });
                        target.closest('tr').classList.add('expanded');
                        if (graph) {
                            graph.style.display = "block";
                        }
                    }
                    else if (target.textContent === 'Less Info') {
                        target.textContent = 'More Info';
                        target.style.color = 'green';
                        target.closest('tr').classList.remove('expanded');
                        if (graph) {
                            graph.style.display = "none";
                        }
                    }
                }
            });
            //Load pig objects from local storage
            stored_pigs = localStorage.getItem('pigs');
            if (stored_pigs !== null) {
                const pigs = JSON.parse(stored_pigs);
                for (const pig of pigs) {
                    controller.addPig(pig);
                }
                controller.getPigs().sort(function (a, b) {
                    var aCata = a.category;
                    var bCata = b.category;
                    var aName = a.name;
                    var bName = b.name;
                    if (aCata == bCata) {
                        return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
                    }
                    else {
                        return (aCata < bCata) ? -1 : 1;
                    }
                });
                updateTable(controller);
            }
        }
    };
});
