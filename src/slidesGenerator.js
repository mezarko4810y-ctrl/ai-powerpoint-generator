import { generateSlidesWithAI, analyzeProjectContent, generateSlideContent } from './aiService.js';
import { generateProjectSummary } from './zipAnalyzer.js';
import { validateSlideCount } from './utils.js';

export async function generatePresentation(projectData, userContent) {
  try {
    let slideCount = 10;
    
    if (Object.keys(projectData).length > 0) {
      const summary = generateProjectSummary(projectData);
      console.log('📖 Layihə xülasəsi analiz edilir...');
      
      const analysis = await analyzeProjectContent(summary);
      
      if (analysis.mainTopics) {
        slideCount = Math.min(analysis.mainTopics.length + 3, 100);
      }
    }

    slideCount = validateSlideCount(slideCount);
    console.log(`📊 ${slideCount} slayd hazırlanacaq\n`);

    const slides = [];

    const titleSlide = await generateSlideContent(
      userContent || 'AI ilə Hazırlanmış Təqdimat',
      1,
      slideCount
    );
    slides.push({
      ...titleSlide,
      type: 'title',
      layout: 'title_slide',
    });

    const topics = ['Giriş', 'Əsas Məqamlar', 'Təfərrüatlar', 'Nəticə', 'Suallar'];
    
    for (let i = 2; i <= slideCount; i++) {
      const topic = topics[(i - 2) % topics.length];
      const slideContent = await generateSlideContent(
        `${topic} - Slayd ${i}`,
        i,
        slideCount
      );

      slides.push({
        ...slideContent,
        type: 'content',
        layout: 'title_and_content',
        slideNumber: i,
      });

      if (i % 5 === 0) {
        console.log(`⏳ ${i}/${slideCount} slaydlar hazırlandı...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return slides;
  } catch (error) {
    console.error('Slayd Hazırlama Xətası:', error.message);
    throw error;
  }
}