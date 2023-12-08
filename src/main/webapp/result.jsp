<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>ЧупапиМуняня</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
<h2>Last result:</h2>
<% if (session.getAttribute("lastResult") != null) {
    String[] lastResultParts = ((String) session.getAttribute("lastResult")).split(", ");
%>
<table>
    <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Collision</th>
        <th>User Time</th>
        <th>Execution Time</th>
    </tr>
    <tr>
        <td><%= lastResultParts[0] %>
        </td>
        <td><%= lastResultParts[1] %>
        </td>
        <td><%= lastResultParts[2] %>
        </td>
        <td><%= lastResultParts[3] %>
        </td>
        <td><%= lastResultParts[4] %>
        </td>
        <td><%= lastResultParts[5] %>
        </td>
    </tr>
</table>
<% } else { %>
<p>No results to show.</p>
<% } %>
<a href="index.jsp">Check another point</a>
</body>
</html>
