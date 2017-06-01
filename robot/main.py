import client

def main():
    print("Starting...")
    ws = client.connect("ws://dev.arckenver.com:7801/")

if __name__ == "__main__":
    main()
