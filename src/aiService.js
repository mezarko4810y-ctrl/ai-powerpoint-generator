import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateSlidesWithAI(prompt) {
  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return message.content[0].text;
  } catch (error) {
    console.error('Claude API Xətası:', error.message);
    throw error;
  }
}

export async function analyzeProjectContent(projectContent) {
  const prompt = `
    Aşağıdakı layihə məzmununu analiz et və PowerPoint təqdimatı üçün əsas nöqtələri çıxart:
    
    ${projectContent}
    
    Cavabı aşağıdakı JSON formatında ver:
    {
      "title": "Təqdimatın başlığı",
      "description": "Kısa açıklama",
      "mainTopics": ["Mövzu 1", "Mövzu 2", ...],
      "keyPoints": ["Əsas nöqtə 1", "Əsas nöqtə 2", ...]
    }
  `;

  const response = await generateSlidesWithAI(prompt);
  
  try {
    return JSON.parse(response);
  } catch {
    console.warn('JSON parse edilə bilmədi, məzmun qaytarıldı');
    return { rawContent: response };
  }
}

export async function generateSlideContent(topic, slideNumber, totalSlides) {
  const prompt = `
    Aşağıdakı mövzu üçün PowerPoint slaydı məzmunu yarat:
    
    Mövzu: ${topic}
    Slayd Nömrəsi: ${slideNumber}/${totalSlides}
    
    Cavabı aşağıdakı JSON formatında ver (Azərbaycanca):
    {
      "title": "Slayd başlığı",
      "bullets": [
        "Məqalə 1",
        "Məqalə 2",
        "Məqalə 3"
      ],
      "notes": "Sunovçu notları",
      "imageDescription": "Şəkil təsviri (opsional)"
    }
  `;

  const response = await generateSlidesWithAI(prompt);
  
  try {
    return JSON.parse(response);
  } catch {
    return {
      title: topic,
      bullets: [response.substring(0, 100)],
      notes: response,
      imageDescription: ''
    };
  }
}