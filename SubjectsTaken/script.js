document.addEventListener("DOMContentLoaded", function () {
    const url = "https://krisgwynelan.github.io/AppDev/SubjectsTaken/courses.json"; // Replace with your actual URL

    const tableBody = document.getElementById("coursesTable");

    if (!tableBody) {
        console.error("Error: Element with ID 'coursesTable' not found. Check your HTML.");
        return;  
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched Data:", data); // Debug JSON response
            if (!data.courses) {
                console.error("Error: 'courses' array is missing in JSON.");
                return;
            }

            data.courses.forEach(course => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${course.year_level}</td>
                    <td>${course.sem}</td>
                    <td>${course.code}</td>
                    <td>${course.description}</td>
                    <td>${course.credit}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching course data:", error));
});
