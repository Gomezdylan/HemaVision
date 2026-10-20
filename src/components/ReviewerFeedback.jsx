function ReviewerFeedback(){
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
                    
                    />
                    <span className="feedback-icon"> ✓ </span>
                    Agree
                </label>

                <label>
                    <input
                        type="radio"
                        name="feedback"
                        value="disagree"
                    
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
                />
            </div>
        </div>
    );
}

export default ReviewerFeedback;