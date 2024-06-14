tBody = document.querySelector("tbody")
tHead = document.querySelector("thead")


fetch('https://northwind.vercel.app/api/suppliers')
    .then(response => response.json())
    .then(data => {
        addData(data);

    });



function addData(data) {
    data.forEach(post => {
        let row = document.createElement('tr');
        let btn = document.createElement('button')
        btn.textContent = "delete"
        btn.classList.add("deleteBtn");

        Object.values(post).forEach((value) => {

            let cell = document.createElement('td');
            let cityCell = document.createElement('td');
            let countryCell = document.createElement('td');
            if (typeof value == "object") {
                cityCell.textContent = value.city
                countryCell.textContent = value.country
                row.appendChild(cityCell);
                row.appendChild(countryCell)
            }
            else {
                cell.textContent = value;
                row.appendChild(cell);
            }
        });
        btn.setAttribute('data', Object.values(post)[0]);
        btn.addEventListener("click", function () {
            deleteData(btn.getAttribute("data"));
            
        })
        row.appendChild(btn)
        tBody.appendChild(row);
    });


}




let id_input = document.querySelector(".id-input");
let company_name_input = document.querySelector(".company-name-input");
let contact_name_input = document.querySelector(".contact-name-input")
let contact_title_input = document.querySelector(".contact-title-input")
let city_input = document.querySelector(".city-input")
let country_input = document.querySelector(".country-input")


document.querySelector(".save-btn").addEventListener("click", function () {

    const data = {
        id: id_input.value,
        companyName: company_name_input.value,
        contactName: contact_name_input.value,
        contactTitle: contact_title_input.value,
        address: {
            city: city_input.value,
            country: country_input.value
        }
    }

    fetch("https://northwind.vercel.app/api/suppliers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Successfully posted!");

        })
        .catch((error) => {
            console.error("Error:", error);
        });
});


function deleteData(id) {
    fetch(`https://northwind.vercel.app/api/suppliers/${id}`, {
        method: "DELETE"
    }).then(response => response.json()).then(data => console.log(data))
}