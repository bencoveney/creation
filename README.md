# creation

Procedural world/history generation

## Stuff to do next

- World restart doesn't work because things are stateful (systems, randomSelection etc) and its just all around - jank to be honest
- Maybe island/continent creation should consider sand to be water
- Mountain identification using prominence
- Gods can create demigods
- Gods can create species
- Build heightmap with interesting mountain ranges by factoring in:
  - Height squared
  - Ridged noise
  - Roughness map
- Artifacts can be given stored, stolen
- Migrate to new language generation:
  - Add english spelling?
- Improve generated words
  - Manipulate words, e.g. remove redundant syllables
  - e.g. sibling deities could follow naming pattern
  - Enforce uniqueness for names
  - Derive naming concepts from a wider set (e.g. terrain features)
