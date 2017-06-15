import RPi.GPIO as GPIO
import time


STOPPED_MOTOR_DUTY_CYCLE = 7.0
MIN_SERVO_DUTY_CYCLE = 2.0
MID_SERVO_DUTY_CYCLE = 6.0
MAX_SERVO_DUTY_CYCLE = 10.0

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
    print("Starting motors")
    motor_pin_left.start(0.9)
    motor_pin_right.start(0.9)
    print("Go to sleep")
    time.sleep(2)
    print("Stopping motors")
    motor_pin_left.stop()
    motor_pin_right.stop()


def turn_right():
    print("Starting motors")
    motor_pin_left.start(0.9)
    motor_pin_right.start(0.9)
    print("Go to sleep")
    time.sleep(2)
    print("Stopping motors")
    motor_pin_left.stop()
    motor_pin_right.stop()


def turn_left():
    pass


def turn_right_backward():
    pass


def turn_left_backward():
    pass


def look_around():
    servo_pin.ChangeDutyCycle(MIN_SERVO_DUTY_CYCLE)
    time.sleep(2)
    servo_pin.ChangeDutyCycle(MAX_SERVO_DUTY_CYCLE)
    time.sleep(2)
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
    elif action == "TURN_RIGHT_BACKWARD":
        turn_right_backward()
    elif action == "TURN_LEFT_BACKWARD":
        turn_left_backward()
    else:
        executing_action = False
        print("Error: Invalid action {0}".format(action))
        return

    print("Action executed")
    executing_action = False


def test():
    dc = 1.0
    while dc > 0:
        dc = float(raw_input("duty cycle: "))
        servo_pin.ChangeDutyCycle(dc)
    print("Stopping")
    servo_pin.ChangeDutyCycle(MID_SERVO_DUTY_CYCLE)
    print("Ending test")


if __name__ == "__main__":
    look_around()
    time.sleep(10)
    print("Quitting")
    motor_pin_left.stop()
    motor_pin_right.stop()
    servo_pin.stop()
    GPIO.cleanup()
