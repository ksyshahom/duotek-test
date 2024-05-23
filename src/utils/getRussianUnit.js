export function getStaffUnit(staff) {
  let unit = ''
  let count = staff % 100
  if (count >= 5 && count <= 20) {
    unit = 'человек'
  } else {
    count = count % 10
    if (count >= 2 && count <= 4) {
      unit = 'человека'
    } else {
      unit = 'человек'
    }
  }
  return unit
}

export function getAgeUnit(age) {
  let unit = ''
  let count = age % 100
  if (count >= 5 && count <= 20) {
    unit = 'лет'
  } else {
    count = count % 10
    if (count == 1) {
      unit = 'год'
    } else if (count >= 2 && count <= 4) {
      unit = 'года'
    } else {
      unit = 'лет'
    }
  }
  return unit
}
