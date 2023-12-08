document.getElementById('pointForm').onsubmit = function (event) {
    event.preventDefault();

    const x = document.getElementById('x').value;
    const y = document.getElementById('y').value;
    const r = document.getElementById('r').value;


    // Call a function to validate the input
    if (!validateInput(x, y, r)) {
        alert('Please enter valid coordinates and radius.');
        return;
    }

    // If validation passes, send the POST request
    fetch('ControllerServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({x: x, y: y, r: r})
    })
        .then(response => response.text())
        .then(data => {

            updateResultsTable(data);
            window.location.href = 'result.jsp'; // Redirect to the result page
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while processing your request.');
        });
};


function updateResultsTable(html) {
    const resultsTableBody = document.getElementById("resultsTableBody");
    if (resultsTableBody) {
        resultsTableBody.innerHTML += html;
    } else {
        console.error("No element with ID 'resultsTableBody' found.");
    }
}

function validateInput(x, y, r) {
    x = parseFloat(x);
    if (isNaN(x) || x < -3 || y > 5) {
        alert('Y must be a number between -3 and 5.');
        return false;
    }

    y = parseFloat(y);
    if (isNaN(y) || y < -3 || y > 5) {
        alert('Y must be a number between -3 and 5.');
        return false;
    }

    r = parseFloat(r);
    if (isNaN(r) || r < 1 || r > 3 || (r * 10) % 5 !== 0) {
        alert('R must be one of the specified values.');
        return false;
    }

    return true;
}

function validateR() {
    const r = document.getElementsByName("r")[0].value;
    if (isNaN(r) || r < 1 || r > 3 || (r * 10) % 5 !== 0) {
        alert('R must be one of the specified values.');
        return false;
    }
    return true;
}

function clearResults() {
    fetch('ClearResultsServlet', {
        method: 'POST'
    })
        .then(response => response.text())
        .then(() => {
            const resultsTableBody = document.getElementById('resultsTableBody');
            if (resultsTableBody) {
                resultsTableBody.innerHTML = ''; // Clear only the contents, not the element itself
                alert('Results cleared.');
            } else {
                console.error("No element with ID 'resultsTableBody' found.");
            }
        })
        .catch(error => console.error('Error:', error));
}

function sendCoordinatesForVerification(canvasX, canvasY, r) {
    const canvas = document.getElementById("coordinateCanvas");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate the server-side coordinates considering the entire canvas area
    const offsetX = canvasWidth / 2;
    const offsetY = canvasHeight / 2;
    const xValue = (canvasX - offsetX) * (2 * r / canvasWidth / 0.7);
    const yValue = (offsetY - canvasY) * (2 * r / canvasHeight / 0.7);

    fetch('AreaCheckServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({'x': xValue, 'y': yValue, 'r': r})
    })
        .then(response => response.text())
        .then(html => {
            console.log('Received HTML:', html);

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Check if the response contains the expected table row
            const tr = doc.querySelector('table tr:last-child');
            if (tr) {
                const resultsTableBody = document.getElementById("resultsTableBody");
                resultsTableBody.appendChild(tr.cloneNode(true)); // Clone the node to import it into the current document
            } else {
                console.error("No <tr> element found in the response HTML.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while processing your request.');
        });
}


