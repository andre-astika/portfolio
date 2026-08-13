- [ ] Inspect the Lumora reference hero background and identify reusable visual behaviors.
- [x] Keep the existing hero typography, controls, copy, and layout unchanged, except remove the hero portrait element.
- [x] Replace or layer only the hero background with a Lumora-inspired monochrome treatment.
- [x] Copy and upload the newly attached 16:9 plain and Weekend photos as durable web assets.
- [x] Use the newly attached plain 16:9 photo as the Hero background by default and crossfade to the newly attached cap-and-glasses 16:9 photo when hovering the Hero.
- [x] Keep the reference-style background interaction visibly tied to the Hero hover area, not only to a hidden image element.
- [x] Keep the reusable portrait hover behavior available in the About/Experience section after removing the hero portrait.
- [x] Verify desktop layout, mobile layout, actual hover crossfade, and TypeScript; confirm no browser-console errors.
- [x] Rebuild the Hero interaction as a pointer-following soft brush reveal instead of a binary crossfade.
- [x] Add a cursor ring and spring-like pointer smoothing while keeping the base photo visible.
- [x] Verify desktop and mobile layout plus no browser-console errors.
- [ ] Save a checkpoint and deliver the updated project.

## Corrected Lumora mechanics

The supplied Lumora prompt describes the Hero as a full-bleed before/after photo with a “liquid cursor-reveal.” It uses two full-screen image layers: the base image remains visible, while a second image is revealed only inside a soft circular brush around the pointer. The pointer position is normalized to the Hero bounds, the reveal follows the pointer with spring-like easing, and the brush has a feathered edge rather than a hard clip. The interaction is therefore a moving mask/reveal, not a binary whole-background image swap. The prompt also calls for a small circular cursor indicator over the reveal point and for the effect to be disabled on touch/reduced-motion contexts.

Source: `/home/ubuntu/upload/pasted_content.txt`, user-provided Lumora recreation prompt, lines 177–183 and surrounding interaction specification.

## Reference findings

The Lumora hero uses a calm, cinematic background rather than a busy graphic: a pale smoky field, a large monochrome focal image, soft translucent horizontal light bands, blurred orb-like gradients, and a very large low-contrast wordmark/image texture behind the foreground copy. The composition feels editorial and atmospheric, with the content layered above the background. For Andre, retain the existing black/grayscale Noir Kinetic palette and typography; borrow only the background behavior by making the existing fluid layer calmer, more cinematic, and softly luminous. Keep the existing hero copy, mode switch, CTA, portrait placement, and nav unchanged.

Source reference: https://www.getlayers.ai/?layer=lumora (Lumora layer preview inspected Aug 13, 2026).

## Global Developer / Weekend theme

- [x] Inspect the existing shared Weekend state and current CSS token architecture.
- [x] Keep Developer as the existing dark theme.
- [x] Add a Weekend light theme across the entire page with coordinated backgrounds, text, borders, cards, controls, and motion overlays.
- [x] Make the Developer/Weekend button switch the global theme state, including keyboard behavior if already supported.
- [x] Verify the Hero and key section surfaces in both themes on desktop/mobile; TypeScript passes and browser console is clean.
- [ ] Save a new checkpoint.

## Theme verification notes

The interactive dev preview was opened and the Weekend tab was clicked. The Hero switched from the near-black Developer palette to a light warm-paper background, the headline switched to dark ink, controls and borders became lighter-theme compatible, and the Weekend copy appeared. The existing photo background remains visible with a softer ink-on-paper treatment. This confirms the global state is wired to the mode button rather than only changing Hero copy.

Computed-style check confirmed the key Work and Philosophy section surfaces resolve to the Weekend card token and the major sections resolve to the Weekend ink color. The document body needed an explicit `:has(.weekend-theme)` background fallback so transparent sections cannot reveal the old dark body color; that fallback has been added.

After a fresh preview refresh, reselecting Weekend again reproduced the light-paper Hero with dark ink typography, pale controls, dark cursor ring, and Weekend copy. The mode remains a user-controlled global switch rather than a one-time render state.

## Latest Hero composition refinement

- [ ] Copy and upload the newly attached landscape plain and Weekend photo pair as durable web assets.
- [ ] Replace the current Hero background pair with the new landscape pair and shift the face composition further right.
- [ ] Remove the Hero-only 01 section marker without changing the Hero description copy.
- [ ] Make the active Weekend button black in the light theme.
- [ ] Keep section numerals 02, 03, and later in the muted gray treatment used by Developer dark mode.
- [ ] Verify desktop/mobile presentation, theme states, and TypeScript, then save a checkpoint.

## Work carousel sticky refinement

- [ ] Inspect the current Work section wrapper, sticky region, track movement, and card image sizing.
- [ ] Start sticky behavior at the project carousel/grid rather than at the Work section header.
- [ ] Keep the carousel pinned while the project track scrolls left, then release only after the track reaches its end.
- [ ] Change each Work project image frame to a 4:3 aspect ratio without breaking hover descriptions or responsive layout.
- [ ] Verify desktop trackpad/wheel behavior and mobile presentation, then save a checkpoint.

## Display stroke refinement

- [x] Locate the shared `.text-stroke` rule and any inline stroke overrides.
- [x] Reduce stroke width while preserving the grayscale contrast in Developer and Weekend themes.
- [x] Verify the Hero outline heading at desktop size; TypeScript passes and no layout changes were introduced.
- [ ] Save a checkpoint.

## Section numeral normalization

- [x] Locate the section marker styles for 02–07.
- [x] Use one shared numeral size so 02 matches the other section markers.
- [x] Verify the normalized numerals on the full-page desktop render; TypeScript passes.
- [ ] Save a checkpoint.

## Hero 01 cleanup

- [x] Remove the remaining 01 background marker from Hero.
- [x] Verify Hero content and layout remain unchanged; TypeScript passes.
- [x] Save a checkpoint.

## Hero portrait positioning

- [x] Shift the landscape Hero image/object position farther right on desktop.
- [x] Preserve readable headline/description and safe mobile crop.
- [x] Verify the hover reveal and save a checkpoint.

## New Hero background replacement

- [ ] Upload the newly attached plain and cap-and-glasses background images as durable web assets.
- [ ] Wire the new pair into the Hero base and liquid reveal layers.
- [ ] Preserve the current right-weighted composition and readable Hero copy.
- [ ] Verify desktop/mobile presentation and save a checkpoint.

## Work card title scale

- [ ] Reduce the title size inside each Work grid item on desktop and mobile.
- [ ] Verify the smaller titles preserve card hierarchy and hover behavior.
- [ ] Save a checkpoint after verification.

## Heading outline stroke refinement

- [x] Make outline heading strokes such as “THINK” visibly thinner.
- [x] Preserve readable contrast in Developer and Weekend themes.
- [ ] Verify the change and save a checkpoint.
