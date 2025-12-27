export interface Planet {
  nameZh: string;
  nameEn: string;
  diameter: number;
  distanceFromSun: number;
  orbitalPeriod: number;
  rotationPeriod: number;
  texturePath: string;
  size: number;
  orbitSpeed: number;
  rotationSpeed: number;
  wikipediaUrl: string;
  descriptionZh: string;
  descriptionEn: string;
  hasRings?: boolean;
}

export interface Moon {
  nameZh: string;
  nameEn: string;
  diameter: number;
  distanceFromParent: number;
  orbitalPeriod: number;
  rotationPeriod: number;
  size: number;
  color: number;
  parentName: string;
  wikipediaUrl: string;
  descriptionZh: string;
  descriptionEn: string;
}

export const planets: Planet[] = [
  {
    nameZh: "水星",
    nameEn: "Mercury",
    diameter: 4879,
    distanceFromSun: 0.39,
    orbitalPeriod: 88,
    rotationPeriod: 1407.6,
    texturePath: "/textures/mercury.jpg",
    size: 1.0,
    orbitSpeed: 1 / 88,
    rotationSpeed: 1 / 1407.6,
    wikipediaUrl: "https://zh.wikipedia.org/wiki/%E6%B0%B4%E6%98%9F",
    descriptionZh: "太阳系最小的行星，也是最接近太阳的行星。表面布满陨石坑，昼夜温差极大。",
    descriptionEn: "The smallest planet in the solar system and the closest to the Sun. Its surface is covered with craters and has extreme temperature variations between day and night."
  },
  {
    nameZh: "金星",
    nameEn: "Venus",
    diameter: 12104,
    distanceFromSun: 0.72,
    orbitalPeriod: 225,
    rotationPeriod: 5832,
    texturePath: "/textures/venus.jpg",
    size: 2.0,
    orbitSpeed: 1 / 225,
    rotationSpeed: 1 / 5832,
    wikipediaUrl: "https://zh.wikipedia.org/wiki/%E9%87%91%E6%98%9F",
    descriptionZh: "太阳系中最热的行星，拥有厚厚的二氧化碳大气层，表面温度高达465°C。自转方向与其他行星相反。",
    descriptionEn: "The hottest planet in the solar system with a thick carbon dioxide atmosphere. Surface temperatures reach 465°C. Rotates in the opposite direction to other planets."
  },
  {
    nameZh: "地球",
    nameEn: "Earth",
    diameter: 12742,
    distanceFromSun: 1.00,
    orbitalPeriod: 365.25,
    rotationPeriod: 24,
    texturePath: "/textures/earth.jpg",
    size: 2.1,
    orbitSpeed: 1 / 365.25,
    rotationSpeed: 1 / 24,
    wikipediaUrl: "https://zh.wikipedia.org/wiki/%E5%9C%B0%E7%90%83",
    descriptionZh: "我们的家园，太阳系中唯一已知存在生命的行星。拥有液态水和适宜的大气层。",
    descriptionEn: "Our home, the only known planet in the solar system with life. Features liquid water and a suitable atmosphere."
  },
  {
    nameZh: "火星",
    nameEn: "Mars",
    diameter: 6779,
    distanceFromSun: 1.52,
    orbitalPeriod: 687,
    rotationPeriod: 24.6,
    texturePath: "/textures/mars.jpg",
    size: 1.3,
    orbitSpeed: 1 / 687,
    rotationSpeed: 1 / 24.6,
    wikipediaUrl: "https://zh.wikipedia.org/wiki/%E7%81%AB%E6%98%9F",
    descriptionZh: "红色的沙漠行星，拥有太阳系最高的火山奥林帕斯山。是人类探索的下一个目标。",
    descriptionEn: "A red desert planet with Olympus Mons, tallest volcano in the solar system. The next target of human exploration."
  },
  {
    nameZh: "木星",
    nameEn: "Jupiter",
    diameter: 139820,
    distanceFromSun: 5.20,
    orbitalPeriod: 4333,
    rotationPeriod: 9.9,
    texturePath: "/textures/jupiter.jpg",
    size: 5.0,
    orbitSpeed: 1 / 4333,
    rotationSpeed: 1 / 9.9,
    wikipediaUrl: "https://zh.wikipedia.org/wiki/%E6%9C%A8%E6%98%9F",
    descriptionZh: "太阳系最大的行星，巨大的气态巨行星。著名的大红斑是一个持续数百年的风暴。",
    descriptionEn: "The largest planet in the solar system, a massive gas giant. The Great Red Spot is a storm that has lasted for centuries."
  },
  {
    nameZh: "土星",
    nameEn: "Saturn",
    diameter: 116460,
    distanceFromSun: 9.58,
    orbitalPeriod: 10759,
    rotationPeriod: 10.7,
    texturePath: "/textures/saturn.jpg",
    size: 4.5,
    orbitSpeed: 1 / 10759,
    rotationSpeed: 1 / 10.7,
    wikipediaUrl: "https://zh.wikipedia.org/wiki/%E5%9C%9F%E6%98%9F",
    descriptionZh: "以壮观的环系统著称的气态巨行星。光环主要由冰粒和岩石碎片组成。",
    descriptionEn: "A gas giant known for its spectacular ring system. The rings are primarily composed of ice particles and rock fragments.",
    hasRings: true
  },
  {
    nameZh: "天王星",
    nameEn: "Uranus",
    diameter: 50724,
    distanceFromSun: 19.22,
    orbitalPeriod: 30687,
    rotationPeriod: 17.2,
    texturePath: "/textures/uranus.jpg",
    size: 2.8,
    orbitSpeed: 1 / 30687,
    rotationSpeed: 1 / 17.2,
    wikipediaUrl: "https://zh.wikipedia.org/wiki/%E5%A4%A9%E7%8E%8B%E6%98%9F",
    descriptionZh: "冰巨星，独特的躺着自转，自转轴倾斜98度。呈现美丽的蓝绿色。",
    descriptionEn: "An ice giant that rotates on its side with an axial tilt of 98 degrees. Displays a beautiful blue-green color."
  },
  {
    nameZh: "海王星",
    nameEn: "Neptune",
    diameter: 49244,
    distanceFromSun: 30.05,
    orbitalPeriod: 60190,
    rotationPeriod: 16.1,
    texturePath: "/textures/neptune.jpg",
    size: 2.7,
    orbitSpeed: 1 / 60190,
    rotationSpeed: 1 / 16.1,
    wikipediaUrl: "https://zh.wikipedia.org/wiki/%E6%B5%B7%E7%8E%8B%E6%98%9F",
    descriptionZh: "太阳系最外层的行星，深蓝色的冰巨星。拥有太阳系最强的风暴，风速可达2100公里/小时。",
    descriptionEn: "The outermost planet of the solar system, a deep blue ice giant. Features the strongest winds in the solar system, reaching up to 2100 km/h."
  }
];

export const sunData = {
  nameZh: "太阳",
  nameEn: "Sun",
  diameter: 1392700,
  texturePath: "/textures/sun.jpg",
  size: 8,
  wikipediaUrl: "https://zh.wikipedia.org/wiki/%E5%A4%AA%E9%98%B3",
  descriptionZh: "太阳系的中心恒星，占据了太阳系总质量的99.86%。为所有行星提供光和热。",
  descriptionEn: "The central star of the solar system, containing 99.86% of its total mass. Provides light and heat to all planets."
};

export const moons: Moon[] = [
  {
    nameZh: "月球",
    nameEn: "Moon",
    diameter: 3474,
    distanceFromParent: 0.00257,
    orbitalPeriod: 27.3,
    rotationPeriod: 655.2,
    size: 0.6,
    color: 0xcccccc,
    parentName: "地球",
    wikipediaUrl: "https://zh.wikipedia.org/wiki/%E6%9C%88%E7%90%83",
    descriptionZh: "地球唯一的天然卫星，也是太阳系第五大卫星。对地球的潮汐有重要影响。",
    descriptionEn: "Earth's only natural satellite and fifth largest in the solar system. Significantly influences Earth's tides."
  },
  {
    nameZh: "木卫二",
    nameEn: "Europa",
    diameter:3122,
    distanceFromParent: 0.0045,
    orbitalPeriod: 3.55,
    rotationPeriod: 85.2,
    size: 0.5,
    color: 0xd4c5a8,
    parentName: "木星",
    wikipediaUrl: "https://zh.wikipedia.org/wiki/%E6%9C%A8%E5%8D%AB%E4%BA%8C",
    descriptionZh: "木星的第四大卫星，表面被冰层覆盖。科学家认为冰层下可能有液态水海洋。",
    descriptionEn: "The fourth largest moon of Jupiter, covered in ice. Scientists believe there may be a liquid water ocean beneath the ice."
  },
  {
    nameZh: "土卫六",
    nameEn: "Titan",
    diameter: 5150,
    distanceFromParent: 0.008,
    orbitalPeriod: 15.95,
    rotationPeriod: 382.7,
    size: 0.6,
    color: 0xffaa44,
    parentName: "土星",
    wikipediaUrl: "https://zh.wikipedia.org/wiki/%E5%9C%9F%E5%8D%AB%E5%85%AD",
    descriptionZh: "土星最大的卫星，也是太阳系中唯一拥有浓厚大气层的卫星。表面有液态甲烷湖泊。",
    descriptionEn: "The largest moon of Saturn and only moon in the solar system with a dense atmosphere. Has liquid methane lakes on its surface."
  }
];
