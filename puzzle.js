let clickPosition

if (!localStorage.imageLocations) {
  localStorage.setItem(
    'imageLocations',
    'item1@@250@@250&&item2@@300@@300&&item3@@300@@300&&item4@@300@@300'
  )
} else {
  setStartingLocations()
}
const item = document.getElementById('dropbox')
console.log(item)

function setStartingLocations() {
  const locations = localStorage.imageLocations.split('&&')
  locations.forEach((image) => {
    const details = image.split('@@')
    const item = document.querySelector(`#${details[0]}`)
    item.style.top = details[2]
    item.style.left = details[1]
    updateStorage(details[0], details[1], details[2])
  })
}

function dropDefault(evt) {
  evt.preventDefault()
}

function handleDrag(evt) {
  evt.dataTransfer.setData('itemId', evt.target.id)
  const rect = evt.target.getBoundingClientRect()
  const x = evt.clientX - rect.left
  const y = evt.clientY - rect.top
  clickPosition = { x, y }
}

function handleDrop(evt) {
  evt.preventDefault()
  const itemId = evt.dataTransfer.getData('itemId')
  const element = document.querySelector(`#${itemId}`)
  element.style.top = evt.clientY - clickPosition.y + 'px'
  element.style.left = evt.clientX - clickPosition.x + 'px'
  updateStorage(
    itemId,
    evt.clientX - clickPosition.x + 'px',
    evt.clientY - clickPosition.y + 'px'
  )
}

function updateStorage(itemIdentifier, positionX, positionY) {
  const locationsArray = localStorage.imageLocations.split('&&')
  let regexp = new RegExp(`^${itemIdentifier}`)
  const data = locationsArray
    .map((location) => {
      if (regexp.test(location)) {
        const details = location.split('@@')
        details[1] = positionX
        details[2] = positionY
        return details.join('@@')
      } else {
        return location
      }
    })
    .join('&&')
  localStorage.setItem('imageLocations', data)
  console.log(localStorage.imageLocations)
}
