/**
 * Video Playback Speed
**/

// HELPER FUNCTIONS
const getSiblings = (elem) => {

	// Setup siblings array and get the first sibling
	const siblings = []
	let sibling = elem.parentNode.firstChild

	// Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling)
		}
		sibling = sibling.nextSibling
	}

	return siblings

}

const adjustPlaybackSpeed = (btnElem, speed) => {

  // 1. Check pressed status for accessibility

  // 1.1 Get all sibling buttons
  const allButtonSiblings = getSiblings(btnElem)
  for (let siblingBtn of allButtonSiblings) {
    // IF TRUE, revert to FALSE
    let apAttr = siblingBtn.getAttributeNode("aria-pressed")
    if (apAttr.value === "true") {
      apAttr.value = "false"
    }
  }

  // 2. IF button already pressed, ignore
  let pressedBtnPressedAttr = btnElem.getAttributeNode("aria-pressed")
  if (pressedBtnPressedAttr.value === "false") {
    // Change value to pressed
    pressedBtnPressedAttr.value = "true"
    // Get nearest video element and apply playback speed
    const videElem = btnElem.parentNode.previousSibling
    videElem.playbackRate = speed
  }
  // Else do nothing, since it is already pressed

}

// Create suite of buttons
const createPlaybackButtons = (btnOptions) => {

  const buttonList = []
  for (const btnOption of btnOptions) {
    // 1. Create Buttons
    const btn = document.createElement("button")

    // 2. Button Attributes
    const ariaPressed = document.createAttribute("aria-pressed")
    const onClickAttr = document.createAttribute("onclick")
    ariaPressed.value = "false"
    onClickAttr.value = `adjustPlaybackSpeed(this, ${btnOption.speed})`
    btn.setAttributeNode(ariaPressed)
    btn.setAttributeNode(onClickAttr)

    // 3. Set text
    const btnText = document.createTextNode(btnOption.text)
    btn.appendChild(btnText)

    // 4. Push completed button to list
    buttonList.push(btn)
  }
  return buttonList
}

// Append Playback Buttons
let videosOnPage = document.getElementsByTagName("video")
for (const video of videosOnPage) {

  // Append div container for buttons
  const videosDivContainer = document.createElement("div")
  const btnContainerAttr = document.createAttribute("class")
  btnContainerAttr.value = "video--playback_container"
  videosDivContainer.setAttributeNode(btnContainerAttr)
  video.insertAdjacentElement("afterend", videosDivContainer)

  // "afterend"
  const btnOptions = [
    {speed:0.5,text:"x0.5 Speed"},
    {speed:1,text:"x1 Speed"},
    {speed:1.5,text:"x1.5 Speed"},
  ]
  const pbButtons = createPlaybackButtons(btnOptions)

  // Append buttons
  for (b of pbButtons) {
    videosDivContainer.append(b)
  }

}