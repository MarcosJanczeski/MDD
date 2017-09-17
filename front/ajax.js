const API = 'http://www.mdd.dev/'
  , req = new XMLHttpRequest()
  , ajax = (obj) => {
    //req.withCredentials = true
    req.open(obj.method, API+obj.path)
    //req.setRequestHeader("Accept", "application/json")
    req.setRequestHeader("Content-Type", "application/json; charset = utf-8")//"application/x-www-form-urlencoded;charset=utf-8")
    req.onload = () => {
      if (req.readyState == 4 && req.status == 200) {
        obj.callback(req.responseText)
      } else {
        console.error(req.responseText)
      }
    }
    req.send(obj.json ? JSON.stringify(obj.json) : null)
  }
  , render = (ret) => {
    document.getElementById('retorno').innerText = ret
  }