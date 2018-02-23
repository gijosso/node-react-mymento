const photo = (state = {}, action) => {
    switch (action.type) {
        case 'PHOTO_GET':

        case 'PHOTO_ADD':
            alert("upload")
            return {
              uri: action.uri,
              text_name: action.name,
            }

        case 'PHOTO_REMOVE':
            alert("remove");

        case 'SET_VISIBILITY_FILTER':
            alert("Set visibility_photo");

        default:
            return state
    }
};

const photos = (state = [], action) => {
  switch (action.type) {
    case 'PHOTO_ADD':
      return [
        ...state,
        photo(undefined, action)
      ]
    case 'PHOTO_REMOVE':
      return state.map(t =>
        photo(t, action)
      )
    default:
      return state
  }
}

export default photos
