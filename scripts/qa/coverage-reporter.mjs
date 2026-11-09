import { spec } from 'node:test/reporters';
import { Readable, compose } from 'node:stream';

// SCALE 0.58 expects a capitalized Istanbul-style aggregate row. Keep Node's
// original report and derive a conservative aggregate from its real event.
export default async function* coverageReporter(source) {
  let totals;
  async function* observedEvents() {
    for await (const event of source) {
      if (event.type === 'test:coverage') totals = event.data.summary.totals;
      yield event;
    }
  }
  yield* compose(Readable.from(observedEvents()), new spec());
  const percentages = [totals?.coveredLinePercent, totals?.coveredBranchPercent, totals?.coveredFunctionPercent];
  if (!percentages.every((value) => Number.isFinite(value))) {
    throw new Error('Node did not report a complete coverage summary');
  }
  const minimum = Math.floor(Math.min(...percentages) * 100) / 100;
  yield '\nSCALE aggregate: minimum of measured line, branch and function coverage\n';
  yield `All files | ${minimum.toFixed(2)} |\n`;
}
