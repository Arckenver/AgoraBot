import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)

pin_moteur_gauche = = GPIO.PWM(16, 50) # GPIO 23
pin_moteur_droit = = GPIO.PWM(18, 50) # GPIO 24

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
