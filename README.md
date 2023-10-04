# FiveM TypeScript Resource Boilerplate

[![Depfu](https://badges.depfu.com/badges/d269ca2d36b5d4cf247e66c6400c216d/count.svg)](https://github.com/CENSOR1337/fivem-typescript-boilerplate)


This is a boilerplate for FiveM TypeScript resources.

## Notes
This boilerplate is utilizing native invoking on FiveM function, which is a wrapper for the FiveM natives. This is to provide a features like Vector class, Available events, and more.

## Dependencies
- [@censor1337/cfx-core](https://github.com/CENSOR1337/cfx-core-js)
- [@censor1337/cfx-api](https://github.com/CENSOR1337/cfx-api-js)
- [@censor1337/cslib](https://github.com/CENSOR1337/cfx-cslib-js)

## Installation

```bash
git clone https://github.com/CENSOR1337/fivem-typescript-boilerplate
cd fivem-typescript-boilerplate
npm install
```

## Example

```ts
import * as native from '@censor1337/cfx-core/natives';
import { Vector3 } from '@censor1337/cfx-core/shared';

const originPos = new Vector3(0, 0, 0);
const playerPos = native.getEntityCoords(native.playerPedId(), false);
const distance = playerPos.distanceTo(originPos);
console.log(`Distance to origin: ${distance}`);
```