## Nittany Market API Server

This template got me started: https://github.com/app-generator/api-server-flask

## Run the code

> **Step #1** - Clone the project

```bash
$ git clone https://github.com/joowy/NittanyMarket
$ cd NittanyMarket/server
```

<br />

> **Step #2** - create virtual environment using python3 and activate it (keep it outside our project directory)

```bash
$ # Virtualenv modules installation (Unix based systems)
$ virtualenv env
$ source env/bin/activate
$
$ # Virtualenv modules installation (Windows based systems)
$ # python -m virtualenv venv
$ # .\venv\Scripts\activate
```

<br />

> **Step #3** - Install dependencies in virtualenv

```bash
$ pip install -r requirements.txt
```

 <br />

> **Step #4** - set environment variables

_copy env.example_

```bash
$ cp .env.example .env
```

in .env, set variables

```
SECRET_KEY= example
JWT_SECRET_KEY = example

FLASK_HOST = "127.0.0.1"
FLASK_PORT = 7000
```

<br />

> **Step 5** - start test APIs server at `http://127.0.0.1/:7000`

```bash
$ python run.py
```
