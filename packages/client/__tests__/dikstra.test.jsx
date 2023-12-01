import { render } from "@testing-library/react";
import { DijkstraGraph } from "../src/pages/Algorithm/DijkstraComponent/DijkstraGraph.jsx";
import { expect, it, describe } from "vitest";

describe(DijkstraGraph, () => {
  it("should render correctly", () => {
    const result = render();
    expect(result).toMatchSnapshot();
  });
});
