
function dateReducer(state = '', action) {

  if (action.type === CHANGING_DATE) {
    // console.log(document.getElementById("cardDateInput").textContent)
    return document.getElementById("cardDateInput").value;
  }
  return state
}

function nameReducer(state = '', action) {
  if (action.type === CHANGING_NAME) {
    return document.getElementById("cardNameInput").value;
  }
  return state
}
function numberReducer(state = '', action) {
  if (action.type === CHANGING_NUMBER) {
    // console.log(document.getElementById("cardDateInput").textContent)
    return document.getElementById("cardNumberInput").value;
  }
  return state
}
function cvcReducer(state = '', action) {
  if (action.type === CHANGING_CVC) {
    // console.log(document.getElementById("cardDateInput").textContent)
    return document.getElementById("cardCvcInput").value;
  }
  return state
}
