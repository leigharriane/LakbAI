from flask import Flask, jsonify
from flask_cors import CORS
import openai
app = Flask(__name__)
CORS(app)

@app.route("/api/home", methods=['GET'])
def return_home():
    API_KEY = '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'
    openai.api_key = API_KEY

    model_id = 'gpt-3.5-turbo'
    conversation = []
    destination = "Paris, France"
    budget = "500 USD"
    travelStyle = "Cultural"
    interests = "History"
    accommodationType = "Hotel"
    transportationType = "Bus"
    activityType = "Sightseeing"
    cuisineType = "Traditional"
    tripDuration = "3"

    prompt ="""
    Generate a personalized travel itinerary for a trip to %s with a budget of %s.
    The traveler is interested in a %s vacation and enjoys %s.
    They are looking for %s accommodations and prefer %s transportation.
    The itinerary should include %s activities and %s dining options.
    Please provide a detailed itinerary with daily recommendations for %s days, including suggested destinations, activities, and dining options.
    The itinerary should be written in English. and the itinerary should have specific time stamps
    """ % (destination, budget, travelStyle, interests, accommodationType, transportationType, activityType, cuisineType, tripDuration)

    conversation.append({'role':'user','content':prompt})

    response = openai.ChatCompletion.create(
        model=model_id,
        messages = conversation
    )

    x = "dfasfs"
    return jsonify({
        'message': response.choices[0].message.content
    })

if __name__ == "__main__":
    app.run(debug=True, port=8080)