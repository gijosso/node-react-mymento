// Actions types are defined as string constants
export const ADD = 'PHOTO_ADD';
export const GET = 'PHOTO_GET';
export const REMOVE = 'PHOTO_REMOVE';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_PRIVATE: 'SHOW_PRIVATE',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export function get_photo(userid)
{
    return { type: GET, userid };
}

export function add_photo()
{
  return { type: ADD }
}

export function delete_photo(id)
{
  return { type: REMOVE, id };
}

export function visibility_photo(id, typeVisibility)
{
  return { type: SET_VISIBILITY_FILTER, id, typeVisibility };
}
