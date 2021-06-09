
# THREEJS TypeScript Starter

This project will quickly get you something working in [three.js](https://threejs.org/) and [typescript](https://www.typescriptlang.org/).


![Demo Screenshot](/static/screenshot.png?raw=true)
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

By default this template enabled the dev tools.

```typescript
const showDevTools = false; // <-- to disable - change this to false
```

You may also use any subset of the DevTools manually with the following helpers:

```typescript
import { tools } from './devTools';

// Add GUI controls for position and rotation of an object
tools.AddControlsForObject(model, "rocket", -10, 10)

// Add grid
tools.addGrid(scene);

// Add Stats Panel
tools.addStats();

// Access the dat.gui
tools.gui.add(model.position, "x", -10,10);

```
## Copyright and License

MIT License, see [LICENSE](LICENSE) for details.
