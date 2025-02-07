// panel.js

window.onload = function() {
    // Wait for p5.js to initialize
    setTimeout(() => {
        const pane = new Tweakpane.Pane({
            title: 'Control Panel',
            expanded: true,
        });

        // Create folders for better organization
        const textFolder = pane.addFolder({ title: 'Text Style' });
        const animationFolder = pane.addFolder({ title: 'Animation' });
        const colorsFolder = pane.addFolder({ title: 'Colors' });
        const layoutFolder = pane.addFolder({ title: 'Layout' });
        const actionsFolder = pane.addFolder({ title: 'Actions' });
      
        const PARAMS = {
            motionType: 0,
            accelType: 3,
            spin: false,
            font: 'RiformaLL-Bold',
            backgroundColor: '#000000',
            textColor: '#ffffff',
            textSize: 22,
            lineCount: 36,
            letterSpace: 1,
            spacing: 0.8,
            oscCount: 5,
            innerRad: 150,
        };

        // Text Style Controls
        textFolder.addInput(PARAMS, 'font', {
            label: 'Font Family',
            options: {
                'Editorial New': 'EditorialNew-Regular',
                'Inter': 'Inter-Regular',
                'Neue Montreal Bold': 'NeueMontreal-Bold',
                'Neue Montreal': 'NeueMontreal-Regular',
                'Riforma Bold': 'RiformaLL-Bold',
                'Riforma': 'RiformaLL-Regular',
            },
        }).on('change', (ev) => {
            if (ev && ev.value) {
                currentFont = ev.value;
                updateFont();
            }
        });

        textFolder.addInput(PARAMS, 'textSize', {
            label: 'Size',
            min: 10,
            max: 100,
            step: 1,
        }).on('change', (ev) => {
            if (ev && typeof ev.value === 'number') {
                updateTextSize({ value: ev.value });
            }
        });

        textFolder.addInput(PARAMS, 'letterSpace', {
            label: 'Letter Spacing',
            min: 0.1,
            max: 3,
            step: 0.1,
        }).on('change', (ev) => {
            if (ev && typeof ev.value === 'number') {
                updateLetterSpace({ value: ev.value });
            }
        });

        // Animation Controls
        animationFolder.addInput(PARAMS, 'motionType', {
            label: 'Motion',
            options: {
                'In-Out': 0,
                'In': 1,
                'Out': 2,
            },
        }).on('change', (ev) => {
            if (ev && typeof ev.value === 'number') {
                motionType = ev.value;
                updateMotionType();
            }
        });

        animationFolder.addInput(PARAMS, 'accelType', {
            label: 'Easing',
            options: {
                'Sine': 0,
                'Circ': 1,
                'Quint': 2,
                'Expo': 3,
                'Back': 4,
                'Bounce': 5,
                'Elastic': 6,
            },
        }).on('change', (ev) => {
            if (ev && typeof ev.value === 'number') {
                accelType = ev.value;
                updateAccelType();
            }
        });

        animationFolder.addInput(PARAMS, 'oscCount', {
            label: 'Oscillations',
            min: 1,
            max: 20,
            step: 1,
        }).on('change', (ev) => {
            if (ev && typeof ev.value === 'number') {
                updateOscCount({ value: ev.value });
            }
        });

        // Colors Controls
        colorsFolder.addInput(PARAMS, 'backgroundColor', {
            label: 'Background',
            color: { type: 'string' },
        }).on('change', (ev) => {
            if (ev && ev.value) {
                updateBkgdColor({ target: { value: ev.value }});
            }
        });

        colorsFolder.addInput(PARAMS, 'textColor', {
            label: 'Text',
            color: { type: 'string' },
        }).on('change', (ev) => {
            if (ev && ev.value) {
                updateForeColor({ target: { value: ev.value }});
            }
        });

        // Layout Controls
        layoutFolder.addInput(PARAMS, 'lineCount', {
            label: 'Lines',
            min: 1,
            max: 100,
            step: 1,
        }).on('change', (ev) => {
            if (ev && typeof ev.value === 'number') {
                updateLineCount({ value: ev.value });
            }
        });

        layoutFolder.addInput(PARAMS, 'spacing', {
            label: 'Line Height',
            min: 0.1,
            max: 3,
            step: 0.1,
        }).on('change', (ev) => {
            if (ev && typeof ev.value === 'number') {
                updateSpacing({ value: ev.value });
            }
        });

        layoutFolder.addInput(PARAMS, 'innerRad', {
            label: 'Inner Radius',
            min: 50,
            max: 300,
            step: 10,
        }).on('change', (ev) => {
            if (ev && typeof ev.value === 'number') {
                updateInnerRad(ev.value);
            }
        });

        // Action Buttons
        actionsFolder.addButton({ title: 'Toggle Spin' }).on('click', toggleSpin);
        actionsFolder.addButton({ title: 'Export SVG' }).on('click', exportSVG);
        actionsFolder.addButton({ title: 'Start Recording' }).on('click', startRecording);
        actionsFolder.addButton({ title: 'Stop Recording' }).on('click', stopRecording);
    }, 1000); // Wait 1 second for p5.js to initialize
};
