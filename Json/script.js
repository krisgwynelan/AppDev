document.addEventListener("DOMContentLoaded", function () {
    const url = "https://krisgwynelan.github.io/AppDev/Json/courses.json"; // Replace with your GitHub Pages link

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.getElementById("coursesTable");

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
