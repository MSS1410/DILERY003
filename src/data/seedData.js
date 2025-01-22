const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// Auto genero ids para usuairios que meto de fabrica
const userIds = {
  Admin: new mongoose.Types.ObjectId(),
  Admin02: new mongoose.Types.ObjectId(),
  Banksy: new mongoose.Types.ObjectId(),
  Martina: new mongoose.Types.ObjectId(),
  AiWeiwei: new mongoose.Types.ObjectId(),
  Kapoor: new mongoose.Types.ObjectId(),
  Walker: new mongoose.Types.ObjectId(),
  Kusama: new mongoose.Types.ObjectId(),
  Hirst: new mongoose.Types.ObjectId(),
  Sherman: new mongoose.Types.ObjectId()
}

const projectIds = {
  'Girl with Balloon': new mongoose.Types.ObjectId(),
  'Flower Thrower': new mongoose.Types.ObjectId(),
  'Sunflower Seeds': new mongoose.Types.ObjectId(),
  'Dropping a Han Dynasty Urn': new mongoose.Types.ObjectId(),
  ' Gone ': new mongoose.Types.ObjectId(),
  'La Entrada de Cristo al Periodismo': new mongoose.Types.ObjectId(),
  'Infinity Room': new mongoose.Types.ObjectId(),
  'The Physical Impossibility of Death in the Mind of Someone Living':
    new mongoose.Types.ObjectId(),
  'For the Love of God': new mongoose.Types.ObjectId(),
  ' Pumpkins ': new mongoose.Types.ObjectId(),
  'Not Alone': new mongoose.Types.ObjectId(),
  'Momentum Crudo': new mongoose.Types.ObjectId(),
  'Spot Paintings': new mongoose.Types.ObjectId()
}

const studioIds = {
  'Generic Studio': new mongoose.Types.ObjectId(),
  'Banksy Studio': new mongoose.Types.ObjectId(),
  'Kusama Studio': new mongoose.Types.ObjectId(),
  'La Rambla': new mongoose.Types.ObjectId(),
  'Miracle studio': new mongoose.Types.ObjectId(),
  'Kapoor Studio': new mongoose.Types.ObjectId(),
  'Walker Studio': new mongoose.Types.ObjectId()
}

const exhibitionIds = {
  'Miró Matisse': new mongoose.Types.ObjectId(),
  'Sculptural Horizons': new mongoose.Types.ObjectId(),
  'Street Art Showcase': new mongoose.Types.ObjectId(),
  'Modern Installations': new mongoose.Types.ObjectId(),
  'Contemporary Visions': new mongoose.Types.ObjectId(),
  'Infinity Explorations': new mongoose.Types.ObjectId()
}

// Datos organizados
const users = [
  {
    _id: userIds.Banksy,
    name: 'Banksy',
    image: 'https://example.com/banksy.jpg',
    description: 'Artista callejero de rename mundial.',
    email: 'banksy@example.com',
    password: bcrypt.hashSync('banksy123', 10),
    projects: [projectIds['Girl with Balloon'], projectIds['Flower Thrower']],
    studios: [studioIds['Banksy Studio']],
    exhibitions: [exhibitionIds['Street Art Showcase']],
    role: 'user'
  },
  {
    _id: userIds.Martina,
    name: 'Martina Escolano',
    image: 'https://example.com/martina.jpg',
    description: 'Artista emergente conocida por su arte conceptual.',
    email: 'martina@example.com',
    password: bcrypt.hashSync('Esvac123', 10),
    projects: [projectIds['Not Alone'], projectIds['Momentum Crudo']],
    studios: [studioIds['La Rambla']],
    exhibitions: [exhibitionIds['Miró Matisse']],
    role: 'user'
  },
  {
    _id: userIds.AiWeiwei,
    name: 'Ai Weiwei',
    image: 'https://example.com/aiweiwei.jpg',
    description: 'Artista contemporáneo chino, conocido por sus instalaciones.',
    email: 'aiweiwei@example.com',
    password: bcrypt.hashSync('aiweiwei123', 10),
    projects: [
      projectIds['Sunflower Seeds'],
      projectIds['Dropping a Han Dynasty Urn']
    ],
    studios: [],
    exhibitions: [exhibitionIds['Street Art Showcase']],
    role: 'user'
  },
  {
    _id: userIds.Kapoor,
    name: 'Anish Kapoor',
    image: 'https://example.com/kapoor.jpg',
    description: 'Escultor conocido por works de gran escala.',
    email: 'kapoor@example.com',
    password: bcrypt.hashSync('kapoor123', 10),
    projects: [projectIds['Spot Paintings']],
    studios: [],
    exhibitions: [exhibitionIds['Sculptural Horizons']],
    role: 'user'
  },
  {
    _id: userIds.Walker,
    name: 'Kara Walker',
    image: 'https://example.com/walker.jpg',
    description: 'Artista conocida por sus instalaciones de siluetas.',
    email: 'walker@example.com',
    password: bcrypt.hashSync('walker123', 10),
    projects: [
      projectIds[' Gone '],
      projectIds['La Entrada de Cristo al Periodismo']
    ],
    studios: [studioIds['Miracle studio']],
    exhibitions: [exhibitionIds['Modern Installations']],
    role: 'user'
  },
  {
    _id: userIds.Kusama,
    name: 'Yayoi Kusama',
    image: 'https://example.com/kusama.jpg',
    description: 'Artista japonesa conocida por sus diseños de lunares.',
    email: 'kusama@example.com',
    password: bcrypt.hashSync('kusama123', 10),
    projects: [projectIds['Infinity Room'], projectIds[' Pumpkins ']],
    studios: [studioIds['Kusama Studio']],
    exhibitions: [exhibitionIds['Infinity Explorations']],
    role: 'user'
  },
  {
    _id: userIds.Hirst,
    name: 'Damien Hirst',
    image: 'https://example.com/hirst.jpg',
    description: 'Artista conceptual inglés conocido por su tiburones.',
    email: 'hirst@example.com',
    password: bcrypt.hashSync('hirst123', 10),
    projects: [
      projectIds[
        'The Physical Impossibility of Death in the Mind of Someone Living'
      ],
      projectIds['For the Love of God']
    ],
    studios: [],
    exhibitions: [exhibitionIds['Contemporary Visions']],
    role: 'user'
  },
  {
    _id: userIds.Sherman,
    name: 'Cindy Sherman',
    image: 'https://example.com/sherman.jpg',
    description: 'Fotógrafa conceptual y cineasta estadounidense.',
    email: 'sherman@example.com',
    password: bcrypt.hashSync('sherman123', 10),
    projects: [],
    studios: [],
    exhibitions: [],
    role: 'user'
  },
  {
    _id: userIds.Admin,
    name: 'Dilery Admin',
    image: 'https://example.com/admin.jpg',
    description: 'Administrador de Dilery.',
    email: 'adminDil@example.com',
    password: bcrypt.hashSync('admin999', 10),
    role: 'admin'
  },
  {
    _id: userIds.Admin02,
    name: 'Dilery Admin02',
    image: 'https://example.com/admin.jpg',
    description: 'Administrador de Dilery02.',
    email: 'adminDil02@example.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin'
  }
]

const projects = [
  {
    _id: projectIds['Girl with Balloon'],
    name: 'Girl with Balloon',
    description: 'Una de las works más icónicas de Banksy.',
    artist: userIds.Banksy,
    studio: studioIds['Banksy Studio'],
    exhibitions: [exhibitionIds['Street Art Showcase']],
    postDate: new Date('1999-03-10')
  },
  {
    _id: projectIds['Flower Thrower'],
    name: 'Flower Thrower',
    description: 'Otra obra representativa de Banksy.',
    artist: userIds.Banksy,
    studio: studioIds['Banksy Studio'],
    exhibitions: [exhibitionIds['Street Art Showcase']],
    postDate: new Date('2009-06-03')
  },
  {
    _id: projectIds['Sunflower Seeds'],
    name: 'Sunflower Seeds',
    description: 'Instalación con millones de semillas de porcelana.',
    artist: userIds.AiWeiwei,
    studio: studioIds['Generic Studio'],
    exhibitions: [exhibitionIds['Street Art Showcase']],
    postDate: new Date('2010-10-12')
  },
  {
    _id: projectIds['Dropping a Han Dynasty Urn'],
    name: 'Dropping a Han Dynasty Urn',
    description: 'Acto icónico de desafío cultural.',
    artist: userIds.AiWeiwei,
    studio: studioIds['Generic Studio'],
    exhibitions: [],
    postDate: new Date('1995-02-23')
  },
  {
    _id: projectIds[' Gone '],
    name: 'Gone',
    description: 'Siluetas impactantes y narrativas poderosas.',
    artist: userIds.Walker,
    studio: studioIds['Miracle studio'],
    exhibitions: [exhibitionIds['Modern Installations']],
    postDate: new Date('2002-06-30')
  },
  {
    _id: projectIds['La Entrada de Cristo al Periodismo'],
    name: 'La Entrada de Cristo al Periodismo',
    description: 'Obra conceptual sobre los medios.',
    artist: userIds.Walker,
    studio: studioIds['Miracle studio'],
    exhibitions: [],
    postDate: new Date('2008-11-15')
  },
  {
    _id: projectIds['Infinity Room'],
    name: 'Infinity Room',
    description: 'Una experiencia inmersiva infinita.',
    artist: userIds.Kusama,
    studio: studioIds['Kusama Studio'],
    exhibitions: [exhibitionIds['Infinity Explorations']],
    postDate: new Date('2013-05-07')
  },
  {
    _id: projectIds[' Pumpkins '],
    name: 'Pumpkins',
    description: 'Obra icónica de Kusama con calabazas.',
    artist: userIds.Kusama,
    studio: studioIds['Kusama Studio'],
    exhibitions: [exhibitionIds['Infinity Explorations']],
    postDate: new Date('2016-10-22')
  },
  {
    _id: projectIds[
      'The Physical Impossibility of Death in the Mind of Someone Living'
    ],
    name: 'The Physical Impossibility of Death in the Mind of Someone Living',
    description: 'Un tiburón sumergido en formaldehído.',
    artist: userIds.Hirst,
    studio: studioIds['Generic Studio'],
    exhibitions: [exhibitionIds['Contemporary Visions']],
    postDate: new Date('1991-03-15')
  },
  {
    _id: projectIds['For the Love of God'],
    name: 'For the Love of God',
    description: 'Una calavera cubierta de diamantes.',
    artist: userIds.Hirst,
    studio: studioIds['Generic Studio'],
    exhibitions: [],
    postDate: new Date('2007-06-01')
  },
  {
    _id: projectIds['Not Alone'],
    name: 'Not Alone',
    description: 'Representación del sentimiento de soledad.',
    artist: userIds.Martina,
    studio: studioIds['La Rambla'],
    exhibitions: [exhibitionIds['Miró Matisse']],
    postDate: new Date('2024-12-13')
  },
  {
    _id: projectIds['Momentum Crudo'],
    name: 'Momentum Crudo',
    description: 'Fotografía conceptual.',
    artist: userIds.Martina,
    studio: studioIds['La Rambla'],
    exhibitions: [exhibitionIds['Miró Matisse']],
    postDate: new Date('2024-12-20')
  },
  {
    _id: projectIds['Spot Paintings'],
    name: 'Spot Paintings',
    description: 'Pinturas con patrones repetitivos.',
    artist: userIds.Kapoor,
    studio: studioIds['Generic Studio'],
    exhibitions: [exhibitionIds['Sculptural Horizons']],
    postDate: new Date('2010-09-14')
  }
]

const studios = [
  {
    _id: studioIds['Generic Studio'],
    name: 'Generic Studio',
    participants: [],
    owner: null,
    works: [],
    exhibitions: []
  },
  {
    _id: studioIds['Banksy Studio'],
    name: 'Banksy Studio',
    participants: [userIds.Banksy],
    owner: userIds.Banksy,
    works: [projectIds['Girl with Balloon'], projectIds['Flower Thrower']],
    exhibitions: [exhibitionIds['Street Art Showcase']]
  },
  {
    _id: studioIds['La Rambla'],
    name: 'La Rambla',
    participants: [userIds.Martina],
    owner: userIds.Martina,
    works: [projectIds['Not Alone'], projectIds['Momentum Crudo']],
    exhibitions: [exhibitionIds['Miró Matisse']]
  },
  {
    _id: studioIds['Kusama Studio'],
    name: 'Kusama Studio',
    participants: [userIds.Kusama],
    owner: userIds.Kusama,
    works: [projectIds['Infinity Room'], projectIds[' Pumpkins ']],
    exhibitions: [exhibitionIds['Infinity Explorations']]
  },
  {
    _id: studioIds['Miracle studio'],
    name: 'Miracle studio',
    participants: [userIds.Walker],
    owner: userIds.Walker,
    works: [
      projectIds[' Gone '],
      projectIds['La Entrada de Cristo al Periodismo']
    ],
    exhibitions: [exhibitionIds['Modern Installations']]
  }
]

const exhibitions = [
  {
    _id: exhibitionIds['Street Art Showcase'],
    name: 'Street Art Showcase',
    description: 'Exposición de arte urbano.',
    organizers: [userIds.Banksy],
    exhibitors: [userIds.Banksy]
  },
  {
    _id: exhibitionIds['Miró Matisse'],
    name: 'Miró Matisse',
    description: 'Exploración de talento local en Barcelona.',
    organizers: [userIds.Martina],
    exhibitors: [userIds.Martina]
  },
  {
    _id: exhibitionIds['Sculptural Horizons'],
    name: 'Sculptural Horizons',
    description: 'Exploración de esculturas modernas.',
    organizers: [userIds.Kapoor],
    exhibitors: [userIds.Kapoor]
  },
  {
    _id: exhibitionIds['Modern Installations'],
    name: 'Modern Installations',
    description: 'Arte de instalaciones modernas.',
    organizers: [userIds.Walker],
    exhibitors: [userIds.Walker]
  },
  {
    _id: exhibitionIds['Contemporary Visions'],
    name: 'Contemporary Visions',
    description: 'Perspectivas contemporáneas del arte.',
    organizers: [userIds.Hirst],
    exhibitors: [userIds.Hirst]
  },
  {
    _id: exhibitionIds['Infinity Explorations'],
    name: 'Infinity Explorations',
    description: 'Instalaciones infinitas de Kusama.',
    organizers: [userIds.Kusama],
    exhibitors: [userIds.Kusama]
  }
]

module.exports = { users, projects, studios, exhibitions }
