import client

def main():
    print("Starting...")
    ws = client.connect("ws://142.4.214.198:8000/")

if __name__ == "__main__":
    main()
