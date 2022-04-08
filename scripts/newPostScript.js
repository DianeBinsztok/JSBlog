function date() {
  let date = new Date();
  var today =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return today;
}
console.log(date());

function handleNewPost() {}
