// panel.js

window.onload = function() {
    const pane = new Tweakpane.Pane({
      title: 'Control Panel',
    });
  
    const PARAMS = {
      motionType: 'In-Out',
      accelType: 'Expo',
      spin: false,
      font: 'EditorialNew-Regular',
      backgroundColor: '#000000',
      textColor: '#ffffff',
      textSize: 22,
      lineCount: 36,
      letterSpace: 1,
      spacing: 0.8,
      oscCount: 5,
      innerRad: 150,
    };  

// Добавляем контролы на панель
pane.addInput(PARAMS, 'motionType', {
  label: 'Motion Type',
  options: {
    'In-Out': 'In-Out',
    'In': 'In',
    'Out': 'Out',
  },
}).on('change', () => updateMotionType());

pane.addInput(PARAMS, 'accelType', {
  label: 'Acceleration Type',
  options: {
    'Sine': 'Sine',
    'Circ': 'Circ',
    'Quint': 'Quint',
    'Expo': 'Expo',
    'Back': 'Back',
    'Bounce': 'Bounce',
    'Elastic': 'Elastic',
  },
}).on('change', () => updateAccelType());

pane.addButton({ title: 'Toggle Spin' }).on('click', () => toggleSpin());
pane.addButton({ title: 'Export SVG' }).on('click', () => exportSVG());
pane.addButton({ title: 'Save Loop' }).on('click', () => startRecording());
pane.addButton({ title: 'Stop Recording' }).on('click', () => stopRecording());

pane.addInput(PARAMS, 'font', {
  label: 'Font',
  options: {
    'EditorialNew-Regular': 'EditorialNew-Regular',
    'Inter-Regular': 'Inter-Regular',
    'NeueMontreal-Bold': 'NeueMontreal-Bold',
    'NeueMontreal-Regular': 'NeueMontreal-Regular',
    'RiformaLL-Bold': 'RiformaLL-Bold',
    'RiformaLL-Regular': 'RiformaLL-Regular',
  },
}).on('change', () => updateFont());

pane.addInput(PARAMS, 'backgroundColor', {
  label: 'Background Color',
  color: { type: 'string' },
}).on('change', (e) => updateBkgdColor(e));

pane.addInput(PARAMS, 'textColor', {
  label: 'Text Color',
  color: { type: 'string' },
}).on('change', (e) => updateForeColor(e));

pane.addInput(PARAMS, 'textSize', {
  label: 'Text Size',
  min: 10,
  max: 100,
}).on('change', (e) => updateTextSize(e));

pane.addInput(PARAMS, 'lineCount', {
  label: 'Line Count',
  min: 1,
  max: 100,
}).on('change', (e) => updateLineCount(e));

pane.addInput(PARAMS, 'letterSpace', {
  label: 'Letter Spacing',
  min: 0.1,
  max: 3,
  step: 0.1,
}).on('change', (e) => updateLetterSpace(e));

pane.addInput(PARAMS, 'spacing', {
  label: 'Line Spacing',
  min: 0.1,
  max: 3,
  step: 0.1,
}).on('change', (e) => updateSpacing(e));

pane.addInput(PARAMS, 'oscCount', {
  label: 'Oscillation Count',
  min: 1,
  max: 20,
}).on('change', (e) => updateOscCount(e));
};


