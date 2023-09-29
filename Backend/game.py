UP_FOR5_COUNT = 0.01
START_VALUE = 2 #value//n



"""
1 - speed = 80%, error = 90%
2 - pressure = 70%, fire = 105%
3 - fire = 65%, speed = 95%
4 - error = 70%, fire = 90%, pressure=95%
"""

class indicators:
    def __init__(self, value=1000):
        self.value = value
        self.speed = value//START_VALUE
        self.fire = value//START_VALUE
        self.pressure = value//START_VALUE
        self.error = value//START_VALUE
        self.count = 0

    def difficult(self, difficult='eazy'):
        if difficult == 'eazy':
            self.speedUP = 0.03
        elif difficult == 'medium':
            self.speedUP = 0.07
        elif difficult == 'hard':
            self.speedUP = 0.10
        elif difficult == 'hell':
            self.speedUP = 0.12


    def every_turn(self):
        self.countUp = (self.count//5)*UP_FOR5_COUNT
        self.count += 1

        self.speed += self.value*(self.speedUP + self.countUp)
        self.fire += self.value*(self.speedUP + self.countUp)
        self.pressure += self.value*(self.speedUP + self.countUp)
        self.error += self.value*(self.speedUP + self.countUp)

        self.speed = int(self.speed)
        self.fire = int(self.fire)
        self.pressure = int(self.pressure)
        self.error = int(self.error)


    def button1(self):
        self.speed *= 0.75
        self.error *= 0.85

    def button2(self):
         self.pressure *= 0.7
         self.fire *= 1.05

    def button3(self):
        self.fire *= 0.65
        self.speed *= 0.90

    def button4(self):
        self.error *= 0.7
        self.pressure *= 0.85

def end():
    if game.speed>=game.value or game.fire >= game.value or game.pressure >= game.value or game.error >= game.value:
        print('You lost, count =', game.count)
        return True
    return False


def action(act):
    global game
    if end():
        return {'params':[1000, 1000, 1000, 1000], 'count': game.count, 'end':'you lost'}
    if act == 'act1':
        game.button1()
    elif act == 'act2':
        game.button2()
    elif act == 'act3':
        game.button3()
    elif act == 'act4':
        game.button4()

    game.every_turn()

    return {'params':[game.speed, game.fire, game.pressure, game.error], 'count': game.count}


def start(value=1000, difficult='easy'):
    global game
    game = indicators(value=value)
    game.difficult(difficult)
    return {'params':[game.speed, game.fire, game.pressure, game.error], 'count':0}

