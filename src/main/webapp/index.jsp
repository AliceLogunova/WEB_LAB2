<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>ЧупапиМуняня</title>
    <link rel="icon" href="pics/icon.ico" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="css/style.css">
<%--    <style>--%>
<%--        header {--%>
<%--            font-family: serif;--%>
<%--            font-size: 12px;--%>
<%--            color: #00ff00;--%>
<%--        }--%>
<%--    </style>--%>
</head>
<body>
<header>
    <h1>Alice Logunova <span>P3221</span> </h1>
    <h2> VAR 2147</h2>
</header>
<div class="content">
    <div class="panel">
        <form id="pointForm" method="post" action="ControllerServlet">
            <div class="form-row">
                <label>X:</label>
                <input type="text" name="y" id="x" placeholder="От -3 до 5" required pattern="-?[0-3](\.[0-9]+)?"
                       maxlength="5">
                </label>
            </div>
            <div class="form-row">
                <label for="y">Y:</label>
                <input type="text" name="y" id="y" placeholder="От -3 до 5" required pattern="-?[0-5](\.[0-9]+)?"
                       maxlength="5">
            </div>
            <div class="form-row">
                <label for="r">R:</label>
                <select name="r" id="r" required>
                    <% for (double i = 1; i <= 3; i += 0.5) { %>
                    <option value="<%= i %>"><%= i %>
                    </option>
                    <% } %>
                </select>
            </div>
            <input type="submit" value="Submit">
        </form>
        <button onclick="clearResults()">Clear results</button>
    </div>
    <canvas id="coordinateCanvas" width="500" height="500"></canvas>
    <div id="results">
        <table>
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Collision</th>
                <th>User Time</th>
                <th>Execution Time</th>
            </tr>
            </thead>
            <tbody id="resultsTableBody">
            <% if (session.getAttribute("results") != null) {
                for (String result : (List<String>) session.getAttribute("results")) {
                    String[] resultParts = result.split(", ");
            %>
            <tr>
                <td><%= resultParts[0] %>
                </td>
                <td><%= resultParts[1] %>
                </td>
                <td><%= resultParts[2] %>
                </td>
                <td><%= resultParts[3] %>
                </td>
                <td><%= resultParts[4] %>
                </td>
                <td><%= resultParts[5] %>
                </td>
            </tr>
            <% }
            } %>
            </tbody>
        </table>
    </div>

</div>

<script src="js/script.js"></script>
<script src="js/CoordinatePlane.js"></script>


</body>
</html>
