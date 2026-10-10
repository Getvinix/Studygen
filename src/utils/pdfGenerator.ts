import { jsPDF } from 'jspdf';
import { StandardExam, SimpleNote } from '../types';

/**
 * Converts an SVG string into a high-res PNG Data URL using an offscreen canvas
 */
export async function svgToPngDataUrl(
  svgString: string,
  width = 700,
  height = 400
): Promise<string | null> {
  if (!svgString) return null;
  return new Promise((resolve) => {
    try {
      // Normalize SVG string
      let cleaned = svgString.trim();
      if (!cleaned.includes('xmlns=')) {
        cleaned = cleaned.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      const blob = new Blob([cleaned], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        // scale for higher DPI print clarity
        canvas.width = width * 2;
        canvas.height = height * 2;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(2, 2);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/png', 0.95);
          URL.revokeObjectURL(url);
          resolve(dataUrl);
        } else {
          URL.revokeObjectURL(url);
          resolve(null);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };

      img.src = url;
    } catch (err) {
      console.warn('Could not render SVG to PNG for PDF:', err);
      resolve(null);
    }
  });
}

/**
 * Generates a clean, multi-page, formatted standard examination paper as a PDF
 */
export async function generateExamPdf(
  exam: StandardExam,
  options: { includeMarkScheme?: boolean; candidateName?: string; institutionName?: string } = {}
): Promise<void> {
  const { includeMarkScheme = true, candidateName = '', institutionName = '' } = options;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // --- COVER / HEADER ---
  if (institutionName) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text(institutionName.toUpperCase(), margin, y);
    y += 6;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(20, 30, 50);
  const titleLines = doc.splitTextToSize(exam.paperTitle.toUpperCase(), contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(70, 80, 95);
  doc.text(
    `${exam.paperSubtitle || 'Standardized Examination Paper'} • ${exam.subject.toUpperCase()}${
      exam.gradeLevel ? ` • ${exam.gradeLevel.toUpperCase()}` : ''
    }`,
    margin,
    y
  );
  y += 6;

  // Header Box details
  doc.setDrawColor(200, 210, 220);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text(`Paper Code: `, margin + 4, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(exam.paperCode || 'STD-EXAM-01', margin + 25, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.text(`Grade Level: `, margin + 58, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(exam.gradeLevel || 'Standard', margin + 78, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.text(`Time: `, margin + 118, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(`${exam.durationMinutes}m`, margin + 128, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.text(`Max Marks: `, margin + 142, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(`${exam.totalMarks}`, margin + 162, y + 6);

  // Candidate Name line
  doc.setFont('helvetica', 'bold');
  doc.text(`Candidate Name: `, margin + 4, y + 16);
  doc.setFont('helvetica', 'normal');
  if (candidateName) {
    doc.text(candidateName, margin + 35, y + 16);
  } else {
    doc.setDrawColor(160, 174, 192);
    doc.line(margin + 35, y + 17, margin + 115, y + 17);
  }

  doc.setFont('helvetica', 'bold');
  doc.text(`Date: `, margin + 125, y + 16);
  doc.setFont('helvetica', 'normal');
  doc.line(margin + 138, y + 17, margin + 170, y + 17);

  y += 28;

  // Candidate Instructions
  if (exam.candidateInstructions && exam.candidateInstructions.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text('INSTRUCTIONS TO CANDIDATES', margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);

    exam.candidateInstructions.forEach((inst) => {
      const wrapped = doc.splitTextToSize(`• ${inst}`, contentWidth - 4);
      doc.text(wrapped, margin + 2, y);
      y += wrapped.length * 4.2;
    });

    y += 4;
  }

  // Formula Sheet
  if (exam.formulaSheet && exam.formulaSheet.length > 0) {
    checkPageBreak(35);
    doc.setDrawColor(210, 220, 230);
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, y, contentWidth, 7, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text('FORMULA & CONSTANTS REFERENCE SHEET', margin + 4, y + 4.8);
    y += 10;

    exam.formulaSheet.forEach((f) => {
      checkPageBreak(8);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(`${f.quantity}:`, margin + 3, y);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(3, 105, 161);
      doc.text(f.formula, margin + 50, y);

      if (f.notes) {
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100, 116, 139);
        doc.text(`(${f.notes})`, margin + 105, y);
      }
      y += 5.2;
    });

    y += 4;
  }

  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // --- SECTIONS & QUESTIONS ---
  for (const section of exam.sections) {
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(
      `SECTION ${section.sectionLetter.toUpperCase()}: ${section.sectionTitle.toUpperCase()} [${section.sectionTotalMarks} MARKS]`,
      margin,
      y
    );
    y += 5;

    if (section.sectionInstructions) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text(section.sectionInstructions, margin, y);
      y += 6;
    }

    for (const q of section.questions) {
      checkPageBreak(30);

      // Question header and marks
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(`${q.questionNumber}`, margin, y);

      const markText = `[${q.marks} mark${q.marks > 1 ? 's' : ''}]`;
      const markWidth = doc.getTextWidth(markText);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(71, 85, 105);
      doc.text(markText, pageWidth - margin - markWidth, y);
      y += 5.5;

      // Question body
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
      const textLines = doc.splitTextToSize(q.text, contentWidth);
      doc.text(textLines, margin, y);
      y += textLines.length * 4.8 + 2;

      // Embedded Outlined Diagram (if present)
      if (q.hasDiagram && q.diagramSvg) {
        try {
          checkPageBreak(58);
          const pngData = await svgToPngDataUrl(q.diagramSvg, 500, 260);
          if (pngData) {
            const imgWidth = 110;
            const imgHeight = 55;
            const imgX = (pageWidth - imgWidth) / 2;
            doc.addImage(pngData, 'PNG', imgX, y, imgWidth, imgHeight);
            y += imgHeight + 2;

            if (q.diagramTitle) {
              doc.setFont('helvetica', 'italic');
              doc.setFontSize(8);
              doc.setTextColor(100, 116, 139);
              const caption = q.diagramTitle;
              const capW = doc.getTextWidth(caption);
              doc.text(caption, (pageWidth - capW) / 2, y);
              y += 5;
            }
          }
        } catch (e) {
          console.warn('Error embedding diagram in PDF:', e);
        }
      }

      // Options (if MCQ)
      if (q.options && q.options.length > 0) {
        checkPageBreak(q.options.length * 6 + 4);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        q.options.forEach((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const optLines = doc.splitTextToSize(`${letter}.  ${opt}`, contentWidth - 8);
          doc.text(optLines, margin + 4, y);
          y += optLines.length * 4.6 + 1.2;
        });
        y += 2;
      }

      // Working lines (if structured/extended question)
      const linesToDraw = q.suggestedWorkingLines || (q.marks >= 4 ? 6 : 4);
      if (!q.options || q.options.length === 0) {
        checkPageBreak(linesToDraw * 6 + 6);
        doc.setDrawColor(226, 232, 240);
        for (let l = 0; l < linesToDraw; l++) {
          doc.line(margin + 2, y + 4, pageWidth - margin - 2, y + 4);
          y += 6;
        }
        y += 4;
      }

      y += 4;
    }

    y += 4;
  }

  // --- MARKING SCHEME & MODEL SOLUTIONS (SEPARATE SECTION) ---
  if (includeMarkScheme && exam.markingScheme && exam.markingScheme.length > 0) {
    doc.addPage();
    y = margin;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text('EXAMINER MARKING SCHEME & MODEL ANSWERS', margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('Confidential Official Grading Guide • For Self-Assessment & Teacher Use', margin, y);
    y += 7;

    doc.setDrawColor(203, 213, 225);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    for (const item of exam.markingScheme) {
      checkPageBreak(25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(`${item.questionNumber}: Model Answer`, margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      const answerLines = doc.splitTextToSize(item.modelAnswer, contentWidth);
      doc.text(answerLines, margin, y);
      y += answerLines.length * 4.4 + 2;

      // Marking criteria codes (M1, A1, B1)
      if (item.gradingBreakdown && item.gradingBreakdown.length > 0) {
        item.gradingBreakdown.forEach((gb) => {
          checkPageBreak(8);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(3, 105, 161);
          doc.text(`[${gb.code}]`, margin + 4, y);

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(51, 65, 85);
          const cLines = doc.splitTextToSize(gb.criterion, contentWidth - 28);
          doc.text(cLines, margin + 18, y);

          doc.setFont('helvetica', 'bold');
          doc.text(`(${gb.allocatedMarks} mark${gb.allocatedMarks > 1 ? 's' : ''})`, pageWidth - margin - 20, y);
          y += cLines.length * 4.2 + 1;
        });
      }

      if (item.examinerTips) {
        checkPageBreak(12);
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(146, 64, 14);
        const tipLines = doc.splitTextToSize(`Examiner Warning: ${item.examinerTips}`, contentWidth - 4);
        doc.text(tipLines, margin + 2, y);
        y += tipLines.length * 4 + 2;
      }

      y += 5;
    }
  }

  // Add Page Numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `OpenLearn Assessment • Page ${i} of ${totalPages} • Help & Tutoring: WhatsApp +254 732 884 645 | Telegram +254 769 363 976`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  const safeFilename = (exam.paperTitle || 'Standard_Exam')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 40);
  doc.save(`${safeFilename}.pdf`);
}

/**
 * Generates structured, beautiful Simple Revision Notes as a PDF
 */
export async function generateNotesPdf(note: SimpleNote): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  const titleLines = doc.splitTextToSize(note.title, contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 6.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Subject: ${note.subject}  |  Level: ${note.gradeLevel || 'Standard'}  |  Topic: ${note.topic}  |  Read Time: ~${note.estimatedReadTimeMinutes} mins`,
    margin,
    y
  );
  y += 7;

  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 7;

  // Core Concept & Intuition
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('1. CORE CONCEPT & INTUITION', margin, y);
  y += 5.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  const conceptLines = doc.splitTextToSize(note.coreConcept, contentWidth);
  doc.text(conceptLines, margin, y);
  y += conceptLines.length * 4.6 + 6;

  // Misconceptions & Traps
  if (note.commonMisconceptions && note.commonMisconceptions.length > 0) {
    checkPageBreak(25);
    doc.setDrawColor(254, 202, 202);
    doc.setFillColor(254, 242, 242);
    doc.roundedRect(margin, y, contentWidth, 8 + note.commonMisconceptions.length * 5.5, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(185, 28, 28);
    doc.text('COMMON TRAPS & MISCONCEPTIONS (BEWARE!):', margin + 4, y + 5.5);
    let my = y + 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(127, 29, 29);
    note.commonMisconceptions.forEach((misc) => {
      const miscLines = doc.splitTextToSize(`• ${misc}`, contentWidth - 8);
      doc.text(miscLines, margin + 4, my);
      my += miscLines.length * 4.4 + 1;
    });

    y = my + 5;
  }

  // Outlined Vector Diagram
  if (note.outlinedDiagram && note.outlinedDiagram.svgCode) {
    try {
      checkPageBreak(75);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text('2. OUTLINED CONCEPT DIAGRAM', margin, y);
      y += 5.5;

      const pngData = await svgToPngDataUrl(note.outlinedDiagram.svgCode, 640, 380);
      if (pngData) {
        const imgWidth = 130;
        const imgHeight = 75;
        const imgX = (pageWidth - imgWidth) / 2;
        doc.addImage(pngData, 'PNG', imgX, y, imgWidth, imgHeight);
        y += imgHeight + 3;

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        const caption = `${note.outlinedDiagram.title}: ${note.outlinedDiagram.description}`;
        const capLines = doc.splitTextToSize(caption, contentWidth);
        doc.text(capLines, margin, y);
        y += capLines.length * 4 + 4;
      }
    } catch (e) {
      console.warn('Could not add diagram to note PDF:', e);
    }
  }

  // Universal Blueprint Steps
  if (note.blueprintSteps && note.blueprintSteps.length > 0) {
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('3. UNIVERSAL STEP-BY-STEP SOLVING BLUEPRINT', margin, y);
    y += 5.5;

    for (const step of note.blueprintSteps) {
      checkPageBreak(18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(3, 105, 161);
      doc.text(`Step ${step.stepNumber}: ${step.title}`, margin + 2, y);
      y += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      const stepLines = doc.splitTextToSize(step.explanation, contentWidth - 4);
      doc.text(stepLines, margin + 4, y);
      y += stepLines.length * 4.2;

      if (step.proTip) {
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(2, 132, 199);
        const tipLines = doc.splitTextToSize(`Pro-tip: ${step.proTip}`, contentWidth - 6);
        doc.text(tipLines, margin + 4, y);
        y += tipLines.length * 4;
      }
      y += 3;
    }
    y += 4;
  }

  // Worked Solution
  if (note.workedSolution) {
    checkPageBreak(35);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('4. WORKED EXAMPLE & DEMONSTRATION', margin, y);
    y += 5.5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text('Problem:', margin + 2, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    const probLines = doc.splitTextToSize(note.workedSolution.problemRestatement, contentWidth - 4);
    doc.text(probLines, margin + 2, y);
    y += probLines.length * 4.2 + 3;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.text('Solution Walkthrough:', margin + 2, y);
    y += 4.5;

    doc.setFont('helvetica', 'normal');
    note.workedSolution.steps.forEach((st, idx) => {
      checkPageBreak(10);
      const sLines = doc.splitTextToSize(`${idx + 1}. ${st}`, contentWidth - 6);
      doc.text(sLines, margin + 4, y);
      y += sLines.length * 4.2 + 1.5;
    });

    checkPageBreak(12);
    doc.setDrawColor(187, 247, 208);
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, y, contentWidth, 9, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(21, 128, 61);
    doc.text(`FINAL ANSWER: ${note.workedSolution.finalAnswer}`, margin + 4, y + 6);
    y += 14;
  }

  // Key Formulas & Cheat Sheet
  if (note.keyFormulas && note.keyFormulas.length > 0) {
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('5. KEY FORMULAS & DEFINITIONS', margin, y);
    y += 5.5;

    note.keyFormulas.forEach((kf) => {
      checkPageBreak(10);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${kf.name}:`, margin + 2, y);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(3, 105, 161);
      doc.text(kf.formula, margin + 45, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text(`— ${kf.explanation}`, margin + 85, y);
      y += 5;
    });
    y += 4;
  }

  // Footer & Page Numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `OpenLearn Study Notes • Page ${i} of ${totalPages} • Help & Tutoring: WhatsApp +254 732 884 645 | Telegram +254 769 363 976`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  const safeFilename = (note.title || 'Study_Notes')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 40);
  doc.save(`${safeFilename}_Notes.pdf`);
}
