import type { OptionSlice } from '../model/option-slice.type';

const CIRCLE = 2 * Math.PI;
const CANVAS_SIZE = 512;

const STROKE_COLOR_PROPERTY = '--color-primary-50';
const SHADOW_COLOR_PROPERTY = '--color-primary-900';

const GRADIENT_START_COLOR_PROPERTY = '--color-primary-300';
const GRADIENT_END_COLOR_PROPERTY = '--color-primary-700';

const DEFAULT_GRADIENT_START_COLOR = '#66baba';
const DEFAULT_GRADIENT_END_COLOR = '#005454';
const DEFAULT_STROKE_COLOR = '#e6f4f4';
const DEFAULT_SHADOW_COLOR = '#001c1c';

const FONT_FAMILY = 'Inter';
const DEFAULT_SLICE_TEXT_SHADOW_COLOR = '#00000080';

const center = CANVAS_SIZE / 2;
const padding = CANVAS_SIZE / 32;
const fontSize = CANVAS_SIZE / 32;
const wheelRadius = center - padding;
const centerCircleRadius = wheelRadius / 8;

type GradientColor = {
  start: string;
  end: string;
};

function drawShadow({
  ctx,
  center,
  wheelRadius,
  padding,
  shadowColor,
}: {
  ctx: CanvasRenderingContext2D;
  center: number;
  wheelRadius: number;
  padding: number;
  shadowColor: string;
}): void {
  ctx.save();

  const path = new Path2D();

  path.arc(center, center, wheelRadius, 0, CIRCLE);

  Object.assign(ctx, { shadowColor, shadowBlur: padding });

  ctx.fill(path);
  ctx.fill(path);

  ctx.restore();
}

function drawSlice({
  ctx,
  center,
  wheelRadius,
  rotation,
  slice,
  strokeColor,
}: {
  ctx: CanvasRenderingContext2D;
  center: number;
  wheelRadius: number;
  rotation: number;
  slice: OptionSlice;
  strokeColor: string;
}): void {
  const { startAngle, endAngle, color } = slice;

  ctx.save();

  const path = new Path2D();

  path.moveTo(center, center);
  path.arc(center, center, wheelRadius, startAngle + rotation, endAngle + rotation);
  path.lineTo(center, center);

  Object.assign(ctx, { lineWidth: 2, strokeStyle: strokeColor, fillStyle: color });

  ctx.fill(path);
  ctx.stroke(path);

  ctx.restore();
}

function clipCanvasText({
  ctx,
  text,
  maxWidth,
}: {
  ctx: CanvasRenderingContext2D;
  text: string;
  maxWidth: number;
}): string {
  const { actualBoundingBoxLeft, actualBoundingBoxRight } = ctx.measureText(text);

  if (actualBoundingBoxRight + actualBoundingBoxLeft < maxWidth) {
    return text;
  }

  return clipCanvasText({ ctx, text: `${text.slice(0, -2).trimEnd()}…`, maxWidth });
}

function drawSliceText({
  ctx,
  center,
  wheelRadius,
  centerCircleRadius,
  rotation,
  fontSize,
  slice,
  textStrokeColor,
  textFillColor,
}: {
  ctx: CanvasRenderingContext2D;
  center: number;
  wheelRadius: number;
  centerCircleRadius: number;
  rotation: number;
  fontSize: number;
  slice: OptionSlice;
  textStrokeColor: string;
  textFillColor: string;
}): void {
  const { startAngle, endAngle, title } = slice;

  ctx.save();

  if (endAngle - startAngle > 0.25) {
    ctx.translate(center, center);
    ctx.rotate(startAngle + (endAngle - startAngle) / 2 + rotation);

    Object.assign(ctx, {
      textAlign: 'center',
      textBaseline: 'middle',
      font: `${fontSize.toString()}px ${FONT_FAMILY}`,
      lineWidth: fontSize / 8,
      strokeStyle: textStrokeColor,
      fillStyle: textFillColor,
      shadowColor: DEFAULT_SLICE_TEXT_SHADOW_COLOR,
      shadowBlur: fontSize / 2,
    });

    const text = clipCanvasText({ ctx, text: title, maxWidth: wheelRadius - centerCircleRadius * 2.5 });

    ctx.strokeText(text, (wheelRadius + centerCircleRadius) / 2, 0);
    ctx.fillText(text, (wheelRadius + centerCircleRadius) / 2, 0);
  }

  ctx.restore();
}

function drawSliceList({
  ctx,
  sliceList,
  center,
  wheelRadius,
  centerCircleRadius,
  rotation,
  fontSize,
  strokeColor,
  textStrokeColor,
  textFillColor,
}: {
  ctx: CanvasRenderingContext2D;
  sliceList: OptionSlice[];
  center: number;
  wheelRadius: number;
  centerCircleRadius: number;
  rotation: number;
  fontSize: number;
  strokeColor: string;
  textStrokeColor: string;
  textFillColor: string;
}): void {
  sliceList.forEach((slice) => {
    drawSlice({ ctx, center, wheelRadius, rotation, slice, strokeColor });
    drawSliceText({
      ctx,
      center,
      wheelRadius,
      centerCircleRadius,
      rotation,
      fontSize,
      slice,
      textStrokeColor,
      textFillColor,
    });
  });
}

function drawCenterCircle({
  ctx,
  center,
  centerCircleRadius,
  gradientColor,
  strokeColor,
}: {
  ctx: CanvasRenderingContext2D;
  center: number;
  centerCircleRadius: number;
  gradientColor: GradientColor;
  strokeColor: string;
}): void {
  ctx.save();

  const path = new Path2D();

  path.arc(center, center, centerCircleRadius, 0, CIRCLE);

  const gradient = ctx.createLinearGradient(0, center - centerCircleRadius, 0, center + centerCircleRadius);

  gradient.addColorStop(0, gradientColor.start);
  gradient.addColorStop(1, gradientColor.end);

  Object.assign(ctx, { lineWidth: 2, strokeStyle: strokeColor, fillStyle: gradient });

  ctx.fill(path);
  ctx.stroke(path);

  ctx.restore();
}

function drawCursor({
  ctx,
  center,
  padding,
  gradientColor,
  strokeColor,
}: {
  ctx: CanvasRenderingContext2D;
  center: number;
  padding: number;
  gradientColor: GradientColor;
  strokeColor: string;
}): void {
  ctx.save();

  const path = new Path2D();

  path.moveTo(center, padding / 2);
  path.lineTo(center + padding, 0);
  path.lineTo(center, padding * 2);
  path.lineTo(center - padding, 0);
  path.lineTo(center, padding / 2);

  const gradient = ctx.createLinearGradient(0, 0, 0, padding * 2);

  gradient.addColorStop(0, gradientColor.start);
  gradient.addColorStop(1, gradientColor.end);

  Object.assign(ctx, { lineWidth: 2, strokeStyle: strokeColor, fillStyle: gradient });

  ctx.fill(path);
  ctx.stroke(path);

  ctx.restore();
}

export default function drawWheel({
  ctx,
  sliceList,
  rotation,
}: {
  ctx: CanvasRenderingContext2D;
  sliceList: OptionSlice[];
  rotation: number;
}) {
  const computedStyle = getComputedStyle(document.documentElement);

  const gradientColor = {
    start: computedStyle.getPropertyValue(GRADIENT_START_COLOR_PROPERTY) || DEFAULT_GRADIENT_START_COLOR,
    end: computedStyle.getPropertyValue(GRADIENT_END_COLOR_PROPERTY) || DEFAULT_GRADIENT_END_COLOR,
  };
  const strokeColor = computedStyle.getPropertyValue(STROKE_COLOR_PROPERTY) || DEFAULT_STROKE_COLOR;
  const shadowColor = computedStyle.getPropertyValue(SHADOW_COLOR_PROPERTY) || DEFAULT_SHADOW_COLOR;

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  drawShadow({ ctx, center, wheelRadius, padding, shadowColor });
  drawSliceList({
    ctx,
    sliceList,
    center,
    wheelRadius,
    centerCircleRadius,
    rotation,
    fontSize,
    strokeColor,
    textFillColor: strokeColor,
    textStrokeColor: shadowColor,
  });
  drawCenterCircle({ ctx, center, centerCircleRadius, gradientColor, strokeColor });
  drawCursor({ ctx, center, padding, gradientColor, strokeColor });
}
