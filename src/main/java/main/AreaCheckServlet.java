package main;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@WebServlet(name = "AreaCheckServlet", urlPatterns = {"/AreaCheckServlet"})
public class AreaCheckServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


        // Process the point and store the result
        String xStr = request.getParameter("x");
        String yStr = request.getParameter("y");
        String rStr = request.getParameter("r");


        long startTime = System.nanoTime();
        boolean isInArea = processPoint(xStr, yStr, rStr);

        // Calculate execution time in milliseconds

        String userTime = new SimpleDateFormat("HH:mm:ss").format(new Date());
        long endTime = System.nanoTime();
        long executionTime = (endTime - startTime) / 1000000;


        String resultString = String.format("%s, %s, %s, %s, %s, %s ms",
                String.format("%.2f", Double.parseDouble(xStr)), String.format("%.2f", Double.parseDouble(yStr)), rStr, isInArea ? "True" : "False",
                userTime, executionTime);
        HttpSession session = request.getSession();
        List<String> results = (List<String>) session.getAttribute("results");
        if (results == null) {
            results = new ArrayList<>();
            session.setAttribute("results", results);
        }
        results.add(resultString);
        session.setAttribute("lastResult", resultString);

        // Forward the request to the JSP page.
        request.getRequestDispatcher("/result.jsp").forward(request, response);
    }

    private boolean processPoint(String xStr, String yStr, String rStr) {
        try {
            double x = Double.parseDouble(xStr);
            double y = Double.parseDouble(yStr);
            double r = Double.parseDouble(rStr);


            // Check if the point is in the rectangle: x in [-r, 0] and y in [0, r]
            boolean isInRectangle = (x >= -r) && (y <= r) && (y >= 0) && (x <= 0);

            // Check if the point is in the triangle: y >= 2x - r and y >= 0 and x >= 0
            boolean isInTriangle = (y >= 0) && (x >= 0) && (-r * x + r * r >= y * r * 0.5);

            // Check if the point is in the quarter-circle: x^2 + y^2 <= r^2 and x <= 0 and y >= 0
            boolean isInQuarterCircle = (x * x + y * y <= r * r) && (x <= 0) && (y <= 0);

            return isInRectangle || isInTriangle || isInQuarterCircle;
        } catch (NumberFormatException e) {
            // If the strings are not valid doubles, return false.
            return false;
        }
    }

}