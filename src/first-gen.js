const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
};

const sketch = () => {
  const palette = random.pick(palettes);
  const backgroundColor = random.pick(palette);
  palette.splice(palette.indexOf(backgroundColor),1);

  const createGrid = () => {
    const points = [];
    const count = 50;
    for (let x=0; x < count; x++){
      for (let y = 0; y < count; y++){
        const u = count <= 1 ? 0.2 : x/(count - 1);
        const v = count <= 1 ? 0.2 : y/(count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.2;
        points.push({
          color: random.pick(palette),
          radius,
          rotation: random.noise2D(u, v),
          position: [u,v]
        });
      }
    }
    return points;
  };

  const points = createGrid().filter(() => random.value() > .5);
  const margin = 00;

  const features = ['.....','.', '|','_',':','+','*'];
  const feature = random.pick(features);

  return ({ context, width, height }) => {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const {
        position,
        radius,
        color,
        rotation
      } = data;

      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      
  
      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Helvetica"`;
      context.translate(x,y);
      context.rotate(rotation);
      // context.fillText('|', 0, 0);
      context.fillText(feature, 0, 0);

      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
