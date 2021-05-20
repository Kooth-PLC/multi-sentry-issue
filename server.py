#!/usr/bin/env python3

import contextlib
import socket
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class AppShellHandler(SimpleHTTPRequestHandler):
    def do_GET(self) -> None:
        if self.path == '/':
            self.send_response(301)
            self.send_header('Location', '/app-1')
            self.end_headers()
        else:
            return super().do_GET()

    def translate_path(self, path):
        path = re.sub(r'^/([^/]+)(.*)', r'/\1/dist\2', path)

        if (path[-1] == '/'):
            path = '/shell/dist/index.html'

        print("Path: ", path)

        return super().translate_path(path)

class DualStackServer(ThreadingHTTPServer):
    def server_bind(self):
        # suppress exception when protocol is IPv4
        with contextlib.suppress(Exception):
            self.socket.setsockopt(
                socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        return super().server_bind()

httpd = DualStackServer(('', 8000), AppShellHandler)
httpd.serve_forever()