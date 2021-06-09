
# THREEJS TypeScript Starter

This project will quickly get you something working in [three.js](https://threejs.org/) and [typescript](https://www.typescriptlang.org/).

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

```typescript
import { tools } from './devTools';

// Add GUI controls for position and rotation of an object
tools.AddControlsForObject(model, "rocket", -10, 10)

// Add the grid
tools.addGrid(scene);

// Add Stats Panel
tools.addStats();

```
## Copyright and License

MIT License, see [LICENSE](LICENSE) for details.
