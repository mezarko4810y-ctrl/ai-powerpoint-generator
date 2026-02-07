export function getColors() {
  return {
    primary: process.env.PRIMARY_COLOR || '#1F4788',
    secondary: process.env.SECONDARY_COLOR || '#2E5C8A',
    text: process.env.TEXT_COLOR || '#333333',
    background: process.env.BACKGROUND_COLOR || '#FFFFFF',
    accent: '#FF6B6B',
    success: '#51CF66',
    warning: '#FFD43B',
  };
}

export function getFonts() {
  return {
    heading: 'Arial',
    body: 'Calibri',
    mono: 'Courier New',
  };
}

export function getLayout(layoutType) {
  const layouts = {
    title_slide: {
      name: 'title_slide',
      elements: ['title', 'subtitle', 'date'],
    },
    title_and_content: {
      name: 'title_and_content',
      elements: ['title', 'content', 'footer'],
    },
    two_column: {
      name: 'two_column',
      elements: ['title', 'left_content', 'right_content'],
    },
    image_with_caption: {
      name: 'image_with_caption',
      elements: ['title', 'image', 'caption'],
    },
  };

  return layouts[layoutType] || layouts.title_and_content;
}