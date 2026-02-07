# 🎨 AI PowerPoint Slayd Hazırlayıcısı

Claude AI ilə işləyən, Node.js əsaslı PowerPoint slayd hazırlayıcı layihəsi.

## ✨ Xüsusiyyətlər

- **100-ə qədər slayd** hazırlaya bilir
- **Claude AI** inteqrasiyası
- **ZIP faylları analiz** edə bilir
- **Fərdiləşdirilmiş slaydlar** hazırlayır
- **pptxjs** ilə yüksək keyfiyyətli PowerPoint
- **Azərbaycanca dəstəyi**

## 📋 Sistem Tələbləri

- Node.js 16+
- npm yaxud yarn
- Claude API Key

## 🚀 Qurulum

### 1. Layihəni klonla
```bash
git clone https://github.com/mezarko4810y-ctrl/ai-powerpoint-generator.git
cd ai-powerpoint-generator
```

### 2. Asılılıqları qur
```bash
npm install
```

### 3. .env faylı yarat
```bash
cp .env.example .env
```

### 4. API Key-i əlavə et
```env
ANTHROPIC_API_KEY=your_claude_api_key_here
```

## 💻 İstifadə

### Seçenek 1: ZIP Faylından Analiz

```bash
node src/main.js --zip /path/to/project.zip
```

Bu seçenek:
- ZIP faylını analiz edər
- README və package.json oxuyur
- Layihə struktura əsasən slaydlar hazırlayır

### Seçenek 2: Birbaşa Məzmun

```bash
node src/main.js --content "Şirkət Təqdimatı"
```

### Seçenek 3: İnteraktiv Mod

```bash
npm start
```

## 📊 Çıxış

PowerPoint faylı `presentation_YYYY-MM-DD-HH-mm-ss.pptx` şəklində yaradılır.

## ⚙️ Konfiqurasiya

`.env` faylındə aşağıdakı parametrləri tənzimləyə bilərsiz:

```env
ANTHROPIC_API_KEY=your_key
MAX_SLIDES=100
SLIDE_WIDTH=10
SLIDE_HEIGHT=7.5
PRIMARY_COLOR=#1F4788
SECONDARY_COLOR=#2E5C8A
TEXT_COLOR=#333333
BACKGROUND_COLOR=#FFFFFF
```

## 📁 Layihə Strukturu

```
ai-powerpoint-generator/
├── src/
│   ├── main.js
│   ├── aiService.js
│   ├── zipAnalyzer.js
│   ├── slidesGenerator.js
│   ├── pptxBuilder.js
│   ├── utils.js
│   └── templates/
│       ├── layouts.js
│       └── styles.js
├── config/
│   └── config.js
├── examples/
│   ├── sample.zip
│   └── config.example.json
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🔑 API Keys

### Claude API Key Almaq

1. https://console.anthropic.com sitəsinə daxil ol
2. API Keys bölməsinə keç
3. Yeni key yarat
4. `.env` faylına əlavə et

## 📝 Misal

```bash
node src/main.js --zip ./myproject.zip
```

Nəticə: `presentation_2026-02-07T12-30-45.pptx`

## 🛠️ Geliştirme

```bash
npm run dev
npx eslint src/
```

## 📄 Lisans

MIT

## 👨‍💻 Müəllif

mezarko4810y-ctrl

## 🤝 Töhfə

Pull requestlər qəbul edilir!