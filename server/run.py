
import os
from api import app, db


@app.shell_context_processor
def make_shell_context():
    return {"app": app,
            "db": db
            }


HOST = os.environ.get("FLASK_HOST")
PORT = os.environ.get("FLASK_PORT")

if __name__ == '__main__':
    app.run(host=HOST, port=int(PORT), debug=True)
