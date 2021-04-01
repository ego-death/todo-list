let deletes = Array.from(document.querySelectorAll('.delete'));
let completes = Array.from(document.querySelectorAll('.complete'));

deletes.forEach(el => {
    el.addEventListener('click', async function(e){
        const name = (e.target.parentNode.childNodes[1].innerText.split(":")[1].trim().slice(0,-1));
        const response = await fetch('/deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'taskName': name,
            })
          });
          const data = await response.json();
          window.location.reload();
    })
});

completes.forEach(el => {
    el.addEventListener('click', function(){
        console.log('Hello World!');
    })
});