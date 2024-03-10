// script.js
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const formDataObject = Object.fromEntries(formData.entries());
    sendData(formDataObject);
});

function sendData(formData) {
    fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert("Form submitted successfully!");
            // Reset form fields if needed
        } else {
            throw new Error("Form submission failed!");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Form submission failed!");
    });
}
