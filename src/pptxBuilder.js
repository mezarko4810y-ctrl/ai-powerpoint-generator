import PptxJs from 'pptxjs';
import * as fs from 'fs';
import * as path from 'path';
import { getColors, getFonts } from './templates/styles.js';

export async function buildPPTX(slides) {
  try {
    const colors = getColors();
    const fonts = getFonts();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `presentation_${timestamp.substring(0, 19)}.pptx`;

    const pres = new PptxJs.Presentation({
      width: 10,
      height: 7.5,
    });

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const pptSlide = pres.defineLayout(slide.layout || 'default').addSlide();

      if (slide.type === 'title') {
        addTitleSlide(pptSlide, slide, colors, fonts);
      } else {
        addContentSlide(pptSlide, slide, colors, fonts);
      }

      if ((i + 1) % 10 === 0) {
        console.log(`  ✓ ${i + 1} slayd əlavə edildi`);
      }
    }

    const outputPath = path.join(process.cwd(), filename);
    await pres.save(filename);

    console.log(`📁 Faylın tam yolu: ${outputPath}`);
    return filename;
  } catch (error) {
    console.error('PPTX Yaratma Xətası:', error.message);
    throw error;
  }
}

function addTitleSlide(slide, content, colors, fonts) {
  slide.background = { 
    path: null,
    color: colors.primary 
  };

  slide.addText(content.title || 'Təqdimat', {
    x: 0.5,
    y: 2.5,
    w: 9,
    h: 1,
    fontSize: 54,
    bold: true,
    color: colors.text,
    align: 'center',
    fontFace: fonts.heading,
  });

  const subtitle = content.bullets?.[0] || 'AI ilə hazırlanmış';
  slide.addText(subtitle, {
    x: 0.5,
    y: 3.8,
    w: 9,
    h: 0.8,
    fontSize: 24,
    color: colors.secondary,
    align: 'center',
    fontFace: fonts.body,
  });

  const date = new Date().toLocaleDateString('az-AZ');
  slide.addText(date, {
    x: 0.5,
    y: 7,
    w: 9,
    h: 0.4,
    fontSize: 12,
    color: colors.text,
    align: 'center',
    italic: true,
  });
}

function addContentSlide(slide, content, colors, fonts) {
  slide.background = { 
    color: colors.background 
  };

  slide.addText(content.title || 'Slayd', {
    x: 0.5,
    y: 0.4,
    w: 9,
    h: 0.6,
    fontSize: 40,
    bold: true,
    color: colors.primary,
    fontFace: fonts.heading,
  });

  slide.addShape(PptxJs.ShapeType.rect, {
    x: 0.5,
    y: 1.1,
    w: 9,
    h: 0.02,
    fill: { 
      color: colors.secondary 
    },
    line: { 
      type: 'none' 
    },
  });

  const bulletText = (content.bullets || [])
    .map((bullet, idx) => {
      return `${String.fromCharCode(8226)} ${bullet}`;
    })
    .join('\n\n');

  slide.addText(bulletText, {
    x: 1,
    y: 1.5,
    w: 8.5,
    h: 5.2,
    fontSize: 18,
    color: colors.text,
    fontFace: fonts.body,
    valign: 'top',
  });

  const slideNum = content.slideNumber || '1';
  slide.addText(`${slideNum}`, {
    x: 9,
    y: 7.2,
    w: 0.5,
    h: 0.3,
    fontSize: 10,
    color: colors.secondary,
    align: 'right',
  });
}