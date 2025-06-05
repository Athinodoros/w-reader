export default function getJoyStickPossition(moveThreshold: number, possitions: { xdiff: number, ydiff: number }) {

  let absX = Math.abs(possitions.xdiff);
  let absY = Math.abs(possitions.ydiff);
  let adjacent = Math.max(absX, absY);
  let opposite = Math.min(absX, absY);
  let hypotense = Math.sqrt(Math.pow(opposite, 2) + Math.pow(adjacent, 2))
  if (hypotense <= moveThreshold) {
    return { x: possitions.xdiff, y: possitions.ydiff };
  } else {
    let ratio = moveThreshold / hypotense;
    if (absX > absY) {
      return { x: ratio * possitions.xdiff, y: ratio * possitions.ydiff };
    } else {
      return { x: possitions.xdiff * ratio, y: possitions.ydiff * ratio };
    }

  }
}