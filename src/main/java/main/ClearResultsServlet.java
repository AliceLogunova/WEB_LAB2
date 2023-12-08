package main;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;

@WebServlet(name = "ClearResultsServlet", urlPatterns = {"/ClearResultsServlet"})
public class ClearResultsServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws  IOException {
        HttpSession session = request.getSession();
        session.removeAttribute("results"); // Clear the results list
        response.getWriter().write("<p>Results cleared.</p>");
    }
}