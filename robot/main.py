import client

def main():
    print("Starting...")
    ws = client.connect("ws://localhost:8000/")

if __name__ == "__main__":
    main()
