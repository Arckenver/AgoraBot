import RPi.GPIO as GPIO
import time


GPIO.setmode(GPIO.BOARD)
GPIO.setup(16, GPIO.OUT)
GPIO.setup(18, GPIO.OUT)

motor_pin_left = GPIO.PWM(16, 50) # GPIO 23
motor_pin_right = GPIO.PWM(18, 50) # GPIO 24

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
    power = float(raw_input("power: "))
    duration = float(raw_input("duration: "))

    motor_pin_left = GPIO.PWM(16, 50) # GPIO 23
    motor_pin_right = GPIO.PWM(18, 50) # GPIO 24
    print("Starting motors")
    motor_pin_left.start(power)
    motor_pin_right.start(power)
    print("Go to sleep for {0} seconds".format(duration))
    time.sleep(duration)
    print("Stopping motors")
    motor_pin_left.stop()
    motor_pin_right.stop()
    print("Ending test")


if __name__ == "__main__":
    test()
    time.sleep(3)
    print("Cleaning up")
    GPIO.cleanup()
