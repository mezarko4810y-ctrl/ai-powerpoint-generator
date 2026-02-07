import AdmZip from 'adm-zip';
import * as fs from 'fs';
import * as path from 'path';

export async function analyzeZipProject(zipPath) {
  try {
    const zip = new AdmZip(zipPath);
    const entries = zip.getEntries();

    console.log(`📋 ZIP faylında ${entries.length} fəyl tapıldı`);

    const projectData = {
      files: [],
      structure: [],
      readmeContent: '',
      packageJson: {},
      configFiles: [],
    };

    for (const entry of entries) {
      if (!entry.isDirectory) {
        const fileName = entry.name;
        
        if (fileName.toLowerCase().includes('readme')) {
          projectData.readmeContent = entry.getData().toString('utf8');
          console.log('✓ README faylı tapıldı');
        }

        if (fileName.endsWith('package.json')) {
          try {
            projectData.packageJson = JSON.parse(entry.getData().toString('utf8'));
            console.log('✓ package.json tapıldı');
          } catch (e) {
            console.warn('⚠ package.json parse edilə bilmədi');
          }
        }

        if (fileName.match(/\.(json|yaml|yml|config)$/)) {
          projectData.configFiles.push({
            name: fileName,
            content: entry.getData().toString('utf8').substring(0, 500),
          });
        }

        projectData.files.push(fileName);
      } else {
        projectData.structure.push(entry.name);
      }
    }

    return projectData;
  } catch (error) {
    console.error('ZIP Analiz Xətası:', error.message);
    throw error;
  }
}

export function generateProjectSummary(projectData) {
  let summary = '';

  if (projectData.packageJson.name) {
    summary += `Layihə: ${projectData.packageJson.name}\n`;
    summary += `Versiya: ${projectData.packageJson.version}\n`;
    summary += `Təsvir: ${projectData.packageJson.description}\n\n`;
  }

  if (projectData.readmeContent) {
    summary += `README:\n${projectData.readmeContent.substring(0, 500)}\n\n`;
  }

  summary += `Fayllar: ${projectData.files.length}\n`;
  summary += `Dizinlər: ${projectData.structure.length}`;

  return summary;
}