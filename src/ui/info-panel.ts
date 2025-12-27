import { Planet } from '../data/planet-data';
import { sunData } from '../data/planet-data';

export class InfoPanel {
  private element: HTMLElement;
  private currentLanguage: 'zh' | 'en' = 'zh';
  private langToggleBtn: HTMLButtonElement;
  private closeBtn: HTMLButtonElement;
  private planetNameEl: HTMLElement;
  private infoContainer: HTMLElement;
  private currentPlanetData: Planet | typeof sunData | null = null;
  
  constructor() {
    this.element = this.createDOM();
    document.body.appendChild(this.element);
    
    this.langToggleBtn = this.element.querySelector('.lang-toggle') as HTMLButtonElement;
    this.closeBtn = this.element.querySelector('.close-btn') as HTMLButtonElement;
    this.planetNameEl = this.element.querySelector('.planet-name') as HTMLElement;
    this.infoContainer = this.element.querySelector('.info-container') as HTMLElement;
    
    this.langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleLanguage();
    });
    this.closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.hide();
    });
  }
  
  private createDOM(): HTMLElement {
    const panel = document.createElement('div');
    panel.className = 'info-panel';
    panel.innerHTML = `
      <div class="panel-header">
        <h2 class="planet-name"></h2>
        <button class="lang-toggle">EN</button>
        <button class="close-btn">&times;</button>
      </div>
      <div class="info-container"></div>
    `;
    
    this.addStyles();
    return panel;
  }
  
  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .info-panel {
        position: fixed;
        top: 50%;
        right: 150px;
        transform: translateY(-50%);
        width: 340px;
        background: rgba(0, 0, 0, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        padding: 24px;
        color: #fff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        z-index: 9999;
      }
      
      .info-panel.visible {
        opacity: 1;
        pointer-events: auto;
      }
      
      .panel-header {
        position: relative;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 12px;
      }
      
      .planet-name {
        font-size: 28px;
        font-weight: 300;
        margin: 0;
        letter-spacing: 1px;
      }
      
      .lang-toggle {
        position: absolute;
        top: 0;
        right: 50px;
        background: none;
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
        font-size: 14px;
        padding: 6px 12px;
        border-radius: 4px;
        transition: all 0.2s ease;
      }
      
      .lang-toggle:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }
      
      .close-btn {
        position: absolute;
        top: -4px;
        right: 0;
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        font-size: 32px;
        padding: 0;
        line-height: 1;
        transition: color 0.2s ease;
      }
      
      .close-btn:hover {
        color: #fff;
      }
      
      .info-item {
        margin-bottom: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .info-label {
        color: rgba(255, 255, 255, 0.6);
        font-size: 14px;
      }
      
      .info-value {
        font-weight: 500;
        font-size: 15px;
      }
      
      .description {
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.9);
        font-size: 14px;
      }
      
      .wikipedia-btn {
        display: block;
        text-align: center;
        margin-top: 24px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
        transition: all 0.2s ease;
        font-size: 14px;
      }
      
      .wikipedia-btn:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    `;
    document.head.appendChild(style);
  }
  
  show(planetData: Planet | typeof sunData): void {
    this.currentPlanetData = planetData;
    this.updateContent(planetData);
    this.element.classList.add('visible');
  }
  
  hide(): void {
    this.element.classList.remove('visible');
  }
  
  private updateContent(planetData: Planet | typeof sunData): void {
    const name = this.currentLanguage === 'zh' ? planetData.nameZh : planetData.nameEn;
    const description = this.currentLanguage === 'zh' ? planetData.descriptionZh : planetData.descriptionEn;
    
    this.planetNameEl.textContent = name;
    
    const infoHTML = this.generateInfoHTML(planetData);
    this.infoContainer.innerHTML = infoHTML + `
      <div class="description">${description}</div>
      <a href="${planetData.wikipediaUrl}" target="_blank" class="wikipedia-btn">
        ${this.currentLanguage === 'zh' ? '在 Wikipedia 上查看' : 'View on Wikipedia'}
      </a>
    `;
  }
  
  private generateInfoHTML(planetData: Planet | typeof sunData): string {
    const isSun = !('distanceFromSun' in planetData);
    
    if (isSun) {
      return `
        <div class="info-item">
          <span class="info-label">${this.currentLanguage === 'zh' ? '直径' : 'Diameter'}</span>
          <span class="info-value">${planetData.diameter.toLocaleString()} km</span>
        </div>
      `;
    }
    
    return `
      <div class="info-item">
        <span class="info-label">${this.currentLanguage === 'zh' ? '直径' : 'Diameter'}</span>
        <span class="info-value">${planetData.diameter.toLocaleString()} km</span>
      </div>
      <div class="info-item">
        <span class="info-label">${this.currentLanguage === 'zh' ? '距离太阳' : 'Distance from Sun'}</span>
        <span class="info-value">${planetData.distanceFromSun.toFixed(2)} AU</span>
      </div>
      <div class="info-item">
        <span class="info-label">${this.currentLanguage === 'zh' ? '公转周期' : 'Orbital Period'}</span>
        <span class="info-value">${planetData.orbitalPeriod.toLocaleString()} ${this.currentLanguage === 'zh' ? '天' : 'days'}</span>
      </div>
      <div class="info-item">
        <span class="info-label">${this.currentLanguage === 'zh' ? '自转周期' : 'Rotation Period'}</span>
        <span class="info-value">${planetData.rotationPeriod.toFixed(1)} ${this.currentLanguage === 'zh' ? '小时' : 'hours'}</span>
      </div>
    `;
  }
  
  private toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'zh' ? 'en' : 'zh';
    this.langToggleBtn.textContent = this.currentLanguage === 'zh' ? 'EN' : '中文';
    
    if (this.currentPlanetData) {
      this.updateContent(this.currentPlanetData);
    }
  }
}
