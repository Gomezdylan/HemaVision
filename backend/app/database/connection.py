import os
import sqlite3

DB_PATH = os.getenv("DB_PATH", "db/hemavision.db")


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def initialize_database():
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS runs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                image_hash TEXT NOT NULL,
                model_version TEXT NOT NULL,
                prediction TEXT NOT NULL,
                probs TEXT NOT NULL,
                review TEXT,
                comments, TEXT
            )
        """)