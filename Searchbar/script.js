document.addEventListener("DOMContentLoaded", function () {
    const url = "https://krisgwynelan.github.io/AppDev/SubjectsTaken/courses.json"; // Replace with your actual URL
    const tableBody = document.getElementById("coursesTable");
    const searchInput = document.getElementById("searchInput");

    if (!tableBody) {
        console.error("Error: Element with ID 'coursesTable' not found. Check your HTML.");
        return;
    }

    if (!searchInput) {
        console.error("Error: Element with ID 'searchInput' not found. Check your HTML.");
        return;
    }

    let coursesData = []; // Store fetched data

    // Fetch data from JSON and populate table
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

            coursesData = data.courses; // Store data for filtering
            displayCourses(coursesData); // Populate the table
        })
        .catch(error => console.error("Error fetching course data:", error));

    // Function to display courses in the table
    function displayCourses(courses) {
        tableBody.innerHTML = ""; // Clear table before inserting new rows

        courses.forEach((course, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${course.year_level}</td>
                <td>${course.sem}</td>
                <td>${course.code}</td>
                <td>${course.description}</td>
                <td>${course.credit}</td>
            `;
            row.setAttribute("id", `course-${index}`); // Set an ID for scrolling
            tableBody.appendChild(row);
        });
    }

    // Search function
    searchInput.addEventListener("keyup", function () {
        if (coursesData.length === 0) return; // Avoid searching when data isn't loaded

        const query = searchInput.value.trim().toLowerCase();
        const filteredCourses = coursesData.filter(course =>
            course.year_level.toString().toLowerCase().includes(query) ||
            course.sem.toString().toLowerCase().includes(query) ||
            course.code.toLowerCase().includes(query) ||
            course.description.toLowerCase().includes(query) ||
            course.credit.toString().toLowerCase().includes(query)
        );

        displayCourses(filteredCourses); // Update table with filtered results

        // Scroll to first result (if available)
        if (filteredCourses.length > 0) {
            setTimeout(() => {
                const firstRow = document.querySelector("#coursesTable tr");
                if (firstRow) {
                    firstRow.scrollIntoView({ behavior: "smooth", block: "start" });
                    firstRow.style.backgroundColor = "#ffeb3b"; // Highlight row
                    setTimeout(() => {
                        firstRow.style.backgroundColor = ""; // Remove highlight after 2 seconds
                    }, 2000);
                }
            }, 300);
        }
    });
});
