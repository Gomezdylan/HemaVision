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
                    Agree
                </label>

                <label>
                    <input
                        type="radio"
                        name="feedback"
                        value="disagree"
                    
                    />
                    Disagree
                </label>
            </div>

            <div className="reviewer">
                <label>Reviewer</label>

                <select>
                    <option>Dr Andrews</option>
                </select>
            </div>
        </div>
    );
}

export default ReviewerFeedback;