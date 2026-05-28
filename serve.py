#!/usr/bin/env python3
"""
Simple local server for Jagadeesh's portfolio.
Run: python3 serve.py
Then open: http://localhost:8080
"""
import http.server, socketserver, webbrowser, os

PORT = 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass  # suppress request logs

print(f"\n  Portfolio running at → http://localhost:{PORT}")
print("  Voice & Video AI work on localhost.")
print("  Press Ctrl+C to stop.\n")

webbrowser.open(f"http://localhost:{PORT}")
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
