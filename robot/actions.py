import RPi.GPIO as GPIO
import time


STOPPED_MOTOR_DUTY_CYCLE = 7.0
FORWARD_MOTOR_DUTY_CYCLE = 8.0
BACKWARD_MOTOR_DUTY_CYCLE = 6.0
MIN_SERVO_DUTY_CYCLE = 2.0
MID_SERVO_DUTY_CYCLE = 5.7
MAX_SERVO_DUTY_CYCLE = 9.4

GPIO.setmode(GPIO.BOARD)
GPIO.setup(16, GPIO.OUT)
GPIO.setup(18, GPIO.OUT)
GPIO.setup(11, GPIO.OUT)

motor_pin_left = GPIO.PWM(16, 50) # GPIO 23
motor_pin_right = GPIO.PWM(18, 50) # GPIO 24
servo_pin = GPIO.PWM(11, 50) # GPIO 17

motor_pin_left.start(STOPPED_MOTOR_DUTY_CYCLE)
motor_pin_right.start(STOPPED_MOTOR_DUTY_CYCLE)
servo_pin.start(MID_SERVO_DUTY_CYCLE)

executing_action = False


def do_nothing():
    print("The robot is doing nothing")


def move_forward():
    motor_pin_left.ChangeDutyCycle(FORWARD_MOTOR_DUTY_CYCLE)
    motor_pin_right.ChangeDutyCycle(FORWARD_MOTOR_DUTY_CYCLE)
    time.sleep(2.5)
    motor_pin_left.ChangeDutyCycle(STOPPED_MOTOR_DUTY_CYCLE)
    motor_pin_right.ChangeDutyCycle(STOPPED_MOTOR_DUTY_CYCLE)


def turn_right():
    motor_pin_left.ChangeDutyCycle(BACKWARD_MOTOR_DUTY_CYCLE)
    motor_pin_right.ChangeDutyCycle(FORWARD_MOTOR_DUTY_CYCLE)
    time.sleep(1)
    motor_pin_left.ChangeDutyCycle(STOPPED_MOTOR_DUTY_CYCLE)
    motor_pin_right.ChangeDutyCycle(STOPPED_MOTOR_DUTY_CYCLE)


def turn_left():
    motor_pin_left.ChangeDutyCycle(FORWARD_MOTOR_DUTY_CYCLE)
    motor_pin_right.ChangeDutyCycle(BACKWARD_MOTOR_DUTY_CYCLE)
    time.sleep(1)
    motor_pin_left.ChangeDutyCycle(STOPPED_MOTOR_DUTY_CYCLE)
    motor_pin_right.ChangeDutyCycle(STOPPED_MOTOR_DUTY_CYCLE)


def move_backward():
    motor_pin_left.ChangeDutyCycle(BACKWARD_MOTOR_DUTY_CYCLE)
    motor_pin_right.ChangeDutyCycle(BACKWARD_MOTOR_DUTY_CYCLE)
    time.sleep(2)
    motor_pin_left.ChangeDutyCycle(STOPPED_MOTOR_DUTY_CYCLE)
    motor_pin_right.ChangeDutyCycle(STOPPED_MOTOR_DUTY_CYCLE)


def look_around():
    servo_pin.ChangeDutyCycle(MIN_SERVO_DUTY_CYCLE)
    time.sleep(3)
    servo_pin.ChangeDutyCycle(MAX_SERVO_DUTY_CYCLE)
    time.sleep(3)
    servo_pin.ChangeDutyCycle(MID_SERVO_DUTY_CYCLE)


def execute_action(action):
    global executing_action

    print("Executing action {0}".format(action))
    if executing_action:
        print("Can't execute action {0}: already executing another action".format(action))
        return

    executing_action = True
    if action == None:
        do_nothing()
    elif action == "MOVE_FORWARD":
        move_forward()
    elif action == "TURN_RIGHT":
        turn_right()
    elif action == "TURN_LEFT":
        turn_left()
    elif action == "MOVE_BACKWARD":
        move_backward()
    elif action == "LOOK_AROUND":
        look_around()
    else:
        executing_action = False
        print("Error: Invalid action {0}".format(action))
        return

    print("Action executed")
    executing_action = False


def quit():
    print("Stopping motors and servo")
    motor_pin_left.ChangeDutyCycle(STOPPED_MOTOR_DUTY_CYCLE)
    motor_pin_right.ChangeDutyCycle(STOPPED_MOTOR_DUTY_CYCLE)
    servo_pin.ChangeDutyCycle(MID_SERVO_DUTY_CYCLE)
    time.sleep(2)
    motor_pin_left.stop()
    motor_pin_right.stop()
    servo_pin.stop()
    GPIO.cleanup()
