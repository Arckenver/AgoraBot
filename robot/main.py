import client

def main():
    print("Starting...")
    ws = client.connect("ws://dev.arckenver.com:8000/")

if __name__ == "__main__":
    main()
