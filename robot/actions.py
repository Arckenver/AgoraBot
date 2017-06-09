import RPi.GPIO as GPIO
import time


GPIO.setmode(GPIO.BOARD)

pin_moteur_gauche = GPIO.PWM(16, 50) # GPIO 23
pin_moteur_droit = GPIO.PWM(18, 50) # GPIO 24

executing_action = False

def move_forward():
    pin_moteur_gauche.start(0.9)
    pin_moteur_droit.start(0.9)
    time.sleep(0.5)
    pin_moteur_gauche.stop()
    pin_moteur_droit.stop()


def turn_right():
    pass


def turn_left():
    pass


def turn_right_backward():
    pass


def turn_left_backward():
    pass


def execute_action(action):
    print("Executing action {0}".format(action))
    if executing_action:
        print("Can't execute action {0}: already executing another action".format(action))
    else:
        execute_action = True
        if action == "MOVE_FORWARD":
            move_forward()
        elif action == "TURN_RIGHT":
            turn_right()
        elif action == "TURN_LEFT":
            turn_left()
        elif action == "TURN_RIGHT_BACKWARD":
            turn_right_backward()
        elif action == "TURN_LEFT_BACKWARD":
            turn_left_backward()
        else:
            execute_action = False
            print("Error: Invalid action {0}".format(action))
