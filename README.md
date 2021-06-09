
# THREEJS TypeScript Starter

This project will quickly get you something working in [three.js](https://threejs.org/) and [typescript](https://www.typescriptlang.org/).


![Demo Screenshot](/screenshot.png?raw=true)
## Getting Started

### Installing

```
git clone https://github.com/Gaweph/three-typescript-starter.git
```

```
npm install
```

### Using

```
npm start
```

A local version will now be running on [localhost:1234](http://localhost:1234).

### DevTools

This template provides access to some helpful DevTool methods:

```typescript
import { tools } from './devTools';

// Grid
tools.showGrid(scene);

// Stats Panel
tools.showStats();

// Access the dat.gui
tools.showDatGui();
tools.gui.add(model.position, "x", -10,10);

// Add GUI controls for position and rotation of an object
tools.AddControlsForObject(model, "rocket", -10, 10)

```
## Copyright and License

MIT License, see [LICENSE](LICENSE) for details.
