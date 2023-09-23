# creation

Procedural world/history generation

## Stuff to do next

- World restart doesn't work because things are stateful (systems, randomSelection etc) and its just all around - jank to be honest
- Maybe island/continent creation should consider sand to be water
- Gods can create demigods
- Gods can create species
- Build heightmap with interesting mountain ranges by factoring in:
  - Height squared
  - Ridged noise
  - Roughness map
- artifacts can be given stored, stolen
- activities take time
- activities can be done as a group (joined? interrupted?)

interruptions:

- What to do when something is interrupted?
- Need to mark target as "interrupted" or "being engaged in something"?
- Needs have already been satisfied. Maybe do that later.
- Maybe don't let group activities be interrupted?
