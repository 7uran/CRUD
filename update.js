const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);
fetch(`https://northwind.vercel.app/api/suppliers/${id}`)
    .then(response => response.json())
    .then(data => {
        
        addData(data);

    });


    let id_input = document.querySelector(".id-input");
    let company_name_input = document.querySelector(".company-name-input");
    let contact_name_input = document.querySelector(".contact-name-input")
    let contact_title_input = document.querySelector(".contact-title-input")
    let city_input = document.querySelector(".city-input")
    let country_input = document.querySelector(".country-input")



function addData(data) {
    id_input.value = id
    company_name_input.value = data.companyName
    contact_name_input.value = data.contactName
    contact_title_input.value = data.contactTitle
    city_input.value = data.address.city
    country_input.value =data.address.country
}






document.querySelector('.updatebtn').addEventListener("click", function () {

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

    fetch(`https://northwind.vercel.app/api/suppliers/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Successfully posted!",data);

        })
        .catch((error) => {
            console.error("Error:", error);
        });
});


