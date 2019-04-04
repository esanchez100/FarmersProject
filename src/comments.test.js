import React from "react"
import Comments from "./Comments"
import renderer from "react-test-render"

test("should render comnents correctly ", () => {
    const renderer = new renderer();
    renderer.render(<Comments />);
    console.log(renderer.getRenderOutput());
})