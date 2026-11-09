// Google Drive helpers. Files must be shared as "Anyone with the link → Viewer",
// otherwise visitors get a sign-in wall / broken image.

const ID_PATTERNS = [
  /\/file\/d\/([\w-]{10,})/, // https://drive.google.com/file/d/<id>/view?usp=sharing
  /[?&]id=([\w-]{10,})/, //     https://drive.google.com/open?id=<id>, uc?id=<id>
  /^([\w-]{10,})$/, //          bare file ID
];

export function driveId(input: string): string {
  const s = input.trim();
  for (const re of ID_PATTERNS) {
    const m = s.match(re);
    if (m) return m[1];
  }
  throw new Error(
    `Couldn't find a Google Drive file ID in "${input}". ` +
      `Use the file's share link (…/file/d/<id>/view) or the bare ID. Folder links won't work.`,
  );
}

/** Embeddable player — works for video, and for images/PDFs as a fallback. */
export const drivePreviewUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

/** Direct image URL usable in <img>. sz = max width in px. */
export const driveImageUrl = (id: string, width = 1600) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;

export const driveViewUrl = (id: string) => `https://drive.google.com/file/d/${id}/view`;
