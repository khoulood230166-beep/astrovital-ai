# AstroVital AI - Local High-Performance HTTP Server
# NASA Space Apps Challenge 2026

import http.server
import socketserver
import os
import sys
import webbrowser

PORT = 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers for offline evaluation
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run():
    port = PORT
    for p in range(PORT, PORT + 20):
        try:
            with socketserver.TCPServer(("", p), Handler) as httpd:
                print(f"🚀 AstroVital AI Server active at http://localhost:{p}")
                print("Press Ctrl+C to stop.")
                httpd.serve_forever()
                break
        except OSError:
            continue

if __name__ == "__main__":
    run()
