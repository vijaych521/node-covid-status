console.log("Index js loading")

window.addEventListener('load', (event) => {
    fetch('https://api.covid19india.org/resources/resources.json').then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (response.body.error) {
                alert("body error !!!")
            } else {
                console.log('at line 28')
                const raw_data = data.resources
                const temp = []
                raw_data.forEach(element => {
                    temp.push(element.state)
                });
                const states = temp.filter((v, i, a) => a.indexOf(v) === i)
                if (states && states.length > 0) {
                    console.log(states)
                    const stateTemplate = document.getElementById('showStates')
                    var htmlText = states.map((s) => {
                        return `
                       <div class="card" id="statesCard">
                            <div class="card-body">
                                <h5 class="card-title" id="category">
                                <a href="/${s}"</a>${s}</h5>
                            </div>
                        </div>
                    `;
                    });
                    stateTemplate.innerHTML = htmlText;
                } else {
                    const errorCard = `<div class="card" style="width: 23rem;" id="statesCard">
                        <div class="card-body">
                            <h5 class="card-title alert alert-danger"> Enter valid state name !!!</h5>
                        </div>
                    </div>`
                    stateTemplate.innerHTML = errorCard;
                    console.log('error: Enter valid state name !!!', 'cause:' + stateName + ' Not Found')
                }
            }
        })
    })
});