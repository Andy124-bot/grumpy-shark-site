"""Flask application for Grumpy Shark website."""
import smtplib
from email.message import EmailMessage
import logging
from flask import Flask, render_template, request, redirect, url_for




# Configure logging
logging.basicConfig(
    filename="grumpyshark.log",
    level=logging.DEBUG,
    format="%(asctime)s %(levelname)s %(message)s"
)

app = Flask(__name__)
app.logger.info("Grumpy Shark website has started.")

# === ROUTES ===

@app.route("/")
def home():
    """Render the home page."""
    return render_template("index.html")

@app.route("/about")
def about():
    """Render the about page."""
    return render_template("about.html")

@app.route("/books")
def books():
    """Render the books listing page."""
    return render_template("books.html")

@app.route("/grumpy_<int:book_id>")
def grumpy_book(book_id):
    """Render a specific book detail page by ID."""
    return render_template(f"grumpy_{book_id}.html")

@app.route("/contact")
def contact():
    """Render the contact form."""
    return render_template("contact.html")

@app.route("/submit_contact", methods=["POST"])
def submit_contact():
    """Handle contact form submission and log the message."""
    name = request.form["name"]
    email = request.form["email"]
    message = request.form["message"]

    app.logger.info("New Contact Message: %s (%s) - %s", name, email, message)
    return redirect(url_for("contact"))



@app.route("/submit_poll", methods=["POST"])
def submit_poll():
    """Handle poll form submission, log the vote, and send email."""
    selected_title = request.form.get("sharkTitle")

    if selected_title:
        app.logger.info("Poll Vote Received: %s", selected_title)

        # Prepare email
        msg = EmailMessage()
        msg.set_content(f"A vote was cast for: {selected_title}")
        msg['Subject'] = 'New Grumpy Shark Poll Vote'
        msg['From'] = 'your_email@example.com'       # Replace with your Gmail
        msg['To'] = 'grumpysharkwebsite@gmail.com'

        # Send the email
        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                smtp.login('your_email@example.com', 'fuzsfzolzlcpqiiq')  # Use App Password
                smtp.send_message(msg)
        except smtplib.SMTPException as e:
            app.logger.error("Email send failed: %s", e)

    return redirect(url_for("books"))

@app.route("/payment")
def payment():
    """Render the payment page."""
    return render_template("payment.html")

@app.route("/bookPages")
def book_pages():
    """Render the book overview gallery."""
    return render_template("bookPages.html")

@app.route("/InsideBook")
def inside_book():
    """Render the 'inside book' feature page."""
    return render_template("InsideBook.html")

@app.route("/book_1_preview")
def book_1_preview():
    """Display the preview page for Grumpy Shark's First Adventure."""
    return render_template("book_1_preview.html")

@app.route("/book_2_preview")
def book_2_preview():
    """Display the preview page for Grumpy Shark's Ocean Quest."""
    return render_template("book_2_preview.html")

@app.route("/book_3_preview")
def book_3_preview():
    """Display the preview page for Grumpy Shark's Deepest Mystery."""
    return render_template("book_3_preview.html")

def favicon():
    """Serve the favicon for the site."""
    return redirect(url_for('static', filename='favicon.ico'))





# === RUN APP ===
if __name__ == "__main__":
    app.run(debug=True)
