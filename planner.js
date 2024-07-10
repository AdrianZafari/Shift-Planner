document.addEventListener("DOMContentLoaded", () => {
    let names = ["Saiid", "Adrian", "Rana"];
    
    const tdAll = Array.from(document.querySelectorAll("tbody td:not(.tasks)"));
    const tdTasks = Array.from(document.getElementsByClassName("tasks"));
    const nameInput = document.getElementById("nameInput");
    const addNameBtn = document.getElementById("addNameBtn");
    const nameList = document.getElementById("nameList");

    const dateInput = document.getElementById("dateInput");
    const submitBtn = document.getElementById("submitBtn");

    const weekdays = [
        document.getElementById("monday"),
        document.getElementById("tuesday"),
        document.getElementById("wednesday"),
        document.getElementById("thursday"),
        document.getElementById("friday"),
        document.getElementById("saturday"),
        document.getElementById("sunday"),
    ];

    const tasksHeader = document.querySelector("th.tasks");

    function updateTable() {
        tdAll.forEach((td, index) => {
            td.innerHTML = names[index % names.length] || "";
        });
    }

    function updateNameList() {
        nameList.innerHTML = "";
        names.forEach((name, index) => {
            const nameContainer = document.createElement("div")
            nameContainer.classList.add("nameContainer")
            const iconContainer = document.createElement("div")
            iconContainer.classList.add("iconContainer")
            const li = document.createElement("div");
            nameContainer.textContent = name;
            // li.textContent = name;
            const editIcon = document.createElement("i");
            editIcon.className = "fas fa-edit edit-icon";
            editIcon.onclick = () => {
                const newName = prompt("Edit name:", name);
                if (newName) {
                    names[index] = newName;
                    updateTable();
                    updateNameList();
                }
            };
            const removeIcon = document.createElement("i");
            removeIcon.className = "fas fa-trash-alt remove-icon";
            removeIcon.onclick = () => {
                names.splice(index, 1);
                updateTable();
                updateNameList();
            };
            iconContainer.appendChild(editIcon);
            iconContainer.appendChild(removeIcon);
            nameContainer.appendChild(iconContainer);
            li.appendChild(nameContainer);
            nameList.appendChild(li);
        });
    }

    function addName() {
        const newName = nameInput.value.trim();
        if (newName) {
            names.push(newName);
            nameInput.value = "";
            updateTable();
            updateNameList();
        }
    }

    addNameBtn.addEventListener("click", addName);

    nameInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the form from submitting if it's inside a form element
            addName();
        }
    });

    function getWeekDates(selectedDate) {
        const date = new Date(selectedDate);
        const day = date.getDay();
        const diff = (day === 0 ? 7 : day) - 1; // Calculate the difference to get back to Monday

        const monday = new Date(date);
        monday.setDate(date.getDate() - diff);

        const week = [];
        for (let i = 0; i < 7; i++) {
            const weekDay = new Date(monday);
            weekDay.setDate(monday.getDate() + i);
            const formattedDate = weekDay.getDate() + "/" + (weekDay.getMonth() + 1); // Format as MM/DD
            week.push(formattedDate);
        }
        return week;
    }

    function getWeekNumber(d) {
        // Create a copy of the date object
        const date = new Date(d.getTime());
        // Set the date to the nearest Thursday
        date.setDate(date.getDate() + 4 - (date.getDay() || 7));
        // Get the first day of the year
        const yearStart = new Date(date.getFullYear(), 0, 1);
        // Calculate the week number
        const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
        return weekNo;
    }

    function displayWeekDates(dates, weekNumber) {
        tasksHeader.innerHTML = `Tasks (Week ${weekNumber})`;
        weekdays.forEach((th, index) => {
            th.innerHTML = th.id.charAt(0).toUpperCase() + th.id.slice(1) + " (" + dates[index] + ")";
        });
    }

    submitBtn.addEventListener("click", () => {
        const selectedDate = dateInput.value;
        if (selectedDate) {
            const weekDatesArray = getWeekDates(selectedDate);
            const weekNumber = getWeekNumber(new Date(selectedDate));
            displayWeekDates(weekDatesArray, weekNumber);
        } else {
            alert("Please select a date.");
        }
    });


    // let thAll = Array.from(document.getElementsByTagName("th"))

    // let daysDK = ["Mandag","Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"]
    // console.log(dateInput)


    // for (i = 0; i < daysDK.length; i++) {
    //     thAll[i+1].innerText = daysDK[i]
    // }





    // Initialize the table and name list
    updateTable();
    updateNameList();
});

