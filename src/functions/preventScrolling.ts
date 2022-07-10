export const preventScrolling = (e) => {
  const keyInputs = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', ' ']
  const isArrowKeyorSpacebar = keyInputs.indexOf(e.key) > -1
  if (isArrowKeyorSpacebar) e.preventDefault()
} // prevents scrolling of window when using space & arrow keys
