## [Nittany Market API Server]


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

> **Step #4** - start test APIs server at `http://127.0.0.1/:5000`

```bash
$ python run.py 
```
 