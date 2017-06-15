import client
import actions

def main():
    print("Starting...")
    ws = client.connect("ws://localhost:8000/")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        actions.quit()
