import { useState } from "react"

function ReviewerFeedback({ runID }){
    const [ review, setReview] = useState("");
    const [ comments, setComments] = useState("");

    // Updating the reviewer feednack to database with a button
    async function saveFeedback(){
        try {
            const response = await fetch(
                `http://localhost:8000/runs/${runID}/review`, // look up that current ID
                {
                    method: "Patch", // update
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        review: review,
                        comments: comments,
                    }),
                }
            );

            if(!response.ok){
                throw new Error("Oh no");
            }
            alert("Successful save");
        } catch(error){
            console.error(error);
        }
    }
    return(
        <div className="reviewer-feedback">
            <h2>Reviewer Feedback</h2>

            <p className="feedback-question">
                Do you agree with the prediction our model made?
            </p>

            <div className="feedback-choice">
                <label>
                    <input
                        type="radio"
                        name="feedback"
                        value="agree"
                        onChange={() => setReview("reject")}
                    
                    />
                    <span className="feedback-icon"> ✓ </span>
                    Agree
                </label>

                <label>
                    <input
                        type="radio"
                        name="feedback"
                        value="disagree"
                        onChange={() => setReview("reject")}
                    />
                    <span className="feedback-icon"> ✕ </span>
                    Disagree
                </label>
            </div>

            <div className="reviewer-name">
                <label htmlFor="reviewer">Reviewer</label>
                <input 
                    type="text"
                    id="reviewer"
                    name="reviewer"
                    placeholder="Enter reviewer name"
                
                />

            </div>
            <div className="reviewer-comments">
                <label htmlFor="comments">Comments</label>
                <textarea 
                    id="comments"
                    name="comments"
                    rows="4"
                    placeholder="Enter any additional feedback about the prediction..."
                    value={comments}
                    onChange={(event) => setComments(event.target.value)}
                />
            </div>
            <button
                className="view-btn"
                type="button"
                onClick={saveFeedback}
                disabled={!review}
                >
                    Save Feedback
                </button>
        </div>
    );
}

export default ReviewerFeedback;