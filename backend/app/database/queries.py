import json

from backend.app.database.connection import get_connection

def save_run(image_hash, model_version, prediction, probabilities):
    with get_connection() as conn:
        cursor = conn.execute(
            """
            INSERT INTO runs (
                image_hash,
                model_version,
                prediction,
                probs
            )
            VALUES (?, ?, ?, ?)
            """,
            (
                image_hash,
                model_version,
                prediction,
                json.dumps(probabilities)
            ),
        )

        return cursor.lastrowid


def get_runs():
    with get_connection() as conn:
        rows = conn.execute(
            "SELECT * FROM runs ORDER BY timestamp DESC, id DESC"
        ).fetchall()

        runs = [dict(row) for row in rows]

        for run in runs:
            run["probs"] = json.loads(run["probs"])

        return runs

def update_review(run_id: int, review: str, comments: str | None = None):
    with get_connection() as conn:
        cursor = conn.execute(
            """
            UPDATE runs
            SET review = ?, comments = ?
            WHERE id = ?
            """,
            (review, comments, run_id)
        )

        return cursor.rowcount > 0