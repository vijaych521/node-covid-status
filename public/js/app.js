console.log('Client side javascript file is loaded!')

const covidForm = document.getElementById('covidForm')
// document.getElementById('covidForm')

covidForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const stateName = document.getElementById('searchInput')
    console.log("submiting form for " + stateName.value)

    fetch('https://api.covid19india.org/resources/resources.json').then((response) => {
        response.json().then((data) => {
            // console.log(data)
            if (response.body.error) {
                alert("body error !!!")
            } else {
                console.log('at line 28')
                const raw_data = data.resources
                const isStateFound = raw_data.filter((d) => d.state === stateName.value)
                if (isStateFound && isStateFound.length > 0) {
                    console.log(isStateFound)
                    const stateTemplate = document.getElementById('stateTemplate')
                    var htmlText = isStateFound.map((s) => {
                        return `
                       <div class="card" id="statesCard">
                            <div class="card-body">
                                <h5 class="card-title" id="category">${s.category}</h5>
                                <h6 class="card-subtitle mb-2 text-muted" id="city">${s.city}</h6>
                                <p class="card-text" id="contact">Website: ${s.contact}</p>
                                <p class="card-text alert alert-primary" id="descriptionandorserviceprovided">Description:<br> ${s.descriptionandorserviceprovided}</p>
                                <p class="card-text alert alert-success" id="phonenumber">Contact: ${s.phonenumber}</p>
                                <p class="card-text alert alert-warning" id="state">${s.state}</p>
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
})