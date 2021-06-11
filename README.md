
# Threejs TypeScript Starter

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

## Helpers & Tools

This template provides some patterns such as the `modelHelpers` and `lightsHelper` files.

It also provides some useful tools:

```typescript

import { addDatGuiForObject } from './tools';

// Add controls for Position, Rotation and visibility of an Object
addDatGuiForObject(model, "label");

```

## Credits

Models used in this example are from the [Low-Poly Simple Nature Pack](https://assetstore.unity.com/packages/3d/environments/landscapes/low-poly-simple-nature-pack-162153) provided by [JustCreate](https://assetstore.unity.com/publishers/44390)

Lighting and SkyBox stolen from the [threejs - webgl hemisphere light example](https://threejs.org/examples/?q=light#webgl_lights_hemisphere) 

## Copyright and License

MIT License, see [LICENSE](LICENSE) for details.
