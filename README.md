# creation

Procedural world/history generation

## Stuff to do next

- World restart doesn't work because things are stateful (systems, randomSelection etc) and its just all around - jank to be honest
- Maybe island/continent creation should consider stand to be water
- Gods can create demigods
- Gods can create species
- Merge tiles and locations
- Build heightmap with interesting mountain ranges by factoring in:
  - Height squared
  - Ridged noise
  - Roughness map
