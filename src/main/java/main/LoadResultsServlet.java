package main;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.util.List;

@WebServlet(name = "LoadResultsServlet", urlPatterns = {"/LoadResultsServlet"})
public class LoadResultsServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        List<String> results = (List<String>) session.getAttribute("results");

        // Generate HTML table with results
        StringBuilder tableHtml = new StringBuilder("<table><tbody>");
        if (results != null && !results.isEmpty()) {
            for (String result : results) {
                tableHtml.append("<tr><td>").append(result).append("</td></tr>");
            }
        } else {
            tableHtml.append("<tr><td>No results to show.</td></tr>");
        }
        tableHtml.append("</tbody></table>");
        response.getWriter().write(tableHtml.toString());
    }
}