// Функция, которую будем вызывать после изменения таблицы
function handleTableChanges() {
    drawPointsFromTable();
}

function drawCoordinatePlane() {
    const canvas = document.getElementById("coordinateCanvas");
    const context = canvas.getContext("2d");

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw the areas in each quadrant
    context.fillStyle = "lime";

    // first quadrant
    context.beginPath();
    context.moveTo(centerX + 0.35 * centerX, centerY);
    context.lineTo(centerX, centerY);
    context.lineTo(centerX, centerY - 0.7 * centerY);
    context.closePath();
    context.fill();

    // second quadrant
    context.fillRect(centerX, centerY, -0.7 * centerX, -centerY * 0.7);

    // Third quadrant
    context.beginPath();
    context.arc(centerX, centerY, 0.7 * centerX, 0.5 * Math.PI, Math.PI);
    context.lineTo(centerX, centerY);
    context.closePath();
    context.fill();

    // Divisions marked at R, R/2, -R, -R/2
    context.fillStyle = "black";
    context.fillText("R", centerX + 0.7 * centerX, centerY - 5);
    context.fillText("R/2", centerX + 0.35 * centerX, centerY - 5);
    context.fillText("-R", centerX - 0.7 * centerX, centerY - 5);
    context.fillText("-R/2", centerX - 0.35 * centerX, centerY - 5);

    context.fillText("R", centerX + 5, centerY - 0.7 * centerY);
    context.fillText("R/2", centerX + 5, centerY - 0.35 * centerY);
    context.fillText("-R", centerX + 5, centerY + 0.7 * centerY);
    context.fillText("-R/2", centerX + 5, centerY + 0.35 * centerY);

    // Draw the coordinate axes
    context.beginPath();
    context.moveTo(centerX, 0);
    context.lineTo(centerX, canvas.height);
    context.moveTo(0, centerY);
    context.lineTo(canvas.width, centerY);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();

    // Labels for X and Y axes
    context.font = "bold 12px Arial";
    context.fillText("X", canvas.width - 10, centerY - 5);
    context.fillText("Y", centerX + 5, 15);

    // Arrowheads for X and Y axes
    drawArrowhead(context, canvas.width, centerY, -Math.PI / -2);
    drawArrowhead(context, centerX, 0, 0);

    // Add an event listener for canvas click events
    canvas.addEventListener("click", handleCanvasClick);
}

// Call this function to initially draw the coordinate plane
drawCoordinatePlane();



function drawArrowhead(context, x, y, angle) {
    const arrowSize = 10;
    context.save();
    context.translate(x, y);
    context.rotate(angle);

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(-arrowSize, arrowSize);
    context.lineTo(arrowSize, arrowSize);
    context.closePath();
    context.fill();

    context.restore();
}

function drawPointsFromTable() {
    // Get the table body
    const resultsTableBody = document.getElementById("resultsTableBody");

    // Get all rows in the table body
    const rows = resultsTableBody.getElementsByTagName("tr");

    // Retrieve canvas and context
    const canvas = document.getElementById("coordinateCanvas");
    const context = canvas.getContext("2d");

    // Loop through each row in the table
    for (let i = 1; i < rows.length; i++) { // Start from index 1 to skip the header row
        const row = rows[i];

        // Get values from the current row
        const x = parseFloat(row.cells[0].textContent);
        const y = parseFloat(row.cells[1].textContent);
        const r = parseFloat(row.cells[2].textContent);

        // Draw a point on the canvas
        context.beginPath();
        context.arc(x, y, 3, 0, 2 * Math.PI);
        context.fillStyle = "blue"; // You can customize the color
        context.fill();
        context.closePath();
        // drawPointOnCanvas(context, x, y, r);
    }
}



function drawPointOnCanvas(context, x, y, r) {
    // Add your logic to convert x, y, and r if needed
    // For example, you may need to adjust the coordinates based on the canvas dimensions

    // Draw a point on the canvas
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI);
    context.fillStyle = "blue"; // You can customize the color
    context.fill();
    context.closePath();
}

// Example usage


async function handleCanvasClick(event) {
    // Retrieve the canvas and its context
    const canvas = document.getElementById("coordinateCanvas");
    const context = canvas.getContext("2d");

    // Get the canvas coordinates of the click
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if R is set (you might need to retrieve it from the form)
    if (validateR()) {
        //Draw a point on the canvas
        const r = document.getElementsByName("r")[0].value;
        const isValid = await sendCoordinatesForVerification(x, y, r);

        if (isValid) {
            addToTable(x, y, r);
            //
        //     context.beginPath();
        //     context.arc(x, y, 3, 0, 2 * Math.PI);
        //     context.fillStyle = "red";
        //     context.fill();
        //     context.closePath();
        //
        //
        // }else {
        //     // If the point is not valid, show a notification
        //     alert("Invalid coordinates. Please check your input.");
        // }
        // Send the server-side coordinates for verification
    } else {
        // R is not set, show a notification
        alert("Please set the radius (R) before clicking.");
    }

}

function addToTable(x, y, r) {
    // You can add your logic here to add values to the table
    // This could involve making another asynchronous request if needed
    // For simplicity, let's assume you have a resultsTableBody element
    const resultsTableBody = document.getElementById("resultsTableBody");

    // Create a new table row
    const tr = document.createElement("tr");

    // Create and append table cells with the values
    const tdX = document.createElement("td");
    tdX.textContent = x;
    tr.appendChild(tdX);

    const tdY = document.createElement("td");
    tdY.textContent = y;
    tr.appendChild(tdY);

    const tdR = document.createElement("td");
    tdR.textContent = r;

    tr.appendChild(tdR);

    // Append the row to the table body
    resultsTableBody.appendChild(tr);
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
}
}
