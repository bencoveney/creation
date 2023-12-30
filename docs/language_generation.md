# Language Generation

There are 2 main areas:

- Spoken language
- Written language

https://conlang.org/resources/

## Spoken language

Built up from a few tiers

- Phonetics (speech sounds)
- Phonology (phonemes - syllables)
- Morphology (words)
- Syntax (phrases and sentences)
- Semantics (literal meaning of phrases and sentences)
- Pragmatics (meaning in context of discourse)

### Phonetics

The set of sounds the speaker can produce.
This is basically encompassed by the international phonetic alphabet.
Depends on the physiology of the speaker.

https://en.wikipedia.org/wiki/International_Phonetic_Alphabet
https://en.wikipedia.org/wiki/Help:IPA/English
https://en.wikipedia.org/wiki/Phonetic_symbols_in_Unicode

### Phonology

Construction of syllables

- Onset
- Rhyme
  - Nucleus
  - Coda

#### Phonotactics

The restrictions languages place on the sounds that can be used together.
Currently I am just using a loosely-derived set of english-like phonotactics to get something that sounds reasonable to my ears.
There are power laws here, where some phonemes are very common and others are rare.

https://en.wikipedia.org/wiki/Phonotactics
https://en.wikipedia.org/wiki/English_phonology#Phonotactics

#### Ideas for generation

https://www.youtube.com/watch?v=3378FlHK4v0
Pick rules e.g. english based, less is more

pick n vowels e/g a, i, o
typically languages have min 1 back, 1 front and 1 unrounded
throw in some dipthongs

pick some consonants
try to remove entire features (voiced/unvoiced, places of articulation, manners of articulation)
symmetry between place + manner of articulation
1 or 2 uncommon sounds can make lang distinctive

https://www.youtube.com/watch?v=1Up5hSm7LYI
phonotactics
pick more rules
syllables composed of:
onset: 0 - n costonants
nucleus: 1 - n vowels
coda: 0 - n costonants
pick some consonants/vowels that can only appear at specific places
some consonants never appear near each other
some consonant types never appear together in clusters (onset/coda)
Can make rules to make things easier to pronounce

### Morphology

There are power laws here, where some words are very common and others are rare

https://en.wikipedia.org/wiki/Morpheme
https://en.wikipedia.org/wiki/Root_(linguistics)
https://en.wikipedia.org/wiki/Lexeme
https://en.wikipedia.org/wiki/Affix

See [root words research](./root_words.md).

#### Ideas for generation

Use word lists to look at options for generation

- https://en.wikibooks.org/wiki/Conlang/Beginner/Words
- https://www.reddit.com/r/conlangs/comments/nkqosr/what_are_the_100_most_important_words_to_make_for/
- http://zompist.com/kitlong.html#lexicon

https://www.youtube.com/watch?v=TocHnrdaNG8
words
pick some root words > mess with them a bit

root words
Start with phonotactics
link sounds to themes?

https://youtu.be/IttLKirWL18
https://youtu.be/EFqvwUIlzfU
https://youtu.be/_y2KqjRg_78
https://youtu.be/kFzt_GHNd1M
https://youtu.be/n7fX0Dbq_2I
https://youtu.be/zFe1ahJ_LTk
https://www.vulgarlang.com/

### Syntax

https://en.wikipedia.org/wiki/Part-of-speech_tagging
https://en.wikipedia.org/wiki/List_of_glossing_abbreviations

#### Ideas for generation

https://cofl.github.io/conlang/resources/mirror/conlang-syntax-test-cases.html
https://cofl.github.io/conlang/resources/mirror/graded-sentences-for-analysis.html

### Semantics

_Not really considered yet._

#### Ideas for generation

https://en.wikipedia.org/wiki/Semantic_change

### Pragmatics

_Not really considered yet._

### Evolution

_Not really considered yet._

Languages should change over time.
This should be reflected in changes to sounds, sentence structure, word meaning.

### Audio creation

It would be nice to have a clickable button that will "pronounce" any words, for anyone who isn't familiar with IPA.
_Some_ browsers _maybe_ supported this in the past, but support has since dried up.
Now it looks like a cloud service would be the best option for producing audio, but it is paid.

http://ipa-reader.xyz/
https://cuttlesoft.com/blog/2018/09/13/pronouncing-things-with-amazons-polly/
https://github.com/WICG/speech-api/issues/37
https://github.com/espeak-ng/espeak-ng
https://github.com/espeak-ng/espeak-ng/issues/1701

## Written language

_Not really considered yet._

Some vague ideas for stop-gap implementations:

- Convert spoken sounds directly to ASCII.
- Build characters using combining characters.
- Build characters using a seven-segment display kind-of-thing.

https://en.wikipedia.org/wiki/English_orthography#Sound-to-spelling_correspondences
https://en.wikipedia.org/wiki/English_orthography#Spelling-to-sound_correspondences
https://en.wikipedia.org/wiki/Constructed_language
https://en.wikipedia.org/wiki/Combining_character
