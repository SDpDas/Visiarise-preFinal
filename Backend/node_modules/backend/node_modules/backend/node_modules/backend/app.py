from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import spacy

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Questions and answers related to AR services for eCommerce websites
questions = [
    {"question": "What are AR products?", "answer": "AR products are items that you can visualize in augmented reality."},
    {"question": "How accurate is the AR visualization?", "answer": "AR visualizations are approximately 95% accurate to real-world sizes."},
    {"question": "How to visualize a product in AR?", "answer": "Add a product to your cart and click 'Visualize in AR'."},
    {"question": "Is AR supported on all devices?", "answer": "AR is supported on most modern devices with WebXR."},
    {"question": "How can I contact support?", "answer": "You can contact support via the chatbot or email us at support@arshop.com."},
    {"question": "Is there a tutorial for AR?", "answer": "Yes, we have video tutorials available under the 'Help' section."},
    {"question": "What is augmented reality?", "answer": "Augmented reality blends virtual content with the real world, providing interactive experiences."},
    {"question": "How do I install the AR application?", "answer": "Visit the app store on your device, search for 'ARShop App', and click install."},
    {"question": "How do I try a product in AR?", "answer": "First, add the product to your cart, then click 'Visualize in AR' from your cart."},
    {"question": "Can I visualize multiple products?", "answer": "Yes, you can visualize any number of products that are added to your cart."},
    {"question": "How do I access the shopping page?", "answer": "Navigate to the shopping page via the homepage or click the 'Shop Now' button."},
    {"question": "Can I visualize my entire room?", "answer": "Yes, you can use our AR app to visualize your entire room with our products."},
    {"question": "What is the return policy?", "answer": "Our return policy allows you to return products within 30 days if unsatisfied."},
    {"question": "Where can I get help with AR features?", "answer": "We have a dedicated support page to help you with AR features."},
    {"question": "How do I place an order?", "answer": "Simply add products to the cart and proceed to checkout."},
    {"question": "Can I modify my AR environment?", "answer": "Yes, our app allows customization of the AR environment to suit your preferences."},
    {"question": "Are AR products available for every item?", "answer": "Not all products support AR visualization, but most of our top-selling items do."},
    {"question": "What are the steps to visualize a product?", "answer": "Add a product to your cart, install the AR app, and follow on-screen instructions."},
    {"question": "How do I contact customer support?", "answer": "You can contact us through the chatbot or navigate to the support page."},
    {"question": "How can I leave feedback?", "answer": "You can leave feedback on the product page or contact our support team."},
    {"question": "How do I navigate to the contact page?", "answer": "Click the 'Contact Us' button on the homepage or visit the footer link."},
    {"question": "What happens after I add a product to the cart?", "answer": "You can view your cart and choose to visualize products in AR or proceed to checkout."},
    {"question": "Where is the AR tutorial?", "answer": "Our AR tutorial can be accessed through the 'Help' section of our app or website."}
]

@app.route('/get-response', methods=['POST'])
def get_response():
    user_input = request.json.get("message")
    doc = nlp(user_input)

    # Improved keyword extraction
    keywords = {token.lemma_ for token in doc if token.is_alpha and not token.is_stop}

    # Keyword matching
    relevant_questions = [q for q in questions if any(keyword in q["question"].lower() for keyword in keywords)]

    if relevant_questions:
        return jsonify({"responses": relevant_questions})
    else:
        return jsonify({"responses": [{"question": "Sorry, I couldn't find anything relevant."}]})

if __name__ == '__main__':
    app.run(debug=True)
