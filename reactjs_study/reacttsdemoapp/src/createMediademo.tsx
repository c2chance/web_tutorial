import React from "react"
import ReactDOM from "react-dom"
import { createMedia } from "@artsy/fresnel"

const { MediaContextProvider, Media } = createMedia({
  // breakpoints values can be either strings or integers
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1024,
    xl: 1192,
  },
})

const App = () => (
  <MediaContextProvider>
    <Media at="sm">
      <MobileApp />
    </Media>
    <Media at="md">
      <TabletApp />
    </Media>
    <Media greaterThanOrEqual="lg">
      <DesktopApp />
    </Media>
  </MediaContextProvider>
)

ReactDOM.render(<App />, document.getElementById("react"))