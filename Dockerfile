{
  "name": "web-destroyer",
  "version": "4.2.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js --mode=ultra",
    "stress": "node app.js --threads=16 --duration=3600"
  },
  "dependencies": {
    "axios": "^1.6.8",
    "socks-proxy-agent": "^8.0.2",
    "random-useragent": "^0.5.0",
    "cluster": "^0.7.7",
    "http-proxy": "^1.18.1",
    "tls": "^0.0.2"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
