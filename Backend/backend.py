from fastapi import FastAPI
from game import *

#{'selectDifficult': 'eazy', 'numberInput': '100', 'infinityCheckbox': 'No'}

app = FastAPI()


@app.post("/startParam")
async def receive_data(data: dict):

    difficult = data['selectDifficult']
    value = 1000

    params = start(value, difficult)

    return params


@app.post("/do")
async def receive_data(data: dict):
    data = data['do']
    params = action(data)
    return params

