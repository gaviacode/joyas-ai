export type RingSizeRow = {
  isoSize: number;
  spanishSize: number;
  diameterMm: number;
  circumferenceMm: number;
};

export const minRingCircumference = 40;
export const maxRingCircumference = 80;

export const ringSizeRows: RingSizeRow[] = Array.from({ length: 31 }, (_, index) => {
  const circumferenceMm = 40 + index;

  return {
    isoSize: circumferenceMm,
    spanishSize: circumferenceMm - 40,
    diameterMm: Number((circumferenceMm / Math.PI).toFixed(1)),
    circumferenceMm,
  };
});

export function calculateRingSizeFromDiameter(diameterMm: number) {
  return calculateRingSize(diameterMm * Math.PI);
}

export function calculateRingSize(circumferenceMm: number) {
  if (!Number.isFinite(circumferenceMm)) {
    return null;
  }

  if (circumferenceMm < minRingCircumference || circumferenceMm > maxRingCircumference) {
    return null;
  }

  const roundedCircumference = Math.round(circumferenceMm);
  const lowerSize = Math.floor(circumferenceMm);
  const upperSize = Math.ceil(circumferenceMm);
  const isBetweenSizes = lowerSize !== upperSize && Math.abs(circumferenceMm - roundedCircumference) >= 0.25;
  const row =
    ringSizeRows.find((item) => item.isoSize === roundedCircumference) ??
    ringSizeRows.reduce((nearest, current) =>
      Math.abs(current.circumferenceMm - circumferenceMm) <
      Math.abs(nearest.circumferenceMm - circumferenceMm)
        ? current
        : nearest
    );

  return {
    row,
    measuredCircumference: Number(circumferenceMm.toFixed(1)),
    lowerSize,
    upperSize,
    isBetweenSizes,
  };
}
