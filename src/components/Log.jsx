import { useEffect, useState} from "react"; // grab the runs from queries.py 

function Log(){
    const [runs, setRuns] = useState([]);
    const [page, setPage] = useState(1);
    const runsPerPage = 5;
    const totalPages = Math.max(1, Math.ceil(runs.length / runsPerPage));
    const startIndex = (page-1) * runsPerPage; // 0,5,10,15...
    const visibleRuns = runs.slice(startIndex, startIndex + runsPerPage); // 0-5, 6-11...
    const [selectedRun, setSelectedRun] = useState(null);


    useEffect(() => {
        async function loadRuns(){
        try {
            const response = await fetch("http://localhost:8000/runs");

            if(!response.ok){ // Houston we have a problem
                throw new Error("Runs are bugging. Fix your Code!!!")
            }

            const data = await response.json();
            setRuns(data.slice(0,100));
        } catch (error){
            console.error(error);
        }
    }
        loadRuns();
    }, []);


    function getReview(review){
        if(review === "accept"){
            return "Accepted";
        }
        if(review === "reject"){
            return "Rejected";
        }

        return "Not Reviewed";
    }

    function cleanTime(timestamp){
        const date = new Date(timestamp.replace(" ", "T"));

        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        })
    }
    return (
        <section className="run-history">
            <h2> Run History </h2>
            <p>Review previously saved analysis results.</p>

            <div className="history-container">
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Run ID</th>
                            <th>Date/Time</th>
                            <th>Prediction</th>
                            <th>Model Version</th>
                            <th>Review</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleRuns.map((run) =>(
                        
                        <tr key={run.run_id}>
                            <td>{run.id}</td>
                            <td>{cleanTime(run.timestamp)}</td>
                            <td>{run.prediction}</td>
                            <td>{run.model_version}</td>
                            <td>{getReview(run.review)}</td>
                            <td>
                               <button
                                    className="view-btn" 
                                    type="button"
                                    onClick={() => setSelectedRun(run)} 
                                >
                                    View
                                </button>
                            </td>
                        </tr>

                        ))}
                    </tbody>

                </table>
            </div>
            <div className="page-scroll">
                <button // previous button to move back
                    className="view-btn"
                    type="button"
                    disabled={page===1}
                    onClick={() => setPage(page-1)}
                    >
                        Previous
                    </button>

                    <span> Page {page} of {totalPages} </span>

                    <button // previous button to move back
                    className="view-btn"
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>  
            </div>
            {selectedRun && (
                <div className="run-details">
                    <h2> Run {selectedRun.id} </h2>
                    <p>Review: {getReview(selectedRun.review)}</p>
                    <p>Comments: {selectedRun.comments || "No Comments Saved"}</p>
                    <button
                        className="view-btn"
                        type="button"
                        onClick={() => setSelectedRun(null)}
                        >
                            Close
                        </button>
                </div>
            )}
        </section>
    );
}

export default Log;