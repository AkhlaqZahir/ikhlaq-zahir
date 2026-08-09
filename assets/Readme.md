# Assets folder — file naming convention

## Screenshots (4 per project, shown in the modal + card thumbnail)

    assets/wordle-1.jpg     assets/wordle-2.jpg     assets/wordle-3.jpg     assets/wordle-4.jpg
    assets/numatrix-1.jpg   assets/numatrix-2.jpg   assets/numatrix-3.jpg   assets/numatrix-4.jpg
    assets/memword-1.jpg    assets/memword-2.jpg    assets/memword-3.jpg    assets/memword-4.jpg

`-1.jpg` of each also becomes the card thumbnail on the Projects section.

## Icons (shown next to each project title)

    assets/wordle_icon.png
    assets/numatrix_icon.png
    assets/memword_icon.png

Recommended: your Play Store app icon, 512×512 or similar (square). It gets
cropped to a rounded 44×44 tile automatically.

## Notes

- Missing a file? Nothing breaks — screenshots fall back to a labeled
  placeholder slide, icons just don't render (no broken-image icon).
- Using `.png`/`.webp` for screenshots instead of `.jpg`? Change the
  extension in `img.src` inside `openGallery()` in script.js.
- Want more/fewer than 4 screenshot slides for a project? Change the
  `count` value in `GALLERY_DATA` near the top of the gallery section
  in script.js.
