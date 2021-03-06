"use strict";

const _ = require('lodash');
const expect = require("must");
const {
  ordered,
  shuffled,
  onceCompared,
  allCompared,
  noneCompared,
  comparedWithAll
} = require("./fixtures");

const subject = require("../lib/comparativeSelection");

describe("comparativeSelection", () => {
  describe("spec file", () => {
    it("should be found", () => expect(true).to.be.true());
  });
  describe("module", () => {
    it("should export an object", () => expect(subject).to.be.an.object());
  });
  describe("#select", () => {
    it("should be a function", () => expect(subject.select).to.be.a.function());
    it("should return random elements when none compared", () => {
      const selected = [];
      _.times(2000, function () {
        const actual = subject.select(noneCompared);
        selected.push(actual.a, actual.b);
      });

      noneCompared.items.forEach((item) => {
        expect(selected).to.include(item.id);
      });
    });
    it("should return the first two elements in an ordered queue", () => {
      const selected = subject.select(ordered);
      expect(selected.a).to.be(ordered.items[0].id);
      expect(selected.b).to.be(ordered.items[1].id);
    });
    it("should sort them by number of comparisons", () => {
      const selected = subject.select(shuffled);
      expect(selected.a).to.be("1");
      expect(selected.b).to.be("2");
    });
    it("should pick an `opponent` uncompared with `selected`", () => {
      _.times(2000, function () {
        const selected = subject.select(onceCompared);
        expect(selected.a).to.be("selected");
        expect(selected.b).to.be("opponent");
      });
    });
    it("should pick the next in queue as `opponent` when `selected` compared to all", () => {
      _.times(2000, function () {
        const selected = subject.select(allCompared);
        expect(selected.a).to.be("selected");
        expect(selected.b).to.be("opponent");
      });
    });
    it('should return random items, when compared with all others', () => {
      const selected = [];
      _.times(2000, function () {
        const actual = subject.select(comparedWithAll);
        expect(actual).to.include('selected');
        selected.push(actual.a, actual.b);
      });

      comparedWithAll.items.forEach((item) => {
        expect(selected).to.include(item.id);
      });
    });
  });
  describe('regressions', () => {
    it('should allow usage of representations in comparisons that are NOT provided in the list of representations', () => {
      //this is specifically for peer assessments, since the representations of the current assessor are filtered out
      comparedWithAll.items.pop();
      const actual = subject.select({comparisons: comparedWithAll.comparisons, items: comparedWithAll.items});
      expect(actual).to.not.include("messages");
    });
  });
});
